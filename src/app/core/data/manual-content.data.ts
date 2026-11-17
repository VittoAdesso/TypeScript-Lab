import {
  AliasRuleItem,
  Challenge,
  ChecklistItem,
  DocCategory,
  ExtraCommandCard,
  IdeFileTab,
  MilestoneId,
  ModuleInfo,
  PrincipleBullet,
  SearchIndexEntry,
  TerminalCmd,
  TsCodeBlock,
} from '@core/models/manual.models';

// ============================================================================
// METADATOS DE LOS 7 MÓDULOS Y HÉROE PRINCIPAL
// ============================================================================

export const HERO_BANNER = {
  pillLeft: 'Ruta de Formación Profesional',
  pillRight: 'JS → TypeScript + Vitest',
  title: 'Manual Completo de TypeScript y Tests Unitarios',
  description:
    'Todo lo que un desarrollador JavaScript necesita para dominar el tipado estricto, alias de rutas, patrones avanzados, mocks, Fake Timers y TDD con documentación oficial y proyecto práctico.',
} as const;

export const MODULES_LIST: readonly ModuleInfo[] = [
  {
    index: 1,
    roman: 'I',
    partLabel: 'Parte I de VII',
    slug: '1-documentacion-terminal',
    route: '/modulo/1-documentacion-terminal',
    shortTitle: 'Docs Oficiales y Terminal',
    fullTitle: 'Documentación Oficial y Guía de Ejecución en Terminal',
    subtitle: 'Fuentes primarias verificadas y flujo diario de comprobación profesional.',
    badgeColor: 'indigo',
  },
  {
    index: 2,
    roman: 'II',
    partLabel: 'Parte II de VII',
    slug: '2-arquitectura-alias',
    route: '/modulo/2-arquitectura-alias',
    shortTitle: 'Arquitectura y Alias (@/*)',
    fullTitle: 'Arquitectura del Proyecto, Archivos y Alias de Rutas',
    subtitle: 'Cómo inicializar el proyecto desde cero y sincronizar alias limpios (@domain/*, @services/*).',
    badgeColor: 'indigo',
  },
  {
    index: 3,
    roman: 'III',
    partLabel: 'Parte III de VII',
    slug: '3-typescript-pro',
    route: '/modulo/3-typescript-pro',
    shortTitle: 'TypeScript: Base y Nivel Pro',
    fullTitle: 'Dominio Completo de TypeScript (Base y Nivel Pro)',
    subtitle: 'Desde los fundamentos del sistema de tipos hasta patrones avanzados de nivel arquitecto.',
    badgeColor: 'indigo',
  },
  {
    index: 4,
    roman: 'IV',
    partLabel: 'Parte IV de VII',
    slug: '4-vitest-testing',
    route: '/modulo/4-vitest-testing',
    shortTitle: 'Vitest: Testing Base y Pro',
    fullTitle: 'Dominio Completo de Tests Unitarios con Vitest',
    subtitle: 'Principios FIRST, estructura AAA, matchers, tests parametrizados, mocks, spies y Fake Timers.',
    badgeColor: 'indigo',
  },
  {
    index: 5,
    roman: 'V',
    partLabel: 'Parte V de VII',
    slug: '5-proyecto-base',
    route: '/modulo/5-proyecto-base',
    shortTitle: 'Proyecto Práctico Base (IDE)',
    fullTitle: 'Proyecto Práctico Base: "Motor de Pedidos"',
    subtitle:
      'Explora los 5 archivos completos de producción y tests. Copia cada archivo en tu proyecto y pasa typecheck y test:coverage.',
    badgeColor: 'emerald',
  },
  {
    index: 6,
    roman: 'VI',
    partLabel: 'Parte VI de VII',
    slug: '6-retos-tdd',
    route: '/modulo/6-retos-tdd',
    shortTitle: '5 Retos Progresivos (TDD)',
    fullTitle: '5 Retos Prácticos para Resolver por Cuenta Propia',
    subtitle:
      'Implementa cada reto sobre el proyecto base sin usar any y manteniendo >90% de cobertura. Marca cada reto al completarlo.',
    badgeColor: 'amber',
  },
  {
    index: 7,
    roman: 'VII',
    partLabel: 'Parte VII de VII',
    slug: '7-checklist-dod',
    route: '/modulo/7-checklist-dod',
    shortTitle: 'Checklist Quality Gate',
    fullTitle: 'Checklist Final de Calidad ("Definition of Done")',
    subtitle: 'Verifica estos 6 puntos antes de dar por cerrada cualquier Pull Request o tarea en producción.',
    badgeColor: 'cyan',
  },
] as const;

// ============================================================================
// PARTE I: DOCUMENTACIÓN OFICIAL Y SIMULADOR DE TERMINAL
// ============================================================================

export const DOC_CATEGORIES: readonly DocCategory[] = [
  {
    badge: 'TS',
    badgeTheme: 'blue',
    title: 'Documentación Oficial de TypeScript',
    links: [
      {
        label: '↗ Portal Principal TypeScript Docs',
        url: 'https://www.typescriptlang.org/docs/',
        isPrimary: true,
      },
      {
        label: '↗ TypeScript for JavaScript Programmers',
        url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
      },
      {
        label: '↗ The Handbook: Everyday Types & Basics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      },
      {
        label: '↗ Narrowing (Type Guards y estrechamiento)',
        url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
      },
      {
        label: '↗ Generics y Manipulación de Tipos',
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
      },
      {
        label: '↗ Utility Types Reference (Partial, Pick, Omit...)',
        url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
      },
      {
        label: '↗ TSConfig Reference & Path Mapping',
        url: 'https://www.typescriptlang.org/tsconfig/',
      },
      {
        label: '↗ TypeScript Playground (Pruebas rápidas)',
        url: 'https://www.typescriptlang.org/play',
      },
    ],
  },
  {
    badge: 'TEST',
    badgeTheme: 'emerald',
    title: 'Documentación Oficial de Testing',
    links: [
      {
        label: '↗ Vitest Getting Started (Recomendado)',
        url: 'https://vitest.dev/guide/',
        isPrimary: true,
      },
      {
        label: '↗ Configuring Vitest (vitest.config.ts)',
        url: 'https://vitest.dev/config/',
      },
      {
        label: '↗ Expect API (Todas las aserciones/matchers)',
        url: 'https://vitest.dev/api/expect',
      },
      {
        label: '↗ Vi Utility API (Mocks, Spies y Fake Timers)',
        url: 'https://vitest.dev/api/vi',
      },
      {
        label: '↗ Mocking Guide & Test Lifecycle',
        url: 'https://vitest.dev/guide/mocking',
      },
      {
        label: '↗ Coverage Guide (Cobertura V8)',
        url: 'https://vitest.dev/guide/coverage',
      },
      {
        label: '↗ Alternativa: Node.js Native Test Runner',
        url: 'https://nodejs.org/learn/test-runner/using-test-runner',
        isAlternative: true,
      },
      {
        label: '↗ Alternativa: Jest Official Docs',
        url: 'https://jestjs.io/docs/getting-started',
        isAlternative: true,
      },
    ],
  },
];

export const TERMINAL_COMMANDS: readonly TerminalCmd[] = [
  {
    id: 'typecheck',
    buttonLabel: '1. npm run typecheck',
    accentColor: 'indigo',
    output: `$ npm run typecheck\n> tsc --noEmit\n\n✓ 0 errores de tipos encontrados en src/ y tests/.`,
    explanationHtml:
      '<strong>¿Qué comprueba?</strong> Analiza todos los archivos de <code>src/</code> y <code>tests/</code> aplicando las reglas estrictas de <code>tsconfig.json</code> sin generar archivos <code>.js</code>. Si hay un fallo de tipos incluso dentro de un test, indica el archivo y la línea exacta.',
  },
  {
    id: 'test',
    buttonLabel: '2. npm run test:run',
    accentColor: 'emerald',
    output: `$ npm run test:run\n> vitest run\n\n ✓ tests/calculadoraPrecios.test.ts (8 tests) 14ms\n ✓ tests/procesadorPedidos.test.ts (3 tests) 9ms\n\n Test Files  2 passed (2)\n      Tests  11 passed (11)\n   Duration  312ms`,
    explanationHtml:
      '<strong>¿Qué comprueba?</strong> Ejecuta toda la suite de tests unitarios una única vez y sale con código <code>0</code> si todos pasan (ideal antes de hacer <code>git commit</code> o en pipelines CI/CD).',
  },
  {
    id: 'coverage',
    buttonLabel: '3. npm run test:coverage',
    accentColor: 'cyan',
    output: `$ npm run test:coverage\n> vitest run --coverage\n\n % Coverage report from v8\n-----------------------|---------|----------|---------|---------|\nFile                   | % Stmts | % Branch | % Funcs | % Lines |\n-----------------------|---------|----------|---------|---------|\nAll files              |     100 |    95.45 |     100 |     100 |\n calculadoraPrecios.ts |     100 |    93.75 |     100 |     100 |\n procesadorPedidos.ts  |     100 |      100 |     100 |     100 |\n-----------------------|---------|----------|---------|---------|`,
    explanationHtml:
      '<strong>¿Cómo leer la tabla?</strong> <code>% Branch</code> es la métrica más importante: mide qué porcentaje de caminos <code>if / else</code> y ternarios has probado. Además genera <code>coverage/index.html</code> para ver en rojo las líneas no cubiertas.',
  },
  {
    id: 'build',
    buttonLabel: '4. npm run build',
    accentColor: 'amber',
    output: `$ npm run build\n> tsc\n\n✓ Compilación completada en dist/ (ES2022 / ESNext).`,
    explanationHtml:
      '<strong>¿Qué hace?</strong> Compila el código fuente TypeScript a JavaScript limpio de producción dentro de la carpeta <code>dist/</code>.',
  },
];

export const EXTRA_TERMINAL_CARDS: readonly ExtraCommandCard[] = [
  {
    title: 'Ejecutar un solo archivo de test',
    command: 'npx vitest run tests/calculadoraPrecios.test.ts',
    lang: 'bash',
  },
  {
    title: 'Filtrar tests por nombre',
    command: 'npx vitest run -t "cupón porcentual"',
    lang: 'bash',
  },
];

// ============================================================================
// PARTE II: ARQUITECTURA, ARCHIVOS Y ALIAS DE RUTAS
// ============================================================================

export const INIT_COMMANDS_SNIPPET = `mkdir proyecto-pedidos && cd proyecto-pedidos
npm init -y
npm install -D typescript @types/node tsx vitest @vitest/coverage-v8`;

export const FOLDER_TREE_SNIPPET = `proyecto-pedidos/
├── src/                  # Código fuente (.ts)
│   ├── domain/           # Contratos, interfaces y tipos
│   │   └── tipos.ts
│   └── services/         # Lógica de negocio
│       ├── calculadoraPrecios.ts
│       └── procesadorPedidos.ts
├── tests/                # Pruebas unitarias (espejo)
│   ├── calculadoraPrecios.test.ts
│   └── procesadorPedidos.test.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── vitest.config.ts`;

export const ALIAS_EXPLANATION_INTRO =
  'Para evitar importaciones relativas frágiles como <code>../../../domain/tipos</code> y usar <code>@domain/tipos</code>, es obligatorio declararlos en <strong>dos sitios</strong>:';

export const ALIAS_RULES: readonly AliasRuleItem[] = [
  {
    title: '1. tsconfig.json (baseUrl + paths)',
    descriptionHtml:
      'Para que el compilador <code>tsc</code> y el autocompletado de VS Code entiendan los tipos.',
    theme: 'indigo',
  },
  {
    title: '2. vitest.config.ts (resolve.alias)',
    descriptionHtml:
      'Para que Vitest resuelva las rutas reales en tiempo de ejecución de tests.',
    theme: 'emerald',
  },
];

export const CONFIG_FILE_TABS: readonly IdeFileTab[] = [
  {
    id: 'pkg',
    label: 'package.json',
    lang: 'json',
    code: `{
  "name": "proyecto-pedidos-ts",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@vitest/coverage-v8": "^3.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}`,
  },
  {
    id: 'tsc',
    label: 'tsconfig.json',
    lang: 'json',
    code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "rootDir": ".",
    "outDir": "./dist",

    /* ALIAS DE RUTAS */
    "baseUrl": ".",
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@services/*": ["src/services/*"]
    },

    /* MODO ESTRICTO PROFESIONAL */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
  },
  {
    id: 'vit',
    label: 'vitest.config.ts',
    lang: 'typescript',
    code: `import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@domain": fileURLToPath(new URL("./src/domain", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
    },
  },
  test: {
    globals: false,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/domain/tipos.ts"],
    },
  },
});`,
  },
  {
    id: 'git',
    label: '.gitignore',
    lang: 'text',
    code: `node_modules/
dist/
coverage/
.env`,
  },
];

// ============================================================================
// PARTE III: TYPESCRIPT (BASE Y NIVEL PRO)
// ============================================================================

export const TS_BASE_BLOCKS: readonly TsCodeBlock[] = [
  {
    id: 'ts-base-1',
    titleHtml: '1. Primitivos, Tuplas y <code>as const</code>',
    searchable: 'primitivos tuplas as const enum ROLES',
    lang: 'typescript',
    code: `// Primitivos (siempre en minúscula) y Tuplas
const nombre: string = "Laura";
type Coordenada = [latitud: number, longitud: number];
const madrid: Coordenada = [40.4168, -3.7038];

// Patrón moderno para constantes enumeradas ('as const' en lugar de 'enum')
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  LECTOR: "lector",
} as const;

type RolUsuario = (typeof ROLES)[keyof typeof ROLES]; // "admin" | "editor" | "lector"`,
  },
  {
    id: 'ts-base-2',
    titleHtml: '2. Tipos Especiales: <code>any</code> vs <code>unknown</code> vs <code>never</code> vs <code>void</code>',
    searchable: 'any unknown never void parsearNombre',
    lang: 'typescript',
    specialTypes: [
      { name: 'any', summary: 'Desactiva TS. Prohibido.', theme: 'rose' },
      { name: 'unknown', summary: 'Seguro. Exige validar antes.', theme: 'emerald' },
      { name: 'void', summary: 'Función sin retorno útil.', theme: 'sky' },
      { name: 'never', summary: 'Estado imposible / error.', theme: 'purple' },
    ],
    code: `function parsearNombre(entrada: unknown): string {
  if (typeof entrada === "string" && entrada.trim().length > 0) {
    return entrada.trim();
  }
  throw new Error("Entrada inválida: se esperaba un string no vacío");
}`,
  },
  {
    id: 'ts-base-3',
    titleHtml: '3. Uniones Discriminadas y Exhaustividad con <code>never</code>',
    searchable: 'Narrowing uniones discriminadas exhaustividad switch',
    lang: 'typescript',
    code: `type RespuestaApi<T> =
  | { estado: "ok"; datos: T }
  | { estado: "error"; codigo: number; mensaje: string };

function procesarRespuesta(res: RespuestaApi<{ nombre: string }>): string {
  switch (res.estado) {
    case "ok":
      return \`Bienvenido, \${res.datos.nombre}\`;
    case "error":
      return \`Fallo (\${res.codigo}): \${res.mensaje}\`;
    default: {
      // Si añades un nuevo estado y olvidas manejarlo, TS dará error aquí
      const _exhaustivo: never = res;
      return _exhaustivo;
    }
  }
}`,
  },
  {
    id: 'ts-base-4',
    titleHtml: '4. Genéricos (<code>&lt;T&gt;</code>) y Utility Types',
    searchable: 'Generics Partial Omit Pick Readonly Record',
    lang: 'typescript',
    code: `function buscarPorId<T extends { id: string }>(lista: readonly T[], id: string): T | undefined {
  return lista.find((item) => item.id === id);
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
}

type ActualizarProductoDTO = Partial<Omit<Producto, "id">>;
type ResumenProducto = Pick<Producto, "id" | "nombre" | "precio">;
type ProductoSoloLectura = Readonly<Producto>;
type CatalogoPorId = Record<string, Producto>;`,
  },
];

export const TS_PRO_BLOCKS: readonly TsCodeBlock[] = [
  {
    id: 'ts-pro-1',
    titleHtml: 'Operador <code>satisfies</code>',
    description: 'Valida contra un tipo general sin perder el autocompletado exacto de las claves.',
    searchable: 'satisfies RutaConfig Record',
    lang: 'typescript',
    code: `type RutaConfig = { path: string; roles: readonly string[] };

const RUTAS = {
  login: { path: "/login", roles: ["publico"] },
  panel: { path: "/admin", roles: ["admin"] },
} satisfies Record<string, RutaConfig>;

console.log(RUTAS.panel.path); // Autocompletado exacto`,
  },
  {
    id: 'ts-pro-2',
    titleHtml: 'Funciones de Aserción (<code>asserts</code>)',
    description: 'Estrechan el tipo de una variable tras validar una precondición.',
    searchable: 'asserts assertDefinido',
    lang: 'typescript',
    code: `function assertDefinido<T>(val: T | null | undefined, msg: string): asserts val is T {
  if (val === null || val === undefined) throw new Error(msg);
}

function saludar(nombre?: string) {
  assertDefinido(nombre, "Nombre obligatorio");
  return nombre.toUpperCase(); // TS sabe que ya es string
}`,
  },
  {
    id: 'ts-pro-3',
    titleHtml: 'Template Literal &amp; Mapped Types',
    searchable: 'Template Literal Mapped Types keyof',
    lang: 'typescript',
    code: `type Entidad = "usuario" | "pedido";
type Accion = "creado" | "eliminado";
type Evento = \`\${Entidad}:\${Accion}\`;

type FiltrosActivos<T> = {
  [K in keyof T]?: boolean;
};`,
  },
  {
    id: 'ts-pro-4',
    titleHtml: 'Conditional Types e <code>infer</code>',
    searchable: 'Conditional Types infer ResultadoPromesa',
    lang: 'typescript',
    code: `type ResultadoPromesa<T> =
  T extends (...args: never[]) => Promise<infer R> ? R : never;

async function cargarConfig() {
  return { reintentos: 3, timeoutMs: 5000 };
}

type Config = ResultadoPromesa<typeof cargarConfig>;`,
  },
];

// ============================================================================
// PARTE IV: VITEST TESTING (BASE Y NIVEL PRO)
// ============================================================================

export const FIRST_PRINCIPLES: readonly PrincipleBullet[] = [
  {
    term: 'Fast:',
    definitionHtml: 'Ejecución en milisegundos sin red ni BD real.',
  },
  {
    term: 'Isolated:',
    definitionHtml: 'Ningún test depende de otro test.',
  },
  {
    term: 'Repeatable:',
    definitionHtml: 'Mismo resultado en cualquier máquina y hora.',
  },
  {
    term: 'Self-Validating:',
    definitionHtml: 'Pasa (verde) o falla (rojo) automáticamente.',
  },
  {
    term: 'Timely:',
    definitionHtml: 'Escritos junto al código o antes (TDD).',
  },
];

export const AAA_ANATOMY: readonly PrincipleBullet[] = [
  {
    term: '1. Arrange (Preparar):',
    definitionHtml: 'Instanciar datos de entrada y configurar mocks.',
  },
  {
    term: '2. Act (Actuar):',
    definitionHtml: 'Llamar a la función o método bajo prueba.',
  },
  {
    term: '3. Assert (Verificar):',
    definitionHtml: 'Comprobar el valor devuelto o las llamadas a mocks con <code>expect()</code>.',
  },
];

export const MATCHERS_AND_EACH_SNIPPET = `// Aserciones principales
expect(resultado).toBe(100);                               // Primitivos (===)
expect(objeto).toEqual({ id: "1", activo: true });         // Objetos/arrays profundos
expect(objeto).toMatchObject({ id: "1" });                 // Subconjunto de propiedades
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);                     // Decimales
expect(() => funcionInvalida()).toThrow("Mensaje esperado"); // Errores síncronos
await expect(promesaFallida()).rejects.toThrow("Error");     // Promesas rechazadas

// Tests parametrizados sin duplicar bloques 'it'
it.each([
  { entrada: 100, descuento: 0, esperado: 100 },
  { entrada: 100, descuento: 20, esperado: 80 },
  { entrada: 50, descuento: 100, esperado: 0 },
])("con precio $entrada y descuento $descuento% devuelve $esperado", ({ entrada, descuento, esperado }) => {
  expect(aplicarDescuento(entrada, descuento)).toBe(esperado);
});`;

export const MOCKS_COMPARISON_LIST: readonly PrincipleBullet[] = [
  {
    term: '<code>vi.fn()</code>:',
    definitionHtml: 'Crea una función falsa desde cero. Ideal para inyectar interfaces.',
  },
  {
    term: '<code>vi.spyOn(obj, "metodo")</code>:',
    definitionHtml: 'Espía un método real existente sin romperlo (o sobrescribiéndolo temporalmente).',
  },
  {
    term: '<code>vi.mock("./ruta")</code>:',
    definitionHtml: 'Sustituye un módulo importado completo.',
  },
];

export const SPY_ON_SNIPPET = `const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
// ... ejecutar código ...
expect(warnSpy).toHaveBeenCalledWith("Alerta");
warnSpy.mockRestore();`;

export const FAKE_TIMERS_DESCRIPTION =
  'Nunca esperes segundos reales en un test unitario. Congela el reloj y avanza el tiempo instantáneamente:';

export const FAKE_TIMERS_SNIPPET = `beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-06-01T10:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers(); // Obligatorio restaurar
});

it("caduca tras avanzar 15 minutos", () => {
  const token = crearTokenMinutos(10);
  vi.advanceTimersByTime(15 * 60 * 1000);
  expect(estaCaducado(token)).toBe(true);
});`;

// ============================================================================
// PARTE V: PROYECTO PRÁCTICO BASE "MOTOR DE PEDIDOS" (5 ARCHIVOS COMPLETOS)
// ============================================================================

export const BASE_PROJECT_IDE_TABS: readonly IdeFileTab[] = [
  {
    id: 'tipos',
    label: 'src/domain/tipos.ts',
    lang: 'typescript',
    code: `export type NivelSuscripcion = "free" | "pro" | "enterprise";

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
      tipo: "porcentaje";
      codigo: string;
      porcentaje: number;
      expiraEl: Date;
    }
  | {
      tipo: "fijo";
      codigo: string;
      descuentoEuros: number;
      expiraEl: Date;
    };

export type ResultadoPedido =
  | {
      estado: "completado";
      transaccionId: string;
      totalCobrado: number;
    }
  | {
      estado: "rechazado";
      motivo: "SIN_STOCK" | "PAGO_FALLIDO" | "CARRITO_VACIO";
      detalle: string;
    };

export interface RepositorioInventario {
  hayStock(productoId: string, cantidad: number): Promise<boolean>;
  descontarStock(productoId: string, cantidad: number): Promise<void>;
}

export interface PasarelaPago {
  cobrar(usuarioId: string, importe: number): Promise<{ transaccionId: string }>;
}`,
  },
  {
    id: 'calc',
    label: 'src/services/calculadoraPrecios.ts',
    lang: 'typescript',
    code: `import type { CuponDescuento, ItemCarrito, NivelSuscripcion } from "@domain/tipos";

const DESCUENTOS_SUSCRIPCION: Record<NivelSuscripcion, number> = {
  free: 0,
  pro: 0.1,
  enterprise: 0.2,
};

export function calcularPrecioFinal(
  items: readonly ItemCarrito[],
  nivelUsuario: NivelSuscripcion,
  cupon?: CuponDescuento,
  fechaActual: Date = new Date()
): number {
  if (items.length === 0) {
    return 0;
  }

  const subtotal = items.reduce((acumulado, item) => {
    if (item.cantidad <= 0) {
      throw new Error(\`Cantidad inválida para el producto \${item.producto.nombre}\`);
    }
    if (item.producto.precioBase < 0) {
      throw new Error(\`Precio negativo no permitido en \${item.producto.nombre}\`);
    }
    return acumulado + item.producto.precioBase * item.cantidad;
  }, 0);

  const porcentajeNivel = DESCUENTOS_SUSCRIPCION[nivelUsuario];
  let total = subtotal * (1 - porcentajeNivel);

  if (cupon && cupon.expiraEl.getTime() >= fechaActual.getTime()) {
    if (cupon.tipo === "porcentaje") {
      total = total * (1 - cupon.porcentaje / 100);
    } else {
      total = total - cupon.descuentoEuros;
    }
  }

  const totalSeguro = Math.max(0, total);
  return Math.round(totalSeguro * 100) / 100;
}`,
  },
  {
    id: 'proc',
    label: 'src/services/procesadorPedidos.ts',
    lang: 'typescript',
    code: `import type {
  CuponDescuento,
  ItemCarrito,
  NivelSuscripcion,
  PasarelaPago,
  RepositorioInventario,
  ResultadoPedido,
} from "@domain/tipos";
import { calcularPrecioFinal } from "@services/calculadoraPrecios";

export class ProcesadorPedidos {
  constructor(
    private readonly inventario: RepositorioInventario,
    private readonly pasarelaPago: PasarelaPago
  ) {}

  async procesar(
    usuarioId: string,
    nivelUsuario: NivelSuscripcion,
    items: readonly ItemCarrito[],
    cupon?: CuponDescuento
  ): Promise<ResultadoPedido> {
    if (items.length === 0) {
      return {
        estado: "rechazado",
        motivo: "CARRITO_VACIO",
        detalle: "No se puede procesar un pedido sin productos",
      };
    }

    for (const item of items) {
      const disponible = await this.inventario.hayStock(item.producto.id, item.cantidad);
      if (!disponible) {
        return {
          estado: "rechazado",
          motivo: "SIN_STOCK",
          detalle: \`Stock insuficiente para \${item.producto.nombre}\`,
        };
      }
    }

    const totalCobrado = calcularPrecioFinal(items, nivelUsuario, cupon);

    try {
      const { transaccionId } = await this.pasarelaPago.cobrar(usuarioId, totalCobrado);

      for (const item of items) {
        await this.inventario.descontarStock(item.producto.id, item.cantidad);
      }

      return {
        estado: "completado",
        transaccionId,
        totalCobrado,
      };
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido en pasarela";
      return {
        estado: "rechazado",
        motivo: "PAGO_FALLIDO",
        detalle: mensaje,
      };
    }
  }
}`,
  },
  {
    id: 'test-calc',
    label: 'tests/calculadoraPrecios.test.ts',
    lang: 'typescript',
    isTestFile: true,
    code: `import { describe, it, expect } from "vitest";
import type { CuponDescuento, ItemCarrito } from "@domain/tipos";
import { calcularPrecioFinal } from "@services/calculadoraPrecios";

describe("calcularPrecioFinal", () => {
  const teclado: ItemCarrito = {
    producto: { id: "p1", nombre: "Teclado Mecánico", precioBase: 100 },
    cantidad: 2,
  };

  it("debería devolver 0 si el carrito está vacío", () => {
    expect(calcularPrecioFinal([], "free")).toBe(0);
  });

  it.each([
    { nivel: "free", esperado: 200 },
    { nivel: "pro", esperado: 180 },
    { nivel: "enterprise", esperado: 160 },
  ] as const)(
    "debería calcular $esperado€ para un usuario con suscripción $nivel",
    ({ nivel, esperado }) => {
      const total = calcularPrecioFinal([teclado], nivel);
      expect(total).toBe(esperado);
    }
  );

  it("debería aplicar un cupón porcentual válido sobre el precio con descuento de suscripción", () => {
    const fechaActual = new Date("2026-06-01T10:00:00Z");
    const cupon: CuponDescuento = {
      tipo: "porcentaje",
      codigo: "VERANO10",
      porcentaje: 10,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "pro", cupon, fechaActual);
    expect(total).toBe(162);
  });

  it("debería ignorar un cupón si ya ha expirado", () => {
    const fechaActual = new Date("2026-06-20T10:00:00Z");
    const cuponExpirado: CuponDescuento = {
      tipo: "fijo",
      codigo: "CADUCADO",
      descuentoEuros: 50,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "free", cuponExpirado, fechaActual);
    expect(total).toBe(200);
  });

  it("nunca debería devolver un importe negativo si el cupón fijo supera el subtotal", () => {
    const fechaActual = new Date("2026-06-01T10:00:00Z");
    const cuponGigante: CuponDescuento = {
      tipo: "fijo",
      codigo: "REGALO500",
      descuentoEuros: 500,
      expiraEl: new Date("2026-06-15T00:00:00Z"),
    };

    const total = calcularPrecioFinal([teclado], "free", cuponGigante, fechaActual);
    expect(total).toBe(0);
  });

  it("debería lanzar un error si algún producto tiene cantidad cero o negativa", () => {
    const itemInvalido: ItemCarrito = {
      producto: { id: "p2", nombre: "Ratón", precioBase: 50 },
      cantidad: 0,
    };

    expect(() => calcularPrecioFinal([itemInvalido], "free")).toThrow("Cantidad inválida");
  });
});`,
  },
  {
    id: 'test-proc',
    label: 'tests/procesadorPedidos.test.ts',
    lang: 'typescript',
    isTestFile: true,
    code: `import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  ItemCarrito,
  PasarelaPago,
  RepositorioInventario,
} from "@domain/tipos";
import { ProcesadorPedidos } from "@services/procesadorPedidos";

describe("ProcesadorPedidos", () => {
  const inventarioMock: RepositorioInventario = {
    hayStock: vi.fn(),
    descontarStock: vi.fn(),
  };

  const pasarelaMock: PasarelaPago = {
    cobrar: vi.fn(),
  };

  let procesador: ProcesadorPedidos;

  const itemsEjemplo: ItemCarrito[] = [
    { producto: { id: "prod-1", nombre: "Monitor 4K", precioBase: 300 }, cantidad: 1 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    procesador = new ProcesadorPedidos(inventarioMock, pasarelaMock);
  });

  it("debería completar el pedido, cobrar y descontar stock cuando todo es correcto", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockResolvedValue({ transaccionId: "TX-2026-01" });

    const resultado = await procesador.procesar("user-1", "pro", itemsEjemplo);

    expect(resultado).toEqual({
      estado: "completado",
      transaccionId: "TX-2026-01",
      totalCobrado: 270,
    });
    expect(pasarelaMock.cobrar).toHaveBeenCalledWith("user-1", 270);
    expect(inventarioMock.descontarStock).toHaveBeenCalledTimes(1);
    expect(inventarioMock.descontarStock).toHaveBeenCalledWith("prod-1", 1);
  });

  it("debería rechazar el pedido sin cobrar ni descontar stock si no hay inventario", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(false);

    const resultado = await procesador.procesar("user-1", "free", itemsEjemplo);

    expect(resultado.estado).toBe("rechazado");
    if (resultado.estado === "rechazado") {
      expect(resultado.motivo).toBe("SIN_STOCK");
    }
    expect(pasarelaMock.cobrar).not.toHaveBeenCalled();
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });

  it("debería rechazar el pedido y NO descontar stock si falla la pasarela de pago", async () => {
    vi.mocked(inventarioMock.hayStock).mockResolvedValue(true);
    vi.mocked(pasarelaMock.cobrar).mockRejectedValue(new Error("Tarjeta denegada"));

    const resultado = await procesador.procesar("user-1", "free", itemsEjemplo);

    expect(resultado).toEqual({
      estado: "rechazado",
      motivo: "PAGO_FALLIDO",
      detalle: "Tarjeta denegada",
    });
    expect(inventarioMock.descontarStock).not.toHaveBeenCalled();
  });
});`,
  },
];

// ============================================================================
// PARTE VI: 5 RETOS PRÁCTICOS PROGRESIVOS
// ============================================================================

export const TDD_CHALLENGES: readonly Challenge[] = [
  {
    id: 'reto-1',
    badge: 'Reto 1 • Tipos Literales y satisfies',
    badgeTheme: 'indigo',
    title: 'Calculadora de Gastos de Envío',
    searchable: 'Reto 1 Calculadora Gastos Envio ZonaEnvio satisfies it.each',
    criteriaHtmlList: [
      'Definir <code>export type ZonaEnvio = "ES" | "EU" | "INT";</code> en <code>src/domain/tipos.ts</code>.',
      'Envío gratuito (<code>0 €</code>) si el importe del pedido es <strong>&gt;= 100 €</strong>.',
      'Tarifas base (&lt; 100 €): <code>"ES" = 5 €</code>, <code>"EU" = 15 €</code>, <code>"INT" = 30 €</code>.',
      'Usuarios <code>"enterprise"</code> tienen un <strong>50% de descuento</strong> en envío. Lanzar error si importe &lt; 0.',
    ],
    hintSummary: 'Ver pista de arquitectura',
    hintContentHtml:
      'Usa <code>const TARIFAS = { ES: 5, EU: 15, INT: 30 } satisfies Record&lt;ZonaEnvio, number&gt;;</code> y prueba todos los casos borde (99.99 € vs 100 €) con <code>it.each</code>.',
  },
  {
    id: 'reto-2',
    badge: 'Reto 2 • Mocks y Spies',
    badgeTheme: 'indigo',
    title: 'Notificador con Degradación Elegante',
    searchable: 'Reto 2 Notificador Pedidos Degradacion elegante spyOn console.warn',
    criteriaHtmlList: [
      'Añadir interfaz <code>ServicioNotificaciones</code> e inyectarla de forma opcional en <code>ProcesadorPedidos</code>.',
      '<strong>Regla crítica:</strong> Si el envío de confirmación falla (lanza error), <strong>el pedido NO debe rechazarse</strong>; captura el error, registra <code>console.warn</code> y devuelve <code>"completado"</code>.',
    ],
    hintSummary: 'Ver pista de testing',
    hintContentHtml:
      'En <code>procesadorPedidos.test.ts</code>, usa <code>const warnSpy = vi.spyOn(console, "warn").mockImplementation(() =&gt; {});</code> y verifica que <code>expect(warnSpy).toHaveBeenCalled()</code> mientras el pedido sigue completado.',
  },
  {
    id: 'reto-3',
    badge: 'Reto 3 • Fake Timers',
    badgeTheme: 'amber',
    title: 'Control Antifraude por Intentos Fallidos',
    searchable: 'Reto 3 Control Antifraude Fake Timers useFakeTimers advanceTimersByTime',
    criteriaHtmlList: [
      'Crear <code>ControlFraude</code> con <code>registrarFallo(usuarioId)</code> y <code>estaBloqueado(usuarioId)</code>.',
      'Al acumular <strong>3 fallos</strong>, bloquear al usuario durante <strong>15 minutos</strong>. Tras 15 minutos, desbloquear automáticamente.',
    ],
    hintSummary: 'Ver pista de testing',
    hintContentHtml:
      'Usa <code>vi.useFakeTimers()</code>, provoca 3 fallos, avanza <code>14 * 60 * 1000</code> ms (sigue bloqueado) y luego avanza <code>61 * 1000</code> ms (ya desbloqueado). Restaura con <code>vi.useRealTimers()</code>.',
  },
  {
    id: 'reto-4',
    badge: 'Reto 4 • Generics + Utility Types',
    badgeTheme: 'amber',
    title: 'Repositorio Genérico en Memoria',
    searchable: 'Reto 4 Repositorio Generico Memoria Generics Partial Omit',
    criteriaHtmlList: [
      'Crear <code>RepositorioMemoria&lt;T extends { id: string }&gt;</code> con <code>guardar</code>, <code>buscarPorId</code>, <code>listarTodos</code>, <code>actualizar</code> y <code>eliminar</code>.',
      '<code>actualizar(id, cambios: Partial&lt;Omit&lt;T, "id"&gt;&gt;)</code> debe impedir mutar el <code>id</code> y lanzar error si no existe.',
    ],
    hintSummary: 'Ver pista de arquitectura',
    hintContentHtml:
      'Usa un <code>Map&lt;string, T&gt;</code> interno y guarda copias superficiales (<code>{ ...entidad }</code>) para evitar mutaciones externas accidentales.',
  },
  {
    id: 'reto-5',
    badge: 'Reto 5 • TDD Puro (Red → Green → Refactor)',
    badgeTheme: 'emerald',
    title: 'Promoción "3x2" en Carrito',
    searchable: 'Reto 5 Promocion 3x2 TDD Red Green Refactor',
    criteriaHtmlList: [
      'Añadir variante <code>{ tipo: "3x2"; codigo: string; expiraEl: Date }</code> a <code>CuponDescuento</code>.',
      'Por cada 3 unidades de un mismo producto, cobrar solo 2 (ej. 3 uds → paga 2; 4 uds → paga 3; 6 uds → paga 4).',
      '<strong>Obligatorio:</strong> Escribir primero todos los tests y verlos fallar (Red) antes de tocar <code>calculadoraPrecios.ts</code>.',
    ],
    hintSummary: 'Ver fórmula matemática',
    hintContentHtml:
      '<code>const unidadesGratis = Math.floor(item.cantidad / 3);</code> y <code>const unidadesACobrar = item.cantidad - unidadesGratis;</code>.',
  },
];

// ============================================================================
// PARTE VII: CHECKLIST FINAL DE CALIDAD ("DEFINITION OF DONE")
// ============================================================================

export const QUALITY_CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  {
    id: 'dod-1',
    titleHtml: '1. Cero <code>any</code> y cero <code>@ts-ignore</code>',
    descriptionHtml:
      'Todo dato externo (APIs, JSON, errores en catch) entra como <code>unknown</code> y se valida explícitamente.',
  },
  {
    id: 'dod-2',
    titleHtml: '2. Sin aserciones no nulas peligrosas (<code>!</code>)',
    descriptionHtml:
      'No usar <code>usuario!.nombre</code>; utilizar guards o encadenamiento opcional <code>?.</code>.',
  },
  {
    id: 'dod-3',
    titleHtml: '3. Dependencias abstraídas tras interfaces',
    descriptionHtml:
      'Bases de datos, pasarelas y servicios externos se inyectan mediante contratos <code>interface</code> para facilitar los mocks.',
  },
  {
    id: 'dod-4',
    titleHtml: '4. Tests 100% independientes y deterministas',
    descriptionHtml:
      'Limpieza garantizada con <code>vi.clearAllMocks()</code> y <code>vi.useRealTimers()</code> en los hooks de ciclo de vida.',
  },
  {
    id: 'dod-5',
    titleHtml: '5. Typecheck en verde (<code>npm run typecheck</code>)',
    descriptionHtml:
      'El compilador termina con 0 errores tanto en <code>src/</code> como en <code>tests/</code>.',
  },
  {
    id: 'dod-6',
    titleHtml: '6. Cobertura de ramas revisada (<code>npm run test:coverage</code>)',
    descriptionHtml: 'Se han probado caminos felices, casos borde y manejo de errores.',
  },
];

export const ALL_MILESTONE_IDS: readonly MilestoneId[] = [
  'reto-1',
  'reto-2',
  'reto-3',
  'reto-4',
  'reto-5',
  'dod-1',
  'dod-2',
  'dod-3',
  'dod-4',
  'dod-5',
  'dod-6',
];

// ============================================================================
// ÍNDICE GLOBAL DE BÚSQUEDA (100% FIEL A LOS BLOQUES DATA-SEARCHABLE)
// ============================================================================

export const SEARCH_INDEX_ENTRIES: readonly SearchIndexEntry[] = [
  {
    id: 'search-docs-oficiales',
    moduleSlug: '1-documentacion-terminal',
    partCode: 'P.1',
    title: 'Documentación Oficial de TypeScript',
    keywords:
      'documentacion oficial typescript vitest handbook narrowing generics utility types tsconfig expect vi coverage jest node',
  },
  {
    id: 'search-simulador-terminal',
    moduleSlug: '1-documentacion-terminal',
    partCode: 'P.1',
    title: 'Simulador de Flujo Diario en Terminal',
    keywords: 'terminal typecheck tsc noemit vitest run coverage stmts branch funcs lines build',
  },
  {
    id: 'search-init-proyecto',
    moduleSlug: '2-arquitectura-alias',
    partCode: 'P.2',
    title: '1. Inicialización desde cero',
    keywords: 'npm init install typescript vitest coverage-v8 tsx inicializacion desde cero',
  },
  {
    id: 'search-mapa-carpetas-alias',
    moduleSlug: '2-arquitectura-alias',
    partCode: 'P.2',
    title: '2. Mapa de Carpetas y 3. Doble Configuración de Alias',
    keywords: 'estructura carpetas domain services tests alias baseurl paths resolve mapa de carpetas',
  },
  {
    id: 'search-archivos-config',
    moduleSlug: '2-arquitectura-alias',
    partCode: 'P.2',
    title: 'Archivos de Configuración Base',
    keywords:
      'package.json tsconfig.json vitest.config.ts .gitignore strict nouncheckedindexedaccess exactoptionalpropertytypes',
  },
  {
    id: 'ts-base-1',
    moduleSlug: '3-typescript-pro',
    partCode: 'P.3',
    title: '1. Primitivos, Tuplas y as const',
    keywords: 'primitivos tuplas as const enum roles',
  },
  {
    id: 'ts-base-2',
    moduleSlug: '3-typescript-pro',
    partCode: 'P.3',
    title: '2. Tipos Especiales: any vs unknown vs never vs void',
    keywords: 'any unknown never void parsearnombre tipos especiales',
  },
  {
    id: 'ts-base-3',
    moduleSlug: '3-typescript-pro',
    partCode: 'P.3',
    title: '3. Uniones Discriminadas y Exhaustividad con never',
    keywords: 'narrowing uniones discriminadas exhaustividad switch never',
  },
  {
    id: 'ts-base-4',
    moduleSlug: '3-typescript-pro',
    partCode: 'P.3',
    title: '4. Genéricos (<T>) y Utility Types',
    keywords: 'generics partial omit pick readonly record genericos utility types',
  },
  {
    id: 'ts-pro-grid',
    moduleSlug: '3-typescript-pro',
    partCode: 'P.3',
    title: 'Operador satisfies, asserts, Template Literal e infer',
    keywords: 'satisfies asserts template literal mapped types infer conditional types',
  },
  {
    id: 'vitest-first-aaa',
    moduleSlug: '4-vitest-testing',
    partCode: 'P.4',
    title: 'Principios F.I.R.S.T. y Anatomía A.A.A.',
    keywords: 'first aaa arrange act assert fast isolated repeatable',
  },
  {
    id: 'vitest-matchers-each',
    moduleSlug: '4-vitest-testing',
    partCode: 'P.4',
    title: 'Matchers Esenciales y Tests Parametrizados (it.each)',
    keywords: 'expect tobe toequal tomatchobject tothrow rejects it.each matchers esenciales',
  },
  {
    id: 'vitest-mocks-timers',
    moduleSlug: '4-vitest-testing',
    partCode: 'P.4',
    title: 'vi.fn() vs vi.spyOn() vs vi.mock() y Fake Timers',
    keywords: 'vi.fn vi.spyon vi.mock usefaketimers setsystemtime advancetimersbytime userealtimers',
  },
  {
    id: 'ide-motor-pedidos',
    moduleSlug: '5-proyecto-base',
    partCode: 'P.5',
    title: 'Proyecto Práctico Base: "Motor de Pedidos"',
    keywords:
      'tipos.ts calculadoraprecios.ts procesadorpedidos.ts calculadoraprecios.test.ts procesadorpedidos.test.ts motor de pedidos',
  },
  {
    id: 'reto-1',
    moduleSlug: '6-retos-tdd',
    partCode: 'P.6',
    title: 'Calculadora de Gastos de Envío',
    keywords: 'reto 1 calculadora gastos envio zonaenvio satisfies it.each',
  },
  {
    id: 'reto-2',
    moduleSlug: '6-retos-tdd',
    partCode: 'P.6',
    title: 'Notificador con Degradación Elegante',
    keywords: 'reto 2 notificador pedidos degradacion elegante spyon console.warn',
  },
  {
    id: 'reto-3',
    moduleSlug: '6-retos-tdd',
    partCode: 'P.6',
    title: 'Control Antifraude por Intentos Fallidos',
    keywords: 'reto 3 control antifraude fake timers usefaketimers advancetimersbytime',
  },
  {
    id: 'reto-4',
    moduleSlug: '6-retos-tdd',
    partCode: 'P.6',
    title: 'Repositorio Genérico en Memoria',
    keywords: 'reto 4 repositorio generico memoria generics partial omit',
  },
  {
    id: 'reto-5',
    moduleSlug: '6-retos-tdd',
    partCode: 'P.6',
    title: 'Promoción "3x2" en Carrito',
    keywords: 'reto 5 promocion 3x2 tdd red green refactor',
  },
  {
    id: 'checklist-dod-card',
    moduleSlug: '7-checklist-dod',
    partCode: 'P.7',
    title: 'Checklist Final de Calidad ("Definition of Done")',
    keywords: 'checklist definition of done any ts-ignore aserciones mocks typecheck coverage',
  },
];
