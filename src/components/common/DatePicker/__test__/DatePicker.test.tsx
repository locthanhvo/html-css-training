import { render, fireEvent, renderHook } from '@testing-library/react';
import DatePicker from '..';
import { useForm } from 'react-hook-form';
import { TAddTaskForm } from '@/types';

// Mock calculateDaysLeft function
jest.mock('@/utils', () => ({
  calculateDaysLeft: jest.fn(() => '5 days left'),
}));

const { result } = renderHook(() => useForm<TAddTaskForm>({}));

describe('DatePicker component', () => {
  it('renders correctly with button variant', () => {
    const { getByText } = render(
      <DatePicker control={result.current.control} variant="button" />,
    );

    expect(getByText('Date')).toBeInTheDocument();
  });

  it('updates startDate correctly', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <DatePicker control={result.current.control} onChange={handleChange} />,
    );

    fireEvent.change(getByLabelText('Start Date'), {
      target: { value: '2024-07-25' },
    });

    expect(handleChange).toHaveBeenCalledWith({
      field: 'startDate',
      data: '2024-07-25',
      isError: false,
      onChange: expect.any(Function),
    });
  });

  it('updates endDate correctly', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <DatePicker control={result.current.control} onChange={handleChange} />,
    );

    fireEvent.change(getByLabelText('End Date'), {
      target: { value: '2024-07-30' },
    });

    expect(handleChange).toHaveBeenCalledWith({
      field: 'endDate',
      data: '2024-07-30',
      isError: false,
      onChange: expect.any(Function),
    });
  });

  it('calls calculateDaysLeft correctly with startDate and endDate', () => {
    const { getByLabelText, getByText } = render(
      <DatePicker control={result.current.control} variant="icon" />,
    );

    fireEvent.change(getByLabelText('Start Date'), {
      target: { value: '2024-07-25' },
    });
    fireEvent.change(getByLabelText('End Date'), {
      target: { value: '2024-07-30' },
    });

    expect(getByText('5 days left')).toBeInTheDocument();
    expect(require('@/utils').calculateDaysLeft).toHaveBeenCalledWith(
      '2024-07-25',
      '2024-07-30',
    );
  });
});
