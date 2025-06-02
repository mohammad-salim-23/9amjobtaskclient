
import Image from "next/image";
import homeImg from "../assets/images/welcome.jpg"; 
import LoginForm from "@/components/modules/auth/login/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between items-center">
        {/* Background Image and overlay for large screens */}
        <div className="relative w-full h-screen hidden lg:flex">
          {/* Background Image */}
          <Image src={homeImg} fill alt="Home" className="object-cover z-0 h-screen" />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/*content */}
          <div className="absolute left-1/2 top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 text-center">
            <h1 className="text-3xl font-black flex items-center justify-center">
              <span className="text-white">9 am</span>
            </h1>
            <p className="text-white">
              Welcome back to <span className="text-yellow-500">Trek Tales</span>. Login to continue your adventure!
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div>
          <LoginForm/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
