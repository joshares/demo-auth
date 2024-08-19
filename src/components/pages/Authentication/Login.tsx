"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { routes } from "@/config/routes";
import FormError from "../Errors/FormError";

const loginSchema: yup.ObjectSchema<FieldValues> = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .label("Email Address")
    .trim()
    .nullable(),
  password: yup.string().required().label("Password").min(6).trim(),
});

function Login() {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    console.log(payload);
  };

  return (
    <div className="grid justify-center">
      <div className="grid items-center justify-center  p-6 w-full">
        <div className="text-black  m-auto sm:min-w-[30rem]  w-full text-center">
          <div>
            <h1 className="bricolage font-bold text-xl md:text-3xl mb-3">
              Welcome Back!
            </h1>
            <div className="flex items-center justify-between gap-2 ms-4 me-4">
              <div className="w-1/3 h-[1px] bg-black"></div>
              <p className="font-semibold text-gray-600 text-xs md:text-md text-center">
                Continue with
              </p>
              <div className="w-1/3 h-[1px] bg-black"></div>
            </div>
          </div>

          <form
            className="grid gap-4 mt-6 w-full max-lg:"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-1.5">
              <label htmlFor="email" className="font-medium text-sm text-left">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="yourname@email.com"
                className="bg-gray-100 rounded-full pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm"
              />
              {errors.email ? (
                <FormError message={errors.email.message} />
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <label
                htmlFor="password"
                className="font-medium text-sm text-left"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                className="bg-gray-100 rounded-full pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm"
              />
              {errors.password ? (
                <FormError message={errors.password.message} />
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <label
                htmlFor="toggleSwitch"
                className="font-normal text-sm text-left"
              >
                Remember Info
              </label>
              {/* toggle here */}
              <span className="switch" />
            </div>
            <button
              type="submit"
              className={` pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm rounded-full ${
                Object.keys(errors).length < 1
                  ? "bg-[#1E1E1E] text-white"
                  : "text-[#1E1E1E] bg-[#F5F5F5]"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="grid gap-3 mt-4">
            <Link
              href={routes.resetPasswordEmail}
              className="text-[15px] font-medium text-[#525252]"
            >
              Forgotten Password?
            </Link>
            <Link
              href={routes.register}
              className="text-sm text-[#3D8DFF] font-medium underline"
            >
              Create an account!
            </Link>
            <p className="text-[#8D8D8D] text-xs font-normal">
              Copyright © 2024 Queens. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
