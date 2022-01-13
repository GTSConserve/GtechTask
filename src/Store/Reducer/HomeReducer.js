const intialState = {
  foodItems: [
    {
      id: 1,
      food: "Bucket Chicken",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
      addOn: [
        { id: 11, name: "small", price: 120 },
        { id: 12, name: "large", price: 150 },
      ],
      customization: [
        { id: 111, name: "pepper", price: 40 },
        { id: 222, name: "onion", price: 50 },
      ],
      isCustomization: 1,
      base_price: 120,
    },
    {
      id: 2,
      food: "Pizza",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
      addOn: [],
      customization: [],
      isCustomization: 0,
      base_price: 150,
    },
  ],
  cartItems: [],
};

const Addcart = (state, action) => {
  return {
    ...state,
    cartItems: [...state.cartItems, action.data],
  };
};

const UpdateCart = (state, action) => {
  const cartItem = state.cartItems;
  const updateItem = cartItem.map((ele) => {
    if (ele.id === action.data.id) {
      return action.data;
    } else {
      return ele;
    }
  });

  return {
    ...state,
    cartItems: updateItem,
  };
};

const DeleteCart = (state, action) => {
  const filterCart = state.cartItems.filter((ele) => ele.id !== action.id);
  return {
    ...state,
    cartItems: [...filterCart],
  };
};

export default function (state = intialState, action) {
  switch (action.type) {
    case "ADDCART": {
      return Addcart(state, action);
    }
    case "UPDATECART": {
      return UpdateCart(state, action);
    }
    case "DELETECART": {
      return DeleteCart(state, action);
    }
    default:
      return state;
  }
}
