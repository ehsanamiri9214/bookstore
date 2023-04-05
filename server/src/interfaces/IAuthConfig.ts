interface IAuthConfig {
  AUTH_HEADER_PARAM: string;
  AUTH_JWT_SECRET_KEY: string;
  AUTH_JWT_ACCESS_TOKEN_EXPIRE_TIME: string;
  AUTH_JWT_REFRESH_TOKEN_EXPIRE_TIME: string;
  KAVENEGAR_API_KEY: string;
}

export default IAuthConfig;
