import { memo, useCallback, useMemo } from 'react';
import { Box, Button, Flex, FormControl, Image, Text } from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';

// Hooks
import { useUploader } from '@/hooks';

// Constants
import { LABELS, MEMBERS, TASK_SCHEMA } from '@/constants';

// Types
import { IInputField, ITask, TEditTaskForm } from '@/types';

// Components
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
  isDeleteLoading?: boolean;
  onSubmit: (data: TEditTaskForm, imageFiles?: File[]) => void;
  onCancel?: () => void;
  onRemove?: () => void;
}

const EditTaskForm = ({
  task,
  isLoading,
  isDeleteLoading,
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

    onChange?.(data);
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

  const isDisabled = isLoading || isSubmitting || isDeleteLoading;

  const attachmentsMemo = useMemo(
    () => (
      <Flex direction="column" maxW={230} gap={1}>
        {!!imageView?.length && <Text>Attachments</Text>}
        {imageView?.map((image, index) => (
          <ImageGallery key={image} previewURL={image} index={index} />
        ))}
      </Flex>
    ),
    [imageView],
  );

  const membersMemo = useMemo(
    () => (
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
    ),
    [watchedMembers],
  );

  const labelMemo = useMemo(
    () => (
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
    ),
    [watchedLabel],
  );

  const descriptionMemo = useMemo(
    () => (
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
    ),
    [control, task?.description],
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
              p={1}
              w="full"
              fontSize="lg"
              variant="outline"
              {...field}
              isError={!!error}
              isDisabled={isDisabled}
              errorMessages={error?.message}
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
          {labelMemo}

          {membersMemo}

          <Flex w="full" direction="row" justifyContent="space-between">
            <Flex w="full" direction="column" gap={3}>
              {descriptionMemo}

              {attachmentsMemo}
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
                isDisabled={isDisabled}
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
                isDisabled={isDisabled}
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
                  isDisabled={isDisabled}
                />
              </FormControl>
            )}
          />

          <FormControl>
            <DatePicker
              variant="button"
              control={control}
              onChange={handleInputChange}
              isDisabled={isDisabled}
            />
          </FormControl>

          <Button
            w={168}
            h={8}
            variant="ternary"
            isLoading={isDeleteLoading}
            isDisabled={isDisabled}
            onClick={onRemove}
          >
            Remove Card
          </Button>
        </Flex>
      </Flex>

      <Flex gap={2}>
        <Button
          type="submit"
          size="md"
          variant="primary"
          isLoading={isLoading || isSubmitting}
          isDisabled={isDisabled}
        >
          Save
        </Button>

        <Button
          size="md"
          variant="secondary"
          onClick={onCancel}
          isDisabled={isDisabled}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};
export default memo(EditTaskForm);
