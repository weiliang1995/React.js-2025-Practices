import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = async (cart, dispatch) => {
  dispatch(
    uiActions.showNotification({
      status: "pending",
      title: "Sending...",
      message: "Sending cart data.",
    })
  );

  try {
    const response = await fetch(
      "https://dummy-29e97-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify({
          totalQuantity: cart.totalQuantity,
          items: cart.items,
          title: cart.title,
          price: cart.price,
          quantity: cart.quantity,
          totalPrice: cart.totalPrice,
      }),
      }
    );

    if (!response.ok) {
      throw new Error("Sending cart data failed.");
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully.",
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed.",
      })
    );
  }
};

const fetchData = async () => {
  const response = await fetch(
    "https://dummy-29e97-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
  );

  if (!response.ok) {
    throw new Error("Could not fetch cart data!");
  }

  const data = await response.json();

  return data;
};

export const fetchCartData = async (dispatch) => {
  try {
    const cartData = await fetchData();
    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Fetching cart data failed!",
      })
    );
  }
};
