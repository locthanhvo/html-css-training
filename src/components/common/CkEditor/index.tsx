import { memo, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorWrapperProps {
  onChange?: (content: string) => void;
  initialValue?: string;
  label?: string;
}

const CKEditorWrapper = ({
  onChange,
  label = '',
  initialValue = '',
}: CKEditorWrapperProps) => {
  const handleEditorChange = useCallback(
    (_event: unknown, editor: ClassicEditor) => {
      const data = editor.getData();
      onChange?.(data);
    },
    [onChange],
  );

  return (
    <FormControl maxW={430}>
      {label && (
        <FormLabel
          fontSize="base"
          fontWeight="regular"
          marginInlineEnd={0}
          minW="max-content"
        >
          {label}
        </FormLabel>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={initialValue}
        onChange={handleEditorChange}
      />
    </FormControl>
  );
};

export default memo(CKEditorWrapper);
