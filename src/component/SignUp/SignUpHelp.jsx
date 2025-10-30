"use client";
import React from "react";
import InputField from "../shared/form/InputField";
import { Button } from "@mui/joy";
import { CircularProgress, FormControl } from "@mui/material";

const SignUpHelp = ({ control, errors, loader }) => {
  return (
    <div>
      {/* Username */}
      <FormControl className="w-full mb-6">
        <InputField
          className="input-area"
          placeholder="User Name"
          control={control}
          errors={errors}
          name="username"
          type="text"
        />
      </FormControl>

      {/* Email */}
      <FormControl className="w-full mb-6">
        <InputField
          className="input-area"
          placeholder="Enter your email"
          control={control}
          errors={errors}
          name="email"
          type="email"
        />
      </FormControl>

      {/* Password */}
      <FormControl className="w-full mb-6">
        <InputField
          className="input-area"
          placeholder="********"
          control={control}
          errors={errors}
          name="password"
          type="password"
        />
      </FormControl>
      {/* Submit Button */}

      {loader === false ? (
        <Button
          type="submit"
          className="w-full max-w-[380px] mt-6 bg-white text-[#1e40af] font-semibold py-2 rounded-full hover:bg-slate-100 transition-all"
        >
          Submit
        </Button>
      ) : (
        <div className="flex justify-center mt-6">
          <CircularProgress size={24} sx={{ color: "white" }} />
        </div>
      )}
    </div>
  );
};

export default SignUpHelp;
