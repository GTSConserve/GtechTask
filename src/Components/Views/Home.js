import { useSelector } from "react-redux";
import FoodItem from "../Comp/FoodItem";
import classes from "./Home.module.css";

const Home = () => {
  const data = useSelector((state) => state.home.foodItems);

  return (
    <div className={classes.contentContainer}>
      {data.map((ele, ind) => {
        return <FoodItem data={ele} index={ind} />;
      })}
    </div>
  );
};

export default Home;
