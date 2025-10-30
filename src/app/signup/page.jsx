"use client";
import SignUpHelp from "@/component/SignUp/SignUpHelp";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import {  Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { signupValidation } from "@/component/validation/signupValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignUpform = () => {
  // useForm Hook:-
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupValidation) });
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin");
  const [data, setData] = useLocalStorage("register", []);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  //  Submit handler :-
  const onSubmit = async (registeruser) => {
    setLoader(true);
    const checkData = data.find(
      (item) =>
        item.email === registeruser.email ||
        item.username === registeruser.username
    );

    if (checkData) {
      if (checkData.email === registeruser.email) {
        errorMsg("Email is alread exist");
        setLoader(false);
      } else if (checkData.username === registeruser.username) {
        errorMsg("Username is already exist");
        setLoader(false);
      } else {
        errorMsg("User is already exist");
        setLoader(false);
      }
    } else {
      try {
        const storedData = [...data, registeruser];
        setData(storedData);
        setUser(registeruser);
        successMsg("User registered successfully");
      } catch (error) {
        errorMsg("An error occurred while saving data:", error);
      }
    }
    reset();
  };


  // After register direct login :-
  useEffect(() => {
    if (!user) return;
    const loginuser = async () => {
      const { email, password } = user;
      const localData = localStorage?.getItem("register");

      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          localData,
        });
        if (res.error) {
          return errorMsg("Invalid credentials");
        } else {
          router.replace("/expense");
          setCurrentLogin(email);
          return successMsg("Login Successfully");
        }
      } catch (error) {
        return errorMsg("Login Error");
      }
    };
    loginuser();
  }, [user]);

  
  return (
    <>
      <div className="flex items-center  justify-center h-screen  bg-[url('/bg-cloud.jpg')] bg-cover bg-center">
        <div className="flex  rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Section */}
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="/Register.png"
              alt="Sign Up Visual"
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
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full"
              >
                {/* Title */}
                <Typography
                  level="h3"
                  className="text-white font-bold !text-4xl mb-6 text-center"
                >
                  Register User
                </Typography>

                {/* Input Fields */}
                <SignUpHelp control={control} errors={errors} loader={loader} />

                {/* Footer Link */}
                <p className="text-slate-200 text-sm mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-white font-semibold"
                  >
                    Sign in
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

export default SignUpform;
