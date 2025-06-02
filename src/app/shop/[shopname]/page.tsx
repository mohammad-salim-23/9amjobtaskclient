"use client";
import { useParams } from "next/navigation";

export default function ShopPage() {
  const params = useParams();
  const shopName = params.shopname as string;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">This is {shopName} shop</h1>
    </div>
  );
}
