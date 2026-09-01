export const salon = {
  name: "Aura SPA",
  tagline: "Гармония души и тела",
  phoneDisplay: "+7 (495) 128-40-10",
  phoneHref: "tel:+74951284010",
  email: "hello@auraspa.ru",
  address: "Москва, Большая Никитская, 14",
  hours: "Ежедневно, 10:00–22:00",
  instagram: "https://instagram.com/",
  telegram: "https://t.me/",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=37.592%2C55.752%2C37.612%2C55.762&layer=mapnik&marker=55.757%2C37.602",
} as const;

export const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/about", label: "О салоне" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const bookingServices = [
  "Классический массаж",
  "Стоун-терапия",
  "SPA-ритуалы",
  "Лифтинг-массаж",
] as const;

export type BookingService = (typeof bookingServices)[number];

export const catalog = [
  {
    slug: "classic",
    title: "Классический массаж",
    duration: "60 / 90 мин",
    price: "7 900 ₽",
    priceAlt: "11 200 ₽",
    category: "Тело",
    description:
      "Глубокая, спокойная работа с мышцами: снимаем накопленное напряжение и возвращаем телу естественную лёгкость.",
  },
  {
    slug: "stone",
    title: "Стоун-терапия",
    duration: "75 мин",
    price: "13 500 ₽",
    category: "Тепло",
    description:
      "Разогретые базальтовые камни и медленные движения. Ритуал для тех, кому нужно отпустить тело целиком.",
  },
  {
    slug: "rituals",
    title: "SPA-ритуалы",
    duration: "90 / 120 мин",
    price: "16 800 ₽",
    priceAlt: "21 000 ₽",
    category: "Ритуал",
    description:
      "Авторские церемонии с маслами, паром и тишиной — полный цикл восстановления без спешки.",
  },
  {
    slug: "lifting",
    title: "Лифтинг-массаж",
    duration: "50 мин",
    price: "9 400 ₽",
    category: "Лицо",
    description:
      "Скульптурная техника для лица и шеи: тонус кожи без агрессивного воздействия и аппаратов.",
  },
  {
    slug: "aroma",
    title: "Арома-ритуал",
    duration: "80 мин",
    price: "12 200 ₽",
    category: "Тело",
    description:
      "Тёплые масла и дыхательные паузы. Для мягкого выхода из ментальной перегрузки.",
  },
  {
    slug: "back",
    title: "Терапия спины",
    duration: "70 мин",
    price: "10 800 ₽",
    category: "Тело",
    description:
      "Фокус на шейно-воротниковой зоне и пояснице. Для тех, кто проводит день за столом.",
  },
  {
    slug: "detox",
    title: "Детокс-уход",
    duration: "90 мин",
    price: "14 600 ₽",
    category: "Ритуал",
    description:
      "Сухая щётка, обёртывание и лимфодренаж — лёгкость без жёстких обещаний «сжечь всё».",
  },
  {
    slug: "couple",
    title: "Парный ритуал",
    duration: "90 мин",
    price: "28 000 ₽",
    category: "Ритуал",
    description:
      "Два мастера, одна комната, синхронный темп. Подарок, который не нужно объяснять.",
  },
] as const;

export const masters = [
  {
    name: "Елена Воронцова",
    role: "Ведущий мастер телесных практик",
    bio: "12 лет практики, обучение в Киото и Милане. Специализация — классический и лифтинг-массаж.",
  },
  {
    name: "Дарья Ким",
    role: "Мастер стоун-терапии и ритуалов",
    bio: "Строит сеанс как церемонию: температура камней, паузы, свет. Работает с хронической усталостью.",
  },
  {
    name: "Михаил Орлов",
    role: "Мастер restorative-массажа",
    bio: "Медицинский бэкграунд и мягкие техники. Помогает тем, кто приходит со спиной и шеей.",
  },
] as const;

export const quizOptions = [
  {
    id: "stress",
    label: "Снять стресс",
    resultTitle: "Стоун-терапия",
    resultText:
      "Тёплое, медленное воздействие без лишней стимуляции. Лучший ритуал, если нужно выдохнуть целиком.",
    href: "/services#stone",
  },
  {
    id: "back",
    label: "Снять боль в спине",
    resultTitle: "Классический массаж",
    resultText:
      "Глубокая проработка спины и шеи. Рекомендуем формат 90 минут, если напряжение накопилось давно.",
    href: "/services#classic",
  },
  {
    id: "detox",
    label: "Детокс",
    resultTitle: "SPA-ритуалы",
    resultText:
      "Полный цикл: тепло, масла, лимфодренаж. Не «чистка», а бережное возвращение телу лёгкости.",
    href: "/services#rituals",
  },
  {
    id: "face",
    label: "Уход за лицом",
    resultTitle: "Лифтинг-массаж",
    resultText:
      "Скульптура лица и шеи руками мастера. Результат мягкий, без отёка и агрессии.",
    href: "/services#lifting",
  },
] as const;
