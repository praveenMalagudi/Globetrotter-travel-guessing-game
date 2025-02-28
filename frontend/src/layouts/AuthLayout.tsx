import { ReactNode } from "react";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen min-h-screen ">
      <div className=" h-16 pr-10 pl-10 bg-primary-900 flex items-center"></div>
      <div className="flex justify-center w-full h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
