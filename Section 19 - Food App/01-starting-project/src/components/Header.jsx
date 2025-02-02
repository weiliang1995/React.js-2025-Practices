import { useContext } from 'react';

import picture from '/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
  const cartContext = useContext(CartContext);
  
  const userProgressContext = useContext(UserProgressContext);

  const totalCartItems = cartContext.items.reduce((total, item)=>{
    return total + item.quantity;
  },0);

  function handleShowCart() {
    userProgressContext.showCart();
  }

  return <header id="main-header">
    <div id="title">
      <img src={picture} alt="Logo"/>
      <h1>ReactFood</h1>
    </div>
    <nav>
      <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
    </nav>
  </header>;
}
