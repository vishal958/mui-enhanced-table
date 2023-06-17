import React from 'react';
import { Chip, Typography } from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CollapsibleTable from './Table';

const App = () => {
  const columns = [
    {
      key: 'severity',
      label: 'Severity',
      type: 'string',
      renderCell: (data) => (
        <Chip
          variant="filled"
          disabled
          // sx={theme?.customStyle?.typography?.capitalize}
          label={
            <Typography variant="body_regular_xs">
              {`${data}`?.toLowerCase()}
            </Typography>
          }
        />
      ),
    },
    {
      key: 'assetFound',
      label: 'Asset Found',
      type: 'string',
      renderCell: (data) => (
        <Chip
          variant="filled"
          color="primary"
          // sx={theme?.customStyle?.typography?.capitalize}
          label={
            <Typography variant="body_regular_xs">
              {`${data}`?.toLowerCase()}
            </Typography>
          }
        />
      ),
    },
    {
      key: 'company',
      label: 'Company',
      type: 'string',
    },
    {
      key: 'details',
      label: 'Details',
      type: 'string',
    },
    {
      key: 'createdDate',
      label: 'Date',
      type: 'date',
    },
  ];
  const rows = [
    {
      id: 1,
      severity: 1,
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '04.08.2022',
      source: '',
      description: '',
    },
    {
      id: 5,
      severity: 2,
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '05.08.2022',
      source: '',
      description: '',
    },
    {
      id: 2,
      severity: 'LOW',
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '06.08.2022',
      source: '',
      description: '',
    },
    {
      id: 3,
      severity: 3,
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '04.08.2022',
      source: '',
      description: '',
    },
    {
      id: 7,
      severity: 'LOW',
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '06.09.2022',
      source: '',
      description: '',
    },
    {
      id: 9,
      severity: 3,
      assetFound: 'EMAIL',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '04.10.2022',
      source: '',
      description: '',
    },
    {
      id: 10,
      severity: 3,
      assetFound: 'MOBILE',
      company: 'INDIVIDUAL',
      details: 'test@gmail.com',
      createdDate: '04.10.2022',
      source: '',
      description: '',
    },
  ];
  const actionItems = [
    {
      key: 1,
      label: 'DELETE',
      onClick: (params) => {
        console.log(params);
      },
      showInMenu: true,
      actionButtonIcon: <ModeEditOutlinedIcon />,
    },
    {
      key: 2,
      label: 'EDIT',
      onClick: (params) => {
        console.log(params);
      },
      showInMenu: true,
      actionButtonIcon: <ModeEditOutlinedIcon />,
    },
    {
      key: 3,
      label: 'EDIT2',
      onClick: (params) => {
        console.log(params);
      },
      showInMenu: false,
      actionButtonIcon: <ModeEditOutlinedIcon />,
    },
    {
      key: 4,
      label: 'EDIT',
      onClick: (params) => {
        console.log(params);
      },
      showInMenu: false,
      actionButtonIcon: <ModeEditOutlinedIcon />,
    },
  ];

  return (
    <div>
      <h1>Collapsible Table Example</h1>
      <CollapsibleTable
        columns={columns}
        rows={rows}
        renderDetailCell={detailContent}
        rowsPerPage={4}
        enablePagination
        enableColumnSort
        enableQuickFilter
        actionItems={actionItems}
        // loading
      />
    </div>
  );
};

const detailContent = () => {
  return <h1>This is detailed content</h1>;
};

export default App;
