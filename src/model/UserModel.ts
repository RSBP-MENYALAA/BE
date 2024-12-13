export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  name: string;
  email: string;
}

export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
}



