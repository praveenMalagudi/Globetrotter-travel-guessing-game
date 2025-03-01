import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FieldError from "@/customComponents/FieldError"; // Adjust the import based on your project structure
import coverImage from "@/assets/cover-image.jpeg"; // Adjust the import based on your project structure
import { useRouter } from "@/customHooks/useRouter";
import { useLoginUserMutation } from "@/api/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocalStorageItem } from "@/utils";

// Define the form data type
interface LoginFormInputs {
  usernameOrEmail: string;
}

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or email is required"),
});

type FormData = Yup.InferType<typeof validationSchema>;
const Login = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      usernameOrEmail: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // Simulate a backend call
    try {
      const { data: response } = await loginUser({
        emailOrUserName: data.usernameOrEmail,
      });
      setLocalStorageItem("token", response.data.accessToken);
      setLocalStorageItem("refreshToken", response.data.refreshToken);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  // Simulated backend login function

  return (
    <div
      className="flex items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url('${coverImage}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl mb-4 text-center">GLOBETROTTER</h1>
        <p className="">Guess the destination from cryptic clues and unlock</p>
        <p className=" mb-6">fun facts and trivia! </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            type="text"
            placeholder="Enter email or username"
            {...register("usernameOrEmail")}
            className="p-2 pt-4 pb-4 h-10 text-black rounded bg-white border-none"
          />
          <FieldError errorMessage={errorMessage} />
          <Button type="submit" className="bg-blue-500 text-white rounded mt-4">
            SIGN IN
          </Button>
        </form>
        <div className="flex space-x-2 items-center w-full">
          <div className="bg-white w-full h-[1px] "></div>
          <div className="">or</div>
          <div className="bg-white w-full h-[1px]"></div>
        </div>

        <div className="flex items-center ">
          Are you new?{" "}
          <p
            className="underline cursor-pointer ml-2"
            onClick={() => router.push("/signup")}
          >
            Create an Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
