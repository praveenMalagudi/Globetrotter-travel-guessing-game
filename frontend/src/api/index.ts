import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { sampleApi } from "./api";
import { isLoggedIn, logOut } from "../utils";
//@ts-expect-error ignore
export const rtkQueryErrorLogger = () => (next) => (action) => {
  if (action?.payload?.status === 401) {
    logOut();
  }
  if (
    isRejectedWithValue(action) &&
    action?.payload?.status === 401 &&
    isLoggedIn()
  ) {
    logOut();
  }

  return next(action);
};
export const store = configureStore({
  reducer: {
    [sampleApi.reducerPath]: sampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sampleApi.middleware)
      .concat(rtkQueryErrorLogger),
});
