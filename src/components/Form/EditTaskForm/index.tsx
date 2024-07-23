import { memo, useCallback } from 'react';
import { Box, Flex, FormControl, Image, Text } from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';

// Hooks
import { useUploader } from '@/hooks';

// Constants
import { LABELS, MEMBERS, TASK_SCHEMA } from '@/constants';

// Types
import { IInputField, ITask, TEditTaskForm } from '@/types';

// Components
import ActionButton from '@/components/common/ActionButton';
import CkEditor from '@/components/common/CkEditor';
import DatePicker from '@/components/common/DatePicker';
import Dropdown from '@/components/common/Dropdown';
import InputField from '@/components/common/InputField';
import UploadFile from '@/components/UploadFile';
import ImageGallery from '@/components/common/ImageGallery';
import { calculateDaysLeft } from '@/utils';

interface EditTaskFormProps {
  task?: ITask;
  isLoading?: boolean;
  onSubmit: (data: TEditTaskForm, imageFiles?: File[]) => void;
  onCancel?: () => void;
  onRemove?: () => void;
}

const EditTaskForm = ({
  task,
  isLoading,
  onSubmit,
  onCancel,
  onRemove,
}: EditTaskFormProps) => {
  const {
    id = '',
    title = '',
    description = '',
    label = [],
    startDate = '',
    endDate = '',
    members = [],
    images = [],
    boardId = '',
  } = task || {};

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    clearErrors,
  } = useForm<TEditTaskForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      id: id,
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      label: label,
      boardId: boardId,
      members: members,
      images: images,
    },
  });

  const { previewURLs, imageFiles, getRootProps, getInputProps } =
    useUploader();

  const handleInputChange = ({
    field,
    data,
    isError,
    onChange,
  }: IInputField<TEditTaskForm>) => {
    isError && clearErrors(field);

    onChange(data);
  };

  const handleSubmitForm = useCallback(
    (data: TEditTaskForm) => {
      onSubmit?.(data, imageFiles);
    },
    [onSubmit, imageFiles],
  );

  const imageView = previewURLs?.length > 0 ? previewURLs : task?.images;

  const watchedLabel = useWatch({
    control,
    name: 'label',
  });

  const watchedMembers = useWatch({
    control,
    name: 'members',
  });

  const watchedStartDate = useWatch({
    control,
    name: 'startDate',
  });

  const watchedEndDate = useWatch({
    control,
    name: 'endDate',
  });

  const daysLeft = calculateDaysLeft(
    watchedStartDate || startDate,
    watchedEndDate || endDate,
  );

  return (
    <Flex
      as="form"
      justifyContent="space-between"
      direction="column"
      w="full"
      p={5}
      gap={5}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Flex w="full" gap={9}>
        <Controller
          name="title"
          rules={TASK_SCHEMA.TITLE}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              p={0}
              w="full"
              fontSize="lg"
              color="primary"
              {...field}
              onChange={(data) =>
                handleInputChange({
                  field: 'title',
                  data,
                  isError: !!error,
                  onChange: field.onChange,
                })
              }
              type="text"
              placeholder="Task name or type "
            />
          )}
        />

        <Flex direction="column" gap={1}>
          {((watchedStartDate && watchedEndDate) || (startDate && endDate)) && (
            <Text>Due Date</Text>
          )}
          <Flex direction="row">
            {((watchedStartDate && watchedEndDate) ||
              (startDate && endDate)) && (
              <Text size="sm" color={daysLeft <= 1 ? 'red' : 'coolGray'}>
                {daysLeft} Days Left
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between">
        <Flex direction="column" gap={2}>
          <Flex direction="column" gap={1}>
            {!!watchedLabel?.length && <Text>Labels</Text>}
            <Flex direction="row" gap={1}>
              {watchedLabel?.map(({ name, value }) => (
                <Box
                  key={value}
                  p={2}
                  border={'2px solid'}
                  borderRadius="md"
                  borderColor="lightGray"
                  fontSize="sm"
                >
                  {name}
                </Box>
              ))}
            </Flex>
          </Flex>

          <Flex direction="column" maxW={230} gap={1}>
            {!!watchedMembers?.length && <Text>Members</Text>}
            <Flex direction="row" gap={1}>
              {watchedMembers?.map(({ image, value }) => (
                <Image
                  borderRadius="full"
                  boxSize="20px"
                  src={image}
                  alt="Avatar"
                  key={value}
                />
              ))}
            </Flex>
          </Flex>

          <Flex w="full" direction="row" justifyContent="space-between">
            <Flex w="full" direction="column" gap={3}>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CkEditor
                    label="Description"
                    initialValue={task?.description}
                    onChange={(data) =>
                      handleInputChange({
                        field: 'description',
                        data,
                        isError: !!error,
                        onChange: field.onChange,
                      })
                    }
                  />
                )}
              />

              <Flex direction="column" maxW={230} gap={1}>
                <Text>Attachments</Text>
                {imageView?.map((image, index) => (
                  <ImageGallery key={index} previewURL={image} index={index} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap={2}>
          <Controller
            name="members"
            control={control}
            render={({ field }) => (
              <Dropdown
                defaultValue={task?.members}
                name="Members"
                options={MEMBERS}
                onChange={({ data }) => field.onChange(data)}
                field="members"
              />
            )}
          />

          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <Dropdown
                defaultValue={task?.label?.map(({ name, value }) => ({
                  name,
                  value,
                }))}
                name="Labels"
                options={LABELS}
                onChange={({ data }) => field.onChange(data)}
                field="label"
              />
            )}
          />

          <Controller
            name="images"
            control={control}
            render={() => (
              <FormControl>
                <UploadFile
                  variant="button"
                  previewURLs={previewURLs}
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                />
              </FormControl>
            )}
          />

          <FormControl>
            <DatePicker
              variant="button"
              control={control}
              onChange={handleInputChange}
            />
          </FormControl>

          <ActionButton
            type="button"
            w={168}
            h={8}
            size="md"
            title="Remove Card"
            color="lightRed"
            isLoading={isLoading}
            onClick={onRemove}
          />
        </Flex>
      </Flex>

      <Flex gap={2}>
        <ActionButton
          type="submit"
          size="md"
          isLoading={isLoading || isSubmitting}
          bgColor="royalBlue"
        />
        <ActionButton
          type="button"
          size="md"
          title="Cancel"
          color="black"
          onClick={onCancel}
        />
      </Flex>
    </Flex>
  );
};
export default memo(EditTaskForm);
