import React from 'react';
import { Breadcrumb as BreadcrumbBs, 
  Row, 
  Col, 
 } from 'react-bootstrap';

 import "./styles.scss"

interface BreadcrumbProps {
  title: string;
  items: {
    title: string;
    path: string;
    active: boolean;
  }[];
  actions: {
    title: string;
    action(): void;
    description?: string;
    loading?: boolean;
    textLoading?: string;
    disabled?: boolean;
    type?: 'submit' | 'button';
    color?: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  items,
  actions
}) => {
  return (
    <div id='container'>
      <Row>
        <Col md={6}>
          <div>
            <h4 className="font-size-18">{title}</h4>
              <BreadcrumbBs>
                {
                  items.map((item, index) => (
                    <BreadcrumbBs.Item href={item.path} key={index} active={item.active}>
                      {item.title}
                    </BreadcrumbBs.Item>
                  ))
                }
              </BreadcrumbBs> 
          </div>
        </Col>
        {actions && (
          <Col md={6} className="actions">
            <div className="float-right d-none d-md-block d-flex">
              {actions.map((button) => {
                if (button?.loading) {
                  return (
                    <div className="spinner-border text-primary mt-4" role="status">
                      <span className="sr-only">{button?.textLoading || 'Cadastrado'}...</span>
                    </div>
                  );
                }
                return (
                  <button
                    key={button.title}
                    disabled={button?.disabled || false}
                    type={button.type || 'button'}
                    color={button?.color || 'primary'}
                    onClick={button.action}
                    title={button?.description || ''}
                  >
                    {button.title}
                  </button>
                );
              })}
            </div>
          </Col>
        )}
      </Row>
    </div>       
  );
};