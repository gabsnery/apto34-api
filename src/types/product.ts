import { ProdutoSubcategoriaResponse } from "./subcategory";

interface ProductResponse {
  id?: number;
  nome: string;
  descricao: string;
  valor_produto?: number;
  quantity: number;
  desativado?: boolean;
  produtoSubcategoria: ProdutoSubcategoriaResponse[];
  photos?: string[]
  thumbnails?: string[]
  cores?: ProductoColor[];
  tamanhos?: ProductoSize[];
  discount?: number;
}

export interface ProductGetResponse {
  id?: number;
  nome: string;
  descricao: string;
  valor_produto?: number;
  quantity: number;
  desativado?: boolean;
  discount?: number;
}
interface ProductoColor {
  id?: number;
  descricao?: string;
  quantidade?: number;
}
interface ProductoSize {
  id?: number;
  descricao?: string;
  quantidade?: number;
}
export default ProductResponse;
