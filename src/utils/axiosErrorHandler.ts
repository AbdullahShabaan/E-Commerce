import { isAxiosError } from "axios";

export const axiosErrorHandler = (err: unknown, defaultMessage: string) => {
  if (isAxiosError(err)) {
    return err.message;
  } else {
    return defaultMessage;
  }
};
