import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import { clearSearch, getDogByName, getDogs } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const searchResults = useSelector((state) => state.searchResults);
  const [page, setPage] = useState(0);
  const PER_PAGE = 8;

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(allDogs.length / PER_PAGE);

  // Obtener los perros de la página actual
  const dogs = searchResults.length > 0 ? searchResults : allDogs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber - 1);
  };

  const [searchString, setSearchString] = useState("");

  function handleChange(event) {
    setSearchString(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setPage(0);

    try {
      await dispatch(getDogByName(searchString));
      setSearchString("");
    } catch (error) {
      console.log("Ocurrió un error al buscar la raza", error.message);
    }
  }

  function handleClear() {
    setPage(0);
    dispatch(clearSearch());
  }

  return (
    <div className={style.home}>
      <NavBar
        onChange={handleChange}
        onSubmit={handleSubmit}
        setPage={setPage}
        value={searchString}
        onClear={handleClear}
      />
      {searchResults.length > 0 ? (
        <Cards dogs={searchResults} />
      ) : (
        <Cards dogs={dogs} />
      )}

      {/* Agregar el componente de paginación */}
      <Pagination
        currentPage={page + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
