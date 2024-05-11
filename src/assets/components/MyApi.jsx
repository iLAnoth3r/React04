import { useState, useEffect } from "react";
import MountFilter from "./Buscador";
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardText from "react-bootstrap/esm/CardText";
import "./MyApi.css";

function Recoger() {
  const [info, setInfo] = useState([]);
  const [filteredMounts, setFilteredMounts] = useState([]);
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    recogerInfo();
  }, []);

  const recogerInfo = async () => {
    const url = "https://ffxivcollect.com/api/mounts";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setInfo(data.results);
      setFilteredMounts(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = ({ name, id }) => {
    const filteredMounts = info.filter(
      (mount) =>
        mount.name.toLowerCase().includes(name.toLowerCase()) &&
        String(mount.id).includes(id)
    );
    setFilteredMounts(filteredMounts);
  };

  const handleSortChange = (direction) => {
    const sortedMounts = [...filteredMounts];
    if (direction === "asc") {
      sortedMounts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (direction === "desc") {
      sortedMounts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (direction === "asc_id") {
      sortedMounts.sort((a, b) => a.id - b.id);
    } else if (direction === "desc_id") {
      sortedMounts.sort((a, b) => b.id - a.id);
    }
    setSortDirection(direction);
    setFilteredMounts(sortedMounts);
  };

  return (
    <div className="container">
      <MountFilter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      {filteredMounts.map((mount, index) => (
        <div className="cajas" key={index}>
          <Card border="success" style={{ width: "14rem" }}>
            <CardImg
              variant="top"
              src={mount.image}
              alt={mount.name}
              style={{ width: "14rem" }}
            />
            <Card.Body>
              <CardTitle>
                {mount.name} ID#{mount.id}
              </CardTitle>
              <CardText>{mount.description}</CardText>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Recoger;
