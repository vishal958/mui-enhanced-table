import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

const TableSortedHead = ({ head, sortConfig, handleSort }) => (
  <>
    <TableCell>
      <TableSortLabel
        active={sortConfig.key === head?.key}
        direction={sortConfig.direction}
        onClick={() => handleSort(head.key)}
      >
        {head?.label}
      </TableSortLabel>
    </TableCell>
  </>
);

export default TableSortedHead;
