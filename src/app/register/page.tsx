import RegisterForm from "@/components/modules/auth/register/RegisterForm";

import Image from "next/image";
import homeImg from "../assets/images/welcome.jpg";
const RegisterPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between items-center">
        <div className="relative w-full h-screen hidden lg:flex">
          {/* Background Image */}
          <Image src={homeImg} fill alt="Home" className="object-cover z-0 h-screen" />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Logo and content */}
          <div className="absolute left-1/2 top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
            <h1 className="text-3xl font-black flex items-center justify-center">
              
              <span className="text-white">9 am</span>
            </h1>
            <p className="text-white">
                Welcome to <span className="text-yellow-500">Trek Tales</span>, your adventure begins here!
            </p>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
