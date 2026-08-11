# ZOMBI shop

Сайт мерча: https://zombishop.loca.lt

## Публичная ссылка (сейчас)

Пока компьютер включён и запущен туннель, сайт доступен по адресу:

**https://zombishop.loca.lt**

При первом заходе localtunnel может попросить ввести IP — это защита сервиса, после этого откроется магазин.

### Как поднять ссылку снова

В одном терминале:

```bash
npm run serve
```

В другом:

```bash
npm run tunnel
```

## Постоянный адрес (Vercel / Netlify)

Чтобы получить постоянный `https://zombishop.vercel.app` без туннеля:

1. Залогинься: `npx vercel login`
2. Опубликуй: `npx vercel --name zombishop --prod`

Или Netlify: `npx netlify login` → `npx netlify deploy --prod --dir=dist`

## Локально

```bash
npm install
npm run dev
```

Обычно: http://127.0.0.1:5173
