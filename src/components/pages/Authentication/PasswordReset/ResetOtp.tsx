"use client";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const ResetOTP: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const routeEmail = searchParams.get("email");

  const back = () => {
    router.back();
  };

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpInputs: React.RefObject<HTMLInputElement>[] = Array.from(
    { length: 6 },
    () => useRef<HTMLInputElement>(null)
  );

  const handleOtpChange = (index: number, value: string, e: any) => {
    if (/[0-9]/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    }

    if (index < 5 && value !== "") {
      otpInputs[index + 1]?.current?.focus();
    } else if (
      (e.key === "Backspace" || e.key === "Delete") &&
      index > 0 &&
      value === ""
    ) {
      otpInputs[index - 1]?.current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      index > 0 &&
      otpValues[index] === ""
    ) {
      otpInputs[index - 1]?.current?.focus();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const otpInput = `bg-gray-100 border-label border rounded-lg h-14 w-full rounded-10 text-2xl text-center leading-tight flex items-center justify-center maxLength-1`;

  return (
    <div className="grid items-center justify-center min-h-screen px-4">
      <div className="mt-1 cursor-pointer  md:hidden" onClick={back}>
        <IoIosArrowBack />
      </div>
      <div className="grid items-center justify-center sm:max-w-sm w-full">
        <div className="grid">
          <div className="mb-6">
            <div className="p-1 flex justify-center">
              <Image src={"/Q.png"} width={200} height={200} alt="backImg" />
            </div>
          </div>
          <div
            className="mt-8 cursor-pointer mb-4 hidden md:block"
            onClick={back}
          >
            <IoIosArrowBack />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-bold text-2xl mb-1 text-active_text ">
              Verify Email
            </h1>
            <p className="text-label text-xs font-medium">
              {routeEmail ? `Enter the OTP sent to ${routeEmail}` : "No Email"}
            </p>
          </div>

          <form className="mt-4 mb-6 " onSubmit={handleSubmit}>
            <label
              htmlFor="OTP"
              className="flex gap-3 flex-col text-xl text-center roboto font-bold text-active_text"
            >
              <div className="relative grid grid-cols-6 sm:gap-6 gap-3 justify-center items-center mb-4">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp${index + 1}`}
                    name={`otp${index + 1}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    pattern="[0-9]"
                    autoComplete={`otp${index + 1}`}
                    required
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={otpInputs[index]}
                    className={otpInput}
                  />
                ))}
              </div>
            </label>
            <button
              type="submit"
              className=" hover:bg-[#1E1E1E] text-[#1E1E1E] bg-[#F5F5F5] hover:text-white pt-2 pb-2 ps-4 pe-4 placeholder:font-normal placeholder:text-sm rounded-full w-full mt-8"
            >
              {"Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetOTP;
