import React from 'react';
import { FormGroup, Label } from 'reactstrap';

import Select, { Props } from 'react-select';

interface ISelectProps extends Props {
  name: string;
  label: string;
  errorMessage?: string;
  options: any[] | undefined;
  onChange: any;
  placeholder?: string;
  limit?: number;
  isMulti?: boolean;
  hidden?: boolean;
}

const DefaultSelect: React.FC<ISelectProps> = (
  {
    name,
    label = "",
    errorMessage = "",
    options,
    onChange,
    placeholder = "Selecione",
    limit,
    isMulti = false,
    hidden = false,
    ...rest
  }
) => {

  const customStyles = {
    control: (provided: any, state: any) => {
      return {
        ...provided,
        border: errorMessage ? '1px solid red' : `1px solid ${state.isFocused || state.isMenuOpen ? '#626ed4' : '#E4E6EF'}`,
        minHeight: 'calc(1.5em + 0.75rem + 2px)',
        borderRadius: '0.25rem',
        boxShadow: 'none',
        backgroundColor: state.isDisabled ? '#CED4DA' : '#FFF'
      }
    },
    singleValue: (provided: any, state: any) => {
      const opacity = 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  const handleOnChange = (selected: any) => {
    if (limit) {
      // @ts-ignore
      if (rest.value?.length < limit) {
        onChange(!selected && isMulti ? [] : selected)
      }
    } else {
      onChange(!selected && isMulti ? [] : selected)
    }
  };
  

  return (

    <FormGroup hidden={hidden}>
      <Label for={`id__input__${name}`}>{label}</Label>

      <Select
        styles={customStyles}
        name={name}
        menuPosition={'fixed'}
        placeholder={placeholder}
        options={options}
        onChange={handleOnChange}
        isMulti={isMulti}
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

export default DefaultSelect;