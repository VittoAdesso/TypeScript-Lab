export type NivelSuscripcion = 'free' | 'pro' | 'enterprise';

export type ZonaEnvio = 'ES' | 'EU' | 'INT';

export interface Producto {
  readonly id: string;
  nombre: string;
  precioBase: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export type CuponDescuento =
  | {
      tipo: 'porcentaje';
      codigo: string;
      porcentaje: number;
      expiraEl: Date;
    }
  | {
      tipo: 'fijo';
      codigo: string;
      descuentoEuros: number;
      expiraEl: Date;
    }
  | {
      tipo: '3x2';
      codigo: string;
      expiraEl: Date;
    };

export type ResultadoPedido =
  | {
      estado: 'completado';
      transaccionId: string;
      totalCobrado: number;
    }
  | {
      estado: 'rechazado';
      motivo: 'SIN_STOCK' | 'PAGO_FALLIDO' | 'CARRITO_VACIO';
      detalle: string;
    };

export interface RepositorioInventario {
  hayStock(productoId: string, cantidad: number): Promise<boolean>;
  descontarStock(productoId: string, cantidad: number): Promise<void>;
}

export interface PasarelaPago {
  cobrar(usuarioId: string, importe: number): Promise<{ transaccionId: string }>;
}

export interface ServicioNotificaciones {
  enviarConfirmacion(usuarioId: string, transaccionId: string, total: number): Promise<void>;
}
