const getCookie = (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cookie = useCookie(name, {
      sameSite: true,
      secure: true,
    });
    resolve(cookie.value);
  });
};

const setCookie = (name: string, value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    // TODO Fix cookies bug in Safari.
    const cookie = useCookie(name, {
      sameSite: true,
      // secure: true,
    });
    cookie.value = value;
    resolve();
  });
};

const removeCookie = (name: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cookie = useCookie(name, {
      sameSite: true,
      // secure: true,
    });
    cookie.value = null;
    resolve();
  });
};

export { getCookie, setCookie, removeCookie };
