import { RequestType, ResponseType } from "~/types";

const makeRequest = async (
  route: string,
  type: RequestType = "GET",
  header?: object,
  body?: object,
  signal?: AbortSignal
): Promise<ResponseType> => {
  const config = useRuntimeConfig();
  let accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  const url =
    config.public.API_BASE_URL +
    "/" +
    config.public.PREFIX +
    "/" +
    config.public.VERSION +
    route;

  const settings = {
    method: type || "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: accessToken,
      ...header,
    },
    body: type === "POST" || "PUT" ? JSON.stringify(body) : null,
    signal,
  };

  const response = await fetch(url, settings);
  switch (response.status) {
    case 200:
    case 201:
      let data = await response.json();
      return { error: null, data };
    case 400:
      return {
        error: { msg: "درخواست نامعتبر.", statusCode: 400 },
        data: null,
      };
    case 401:
      // TODO Try to refresh token.
      // TODO Retry.
      return {
        error: { msg: "سطح دسترسی نامعتبر.", statusCode: 401 },
        data: null,
      };
    case 403:
      return {
        error: { msg: "عدم دسترسی به منبع.", statusCode: 403 },
        data: null,
      };
    case 404:
      return { error: { msg: "آدرس نامعتبر.", statusCode: 404 }, data: null };
    case 429:
      return {
        error: { msg: "تعداد درخواست بیش از حد.", statusCode: 429 },
        data: null,
      };
    default:
      return {
        error: {
          msg: "خطا در برقراری ارتباط با سرور.",
          statusCode: response.status,
        },
        data: null,
      };
  }
};

const refreshToken = () => {
  return;
};

const retry = () => {
  return;
};

export { makeRequest };
