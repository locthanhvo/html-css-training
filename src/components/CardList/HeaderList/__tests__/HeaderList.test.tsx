import { render, RenderResult } from '@testing-library/react';

// Components
import HeaderList from '..';

// Mocks
import { LIST_TASK } from '@/mocks';

const mockOnClick = jest.fn();

describe('HeaderList Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <HeaderList
        color={LIST_TASK.color}
        title={LIST_TASK.title}
        total={LIST_TASK.total}
        onClick={mockOnClick}
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
});
