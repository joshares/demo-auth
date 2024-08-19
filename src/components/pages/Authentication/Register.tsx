"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../Errors/FormError";
import { CountryInput } from "../../Inputs/CountryInput";
import { constants } from "@/config/constants";

const registerSchema: yup.ObjectSchema<FieldValues> = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .label("Email Address")
    .trim()
    .nullable(),

  country: yup.string().required().label("Country").trim().nullable(),
  password: yup.string().required().label("Password").min(6).trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required()
    .label("Confirm Password")
    .trim(),
});

function Register() {
  const { COUNTRY_LIST } = constants;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    console.log(payload);
  };

  return (
    <div className="grid justify-center">
      <div className="grid items-center justify-center p-6  w-full">
        <div className="text-black sm:min-w-[30rem] m-auto text-center">
          <div>
            <h1 className="bricolage font-bold text-xl md:text-3xl mb-3">
              Let’s get you started!
            </h1>
            <div className="flex items-center justify-between gap-2 ms-4 me-4">
              <div className="w-1/3 h-[1px] bg-black"></div>
              <p className="font-semibold text-gray-600 text-xs md:text-md text-center">
                Sign up with
              </p>
              <div className="w-1/3 h-[1px] bg-black"></div>
            </div>
          </div>

          <form
            className="grid gap-4 mt-6 w-full"
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
              <label htmlFor="email" className="font-medium text-sm text-left">
                Country
              </label>
              <CountryInput
                items={COUNTRY_LIST.sort((a, b) => {
                  return a.name.localeCompare(b.name, undefined, {
                    sensitivity: "base",
                  });
                })}
                base={
                  "bg-gray-100 rounded-full pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm w-full h-10"
                }
                // field={...register("email")}
                control={control}
                name="country"
                loading={false}
                isDisabled={false}
                disableKeys={[""]}
                showSearch={true}
              />
              {/* <input
                {...register("email")}
                type="email"
                placeholder="yourname@email.com"
                className="bg-gray-100 rounded-full pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm"
              /> */}
              {errors.country ? (
                <FormError message={errors.country.message} />
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
                htmlFor="confirmPassword"
                className="font-medium text-sm text-left"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Enter password"
                className="bg-gray-100 rounded-full pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm"
              />
              {errors.confirmPassword ? (
                <FormError message={errors.confirmPassword.message} />
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <p className="font-medium text-xs">
                By clicking, you agree to Queen’s{" "}
                <span className="text-[#3D8DFF] underline">Privacy Policy</span>{" "}
                and{" "}
                <span className="text-[#3D8DFF] underline">
                  terms of service
                </span>
              </p>
              <span className="switch" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={` pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm rounded-full ${
                Object.keys(errors).length < 1
                  ? "bg-[#1E1E1E] text-white"
                  : "text-[#1E1E1E] bg-[#F5F5F5]"
              }`}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className="grid gap-3 mt-4">
            <Link
              href="/login"
              className="text-sm text-[#3D8DFF] font-medium underline"
            >
              Login
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

export default Register;
