import type {
  CuponDescuento,
  ItemCarrito,
  NivelSuscripcion,
  ZonaEnvio,
} from '@core/domain/motor-pedidos.types';

const DESCUENTOS_SUSCRIPCION: Record<NivelSuscripcion, number> = {
  free: 0,
  pro: 0.1,
  enterprise: 0.2,
};

const TARIFAS_ENVIO = {
  ES: 5,
  EU: 15,
  INT: 30,
} satisfies Record<ZonaEnvio, number>;

export function calcularPrecioFinal(
  items: readonly ItemCarrito[],
  nivelUsuario: NivelSuscripcion,
  cupon?: CuponDescuento,
  fechaActual: Date = new Date()
): number {
  if (items.length === 0) {
    return 0;
  }

  const cuponActivo = Boolean(cupon && cupon.expiraEl.getTime() >= fechaActual.getTime());
  const aplica3x2 = cuponActivo && cupon?.tipo === '3x2';

  const subtotal = items.reduce((acumulado, item) => {
    if (item.cantidad <= 0) {
      throw new Error(`Cantidad inválida para el producto ${item.producto.nombre}`);
    }
    if (item.producto.precioBase < 0) {
      throw new Error(`Precio negativo no permitido en ${item.producto.nombre}`);
    }
    const unidadesGratis = aplica3x2 ? Math.floor(item.cantidad / 3) : 0;
    const unidadesACobrar = item.cantidad - unidadesGratis;
    return acumulado + item.producto.precioBase * unidadesACobrar;
  }, 0);

  const porcentajeNivel = DESCUENTOS_SUSCRIPCION[nivelUsuario];
  let total = subtotal * (1 - porcentajeNivel);

  if (cupon && cuponActivo) {
    if (cupon.tipo === 'porcentaje') {
      total = total * (1 - cupon.porcentaje / 100);
    } else if (cupon.tipo === 'fijo') {
      total = total - cupon.descuentoEuros;
    }
  }

  const totalSeguro = Math.max(0, total);
  return Math.round(totalSeguro * 100) / 100;
}

export function calcularGastosEnvio(
  importePedido: number,
  zona: ZonaEnvio,
  nivelUsuario: NivelSuscripcion
): number {
  if (importePedido < 0) {
    throw new Error('El importe del pedido no puede ser negativo');
  }
  if (importePedido >= 100) {
    return 0;
  }
  const tarifaBase = TARIFAS_ENVIO[zona];
  const coste = nivelUsuario === 'enterprise' ? tarifaBase * 0.5 : tarifaBase;
  return Math.round(coste * 100) / 100;
}
