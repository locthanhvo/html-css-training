import { render, screen, waitFor } from '@testing-library/react';

// Components
import Modal from '..';
import userEvent from '@testing-library/user-event';

describe('Modal test cases', () => {
  const mockOnClose = jest.fn();

  const mockRenderBody = <></>;

  const setup = () =>
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        body={mockRenderBody}
        title="mock title"
      />,
    );

  it('should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render with default value', () => {
    const { container } = render(<Modal isOpen={true} onClose={mockOnClose} />);

    expect(container).toMatchSnapshot();
  });

  it('should close modal when close button is clicked', async () => {
    render(<Modal isOpen={true} onClose={mockOnClose} hasCloseButton={true} />);
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
