import ClientRequest from "./client";
import ProductResponse from "./product";

export interface PaymentGetResponse {
  id?: number;
  type:string;
  quantidade_parcelas: number;
  status:string;
  status_details:string;
  data_pagamento_confirmado:Date;
}

