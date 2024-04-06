export interface AccountLoginInterface {
  email: string;
  password: string;
}

export interface AccountSignupInterface {
  email: string;
  password: string;
  acceptRules: boolean;
  isAdmin: boolean;
}

export interface PostsInterface {
  title: string;
  content: string;
}