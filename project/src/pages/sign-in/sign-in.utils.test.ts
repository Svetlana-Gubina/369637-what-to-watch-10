import { isValidEmail, isValidPassword } from './sign-in.utils';

describe('user data validation tests', () => {
  it('should return true if email is valid', () => {
    const email = 'test@mail.ru';
    const result = isValidEmail(email);

    expect(result).toBe(true);
  });

  it('should return false if email is invalid: case 1', () => {
    const email = '222@222';
    const result = isValidEmail(email);

    expect(result).toBe(false);
  });

  it('should return false if email is invalid: case 2', () => {
    const email = 'hfhdjlk+@+';
    const result = isValidEmail(email);

    expect(result).toBe(false);
  });

  it('should return true if password is valid', () => {
    const password = '111fff';
    const result = isValidPassword(password);

    expect(result).toBe(true);
  });

  it('should return false if password is invalid: case 1', () => {
    const password = '111';
    const result = isValidPassword(password);

    expect(result).toBe(false);
  });

  it('should return false if password is invalid: case 2', () => {
    const password = 'fff@';
    const result = isValidPassword(password);

    expect(result).toBe(false);
  });
});
