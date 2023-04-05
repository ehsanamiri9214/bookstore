export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    const loggedIn: boolean = false;
    const phone: string = "";
    const verificationCode: string = "";
    const isPhoneValid: boolean = false;
    const isVerificationCodeValid: boolean = false;
    const loading: boolean = false;
    const showError: boolean = false;
    const bookUrlBeforeLogin: string = "";
    const loggingOut: boolean = false;

    return {
      loggedIn,
      phone,
      verificationCode,
      isPhoneValid,
      isVerificationCodeValid,
      loading,
      showError,
      bookUrlBeforeLogin,
      loggingOut,
    };
  },
  actions: {
    login() {
      this.loggedIn = true;
    },
    setPhoneValidation(value: boolean) {
      this.isPhoneValid = value;
    },
    setVerificationCodeValidation(value: boolean) {
      this.isVerificationCodeValid = value;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setLoggedIn(value: boolean) {
      this.loggedIn = value;
    },
    setShowError(value: boolean) {
      this.showError = value;
    },
    setLoggingOut(value: boolean) {
      this.loggingOut = value;
    },
    logout() {
      this.reset();
    },
    setBookUrlBeforeLogin(url: string) {
      this.bookUrlBeforeLogin = url;
    },
    reset() {
      this.loggedIn = false;
      this.phone = "";
      this.verificationCode = "";
      this.isPhoneValid = false;
      this.isVerificationCodeValid = false;
      this.loading = false;
      this.showError = false;
      this.bookUrlBeforeLogin = "";
      this.loggingOut = false;
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.loggedIn || false;
    },
  },
});
