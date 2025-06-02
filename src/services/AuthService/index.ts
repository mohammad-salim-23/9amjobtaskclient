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
    (await cookies()).delete("accessToken");
}


