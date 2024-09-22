'use client';

import { IUserModel } from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IFormState {
  [formName: string]: {
    updatedValues: IUserModel;
  };
}

interface IMultiFormContext {
  forms: IFormState;
  setFormField: (formName: string, field: string, value: string) => void;
  resetForm: (formName: string) => void;
  resetAllForms: () => void;
}

const MultiFormContext = createContext<IMultiFormContext | undefined>(
  undefined,
);

export const MultiFormProvider = ({ children }: { children: ReactNode }) => {
  const [forms, setForms] = useState<IFormState>({});

  const setFormField = (formName: string, field: string, value: string) => {
    setForms((prevForms) => ({
      ...prevForms,
      [formName]: {
        ...prevForms[formName],
        updatedValues: {
          ...prevForms[formName]?.updatedValues,
          [field]: value,
        },
      },
    }));
  };

  const resetForm = (formName: string) => {
    setForms((prevForms) => ({
      ...prevForms,
      [formName]: {
        initialValues: {},
        updatedValues: {},
      },
    }));
  };

  const resetAllForms = () => {
    setForms({});
  };

  return (
    <MultiFormContext.Provider
      value={{
        forms,
        setFormField,
        resetForm,
        resetAllForms,
      }}
    >
      {children}
    </MultiFormContext.Provider>
  );
};

export const useMultiForm = () => {
  const context = useContext(MultiFormContext);
  if (!context) {
    throw new Error('useMultiForm must be used within a MultiFormProvider');
  }
  return context;
};
