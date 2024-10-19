"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// axios
import axios from "axios";
// use-toast
import { useToast } from "@/hooks/use-toast";
// auth context
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useNavigate();
  const { toast } = useToast();
  // auth context
  const { company, isAuthenticated, login, logout, isLoading } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router("/dashboard");
    }
  }, [isLoading]);

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    // send email
    const URL = import.meta.env.VITE_URL!;
    const response = await axios.post(`${URL}/api/otp/generate`, { email });
    if (response.status === 200) {
      toast({
        title: "OTP sent successfully.",
        variant: "default",
      });
      // Set otpSent to true to display the OTP input field
      setOtpSent(true);
      return;
    }
    toast({
      title: "Error in sending OTP",
      description: "Email might not be valid",
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // login api
      const URL = import.meta.env.VITE_URL!;
      const response = await axios.post(`${URL}/api/company/login`, {
        email,
        otp,
      });
      if (response.status === 200) {
        toast({
          title: "Logged in successfully.",
          variant: "default",
        });

        login(response.data);
        // redirect to the dashboard
        router("/dashboard");
        return;
      }
    } catch (error) {
      toast({
        title: (error as any).response.data.message,
        description: "Please check detail",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="pl-10 pr-20"
            />
            <Button
              type="button"
              onClick={handleSendOtp}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm"
              disabled={otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </Button>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="pl-10"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
