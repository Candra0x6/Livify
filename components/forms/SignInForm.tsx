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
import { MdOutlineLock, MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import signIn from "@/app/api/v1/auth/signInAction";
import { formData } from "./SignUpForm";

const formSchema = z.object({
  email: z.string().email({
    message: "*Invalid Email Address",
  }),
  password: z.string().min(6, {
    message: "*Password must be at least 6 characters long",
  }),
});

export interface signInData extends z.infer<typeof formSchema> {}
export const SignInForm: React.FC = () => {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState(false);

  const handleTogglePassword = () => {
    setTogglePassword((prevState) => !prevState);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: signInData) => {
    try {
      await signIn(values);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-8 ">
        <div className="flex flex-col items-center w-full">
          <Heading className="text-primarytext text-center text-3xl">
            Sign In
          </Heading>
          <Text className="text-subtext2 text-sm font-LatoRegular">
            Please Register using fill field detail below
          </Text>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 mt-[1px] pointer-events-none">
                    <MdOutlineMail className="text-subtext2 text-xl" />
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
                    type={togglePassword ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    id="hs-toggle-password"
                    size="icon"
                    onClick={handleTogglePassword}
                    className="absolute end-2 flex items-center ps-3.5 inset-y-0"
                  >
                    {togglePassword ? (
                      <AiOutlineEye className="text-subtext2 text-xl" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-subtext2 text-xl" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-pink text-white font-JosefinRegular w-full text-md"
        >
          Submit
        </Button>
        <Text className="text-subtext2 text-sm font-LatoRegular flex w-full justify-center">
          Dont have an account ?{" "}
          <span
            onClick={() => router.push("/sign-up")}
            className="text-blue font-LatoBold ml-2 cursor-pointer"
          >
            Sign Up
          </span>
        </Text>
        <Text className="text-blue font-LatoBold ml-2 cursor-pointer text-sm  flex w-full justify-center">
          Forget Password ?
        </Text>
      </form>
    </Form>
  );
};
