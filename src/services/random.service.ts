import {
  animals,
  Config,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const randomName = (seed?: string): string => {
  const config: Config = {
    dictionaries: [names, animals],
    separator: " ",
    seed,
  };
  return uniqueNamesGenerator(config);
};

export const randomPass = (length = 6): string => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export default { randomName, randomPass };
