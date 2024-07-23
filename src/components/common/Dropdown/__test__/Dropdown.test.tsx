import { render, fireEvent } from '@testing-library/react';

// Components
import Dropdown from '..';

// Constants
import { LABELS } from '@/constants';

describe('Dropdown component', () => {
  it('renders correctly with given options', () => {
    const { getByText } = render(
      <Dropdown options={LABELS} name="Labels" field="id" />,
    );

    expect(getByText('Labels')).toBeInTheDocument();
    fireEvent.click(getByText('Labels'));

    LABELS.forEach((label) => {
      expect(getByText(label.name)).toBeInTheDocument();
    });
  });

  it('handles selecting and deselecting options correctly', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Dropdown
        options={LABELS}
        name="Select Tasks"
        onChange={handleChange}
        field="id"
      />,
    );

    fireEvent.click(getByText('Select Tasks'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('handles selecting new options correctly', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Dropdown
        options={LABELS}
        name="Select Tasks"
        onChange={handleChange}
        field="id"
      />,
    );

    fireEvent.click(getByText('Select Tasks'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 2'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('handles no onChange when options are not changed', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Dropdown
        options={LABELS}
        name="Select Tasks"
        onChange={handleChange}
        field="id"
      />,
    );

    fireEvent.click(getByText('Select Tasks'));
    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalled();

    fireEvent.click(getByText('Space Tasks 1'));

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('calls onChange prop with selected options', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Dropdown
        options={LABELS}
        name="Labels"
        onChange={handleChange}
        field="id"
      />,
    );

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
