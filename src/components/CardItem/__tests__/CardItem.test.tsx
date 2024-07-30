import { fireEvent, render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardItem from '..';

// Mocks
import { MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND } from '@/mocks';

const mockOnDragStart = jest.fn();
const mockOnClick = jest.fn();

describe('CardItem Component', () => {
  let renderResult: RenderResult;
  const { id, title, images, members, label, startDate, endDate, description } =
    MOCK_TASK_DETAIL_SECOND;

  beforeEach(() => {
    renderResult = render(
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
          onClick={mockOnClick}
        />
      </BrowserRouter>,
    );
  });

  it('should match snapshot', () => {
    const { id, title, endDate, startDate } = MOCK_TASK_DETAIL_FIRST;
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

  it('should call onClick', () => {
    const { getByText } = renderResult;

    getByText('Global Suns Network').click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onDragStart', () => {
    const { getByText } = renderResult;

    fireEvent.dragStart(getByText('Global Suns Network'));

    expect(mockOnDragStart).toHaveBeenCalled();
  });
});
