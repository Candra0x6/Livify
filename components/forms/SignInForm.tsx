"use client";
import { useAuth } from "@/app/AuthProvide";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/auth/useSession";
import { signIn } from "@/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineLock, MdOutlineMail } from "react-icons/md";
import { z } from "zod";
import { PasswordToggle } from "../PasswordToggle";
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
  const { updateAuth } = useAuth();
  const router = useRouter();
  const { newSession } = useSession();
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
        toast.error("You already Sign-In");
        window.location.href = "/";
      } else {
        if (signInAction.ok) {
          const userData = await signInAction.json();
          if (userData) {
            const response = newSession(userData.user.id);
            const sessionData = await (await response).json();
            updateAuth(sessionData, userData.user);
            if ((await response).ok) {
              toast.success("Successfully Login");
              router.push("/");
            } else {
              toast.error("Something went wrong, try again later");
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
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
