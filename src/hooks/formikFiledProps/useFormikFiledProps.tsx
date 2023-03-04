import { FieldInputProps, FormikContextType } from 'formik'

type UseFormikFiledPropsReturn<T> = ((fieldName: keyof T) => FieldInputProps<T>)[]

export default function useFormikFiledProps<T>(props: FormikContextType<T>): UseFormikFiledPropsReturn<T> {
  const { touched, errors, getFieldProps } = props;

  function getFieldHelperText(filedName: keyof T) {
    if (touched[filedName] && errors[filedName]) {
      return String(errors[filedName])
    }
  }

  function getFiledError(fieldName: keyof T) {
    return Boolean(fieldName in touched && fieldName in errors)
  }

  function getFieldFormikProps(filedName: keyof T) {
    return {
      ...getFieldProps(filedName),
      helperText: getFieldHelperText(filedName),
      error: getFiledError(filedName),
    }
  }

  return [getFieldFormikProps]
}
