import ProductResponse from "../types/product";
import { encryptId } from "../utils/encrypt";

async function transformProducts(products: any[]): Promise<ProductResponse[]> {
    const transformedProducts: ProductResponse[] = [];

    for (const product of products) {
        const transformedSubcategories: ProductResponse['produtoSubcategoria'] = [];

        for (const subcategoria of product.produtoSubcategoria) {
            const transformedSubcategory: ProductResponse['produtoSubcategoria'][number] = {
                id: subcategoria.id,
                subcategoria: subcategoria.subcategoria,
                descricao_subcategoria: subcategoria.descricao_subcategoria,
                categoria: {
                    id: subcategoria.produtoCategoria.id,
                    categoria: subcategoria.produtoCategoria.categoria,
                    descricao_categoria: subcategoria.produtoCategoria.descricao_categoria,
                },
            };

            transformedSubcategories.push(transformedSubcategory);
        }

        const transformedProduct: ProductResponse = {
            id: product.id,
            produtoSubcategoria: transformedSubcategories,
            photos: product.photo?.filter((ite: any) => ite.thumbnail === false).map((item: any) => encryptId(item.id.toString())),
            thumbnails: product.photo?.filter((ite: any) => ite.thumbnail === true).map((item: any) => encryptId(item.id.toString())),
            cores: product.color?.map((item: any) => {
                return ({
                    id: item.id,
                    descricao: item.descricao,
                    quantidade: item.produto_tem_cor.quantidade
                })
            }),
            tamanhos: product.size?.map((item: any) => ({
                id: item.id,
                descricao: item.descricao,
                quantidade: item.produto_tem_tamanho.quantity
            })),
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