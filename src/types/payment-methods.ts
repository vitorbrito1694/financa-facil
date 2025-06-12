export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  type: "CREDIT_CARD" | "DEBIT_CARD" | "PIX" | "CASH" | string | undefined;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethodsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: PaymentMethod["type"];
}

export interface PaymentMethodsResponse {
  data: PaymentMethod[];
  total: number;
  page: number;
  totalPages: number;
}
