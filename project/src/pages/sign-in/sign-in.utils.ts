export const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const isValidPassword = (password: string) =>
  /[0-9]+[A-Za-z]+/g.test(password);
