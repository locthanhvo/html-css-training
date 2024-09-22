import { render } from '@testing-library/react';

// Components
import Status from '..';

describe('Status component', () => {
  it('renders the Status with type online', () => {
    const { getByText } = render(<Status />);
    expect(getByText('Online')).toBeInTheDocument();
    expect(getByText('Online')).toHaveClass('text-green-500');
  });

  it('renders the Status with type offline', () => {
    const { getByText } = render(<Status type="offline" />);
    expect(getByText('Offline')).toBeInTheDocument();
    expect(getByText('Offline')).toHaveClass('text-secondary');
  });
});
