"use client";

import React from "react";
import clsx from "clsx";
import SignUpForm from "./_components/SignUpForm";

const SignUpPage = () => {
  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col items-center justify-center",
        "bg-[--color-white]",
        "text-[--color-primary-950]",
        "font-[var(--font-suit)]",
      )}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
