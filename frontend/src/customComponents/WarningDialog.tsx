import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from "./CustomButton";
import { useState } from "react";
type propType = {
  title: string;
  description: string;
  onClickRightCTA: () => void;
  onClickLeftCTA: () => void;
  rightCTATitle: string;
  leftCTATitle: string;
  isOpen: boolean;
};

const WarningDialog = ({
  title,
  description,
  rightCTATitle,
  leftCTATitle,
  onClickRightCTA,
  onClickLeftCTA,
  isOpen,
}: propType) => {
  const [isLoading, setIsLoading] = useState(false);
  const onRightBtnClick = async () => {
    setIsLoading(true);
    await onClickRightCTA();
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="gap-0   p-6 pt-4 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className=" heading-4">{title}</DialogTitle>
        <DialogDescription className="text-sm text-neutral-400 mt-2">
          {description}
        </DialogDescription>
        <div className="flex justify-end space-x-4 mt-6">
          <div className="">
            <CustomButton
              title={leftCTATitle}
              variant={"ghost"}
              onButtonClick={onClickLeftCTA}
            />
          </div>
          <div className="">
            <CustomButton
              title={rightCTATitle}
              variant={"default"}
              onButtonClick={onRightBtnClick}
              className="bg-destructive-600 text-white"
              isLoading={isLoading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WarningDialog;
