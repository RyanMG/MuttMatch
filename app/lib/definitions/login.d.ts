export type TLoginLoginDetails = {
  name: string,
  email: string
}

export type TLoginFormState = {
  errors?: {
    name?: string[],
    email?: string[]
  } | null;
  message?: string;
  prevState?: TLoginForm;
  success: boolean;
  cookie?: string | null;
};
