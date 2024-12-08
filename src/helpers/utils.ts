import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordHelper = async (
  plainPassword: string,
): Promise<string> => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    const compare = await bcrypt.compare(plainPassword, hashPassword);
    return compare;
  } catch (error) {
    console.log(error);
  }
};
