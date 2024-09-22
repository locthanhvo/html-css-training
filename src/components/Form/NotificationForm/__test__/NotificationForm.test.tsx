import { fireEvent, render, RenderResult } from '@testing-library/react';

// Components
import NotificationForm from '..';

// Context
import { MultiFormProvider } from '@/context';

// Mock
import { MOCK_USER_DETAIL } from '@/__mock__';
import { IUserModel } from '@/types';

const mockForms = {
  forms: {
    notificationForm: {
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
      <NotificationForm />
    </MultiFormProvider>,
  );

describe('NotificationForm component', () => {
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
        <NotificationForm initialValues={MOCK_USER_DETAIL as IUserModel} />
      </MultiFormProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('handle checkbox onChange event', () => {
    const checkboxOne = rendered.getAllByTitle('switch')[0];
    const checkboxFive = rendered.getAllByTitle('switch')[4];

    fireEvent.click(checkboxOne);
    fireEvent.click(checkboxFive);

    expect(checkboxOne).toBeChecked();
    expect(checkboxFive).toBeChecked();
  });
});
