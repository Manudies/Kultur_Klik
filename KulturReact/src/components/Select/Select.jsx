import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fech";

function Select({ label, type, value, onChange, opciones }) {
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
      async function loadOptions() {
        if (opciones) {
          setOptions(opciones);
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
  
          setOptions(data);
        } catch (error) {
          console.error(`Error al obtener ${type}:`, error);
        }
      }
  
      loadOptions();
    }, [type, opciones]);
  
    const getValue = (option) => {
      if (type === "municipios") return option.municipalityId;
      if (type === "provincias") return option.provinceId;
      return option.id;
    };
  
    const getKey = (option) => `${type}-${getValue(option)}`;
  
    return (
      <div>
        <label htmlFor={type}>{label}</label>
        <select id={type} name={type} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="0">Todos</option>
          {options.map((option) => (
            <option key={getKey(option)} value={getValue(option)}>
              {option.nameEs}
            </option>
          ))}
        </select>
      </div>
    );
  }
  

export default Select;
