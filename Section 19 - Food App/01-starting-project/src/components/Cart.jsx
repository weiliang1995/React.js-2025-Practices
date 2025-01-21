import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  function handleCheckout() {
    userProgressContext.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressContext.progress === "cart"}
      onClose={userProgressContext.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
