import React from 'react';
import { render, act, renderHook, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MultiFormProvider, useMultiForm } from '../MultiFormContext';

const TestComponent = () => {
  const { forms, setFormField, resetForm, resetAllForms } = useMultiForm();

  return (
    <div>
      <div>
        {Object.keys(forms).length === 0 ? 'No forms' : JSON.stringify(forms)}
      </div>
      <button onClick={() => setFormField('testForm', 'firstName', 'John')}>
        Set Form Field
      </button>
      <button onClick={() => resetForm('testForm')}>Reset Form</button>
      <button onClick={() => resetAllForms()}>Reset All Forms</button>
    </div>
  );
};

const renderSetup = () =>
  render(
    <MultiFormProvider>
      <TestComponent />
    </MultiFormProvider>,
  );

describe('MultiFormContext', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = renderSetup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update form field value correctly', () => {
    expect(rendered.getByText('No forms')).toBeInTheDocument();

    act(() => {
      rendered.getByText('Set Form Field').click();
    });

    expect(rendered.getByText(/"firstName":"John"/)).toBeInTheDocument();
  });

  it('should reset a specific form correctly', () => {
    act(() => {
      rendered.getByText('Set Form Field').click();
    });

    expect(rendered.getByText(/"firstName":"John"/)).toBeInTheDocument();

    act(() => {
      rendered.getByText('Reset Form').click();
    });

    expect(rendered.getByText(/"initialValues":{}/)).toBeInTheDocument();
    expect(rendered.getByText(/"updatedValues":{}/)).toBeInTheDocument();
  });

  it('should reset all forms correctly', () => {
    act(() => {
      rendered.getByText('Set Form Field').click();
    });

    expect(rendered.getByText(/"firstName":"John"/)).toBeInTheDocument();

    act(() => {
      rendered.getByText('Reset All Forms').click();
    });

    expect(rendered.getByText('No forms')).toBeInTheDocument();
  });

  it('should throw an error when used outside of MultiFormProvider', () => {
    try {
      renderHook(() => useMultiForm());
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('useMultiForm must be used within a MultiFormProvider'),
      );
    }
  });
});
