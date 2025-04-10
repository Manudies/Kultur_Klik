import { fetchData } from "./fech.js";

// Función para formatear una fecha (usa la proporcionada o la actual)
function formatDate(fechaISO) {
  const date = fechaISO ? new Date(fechaISO) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return { year, month, day };
}

// Función auxiliar para extraer el valor de la categoría
function getCategoryValue(category) {
  if (!category || category === "0") return null;
  if (typeof category === "object") {
    // Ajusta la propiedad según la estructura de tu objeto (por ejemplo, "id" o "value")
    return category.id || category.value || null;
  }
  return category;
}

// Definimos el endpoint base de la API
const baseUrl = "https://api.euskadi.eus/culture/events/v1.0/events";

async function getFilteredEvents({
  category = "0",
  province = "0",
  municipality = "0",
  date = null,
  monthOnly = null,
  page = 1,
  setFallbackUsed = null,
} = {}) {
  // Priorizar monthOnly sobre date
  let year, month, day;
  const hasMonthOnly = Boolean(monthOnly && monthOnly.trim());
  const hasDate = Boolean(date && date.trim());

  if (hasMonthOnly) {
    // Se asume el formato "YYYY-MM"
    const parts = monthOnly.split("-");
    year = parts[0];
    month = parts[1];
    day = ""; // No usamos día al buscar por mes completo
  } else if (hasDate) {
    ({ year, month, day } = formatDate(date));
  } else {
    ({ year, month, day } = formatDate());
  }

  // Flags para filtros adicionales
  const noCategory = category === "0";
  const noProvince = province === "0";
  const noMunicipality = municipality === "0";

  let url = "";

  // Caso 1: Sin filtros adicionales (ni categoría, ni provincia, ni municipio)
  if (noCategory && noProvince && noMunicipality) {
    url = `${baseUrl}/byMonth/${year}/${month}?_elements=20&_page=${page}`;
  }
  // Caso 2: Filtro único de provincia (sin categoría ni municipio)
  else if (noCategory && !noProvince && noMunicipality) {
    url = `${baseUrl}/byMonth/${year}/${month}/byProvince/${province}?_elements=20&_page=${page}`;
  }
  // Caso 3: Filtros combinados (por ejemplo, con categoría y/o municipio y con provincia)
  else {
    const params = new URLSearchParams({
      _elements: 20,
      _page: page,
      year: year,
      month: month,
    });
    // Si se está usando date (pero no monthOnly), se puede agregar el día
    if (hasDate && !hasMonthOnly) params.append("day", day);
    const catValue = getCategoryValue(category);
    if (catValue) params.append("type", catValue);
    if (!noProvince) params.append("provinceNoraCode", province);
    if (!noMunicipality) params.append("municipalityNoraCode", municipality);
    url = `${baseUrl}?${params.toString()}`;
  }

  console.log("🛰️ Endpoint construido:", url);
  console.log("Filtros aplicados:", { category, province, municipality, monthOnly, page });

  try {
    const data = await fetchData(url);
    if (data && data.items && data.items.length > 0) {
      return data.items;
    }
    // Si no se obtienen items, forzamos el error para pasar al fallback.
    throw new Error("No se encontraron eventos");
  } catch (error) {
    console.warn("⚠️ Error al obtener eventos:", error);
    // Fallback: mantener el fallback en el día actual
    if (setFallbackUsed) setFallbackUsed(true);
    const currentDate = formatDate(); // Formatea la fecha actual
    const fallbackUrl = `${baseUrl}/byDate/${currentDate.year}/${currentDate.month}/${currentDate.day}?_elements=20&_page=${page}`;
    console.log("🛰️ Fallback endpoint:", fallbackUrl);
    const fallbackData = await fetchData(fallbackUrl);
    return (fallbackData && fallbackData.items) ? fallbackData.items : [];
  }
}

export { getFilteredEvents };
