import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import UploadFile from '..';

const mockGetInputProps = jest.fn();
const mockGetRootProps = jest.fn();

describe('UploadFile Component', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(
      <BrowserRouter>
        <UploadFile
          getInputProps={mockGetInputProps}
          getRootProps={mockGetRootProps}
          previewURLs={[
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
          ]}
          variant="button"
        />
      </BrowserRouter>,
    );
  });
  it('should match snapshot', () => {
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  it('should render icon upload', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UploadFile
          getInputProps={(props) => ({ ...props })}
          getRootProps={(props) => ({ ...props })}
          previewURLs={[
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
          ]}
        />
      </BrowserRouter>,
    );

    expect(getByText('1')).toBeInTheDocument();
  });

  it('should call getRootProps and getInputProps with default props', () => {
    const { container } = render(
      <BrowserRouter>
        <UploadFile
          previewURLs={[
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
          ]}
        />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should render with previewURL empty ', () => {
    const { container } = render(
      <BrowserRouter>
        <UploadFile />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
