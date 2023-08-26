import bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};
