import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../../components/Forms/Input';
import { Breadcrumb } from '../../../components/Breadcrumb';
import DefaultSelect from '../../../components/Forms/Select';
import ReactDatePicker from "react-datepicker";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../../../services/api';


import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { DatePickerInput } from '../../../components/Forms/DatePicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface DevsProps {
  level_id: {
    value: number;
    label: string;
    message?: string
  };
  name: string;
  sex: {
    value: number;
    label: string;
    message?: string
  };
  birthDate: undefined;
  age: number;
  hobby: string;
}

interface LevelsProps {
  id: number;
  level: string;
}


// const schema =
// Yup.object().shape({
//   level: Yup.string().required("Level name is mandatory"),
// });

export const FormDevs = () => {
  const history = useNavigate();
  const [levels, setLevels] = useState<LevelsProps[]>();


  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      level_id: {
        value: 0,
        label: '',
        message: ''
      },
      name: "",
      sex: {
        value: 0,
        label: '',
        message: ''
      },
      birthDate: undefined,
      age: 0,
      hobby: ""
    },
    // resolver: yupResolver(schema)
  });

  useEffect(() => {
    api.get("/levels")
      .then((response) => {
        setLevels(response?.data?.map((levels: LevelsProps) => {
          return {
            value: levels.id,
            label: levels.level
          }
        }))
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          theme: 'light'
        })
      })
  }, [])

  const handlerClickSubmit = (data: DevsProps) => {    
    api.post("/developers", {
      level_id: data.level_id.value,
      name: data.name,
      sex: data.sex.value,
      birth_date: data.birthDate,
      age: data.age,
      hobby: data.hobby
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Level registered successfully',
        text: 'Successfully registered level, can now be used to register a developer',
        footer: 'Developers Manager'
      })
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error registering level',
        footer: 'Developers Manager'
      })
    })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handlerClickSubmit)}>
        <Breadcrumb 
            title='Devs'
            items={[
              {
                title: "Devs",
                path: "/devs",
                active: false,
              },
              {
                title: "New Dev",
                path: "/levels/new",
                active: true
              }
            ]}
            actions={
              [
                {
                  title: 'Save',
                  action: () => { },
                  type: 'submit',
                  color: 'btn btn-outline-primary'
                },
                {
                  title: 'Back',
                  action: () => { history("/levels") },
                  type: 'button',
                  color: 'btn btn-outline-primary'
                }
              ]
            }
          />
          <Container>
            <Row>
            <Col md={3}>
              <Controller
                  control={control}
                  name="level_id"
                  render={({ field: { value, onChange}}) => (
                    <DefaultSelect
                      // value={value}
                      onChange={onChange}
                      label='Level'
                      name='level_id'
                      options={levels}
                      // @ts-ignore
                      errorMessage={errors?.level_id?.message} />
                  )}
                />
            </Col>
            <Col md={3}>
              <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange}}) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    label='Name'
                    errorMessage={errors?.name?.message} />
                  )}
                />
            </Col>
            <Col md={3}>
              <Controller
                  control={control}
                  name="sex"
                  render={({ field: { value, onChange}}) => (
                    <DefaultSelect
                      value={value}
                      onChange={onChange}
                      label='Sex'
                      name='sex'
                      options={[
                        {
                          label: "MALE",
                          value: "Male"
                        },
                        {
                          label: "FEMALE",
                          value: "Female"
                        },
                      ]}
                      // @ts-ignore
                      errorMessage={errors?.sex?.message} />
                  )}
                />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
            <Controller
              control={control}
                name="birthDate"
                render={({ field: { onChange, value } }) => (
                  <DatePickerInput
                    onChange={onChange}
                    name="birthDate" 
                    label='Birth Date'
                    value={value}
                 />
                )}
              />
            </Col>
            <Col md={3}>
              <Controller
                  control={control}
                  name="age"
                  render={({ field: { value, onChange}}) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    label='Age'
                    type='number'
                    errorMessage={errors?.age?.message} />
                  )}
                />
            </Col>
            <Col md={6}>
              <Controller
                  control={control}
                  name="hobby"
                  render={({ field: { value, onChange}}) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    label='Hobby'
                    errorMessage={errors?.hobby?.message} />
                  )}
                />
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  )
}