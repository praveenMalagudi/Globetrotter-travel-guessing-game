import { jwtDecode } from "jwt-decode";
export type errorResponse = {
  status: number;
  data: {
    data: string | object | null;
    message: string | null;
    error_list: string[];
  };
};
interface ExtractedErrorInfo {
  status: number;
  errorMessages: string[];
}
const isLoggedIn = () => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn;
};
const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

const getTokenData = () => {
  if (localStorage.getItem("token")) {
    const decoded = jwtDecode(localStorage.getItem("token") || "");
    return decoded;
  } else {
    return false;
  }
};
type tokenDecodedType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  name: string;
};

const getUserInfoFromToken = (): tokenDecodedType | undefined => {
  if (localStorage.getItem("token")) {
    const decoded: tokenDecodedType = jwtDecode(
      localStorage.getItem("token") || ""
    );
    return decoded;
  }
};

const getDataByToken = (token: string): tokenDecodedType | undefined => {
  if (token) {
    const decoded: tokenDecodedType = jwtDecode(token);
    return decoded;
  } else {
    return undefined;
  }
};

const extractAllErrorInfo = (response: errorResponse): ExtractedErrorInfo => {
  const { status, data } = response;
  const errorMessages =
    data?.error_list && Array.isArray(data?.error_list)
      ? data?.error_list?.map((data) => {
          if (data?.split(": ")[1]) {
            return data?.split(": ")[1]?.trim();
          } else {
            return data;
          }
        })
      : typeof data?.error_list == "string"
      ? [(data?.error_list as string).split(":")[1].trim()]
      : ["Unknown error"];

  return {
    status,
    errorMessages,
  };
};
const showToast = (
  toast: (args: object) => object,
  message: string,
  variant?: string,
  className?: string
) => {
  toast({
    description: message,
    className: `fixed  bottom-4 right-4 z-50 w-fit  border-neutral-50 ${className}`,
    variant: variant || "success",
  });
};

const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export {
  isLoggedIn,
  logOut,
  getTokenData,
  getDataByToken,
  getUserInfoFromToken,
  extractAllErrorInfo,
  showToast,
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
};
