import PropTypes from "prop-types";

function AlbumCard({ album }) {
  console.log(album);
  return (
    <div className="albumCard">
      <img src={album.photo} alt={album.titre} />
      <h3>{album.titre}</h3>

      {album?.songs.map((song, index) => (
        <p key={index}>{song}</p>
      ))}
      <h4>Released : {album?.annee}</h4>
    </div>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    photo: PropTypes.string,
    titre: PropTypes.string,
    annee: PropTypes.string,
    songs: PropTypes.array,
  }),
};

export default AlbumCard;
