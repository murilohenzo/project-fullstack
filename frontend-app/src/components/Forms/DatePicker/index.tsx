import { memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { FormGroup, Label, Input } from 'reactstrap';

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import ptBR from 'date-fns/locale/pt-BR';

interface IDateInputProps {
  label: string;
  required?: boolean;
  name: string;
  errorMessage?: string;
  onChange: any;
  dateFormat?: any;
  value: any;
}

export const DatePickerInput: React.FC<IDateInputProps> = memo(
  ({
    label,
    required,
    name,
    errorMessage,
    onChange,
    dateFormat = 'dd/MM/yyyy',
    value,
    ...rest
  }) => {
  
    registerLocale('pt-BR', ptBR);
  
    const handleChange = useCallback(
      (date) => {
        onChange(date);
      },
      [onChange],
    );
  
    return (
      <FormGroup className="forminput" style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Label >{label}</Label>
  
        <DatePicker
          dateFormat={dateFormat}
          className="form-control"
          autoComplete="off"
          showPopperArrow={false}
          customInput={<Input invalid={!!errorMessage ?? 'error'} />}
          locale="pt-BR"
          valueName="selected"
          selected={value}
          onChange={handleChange}
          // @ts-ignore
          timeIntervals="10"
          popperContainer={({ children }) => createPortal(children, document.body)}
          {...rest}
        />
  
        {errorMessage && <div style={{
          width: '100%',
          marginTop: '0.25rem',
          'fontSize': '80%',
          color: ' #ec4561'
        }}>{errorMessage}</div>}
  
      </FormGroup>
    );
  }
)