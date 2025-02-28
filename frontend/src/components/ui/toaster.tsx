import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import CancelSVG from "@/assets/icon/cancel.svg?react";
import CheckCircleSVG from "@/assets/icon/check_circular_filled.svg?react";
import ErrorSVG from "@/assets/icon/error.svg?react";
import WarningSVG from "@/assets/icon/warning.svg?react";
import InfoSVG from "@/assets/icon/info.svg?react";
const variantStyles = {
  success: {
    icon: <CheckCircleSVG className=" w-5 h-5 mr-2" />,
    bgColor: "bg-green-100",
  },
  warning: {
    icon: <WarningSVG className=" w-5 h-5 mr-2" />,
    bgColor: "bg-yellow-100",
  },
  info: {
    icon: <InfoSVG className="w-5 h-5 mr-1" />,
    bgColor: "bg-blue-100",
  },
  destructive: {
    icon: <ErrorSVG className=" w-5 h-5 mr-2" />,
    bgColor: "bg-red-100",
  },
  error: {
    icon: <ErrorSVG className="w-5 h-5 mr-2" />,
    bgColor: "bg-red-100",
  },
  default: {
    icon: "",
    bgColor: "bg-gray-100",
  },
};
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        variant,
        description,
        action,
        ...props
      }) {
        const { icon } = variantStyles[variant || "default"];
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>
                  {icon}
                  {description}
                </ToastDescription>
              )}
            </div>
            <ToastAction altText="Try again" tabIndex={-1}>
              <CancelSVG
                className="h-5 w-5 cursor-pointer"
                onClick={() => null}
              />
            </ToastAction>
            {action}
            {/* <ToastClose /> */}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
