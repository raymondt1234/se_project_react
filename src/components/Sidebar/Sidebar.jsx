import "./Sidebar.css";
import avatarImage from "../../assets/avatar.svg";

function Sidebar () {
  return (
    <div className="sidebar">
      <img src={avatarImage} alt="Terrence Tegegne" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  )
}

export default Sidebar;