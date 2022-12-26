import { FieldInputProps, FormikContextType } from 'formik'

export type UseFormikFiledPropsReturn = ((fieldName: string) => FieldInputProps<any>)[]

export function useFormikFiledProps(props: FormikContextType<any>): UseFormikFiledPropsReturn {
  const { touched, errors, getFieldProps } = props;

  function getFieldHelperText(filedName: string): string | undefined {
    if (touched[filedName] && errors[filedName]) {
      return String(errors[filedName])
    }
  }

  function getFiledError(fieldName: string): boolean {
    return Boolean(fieldName in touched && fieldName in errors)
  }

  function getFieldFormikProps(filedName: string) {
    return {
      ...getFieldProps(filedName),
      helperText: getFieldHelperText(filedName),
      error: getFiledError(filedName),
    }
  }

  return [getFieldFormikProps]
}
