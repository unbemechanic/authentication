"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [disButton, setDisButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign up success!", response.data);
      // toast.success("Sign up success!");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in Sign up! sign up page line 20", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setDisButton(false);
    } else {
      setDisButton(true);
    }
  }, [user]);
  return (
    <div className="container">
      <div className="wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignUp();
          }}
        >
          <h2>Register Form</h2>

          <div className="input-field">
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="username">Enter your username</label>
          </div>

          <div className="input-field">
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="email">Enter your email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label htmlFor="password">Enter your password</label>
          </div>

          <button style={{ marginTop: "20px" }} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
