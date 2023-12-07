interface I_ResponseData<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export const generateResponse = <T>({ statusCode, message, data }: I_ResponseData<T>): I_ResponseData<T> => {
  return {
    statusCode,
    message,
    data: !!data ? data : null,
  };
};
