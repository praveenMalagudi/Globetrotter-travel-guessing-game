import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
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
        url: "/users/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
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
        url: "/users/current-user",
      }),
    }),
    getDataset: builder.query({
      query: (userId) => ({
        url: `/datasets/${userId}`,
      }),
    }),
    checkQuizAnswer: builder.mutation({
      query: (body) => ({
        url: "/datasets/check-quiz-answer",
        method: "POST",
        body,
      }),
    }),
    inviteFriend: builder.mutation({
      query: (body) => ({
        url: "/invites/invite-friend",
        method: "POST",
        body,
      }),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyGetDatasetQuery,
  useCheckQuizAnswerMutation,
  useGetUserDetailsQuery,
  useInviteFriendMutation,
} = sampleApi;
