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
import { createSession } from "@/lib/auth/auth";
import { signUp } from "@/utils/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
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
	const router = useRouter();
	const [toggleButton, setToggleButton] = useState(false);

	const [passwordType, setPasswordType] = useState<"password" | "text">(
		"password",
	);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const togglePassword = useCallback(
		(type: "password" | "text") => {
			setPasswordType(type);
		},
		[passwordType],
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
				user: {
					id: string;
					role: string;
				};
			} = await signUpAction.json();

			if (userData?.user) {
				// Panggil API Route untuk membuat sesi
				const response = await fetch(
					"http://localhost:3000/api/v1/auth/session/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ userId: userData.user.id }),
					},
				);

				console.log(response.status);
				if (response.ok) {
					if (userData.user.role === "SELLER") {
						router.push(`/sign-up/store/create?userId=${userData.user.id}`);
					} else {
						router.push("/");
					}
				} else {
					console.error("Gagal membuat sesi");
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
					name="name"
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
											className="text-pink"
										/>
										<Label htmlFor="BUYER" className="text-primarytext">
											Buyer
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="SELLER"
											id="SELLER"
											className="text-pink"
										/>
										<Label htmlFor="SELLER" className="text-primarytext">
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
					className="bg-pink text-white font-JosefinRegular w-full text-md"
				>
					{toggleButton ? "Submiting..." : "Submit"}
				</Button>
				<Text className="text-subtext2 text-sm font-LatoRegular flex w-full justify-center">
					Already have an Account ?{" "}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
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
