import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Header from '..';

const mockUseMatches = { at: jest.fn() };
const mockUseRouteLoaderData = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useMatches: () => mockUseMatches,
  useRouteLoaderData: () => mockUseRouteLoaderData,
}));

describe('Header Component', () => {
  it('Match Header component', () => {
    const element = render(
      <BrowserRouter>
        <Header width="1140px" />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
