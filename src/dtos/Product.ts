import ProductResponse, { ProductGetResponse } from "../types/product";
import { encryptId } from "../utils/encrypt";

async function transformProducts(
  products: any[]
): Promise<ProductGetResponse[]> {
  console.log("🚀 ~ transformProducts ~ products:", products);
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

export default transformProducts;

export async function transformProduct(product: any): Promise<any> {
  const transformedSubcategories: ProductResponse["produtoSubcategoria"] = [];

  for (const subcategoria of product.produtoSubcategoria) {
    const transformedSubcategory: ProductResponse["produtoSubcategoria"][number] =
      {
        id: subcategoria.id,
        subcategoria: subcategoria.subcategoria,
        descricao_subcategoria: subcategoria.descricao_subcategoria,
        categoria: {
          id: subcategoria.produtoCategoria.id,
          categoria: subcategoria.produtoCategoria.categoria,
          descricao_categoria:
            subcategoria.produtoCategoria.descricao_categoria,
        },
      };

    transformedSubcategories.push(transformedSubcategory);
  }

  const transformedProduct: ProductResponse = {
    id: product.id,
    produtoSubcategoria: transformedSubcategories,
    photos: product.photo
      ?.filter((ite: any) => ite.thumbnail === false)
      .map((item: any) => encryptId(item.id.toString())),
    thumbnails: product.photo
      ?.filter((ite: any) => ite.thumbnail === true)
      .map((item: any) => encryptId(item.id.toString())),
    nome: product.nome,
    valor_produto: product.valor_produto,
    quantity: product.quantity,
    discount: product.discount,
    descricao: product.descricao,
    stock:product.stock_product.map((stock:any)=>({quantity:stock.quantity,colorId:stock.colorId,sizeId:stock.sizeId}))
  };

  return transformedProduct;
}
