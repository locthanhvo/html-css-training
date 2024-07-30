import { render, fireEvent, RenderResult } from '@testing-library/react';

// Components
import Dropdown from '..';

// Constants
import { LABELS } from '@/constants';

const handleChange = jest.fn();

describe('Dropdown component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Dropdown
        options={LABELS}
        name="Labels"
        onChange={handleChange}
        field="id"
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given options', () => {
    const { getByText } = renderResult;

    expect(getByText('Labels')).toBeInTheDocument();
    fireEvent.click(getByText('Labels'));

    LABELS.forEach((label) => {
      expect(getByText(label.name)).toBeInTheDocument();
    });
  });

  it('handles selecting and deselecting options correctly', () => {
    const { getByText } = renderResult;

    fireEvent.click(getByText('Labels'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('handles selecting new options correctly', () => {
    const { getByText } = renderResult;

    fireEvent.click(getByText('Labels'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 2'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('handles no onChange when options are not changed', () => {
    const { getByText } = renderResult;

    fireEvent.click(getByText('Labels'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('calls onChange prop with selected options', () => {
    const { getByText } = renderResult;

    fireEvent.click(getByText('Labels'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalledWith({
      data: [{ name: 'Space Tasks 1', value: 'space-tasks-1' }],
      field: 'id',
      isError: false,
      onChange: expect.any(Function),
    });
  });
});
