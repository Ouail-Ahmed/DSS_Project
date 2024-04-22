import PropTypes from "prop-types";

function AlbumCard({ album }) {
  return (
    <div className="albumCard">
      <img src={album.image} alt={album.title} />
      <h3>{album.title}</h3>

      {album?.songs.map((song, index) => (
        <p key={index}>{song}</p>
      ))}
      <h4>Released : {album?.releaseYear}</h4>
    </div>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    releaseYear: PropTypes.string,
    songs: PropTypes.array,
  }),
};

export default AlbumCard;
