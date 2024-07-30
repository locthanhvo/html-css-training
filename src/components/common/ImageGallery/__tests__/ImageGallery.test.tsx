import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ImageGallery from '..';

describe('ImageGallery Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <ImageGallery
          index={1}
          previewURL="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
        />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
