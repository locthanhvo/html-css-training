import { render } from '@testing-library/react';
import MainLayout from '..';

describe('MainLayout', () => {
  it('should render correctly', () => {
    const { container } = render(
      <MainLayout>
        <div>MainLayout</div>
      </MainLayout>,
    );
    expect(container).toBeInTheDocument();
  });
});
