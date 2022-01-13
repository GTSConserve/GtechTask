import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./headerstyle.module.css";

const Header = () => {
  const cartItem = useSelector((state) => state.home.cartItems);
  const navigate = useNavigate();
  return (
    <div className={classes.headerContainer}>
      <img
        src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
        className={classes.logo}
        onClick={() => navigate("/")}
      />
      <div className={classes.menu}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
          onClick={() => navigate("/cart")}
        />
        <img src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png" />
        <div className={classes.badge}>{cartItem.length}</div>
      </div>
    </div>
  );
};

export default Header;
