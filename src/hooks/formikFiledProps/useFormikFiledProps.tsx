import { FieldInputProps, FormikContextType } from 'formik'

type UseFormikFiledPropsReturn = ((fieldName: string) => FieldInputProps<any>)[]

export default function useFormikFiledProps(props: FormikContextType<any>): UseFormikFiledPropsReturn {
  const { touched, errors, getFieldProps } = props;

  function getFieldHelperText(filedName: string) {
    if (touched[filedName] && errors[filedName]) {
      return String(errors[filedName])
    }
  }

  function getFiledError(fieldName: string) {
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
