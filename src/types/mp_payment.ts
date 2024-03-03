export interface webhook {
    action?: string
    api_version?: string
    data?: Data
    date_created?: string
    id?: number
    live_mode?: boolean
    type?: 'payment'|string
    user_id?: string
}

export interface Data {
    id?: number
}


export interface payment {
    id?: number
    date_created?: string
    date_approved?: any
    date_last_updated?: string
    date_of_expiration?: any
    money_release_date?: any
    money_release_status?: string
    operation_type?: string
    issuer_id?: string
    payment_method_id?: string
    payment_type_id?: string
    payment_method?: PaymentMethod
    status?: string
    status_detail?: string
    currency_id?: string
    description?: any
    live_mode?: boolean
    sponsor_id?: any
    authorization_code?: string
    money_release_schema?: any
    taxes_amount?: number
    counter_currency?: any
    brand_id?: any
    shipping_amount?: number
    build_version?: string
    pos_id?: any
    store_id?: any
    integrator_id?: any
    platform_id?: any
    corporation_id?: any
    payer?: Payer
    collector_id?: number
    marketplace_owner?: any
    metadata?: Metadata
    additional_info?: AdditionalInfo
    order?: Order
    external_reference?: any
    transaction_amount?: number
    transaction_amount_refunded?: number
    coupon_amount?: number
    differential_pricing_id?: any
    financing_group?: any
    deduction_schema?: any
    installments?: number
    transaction_details?: TransactionDetails
    fee_details?: any[]
    charges_details?: ChargesDetail[]
    captured?: boolean
    binary_mode?: boolean
    call_for_authorize_id?: any
    statement_descriptor?: any
    card?: Card
    notification_url?: any
    refunds?: any[]
    processing_mode?: string
    merchant_account_id?: any
    merchant_number?: any
    acquirer_reconciliation?: any[]
    point_of_interaction?: PointOfInteraction
    accounts_info?: any
    tags?: any
  }
  
  export interface PaymentMethod {
    id?: string
    type?: string
    issuer_id?: string
    data?: Data
  }
  
  export interface Data {
    routing_data?: RoutingData
  }
  
  export interface RoutingData {
    merchant_account_id?: string
  }
  
  export interface Payer {
    identification?: Identification
    entity_type?: any
    phone?: Phone
    last_name?: any
    id?: string
    type?: any
    first_name?: any
    email?: string
  }
  
  export interface Identification {
    number?: string
    type?: string
  }
  
  export interface Phone {
    number?: any
    extension?: any
    area_code?: any
  }
  
  export interface Metadata {}
  
  export interface AdditionalInfo {
    available_balance?: any
    nsu_processadora?: any
    authentication_code?: any
  }
  
  export interface Order {}
  
  export interface TransactionDetails {
    payment_method_reference_id?: any
    acquirer_reference?: any
    net_received_amount?: number
    total_paid_amount?: number
    overpaid_amount?: number
    external_resource_url?: any
    installment_amount?: number
    financial_institution?: any
    payable_deferral_period?: any
  }
  
  export interface ChargesDetail {
    id?: string
    name?: string
    type?: string
    accounts?: Accounts
    client_id?: number
    date_created?: string
    last_updated?: string
    amounts?: Amounts
    metadata?: Metadata2
    reserve_id?: any
    refund_charges?: any[]
  }
  
  export interface Accounts {
    from?: string
    to?: string
  }
  
  export interface Amounts {
    original?: number
    refunded?: number
  }
  
  export interface Metadata2 {}
  
  export interface Card {
    id?: any
    first_six_digits?: string
    last_four_digits?: string
    expiration_month?: any
    expiration_year?: any
    date_created?: string
    date_last_updated?: string
    cardholder?: Cardholder
  }
  
  export interface Cardholder {
    name?: any
    identification?: Identification2
  }
  
  export interface Identification2 {
    number?: any
    type?: any
  }
  
  export interface PointOfInteraction {
    type?: string
    business_info?: BusinessInfo
    transaction_data:any
  }
  
  export interface BusinessInfo {
    unit?: string
    sub_unit?: string
    branch?: any
  }
  