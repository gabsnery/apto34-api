import {ProductGetResponse} from "../types/product";
import { encryptId } from "../utils/encrypt";

async function transformProducts(products: any[]): Promise<ProductGetResponse[]> {
    console.log("🚀 ~ transformProducts ~ products:", products)
    const transformedProducts: ProductGetResponse[] = [];
    
    for (const product of products) {

        const transformedProduct: ProductGetResponse = {
            id: product.id,
            nome: product.nome,
            valor_produto: product.valor_produto,
            quantity: product.quantity,
            discount: product.discount,
            descricao: product.descricao,
        };


        transformedProducts.push(transformedProduct);
    }

    return transformedProducts;
}

export default transformProducts