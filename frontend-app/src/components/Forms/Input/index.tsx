import React, { memo } from 'react';
import { 
  FormGroup,
  Label, 
  Input as InputStrap, 
  FormFeedback, 
  InputProps as InputStrapProps } from 'reactstrap';

interface InputProps extends InputStrapProps {
  label: string;
  errorMessage: any;
  onBlurInput?: any
}

export const Input: React.FC<InputProps> = memo(
  (
    {
      name,
      label = "",
      type = "text",
      errorMessage,
      value,
      hidden = false,
      onBlurInput,
      showCount = false,
      ...rest
    }
  ) => {
    return (
      <FormGroup onBlur={onBlurInput} hidden={hidden}>
        <Label for={`id__input__${name}`}>{label}</Label>
        <InputStrap
          name={name}
          type={type}
          id={`id__input__${name}`}
          value={value}
          invalid={!!errorMessage}
          {...rest}
        />
       
        {showCount && <span> {
          typeof value === "string" && value.length
          }</span>}
        <FormFeedback>{errorMessage}</FormFeedback>
        
      </FormGroup>
    )
  }
)