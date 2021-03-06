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

const schema =
Yup.object().shape({
  inputName: Yup.string().required("Name is mandatory"),
});

const sizePerPage = 10;
const defaultValues = {
  inputName: "",
}


export const Devs = () => {
  const history = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalDevelopers, setTotalDevelopers] = useState([]); 
  const [developers, setDevelopers] = useState([]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    api.get("/developers")
      .then((response) => {
        setTotalDevelopers(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          theme: 'light'
        })
      })
  }, [])

  const handlerClickSubmit: SubmitHandler<InputNameProps> = (data) => {    
    console.log(data)
    api.post("/developers/search", null, 
    {
      params: {
        name: data.inputName
      }
    })
    .then((response: any) => {
      console.log(response.data)
        setDevelopers(response.data)
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        theme: 'light'
      })
    })
}

  const handleTableChange = (type: any, { page, sizePerPage }: any) => {
    api.post("developers/pagination", {
      page: page,
      take: sizePerPage
    })
    .then((response) => {
      setPageNumber(page);
      setDevelopers(response.data);
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        theme: 'light'
      })
    })
  } 
  
  return (
    <>
      <Form onSubmit={handleSubmit(handlerClickSubmit)}>
        <Breadcrumb 
            title='Developers'
            items={[
              {
                title: "Devs",
                path: "/devs",
                active: false,
              },
              {
                title: "Listagem",
                path: "/devs",
                active: true
              }
            ]}
            actions={
              [
                {
                  title: 'Pesquisar',
                  action: () => { },
                  type: 'submit',
                  color: 'btn btn-outline-primary'
                },
                {
                  title: 'Novo',
                  action: () => { history("/devs/new")},
                  type: 'submit',
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
                data={developers}
                columns={[
                  { text: 'Level',dataField: 'level' },
                  { text: 'Name', dataField: 'name' },
                  { text: 'Sex', dataField: 'sex' },
                  { text: 'Age', dataField: 'age' },
                  { text: 'Birth Date', dataField: 'birth_date' },
                ]}
                //@ts-ignore
                onTableChange={handleTableChange}
                paginationOptions={{
                    page: pageNumber,
                    sizePerPage: sizePerPage,
                    totalSize: totalDevelopers.length
                }}
              />
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}