Este proyecto usa [Next.js](https://nextjs.org) y se creó con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Primeros pasos

Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver la aplicación.

Puedes empezar a editar la página modificando `app/page.js`. La página se actualiza automáticamente al guardar los cambios.

Este proyecto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una familia tipográfica de Vercel.

## Más información

Para obtener más información sobre Next.js, consulta estos recursos:

- [Documentación de Next.js](https://nextjs.org/docs): descubre las funciones y la API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn): tutorial interactivo de Next.js.

También puedes visitar [el repositorio de Next.js en GitHub](https://github.com/vercel/next.js). ¡Tus comentarios y contribuciones son bienvenidos!

## Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), creada por el equipo de Next.js.

Consulta [la documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para obtener más información.

## Limitación de solicitudes de la API

Las rutas POST sensibles de la API usan el helper compartido `rateLimit` en `src/lib/rate-limit.js`. Identifica a los clientes mediante `x-forwarded-for` (primera IP) o `x-real-ip`, permite el número configurado de solicitudes en cada intervalo de 60 segundos, devuelve una respuesta JSON `429` con las cabeceras `Retry-After` y de limitación, y elimina periódicamente las entradas caducadas.

Úsalo al principio del manejador de una ruta, antes de realizar otras operaciones:

```js
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  const rateLimitResponse = rateLimit(request, { limit: 10 });
  if (rateLimitResponse) return rateLimitResponse;

  // Continúa con el manejador de la ruta.
}
```

La implementación actual usa un `Map` en memoria, por lo que los límites solo se comparten dentro de un proceso activo de Node.js. En Vercel o en cualquier despliegue sin servidor o con varias instancias, los contadores no se comparten entre instancias y pueden reiniciarse al reiniciar una instancia. Esta es una limitación inherente a la limitación de solicitudes en memoria; despliega detrás de un proxy de confianza que proporcione las cabeceras con la IP del cliente. Las reglas actuales permiten 5 solicitudes por minuto para el inicio de sesión de administración, las consultas y las reservas de pruebas de conducción, y 10 solicitudes por minuto para la creación de vehículos, la carga de imágenes y el registro de administradores.
