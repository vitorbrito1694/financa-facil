"use client";

import { useEffect, useState } from "react";
import { usePaymentMethods } from "@/hooks/use-payment-methods";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PaymentMethodsTable from "./table";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import NewPaymentMethodForm from "./newPaymentMethodForm";

export default function MethodsPage() {
  const [open, setOpen] = useState(false);
  const {
    paymentMethods,
    isLoading,
    error,
    page,
    totalPages,
    total,
    params,
    updateParams,
  } = usePaymentMethods({
    page: 1,
    limit: 10,
  });

  const submitNewPaymentMethod = () => {
    setOpen(true);
  };

  // * Adiciona o atalho Ctrl+1 ou Cmd+1 para criar um novo método de pagamento
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        submitNewPaymentMethod();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [submitNewPaymentMethod]);

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Formas de Pagamento
      </h2>

      <div className="my-4 flex items-end justify-between">
        <div>
          <Label htmlFor="filter" className="mr-2">
            Tipo:
          </Label>
          <Select
            value={params.type || "ALL"}
            onValueChange={(value) => {
              updateParams({
                type: value === "ALL" ? undefined : value,
                page: 1,
              });
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="CREDIT_CARD">Cartão de Crédito</SelectItem>
              <SelectItem value="DEBIT_CARD">Cartão de Débito</SelectItem>
              <SelectItem value="CASH">Dinheiro</SelectItem>
              <SelectItem value="PIX">PIX</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button onClick={submitNewPaymentMethod} className="w-fit">
            <PlusSquare /> Criar
          </Button>
        </div>
      </div>

      {isLoading && <>Loading...</>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <PaymentMethodsTable paymentMethods={paymentMethods} total={total} />
      )}

      <NewPaymentMethodForm setOpen={setOpen} open={open} />
    </div>
  );
}
