export type FieldValidator<T> = (field: string, value: string, formValues?: T) => string | null

export interface FormValidators<T> {
  [fieldName: string]: FieldValidator<T>[]
}

export type OptionType = { id: number; name?: string; size?: number }[]

export interface CustomError {
  message: string
}
