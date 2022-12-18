import { FormikContextType } from 'formik'

export function useFormikFiledProps({ touched, errors, getFieldProps }: FormikContextType<any>) {
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
