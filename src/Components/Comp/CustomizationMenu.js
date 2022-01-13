import { useState } from "react";
import classes from "./customize.module.css";

const CustomizationMenu = ({ data, handleSubmit, handleClose }) => {
  const [newCustomizedata, setCustomizeData] = useState({
    size: null,
    addOn: [],
    total_price: 0,
  });

  const handleSize = (ele) => {
    if (newCustomizedata?.size !== null) {
      setCustomizeData({
        ...newCustomizedata,
        size: ele,
        total_price:
          newCustomizedata.total_price +
          ele.price -
          newCustomizedata?.size?.price,
      });
    } else {
      setCustomizeData({
        ...newCustomizedata,
        size: ele,
        total_price: newCustomizedata.total_price + ele.price,
      });
    }
  };

  const handleAddOn = (data) => {
    const tempAddon = [...newCustomizedata.addOn].findIndex(
      (ele) => ele.id === data.id
    );

    console.log(tempAddon);
    if (tempAddon === -1 || tempAddon === undefined) {
      setCustomizeData({
        ...newCustomizedata,
        addOn: [data, ...newCustomizedata.addOn],
        total_price: newCustomizedata.total_price + data.price,
      });
    } else {
      const filteredAddon = [...newCustomizedata.addOn].filter(
        (ele) => ele.id !== data.id
      );
      setCustomizeData({
        ...newCustomizedata,
        addOn: [...filteredAddon],
        total_price: newCustomizedata.total_price - data.price,
      });
    }
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.contentContainer}>
        <p className={classes.headerText}>Choose</p>

        <p>Size</p>
        {data.addOn.map((ele) => {
          return (
            <div>
              <input
                type={"radio"}
                value={ele.id}
                name="fav_item"
                onChange={() => handleSize(ele)}
              />
              <label>
                {ele.name}(₹{ele.price})
              </label>
            </div>
          );
        })}
        <p>Add On</p>
        {data.customization.map((ele) => {
          return (
            <div>
              <input
                type={"checkbox"}
                value={"sad"}
                onChange={() => handleAddOn(ele)}
              />{" "}
              <label>
                {ele.name}(₹{ele.price})
              </label>
            </div>
          );
        })}
        <div className={classes.subBtn}>
          <button
            title="Apply"
            onClick={() => {
              if (newCustomizedata.total_price !== 0) {
                handleSubmit(newCustomizedata);
              }
            }}
          >
            Apply
          </button>
          <button
            title="Apply"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationMenu;
