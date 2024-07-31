export const orderRecived =(props:{status:string,status_detail:string})=>{
    return `Recebemos o seu pedido ${JSON.stringify(props)}`
}
export const orderPaymentAccepted =(props:{status:string,status_detail:string})=>{
    return `Recebemos o o pagamento do seu pedido e loja enviaremos para voce ${JSON.stringify(props)}`
}
export const orderPaymentRejected =(props:{status:string,status_detail:string})=>{
    return `Seu pagamento foi rejeitado ${JSON.stringify(props)}`
}