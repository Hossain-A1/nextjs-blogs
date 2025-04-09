"use client";
import toast from "react-hot-toast";
import { server_url } from "@/secret/secret";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [state, setState] = useState("Login");
  const [isError, setIsError] = useState("");
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });
  console.log("backend error found" + isError);
  const getInputValue = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let url = server_url;
      url = state === "Login" ? "/api/login" : "/api/auth";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        if (state === "Register") {
          toast.success("Register successed, Login please!");
          setState("Login");
        }
        if (state === "Login") {
          toast.success("Login has Successfull!");
          router.push("/");
        }
      } else {
        // 🚨 Show error from backend
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      setIsError(error.message);
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className=' h-screen flex  justify-center items-center     px-2.5'
    >
      <div className='space-y-2 lg:w-6/12 w-full '>
        <h1 className='text-2xl text-center font-semibold'>{state} Now!</h1>
        {state !== "Login" && (
          <div className='flex flex-col gap-1'>
            <label
              className='text-lg text-neutral-800 font-semibold'
              htmlFor='name'
            >
              Name*
            </label>
            <input
              name='name'
              value={formData.name}
              onChange={getInputValue}
              className='p-2 outline-violet-500 rounded border-2 border-gray-500'
              type='text'
              placeholder='Inter your name'
            />
          </div>
        )}
        <div className='flex flex-col gap-1'>
          <label
            className='text-lg text-neutral-800 font-semibold'
            htmlFor='email'
          >
            Email*
          </label>
          <input
            name='email'
            value={formData.email}
            onChange={getInputValue}
            className='p-2 outline-violet-500 rounded border-2 border-gray-500'
            type='email'
            placeholder='Inter your email'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            className='text-lg text-neutral-800 font-semibold'
            htmlFor='password'
          >
            Password*
          </label>
          <input
            name='password'
            value={formData.password}
            onChange={getInputValue}
            className='p-2 outline-violet-500 rounded border-2 border-gray-500'
            type='password'
            placeholder='Inter your password'
          />
        </div>

        <button
          type='submit'
          className='bg-violet-700 mt-4 border-none text-white font-medium py-3 px-8 rounded w-full'
        >
          {state}
        </button>

        {state === "Login" ? (
          <span className='flex gap-1'>
            Do not have an account{" "}
            <p
              onClick={() => setState("Register")}
              className='text-blue-600 cursor-pointer'
            >
              Register!
            </p>{" "}
          </span>
        ) : (
          <span className='flex gap-1'>
            Already have an account{" "}
            <p
              onClick={() => setState("Login")}
              className='text-blue-600 cursor-pointer'
            >
              Login!
            </p>{" "}
          </span>
        )}
      </div>
    </form>
  );
};

export default Login;
