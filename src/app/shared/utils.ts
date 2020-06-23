import { FormGroup } from '@angular/forms';

export const isFormFieldInvalid = (
  form: FormGroup,
  fieldName: string
): boolean => {
  const isFieldTouched: boolean = form.get(fieldName).touched;
  const isFieldInvalid: boolean = form.get(fieldName).invalid;
  return isFieldTouched && isFieldInvalid;
};
