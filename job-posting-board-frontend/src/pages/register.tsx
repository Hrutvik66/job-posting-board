"use client";

import { useEffect, useState } from "react";
// shadcn-ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// lucide-icon
import { User, Mail, Phone, Users, Loader2, Check } from "lucide-react";
// validator
import { isMobilePhone } from "validator";
// use-toast
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
// auth context
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
  phone: string;
  companyName: string;
  companyEmail: string;
  employeeSize: string;
  emailOtp: string;
  mobileOtp: string;
}

const Register = () => {
  const URL = import.meta.env.VITE_URL!;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState({
    email: false,
    mobile: false,
  });
  const [isVerified, setIsVerified] = useState({ email: false, mobile: false });
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
    emailOtp: "",
    mobileOtp: "",
  });
  const { toast } = useToast();
  const router = useNavigate();
  // auth context
  const { isAuthenticated, login, isLoading } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router("/dashboard");
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!isMobilePhone(formData.phone, "en-IN")) {
        toast({
          title: "Enter valid phone no.",
          variant: "destructive",
        });
        return;
      }
      // send otp to email api
      const response = await axios.post(`${URL}api/otp/send`, {
        email: formData.companyEmail,
        company_name: formData.companyName,
      });
      if (response.status === 200) {
        toast({
          title: `OTP sent to ${formData.companyEmail}. Please check your inbox.`,
          variant: "default",
        });
        setIsRegistered(true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (type: "email" | "mobile") => {
    try {
      if (
        (type === "email" && formData.emailOtp === "") ||
        (type === "mobile" && formData.mobileOtp === "")
      ) {
        toast({
          title: `Please enter ${type} otp.`,
          variant: "destructive",
        });
        return;
      }
      if (type === "mobile" && formData.mobileOtp.length === 6) {
        setTimeout(() => {
          setIsLoadingOtp((prev) => ({ ...prev, [type]: false }));
          setIsVerified((prev) => ({ ...prev, [type]: true }));
        }, 3000);
        return;
      }
      setIsLoadingOtp((prev) => ({ ...prev, [type]: true }));
      // verification process
      const response = await axios.post(`${URL}api/otp/verify`, {
        email: formData.companyEmail,
        otp: type === "email" ? formData.emailOtp : formData.mobileOtp,
      });
      if (response.status === 200) {
        toast({
          title: `OTP verified for ${type}. You can now register.`,
          variant: "default",
        });
      }
      setTimeout(() => {
        setIsLoadingOtp((prev) => ({ ...prev, [type]: false }));
        setIsVerified((prev) => ({ ...prev, [type]: true }));
      }, 2000);
    } catch (error) {
      toast({
        title: (error as any).response.data.message,
        variant: "destructive",
      });
      setIsLoadingOtp((prev) => ({ ...prev, [type]: false }));
      setIsVerified((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}api/company/register`, {
        name: formData.name,
        phone: formData.phone,
        company_name: formData.companyName,
        company_email: formData.companyEmail,
        employee_size: formData.employeeSize,
      });
      if (response.status === 201) {
        toast({
          title: "Company registered successfully.",
          variant: "default",
        });
        login(response.data);
        setIsRegistered(false);
        router("/dashboard");
      }
    } catch (error) {
      toast({
        title: (error as any).response.data.message,
        variant: "destructive",
      });
      setIsRegistered(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 md:px-16">
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4 pt-16 md:pt-0">
          <p className="text-gray-500 dark:text-gray-400">
            Join thousands of companies already using our platform to streamline
            their operations.
          </p>
        </div>
        <div className="space-y-6 rounded-lg border border-[#0B66EF] p-4 shadow-sm">
          {!isRegistered ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h1 className="font-bold">Sign Up</h1>
              </div>
              <div className="space-y-2 relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  className="pl-10"
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="pl-10"
                  onChange={handleChange}
                  placeholder="Phone no."
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="companyName"
                  className="pl-10"
                  name="companyName"
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  className="pl-10"
                  onChange={handleChange}
                  placeholder="Company Email"
                  required
                />
              </div>
              <div className="space-y-2">
                {" "}
                <Select
                  name="employeeSize"
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, employeeSize: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      <SelectValue placeholder="Employee size" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <pre className="text-xs text-center">
                By clicking on proceed you wil accept our{" "}
                <p className="text-blue-500 hover:underline cursor-pointer">
                  Terms & Conditions
                </p>
              </pre>
              <Button type="submit" className="w-full">
                Proceed
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="emailOtp"
                    name="emailOtp"
                    placeholder="Email OTP"
                    onChange={handleChange}
                    className="pl-10"
                  />

                  {isLoadingOtp.email && (
                    <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />
                  )}
                  {isVerified.email && (
                    <Check className="absolute right-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {!isVerified.email && !isLoadingOtp.email && (
                  <Button
                    type="button"
                    size="sm"
                    className="w-full"
                    onClick={() => handleVerify("email")}
                  >
                    Verify
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="mobileOtp"
                    name="mobileOtp"
                    placeholder="Mobile OTP"
                    onChange={handleChange}
                    className="pl-10"
                  />
                  {isLoadingOtp.mobile && (
                    <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />
                  )}
                  {isVerified.mobile && (
                    <Check className="absolute right-3 h-4 w-4 text-green-500" />
                  )}
                </div>
                {!isVerified.mobile && !isLoadingOtp.mobile && (
                  <Button
                    type="button"
                    size="sm"
                    className="w-full"
                    onClick={() => handleVerify("mobile")}
                  >
                    Verify
                  </Button>
                )}
              </div>
              {isVerified.email && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleRegister}
                >
                  Complete Sign Up
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Register;
