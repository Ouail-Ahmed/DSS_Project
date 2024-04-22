import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function ArtisteCard({ artiste }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked");
    navigate("/artiste", { state: artiste });
  };
  return (
    <div className="artisteCard" onClick={handleClick}>
      <img src={artiste.picture} alt={artiste.name} />
      <h3>{artiste.name}</h3>
    </div>
  );
}

ArtisteCard.propTypes = {
  artiste: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default ArtisteCard;
