import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
// router
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useNavigate();
  useEffect(() => {
    router("/register");
  }, []);
  return (
    <main className="">
      <Navbar />
      <Outlet />
      <Toaster />
    </main>
  );
}
