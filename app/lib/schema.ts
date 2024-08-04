import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  fullname: z
    .string({ required_error: "Fullname is required" })
    .min(3, "Fullname is too short")
    .max(100, "Fullname is too long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, "Password is too short")
    .max(100, "Password is too long"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, "Password is too short")
    .max(100, "Password is too long"),
});

export const newsletterInputSchema = z.object({
  email: z
    .string({ required_error: "Enter your email." })
    .email()
    .min(1, "enter a longer email"),
});

export const forgetPasword = z.object({
  email: z
    .string({ required_error: "Enter your email." })
    .email()
    .min(1, "enter a longer email"),
});

export const confirmOtp = z.object({
  otp: z
    .string({ required_error: "Enter the 6 digits otp code." })
    .min(6, "your otp is not complete.")
    .max(6, "your otp is more than required."),
});

export const changePassword = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function generateUserID(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let userID = "";
  for (let i = 0; i < length; i++) {
    userID += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return userID;
}
