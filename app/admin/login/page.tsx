"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
	const [passkey, setPasskey] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ passkey }),
			});

			if (response.ok) {
				toast({
					title: "Success!",
					description: "Login successful. Redirecting to dashboard...",
					variant: "default",
				});

				// Wait a moment before redirecting to show the toast
				setTimeout(() => {
					router.push("/admin/dashboard");
				}, 1000);
			} else {
				toast({
					title: "Error",
					description: "Invalid passkey. Please try again.",
						variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto min-h-screen flex items-center justify-center">
			<Card className="w-full max-w-md bg-white/5 backdrop-blur-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl text-center text-white">Admin Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2 flex flex-col justify-center items-center">
							<Label htmlFor="passkey" className="text-white">Passkey</Label>
							<Input
								id="passkey"
								type="password"
								placeholder="Enter admin passkey"
								value={passkey}
								onChange={(e) => setPasskey(e.target.value)}
								disabled={isLoading}
								required
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
