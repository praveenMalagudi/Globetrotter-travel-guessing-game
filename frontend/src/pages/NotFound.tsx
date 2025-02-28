import Error404SVG from "@/assets/error-404.svg?react";
import PageNotFoundSVG from "@/assets/page_not_found.svg?react";
import CustomButton from "@/customComponents/CustomButton";
import { useRouter } from "@/customHooks/useRouter";
function NotFound() {
  const router = useRouter();
  const onClickGoToHome = () => {
    router.push("/projects");
  };
  return (
    <div className="flex flex-col fixed inset-0 bg-white z-50 items-center justify-center">
      <div className="h-[379px] relative flex flex-col items-center">
        <PageNotFoundSVG className="h-[25rem] w-[25rem]" />
        <Error404SVG className="h-[140px] w-[242px] absolute bottom-20 " />
        <div className="heading-3 leading-8 absolute bottom-8">
          Sorry, page not found
        </div>
        <p className="text-neutral-400 text-sm absolute bottom-0 ">
          The page you are looking for doesn’t exits or an error occurred.
        </p>
      </div>
      <div className="heading-1 mb-8  text-gray-800">Page not found!</div>
      <div className="">
        <CustomButton
          variant={"default"}
          title="go to home"
          onButtonClick={onClickGoToHome}
          className="bg-primary-600 text-white uppercase"
        />
      </div>
    </div>
  );
}

export default NotFound;
