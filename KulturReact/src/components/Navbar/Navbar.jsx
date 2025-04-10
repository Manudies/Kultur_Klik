import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fech";
import Select from "../Select/Select.jsx";
import Button from "../button/Button.jsx";
import "./Navbar.css";

function Navbar({ onFilter, onToggleFavorites, showingFavorites }) {
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(false);

  // Usamos "0" para indicar que no hay filtro seleccionado
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [selectedProvince, setSelectedProvince] = useState("0");
  const [selectedMunicipality, setSelectedMunicipality] = useState("0");

  // Ahora, en lugar de una fecha concreta, capturamos un mes en formato YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState("");

  // Cargar municipios según la provincia seleccionada
  async function fetchMunicipalities(provinceId) {
    const allMunicipalities = [];
    let currentPage = 1;
    let totalPages = 1;

    setLoadingMunicipalities(true);

    try {
      while (currentPage <= totalPages) {
        const url = `https://api.euskadi.eus/culture/events/v1.0/municipalities/byProvince/${provinceId}?_elements=20&_page=${currentPage}&provinceId=${provinceId}`;
        const data = await fetchData(url);

        if (data && data.items) {
          allMunicipalities.push(...data.items);
          totalPages = data.totalPages || 1;
          currentPage++;
        } else {
          break;
        }
      }

      setMunicipalities(allMunicipalities);
    } catch (error) {
      console.error("Error al obtener municipios:", error);
    } finally {
      setLoadingMunicipalities(false);
    }
  }

  // Cargar categorías
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/eventType");
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    }
    fetchCategories();
  }, []);

  // Cargar provincias
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/provinces");
        setProvinces(data.items);
      } catch (error) {
        console.error("Error al obtener las provincias:", error);
      }
    }
    fetchProvinces();
  }, []);

  // Actualizar municipios cuando se cambia la provincia
  useEffect(() => {
    if (selectedProvince === "0") {
      setMunicipalities([]);
      return;
    }
    fetchMunicipalities(selectedProvince);
  }, [selectedProvince]);

  return (
    <nav>
      <div className="navbar-brand">
        <h1 className="logo2">🌄 Kultur Klik</h1>
      </div>

      <Select
        label="Categoría:"
        type="categorias"
        value={selectedCategory}
        onChange={(value) => {
          console.log("selectedCategory:", value);
          setSelectedCategory(value);
        }}
      />

      <Select
        label="Provincia:"
        type="provincias"
        value={selectedProvince}
        onChange={(value) => {
          console.log("selectedProvince:", value);
          setSelectedProvince(value);
        }}
      />

      {selectedProvince !== "0" && (
        <Select
          label="Municipio:"
          type="municipios"
          value={selectedMunicipality}
          onChange={(value) => {
            console.log("selectedMunicipality:", value);
            setSelectedMunicipality(value);
          }}
          opciones={
            loadingMunicipalities
              ? [{ municipalityId: "-1", nameEs: "Cargando municipios..." }]
              : municipalities
          }
        />
      )}

      {/* Se reemplaza el input type="date" por un input type="month" */}
      <div className="filtro-mes">
        <label htmlFor="mes">Mes:</label>
        <input
          type="month"
          id="mes"
          value={selectedMonth}
          onChange={(e) => {
            console.log("Valor capturado (mes):", e.target.value);
            setSelectedMonth(e.target.value);
          }}
        />
      </div>

      <Button
        label="Filtrar"
        onClick={() => {
          console.log("Filtrando con los siguientes valores:");
          console.log("Categoría:", selectedCategory);
          console.log("Provincia:", selectedProvince);
          console.log("Municipio:", selectedMunicipality);
          console.log("Mes:", selectedMonth);
          console.log("Página:", 1);
          // Se llama a onFilter con argumentos posicionales:
          // 1. selectedCategory  
          // 2. selectedProvince  
          // 3. null (porque ya no usamos una fecha concreta)  
          // 4. selectedMunicipality  
          // 5. selectedMonth (como monthOnly)
          onFilter(selectedCategory, selectedProvince, null, selectedMunicipality, selectedMonth);
        }}
      />

      <Button
        label={showingFavorites ? "Eventos" : "Favoritos"}
        clase="boton"
        onClick={onToggleFavorites}
      />
    </nav>
  );
}

export default Navbar;
