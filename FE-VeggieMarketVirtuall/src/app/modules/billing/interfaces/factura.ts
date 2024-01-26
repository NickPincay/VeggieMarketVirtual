export interface Factura {
    id?:            number
    nombreCliente:  string
    fecha:          string
    detalles:       Detalle[]
}

export interface Detalle {
    id?:            number
    productoId:     number
    cantidad:       number
    precio:         number
}
