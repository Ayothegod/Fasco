import { loginSchema } from "../lib/schema";

export const login = async (email: string, password: string) => {

};

export const register = async (payload: any) => {
  try {
    const promise = await account.create(
      ID.unique(),
      payload.email,
      payload.password,
      payload.fullname
    );

    const emailSession = await login(payload.email, payload.password);

    return { message: "User created successfully", promise, emailSession };
  } catch (error: any) {

    return { message: "an error occured", error: error.message };
  }
};

export const logout = async () => {
};
