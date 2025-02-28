import { useRouter } from "@/custom hooks/useRouter";
import React from "react";

const LinkElement = ({
  title,
  href,
  Icon,
  className,
}: {
  title: string;
  href: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <span
      //   href={href}
      className={`text-primary-600 text-sm font-medium  ml-1  cursor-pointer ${className}`}
      onClick={() => router.push(href)}
    >
      {Icon && <Icon className="mt-[3px] mr-[0.4rem]" />} {title}
    </span>
  );
};

export default LinkElement;
