import { render, screen } from '@testing-library/react';

// Component
import UserForm from '..';
import { BrowserRouter } from 'react-router-dom';
import { USERS } from '@/__mocks__';

const mockOnSubmit = jest.fn();

describe('UserForm components', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot with add form', () => {
    const { container } = render(
      <BrowserRouter>
        <UserForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('match snapshot with edit form', () => {
    const { container } = render(
      <BrowserRouter>
        <UserForm isEdit initialValues={USERS[0]} onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders Add form by default', () => {
    render(
      <BrowserRouter>
        <UserForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('renders Edit form by default', () => {
    render(
      <BrowserRouter>
        <UserForm isEdit onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
});
