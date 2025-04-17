import './App.css';
import { useCounterStore } from './model/counterStore';

function App() {
  const { counter, decrement, increment } = useCounterStore();
  return (
    <div className='wrapper'>
      <span>{counter}</span>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}

export default App
