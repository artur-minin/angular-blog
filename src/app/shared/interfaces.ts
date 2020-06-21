export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title: string;
  author: string;
  content: string;
  date: Date;
}

export interface FirebaseCreateResponse {
  name: string;
}
