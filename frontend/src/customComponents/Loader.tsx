const Loader = ({ size = "md", color = "blue", className = "" }) => {
  const sizeMap: Record<string, string> = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colorMap: Record<string, string> = {
    blue: "text-blue-500",
    red: "text-red-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    gray: "text-gray-500",
    white: "text-white",
    black: "text-black",
    current: "text-current",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  const spinnerColor = colorMap[color] || colorMap.blue;

  return (
    <svg
      className={`animate-spin ${spinnerSize} ${spinnerColor} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loader;
