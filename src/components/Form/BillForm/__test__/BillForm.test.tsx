import { fireEvent, render, RenderResult } from '@testing-library/react';

// Components
import BillForm from '..';

// Context
import { MultiFormProvider } from '@/context';

// Mock
import { MOCK_USER_DETAIL } from '@/__mock__';

const mockForms = {
  forms: {
    billForm: {
      updatedValues: {},
    },
  },
  setFormField: jest.fn(),
};

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useMultiForm: () => mockForms,
}));

const renderSetup = () =>
  render(
    <MultiFormProvider>
      <BillForm />
    </MultiFormProvider>,
  );

describe('BillForm component', () => {
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
    const { container: initialContainer } = render(
      <MultiFormProvider>
        <BillForm initialValues={MOCK_USER_DETAIL} />
      </MultiFormProvider>,
    );

    expect(initialContainer).toBeInTheDocument();
  });

  it('handle input onChange event', () => {
    const inputName = rendered.getByPlaceholderText('Please enter full name');

    fireEvent.change(inputName, { target: { value: 'John Doe' } });
    expect(inputName).toHaveValue('John Doe');
  });

  it('handle checkbox onChange event', () => {
    const checkbox = rendered.getAllByTitle('checkbox')[0];

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
