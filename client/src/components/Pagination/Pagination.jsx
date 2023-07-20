import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calcula los números de página a mostrar en la paginación
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageRange = 2; // Número de botones a mostrar a cada lado de la página actual

    for (let i = currentPage - pageRange; i <= currentPage + pageRange; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={style.pag}>
      {/* Botón "Anterior" */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#9664;
      </button>

      {/* Números de página */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      {/* Botón "Siguiente" */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Pagination;

