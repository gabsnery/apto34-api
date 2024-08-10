import { Pedido, PedidoStatus } from "../models/pedido";

interface IProps {
  idPedido: string;
  status:
    | "Em analise"
    | "Pedido Recebido"
    | "Pagamento Pendente"
    | "Pagamento Rejeitado"
    | "Pagamento Aprovado"
    | "Processando"
    | "Enviado"
    | "Em Transporte"
    | "Entregue"
    | "Cancelado"
    | "Devolvido"
    | "Reembolsado"
    | "Troca Solicitada"
    | "Em Análise";
}
export const changeStatus = async (props: IProps) => {
  const { idPedido, status } = props;
  const pedidoStatus = await PedidoStatus.findOne({
    where: { status_pedido: status },
  });
  console.log("🚀 ~ changeStatus ~ pedidoStatus:", pedidoStatus);

  PedidoStatus.findOne({
    where: { status_pedido: status },
  }).then((result: typeof PedidoStatus) => {
    console.log("🚀 ~ changeStatus ~ result:", result);
    Pedido.update(
      {
        idPedidoStatus: result.id,
      },
      {
        where: { id: idPedido },
      }
    );
  });
};
