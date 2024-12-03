This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Para inicializar la base de datos ejecuta este comando en la terminal:

```bash
npx prisma studio
```

Luego para iniciar el webhook que permite la conexion entre servicios ejecuta este comando:

```bash
ngrok http --url=fleet-cheaply-ant.ngrok-free.app 3000
```

Finalmente Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

O tambien puedes acceder desde el siguiente link: https://fleet-cheaply-ant.ngrok-free.app/api/webhooks/clerk