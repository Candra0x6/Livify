import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/components/ui/button";

interface PasswordToggleProps {
  togglePassword: (type: "password" | "text") => void;
  passwordType: "password" | "text";
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({
  togglePassword,
  passwordType,
}) => {
  return (
    <Button
      id="hs-toggle-password"
      size="icon"
      onClick={() =>
        togglePassword(passwordType === "password" ? "text" : "password")
      }
      className="absolute end-2 flex items-center ps-3.5 inset-y-0"
    >
      {passwordType === "password" ? (
        <AiOutlineEye className="text-subtext2 text-xl" />
      ) : (
        <AiOutlineEyeInvisible className="text-subtext2 text-xl" />
      )}
    </Button>
  );
};
