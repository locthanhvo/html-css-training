import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ActionButton from '..';

// Icons
import { AddIcon } from '@/components/Icons';

describe('Action Button Component', () => {
  it('Match Button Add component', () => {
    const element = render(
      <BrowserRouter>
        <ActionButton
          rightIcon={<AddIcon />}
          title="Add User"
          size="lg"
          bgColor="blue.200"
        />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
