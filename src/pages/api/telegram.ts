import type { APIRoute } from "astro";
import { bookingServices } from "../../data/content";

/**
 * Server endpoint: принимает JSON с формы записи / подписки
 * и отправляет сообщение в Telegram Bot API.
 *
 * Секреты читаются только на сервере (без префикса PUBLIC_),
 * поэтому токен не попадает в клиентский бандл.
 *
 * В Astro 5+ страница по умолчанию статическая — отключаем prerender,
 * чтобы POST обрабатывался рантаймом адаптера (@astrojs/node).
 */
export const prerender = false;

const PHONE_RE = /^(\+7|7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 500;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

/** Экранирование пользовательского ввода для parse_mode=HTML. */
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function clip(value: unknown, max = MAX_LEN) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

async function sendTelegram(text: string) {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("missing_telegram_env");
  }

  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    throw new Error("telegram_rejected");
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot: боты часто заполняют скрытое поле website.
  if (clip(body.website, 80)) {
    return json({ ok: true });
  }

  const type = clip(body.type, 32) || "booking";

  try {
    if (type === "subscribe") {
      const email = clip(body.email, 120).toLowerCase();
      if (!EMAIL_RE.test(email)) {
        return json({ error: "invalid_email" }, 400);
      }

      await sendTelegram(
        [
          "<b>Aura SPA — подписка</b>",
          "",
          `<b>Email:</b> ${escapeHtml(email)}`,
        ].join("\n"),
      );
      return json({ ok: true });
    }

    const name = clip(body.name, 80);
    const phone = clip(body.phone, 32);
    const service = clip(body.service, 80);
    const datetime = clip(body.datetime, 40);
    const comment = clip(body.comment, MAX_LEN);

    if (name.length < 2) {
      return json({ error: "invalid_name" }, 400);
    }
    if (!PHONE_RE.test(phone.replace(/\s/g, ""))) {
      return json({ error: "invalid_phone" }, 400);
    }
    if (!(bookingServices as readonly string[]).includes(service)) {
      return json({ error: "invalid_service" }, 400);
    }
    if (!datetime) {
      return json({ error: "invalid_datetime" }, 400);
    }

    const prettyDate = datetime.replace("T", " ");

    await sendTelegram(
      [
        "<b>Aura SPA — новая запись</b>",
        "",
        `<b>Имя:</b> ${escapeHtml(name)}`,
        `<b>Телефон:</b> ${escapeHtml(phone)}`,
        `<b>Услуга:</b> ${escapeHtml(service)}`,
        `<b>Дата и время:</b> ${escapeHtml(prettyDate)}`,
        comment ? `<b>Пожелания:</b> ${escapeHtml(comment)}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    return json({ ok: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    const status = reason === "missing_telegram_env" ? 503 : 502;
    return json({ error: "delivery_failed", reason }, status);
  }
};

export const GET: APIRoute = async () =>
  json({ error: "method_not_allowed" }, 405);
