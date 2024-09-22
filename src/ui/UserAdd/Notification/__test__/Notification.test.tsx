import { fireEvent, render } from '@testing-library/react';

import { MultiFormProvider } from '@/context';

import Notification from '..';
import { MOCK_USER_DETAIL } from '@/__mock__';
import { IUserModel } from '@/types';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({ replace: jest.fn() }),
}));

const renderSetup = () =>
  render(
    <MultiFormProvider>
      <Notification initialValues={MOCK_USER_DETAIL as IUserModel} />
    </MultiFormProvider>,
  );

describe('Notification Component', () => {
  it('should render correctly', () => {
    const { container } = renderSetup();
    expect(container).toBeInTheDocument();
  });

  it('handle submit event', () => {
    const { getAllByTitle, getByRole } = renderSetup();

    const checkboxOne = getAllByTitle('switch')[0];
    const checkboxFive = getAllByTitle('switch')[4];

    const buttonUpdate = getByRole('button', { name: 'Update User' });

    fireEvent.click(checkboxOne);
    fireEvent.click(checkboxFive);

    fireEvent.click(buttonUpdate);

    expect(checkboxOne).toBeChecked();
    expect(checkboxFive).toBeChecked();

    expect(buttonUpdate).toBeEnabled();
  });
});
