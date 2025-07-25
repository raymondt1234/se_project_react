import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  onEditProfileClick,
  clothingItems,
  handleAddClick,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          onEditProfileClick={onEditProfileClick}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
