import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignUpSchema } from "@/schema/user.schema";
import { useUserStore } from "@/zustandStore/useUserStore";
import { Eye, Loader2, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [input, setInput] = useState<SignupInputState>({
    email: "",
    password: "",
    fullName: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  // Zustand User Store
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userSignUpSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  // const loading = false;

  return (
    <div className="flex items-center justify-center h-screen min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">RestMern</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="fullName"
              placeholder=" Enter Your fullname"
              value={input.fullName}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-0"
            />
            <User className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullName}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder=" Enter Your Email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-0"
            />
            <Mail className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder=" Enter Your Password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-0"
            />
            <Eye className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="contact"
              placeholder=" Enter Your Contact Number"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-0"
            />
            <PhoneOutgoing className="absolute inset-y-1.5 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>
        <div>
          {loading ? (
            <Button
              disabled
              className="bg-blue-500 hover:bg-hoverOrange w-full"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-hoverOrange w-full"
            >
              SignUp
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forgotpassword"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
