import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
  prepareHeaders: (headers) => {
    if (localStorage.getItem("token")) {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }
    return headers;
  },
});
interface ErrorData {
  error_list: { message: string }[];
}
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.status === 401 &&
    (result.error.data as ErrorData).error_list[0].message !=
      "Incorrect email or password."
  ) {
    const refreshResult: any = await baseQuery(
      {
        method: "POST",
        url: "/token-refresh/",
        body: { refresh: localStorage.getItem("refreshToken") },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      localStorage.setItem("token", refreshResult?.data?.access);
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult?.error?.status === 401) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      if (
        refreshResult?.error?.data?.error_list[0]?.refresh ===
        "This field may not be null."
      ) {
        window.location.reload();
        localStorage.removeItem("token");
      } else {
        localStorage.removeItem("token");
      }
    }
  }
  return result;
};
export const sampleApi = createApi({
  reducerPath: "sampleApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["project", "cameraFeed", "tasks", "notification"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register-user",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password/",
        method: "POST",
        body: body,
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/get-user-details/",
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        const uidb64 = body.uidb64;
        const token = body.token;
        delete body.uidb64;
        delete body.token;
        return {
          method: "PATCH",
          url: `/reset-password/${uidb64}/${token}/`,
          body,
        };
      },
    }),
    sendEmailVerification: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/send-email-verification-link/",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => {
        const uidb64 = body.uidb64;
        const token = body.token;
        delete body.uidb64;
        delete body.token;

        return {
          method: "PATCH",
          url: `/verify-email/${uidb64}/${token}`,
        };
      },
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useRegisterUserMutation, useSendEmailVerificationMutation } =
  sampleApi;
