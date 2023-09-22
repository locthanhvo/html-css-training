import { TOGGLE_STYLE } from '../constants';
import { querySelector } from './doms';

export const handleToggleLoading = (status) => {
  const mainElement = querySelector('.main-content');
  const toggle = querySelector('.toggle', mainElement);
  toggle.style.display = status ? TOGGLE_STYLE.FLEX : TOGGLE_STYLE.NONE;
};
