import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fech";

function Select({ label, type, value, onChange }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function loadOptions() {
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
    }, [type]);

    return (
        <div>
            <label htmlFor={type}>{label}</label>
            <select id={type} name={type} value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="0">Todos</option>
                {options.map((option) => (
                    <option
                        key={option.id || option.provinceId}
                        value={option.id || option.provinceId}
                    >
                        {option.nameEs}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
