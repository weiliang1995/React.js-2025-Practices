import { Component} from 'react';
import { connect } from 'react-redux';
import classes from "./Counter.module.css";

class Counter extends Component{

  buttonHandler(type) {
    if (type === 'increment') {
      this.props.increment();
    }
    if (type === 'decrement') {
      this.props.decrement();
    }
    if (type === 'reset') {
      this.props.reset();
    }
  } 

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <button onClick={() => this.buttonHandler("increment")}>
          Increment
        </button>
        <button onClick={() => this.buttonHandler("reset")}>
          Reset
        </button>
        <button onClick={() => this.buttonHandler("decrement")}>
          Decrement
        </button>
      </main>
    );
  }
}

const mapStateToProps = state=> {
  return {
    counter: state.counter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({type: 'increment'}),
    decrement: () => dispatch({type: 'decrement'}),
    reset: () => dispatch({type: 'reset'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);