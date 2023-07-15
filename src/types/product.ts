interface ProductResponse {
    id?: number;
    nome: string;
    descricao: string;
    valor_produto?: number ;
    desativado?: boolean;
    produtoSubcategoria: ProdutoSubcategoriaResponse[];
  }
  
  export default ProductResponse;
