import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ handleLogout }) {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__image" src={avatar} alt={name} />
        <p className="sidebar__username">{name}</p>
      </div>
      <div className="sidebar__actions">
        <button className="sidebar__change-profile-data">
          Change profile data
        </button>
        <button onClick={handleLogout} className="sidebar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
