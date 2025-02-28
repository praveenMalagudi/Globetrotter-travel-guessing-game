const FieldLabel = ({
  title,
  htmlFor,
  required,
  className,
}: {
  title: string;
  htmlFor: string;
  className?: string;
  required?: boolean;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm  text-neutral-400 cursor-pointer ${className}`}
    >
      {title}
      {required && <span className="text-destructive-600">*</span>}
    </label>
  );
};

export default FieldLabel;
