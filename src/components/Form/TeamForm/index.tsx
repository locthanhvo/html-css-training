'use client';

import { Controller, useForm } from 'react-hook-form';

// Components
import { Input } from '@/components';

// Types
import { IUserModel } from '@/types';

// Utils
import { teamFormFields } from '@/utils';

// Context
import { useMultiForm } from '@/context';

interface ITeamForm {
  initialValues?: TTeamForm;
}

type TTeamForm = Pick<IUserModel, 'teamName' | 'rank' | 'office' | 'teamMail'>;

const TeamForm = ({ initialValues }: ITeamForm) => {
  const { forms, setFormField } = useMultiForm();
  const { teamName, rank, office, teamMail } =
    forms?.teamForm?.updatedValues || {};

  const { control, clearErrors } = useForm<TTeamForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      teamName: teamName || initialValues?.teamName || '',
      rank: rank || initialValues?.rank || '',
      office: office || initialValues?.office || '',
      teamMail: teamMail || initialValues?.teamMail || '',
    },
  });

  const handleInputChange = ({
    field,
    data,
    isError,
    onChange,
  }: {
    field: keyof TTeamForm;
    data: string;
    isError: boolean;
    onChange: (value: string) => void;
  }) => {
    isError && clearErrors(field);
    onChange(data);
    setFormField('teamForm', field, data);
  };

  return (
    <form>
      <div className="mt-5">
        <h3 className="text-white text-base font-medium">Team information</h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        {teamFormFields.map(
          ({
            label,
            key,
            name,
            rules,
            ariaLabel,
            icon: Icon,
            customClass,
            placeholder,
          }) => (
            <div key={key} className={customClass}>
              <Controller
                control={control}
                key={key}
                name={name as keyof TTeamForm}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    customClass="w-full"
                    labelStartIcon={<Icon />}
                    label={label}
                    placeholder={placeholder}
                    {...field}
                    isError={!!error}
                    errorMessage={error?.message}
                    onChange={(data) =>
                      handleInputChange({
                        field: name as keyof TTeamForm,
                        data,
                        isError: !!error,
                        onChange: field.onChange,
                      })
                    }
                    aria-label={ariaLabel}
                  />
                )}
              />
            </div>
          ),
        )}
      </div>
    </form>
  );
};

export default TeamForm;
