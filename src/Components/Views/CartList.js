import { useDispatch, useSelector } from "react-redux";
import { DELETE_CART_ITEM, UPDATE_CART_ITEM } from "../../Store/Action";
import classes from "./Home.module.css";

const CartList = () => {
  const cartItems = useSelector((state) => state.home.cartItems);
  const dispatch = useDispatch();
  const handleQty = (type, data) => {
    let updateddata;
    let price;
    switch (type) {
      case "Add": {
        price = (data.total_price / data.qty) * (data.qty + 1);
        updateddata = { ...data, qty: data.qty + 1, total_price: price };
        break;
      }
      case "Sub": {
        price = (data.total_price / data.qty) * (data.qty - 1);
        updateddata = { ...data, qty: data.qty - 1, total_price: price };
        break;
      }
      default: {
        break;
      }
    }
    if (updateddata.qty !== 0) {
      dispatch(UPDATE_CART_ITEM(updateddata));
    } else {
      dispatch(DELETE_CART_ITEM(updateddata.id));
    }
  };

  return (
    <div>
      <p className={classes.headerTitle}>Cart Items</p>

      {cartItems.map((ele) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={ele.image}
              style={{ width: "80px", height: "80px", margin: "10px" }}
            />
            <div style={{ margin: "5px", flex: 1 }}>
              <p>{ele.food}</p>
              {ele.customization ? (
                <p>Size:{ele?.customization?.size?.name}</p>
              ) : null}

              {ele?.customization ? (
                <p>
                  Add On:
                  {ele.customization?.addOn.map((ele) => ele.name).join(", ")}
                </p>
              ) : null}
              <p>Qty: {ele.qty}</p>
              <p>Total Price: {ele.total_price}</p>
            </div>
            <div className={classes.qtyBtn}>
              <button onClick={() => handleQty("Add", ele)}>+</button>
              <p>{ele.qty}</p>
              <button onClick={() => handleQty("Sub", ele)}>-</button>
            </div>
          </div>
        );
      })}

      {cartItems.length === 0 ? (
        <p className={classes.nodata}>No cart items found</p>
      ) : null}
    </div>
  );
};

export default CartList;
