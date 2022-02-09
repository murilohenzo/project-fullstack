import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { Table } from '../../../components/Table';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';


interface PaginationProps {
  page: number;
  take: number;
}

const schema =
Yup.object().shape({
  name: Yup.string().required("Name is mandatory"),
});

const sizePerPage = 3;


export const Devs = () => {
  const history = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalDevelopers, setTotalDevelopers] = useState([]); 
  const [developers, setDevelopers] = useState([]);

  const { control, handleSubmit, } = useForm({
  });

  useEffect(() => {
    api.get("/developers")
      .then((response) => {
        setTotalDevelopers(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }, [])

  const handlerClickSubmit = () => {    
    api.post("/developers/pagination", {
        take: sizePerPage,
        page: 1
    })
    .then((response: any) => {
        setDevelopers(response.data)
    })
    .catch((error) => {
      alert(error.response.data.message)
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
      alert(error.response.data.message)
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
                  action: () => { },
                  type: 'submit',
                  color: 'btn btn-outline-primary'
                }
              ]
            }
          />
          <Container>
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