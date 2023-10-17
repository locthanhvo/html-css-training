import { ToggleStyle } from '@/constants';
import { querySelector } from '@/helpers';

export const handleToggleLoading = (status: boolean) => {
  const mainElement = querySelector<HTMLDivElement>('.main-content');
  const toggle = querySelector<HTMLDivElement>('.toggle', mainElement);
  toggle.style.display = status ? ToggleStyle.Flex : ToggleStyle.None;
};
