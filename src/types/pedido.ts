import ClientRequest from "./client";
import { PaymentGetResponse } from "./payment";
import ProductResponse from "./product";

interface PedidoRequest {
  id?: number;
  clienteId: number;
  produtos: Productos[];
  endereco: Endereco;
  total:number
}
interface IProduct{
  name: string;
  thumbnail?: string;
  quantity: number;
}
export interface PedidoResponse {
  id: number;
  product: IProduct[];
  number: number;
  purchaseDate:Date;
  status:string
  total:number
}

interface Productos {
  id?: number;
  quantidade: number;
  idColor?: number;
  idSize?: number;
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
