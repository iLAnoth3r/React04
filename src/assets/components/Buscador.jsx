import { useState, useEffect } from "react";

function MountFilter({ onFilterChange, onSortChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleNameFilterChange = (event) => {
    const value = event.target.value;
    setNameFilter(value);
    onFilterChange({ name: value, id: idFilter });
  };

  const handleIdFilterChange = (event) => {
    const value = event.target.value;
    setIdFilter(value);
    onFilterChange({ name: nameFilter, id: value });
  };

  const handleSortChange = () => {
    const nextDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(nextDirection);
    onSortChange(nextDirection);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <input
        type="text"
        placeholder="Filtrar por ID"
        value={idFilter}
        onChange={handleIdFilterChange}
      />
      <button onClick={handleSortChange}>
        {sortDirection === "asc" ? "Orden Z-A" : "Orden A-Z"}
      </button>
    </div>
  );
}
export default MountFilter;
