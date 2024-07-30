import { fireEvent, render, RenderResult } from '@testing-library/react';

// Icons
import { ForwardArrowIcon, SearchIcon } from '@/components/common/Icons';

// Components
import InputField from '..';

const mockOnChange = jest.fn();
const props = {
  label: 'Search',
  name: 'search',
  placeholder: 'Search Tasks',
  onChange: mockOnChange,
};

describe('InputField component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<InputField {...props} />);
  });

  it('renders correctly with default props', () => {
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with left icon and right icon', () => {
    renderResult = render(
      <InputField
        {...props}
        leftIcon={<SearchIcon />}
        rightIcon={<ForwardArrowIcon />}
      />,
    );
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    renderResult = render(
      <InputField
        {...props}
        isError
        isValidate
        errorMessages="Field is required"
      />,
    );
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  it('should call onChange when input value is changed', async () => {
    const { getByLabelText } = renderResult;
    fireEvent.change(getByLabelText('Search'), {
      target: { value: 'New task' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
