import { PedidoResponse } from "../types/pedido";

async function transformOrder(orders: any[]): Promise<PedidoResponse[]> {
  const transformedOrders: PedidoResponse[] = [];

  for (const order of orders) {
    const transformedOrder: PedidoResponse = {
      id: order.id,
      product: order.products.map((product:any) => ({name:product.name})),
      number: order.products?.pedido_tem_produto?.quantidade,
      purchaseDate: order.updatedAt,
      status: "Aprovado",
      total: 100
    };

    transformedOrders.push(transformedOrder);
  }

  return transformedOrders;
}

export default transformOrder;
