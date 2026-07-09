import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8">
        <div className="w-full bg-red-100">
          <LoginForm />
        </div>
      </div>

      {/* Right Panel - Blue Info */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-start bg-[#1c64f2] text-white px-12">
        <h1 className="text-4xl font-bold mb-4">ticktock</h1>
        <p className="text-lg">
        Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
        </p>
      </div>
    </div>
  );
}