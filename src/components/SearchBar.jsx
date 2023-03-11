import { useState } from "react";

function SearchBar(props) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  return (
    <div>
      <select
        name="category"
        id="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          props.setCategoryToSearch(e.target.value)
        }}
      >
        <option value="">Todas las categorías</option>
        <option value="Videojuegos">Videojuegos</option>
        <option value="Telefonía">Telefonía</option>
        <option value="Informática">Informática</option>
        <option value="Imagen y Sonido">Imagen y Sonido</option>
        <option value="Productos del hogar">Productos del hogar</option>
        <option value="Deportes">Deportes</option>
        <option value="Motor">Motor</option>
        <option value="Libros">Libros</option>
      </select>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          props.setValueToSearch(e.target.value)
        } }
      />
    </div>
  );
}

export default SearchBar;
