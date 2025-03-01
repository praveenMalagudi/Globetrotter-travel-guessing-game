import { useState } from "react";
import FieldError from "@/customComponents/FieldError";
import FieldLabel from "@/customComponents/FieldLabel";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import coverImage from "@/assets/cover-image.jpeg"; // Adjust the import based on your project structure
import { useRouter } from "@/customHooks/useRouter";
import { useRegisterUserMutation } from "@/api/api";
import { useToastHandler } from "@/customHooks/useToastHandler";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

type FormData = Yup.InferType<typeof validationSchema>;

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toastHandler } = useToastHandler();
  const [onRegisterUser] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await onRegisterUser({
        fullName: `${data.firstName} ${data.lastName}`,
        userName: data.username,
        email: data.email,
      });
      router.push("/login");
      toastHandler("", "success", "User registered successfully");
    } catch (error) {
      toastHandler(error, "error", "User registration failed");
    }
    // Handle registration logic here
    setIsLoading(false);
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('${coverImage}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white bg-opacity-40 p-12   pl-8 pr-8 rounded-lg shadow-lg min-w-[28rem] flex flex-col space-y-4 text-white">
        {/* <RegistrationLogo className="h-28 w-28" /> */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="">
            <div className="heading-3 text-neutral-500 capitalize mt-3 text-center">
              Register Profile
            </div>
            <div className="text-sm text-neutral-400 text-center">
              Enter below details to register your profile
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-2 text-black"
          >
            <div>
              <FieldLabel title="First Name" htmlFor="firstName" />
              <Input
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
                className={`p-2 pt-4 pb-4 h-10 rounded  bg-white border-none ${
                  errors.firstName ? "border-destructive-600" : ""
                }`}
              />
              <FieldError errorMessage={errors?.firstName?.message} />
            </div>
            <div>
              <FieldLabel title="Last Name" htmlFor="lastName" />
              <Input
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
                className={`p-2 pt-4 pb-4 h-10 rounded bg-white border-none ${
                  errors.lastName ? "border-destructive-600" : ""
                }`}
              />
              <FieldError errorMessage={errors?.lastName?.message} />
            </div>
            <div>
              <FieldLabel title="Username" htmlFor="username" />
              <Input
                id="username"
                placeholder="Username"
                {...register("username")}
                className={`p-2 pt-4 pb-4 h-10 rounded bg-white border-none ${
                  errors.username ? "border-destructive-600" : ""
                }`}
              />
              <FieldError errorMessage={errors?.username?.message} />
            </div>
            <div>
              <FieldLabel title="Email" htmlFor="email" />
              <Input
                id="email"
                placeholder="Email"
                {...register("email")}
                className={`p-2 pt-4 pb-4 h-10 rounded bg-white border-none ${
                  errors.email ? "border-destructive-600" : ""
                }`}
                autoComplete="email"
              />
              <FieldError errorMessage={errors?.email?.message} />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full h-10 ${
                  isLoading ? "bg-neutral-100" : "bg-primary-600"
                } text-white mt-4`}
                disabled={isLoading || !isValid}
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          <div className="flex items-center ">
            Already have an account?{" "}
            <p
              className="underline cursor-pointer ml-2"
              onClick={() => router.push("/login")}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
