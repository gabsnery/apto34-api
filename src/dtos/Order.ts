import { IOrderGetResponse } from "../types/pedido";
import ProductResponse from "../types/product";
import { encryptId } from "../utils/encrypt";

async function transformOrder(orders: any[]): Promise<IOrderGetResponse[]> {
  const transformedOrders: IOrderGetResponse[] = [];

  for (const order of orders) {
    console.log("🚀 ~ transformOrder ~ order:", order);
    console.log("🚀 ~ transformOrder ~ order:", order.pagamento);
    const transformedOrder: IOrderGetResponse = {
      id: order.id,
      client: {
        id:order.cliente?.id || "",
        name:order.cliente?.nome || ""
    },
      payment: {
        type: order.pagamento.status || "",
        quantidade_parcelas: order.pagamento.status || "",
        status: order.pagamento.status || "",
        status_details: order.pagamento.status || "",
        data_pagamento_confirmado: order.pagamento.status || "",
      },
    };

    transformedOrders.push(transformedOrder);
  }

  return transformedOrders;
}

export default transformOrder;
