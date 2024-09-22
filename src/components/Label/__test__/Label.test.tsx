import { render } from '@testing-library/react';

// Components
import Label from '..';

describe('Label component', () => {
  it('renders the Button with children', () => {
    const { getByText } = render(<Label name="Name" />);
    expect(getByText('Name')).toBeInTheDocument();
  });

  it('renders startIcon and endIcon', () => {
    const { getByText } = render(
      <Label
        name="Click me"
        startIcon={<span>Start</span>}
        endIcon={<span>End</span>}
      />,
    );
    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('End')).toBeInTheDocument();
  });

  it('applies customClass', () => {
    const { getByText } = render(
      <Label name="Click me" customClass="custom-class" />,
    );
    expect(getByText('Click me')).toHaveClass('custom-class');
  });
});
