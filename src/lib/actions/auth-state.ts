export type AuthActionState = {
  data: null;
  error: string | null;
};

export const initialAuthActionState: AuthActionState = {
  data: null,
  error: null,
};

export type EmailCheckActionState = {
  data: {
    email: string;
    mode: "login" | "signup";
    emailVerified: boolean | null;
  } | null;
  error: string | null;
};

export const initialEmailCheckActionState: EmailCheckActionState = {
  data: null,
  error: null,
};
