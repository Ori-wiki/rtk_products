import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import { decrementBy, getCount, incrementBy } from '../store/counter';

export const Counter = () => {
  const count = useAppSelector(getCount);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(incrementBy(3));
  };

  const handleDecrement = () => {
    dispatch(decrementBy(2));
  };
  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>Count: {count}</h1>
      <div className='card'>
        <button onClick={handleIncrement}>Увеличить 3</button>
        <button onClick={handleDecrement}>Уменьшить 2</button>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
