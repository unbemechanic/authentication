"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileButton() {
  const router = useRouter();
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("User data:", res.data);

      const userId = res.data?.data?._id;
      if (!userId) throw new Error("User ID not found");

      router.push(`/profile/${userId}`);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  return <button onClick={getUserData}>Profile page</button>;
}
