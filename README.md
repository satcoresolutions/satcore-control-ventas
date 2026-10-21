 <div align="center">

<img src="./public/logo.png" alt="SatCore Solutions" width="220" />

# Control de ventas

**Control de ventas diarias, estadísticas y análisis comercial para pequeños negocios.**

Microaplicación desarrollada para registrar ventas, consultar indicadores y analizar la evolución de un negocio de forma sencilla, sin necesidad de configurar un servidor de datos ni una base de datos.

Solución ligera, accesible y práctica para emprendedores, comerciantes y pequeños negocios que necesitan organizar sus registros comerciales desde el navegador.

[![Licencia](https://img.shields.io/badge/License-SCSAL%201.0-blue.svg)](./LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-SatCore%20Solutions-181717?logo=github)](https://github.com/satcoresolutions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/Styles-CSS-663399?logo=css3)](https://developer.mozilla.org/docs/Web/CSS)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/Package%20Manager-npm-CB3837?logo=npm)](https://www.npmjs.com/)

</div>

---

# Sobre el proyecto

**Control de ventas** es una microaplicación de SatCore Solutions diseñada para facilitar el registro y seguimiento de las ventas diarias de un negocio.

Permite administrar transacciones, consultar periodos de actividad comercial, analizar indicadores y exportar registros para su revisión en herramientas externas.

La aplicación utiliza Next.js, React y TypeScript para ofrecer una interfaz web, mientras que `localStorage` permite conservar los registros localmente en el navegador.

Su objetivo es proporcionar una herramienta sencilla para el control comercial cotidiano, reduciendo la necesidad de llevar registros manuales dispersos o utilizar sistemas de gestión más complejos.

## Objetivos principales

- Simplificar el registro y la consulta de las ventas.
- Facilitar el seguimiento de los ingresos durante diferentes periodos.
- Identificar productos con mayor movimiento comercial.
- Comparar resultados entre periodos.
- Ofrecer indicadores comprensibles para apoyar decisiones cotidianas.
- Permitir la exportación de registros en formato CSV.
- Mantener una experiencia de uso ligera, sin exigir infraestructura de backend.

## Público objetivo

- Emprendedores y trabajadores independientes.
- Tiendas y pequeños comercios.
- Negocios familiares.
- Personas que comercializan productos o servicios.
- Pequeñas empresas que necesitan un registro complementario de ventas.

---

# SatCore Solutions

**SatCore Solutions** (_Software and Technology Core Solutions_) es una marca orientada al desarrollo de soluciones tecnológicas prácticas, funcionales y accesibles.

Nuestro propósito es crear herramientas digitales que ayuden a simplificar tareas, optimizar procesos y facilitar el acceso a soluciones de software.

**Eslogan corporativo:**

> Soluciones digitales seguras, accesibles y funcionales para todos.

## Áreas de trabajo

- **Desarrollo:** creación de aplicaciones, herramientas digitales y soluciones de software.
- **Automatizador:** simplificación y automatización de procesos y tareas.
- **Seguridad:** buenas prácticas de seguridad, privacidad y protección de la información.
- **Estudio:** investigación, experimentación y desarrollo de propuestas tecnológicas.
- **Marketing:** soluciones y herramientas digitales orientadas a la comunicación y presencia comercial.

Control de ventas forma parte de nuestra iniciativa de crear herramientas prácticas para la gestión cotidiana de pequeños negocios.

---

# Características

## 1. Registro y gestión de ventas

La aplicación permite registrar y administrar las transacciones comerciales.

- Registro de fecha de venta.
- Nombre del producto.
- Cantidad vendida.
- Precio unitario.
- Medio de pago.
- Nombre del cliente, cuando corresponda.
- Notas adicionales.
- Autocompletado de productos registrados anteriormente.
- Recuperación del último precio utilizado para cada producto.
- Conservación de la fecha y del medio de pago al registrar ventas consecutivas.
- Consulta de ventas agrupadas por día.
- Cálculo del total de ventas por jornada.
- Búsqueda de registros existentes.
- Edición de ventas registradas.
- Eliminación de registros.

## 2. Filtros y periodos

Permite consultar las ventas según diferentes intervalos de tiempo.

- Hoy.
- Últimos 7 días.
- Últimos 30 días.
- Mes actual.
- Todo el historial.
- Rango de fechas personalizado.

Los filtros permiten analizar la actividad comercial sin necesidad de revisar manualmente todos los registros.

## 3. Estadísticas del negocio

La aplicación ofrece indicadores para comprender mejor el comportamiento de las ventas.

- **Ventas totales:** importe acumulado durante el periodo seleccionado.
- **Comparación de ventas:** variación respecto al periodo anterior correspondiente.
- **Número de ventas:** cantidad de transacciones registradas.
- **Unidades vendidas:** suma de las cantidades comercializadas.
- **Ticket promedio:** valor medio por transacción.
- **Promedio diario:** importe promedio de ventas por día.
- **Mejor día:** jornada con el mayor volumen de ventas.
- **Evolución de ventas:** visualización diaria o mensual según el periodo.
- **Productos más vendidos:** identificación de los productos con mayor movimiento.
- **Medios de pago:** distribución de las transacciones por forma de pago.
- **Ventas por día de la semana:** identificación de patrones en la actividad comercial.

Los indicadores se calculan a partir de los registros disponibles y de los filtros activos. Su interpretación depende de la calidad y la integridad de los datos ingresados.

## 4. Exportación y datos de prueba

- Exportación de los registros correspondientes a la vista actual en formato CSV.
- Compatibilidad con Excel y otras aplicaciones que permiten importar archivos CSV.
- Carga de datos de ejemplo para explorar las estadísticas sin registrar ventas manualmente.

Los datos de ejemplo deben distinguirse de los registros reales para evitar confusiones durante el análisis comercial.

## 5. Almacenamiento local

- Persistencia de datos mediante `localStorage`.
- Funcionamiento sin una base de datos remota.
- Conservación de registros en el navegador utilizado.
- Sincronización manual mediante la exportación de información, cuando sea necesaria.

## 6. Alcance funcional

Control de ventas está orientada al registro y análisis básico de transacciones. No pretende sustituir sistemas especializados de contabilidad, facturación electrónica, inventario o administración empresarial.

---

# Tecnologías

## Tecnologías principales

| Tecnología     | Función                                                            |
| -------------- | ------------------------------------------------------------------ |
| Next.js        | Framework para la aplicación web.                                  |
| React          | Construcción de la interfaz mediante componentes.                  |
| TypeScript     | Tipado estático y mayor claridad en el código.                     |
| CSS            | Estilos, presentación y diseño de la interfaz.                     |
| `localStorage` | Persistencia de registros en el navegador.                         |
| CSV            | Exportación de ventas para análisis externo.                       |
| Node.js        | Entorno de ejecución para el desarrollo y la ejecución de Next.js. |
| npm            | Instalación y administración de dependencias.                      |
| Git            | Control de versiones y colaboración.                               |

Las versiones indicadas en las insignias son referencias tecnológicas y deben ajustarse a las versiones efectivamente declaradas en `package.json` y en el archivo de bloqueo del repositorio.

---

# Requisitos

Antes de instalar el proyecto, asegúrate de disponer de:

- **Node.js:** versión LTS compatible con la versión de Next.js y las dependencias instaladas.
- **npm:** gestor de paquetes incluido habitualmente con Node.js.
- **Git:** necesario para clonar el repositorio.
- **Navegador moderno:** compatible con las características web utilizadas por la aplicación.

Comprueba las herramientas instaladas:

\`\`\`bash
node -v
npm -v
git --version
\`\`\`

Consulta `package.json` para verificar los requisitos exactos del entorno de ejecución.

---

# Instalación

## 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/satcoresolutions/satcore-control-ventas.git
\`\`\`

## 2. Entrar en el directorio

\`\`\`bash
cd satcore-control-ventas
\`\`\`

## 3. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

## 4. Iniciar el servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre la siguiente dirección en tu navegador:

[http://localhost:3000](http://localhost:3000)

Si el puerto 3000 está ocupado, Next.js puede seleccionar otro puerto y mostrarlo en la terminal.

---

# Configuración

Control de ventas utiliza almacenamiento local, por lo que su funcionamiento básico no requiere una base de datos, credenciales de servidor ni un archivo `.env.local`.

## Configuración del proyecto

Las opciones generales se administran mediante los archivos de configuración de Next.js, TypeScript y npm.

Antes de modificar el proyecto, revisa:

- `package.json`: scripts, dependencias y metadatos.
- `next.config.mjs`: configuración de Next.js, si este es el archivo utilizado por el repositorio.
- `tsconfig.json`: configuración de TypeScript.
- `app/globals.css`: estilos globales de la aplicación.

Los nombres y las rutas anteriores deben verificarse contra la estructura real del proyecto.

## Configuración de los datos

Los registros se almacenan en el navegador. Por tanto:

- Los datos pertenecen al navegador y al perfil donde fueron guardados.
- Abrir la aplicación desde otro navegador no garantiza que estén disponibles.
- No existe sincronización automática entre equipos.
- El borrado de los datos del sitio puede ocasionar la pérdida de información.

**Recomendación:** exporta periódicamente los registros a CSV y conserva copias en una ubicación segura.

No se deben almacenar contraseñas, claves privadas ni otros secretos en el código del cliente o en `localStorage`.

---

# Desarrollo

Para ejecutar el entorno de desarrollo:

\`\`\`bash
npm run dev
\`\`\`

Para comprobar los scripts disponibles:

\`\`\`bash
npm run
\`\`\`

Los comandos de comprobación y calidad dependen de los scripts definidos en `package.json`. Si existen scripts para linting, pruebas o comprobación de tipos, deben ejecutarse antes de integrar cambios.

## Buenas prácticas

- Mantener los componentes de interfaz separados de los cálculos estadísticos.
- Definir tipos explícitos para los registros de ventas.
- Centralizar las operaciones de fechas y periodos.
- Validar cantidades y precios antes de guardar una transacción.
- Mantener coherentes los cálculos entre tablas, estadísticas y exportaciones.
- Tratar correctamente los datos ausentes y los registros inválidos.
- Probar los filtros con periodos vacíos y rangos personalizados.
- Evitar la eliminación accidental de registros.
- No introducir dependencias innecesarias.
- Mantener actualizado el archivo de dependencias.

---

# Producción

Para generar una compilación de producción:

\`\`\`bash
npm run build
\`\`\`

Para iniciar la aplicación compilada:

\`\`\`bash
npm start
\`\`\`

El comando `npm start` requiere que exista una compilación válida. Después de modificar el código, vuelve a ejecutar `npm run build` antes de iniciar la nueva versión.

Los comandos anteriores presuponen que `package.json` contiene los scripts estándar de Next.js:

\`\`\`json
{
"scripts": {
"dev": "next dev",
"build": "next build",
"start": "next start"
}
}
\`\`\`

Este fragmento es ilustrativo; no reemplaza la configuración real del proyecto.

Antes de publicar una versión de producción, verifica:

- Que la compilación finalice correctamente.
- Que los formularios registren y editen ventas.
- Que los filtros calculen los periodos esperados.
- Que los indicadores correspondan a los registros visibles.
- Que la exportación CSV contenga las columnas y los valores correctos.
- Que el almacenamiento local funcione tras recargar la página.
- Que se distingan adecuadamente los datos de ejemplo y los registros reales.

---

# Estructura del proyecto

La siguiente estructura es orientativa. Los nombres de archivos y las extensiones deben coincidir con los que existan realmente en el repositorio.

\`\`\`text
satcore-control-ventas/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── components/
│ ├── SalesApp.tsx
│ ├── SaleForm.tsx
│ ├── SalesTable.tsx
│ └── Stats.tsx
├── lib/
│ ├── types.ts
│ ├── dates.ts
│ ├── stats.ts
│ ├── csv.ts
│ ├── demo.ts
│ └── format.ts
├── public/
│ └── logo.png
├── package.json
├── package-lock.json
├── next.config.mjs
├── tsconfig.json
├── README.md
├── CHANGELOG.md
└── LICENSE
\`\`\`

## Responsabilidad de los módulos

| Archivo o directorio | Responsabilidad                                                   |
| -------------------- | ----------------------------------------------------------------- |
| `app/`               | Página principal, estructura de la aplicación y estilos globales. |
| `SalesApp.tsx`       | Coordinación de componentes, estado y filtros.                    |
| `SaleForm.tsx`       | Registro y edición de ventas.                                     |
| `SalesTable.tsx`     | Visualización, búsqueda y gestión de registros.                   |
| `Stats.tsx`          | Indicadores y visualizaciones estadísticas.                       |
| `lib/types.ts`       | Tipos e interfaces de TypeScript.                                 |
| `lib/dates.ts`       | Operaciones y filtros relacionados con fechas.                    |
| `lib/stats.ts`       | Funciones de cálculo de estadísticas.                             |
| `lib/csv.ts`         | Generación y exportación de archivos CSV.                         |
| `lib/demo.ts`        | Datos de ejemplo para explorar la aplicación.                     |
| `lib/format.ts`      | Formateo de importes, cantidades y otros valores.                 |
| `public/`            | Recursos estáticos de la aplicación.                              |

---

# Arquitectura

Control de ventas utiliza una arquitectura ligera de aplicación web con persistencia local.

## Flujo general

1. El usuario introduce los datos de una venta.
2. La aplicación valida y procesa los valores ingresados.
3. Los registros se conservan en el almacenamiento local del navegador.
4. Los componentes muestran las ventas y aplican los filtros seleccionados.
5. Los módulos estadísticos calculan indicadores a partir de los datos disponibles.
6. El módulo CSV genera un archivo para su uso en herramientas externas.

## Separación de responsabilidades

La arquitectura busca mantener diferenciadas las siguientes áreas:

- **Interfaz:** formularios, tablas, filtros e indicadores.
- **Lógica de negocio:** validación y procesamiento de transacciones.
- **Estadísticas:** agregaciones, comparaciones y cálculos por periodo.
- **Fechas:** interpretación de intervalos y agrupaciones temporales.
- **Persistencia:** lectura y escritura en `localStorage`.
- **Exportación:** transformación de registros a formato CSV.

Esta separación facilita el mantenimiento y permite modificar los cálculos sin acoplarlos innecesariamente a los componentes visuales.

---

# Datos y privacidad

La aplicación utiliza `localStorage` para almacenar la información comercial dentro del navegador.

## Tratamiento de los datos

- No requiere una base de datos remota para el funcionamiento básico.
- No incorpora, por sí sola, sincronización automática entre dispositivos.
- Los registros no se transfieren automáticamente entre navegadores.
- La información puede perderse al borrar los datos del sitio, restablecer el navegador o perder el perfil donde se almacenó.
- Los archivos CSV exportados quedan fuera del almacenamiento administrado por la aplicación y deben protegerse por separado.

El almacenamiento local no equivale a una copia de seguridad ni garantiza la recuperación de los registros.

## Recomendaciones

- Exportar los registros periódicamente.
- Conservar las copias de seguridad en ubicaciones protegidas.
- Evitar almacenar información personal que no sea necesaria.
- Restringir el acceso al dispositivo y al perfil del navegador.
- Verificar los archivos CSV antes de compartirlos.
- Mantener separados los datos de prueba y los datos comerciales reales.

**Importante:** esta aplicación no debe considerarse un sistema de contabilidad oficial ni un mecanismo certificado de conservación de registros comerciales.

---

# Seguridad

La seguridad del proyecto depende tanto de su implementación como de las prácticas de uso.

## Consideraciones de seguridad

- Los datos guardados en `localStorage` pueden ser accesibles para scripts ejecutados en el mismo origen.
- La aplicación no proporciona autenticación ni control de acceso por usuario en su versión descrita.
- Cualquier persona con acceso al mismo perfil del navegador podría acceder a los registros.
- Los datos almacenados localmente no están protegidos automáticamente mediante cifrado de aplicación.
- Los archivos exportados pueden contener información comercial y deben manejarse con cuidado.
- No deben incorporarse secretos ni credenciales al código de la aplicación.

## Reporte de vulnerabilidades

Si identificas una vulnerabilidad o un problema relacionado con la seguridad, comunícalo de manera responsable a:

**Correo:** satcoresolutions@gmail.com

Evita publicar detalles que permitan explotar una vulnerabilidad antes de que pueda evaluarse y corregirse.

---

# Desarrollo y contribuciones

Las contribuciones orientadas a mejorar la estabilidad, la accesibilidad, la usabilidad y la calidad del código son bienvenidas, sujetas a las condiciones de licencia aplicables.

## Cómo contribuir

1. Revisa la estructura y las convenciones del proyecto.
2. Identifica el problema o la mejora que deseas proponer.
3. Crea una rama para tu trabajo.
4. Implementa los cambios procurando mantener la separación de responsabilidades.
5. Ejecuta las comprobaciones disponibles.
6. Documenta cualquier modificación funcional importante.
7. Envía una propuesta de cambio para su revisión.

## Áreas de mejora

- Pruebas automatizadas para los cálculos estadísticos.
- Validación adicional de formularios.
- Mejoras de accesibilidad.
- Optimización del rendimiento.
- Manejo más robusto de errores de almacenamiento.
- Mejoras en la exportación CSV.
- Documentación técnica y ejemplos.
- Opciones adicionales de análisis comercial.

Las contribuciones no deben incluir datos personales, información comercial real ni credenciales privadas.

---

# Proyectos derivados

Los proyectos derivados pueden incluir modificaciones de la interfaz, mejoras de las estadísticas, nuevas funciones de exportación o adaptaciones a necesidades comerciales específicas.

Antes de copiar, modificar, redistribuir o integrar el proyecto en otro producto, revisa el archivo `LICENSE` y confirma qué permisos están concedidos.

La disponibilidad pública del repositorio no implica, por sí sola, autorización ilimitada para reutilizar el código, la marca, los recursos gráficos o la documentación.

---

# Atribución

Al reutilizar el proyecto de acuerdo con los permisos que establezca su licencia, conserva los avisos de autoría y las atribuciones aplicables.

**Proyecto original:** Control de ventas.

**Autoría:** SatCore Solutions.

**Repositorio:** https://github.com/satcoresolutions/satcore-control-ventas

La atribución no concede automáticamente derechos sobre marcas, logotipos, recursos gráficos u otros materiales que puedan estar sujetos a condiciones independientes.

---

# Marca y propiedad intelectual

**SatCore Solutions** y sus elementos identificativos forman parte de la identidad de marca de SatCore Solutions.

Salvo autorización expresa o los permisos concedidos por las condiciones legales aplicables, la reutilización del código no implica autorización para:

- Presentar una versión derivada como el producto oficial de SatCore Solutions.
- Utilizar el nombre o el logotipo de SatCore Solutions de manera que sugiera una afiliación inexistente.
- Eliminar avisos de autoría o de propiedad intelectual que deban conservarse.
- Afirmar que SatCore Solutions respalda, certifica o mantiene una adaptación sin autorización.

Los proyectos derivados deben identificar claramente sus modificaciones y su responsable cuando así lo exijan las condiciones de licencia.

---

# Dependencias de terceros

Control de ventas se apoya en tecnologías y herramientas de terceros, entre ellas Next.js, React, TypeScript, Node.js y npm.

Cada dependencia conserva sus propios términos de licencia y condiciones de uso.

Antes de distribuir el proyecto o una versión derivada:

- Revisa las dependencias declaradas en `package.json`.
- Consulta el archivo de bloqueo de dependencias.
- Identifica las licencias de los paquetes incluidos.
- Conserva los avisos exigidos por sus respectivas licencias.
- Evita incorporar dependencias de procedencia desconocida o innecesarias.

La lista exacta de dependencias debe verificarse contra el repositorio y no debe considerarse limitada a las tecnologías principales enumeradas en este documento.

---

# Despliegue

Control de ventas puede ejecutarse localmente o desplegarse en una plataforma compatible con aplicaciones Next.js.

## Despliegue local

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

## Despliegue en una plataforma compatible

Como procedimiento general:

1. Conecta el repositorio a la plataforma elegida.
2. Configura la versión de Node.js compatible con el proyecto.
3. Define los comandos de instalación y compilación.
4. Ejecuta la compilación de producción.
5. Verifica el funcionamiento de la aplicación publicada.
6. Comprueba el registro y la consulta de ventas.
7. Prueba los filtros, las estadísticas y la exportación CSV.

Los pasos concretos dependen de la plataforma y de la configuración real del repositorio.

## Consideraciones sobre el almacenamiento

El despliegue de la aplicación en una URL pública **no sincroniza los registros entre usuarios**. Cada navegador mantiene su propio almacenamiento local.

Si se necesita compartir información entre empleados o equipos, será necesario incorporar una arquitectura con backend, autenticación, persistencia centralizada y controles de acceso adecuados.

---

# Estado del proyecto

- **Proyecto:** Control de ventas.
- **Organización:** SatCore Solutions.
- **Repositorio:** [satcore-control-ventas](https://github.com/satcoresolutions/satcore-control-ventas).
- **Tipo:** microaplicación web.
- **Estado funcional descrito:** registro de ventas, análisis estadístico y exportación CSV con almacenamiento local.
- **Versión:** por confirmar en el repositorio.
- **Última actualización:** por confirmar.

La versión publicada y la fecha de actualización deben mantenerse sincronizadas con las entregas reales del proyecto y con su `CHANGELOG.md`.

---

# Roadmap

Las siguientes propuestas representan posibles mejoras futuras; no deben interpretarse como funcionalidades ya implementadas.

- [ ] Incorporar pruebas automatizadas para los cálculos estadísticos.
- [ ] Mejorar la validación y recuperación ante errores de almacenamiento.
- [ ] Añadir opciones adicionales de filtrado y análisis.
- [ ] Ampliar las posibilidades de exportación y respaldo.
- [ ] Mejorar la accesibilidad y la experiencia en dispositivos móviles.
- [ ] Evaluar una solución de persistencia centralizada.
- [ ] Evaluar autenticación y permisos si se incorpora un backend.
- [ ] Explorar sincronización entre dispositivos en una futura arquitectura.
- [ ] Ampliar la documentación técnica y de despliegue.

La prioridad de estas mejoras dependerá de las necesidades del proyecto y de los recursos disponibles.

---

# Licencia

El proyecto debe distribuirse conforme a las condiciones establecidas en el archivo `LICENSE` de su repositorio.

La plantilla corporativa de SatCore Solutions contempla la **SatCore Solutions Attribution License — SCSAL 1.0**.

**Antes de declarar SCSAL 1.0 como la licencia vigente**, verifica que el repositorio incluya el texto completo de esa licencia y que su aplicación a este proyecto haya sido confirmada. No debe afirmarse que una licencia está vigente únicamente porque aparezca en una insignia o en este documento.

Si el proyecto todavía no tiene una licencia definida, mantén esta sección como pendiente hasta que se establezcan y publiquen las condiciones oficiales de uso, modificación y distribución.

---

# Autoría

**SatCore Solutions**

_Software and Technology Core Solutions_

Soluciones digitales seguras, accesibles y funcionales para todos.

- **GitHub:** https://github.com/satcoresolutions
- **Repositorio del proyecto:** https://github.com/satcoresolutions/satcore-control-ventas
- **Contacto:** satcoresolutions@gmail.com

<div align="center">

Desarrollado originalmente por **SatCore Solutions**.

© SatCore Solutions — Todos los derechos reservados, excepto los derechos expresamente concedidos mediante la licencia aplicable.

</div>
