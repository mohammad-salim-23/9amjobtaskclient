/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { registerUser } from "@/services/AuthService";
import NLButton from "@/components/ui/core/NLButton/NLbutton";
import { registrationSchema } from "./registerValidation";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    // splitting 
    const decodedShopNames = decodeURIComponent(data.shopNames);

    const shopNamesArray = decodedShopNames
      .split(",")
      .map((name: string) => name.trim())
      .filter((name: string) => name.length > 0);

    const finalData = {
      ...data,
      shopNames: shopNamesArray,
    };

    const res = await registerUser(finalData);
    console.log("Registration Response:", res);

    if (res?.message === "User created successfully") {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res?.message || "Registration successful.",
      }).then(() => {
        router.push("/login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: res?.message || "Something went wrong. Please try again.",
      });
    }
  } catch (error: any) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: error?.message || "Something went wrong. Please try again.",
    });
  }
};


  return (
    <div className="max-w-[95%] md:max-w-[70%] mx-auto px-5">
      <div className="flex justify-center items-center h-screen py-10">
        <div className="w-full">
          <Link href={"/"}>
            <button className="flex items-center gap-2 cursor-pointer mb-5">
              <FaArrowLeftLong /> Back Home
            </button>
          </Link>
          <div className="mb-5 space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Hi, Get Started Now 👋</h2>
            <p className="text-gray-600 text-sm">
              Enter details to create your Trek Tales account
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 grid grid-cols-1 gap-4"
            >
              {/* Username */}
              <div>
                <label className="text-sm">Username</label>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <Input {...field} value={field.value || ""} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm">Password</label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          value={field.value || ""}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                          {showPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Shop Names */}
              <div>
                <label className="text-sm">
                  Shop Names (3–4 shop names separated by commas)
                </label>
                <FormField
                  control={form.control}
                  name="shopNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="e.g., Shop1, Shop2, Shop3"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit button */}
              <div>
                <NLButton variant="secondary" className="w-full" type="submit">
                  {isSubmitting ? "Registering..." : "Register"}
                </NLButton>
                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary-500 font-semibold "
                  >
                    Login Now
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
