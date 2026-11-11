
import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

import Car from "@/models/Car";
import Inquiry from "@/models/Inquiry";

export async function POST(request) {
  const rateLimitResponse = rateLimit(request, { limit: 5 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    await connectDB();

    const body = await request.json();

    const customerName = body.customerName?.trim();
    const phone = body.phone?.trim();
    const email =
      body.email?.trim().toLowerCase() || "";
    const message = body.message?.trim();
    const carId = body.carId?.trim() || null;

    if (!customerName) {
      return NextResponse.json(
        {
          success: false,
          message: "Introduce tu nombre.",
        },
        { status: 400 }
      );
    }

    if (customerName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El nombre debe tener al menos 2 caracteres.",
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Introduce tu número de teléfono.",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Escribe un mensaje.",
        },
        { status: 400 }
      );
    }

    if (message.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El mensaje debe tener al menos 5 caracteres.",
        },
        { status: 400 }
      );
    }

    if (email) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Introduce una dirección de correo electrónico válida.",
          },
          { status: 400 }
        );
      }
    }

    if (
      carId &&
      !mongoose.Types.ObjectId.isValid(carId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "El vehículo no es válido.",
        },
        { status: 400 }
      );
    }

    if (carId) {
      const car = await Car.findById(carId)
        .select("_id")
        .lean();

      if (!car) {
        return NextResponse.json(
          {
            success: false,
            message: "No se ha encontrado el vehículo.",
          },
          { status: 404 }
        );
      }
    }

    const inquiry = await Inquiry.create({
      carId,
      customerName,
      phone,
      email,
      message,
      source: "Website",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Tu consulta se ha enviado correctamente.",
        data: {
          inquiryId: inquiry._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Create inquiry error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Se ha producido un error. Inténtalo de nuevo.",
      },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import Business from "@/models/Business";
// import Car from "@/models/Car";
// import Inquiry from "@/models/Inquiry";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();

//     const customerName = body.customerName?.trim();
//     const phone = body.phone?.trim();
//     const email = body.email?.trim().toLowerCase() || "";
//     const message = body.message?.trim();
//     const carId = body.carId?.trim() || null;

//     if (!customerName) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please enter your name",
//         },
//         { status: 400 }
//       );
//     }

//     if (customerName.length < 2) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Name must be at least 2 characters",
//         },
//         { status: 400 }
//       );
//     }

//     if (!phone) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please enter your phone number",
//         },
//         { status: 400 }
//       );
//     }

//     if (!message) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please enter a message",
//         },
//         { status: 400 }
//       );
//     }

//     if (message.length < 5) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please enter a longer message",
//         },
//         { status: 400 }
//       );
//     }

//     if (email) {
//       const emailRegex =
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//       if (!emailRegex.test(email)) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Please enter a valid email address",
//           },
//           { status: 400 }
//         );
//       }
//     }

//     if (
//       carId &&
//       !mongoose.Types.ObjectId.isValid(carId)
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid vehicle",
//         },
//         { status: 400 }
//       );
//     }

//     const business = await Business.findOne({
//       isActive: true,
//     })
//       .select("_id")
//       .lean();

//     if (!business) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Dealership not found",
//         },
//         { status: 404 }
//       );
//     }

//     if (carId) {
//       const car = await Car.findOne({
//         _id: carId,
//         businessId: business._id,
//       })
//         .select("_id")
//         .lean();

//       if (!car) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Vehicle not found",
//           },
//           { status: 404 }
//         );
//       }
//     }

//     const inquiry = await Inquiry.create({
//       businessId: business._id,
//       carId,
//       customerName,
//       phone,
//       email,
//       message,
//       source: "Website",
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message:
//           "Your inquiry has been sent successfully",
//         data: {
//           inquiryId: inquiry._id,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Create inquiry error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           "Something went wrong. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }