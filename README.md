# 🗓️ React Eventos Euskadi

Aplicación desarrollada en **React** que consume la API de eventos culturales del Gobierno Vasco. Permite **filtrar eventos** por categoría y provincia, **marcar favoritos**, y acceder a más información sobre cada evento.

---

## 🚀 Tecnologías utilizadas

- [React](https://reactjs.org/)
- JavaScript (ES6+)
- CSS
- API pública de Euskadi: [`https://api.euskadi.eus`](https://api.euskadi.eus/culture/events/v1.0/)
- LocalStorage para persistencia de favoritos

---

## 📦 Instalación

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/react-eventos-euskadi.git
cd react-eventos-euskadi

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

---

## 🧠 Estructura del proyecto
```bash
Copiar
Editar
src/
├── components/
│   ├── Navbar/         # Filtros y favoritos
│   ├── Select/         # Componente select reutilizable
│   ├── EventList/      # Lista de eventos
│   ├── Event/          # Vista de un evento individual
│   ├── Footer/         # Footer de nuestra web
│   └── button/         # Botón personalizado
├── utils/ 
│   ├── eventos.js      # Función filtrar eventos
│   └── fetch.js        # Función personalizada para obtener datos de la API
├── App.jsx             # Componente principal
├── App.css             # Estilos globales
└── main.jsx            # Punto de entrada de React
```

---

## 🧩 Componentes principales

### `App.jsx`
- Controla el estado global: eventos, favoritos, filtros.
- Carga los eventos desde la API.
- Decide si mostrar favoritos o la lista filtrada.

### `Navbar.jsx`
- Contiene los selects de **categoría** y **provincia**.
- Botón para aplicar filtros.
- Botón para alternar entre favoritos y eventos generales.

### `Select.jsx`
- Componente reutilizable para desplegables.
- Carga dinámicamente **categorías** o **provincias** desde la API según el `type`.

### `EventList.jsx`
- Renderiza todos los eventos en forma de lista.
- Si no hay eventos, muestra un mensaje de carga o aviso.

### `Event.jsx`
- Muestra los datos de un evento: nombre, fecha, imagen, provincia.
- Botón para marcar como favorito ❤️ o quitarlo.
- Botón “Más Info” que abre la página oficial en una nueva pestaña.

### `Button.jsx`
- Componente de botón reutilizable con props `label`, `clase` y `onClick`.

---

## ❤️ Favoritos

Los eventos marcados como favoritos se guardan en **localStorage** del navegador.  
Así, aunque cierres la página, se mantienen al volver.

---

## 📸 Captura de pantalla (opcional)


<--[Vista de la aplicación](./KulturReact/public/Captura%20desde%202025-03-27%2010-45-28.png) -->

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y compartirlo libremente.

---

## ✍️ Autor

Desarrollado por Manudies  
📫 [manudies@gmail.com / https://github.com/Manudies]

---