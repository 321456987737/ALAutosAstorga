import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

const ALLOWED_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Closed",
];

export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "El identificador de la consulta no es válido.",
        },
        {
          status: 400,
        }
      );
    }

    const inquiry =
      await Inquiry.findById(id)
        .populate({
          path: "carId",
          select:
            "make model year price currency mileage mileageUnit images status",
        })
        .lean();

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "No se ha encontrado la consulta.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        inquiry,
      },
    });
  } catch (error) {
    console.error(
      "Admin inquiry GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se ha podido cargar la consulta.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "El identificador de la consulta no es válido.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    if (
      !body.status ||
      !ALLOWED_STATUSES.includes(
        body.status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "El estado de la consulta no es válido.",
        },
        {
          status: 400,
        }
      );
    }

    const inquiry =
      await Inquiry.findByIdAndUpdate(
        id,
        {
          $set: {
            status: body.status,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate({
          path: "carId",
          select:
            "make model year price currency images status",
        })
        .lean();

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "No se ha encontrado la consulta.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "El estado de la consulta se ha actualizado correctamente.",
      data: {
        inquiry,
      },
    });
  } catch (error) {
    console.error(
      "Admin inquiry PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se ha podido actualizar la consulta.",
      },
      {
        status: 500,
      }
    );
  }
}