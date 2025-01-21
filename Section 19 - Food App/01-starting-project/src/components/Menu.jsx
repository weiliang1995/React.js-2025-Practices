import useHttp from "../hooks/useHttp.js";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Menu() {
  const {
    data: loadedMenu,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  const cartContext = useContext(CartContext);

  function handleAddMealToCart(meal) {
    cartContext.addItem(meal);
  }

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error}></Error>
  }
  return (
    <ul id="meals">
      {loadedMenu.map((meal) => (
        <li className="meal-item" key={meal.id}>
          <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-item-price">
                {currencyFormatter.format(meal.price)}
              </p>
              <p className="meal-item-description">{meal.description}</p>
            </div>
            <p id="meal-item-actions">
              <Button onClick={() => handleAddMealToCart(meal)}>
                Add to Cart
              </Button>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
