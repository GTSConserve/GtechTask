import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM,
} from "../../Store/Action";
import CustomizationMenu from "./CustomizationMenu";
import classes from "./FoodItem.module.css";

const FoodItem = ({ data, index }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [newcartItem, setnewCartItem] = useState(null);
  const [isCustomize, setIsCustomize] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.home.cartItems);
  const handleAdd = (type, Customdata = null) => {
    let newData;
    setIsCustomize(false);
    if (!isAdd) {
      newData = {
        id: cartItem.length + 1,
        food: data.food,
        total_price:
          Customdata !== null ? Customdata.total_price : data.base_price,
        customization: Customdata,
        image: data.image,
        qty: 1,
      };
    }

    switch (type) {
      case "Add": {
        if (!isAdd) {
          dispatch(ADD_CART_ITEM(newData));
          setIsAdd(true);
        } else {
          newData = {
            ...newcartItem,
            total_price:
              (newcartItem.total_price / newcartItem.qty) *
              (newcartItem.qty + 1),
            qty: newcartItem.qty + 1,
          };

          dispatch(UPDATE_CART_ITEM(newData));
        }
        setnewCartItem(newData);

        break;
      }
      case "Sub": {
        newData = {
          ...newcartItem,
          qty: newcartItem.qty - 1,
          total_price:
            (newcartItem.total_price / newcartItem.qty) * (newcartItem.qty - 1),
        };
        if (newData.qty === 0) {
          dispatch(DELETE_CART_ITEM(newData.id));
          setIsAdd(false);
          setnewCartItem(null);
        } else {
          dispatch(UPDATE_CART_ITEM(newData));
        }
        setnewCartItem(newData);
        break;
      }
    }
  };

  return (
    <div className={classes.itemContainer}>
      {isCustomize ? (
        <CustomizationMenu
          data={data}
          handleSubmit={(data) => handleAdd("Add", data)}
          handleClose={() => setIsCustomize(!isCustomize)}
        />
      ) : null}
      <img src={data.image} />
      <div className={classes.itemDetails}>
        <div className={classes.foodInfo}>
          <p>{data.food}</p>
          <p>₹{data.base_price}</p>
        </div>
        <div className={classes.addContainer}>
          {!isAdd ? (
            <div
              className={classes.addBtn}
              onClick={() => {
                if (data.isCustomization) {
                  setIsCustomize(true);
                } else {
                  handleAdd("Add");
                }
              }}
            >
              <p>Add</p>
            </div>
          ) : (
            <div className={classes.qtyBtn}>
              <button onClick={() => handleAdd("Add")}>+</button>
              <p>{newcartItem.qty}</p>
              <button onClick={() => handleAdd("Sub")}>-</button>
            </div>
          )}
          {data.isCustomization === 1 ? <span>Customization</span> : null}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
