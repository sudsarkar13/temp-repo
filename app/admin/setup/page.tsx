"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Password validation regex
const passwordRegex = {
  minLength: /.{8,}/,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export default function AdminSetup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const validatePassword = (password: string) => {
    const errors = [];
    if (!passwordRegex.minLength.test(password)) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!passwordRegex.hasUpperCase.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!passwordRegex.hasLowerCase.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!passwordRegex.hasNumber.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!passwordRegex.hasSpecialChar.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate name
    if (name.trim().length < 2) {
      toast({
        title: "Error",
        description: "Name must be at least 2 characters long",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Password Requirements",
        description: passwordErrors.join("\n"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Admin account created successfully. Please log in.",
          variant: "default",
        });
        router.push("/admin/login");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create admin account",
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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-[calc(100vh-80px)] flex items-center justify-center bg-primary"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Card className="w-full max-w-[400px] bg-[#27272c] border-none text-white">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
              </div>
              <CardTitle className="text-2xl text-accent">Admin Setup</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create your admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11 w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-11 w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-10 h-11 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-white/50 space-y-1 mt-2">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside">
                      <li className={password.length >= 8 ? "text-green-400" : ""}>At least 8 characters</li>
                      <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>One uppercase letter</li>
                      <li className={/[a-z]/.test(password) ? "text-green-400" : ""}>One lowercase letter</li>
                      <li className={/\d/.test(password) ? "text-green-400" : ""}>One number</li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-400" : ""}>One special character</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-10 h-11 w-full"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-primary h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
