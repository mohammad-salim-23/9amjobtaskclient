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
import { loginUser } from "@/services/AuthService";
import NLButton from "@/components/ui/core/NLButton/NLbutton";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
// Login form validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
 
  const[rememberMe , setRememberMe] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser({...data, rememberMe});
      console.log("Login Response:", res);

      if (res?.message === "Login successful") {
        localStorage.setItem("accessToken", res.token);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res?.message || "Login successful.",
        }).then(() => {
          router.push("/dashboard"); 
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: res?.message || "Invalid credentials. Please try again.",
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
            <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
            <p className="text-gray-600 text-sm">
              Please enter your credentials to login
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
    {/* Remember Me */}
         <div className="flex items-center gap-2 ">
            <Checkbox
            className="cursor-pointer"
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange= {(value: boolean)=>setRememberMe(value as boolean)}
            />
             <label
                  htmlFor="rememberMe"
                  className="text-sm cursor-pointer select-none"
                >
                  Remember Me
                </label>
         </div>
              {/* Submit button */}
              <div>
                <NLButton variant="secondary" className="w-full" type="submit">
                  {isSubmitting ? "Logging in..." : "Login"}
                </NLButton>
                <p className="text-center text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary-500 font-semibold"
                  >
                    Register Now
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

export default LoginForm;
