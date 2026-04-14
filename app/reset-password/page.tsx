"use client";

import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#EDE0D4]">
        <p className="text-[#6F1D1B]">Loading...</p>
      </div>
    }>
      <ResetPasswordClient />
    </Suspense>
  );
}