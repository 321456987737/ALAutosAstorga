import NextAuth from "next-auth";

import { authOptions } from "../../../../lib/auth";
import { rateLimit } from "@/lib/rate-limit";

const handler = NextAuth(authOptions);

export { handler as GET };

export async function POST(request, context) {
  const rateLimitResponse = rateLimit(request, { limit: 5 });
  if (rateLimitResponse) return rateLimitResponse;

  return handler(request, context);
}