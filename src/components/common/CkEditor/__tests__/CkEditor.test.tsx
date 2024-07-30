import { render, screen, fireEvent } from '@testing-library/react';
import CkEditor from '..';
import { Textarea } from '@chakra-ui/react';

jest.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: jest.fn(({ onChange }) => (
    <Textarea
      placeholder="Description"
      onChange={(e) => onChange(null, { getData: () => e.target.value })}
    />
  )),
}));

describe('CKEditorWrapper', () => {
  it('renders with label and initial value', () => {
    render(<CkEditor label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('calls onChange when editor content changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <CkEditor onChange={handleChange} />,
    );

    const editor = getByPlaceholderText('Description');
    fireEvent.change(editor, { target: { value: 'New Content' } });

    expect(handleChange).toHaveBeenCalledWith('New Content');
  });
});
