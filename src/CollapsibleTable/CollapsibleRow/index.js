import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Collapse,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const CollapsibleRow = React.memo(
  ({ row, columns, detailsCell: DetailComponent, actionItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const menuActions = actionItems?.filter((menu) => menu.showInMenu);
    const notInMenuActions = actionItems?.filter((menu) => !menu.showInMenu);

    const handleCollapse = () => {
      setIsOpen(!isOpen);
    };

    const handleActionClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleActionClose = () => {
      setAnchorEl(null);
    };

    const handleMenuItemClick = (menu) => {
      menu.onClick(row);
      setAnchorEl(null);
    };

    return (
      <>
        <TableRow>
          {DetailComponent ? (
            <TableCell>
              <IconButton size="small" onClick={handleCollapse}>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </TableCell>
          ) : null}

          {columns?.map((head) => (
            <TableCell
              // sx={{
              //   padding: '10px',
              // }}
              key={head.key}
            >
              {head?.renderCell
                ? head.renderCell(row[head.key])
                : row[head.key]}
            </TableCell>
          ))}

          {actionItems?.length ? (
            <TableCell style={{ display: 'flex', alignItems: 'center' }}>
              {notInMenuActions.length
                ? notInMenuActions.map((menu) => <>{menu?.actionButtonIcon}</>)
                : null}

              {menuActions.length ? (
                <>
                  <IconButton size="small" onClick={handleActionClick}>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleActionClose}
                  >
                    {Array.isArray(menuActions) &&
                      menuActions?.map((menu) => (
                        <MenuItem
                          key={menu?.key}
                          onClick={() => handleMenuItemClick(menu)}
                        >
                          {menu?.actionButtonIcon}
                          <Typography sx={{ p: 1 }}>{menu?.label}</Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </>
              ) : null}
            </TableCell>
          ) : null}
        </TableRow>

        {DetailComponent ? (
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, height: 0, paddingTop: 0 }}
              align="center"
              colSpan={7}
            >
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box
                  data-testid="hello"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <DetailComponent alertData={{}} handleClose={null} />
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ) : null}
      </>
    );
  }
);
CollapsibleRow.displayName = 'CollapsibleRow';

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

export default CollapsibleRow;
