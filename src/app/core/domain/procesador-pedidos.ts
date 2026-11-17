import type {
  CuponDescuento,
  ItemCarrito,
  NivelSuscripcion,
  PasarelaPago,
  RepositorioInventario,
  ResultadoPedido,
  ServicioNotificaciones,
} from '@core/domain/motor-pedidos.types';
import { calcularPrecioFinal } from '@core/domain/calculadora-precios';

export class ProcesadorPedidos {
  constructor(
    private readonly inventario: RepositorioInventario,
    private readonly pasarelaPago: PasarelaPago,
    private readonly notificador?: ServicioNotificaciones
  ) {}

  async procesar(
    usuarioId: string,
    nivelUsuario: NivelSuscripcion,
    items: readonly ItemCarrito[],
    cupon?: CuponDescuento
  ): Promise<ResultadoPedido> {
    if (items.length === 0) {
      return {
        estado: 'rechazado',
        motivo: 'CARRITO_VACIO',
        detalle: 'No se puede procesar un pedido sin productos',
      };
    }

    for (const item of items) {
      const disponible = await this.inventario.hayStock(item.producto.id, item.cantidad);
      if (!disponible) {
        return {
          estado: 'rechazado',
          motivo: 'SIN_STOCK',
          detalle: `Stock insuficiente para ${item.producto.nombre}`,
        };
      }
    }

    const totalCobrado = calcularPrecioFinal(items, nivelUsuario, cupon);

    try {
      const { transaccionId } = await this.pasarelaPago.cobrar(usuarioId, totalCobrado);

      for (const item of items) {
        await this.inventario.descontarStock(item.producto.id, item.cantidad);
      }

      if (this.notificador) {
        try {
          await this.notificador.enviarConfirmacion(usuarioId, transaccionId, totalCobrado);
        } catch (notifError: unknown) {
          const msg = notifError instanceof Error ? notifError.message : 'Fallo de notificación';
          console.warn(`Advertencia: no se pudo notificar al usuario ${usuarioId}: ${msg}`);
        }
      }

      return {
        estado: 'completado',
        transaccionId,
        totalCobrado,
      };
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : 'Error desconocido en pasarela';
      return {
        estado: 'rechazado',
        motivo: 'PAGO_FALLIDO',
        detalle: mensaje,
      };
    }
  }
}

export class ControlFraude {
  private readonly intentos = new Map<string, { fallos: number; bloqueadoHasta: number | null }>();
  private static readonly MAX_FALLOS = 3;
  private static readonly BLOQUEO_MS = 15 * 60 * 1000;

  registrarFallo(usuarioId: string): void {
    const ahora = Date.now();
    const actual = this.intentos.get(usuarioId) ?? { fallos: 0, bloqueadoHasta: null };
    const nuevosFallos = actual.fallos + 1;
    const bloqueadoHasta =
      nuevosFallos >= ControlFraude.MAX_FALLOS ? ahora + ControlFraude.BLOQUEO_MS : null;

    this.intentos.set(usuarioId, {
      fallos: nuevosFallos,
      bloqueadoHasta,
    });
  }

  estaBloqueado(usuarioId: string): boolean {
    const registro = this.intentos.get(usuarioId);
    if (!registro || registro.bloqueadoHasta === null) {
      return false;
    }
    if (Date.now() >= registro.bloqueadoHasta) {
      this.intentos.delete(usuarioId);
      return false;
    }
    return true;
  }
}

export class RepositorioMemoria<T extends { id: string }> {
  private readonly datos = new Map<string, T>();

  guardar(entidad: T): T {
    const copia: T = { ...entidad };
    this.datos.set(entidad.id, copia);
    return { ...copia };
  }

  buscarPorId(id: string): T | undefined {
    const encontrado = this.datos.get(id);
    return encontrado ? { ...encontrado } : undefined;
  }

  listarTodos(): T[] {
    return Array.from(this.datos.values()).map((item) => ({ ...item }));
  }

  actualizar(id: string, cambios: Partial<Omit<T, 'id'>>): T {
    const existente = this.datos.get(id);
    if (!existente) {
      throw new Error(`Entidad con id ${id} no encontrada`);
    }
    const actualizado: T = {
      ...existente,
      ...cambios,
      id: existente.id,
    };
    this.datos.set(id, actualizado);
    return { ...actualizado };
  }

  eliminar(id: string): boolean {
    return this.datos.delete(id);
  }
}
