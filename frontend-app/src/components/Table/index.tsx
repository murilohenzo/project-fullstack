import React, { memo } from 'react';
import BootstrapTable, { BootstrapTableProps, PaginationOptions } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import './styles.scss';

interface TableProps extends BootstrapTableProps, PaginationOptions {
  paginationOptions: any;
  expand?: any;
  expandComponent?:any;
};

const Table: React.FC<TableProps> = memo(
  ({
    data,
    keyField = 'id',
    columns,
    expand,
    expandComponent,
    onTableChange,
    paginationOptions = {},
    ...rest
  }) => {
    const expandRow = {
      renderer: expandComponent,
    };
    const conditionalProps = expand
      ? {
          expandRow: expandRow,
        }
      : {};
  
    return (
      <BootstrapTable
        keyField={keyField}
        data={data}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
        bordered={false}
        condensed
        striped
        rowStyle={{ height: '48px' }}
        bootstrap4
        noDataIndication="Oops! Não temos registros para te mostrar."
        wrapperClasses="table-responsive"
        headerClasses="header-class"
        remote
        hover
        onTableChange={onTableChange}
        {...conditionalProps}
        {...rest}
      />
    );
  }
)

export { Table };