export const ADD_CART_ITEM = (data) => {
  return {
    type: "ADDCART",
    data: data,
  };
};

export const UPDATE_CART_ITEM = (data) => {
  return {
    type: "UPDATECART",
    data: data,
  };
};

export const DELETE_CART_ITEM = (id) => {
  return {
    type: "DELETECART",
    id: id,
  };
};
