'use client';

import { Controller, useForm } from 'react-hook-form';

// Components
import { Button, Label, Switch } from '@/components';

// Types
import { IUserModel } from '@/types';

// Utils
import { generalFormFields, summaryFormFields } from '@/utils';

// Icons
import { HelpIcon } from '@/icons';

// Context
import { useMultiForm } from '@/context';

interface NotificationFormProps {
  initialValues?: IUserModel;
  disabled?: boolean;
  createItemAction?: (formData: FormData) => void;
}

type TNotificationForm = Pick<
  IUserModel,
  | 'mentionMessage'
  | 'replyMessage'
  | 'assignTask'
  | 'taskOverdue'
  | 'dailySummary'
  | 'weeklySummary'
  | 'monthlySummary'
  | 'annuallySummary'
>;

const NotificationForm = ({
  disabled = false,
  initialValues,
  createItemAction,
}: NotificationFormProps) => {
  const { forms, setFormField } = useMultiForm();

  const {
    mentionMessage = 'in-app',
    replyMessage,
    assignTask,
    taskOverdue,
    dailySummary,
    weeklySummary,
    monthlySummary,
    annuallySummary,
  } = forms?.notificationForm?.updatedValues || {};
  const { control } = useForm<TNotificationForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      mentionMessage:
        (mentionMessage as 'in-app' | 'email') ||
        initialValues?.mentionMessage ||
        'in-app',
      replyMessage:
        (replyMessage as 'in-app' | 'email') ||
        initialValues?.replyMessage ||
        'in-app',
      assignTask:
        (assignTask as 'in-app' | 'email') ||
        initialValues?.assignTask ||
        'in-app',
      taskOverdue:
        (taskOverdue as 'in-app' | 'email') ||
        initialValues?.taskOverdue ||
        'in-app',
      dailySummary:
        (dailySummary as 'in-app' | 'email') ||
        initialValues?.dailySummary ||
        'in-app',
      weeklySummary:
        (weeklySummary as 'in-app' | 'email') ||
        initialValues?.weeklySummary ||
        'in-app',
      monthlySummary:
        (monthlySummary as 'in-app' | 'email') ||
        initialValues?.monthlySummary ||
        'in-app',
      annuallySummary:
        (annuallySummary as 'in-app' | 'email') ||
        initialValues?.annuallySummary ||
        'in-app',
    },
  });

  const handleSwitchChange = ({
    field,
    value,
  }: {
    field: keyof TNotificationForm;
    value: boolean;
  }) => {
    setFormField('notificationForm', field, value ? 'in-app' : 'email');
  };

  return (
    <form action={createItemAction}>
      <div className="mt-5">
        <h3 className="text-white text-base font-medium">Team information</h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        {generalFormFields.map(({ key, name, label, customClass }) => (
          <div key={key} className="py-6">
            <Controller
              control={control}
              key={name}
              name={name as keyof TNotificationForm}
              render={({ field: { value } }) => (
                <div className={customClass}>
                  <Label
                    name={label}
                    customClass="text-white"
                    endIcon={<HelpIcon />}
                  />
                  <Switch
                    onChange={(value) =>
                      handleSwitchChange({
                        field: name as keyof TNotificationForm,
                        value,
                      })
                    }
                    value={value}
                    name={name}
                  />
                </div>
              )}
            />
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-white text-base font-medium">
          Summary notifications
        </h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        {summaryFormFields.map(({ key, name, label, customClass }) => (
          <div key={key} className="py-6">
            <Controller
              control={control}
              key={name}
              name={name as keyof TNotificationForm}
              render={({ field: { value } }) => (
                <div className={customClass}>
                  <Label
                    name={label}
                    customClass="text-white"
                    endIcon={<HelpIcon />}
                  />
                  <Switch
                    onChange={(value) =>
                      handleSwitchChange({
                        field: name as keyof TNotificationForm,
                        value,
                      })
                    }
                    value={value}
                  />
                </div>
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          title={initialValues?.id ? 'Update User' : 'Add User'}
          customClass="mt-12 px-[61px] py-[14px]"
          disabled={disabled}
        />
      </div>
    </form>
  );
};

export default NotificationForm;
