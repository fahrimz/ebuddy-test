"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "../../components/organisms/UserProfile";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return <UserProfile />;
}
