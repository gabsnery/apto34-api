import ClientRequest from "./client";
import { PaymentGetResponse } from "./payment";
import ProductResponse from "./product";

interface PedidoRequest {
  id?: number;
  clienteId: number;
  produtos: Productos[];
  endereco: Endereco;
}

interface Productos {
  id?: number;
  quantidade?: number;
}
interface Endereco {
  id?: number;
  cep?: string;
  logradouro?: string;
  numero: number;
  complemento?: string;
  bairro?: string;
}
export interface IOrderGetResponse {
  id?: number;
  client?: ClientRequest;
  payment: PaymentGetResponse;
}
export interface IOrderGetByIdResponse {
  id?: number;
  cliente?: ClientRequest;
  payment: PaymentGetResponse;
  products?: ProductResponse[];
}

export default PedidoRequest;
