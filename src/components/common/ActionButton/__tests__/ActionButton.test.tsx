import { RenderResult, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ActionButton from '..';

const mockOnClick = jest.fn();

describe('Action Button Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <BrowserRouter>
        <ActionButton bgColor="royalBlue" onClick={mockOnClick} />
      </BrowserRouter>,
    );
  });

  it('should match Button Save component', () => {
    const { container } = renderResult;

    expect(container).toMatchSnapshot();
  });

  it('should call onClick', () => {
    const { getByText } = renderResult;

    getByText('Save').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
