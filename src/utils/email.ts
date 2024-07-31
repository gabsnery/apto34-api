export const orderPendingPayment = (props: { orderNumber: string; orderDate: string; paymentLink: string ,pay:any}) => {
    return `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                <h2 style="color: #573D2E;">Olá,</h2>
                <p style="color: #333333;">Seu pedido <strong>#${props.orderNumber}</strong>, realizado em <strong>${props.orderDate}</strong>, está pendente de pagamento. Para garantir a reserva dos produtos, por favor, realize o pagamento o mais breve possível. Você pode acessar o link abaixo para concluir o pagamento:</p>
                <p><a href="${props.paymentLink}" style="background-color: #573D2E; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Concluir Pagamento</a></p>
                <p style="color: #333333;">Se você já realizou o pagamento, por favor, desconsidere este aviso. Agradecemos pela sua compreensão.</p>
                <p style="color: #333333;">Atenciosamente,</p>
                <p style="color: #333333;"><strong>Equipe [Nome da Loja]</strong></p>
                <p style="color: #333333;"><strong>${JSON.stringify(props.pay)}</strong></p>
            </div>
        </body>
    </html>
    `;
};

export const orderApproved = (props: { orderNumber: string; orderDate: string; customerName: string ,pay:any}) => {
    return `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                <h2 style="color: #573D2E;">Prezado ${props.customerName},</h2>
                <p style="color: #333333;">Temos o prazer de informar que seu pedido <strong>#${props.orderNumber}</strong>, realizado em <strong>${props.orderDate}</strong>, foi aprovado! Estamos processando seu pedido e você receberá uma notificação assim que ele for enviado.</p>
                <p style="color: #333333;">Obrigado por comprar conosco!</p>
                <p style="color: #333333;">Atenciosamente,</p>
                <p style="color: #333333;"><strong>Equipe [Nome da Loja]</strong></p>
                <p style="color: #333333;"><strong>${JSON.stringify(props.pay)}</strong></p>
            </div>
        </body>
    </html>
    `;
};
export const orderPaymentRejected = (props: { orderNumber: string; orderDate: string; customerName: string; supportEmail: string; supportPhone: string ,pay:any}) => {
    return `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
                <h2 style="color: #573D2E;">Prezado ${props.customerName},</h2>
                <p style="color: #333333;">Lamentamos informar que seu pedido <strong>#${props.orderNumber}</strong>, realizado em <strong>${props.orderDate}</strong>, foi rejeitado. Isso pode ter ocorrido devido a um problema no pagamento ou na disponibilidade do produto.</p>
                <p style="color: #333333;">Para mais informações, por favor, entre em contato com nosso suporte ao cliente através do email <a href="mailto:${props.supportEmail}" style="color: #573D2E;">${props.supportEmail}</a> ou do telefone <strong>${props.supportPhone}</strong>.</p>
                <p style="color: #333333;">Atenciosamente,</p>
                <p style="color: #333333;"><strong>Equipe [Nome da Loja]</strong></p>
                <p style="color: #333333;"><strong>${JSON.stringify(props.pay)}</strong></p>
            </div>
        </body>
    </html>
    `;
};
