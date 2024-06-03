import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Dropdown from '..';

// Constants
import { BRANCHES } from '@/constants';

describe('Dropdown Component', () => {
  it('Should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Dropdown options={BRANCHES} />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
