import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ isLoggedIn, item, onCardClick, onCardLike }) {
  const { _id } = useContext(CurrentUserContext);
  let isLiked = item.likes.some((like) => like === _id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = () => {
    onCardLike(item, isLiked);
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
        <button
          className={`card__like-btn ${isLiked ? "card__liked" : ""}`}
          onClick={handleCardLike}
        ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
