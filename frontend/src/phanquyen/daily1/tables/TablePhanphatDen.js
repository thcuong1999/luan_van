import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import BackdropMaterial from "../../../components/BackdropMaterial";
import apiDaily2 from "../../../axios/apiDaily2";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
import EnhancedTableToolbar from "../../../components/table/EnhancedTableToolbar";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsPhanphat } from "./headCells";
// icon
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TablePhanphatDen = ({ dsPhanphatDen }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // api
  // const [loading, setLoading] = React.useState(false);
  // const [daily2, setDaily2] = React.useState([]);

  // const fetchCongcu = async () => {
  //   setLoading(true);
  //   const data = await apiDaily2.dsDaily2();
  //   setDaily2(data.daily2);
  //   setLoading(false);
  // };

  // React.useEffect(() => {
  //   fetchCongcu();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //===
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsPhanphatDen.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsPhanphatDen.length) : 0;

  // if (loading) {
  //   return <BackdropMaterial />;
  // }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
            id="tableMaterial"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dsPhanphatDen.length}
              headCells={headCellsPhanphat}
            />
            <TableBody>
              {dsPhanphatDen
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {row.from.bophankd.ten}
                      </TableCell>
                      <TableCell align="right"> {row.to.daily1.ten}</TableCell>
                      <TableCell align="right">{row.items.length}</TableCell>
                      <TableCell align="right">
                        {row.trangthai === "choxn"
                          ? "Chờ xác nhận"
                          : "Đã xác nhận"}
                      </TableCell>
                      <TableCell align="right">{row.ngaytao}</TableCell>
                      <TableCell align="right">
                        {row.trangthai === "daxn" && row.hoanthanh ? (
                          <CheckIcon />
                        ) : row.trangthai === "daxn" && !row.hoanthanh ? (
                          <ClearIcon />
                        ) : null}
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/daily1/phanphat/chitiet/${row._id}`}>
                          <VisibilityIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={dsPhanphatDen.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          component="div"
        />
      </Paper>
    </Box>
  );
};

export default TablePhanphatDen;
