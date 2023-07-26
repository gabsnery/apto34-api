interface PedidoResponse {
  id?: number;
  cliente:number;
  produtos: Productos[];
}
interface Productos {
  id?: number;
  quantidade?: number;
}
interface Endereco {
  id?: number;
  cep?: string;
  logradouro?: string;
  numero:number;
  complemento?: string;
  bairro?: string;
}

export default PedidoResponse;
