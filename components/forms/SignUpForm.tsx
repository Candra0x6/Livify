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
import { createSession } from "@/lib/auth/auth";
import { signUp } from "@/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { z } from "zod";
import { PasswordToggle } from "../PasswordToggle";
import { Heading } from "../ui/heading";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Text } from "../ui/text";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "*Username must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "*Invalid Email Address",
  }),
  password: z.string().min(6, {
    message: "*Password must be at least 6 characters long",
  }),
  role: z.enum(["BUYER", "SELLER"], {
    required_error: "You must specify at least one role",
  }),
});

export interface formData extends z.infer<typeof formSchema> {}

export const SignUpForm: React.FC = () => {
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
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: formData) => {
    try {
      setToggleButton(true);
      const signUpAction = await signUp(formData);
      const userData: {
        user: User;
      } = await signUpAction.json();

      if (userData?.user) {
        const response = newSession(userData.user.id);
        if ((await response).ok) {
          const sessionData = await (await response).json();
          updateAuth(sessionData, userData.user);
          toast.success("Successfully created account 🥳");
          if (userData.user.role === "SELLER") {
            router.push(`/sign-up/store/create?userId=${userData.user.id}`);
          } else {
            router.push("/");
          }
        } else {
          toast.error("Something went wrong, try again later 😬");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setToggleButton(false);
    }
  };
  return (
    <Form {...form}>
      <div className="space-y-5 flex flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaRegUser className="text-subtext2" />
                </div>
                <FormControl>
                  <Input
                    className="text-md border border-meta-foreground/20 bg-meta text-meta-foreground focus:ring-meta focus:ring-offset-1 block w-full pl-10 "
                    placeholder="Username"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </div>
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="BUYER"
                      id="BUYER"
                      className="text-primary"
                    />
                    <Label htmlFor="BUYER" className="text-foreground">
                      Buyer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="SELLER"
                      id="SELLER"
                      className="text-primary"
                    />
                    <Label htmlFor="SELLER" className="text-foreground">
                      Seller
                    </Label>
                  </div>
                </RadioGroup>
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
          Already have an Account ?{" "}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <span
            onClick={() => router.push("/sign-in")}
            className="text-primary font-bold ml-2 cursor-pointer"
          >
            Sign In
          </span>
        </Text>
      </div>
    </Form>
  );
};
