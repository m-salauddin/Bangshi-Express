"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";

// // get the secret key from the environment variable and encode it to Uint8Array
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // search user in the database using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // if user not found or password does not match, return error
    if (!user || user.password !== password) {
      return { error: "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!" };
    }

    // check user role 
    if (user.role !== "ADMIN") {
      return { error: "আপনার এই প্যানেলে প্রবেশের অনুমতি নেই!" };
    }

    // JWT token create 
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d") 
      .sign(secretKey);

    // brawser cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // ১ দিন
    });
  } catch (error) {
    return { error: "সার্ভারে কোনো সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" };
  }

 // if everything is successful, redirect to the admin dashboard
  redirect("/admin/dashboard");
}






//




// export async function loginAdmin(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   console.log("Email:", email);
//   console.log("Password:", password);

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   console.log("User:", user);

//   if (!user) {
//     console.log("User not found");
//     return { error: "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!" };
//   }

//   console.log("DB Password:", user.password);
//   console.log("Password Match:", user.password === password);

//   if (user.password !== password) {
//     return { error: "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!" };
//   }

//   console.log("Role:", user.role);

//   if (user.role !== "ADMIN") {
//     return { error: "আপনার এই প্যানেলে প্রবেশের অনুমতি নেই!" };
//   }

//   console.log("Creating JWT...");
//   // ...
// }