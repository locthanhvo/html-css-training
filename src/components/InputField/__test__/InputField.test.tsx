import { render } from '@testing-library/react';

// Components
import InputField from '..';

// Icons
import { SearchIcon } from '@/components/Icons';

describe('InputField component', () => {
  const mockOnChange = jest.fn();
  const props = {
    name: 'email',
    placeholder: 'Email',
    onChange: mockOnChange,
  };
  it('Render correctly with default props', () => {
    const { container } = render(<InputField {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with right icon', () => {
    const { container } = render(
      <InputField {...props} leftIcon={<SearchIcon />} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with error message', () => {
    const { container } = render(
      <InputField
        {...props}
        isError
        isValidate
        errorMessages="Field is required"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
