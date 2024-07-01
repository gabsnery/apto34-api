import { Category } from "./category";

export interface ProdutoSubcategoriaResponse {
  id?: number;
  data_criacao?: Date;
  subcategoria: string;
  descricao_subcategoria?: string;
  desativado?: boolean;
  categoria?: Category
}
