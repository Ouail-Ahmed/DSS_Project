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
      <img src={artiste.image} alt={artiste.name} />
      <h3>{artiste.name}</h3>
    </div>
  );
}

ArtisteCard.propTypes = {
  artiste: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default ArtisteCard;
