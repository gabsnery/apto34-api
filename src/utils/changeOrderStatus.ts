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
  let pedidoStatus = await PedidoStatus.findOne({
    where: { status_pedido: status },
  });

  Pedido.update(
    {
      idPedidoStatus: pedidoStatus.id,
    },
    {
      where: { id: idPedido },
    }
  );
};
