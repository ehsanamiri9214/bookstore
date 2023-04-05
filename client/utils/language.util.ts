const startsWithEnglish = (string: string) => {
  const regex = new RegExp("^[A-Za-z0-9]*$")
  const result = regex.test(string[0])
  return result
}

export { startsWithEnglish }
