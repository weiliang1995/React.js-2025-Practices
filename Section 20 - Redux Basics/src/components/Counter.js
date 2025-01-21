import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store/counter-slice";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();

  const buttonHandler = (fnc) => {
    dispatch(fnc);
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={show ? classes.value : classes.invi}>{counter}</div>
      <div>
        <button onClick={() => buttonHandler(counterActions.increment(1))}>
          Increment
        </button>
        <button onClick={() => buttonHandler(counterActions.reset())}>
          Reset
        </button>
        <button onClick={() => buttonHandler(counterActions.decrement(1))}>
          Decrement
        </button>
      </div>
      <button onClick={() => buttonHandler(counterActions.toggle())}>
        Toggle Counter
      </button>
    </main>
  );
};

export default Counter;
