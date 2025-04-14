import React from "react";
import "./pagination.css";

const Pagination = ({ page, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="pagination">
      {page > 1 && (
        <button onClick={handlePreviousPage} className="boton">
          ◀ Página anterior
        </button>
      )}
      <span style={{ margin: "0 1rem" }}>Página {page}</span>
      <button onClick={handleNextPage} className="boton">
        Página siguiente ▶
      </button>
    </div>
  );
};

export default Pagination;
