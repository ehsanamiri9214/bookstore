const validatePhone = (phone: string) => {
  const regex = new RegExp('^(\\+98|0)?9\\d{9}$');
  const result = regex.test(phone);
  return result;
};

export { validatePhone };
