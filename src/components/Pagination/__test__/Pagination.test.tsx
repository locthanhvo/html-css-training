import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Pagination from '..';

const onPageChangeMock = jest.fn();
const onClickPageMock = jest.fn();

describe('Pagination render', () => {
  it('Should match snapshot.', () => {
    const { container } = render(
      <Pagination
        pageSize={10}
        currentPage={1}
        isDisableNext={true}
        isDisabledPrev={true}
        arrOfCurrButtons={[1]}
        onClickPage={onClickPageMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Handle click page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={10} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle next page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={8} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle prev page', async () => {
    const { getByTestId } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />,
    );

    const nextPage = getByTestId('prev-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });
});
