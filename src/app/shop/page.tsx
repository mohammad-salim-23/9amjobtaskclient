"use client";

import { useEffect, useState } from "react";

const ShopPage = () => {
  const [shopName, setShopName] = useState<string>("");

  useEffect(() => {
    const hostname = window.location.hostname; 
    const parts = hostname.split(".");
    if (parts.length > 2) {
      setShopName(parts[0]);
    } else {
      setShopName("unknown");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {shopName ? `This is ${shopName} shop` : "Loading..."}
      </h1>
    </div>
  );
};

export default ShopPage;
