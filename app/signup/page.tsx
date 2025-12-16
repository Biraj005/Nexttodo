"use client";

import { IUserSchema, UserSchema } from "@/schemas/UserSchema";
import { useState } from "react";
import { IFormErrorSchema } from "@/types/FormError";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = IUserSchema & {
  confirmPassword: string;
};

function RegisterForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<IFormErrorSchema>>({});

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<IFormErrorSchema> = {};

    const data = UserSchema.safeParse(formData);

    if (!data.success) {
      data.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof IFormErrorSchema;
        newErrors[field] = issue.message;
      });
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await axios.post("/api/auth/signup", formData);

      console.log(result.data);

      if (!result.data.success) {
        setServerError(result.data.message);
      } else {
        localStorage.setItem("loggedin", "true");
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.status);
        console.log(err.response?.data.message);
        setServerError(err.response?.data.message);
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-sky-50">
      <form
        onSubmit={handelSubmit}
        className="w-100 flex flex-col items-center mt-10 border-0 rounded-2xl
        flex-wrap gap-8 pt-8 shadow-lg"
      >
        <h1 className="w-full pl-[10%] text-3xl text-green-600 font-bold">
          Register
        </h1>
        {serverError && <p className="text-orange-400">{serverError}</p>}

        <div className="w-full flex flex-col items-center">
          {errors.name && (
            <p className="text-red-400 w-full text-left pl-8 pb-2">
              {errors.name}
            </p>
          )}
          <input
            name="name"
            className="bg-white border rounded-2xl h-10 w-[90%] pl-2"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handelChange}
          />
        </div>

        <div className="w-full flex flex-col items-center">
          {errors.email && (
            <p className="text-red-400 w-full text-left pl-8 pb-2">
              {errors.email}
            </p>
          )}
          <input
            name="email"
            className="bg-white border rounded-2xl h-10 w-[90%] pl-2"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handelChange}
          />
        </div>

        <div className="w-full flex flex-col items-center">
          {errors.password && (
            <p className="text-red-400 w-full text-left pl-8 pb-2">
              {errors.password}
            </p>
          )}
          <input
            name="password"
            className="bg-white border rounded-2xl h-10 w-[90%] pl-2"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handelChange}
          />
        </div>

        <div className="w-full flex flex-col items-center">
          {errors.confirmPassword && (
            <p className="text-red-400 w-full text-left pl-8 pb-2">
              {errors.confirmPassword}
            </p>
          )}
          <input
            name="confirmPassword"
            className="bg-white border rounded-2xl h-10 w-[90%] pl-2"
            type="password"
            placeholder="Enter your password again"
            value={formData.confirmPassword}
            onChange={handelChange}
          />
        </div>

        <button
          className="h-10 w-[30%] bg-green-600 rounded-2xl border-black cursor-pointer"
          type="submit"
        >
          Submit
        </button>

        <Link className="text-sky-700 mb-5" href="/login">
          Already have account login
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
