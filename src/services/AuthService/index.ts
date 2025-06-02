/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const result = await res.json()

        if (result?.message == "User created successfully") {
            (await cookies()).set("accessToken", result?.token)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })

        const result = await res.json()

        if (result?.message=="Login successful") {
            (await cookies()).set("accessToken", result?.token)
        }

        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    }
    else {
        return null
    }
}


export const logout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
      method: "POST",
      credentials: "include",  // for send cookies
    });

    if (res.ok) {

      return { message: "Logout successful" };
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    return Error(error instanceof Error ? error.message : String(error));
  }
};


