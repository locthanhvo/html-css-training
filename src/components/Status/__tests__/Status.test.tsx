import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Status from '..';

// Constants
import { STATUS } from '@/constants';

describe('Status Component', () => {
  it('Match Valid Status component', () => {
    const element = render(
      <BrowserRouter>
        <Status variant={STATUS.VALID} />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });

  it('Match Active Status component', () => {
    const element = render(
      <BrowserRouter>
        <Status variant={STATUS.ACTIVE} />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });

  it('Match InActive Status component', () => {
    const element = render(
      <BrowserRouter>
        <Status variant={STATUS.INACTIVE} />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
