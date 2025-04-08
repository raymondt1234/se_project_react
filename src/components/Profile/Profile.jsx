import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile ({onCardClick, clothingItems}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems}/>
      </section>
    </div>
  )
}

export default Profile;