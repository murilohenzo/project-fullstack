import { Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Input } from '../../../components/Forms/Input';

import Swal from "sweetalert2";

interface LevelProps {
  level: string;
}

const schema =
Yup.object().shape({
  level: Yup.string().required("Level name is mandatory"),
});

export const FormLevels = () => {
  const history = useNavigate();


  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      level: ""
    },
    resolver: yupResolver(schema)
  });

  const handlerClickSubmit = (data: LevelProps) => {    
    api.post("/levels", {
      level: data.level
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
            title='Levels'
            items={[
              {
                title: "Levels",
                path: "/levels",
                active: false,
              },
              {
                title: "New Level",
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
            <Col md={6}>
              <Controller
                  control={control}
                  name="level"
                  render={({ field: { value, onChange}}) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    label='Level Name'
                    errorMessage={errors?.level?.message} />
                  )}
                />
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  )
}