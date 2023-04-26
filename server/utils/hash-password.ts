import * as bcrypt from 'bcrypt';
export const hashPassword = async (
    password: string
): Promise<string> => {
  const hash = await bcrypt.hash(password, +process.env.SALT);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
