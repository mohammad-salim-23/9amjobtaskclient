import { z } from "zod";

export const registrationSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, { message: "Username must be at least 2 characters" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

  shopNames: z
    .string({
      required_error: "Shop Names are required",
    })
    .refine(
      (val) => {
        const shops = val.split(",").map((shop) => shop.trim());
        return shops.length >= 3 && shops.length <= 4 && shops.every((shop) => shop.length > 0);
      },
      {
        message: "Provide 3–4 shop names separated by commas",
      }
    ),
});
