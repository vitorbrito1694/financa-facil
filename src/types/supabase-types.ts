export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Account: {
        Row: {
          balance: unknown
          createdAt: string
          currency: string
          id: string
          name: string
          type: Database["public"]["Enums"]["AccountType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          balance: unknown
          createdAt?: string
          currency?: string
          id: string
          name: string
          type?: Database["public"]["Enums"]["AccountType"]
          updatedAt: string
          userId: string
        }
        Update: {
          balance?: unknown
          createdAt?: string
          currency?: string
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["AccountType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Category: {
        Row: {
          color: string | null
          createdAt: string
          icon: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          icon?: string | null
          id: string
          name: string
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          icon?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Category_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      PaymentMethod: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["PaymentMethodType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          name: string
          type?: Database["public"]["Enums"]["PaymentMethodType"]
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["PaymentMethodType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "PaymentMethod_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Transaction: {
        Row: {
          accountId: string
          amount: unknown
          categoryId: string
          createdAt: string
          date: string
          description: string | null
          frenquecy: Database["public"]["Enums"]["TransactionFrequency"]
          id: string
          paymentMethodId: string | null
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          accountId: string
          amount: unknown
          categoryId: string
          createdAt?: string
          date: string
          description?: string | null
          frenquecy?: Database["public"]["Enums"]["TransactionFrequency"]
          id: string
          paymentMethodId?: string | null
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Update: {
          accountId?: string
          amount?: unknown
          categoryId?: string
          createdAt?: string
          date?: string
          description?: string | null
          frenquecy?: Database["public"]["Enums"]["TransactionFrequency"]
          id?: string
          paymentMethodId?: string | null
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Transaction_accountId_fkey"
            columns: ["accountId"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transaction_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transaction_paymentMethodId_fkey"
            columns: ["paymentMethodId"]
            isOneToOne: false
            referencedRelation: "PaymentMethod"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transaction_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          name: string | null
          role: Database["public"]["Enums"]["Role"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          name?: string | null
          role?: Database["public"]["Enums"]["Role"]
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["Role"]
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AccountType: "CASH" | "CURRENT_ACCOUNT" | "SAVINGS_ACCOUNT"
      PaymentMethodType: "CREDIT_CARD" | "DEBIT_CARD" | "PIX" | "CASH"
      Role: "USER" | "ADMIN"
      TransactionFrequency: "FIXED" | "RECORRENT" | "POSSIBLE"
      TransactionType: "INCOME" | "EXPENSE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      AccountType: ["CASH", "CURRENT_ACCOUNT", "SAVINGS_ACCOUNT"],
      PaymentMethodType: ["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH"],
      Role: ["USER", "ADMIN"],
      TransactionFrequency: ["FIXED", "RECORRENT", "POSSIBLE"],
      TransactionType: ["INCOME", "EXPENSE"],
    },
  },
} as const
