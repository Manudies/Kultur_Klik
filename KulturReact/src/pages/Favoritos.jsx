import EventList from "../components/EventList/EventList";
import { useEffect, useState } from "react";

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (evento) => {
    const updated = favorites.filter((fav) => fav.id !== evento.id);
    setFavorites(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold my-4">Tus favoritos</h2>
      <EventList
        eventos={favorites}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
        showingFavorites={true}
        page={1}
      />
    </div>
  );
};

export default Favoritos;
