/**
 * Configuración central de SEO.
 * Define NEXT_PUBLIC_SITE_URL en producción.
 */
export const SITE = {
  name: "Control de ventas",
  brand: "SatCore Solutions",

  description:
    "Registra y administra las ventas de tu negocio desde una sola aplicación. Consulta ingresos por periodos, identifica los productos más vendidos, analiza los medios de pago y las estadísticas de ventas, y exporta tus registros a CSV.",

  shortDescription:
    "Registra tus ventas, consulta tus ingresos, analiza tus productos más vendidos y exporta tus registros.",

  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/+$/, ""),

  locale: "es_CO",
  language: "es-CO",
  themeColor: "#132A8E",

  keywords: [
    "control de ventas",
    "registro de ventas",
    "gestión de ventas para negocios",
    "control de ventas diarias",
    "registro de productos vendidos",
    "seguimiento de ingresos por ventas",
    "estadísticas de ventas",
    "análisis de ventas por periodo",
    "productos más vendidos",
    "control de medios de pago",
    "historial de ventas",
    "ticket promedio",
    "resumen de ventas",
    "aplicación para gestionar ventas",
    "herramienta de ventas para pequeños negocios",
    "exportar ventas a CSV",
    "control de ventas para emprendedores",
    "SatCore Solutions",
  ],
} as const;

/**
 * Convierte una ruta relativa en una URL absoluta.
 */
export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;