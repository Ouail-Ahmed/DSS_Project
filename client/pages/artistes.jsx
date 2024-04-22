import Header from "../src/header";

import PropTypes from "prop-types";
import AlbumCard from "../src/albumCard";
import { useLocation } from "react-router-dom";

const Artiste = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <Header />
      {location && (
        <div className="artistePage">
          <img
            className="artisteImage"
            src={location.state.picture}
            alt={location.state.name}
          />

          <h1 className="artisteName">{location.state.name}</h1>
          <p className="artisteBio">{location.state?.biographie}</p>

          <h3 className="artisteCity">Artiste City: {location.state?.ville}</h3>
          <a href={location.state?.site} className="artisteWebsite">
            WebSite:
            <h3> {location.state?.site} </h3>
          </a>
          <h2>ALBUMS :</h2>
          <div className="artisteAlbums">
            {location.state?.albums.map((album, index) => (
              <AlbumCard key={index} album={album} />
            ))}
          </div>
        </div>
      )}
      {!location && <p>Artiste not found.</p>}
    </>
  );
};

Artiste.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
export default Artiste;
