import { render, fireEvent } from '@testing-library/react';

// Components
import Button from '..';

describe('Button component', () => {
  it('renders the Button with children', () => {
    const { getByText } = render(<Button title="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders startIcon and endIcon', () => {
    const { getByText } = render(
      <Button
        title="Click me"
        startIcon={<span>Start</span>}
        endIcon={<span>End</span>}
      />,
    );
    expect(getByText('Start')).toBeInTheDocument();
    expect(getByText('End')).toBeInTheDocument();
  });

  it('applies the correct variant classes', () => {
    const { getByText } = render(<Button size="md" title="Click me" />);
    expect(getByText('Click me')).toHaveClass(
      'bg-[linear-gradient(to_right,_#CB3CFF_20%,_#7F25FB_80%)] text-white disabled:not-allowed',
    );
  });

  it('applies customClass', () => {
    const { getByText } = render(
      <Button title="Click me" customClass="custom-class" />,
    );
    expect(getByText('Click me')).toHaveClass('custom-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onClick={handleClick} />,
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is set', () => {
    const { getByText } = render(<Button title="Click me" disabled={true} />);
    expect(getByText('Click me')).toBeDisabled();
  });

  it('renders button with type submit', () => {
    const { getByText } = render(<Button title="Submit" type="submit" />);
    expect(getByText('Submit')).toHaveAttribute('type', 'submit');
  });
});
