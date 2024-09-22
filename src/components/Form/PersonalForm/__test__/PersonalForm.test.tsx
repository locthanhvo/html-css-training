import { fireEvent, render, RenderResult } from '@testing-library/react';

// Components
import PersonalForm from '..';

// Context
import { MultiFormProvider } from '@/context';

// Mock
import { MOCK_USER_DETAIL } from '@/__mock__';
import { uploadFile } from '@/services';

const mockForms = {
  forms: {
    personalForm: {
      updatedValues: {},
    },
  },
  setFormField: jest.fn(),
};
global.URL.createObjectURL = jest.fn(() => 'http://localhost/mock-image-url');

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useMultiForm: () => mockForms,
}));

jest.mock('@/services', () => ({
  uploadFile: jest.fn(),
}));

const renderSetup = () =>
  render(
    <MultiFormProvider>
      <PersonalForm />
    </MultiFormProvider>,
  );

describe('PersonalForm component', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = renderSetup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(rendered.container).toMatchSnapshot();
  });

  it('renders with initial values', () => {
    const { container } = render(
      <MultiFormProvider>
        <PersonalForm initialValues={MOCK_USER_DETAIL} />
      </MultiFormProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('handle input onChange event', () => {
    const inputName = rendered.getByPlaceholderText('Please enter name');
    const inputPosition = rendered.getByPlaceholderText(
      'Please enter position',
    );
    const textareaDescription = rendered.getByPlaceholderText(
      'Write a short bio about you...',
    );

    fireEvent.change(inputName, { target: { value: 'John Doe' } });
    fireEvent.change(inputPosition, { target: { value: 'Software Engineer' } });
    fireEvent.change(textareaDescription, {
      target: { value: 'I am a software engineer' },
    });

    expect(inputName).toHaveValue('John Doe');
    expect(inputPosition).toHaveValue('Software Engineer');
    expect(textareaDescription).toHaveValue('I am a software engineer');
  });

  it('calls onFileChange with the correct file when an image is uploaded', async () => {
    const file = new File(['dummy content'], 'image.png', {
      type: 'image/png',
    });

    const input = rendered.getByLabelText(
      'Click to upload or drag and drop',
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { files: [file] },
    });

    (uploadFile as jest.Mock).mockResolvedValue(file);

    expect(uploadFile).toHaveBeenCalledWith(file);
  });
});
