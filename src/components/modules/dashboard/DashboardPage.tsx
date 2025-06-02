/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/services/AuthService";
import profile from "../../../app/assets/images/profile.jpg";
import Image from "next/image";
import Swal from "sweetalert2";
const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Toggle profile menu
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

   const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      localStorage.removeItem("accessToken");
      await logout();
      router.push("/");
      Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
    }
  };

  const handleShopClick = (shopName: string) => {
  router.push(`/shop/${shopName}`);
};
  return (
    <div className="p-6 grid grid-cols-1 gap-2">
      <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <div className="relative">
          {/* Profile Icon */}
          <button
            className="text-xl font-bold cursor-pointer mt-4"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Image src={profile}  alt="profile"
             width={30}  
    height={30}  
    className="rounded-full"></Image>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg p-4">
              {user && (
                <div>
                  <h2 className="text-xl mb-2">Your Shop Names:</h2>
                  <ul className="list-disc pl-6">
                    {user.shopNames.map((shop: string) => (
                      <li
                        key={shop}
                        className="cursor-pointer text-teal-500 hover:underline"
                        onClick={() => handleShopClick(shop)}
                      >
                        {shop}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-2" />
                </div>
              )}
              <button
                className="text-red-500 font-semibold mt-2 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
