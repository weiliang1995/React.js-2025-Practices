import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                total: item.totalPrice,
              }}
            />
          ))}
        </ul>
        {cartItems.length > 0 && (
        <p className={classes.clearbutton}>  
          <button
            onClick={() => dispatch(cartActions.clearCart())}
          >
            Clear
          </button>
        </p>)}
      </Card>
    </>
  );
};

export default Cart;
