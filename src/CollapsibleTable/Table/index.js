import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Skeleton
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import CollapsibleRow from '../CollapsibleRow';
import EnhancedTableHead from '../EnhancedHeader';

export default ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const tableHead = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'age',
      label: 'Age',
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHead.map((head) => {
              return (
                <EnhancedHeader
                  head={head}
                  sortConfig={sortConfig}
                  handleSort={handleSort}
                />
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <CollapsibleRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};


const CollapsibleTable = ({
  rows, columns = [], rowsPerPage, loading, enableQuickFilter,
  renderDetailCell, enablePagination, enableColumnSort, actionItems,
}) => {
  console.log(loading)
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc', type: '' })
  const [page, setPage] = useState(0)
  const [rpg, setRowsPerPage] = useState(rowsPerPage || 5)
  const [filterValue, setFilterValue] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Single page sorting  (page * rpg, page * rpg + rpg)
  const sortData = (data, config) => data?.slice()
    .sort((a, b) => {
      const { key, dataType, direction } = config
      const valueA = dataType === 'date' ? new Date(a[key]) : a[key]
      const valueB = dataType === 'date' ? new Date(b[key]) : b[key]
      if (key) {
        if (valueA < valueB) {
          return direction === 'asc' ? -1 : 1
        }
        if (valueA > valueB) {
          return direction === 'asc' ? 1 : -1
        }
      }
      return 0
    })

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    setPage(0)
  }

  const handleSort = (key, dataType) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'desc') {
        setSortConfig({ key: null, direction: 'asc', dataType })
      } else {
        setSortConfig({ key, direction: 'desc', dataType })
      }
    } else {
      setSortConfig({ key, direction: 'asc', dataType })
    }
  }

  const filteredData = rows?.filter((row) => Object.values(row)
    .join(' ')
    .toLowerCase()
    .includes(filterValue.toLowerCase()))

  const sortedData = sortData(filteredData, sortConfig)

  const slicedData = sortedData?.slice(
    page * rpg, page * rpg + rpg,
  )

  const NoRowsOverlay = ({ icon, text }) => (
    <Stack height="100%" alignItems="center" justifyContent="center" textAlign="center">
      <Box sx={{ mt: 1 }}>
        <Typography variant={text ? 'h2' : 'h1_medium_xxxl'} component="span" data-testid="grid-fallback-text">
          {text}
        </Typography>
      </Box>
    </Stack>
  )

  console.log(sortedData)
  return (
    <>
      <TableContainer component={Paper}>
        {enableQuickFilter ? (
          <Box sx={{ m: 2 }} display="flex" justifyContent="right">
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              value={filterValue}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Box>
        ) : null}
        <Table>
          <TableHead>
            <TableRow>
              {renderDetailCell && <TableCell />}
              <EnhancedTableHead
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  // padding: '16px',
                  // fontWeight: 'bold',
                }}
                columns={columns}
                sortConfig={sortConfig}
                handleSort={handleSort}
                enableColumnSort={enableColumnSort}
                enableAction={!!actionItems}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading
                ? renderSkeleton(rowsPerPage || rpg, columns, !!renderDetailCell)
                : isNotEmptyArray(slicedData) && slicedData.map((row) => (
                  <CollapsibleRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    detailsCell={renderDetailCell}
                    actionItems={actionItems}
                  />
                ))
            }
          </TableBody>
        </Table>
        {
          !isNotEmptyArray(sortedData) && (
            <Box minHeight="200px" display="flex" alignItems="center" justifyContent="center">
              <NoRowsOverlay  text="NO DATA AVAILABLE" />
            </Box>
          )
        }
        {enablePagination && filteredData?.length > 5 ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rpg}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </TableContainer>
      {
        !isNotEmptyArray(sortedData) && (
          <Box minHeight="200px" display="flex" alignItems="center" justifyContent="center">
            <NoRowsOverlay />
          </Box>
        )
      }
    </>
  )
}

const isNotEmptyArray = (data) => Array.isArray(data) && !!data.length
const generateRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const renderSkeleton = (rowsPerPage, columns, collapse) =>
  // Render skeleton loading rows
  [...Array(rowsPerPage)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(columns?.length + Number(collapse))].map((_e, cellIndex) => (
        <TableCell key={cellIndex}>
          <Skeleton
            style={{ width: generateRandomInteger(80, 130) }}
            animation="wave"
          />
        </TableCell>
      ))}
    </TableRow>
  ));

export default CollapsibleTable