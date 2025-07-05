"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import axios from "axios";

export default function SignUpPage() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    companyName: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/auth/signup", data);
      if (res.status === 201) {
        router.push("/auth/sign-in");
      }
      console.log(res);
    } catch (error) {
      console.error(error);
      alert("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const changeHandler = async (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">TenderHub</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your company account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>
              Create your account to start managing tenders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={changeHandler}
                  required
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  required
                  placeholder="Create a password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
