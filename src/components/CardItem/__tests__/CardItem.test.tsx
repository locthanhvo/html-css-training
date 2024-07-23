import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardItem from '..';

// Mocks
import { TASK_DETAIL, TASK_DETAIL_2 } from '@/mocks';

const mockOnDragStart = jest.fn();

describe('CardItem Component', () => {
  it('should match snapshot', () => {
    const { id, title, endDate, startDate } = TASK_DETAIL;
    const { container } = render(
      <BrowserRouter>
        <CardItem
          id={id}
          title={title}
          endDate={endDate}
          startDate={startDate}
          onDragStart={mockOnDragStart}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const {
      id,
      title,
      images,
      members,
      label,
      startDate,
      endDate,
      description,
    } = TASK_DETAIL_2;

    const { container } = render(
      <BrowserRouter>
        <CardItem
          id={id}
          title={title}
          images={images}
          members={members}
          label={label}
          endDate={endDate}
          startDate={startDate}
          description={description}
          onDragStart={mockOnDragStart}
        />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should call onClick', () => {
    const { id, title, images } = TASK_DETAIL_2;

    const mockOnClick = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <CardItem
          id={id}
          title={title}
          images={images}
          onClick={mockOnClick}
          onDragStart={mockOnDragStart}
        />
      </BrowserRouter>,
    );

    getByText('Global Suns Network').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onDragStart', () => {
    const { id, title, images } = TASK_DETAIL_2;

    const mockOnClick = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <CardItem
          id={id}
          title={title}
          images={images}
          onClick={mockOnClick}
          onDragStart={mockOnDragStart}
        />
      </BrowserRouter>,
    );

    fireEvent.dragStart(getByText('Global Suns Network'));

    expect(mockOnDragStart).toHaveBeenCalled();
  });
});
