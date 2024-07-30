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
import { createSession, getSession } from "@/lib/auth/auth";
import { signIn } from "@/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineLock, MdOutlineMail } from "react-icons/md";
import { z } from "zod";
import { PasswordToggle } from "../PasswordToggle";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const formSchema = z.object({
  email: z.string().email({
    message: "*Invalid Email Address",
  }),
  password: z.string().min(6, {
    message: "*Password must be at least 6 characters long",
  }),
});

export interface signInData extends z.infer<typeof formSchema> {}
export const SignInForm: React.FC<{ cookie: string | undefined }> = ({
  cookie,
}) => {
  const router = useRouter();
  const [toggleButton, setToggleButton] = useState(false);

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const togglePassword = useCallback(
    (type: "password" | "text") => {
      setPasswordType(type);
    },
    [passwordType]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signInData) => {
    try {
      setToggleButton(true);
      const signInAction = await signIn(data);
      if (cookie) {
        alert("You Already Sign-In");
        router.push("/");
      } else {
        if (signInAction.ok) {
          const userData = await signInAction.json();
          if (userData) {
            const response = await fetch(
              "http://localhost:3000/api/v1/auth/session/new",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userData.user.id }),
              }
            );

            if (response.ok) {
              router.push("/");
            } else {
              alert("Eror create session, try sign in again");
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setToggleButton(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 mt-[1px] pointer-events-none">
                    <MdOutlineMail className=" text-xl" />
                  </div>
                  <Input
                    className="text-md border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full pl-10 "
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
                    className="text-md border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full pl-10 "
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
          className="w-full text-md"
        >
          {toggleButton ? "Submiting..." : "Submit"}
        </Button>
        <Text className="text-sm flex w-full justify-center">
          Dont have an Account ?{" "}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <span
            onClick={() => router.push("/sign-up")}
            className="text-primary font-bold ml-2 cursor-pointer"
          >
            Sign Up
          </span>
        </Text>
        <Text className="text-primary font-bold ml-2 cursor-pointer text-sm  flex w-full justify-center">
          Forget Password ?
        </Text>
      </form>
    </Form>
  );
};
