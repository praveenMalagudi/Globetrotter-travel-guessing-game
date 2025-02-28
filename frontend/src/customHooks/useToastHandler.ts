import { errorResponse, extractAllErrorInfo, showToast } from "@/utils";
import { useToast } from "@/hooks/use-toast";

export const useToastHandler = () => {
  const { toast } = useToast();

  const toastHandler = (
    error: unknown,
    variant: string,
    customMessage?: string
  ) => {
    if (variant == "error" && error) {
      const { errorMessages } = extractAllErrorInfo(error as errorResponse);
      showToast(toast, customMessage || errorMessages[0], variant);
    } else {
      showToast(toast, customMessage || '', variant);
    }
  };

  return { toastHandler };
};
