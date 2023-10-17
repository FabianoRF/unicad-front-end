"use client";
import { Inputs } from "@/app/create-delivery/page";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<Inputs>;
  name: keyof Inputs;
  label: string;
  required: boolean;
}

export default function Input({
  register,
  name,
  label,
  required,
  ...rest
}: IInputProps) {
  return (
    <>
      <label
        htmlFor={name}
        className="w-full text-sm font-medium leading-6 text-gray-900 text-left"
      >
        {label}
      </label>
      <input
        id={name}
        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...register(name, { required })}
        {...rest}
      />
    </>
  );
}
