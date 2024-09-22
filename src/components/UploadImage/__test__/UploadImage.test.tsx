import { act, fireEvent, render } from '@testing-library/react';

// Components
import UploadImage from '..';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const mockOnFileChange = jest.fn();
const uploadImageMock = jest.fn();
global.URL.createObjectURL = jest.fn(() => 'http://localhost/mock-image-url');

const setup = () => render(<UploadImage onFileChange={mockOnFileChange} />);

describe('UploadImage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render correctly', () => {
    const { container } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call onFileChange', async () => {
    const { container, getByText } = setup();

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = new File(['file contents'], 'test-image.txt', {
      type: 'text/plain',
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(getByText(ERROR_MESSAGES.UPLOAD_IMAGE)).toBeInTheDocument();
  });

  it('should show an error message when uploading large images', async () => {
    const { container, getByText } = setup();

    uploadImageMock.mockResolvedValue('mock-url');

    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const largeFile = new File(['file contents'], 'large-image.png', {
      type: 'image/png',
    });

    Object.defineProperty(largeFile, 'size', {
      value: 6 * 1024 * 1024,
      writable: false,
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [largeFile] } });
    });

    expect(getByText(ERROR_MESSAGES.UPLOAD_IMAGE_SIZE)).toBeInTheDocument();
  });

  it('calls onFileChange with the correct file when an image is uploaded', () => {
    const { getByLabelText } = setup();

    const file = new File(['dummy content'], 'image.png', {
      type: 'image/png',
    });
    const input = getByLabelText(
      'Click to upload or drag and drop',
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(mockOnFileChange).toHaveBeenCalledWith(file);
    expect(mockOnFileChange).toHaveBeenCalledTimes(1);
  });
});
