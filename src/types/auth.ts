export interface IUser {
  firstName: string;
  lastName?: string;
  bio?: string;
  email: string;
  _id: string;
  profilePicture?: string;
  friends: string[];
  isEmailVerified: boolean;
  userName: string;
}

export interface ISignUpUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
