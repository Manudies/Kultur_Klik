import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchData } from "../../utils/fech";
import "./Select.css";

function MySelect({ label, type, value, onChange, opciones }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function loadOptions() {
      // Si se pasan opciones a través de la prop, las formateamos y retornamos.
      if (opciones && opciones.length > 0) {
        const opts = opciones.map((item) => {
          let val;
          if (type === "municipios") {
            val = item.municipalityId;
          } else if (type === "provincias") {
            val = item.provinceId;
          } else {
            val = item.id;
          }
          return { value: String(val), label: item.nameEs };
        });
        setOptions(opts);
        return;
      }

      try {
        let data = [];
        if (type === "categorias") {
          data = await fetchData("https://api.euskadi.eus/culture/events/v1.0/eventType");
        } else if (type === "provincias") {
          const res = await fetchData("https://api.euskadi.eus/culture/events/v1.0/provinces");
          data = res.items;
        }
        // Para municipios normalmente se reciben mediante la prop "opciones", pero puedes ajustarlo según tu lógica.
        const opts = data.map((item) => {
          let val;
          if (type === "municipios") {
            val = item.municipalityId;
          } else if (type === "provincias") {
            val = item.provinceId;
          } else {
            val = item.id;
          }
          return { value: String(val), label: item.nameEs };
        });
        setOptions(opts);
      } catch (error) {
        console.error(`Error al obtener ${type}:`, error);
      }
    }
    loadOptions();
  }, [type, opciones]);

  // Opción por defecto "Todos"
  const defaultOption = { value: "0", label: "Todos" };
  // React Select espera que el value sea el objeto opción, por lo que buscamos el objeto seleccionado
  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || defaultOption;

  // Manejador onChange: React Select retorna el objeto seleccionado.
  const handleChange = (selected) => {
    onChange(selected ? selected.value : "0");
  };

  // Si deseas forzar un ancho de 217px en el control y en el menú, puedes definir customStyles:
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 217,
    }),
    menu: (provided) => ({
      ...provided,
      width: 217,
    }),
    option: (provided) => ({
      ...provided,
      width: 217,
      color: "black",
    })
  };

  return (
    <div className="select-label-container">
      <label htmlFor={type}>{label}</label>
      <Select
        inputId={type}
        name={type}
        value={selectedOption}
        onChange={handleChange}
        // Agregamos la opción por defecto al inicio de la lista
        options={[defaultOption, ...options]}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}

export default MySelect;
