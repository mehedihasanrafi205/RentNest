
// ENUMS / UNION TYPES


export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";

export type RentalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

// USER

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isBanned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// PROPERTY

export interface ILandlordBasic {
  id: string;
  name: string;
  email: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  status: PropertyStatus;
  landlordId: string;
  categoryId: string | null;
  amenities: string[];
  images?: string[];
  createdAt: string;
  updatedAt: string;
  landlord: ILandlordBasic;
}

// RENTAL REQUEST

export interface IRental {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  status: RentalStatus;
  message?: string;
  moveInDate?: string;
  createdAt: string;
  updatedAt: string;
  property?: IProperty;
  tenant?: IUser;
}

// PAYMENT

export interface IPayment {
  id: string;
  rentalId: string;
  tenantId: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  rental?: IRental;
}

// ADMIN STATS

export interface IAdminStats {
  totalUsers: number;
  totalProperties: number;
  totalRentals: number;
  pendingRentals: number;
  totalRevenue?: number;
}

// AUTH

export interface ILoginData {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
}

// API RESPONSE WRAPPERS

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface IPaginatedData<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// SPECIFIC RESPONSE TYPES

export type LoginResponse = IApiResponse<ILoginData>;
export type RegisterResponse = IApiResponse<IUser>;
export type PropertyResponse = IApiResponse<IProperty>;
export type PropertiesResponse = IApiResponse<IProperty[]>;
export type RentalResponse = IApiResponse<IRental>;
export type RentalsResponse = IApiResponse<IRental[]>;
export type PaymentResponse = IApiResponse<IPayment>;
export type UsersResponse = IApiResponse<IUser[]>;
export type AdminStatsResponse = IApiResponse<IAdminStats>;
