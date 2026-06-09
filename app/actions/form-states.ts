export type BlogFormState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
};

export const initialBlogFormState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
};

export type RegisterFormState = {
  errors: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values: {
    username: string;
    name: string;
  };
};

export const initialRegisterFormState: RegisterFormState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
};
