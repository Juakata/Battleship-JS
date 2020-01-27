import './main.scss';
import gameLoop from './gameLoop';

gameLoop();

const reset = document.querySelector('.reset');

reset.addEventListener('click', () => {
  gameLoop();
}, false);
