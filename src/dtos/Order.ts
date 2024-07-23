import { IOrderRespose } from "../types/pedido";
import ProductResponse from "../types/product";
import { encryptId } from "../utils/encrypt";

async function transformOrder(orders: any[]): Promise<IOrderRespose[]> {
    const transformedOrders: IOrderRespose[] = [];

    for (const order of orders) {
        console.log("🚀 ~ transformOrder ~ order:", order)
        console.log("🚀 ~ transformOrder ~ order:", order.pagamento)
        const transformedOrder: IOrderRespose = {
            id:order.id,
            cliente:order.cliente?.nome||'',
            pagamento:order.pagamento?.status||'',
        };


        transformedOrders.push(transformedOrder);
    }

    return transformedOrders;
}

export default transformOrder