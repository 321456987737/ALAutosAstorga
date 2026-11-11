import Link from "next/link";
import { notFound } from "next/navigation";
import CarForm from "@/components/admin/CarForm";

async function getCar(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/admin/cars/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("No se ha podido cargar el vehículo.");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "No se ha podido cargar el vehículo."
      );
    }

    return result.data.car;
  } catch (error) {
    console.error(
      "Admin edit car fetch error:",
      error
    );

    return null;
  }
}

export default async function EditCarPage({
  params,
}) {
  const { id } = await params;

  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl md:pb-0 pb-20">
      <div className="mb-8">
        <Link
          href="/admin/cars"
          className="text-sm text-black/45 underline underline-offset-4 transition hover:text-black"
        >
          ← Volver al inventario
        </Link>

        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
            Inventario
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Editar vehículo
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45">
            Actualiza la información de{" "}
            <span className="font-medium text-black/70">
              {car.year} {car.make} {car.model}
            </span>
            .
          </p>
        </div>
      </div>

      <CarForm initialData={car} />
    </div>
  );
}