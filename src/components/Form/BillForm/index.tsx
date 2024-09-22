'use client';

import { Controller, useForm } from 'react-hook-form';

// Components
import { Checkbox, Input } from '@/components';

// Types
import { IUserModel } from '@/types';

// Utils
import { billFormFields } from '@/utils';

// Constants
import { CHECKBOX_PAYMENT_METHODS } from '@/constants';

// Context
import { useMultiForm } from '@/context';

interface IBillForm {
  initialValues?: TBillForm;
}

type TBillForm = Pick<
  IUserModel,
  'payment' | 'billName' | 'billAddress' | 'state' | 'zipCode'
>;

const BillForm = ({ initialValues }: IBillForm) => {
  const { forms, setFormField } = useMultiForm();
  const { payment, billName, billAddress, state, zipCode } =
    forms?.billForm?.updatedValues || {};

  const { control, clearErrors } = useForm<TBillForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      payment: payment || initialValues?.payment || '',
      billName: billName || initialValues?.billName || '',
      billAddress: billAddress || initialValues?.billAddress || '',
      state: state || initialValues?.state || '',
      zipCode: zipCode || initialValues?.zipCode || '',
    },
  });

  const handleInputChange = ({
    field,
    data,
    isError,
    onChange,
  }: {
    field: keyof TBillForm;
    data: string;
    isError: boolean;
    onChange: (value: string) => void;
  }) => {
    isError && clearErrors(field);
    onChange(data);
    setFormField('billForm', field, data);
  };

  const handleCheckboxChange = (data: string) => {
    setFormField('billForm', 'payment', data);
  };

  return (
    <form>
      <div className="mt-5">
        <h3 className="text-white text-base font-medium">Payment methods</h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        <Controller
          control={control}
          key="payment"
          name="payment"
          render={() => (
            <div className="flex flex-col gap-[6px]">
              {CHECKBOX_PAYMENT_METHODS.map(
                ({ title, value, icon: Icon, content }) => {
                  const checked = payment
                    ? value === payment
                    : value === initialValues?.payment;

                  return (
                    <Checkbox
                      key={title}
                      title={title}
                      value={value}
                      checked={checked}
                      icon={<Icon />}
                      onChange={handleCheckboxChange}
                      content={content}
                    />
                  );
                },
              )}
            </div>
          )}
        />

        <div className="mt-5">
          <h3 className="text-white text-base font-medium">Billing address</h3>
          <p className="text-secondary text-sm font-medium">
            Lorem ipsum dolor sit amet consectetur adipiscing.
          </p>
        </div>

        {billFormFields.map(
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
                name={name as keyof TBillForm}
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
                        field: name as keyof TBillForm,
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

export default BillForm;
