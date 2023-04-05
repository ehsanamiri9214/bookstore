type ResponseType = {
  error: { msg: string, statusCode: number } | null
  data: any
}

export { ResponseType }
