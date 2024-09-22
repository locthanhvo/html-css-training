import { fireEvent, render, RenderResult } from '@testing-library/react';

// Components
import TeamForm from '..';

// Context
import { MultiFormProvider } from '@/context';

// Mock
import { MOCK_USER_DETAIL } from '@/__mock__';

const mockForms = {
  forms: {
    teamForm: {
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
      <TeamForm />
    </MultiFormProvider>,
  );

describe('TeamForm component', () => {
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
        <TeamForm initialValues={MOCK_USER_DETAIL} />
      </MultiFormProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('handle input onChange event', () => {
    const inputName = rendered.getByPlaceholderText('Please enter team name');
    fireEvent.change(inputName, { target: { value: 'John Doe' } });
    expect(inputName).toHaveValue('John Doe');
  });
});
