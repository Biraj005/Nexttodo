"use client";

import { ILoginSchema, LoginSchema } from "@/schemas/UserSchema";
import { useState } from "react";
import { IFormErrorSchema } from "@/types/FormError";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>();
  const [formData, setFormData] = useState<ILoginSchema>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<IFormErrorSchema>>({});

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<IFormErrorSchema> = {};

    const data = LoginSchema.safeParse(formData);

    if (!data.success) {
      data.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ILoginSchema;
        newErrors[field] = issue.message;
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const result = await axios.post("/api/auth/login", formData);
      if (result.data.success) {
        router.push("/");
      } else {
        setServerError(result.data.message);
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
    setErrors({});
    console.log("VALID DATA:", formData);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-sky-50">
      <form
        onSubmit={handelSubmit}
        className="w-100 flex flex-col items-center mt-10 border-0 rounded-2xl
        flex-wrap gap-8 pt-8 shadow-lg"
      >
        <h1 className="w-full pl-[10%] text-3xl text-green-600 font-bold">
          Login
        </h1>
        {serverError && <p className="text-orange-400">{serverError}</p>}

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
        <button
          className="h-10 w-[30%] bg-green-600 rounded-2xl border-black cursor-pointer"
          type="submit"
        >
          Submit
        </button>

        <Link className="text-sky-700 mb-5" href="/signup">
          Sinup here
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
