import { fireEvent, render, RenderResult } from '@testing-library/react';

// Components
import CardList from '..';

// Mocks
import { LIST_TASK } from '@/mocks';

const mockOnClick = jest.fn();

const mockOnSubmit = jest.fn();

const mockOnTaskDrop = jest.fn();

const mockSetData = jest.fn();

const mockGetData = jest.fn().mockImplementation((key) => {
  if (key === 'taskId') {
    return '2';
  }
  return '';
});

describe('CardList Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <CardList
        taskList={LIST_TASK}
        onSubmit={mockOnSubmit}
        onOpenAddTask={mockOnClick}
        onTaskDrop={mockOnTaskDrop}
      />,
    );
  });

  it('should match snapshot', () => {
    const { container } = renderResult;

    expect(container).toMatchSnapshot();
  });

  it('should call onClick add icon', async () => {
    const { getByRole } = renderResult;

    getByRole('button', { name: 'Add' }).click();

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onClick button add task', () => {
    const { getByRole } = renderResult;

    getByRole('button', { name: '+ new task' }).click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call handleDragStart', () => {
    const { getByText } = renderResult;

    const dragEvent = {
      dataTransfer: {
        setData: mockSetData,
      },
    };

    fireEvent.dragStart(getByText('Global Suns Network'), dragEvent);
    expect(mockSetData).toHaveBeenCalledWith('taskId', '2');
    expect(mockSetData).toHaveBeenCalledWith('sourceListId', '1');
  });

  it('should call handleDrop', () => {
    const { getByText } = renderResult;

    const dropEvent = {
      dataTransfer: {
        getData: mockGetData,
      },
      preventDefault: jest.fn(),
    };

    fireEvent.drop(getByText('Global Suns Network'), dropEvent);

    expect(mockGetData).toHaveBeenCalledWith('taskId');
    expect(mockOnTaskDrop).toHaveBeenCalledWith('2', '1');
  });

  it('render AddTaskForm component', () => {
    const { getByPlaceholderText } = render(
      <CardList
        isActive={true}
        taskList={LIST_TASK}
        onSubmit={mockOnSubmit}
        onOpenAddTask={mockOnClick}
        onTaskDrop={mockOnTaskDrop}
      />,
    );

    expect(getByPlaceholderText('Task name or type')).toBeInTheDocument();
  });

  it('should call handleDragOver', () => {
    const mockPreventDefault = jest.fn();
    const { getByText } = renderResult;

    const dragOverEvent = {
      preventDefault: mockPreventDefault,
    };

    fireEvent.dragOver(getByText('Global Suns Network'), dragOverEvent);

    expect(getByText('Global Suns Network')).toBeInTheDocument();
  });

  it('should render task list empty', () => {
    const { container } = render(
      <CardList
        isActive={true}
        onSubmit={mockOnSubmit}
        onOpenAddTask={mockOnClick}
        onTaskDrop={mockOnTaskDrop}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
