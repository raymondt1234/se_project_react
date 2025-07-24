import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const { _id } = useContext(CurrentUserContext);
  const usersClothingItems = clothingItems.filter((item) => _id === item.owner);
  return (
    <div className="clothes-section">
      <div className="clothes-section__add-btn-section">
        <p className="clothes-section__items-heading">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {usersClothingItems.map((item) => {
          return (
            <li key={item._id}>
              <ItemCard item={item} onCardClick={onCardClick} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
