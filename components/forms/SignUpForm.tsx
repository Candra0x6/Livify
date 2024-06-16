"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import signUp from "@/app/api/v1/auth/signUpAction";
import { PasswordToggle } from "../PasswordToggle";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "*Username must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "*Invalid Email Address",
  }),
  password: z.string().min(6, {
    message: "*Password must be at least 6 characters long",
  }),
});

export interface formData extends z.infer<typeof formSchema> {}

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [toggleButton, setToggleButton] = useState(false);

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const togglePassword = useCallback(
    (type: "password" | "text") => {
      setPasswordType(type);
    },
    [passwordType]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: formData) => {
    try {
      setToggleButton(true);
      await signUp(formData); // Pass plain object
    } catch (error) {
      console.error(error);
    } finally {
      setToggleButton(false);
    }
  };
  return (
    <Form {...form}>
      <div className="space-y-5 p-8 flex flex-col">
        <div className="flex flex-col items-center w-full">
          <Heading className="text-primarytext text-center text-3xl">
            Sign Up
          </Heading>
          <Text className="text-subtext2 text-sm font-LatoRegular">
            Please Register using fill field detail below
          </Text>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaRegUser className="text-subtext2" />
                  </div>
                  <Input
                    className="text-md border border-gray-300 text-subtext2 font-LatoRegular focus:ring-pink focus:ring-offset-1 block w-full pl-10 "
                    placeholder="Username"
                    type="text"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 mt-[1px] pointer-events-none">
                    <MdOutlineEmail className="text-subtext2 text-xl" />
                  </div>
                  <Input
                    className="text-md border border-gray-300 text-subtext2 font-LatoRegular focus:ring-pink focus:ring-offset-1 block w-full pl-10    "
                    placeholder="Example@mail.com"
                    type="email"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative ">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <MdOutlineLock className="text-subtext2 text-xl" />
                  </div>
                  <Input
                    id="hs-toggle-password"
                    className="text-md border border-gray-300 text-subtext2 font-LatoRegular focus:ring-pink focus:ring-offset-1 block w-full pl-10 "
                    placeholder="Password"
                    type={passwordType}
                    {...field}
                  />
                  <PasswordToggle
                    passwordType={passwordType}
                    togglePassword={togglePassword}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={toggleButton}
          type="submit"
          className="bg-pink text-white font-JosefinRegular w-full text-md"
        >
          {toggleButton ? "Submiting..." : "Submit"}
        </Button>
        <Text className="text-subtext2 text-sm font-LatoRegular flex w-full justify-center">
          Already have an Account ?{" "}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-blue font-LatoBold ml-2 cursor-pointer"
          >
            Sign In
          </span>
        </Text>
      </div>
    </Form>
  );
};
