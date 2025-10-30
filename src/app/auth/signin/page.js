"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/component/shared/form/InputField";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidation } from "@/component/validation/signinValidation";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

const Login = () => {

  // useForm Hook:-
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinValidation) });
  const router = useRouter();
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin");
  const [loader,setLoader]= useState(false)



//  Submit handler :-
  const onSubmit = async (data) => {
    const { email, password } = data;
    const localData = localStorage?.getItem("register");
    setLoader(true)
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        localData,
      });
      if (res.error) {
         errorMsg("Invalid credentials");
        setLoader(false)
      } else {
        setCurrentLogin(email)
        router.replace("/expense");
        return successMsg("Login Successfully");
      }
    } catch (error) {
       errorMsg("Login Error");
       setLoader(false)
    }
  };

  return (
    <>
    <div className="flex items-center  justify-center h-screen  bg-[url('/bg-cloud.jpg')] bg-cover bg-center">
      <div className="flex  rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Section */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/signin.jpg"
            alt="Login Visual"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="bg-[#2563EB] opacity-[70%] w-[50%] flex items-center justify-center p-10">
          <Sheet
            variant="plain"
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              maxWidth: "380px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full"
            >
              <Typography
                level="h3"
                className="text-white font-bold !text-5xl mb-2"
              >
                Welcome Back!
              </Typography>
              <Typography className="text-slate-200 text-sm mb-6 text-center">
                Sign in to access your guided meditations, daily practices, and
                personal journey.
              </Typography>

              {/* Email Input */}
              <FormControl className="w-full mb-4 !text-white">
                <InputField
                  control={control}
                  errors={errors}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  // label="Email"
                  className="input-area"
                />
              </FormControl>

              {/* Password Input */}
              <FormControl className="w-full mb-6">
                <InputField
                  control={control}
                  errors={errors}
                  name="password"
                  type="password"
                  placeholder="********"
                  // label="Password"
                  className="input-area"
                />
              </FormControl>

              {/* Login Button */}
              {loader === false ? (
                <Button
                  type="submit"
                  className="w-full bg-white text-[#1e40af] font-semibold py-2 rounded-full hover:bg-slate-100 transition-all"
                >
                  Login
                </Button>
              ) : (
                <div className="flex justify-center">
                  <CircularProgress size={24} sx={{ color: "white" }} />
                </div>
              )}

              {/* Sign up link */}
              <p className="text-slate-200 text-sm mt-4">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-white font-semibold">
                  Create account
                </Link>
              </p>
            </form>
          </Sheet>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;