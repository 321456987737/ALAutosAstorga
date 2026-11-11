import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import TestDrive from "@/models/TestDrive";

const ALLOWED_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
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
          message: "El identificador de la prueba de conducción no es válido.",
        },
        { status: 400 }
      );
    }

    const testDrive =
      await TestDrive.findById(id)
        .populate({
          path: "carId",
          select:
            "make model year price currency mileage mileageUnit images status",
        })
        .lean();

    if (!testDrive) {
      return NextResponse.json(
        {
          success: false,
          message: "No se ha encontrado la prueba de conducción.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        testDrive,
      },
    });
  } catch (error) {
    console.error(
      "Admin test drive GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se ha podido cargar la prueba de conducción.",
      },
      { status: 500 }
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
          message: "El identificador de la prueba de conducción no es válido.",
        },
        { status: 400 }
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
            "El estado de la prueba de conducción no es válido.",
        },
        { status: 400 }
      );
    }

    const testDrive =
      await TestDrive.findByIdAndUpdate(
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

    if (!testDrive) {
      return NextResponse.json(
        {
          success: false,
          message: "No se ha encontrado la prueba de conducción.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "El estado de la prueba de conducción se ha actualizado correctamente.",
      data: {
        testDrive,
      },
    });
  } catch (error) {
    console.error(
      "Admin test drive PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se ha podido actualizar la prueba de conducción.",
      },
      { status: 500 }
    );
  }
}