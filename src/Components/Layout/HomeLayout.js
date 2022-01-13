import { Outlet } from "react-router-dom";
import Header from "../Header";
import classes from "./layoutstyle.module.css";

const HomeLayout = (props) => {
  return (
    <div>
      <Header />
      <div className={classes.bodyContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
