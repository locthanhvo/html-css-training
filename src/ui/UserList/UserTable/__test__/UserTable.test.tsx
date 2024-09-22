import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserTable from '..';

import { MOCK_USERS } from '@/__mock__';

const renderSetup = () =>
  render(<UserTable limit={5} page={1} total={2} users={MOCK_USERS} />);

describe('UserTable Component', () => {
  it('should render correctly', () => {
    const { container } = renderSetup();
    expect(container).toBeInTheDocument();
  });

  it('handle onClick delete button should be called', async () => {
    const { getAllByTitle, getByText } = renderSetup();
    await userEvent.click(getAllByTitle('button-delete')[0]);

    expect(
      getByText('Are you sure you want to delete this user?'),
    ).toBeInTheDocument();
  });
});
