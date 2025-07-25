"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { URL_API } from "@/lib/fetcher";
import axios from "axios";

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      remember: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL_API}/api/auth/login`, formData, {
        withCredentials: true,
      });

      if (res.data) {
        setTimeout(() => {
          router.push("/");
          mutate(`${URL_API}/api/auth/user`);
        }, 1800);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Đăng nhập không thành công");
    }
  };
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-3">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div
          className="md:w-1/2 h-64 md:h-auto bg-cover bg-center relative"
          style={{
            backgroundImage: `url("https://motortrip.vn/wp-content/uploads/2022/03/khach-san-14.jpg")`,
            backgroundSize: "cover", // phủ kín không méo ảnh
            backgroundPosition: "center", // canh giữa
            backgroundRepeat: "no-repeat", // không lặp lại ảnh
          }}
        ></div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h3>
            <p className="text-gray-600">
              Vui lòng nhập thông tin tài khoản của bạn
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-slide-in-left">
              <Label
                htmlFor="email"
                className="text-lg text-gray-700 font-medium block mb-2"
              >
                Email
              </Label>
              <Input
                name="email"
                type="email"
                className="w-full px-5 py-3 text-lg border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="animate-slide-in-right">
              <Label
                htmlFor="password"
                className="text-lg text-gray-700 font-medium block mb-2"
              >
                Mật Khẩu
              </Label>
              <Input
                name="password"
                type="password"
                className="w-full px-5 py-3 text-lg border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onCheckedChange={handleCheckboxChange}
                  className="h-6 w-6 rounded border-2 border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="remember" className="text-lg text-gray-600">
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-lg text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-amber-200 animate-bounce-in mt-2"
              type="submit"
            >
              Đăng Nhập
            </Button>
          </form>

          {message && (
            <div className="text-lg text-center text-red-500 animate-fade-in mt-4">
              {message}
            </div>
          )}

          <div className="text-center text-lg text-gray-600 animate-fade-in mt-6">
            Bạn chưa có tài khoản?{" "}
            <Link
              href="/signUp"
              className="font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
            >
              Đăng ký ngay
            </Link>
          </div>

          {/* Social login divider */}
          <div className="relative my-8 animate-fade-in">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500 text-lg">
                Hoặc đăng nhập bằng
              </span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-3 py-4 text-lg border-2 border-gray-300 rounded-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-3 py-4 text-lg border-2 border-gray-300 rounded-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
