import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "./header";
import ArtisteCard from "./artisteCard";

function App() {
  const [artistes, setArtistes] = useState(null);
  const artistesRef = useRef(null);
  const [artistNotFound, setArtistNotFound] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        setArtistes(artistesRef.current);
        setArtistNotFound(false);

        return;
      }
      axios
        .get(`http://localhost:5000/api/${event.target.value}`)
        .then((res) => {
          setArtistes([res.data.artiste]);
          setArtistNotFound(false);
        })
        .catch((error) => {
          console.error(error);
          setArtistes([]);
          setArtistNotFound(true);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getArtistes")
      .then((res) => {
        setArtistes(res.data.artistes);
        artistesRef.current = res.data.artistes;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="mainPage">
        <input
          className="searchArtiste"
          type="text"
          placeholder="Search For Artist By Name"
          onKeyPress={handleKeyPress}
        />

        <div className="artistesList">
          {artistes?.length > 0 ? (
            artistes
              ?.slice(0, 3)
              .map((artiste, index) => (
                <ArtisteCard key={index} artiste={artiste} />
              ))
          ) : artistNotFound ? (
            <h1> Artist not Found</h1>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
