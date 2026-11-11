This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API rate limiting

Sensitive API POST routes use the shared `rateLimit` helper in `src/lib/rate-limit.js`. It identifies clients from `x-forwarded-for` (first IP) or `x-real-ip`, allows the configured number of requests per 60-second window, returns a JSON `429` response with `Retry-After` and rate-limit headers, and periodically removes expired entries.

Use it at the start of a route handler, before doing other work:

```js
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  const rateLimitResponse = rateLimit(request, { limit: 10 });
  if (rateLimitResponse) return rateLimitResponse;

  // Continue with the route handler.
}
```

The current implementation uses an in-memory Map, so limits are shared only within a warm Node.js process. On Vercel or any multi-instance/serverless deployment, counters are not shared across instances and may reset when an instance restarts. This is an inherent limitation of in-memory rate limiting; deploy behind a trusted proxy that supplies client IP headers. The current rules are 5 requests/minute for admin login, inquiries, and test-drive bookings, and 10 requests/minute for admin car creation, image uploads, and admin signup.
