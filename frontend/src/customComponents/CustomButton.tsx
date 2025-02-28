import { Button } from "@/components/ui/button";
import Loader from "@/customComponents/Loader";
type customButtonType = {
  title: string;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  ButtonIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onButtonClick: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
};
const CustomButton = ({
  title,
  variant,
  ButtonIcon,
  onButtonClick,
  className = "",
  isLoading,
  disabled,
}: customButtonType) => {
  return (
    <Button
      variant={variant}
      className={`w-full p-6 pt-2 pb-2  rounded-sm ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onButtonClick();
      }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader color="white" size="xl" />
      ) : (
        <>
          {ButtonIcon && <ButtonIcon />}
          <span>{title}</span>
        </>
      )}
    </Button>
  );
};

export default CustomButton;
