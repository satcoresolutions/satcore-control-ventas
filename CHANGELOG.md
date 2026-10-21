# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato sigue una estructura basada en versiones y categorías de cambios.

---

## [Unreleased]

### Added

- Espacio reservado para nuevas funcionalidades.

### Changed

- Espacio reservado para cambios en funcionalidades existentes.

### Fixed

- Espacio reservado para correcciones de errores.

### Removed

- Espacio reservado para funcionalidades retiradas.

### Security

- Espacio reservado para mejoras de seguridad y privacidad.

---

## [1.0.0] - 2026-10-21

### Added

- Lanzamiento inicial de **Control de ventas | SatCore Solutions**.
- Registro de ventas con fecha, producto, cantidad, precio unitario, medio de pago, cliente y notas.
- Autocompletado de productos registrados anteriormente.
- Recuperación del último precio utilizado para cada producto.
- Conservación de la fecha y el medio de pago al registrar ventas consecutivas.
- Consulta de ventas agrupadas por día y cálculo de totales por jornada.
- Búsqueda, edición y eliminación de registros.
- Filtros por hoy, últimos 7 días, últimos 30 días, mes actual, historial completo y rango de fechas personalizado.
- Indicadores de ventas totales, comparación con el periodo anterior, número de transacciones y unidades vendidas.
- Cálculo del ticket promedio, promedio diario y mejor día de ventas.
- Visualización de la evolución diaria o mensual de las ventas.
- Identificación de los productos más vendidos.
- Análisis de ventas por medio de pago y día de la semana.
- Exportación de los registros de la vista actual en formato CSV.
- Carga de datos de ejemplo para explorar las estadísticas.
- Almacenamiento local de los registros mediante `localStorage`.
- Interfaz web desarrollada con Next.js, React, TypeScript y CSS.
- Arquitectura modular para separar la interfaz, los cálculos estadísticos, las fechas, el formateo y la exportación de datos.

### Changed

- Primera versión del proyecto, sin versiones anteriores publicadas.

### Fixed

- No se documentan correcciones específicas para esta versión inicial.

### Removed

- No aplica en el lanzamiento inicial.

### Security

- Documentación del almacenamiento local y sus limitaciones de privacidad.
- Recomendación de exportar periódicamente los registros CSV como respaldo.
- Advertencia sobre la posible pérdida de información al borrar los datos del navegador.
- Documentación de la ausencia de autenticación, sincronización automática y almacenamiento centralizado en esta versión.
