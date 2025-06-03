"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
  });
  const [disButton, setDisButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      // Call your API here (example)
      const res = await axios.post("/api/users/login", user);
      const userData = res.data.user;

      console.log(res.data);
      // Redirect or show success
      toast.success("Login Success");
      // Redirect to dynamic route
      router.push(`/profile/${userData.id}`);
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Login error!", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
            onLogin();
          }}
        >
          <h2>{loading ? "Processing" : "Login Form"}</h2>

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

          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log In</button>
        </form>
        <div className="register">
          <p>
            Don't have an account? <Link href="/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
