import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { PaymentMethodsResponse } from "@/types/payment-methods";

interface PaymentMethodsTableProps {
  paymentMethods: PaymentMethodsResponse["data"];
  total: PaymentMethodsResponse["total"];
}

export default function PaymentMethodsTable({
  paymentMethods,
  total,
}: PaymentMethodsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentMethods.map((method) => (
            <TableRow key={method.id}>
              <TableCell>{method.name}</TableCell>
              <TableCell>{method.description}</TableCell>
              <TableCell>{method.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              {paymentMethods.length === 0 ? (
                <div className="py-4">
                  Nenhum método de pagamento encontrado.
                </div>
              ) : (
                <div className="py-4">
                  Mostrando {paymentMethods.length} de {total} métodos de
                  pagamento.
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
