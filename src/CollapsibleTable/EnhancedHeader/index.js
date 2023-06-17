import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

const EnhancedTableHead = ({
  sortConfig,
  enableAction,
  handleSort,
  enableColumnSort,
  columns,
}) => (
  <>
    {columns?.map((head) => (
      <TableCell
        sx={{
          // padding: '10px',
          fontWeight: 'bold',
        }}
        key={head.key}
      >
        {enableColumnSort ? (
          <TableSortLabel
            active={sortConfig.key === head?.key}
            direction={sortConfig.direction}
            onClick={() => handleSort(head.key, head.type)}
          >
            {head?.label}
          </TableSortLabel>
        ) : (
          head?.label
        )}
      </TableCell>
    ))}
    {enableAction && <TableCell />}
  </>
);

export default EnhancedTableHead;
