import { fireEvent, render } from '@testing-library/react';

// Components
import Sidebar from '..';

describe('Sidebar Component', () => {
  it('Match Sidebar component', () => {
    const element = render(<Sidebar />);

    expect(element).toMatchSnapshot();
  });

  it('Render SubMenu', () => {
    const { getByText } = render(<Sidebar />);

    fireEvent.click(getByText('Users'));

    expect(getByText('User List')).toBeInTheDocument();
  });
});
