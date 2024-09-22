import { fireEvent, render } from '@testing-library/react';

// Components
import Checkbox from '..';
import { VisaIcon } from '@/icons';

const mockOnChange = jest.fn();

const renderSetup = () =>
  render(
    <Checkbox
      content="Visa"
      icon={<VisaIcon />}
      title="VISA **** 8092"
      onChange={mockOnChange}
    />,
  );

describe('Checkbox Component', () => {
  it('match Checkbox component', () => {
    const element = renderSetup();
    expect(element).toMatchSnapshot();
  });

  it('handle onChange event', () => {
    const { getByTitle } = renderSetup();
    fireEvent.click(getByTitle('checkbox'));

    expect(mockOnChange).toHaveBeenCalled();
  });
});
