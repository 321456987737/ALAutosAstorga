import { NextResponse } from "next/server";

const STORE_KEY = Symbol.for("alautosastorga.rateLimitStore");
const CLEANUP_INTERVAL_MS = 60_000;

const store =
  globalThis[STORE_KEY] ??
  (globalThis[STORE_KEY] = {
    buckets: new Map(),
    lastCleanupAt: 0,
  });

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim();

  return clientIp || "unknown";
}

export function rateLimit(
  request,
  { limit, windowMs = 60_000 } = {}
) {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("Rate limit must be a positive integer.");
  }

  if (!Number.isFinite(windowMs) || windowMs < 1) {
    throw new Error("Rate limit window must be a positive number.");
  }

  const now = Date.now();

  if (now - store.lastCleanupAt >= CLEANUP_INTERVAL_MS) {
    for (const [key, bucket] of store.buckets) {
      if (bucket.resetAt <= now) {
        store.buckets.delete(key);
      }
    }

    store.lastCleanupAt = now;
  }

  const pathname = request.nextUrl?.pathname || new URL(request.url).pathname;
  const key = `${request.method}:${pathname}:${getClientIp(request)}`;
  let bucket = store.buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    bucket = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.buckets.set(key, bucket);
  } else if (bucket.count < limit) {
    bucket.count += 1;
  } else {
    const retryAfter = Math.max(
      1,
      Math.ceil((bucket.resetAt - now) / 1000)
    );
    const headers = new Headers({
      "Cache-Control": "no-store",
      "Retry-After": String(retryAfter),
      "RateLimit-Limit": String(limit),
      "RateLimit-Remaining": "0",
      "RateLimit-Reset": String(retryAfter),
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": "0",
      "X-RateLimit-Reset": String(Math.ceil(bucket.resetAt / 1000)),
    });

    return NextResponse.json(
      {
        success: false,
        message: `Has realizado demasiadas solicitudes. Inténtalo de nuevo dentro de ${retryAfter} segundos.`,
      },
      { status: 429, headers }
    );
  }

  return null;
}
