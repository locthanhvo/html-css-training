import { render, screen } from '@testing-library/react';

// Component
import BrigadeForm from '..';
import { BrowserRouter } from 'react-router-dom';
import { USERS } from '@/__mocks__';

const mockOnSubmit = jest.fn();

describe('BrigadeForm components', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot with add form', () => {
    const { container } = render(
      <BrowserRouter>
        <BrigadeForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('match snapshot with edit form', () => {
    const { container } = render(
      <BrowserRouter>
        <BrigadeForm
          title="Edit Brigade"
          isEdit
          initialValues={USERS[0]}
          onSubmit={mockOnSubmit}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders Add form by default', () => {
    render(
      <BrowserRouter>
        <BrigadeForm onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });

  it('renders Edit form by default', () => {
    render(
      <BrowserRouter>
        <BrigadeForm title="Edit Brigade" isEdit onSubmit={mockOnSubmit} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });
});
