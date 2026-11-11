import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import {connectDB} from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import User from "@/models/User";

export async function POST(request) {
  const rateLimitResponse = rateLimit(request, { limit: 10 });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
      setupKey,
    } = body;

    if (!name || !email || !password || !setupKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Todos los campos son obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "La clave de configuración no es válida.",
        },
        {
          status: 403,
        }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "El nombre debe tener al menos 2 caracteres.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "La contraseña debe tener al menos 8 caracteres.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "La cuenta de administrador ya está creada.",
        },
        {
          status: 403,
        }
      );
    }

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Ya existe una cuenta con este correo electrónico.",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      role: "admin",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "La cuenta de administrador se ha creado correctamente.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ADMIN SIGNUP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Se ha producido un error al crear la cuenta de administrador.",
      },
      {
        status: 500,
      }
    );
  }
}