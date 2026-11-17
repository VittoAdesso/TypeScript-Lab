import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type {
  CuponDescuento,
  ItemCarrito,
  PasarelaPago,
  Producto,
  RepositorioInventario,
  ServicioNotificaciones,
} from '@core/domain/motor-pedidos.types';
import {
  calcularGastosEnvio,
  calcularPrecioFinal,
} from '@core/domain/calculadora-precios';
import {
  ControlFraude,
  ProcesadorPedidos,
  RepositorioMemoria,
} from '@core/domain/procesador-pedidos';

describe('calcularPrecioFinal (Motor de Pedidos Base + Reto 5 TDD 3x2)', () => {
  const teclado: ItemCarrito = {
    producto: { id: 'p1', nombre: 'Teclado Mecánico', precioBase: 100 },
    cantidad: 2,
  };

  it('debería devolver 0 si el carrito está vacío', () => {
    expect(calcularPrecioFinal([], 'free')).toBe(0);
  });

  it.each([
    { nivel: 'free', esperado: 200 },
    { nivel: 'pro', esperado: 180 },
    { nivel: 'enterprise', esperado: 160 },
  ] as const)(
    'debería calcular $esperado€ para un usuario con suscripción $nivel',
    ({ nivel, esperado }) => {
      const total = calcularPrecioFinal([teclado], nivel);
      expect(total).toBe(esperado);
    }
  );

  it('debería aplicar un cupón porcentual válido sobre el precio con descuento de suscripción', () => {
    const fechaActual = new Date('2026-06-01T10:00:00Z');
    const cupon: CuponDescuento = {
      tipo: 'porcentaje',
      codigo: 'VERANO10',
      porcentaje: 10,
      expiraEl: new Date('2026-06-15T00:00:00Z'),
    };

    const total = calcularPrecioFinal([teclado], 'pro', cupon, fechaActual);
    expect(total).toBe(162);
  });

  it('debería ignorar un cupón si ya ha expirado', () => {
    const fechaActual = new Date('2026-06-20T10:00:00Z');
    const cuponExpirado: CuponDescuento = {
      tipo: 'fijo',
      codigo: 'CADUCADO',
      descuentoEuros: 50,
      expiraEl: new Date('2026-06-15T00:00:00Z'),
    };

    const total = calcularPrecioFinal([teclado], 'free', cuponExpirado, fechaActual);
    expect(total).toBe(200);
  });

  it('nunca debería devolver un importe negativo si el cupón fijo supera el subtotal', () => {
    const fechaActual = new Date('2026-06-01T10:00:00Z');
    const cuponGigante: CuponDescuento = {
      tipo: 'fijo',
      codigo: 'REGALO500',
      descuentoEuros: 500,
      expiraEl: new Date('2026-06-15T00:00:00Z'),
    };

    const total = calcularPrecioFinal([teclado], 'free', cuponGigante, fechaActual);
    expect(total).toBe(0);
  });

  it('debería lanzar un error si algún producto tiene cantidad cero o negativa', () => {
    const itemInvalido: ItemCarrito = {
      producto: { id: 'p2', nombre: 'Ratón', precioBase: 50 },
      cantidad: 0,
    };

    expect(() => calcularPrecioFinal([itemInvalido], 'free')).toThrow('Cantidad inválida');
  });

  it('debería lanzar un error si algún producto tiene precio negativo', () => {
    const itemPrecioNegativo: ItemCarrito = {
      producto: { id: 'p3', nombre: 'Cable USB', precioBase: -10 },
      cantidad: 1,
    };

    expect(() => calcularPrecioFinal([itemPrecioNegativo], 'free')).toThrow(
      'Precio negativo no permitido'
    );
  });

  it.each([
    { cantidad: 3, esperado: 200 },
    { cantidad: 4, esperado: 300 },
    { cantidad: 6, esperado: 400 },
  ])(
    'Reto 5 (3x2): con $cantidad unidades de 100€ debería cobrar $esperado€',
    ({ cantidad, esperado }) => {
      const fechaActual = new Date('2026-06-01T10:00:00Z');
      const cupon3x2: CuponDescuento = {
        tipo: '3x2',
        codigo: 'PROMO3X2',
        expiraEl: new Date('2026-06-15T00:00:00Z'),
      };
      const item: ItemCarrito = {
        producto: { id: 'p1', nombre: 'Teclado Mecánico', precioBase: 100 },
        cantidad,
      };

      expect(calcularPrecioFinal([item], 'free', cupon3x2, fechaActual)).toBe(esperado);
    }
  );
});

describe('Reto 1: calcularGastosEnvio', () => {
  it.each([
    { importe: 50, zona: 'ES', nivel: 'free', esperado: 5 },
    { importe: 50, zona: 'EU', nivel: 'free', esperado: 15 },
    { importe: 50, zona: 'INT', nivel: 'free', esperado: 30 },
    { importe: 99.99, zona: 'INT', nivel: 'enterprise', esperado: 15 },
    { importe: 100, zona: 'INT', nivel: 'free', esperado: 0 },
  ] as const)(
    'importe $importe€ en zona $zona ($nivel) devuelve $esperado€',
    ({ importe, zona, nivel, esperado }) => {
      expect(calcularGastosEnvio(importe, zona, nivel)).toBe(esperado);
    }
  );

  it('debería lanzar error si el importe del pedido es negativo', () => {
    expect(() => calcularGastosEnvio(-1, 'ES', 'free')).toThrow(
      'El importe del pedido no puede ser negativo'
    );
  });
});

describe('ProcesadorPedidos (Proyecto Base + Reto 2 Degradación Elegante)', () => {
  const inventarioMock: RepositorioInventario = {
    hayStock: vi.fn(),
    descontarStock: vi.fn(),
  };

  const pasarelaMock: PasarelaPago = {
    cobrar: vi.fn(),
  };

  const notificadorMock: ServicioNotificaciones = {
    enviarConfirmacion: vi.fn(),
  };

  let procesador: ProcesadorPedidos;

  const itemsEjemplo: ItemCarrito[] = [
    { producto: { id: 'prod-1', nombre: 'Monitor 4K', precioBase: 300 }, cantidad: 1 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    procesador = new ProcesadorPedidos(inventarioMock, pasarelaMock, notificadorMock);
  });

  it('debería rechazar si el carrito está vacío', async () => {
    const resultado = await procesador.procesar('user-1', 'free', []);
    expect(resultado).toEqual({
      estado: 'rechazado',
      motivo: 'CARRITO_VACIO',
      detalle: 'No se puede procesar un pedido sin productos',
    });
  });

  it('debería completar el pedido, cobrar y descontar stock cuando todo es correcto', async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockResolvedValue({ transaccionId: 'TX-2026-01' });
    vi.mocked(notificadorMock.enviarConfirmacion).mockResolvedValue(undefined);

    const resultado = await procesador.procesar('user-1', 'pro', itemsEjemplo);

    expect(resultado).toEqual({
      estado: 'completado',
      transaccionId: 'TX-2026-01',
      totalCobrado: 270,
    });
    expect(pasarelaMock.cobrar).toHaveBeenCalledWith('user-1', 270);
    expect(inventarioMock.descontarStock).toHaveBeenCalledTimes(1);
    expect(inventarioMock.descontarStock).toHaveBeenCalledWith('prod-1', 1);
  });

  it('debería rechazar el pedido sin cobrar ni descontar stock si no hay inventario', async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(false);

    const resultado = await procesador.procesar('user-1', 'free', itemsEjemplo);

    expect(resultado.estado).toBe('rechazado');
    if (resultado.estado === 'rechazado') {
      expect(resultado.motivo).toBe('SIN_STOCK');
    }
    expect(pasarelaMock.cobrar).not.toHaveBeenCalled();
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });

  it('debería rechazar el pedido y NO descontar stock si falla la pasarela de pago', async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockRejectedValue(new Error('Tarjeta denegada'));

    const resultado = await procesador.procesar('user-1', 'free', itemsEjemplo);

    expect(resultado).toEqual({
      estado: 'rechazado',
      motivo: 'PAGO_FALLIDO',
      detalle: 'Tarjeta denegada',
    });
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });

  it('Reto 2: si el envío de confirmación falla, registra console.warn pero mantiene el pedido completado', async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockResolvedValue({ transaccionId: 'TX-2026-99' });
    vi.mocked(notificadorMock.enviarConfirmacion).mockRejectedValue(
      new Error('Servidor SMTP caído')
    );
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const resultado = await procesador.procesar('user-1', 'free', itemsEjemplo);

    expect(resultado.estado).toBe('completado');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('Reto 3: ControlFraude con Fake Timers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debería bloquear al usuario tras 3 fallos durante 15 minutos y desbloquearlo después', () => {
    const antifraude = new ControlFraude();

    antifraude.registrarFallo('user-fraude');
    antifraude.registrarFallo('user-fraude');
    expect(antifraude.estaBloqueado('user-fraude')).toBe(false);

    antifraude.registrarFallo('user-fraude');
    expect(antifraude.estaBloqueado('user-fraude')).toBe(true);

    vi.advanceTimersByTime(14 * 60 * 1000);
    expect(antifraude.estaBloqueado('user-fraude')).toBe(true);

    vi.advanceTimersByTime(61 * 1000);
    expect(antifraude.estaBloqueado('user-fraude')).toBe(false);
  });
});

describe('Reto 4: RepositorioMemoria<T>', () => {
  it('debería guardar, buscar, listar, actualizar sin mutar id y eliminar entidades', () => {
    const repo = new RepositorioMemoria<Producto>();
    repo.guardar({ id: 'p-10', nombre: 'Auriculares', precioBase: 80 });

    const encontrado = repo.buscarPorId('p-10');
    expect(encontrado).toEqual({ id: 'p-10', nombre: 'Auriculares', precioBase: 80 });

    const actualizado = repo.actualizar('p-10', { precioBase: 75 });
    expect(actualizado.id).toBe('p-10');
    expect(actualizado.precioBase).toBe(75);
    expect(repo.listarTodos().length).toBe(1);

    expect(() => repo.actualizar('inexistente', { nombre: 'X' })).toThrow(
      'Entidad con id inexistente no encontrada'
    );

    expect(repo.eliminar('p-10')).toBe(true);
    expect(repo.buscarPorId('p-10')).toBeUndefined();
  });
});
