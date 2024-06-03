import { render, screen } from '@testing-library/react';

// Component
import AuthForm from '..';
import { BrowserRouter } from 'react-router-dom';

const mockOnSubmit = jest.fn();

describe('AuthForm components', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot with login form', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('match snapshot with register form', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthForm isRegister onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders Login form by default', () => {
    render(
      <BrowserRouter>
        <AuthForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders Register form by default', () => {
    render(
      <BrowserRouter>
        <AuthForm isRegister onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
