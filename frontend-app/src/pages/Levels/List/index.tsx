import { Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { Table } from '../../../components/Table';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Input } from '../../../components/Forms/Input';

import { toast } from 'react-toastify';

interface InputNameProps {
  inputName: string;
}

const sizePerPage = 10;


export const Levels = () => {
  const history = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalLevels, setTotalLevels] = useState([]); 
  const [levels, setLevels] = useState([]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      inputName: ""
    },
  });

  useEffect(() => {
    api.get("/levels")
      .then((response) => {
        setTotalLevels(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          theme: 'light'
        })
      })
  }, [])

  const handlerClickSubmit: SubmitHandler<InputNameProps> = (data) => {    
    api.post("/levels/search", null, 
    {
      params: {
        level: data.inputName
      }
    })
    .then((response: any) => {
        setLevels(response.data)
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        theme: 'light'
      })
    })
  }

  const handleTableChange = (type: any, { page, sizePerPage }: any) => {
    api.post("levels/pagination", {
      page: page,
      take: sizePerPage
    })
    .then((response) => {
      setPageNumber(page);
      setLevels(response.data);
    })
    .catch((error) => {
      alert(error.response.data.message)
    })
  } 
  
  return (
    <>
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
                title: "List",
                path: "/levels",
                active: true
              }
            ]}
            actions={
              [
                {
                  title: 'Search',
                  action: () => { },
                  type: 'submit',
                  color: 'btn btn-outline-primary'
                },
                {
                  title: 'New',
                  action: () => { history("/levels/new") },
                  type: 'button',
                  color: 'btn btn-outline-primary'
                }
              ]
            }
          />
          <Container>
            <Row>
            <Col>
              <Controller
                  control={control}
                  name="inputName"
                  render={({ field: { value, onChange}}) => (
                    <Input
                    value={value}
                    onChange={onChange}
                    label='Name'
                    errorMessage={errors?.inputName?.message}                   />
                  )}
                />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table 
                keyField="id"
                data={levels}
                columns={[
                  { text: 'Id',dataField: 'id' },
                  { text: 'Level', dataField: 'level' },
                ]}
                //@ts-ignore
                onTableChange={handleTableChange}
                paginationOptions={{
                    page: pageNumber,
                    sizePerPage: sizePerPage,
                    totalSize: totalLevels.length
                }}
              />
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}