"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const { id } = params;
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserData(response.data.data);
      } catch (error: any) {
        console.log(error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Details About User {id}</h1>
      {userData ? (
        <>
          <h2 style={{ color: "white" }}>Username: {userData.username}</h2>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={logout}>Log out</button>
    </div>
  );
}
