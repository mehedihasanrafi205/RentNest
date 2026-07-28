// 1. User Role Type
export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

// 2. User Data Interface
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBanned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// 3. Login Response Data Interface
export interface ILoginData {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
}

// 4. API Response Generic Wrapper
export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// 5. Specific API Response Types
export type LoginResponse = IApiResponse<ILoginData>;
export type RegisterResponse = IApiResponse<IUser>;