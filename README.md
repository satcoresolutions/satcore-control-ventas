# Control de ventas | SatCore Solutions

Microaplicación para registrar las ventas diarias de un negocio, consultar estadísticas y analizar su evolución de forma sencilla.

Desarrollada con **Next.js y TypeScript**, está pensada para emprendedores, pequeños negocios y personas que necesitan llevar un control básico de sus ventas sin configurar un servidor ni una base de datos.

Los datos se almacenan localmente en el navegador mediante `localStorage`.

---

## Características principales

### Registro y gestión de ventas

- Registrar fecha, producto, cantidad, precio unitario, medio de pago, cliente y notas.
- Autocompletar el nombre de productos registrados anteriormente.
- Recuperar el último precio utilizado para cada producto.
- Conservar la fecha y el medio de pago al registrar ventas consecutivas.
- Consultar las ventas agrupadas por día y el total de cada jornada.
- Buscar, editar y eliminar registros.

### Filtros y periodos

Consulta la información según el periodo que necesites:

- Hoy.
- Últimos 7 días.
- Últimos 30 días.
- Mes actual.
- Todo el historial.
- Rango de fechas personalizado.

### Estadísticas del negocio

Obtén una visión general del comportamiento de tus ventas mediante indicadores y gráficos:

- **Ventas totales:** importe acumulado durante el periodo seleccionado.
- **Comparación de ventas:** variación frente al periodo anterior.
- **Número de ventas:** cantidad de transacciones registradas.
- **Unidades vendidas:** suma de las cantidades comercializadas.
- **Ticket promedio:** valor medio por transacción.
- **Promedio diario:** importe promedio de ventas por día.
- **Mejor día:** jornada con el mayor volumen de ventas.
- **Evolución de ventas:** gráfico diario o mensual, según el periodo.
- **Productos más vendidos:** identifica los productos con mayor movimiento.
- **Medios de pago:** consulta cómo se distribuyen las ventas.
- **Ventas por día de la semana:** reconoce patrones en la actividad comercial.

### Exportación y datos de prueba

- Exportar a CSV los registros correspondientes a la vista actual.
- Abrir los archivos exportados con Excel y otras aplicaciones compatibles.
- Cargar datos de ejemplo para explorar las estadísticas sin registrar ventas manualmente.

---

## Tecnologías utilizadas

- **Next.js:** framework para la aplicación web.
- **React:** construcción de la interfaz.
- **TypeScript:** tipado estático y mayor claridad en el código.
- **CSS:** estilos y diseño de la interfaz.
- **localStorage:** almacenamiento local de las ventas.
- **CSV:** exportación de registros para su análisis externo.

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js, preferiblemente una versión LTS compatible con las dependencias del proyecto.
- npm, incluido normalmente con Node.js.
- Git, si deseas clonar el repositorio.

Puedes comprobar las versiones instaladas con:

```bash
node -v
npm -v
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/satcoresolutions/satcore-control-ventas.git
```

### 2. Entrar en el proyecto

```bash
cd satcore-control-ventas
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre la aplicación en tu navegador:

[http://localhost:3000](http://localhost:3000)

### 5. Generar una versión de producción

```bash
npm run build
npm start
```

El comando `npm start` ejecuta la aplicación compilada. Si el proyecto utiliza scripts estándar de Next.js, no es necesario volver a compilar cada vez que la inicies; solo debes ejecutar nuevamente `npm run build` cuando cambies el código.

---

## Estructura del proyecto

```text
app/
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── SalesApp.tsx
├── SaleForm.tsx
├── SalesTable.tsx
└── Stats.tsx

lib/
├── types.ts
├── dates.ts
├── stats.ts
├── csv.ts
├── demo.ts
└── format.ts
```

> La estructura es orientativa y debe coincidir con los archivos reales del repositorio.

### Responsabilidad de cada módulo

| Archivo o módulo | Función                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `app/`           | Página principal, configuración de la aplicación y estilos globales. |
| `SalesApp.tsx`   | Estado principal, filtros y coordinación de los componentes.         |
| `SaleForm.tsx`   | Formulario para registrar y editar ventas.                           |
| `SalesTable.tsx` | Listado y gestión de los registros.                                  |
| `Stats.tsx`      | Indicadores y visualizaciones estadísticas.                          |
| `lib/types.ts`   | Tipos e interfaces de TypeScript.                                    |
| `lib/dates.ts`   | Operaciones y filtros relacionados con fechas.                       |
| `lib/stats.ts`   | Funciones de cálculo de estadísticas.                                |
| `lib/csv.ts`     | Generación y exportación de archivos CSV.                            |
| `lib/demo.ts`    | Datos de ejemplo.                                                    |
| `lib/format.ts`  | Formateo de valores y cantidades.                                    |

Los cálculos estadísticos se mantienen separados de la interfaz para facilitar su mantenimiento, comprobación y reutilización.

---

## Almacenamiento y privacidad

La aplicación utiliza `localStorage` para conservar los registros en el navegador.

Esto significa que:

- No requiere una base de datos ni un backend para funcionar.
- Los datos permanecen en el navegador y el perfil donde se registraron.
- No existe sincronización automática entre dispositivos o navegadores.
- Borrar los datos del sitio o perder el almacenamiento local puede provocar la pérdida de los registros.
- Los datos de un navegador no se trasladan automáticamente a otro equipo.

**Recomendación:** exporta periódicamente tus registros a CSV y conserva una copia de seguridad. El archivo CSV no sustituye una copia de seguridad completa de todos los datos internos de la aplicación.

---

## Alcance y limitaciones

Control de ventas está diseñada como una herramienta ligera para el seguimiento básico de transacciones.

No sustituye un sistema contable, un software de facturación electrónica ni un sistema de inventario. Tampoco ofrece, por sí sola, cuentas de usuario, permisos, sincronización en la nube o recuperación de datos entre dispositivos.

Estas capacidades podrían incorporarse en una versión futura si el proyecto evoluciona hacia una solución con backend.

---

## Desarrollado por

**SatCore Solutions**

Soluciones digitales seguras, accesibles y funcionales para todos.

Creamos herramientas digitales prácticas para emprendedores, pequeños negocios y personas que buscan simplificar sus tareas cotidianas.

- GitHub: [@satcoresolutions](https://github.com/satcoresolutions)

---

## Licencia

Consulta el archivo `LICENSE` del repositorio para conocer las condiciones de uso, modificación y distribución del proyecto.
