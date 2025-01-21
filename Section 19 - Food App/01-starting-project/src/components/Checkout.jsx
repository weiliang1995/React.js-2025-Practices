import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "../components/UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  
  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  function handleFinish() {
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }
  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button
        type="button"
        textOnly
        onClick={() => userProgressContext.hideCheckout()}
      >
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      onClose={userProgressContext.progress === "checkout" ? handleClose : null}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
