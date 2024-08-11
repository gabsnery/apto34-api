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
  console.log("🚀 ~ changeStatus ~ pedidoStatus:", pedidoStatus);
  if(pedidoStatus===null)
    pedidoStatus = await PedidoStatus.create({
      status_pedido:status,
      desativado:false,
      data_criacao:new Date()
    })

    Pedido.update(
      {
        idPedidoStatus: pedidoStatus.id,
      },
      {
        where: { id: idPedido },
      }
  )
};
