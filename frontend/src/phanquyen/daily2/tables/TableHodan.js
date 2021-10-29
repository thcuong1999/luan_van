import * as React from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
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
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsHodan } from "./headCells";
import { alpha } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogMaterial from "../../../components/DialogMaterial";
import apiDaily2 from "../../../axios/apiDaily2";
import HodanChitiet from "../HodanChitiet";
import apiHodan from "../../../axios/apiHodan";

const EnhancedTableToolbar = ({ numSelected, handleOpenModalConfirm }) => {
  return numSelected > 0 ? (
    <Toolbar
      sx={{
        pl: { sm: 8 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <span>Đã chọn {numSelected} dòng </span>
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleOpenModalConfirm}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  ) : null;
};

const TableHodan = ({ dsHodan = [], daily2Id, setRowsRemoved }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalConfirmOpen, setModalConfirmOpen] = React.useState(false);
  const [modalChitietOpen, setModalChitietOpen] = React.useState(false);
  const [hodanInfo, setHodanInfo] = React.useState(null);

  const handleOpenModalChitiet = async (id) => {
    const data = await apiHodan.singleHodan(id);
    console.log(data);
    setHodanInfo(data.hodan);
    setModalChitietOpen(true);
  };

  const handleOpenModalConfirm = async (id) => setModalConfirmOpen(true);

  const handleDeleteRow = async () => {
    const data = await apiDaily2.xoaNhieuHodan({
      daily2Id,
      arrayOfId: selected,
    });
    if (data.success) {
      Toastify({
        text: "Xóa hộ dân thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setRowsRemoved(true);
    }
  };

  const handleCloseModalChitiet = () => setModalChitietOpen(false);
  const handleCloseModalConfirm = () => setModalConfirmOpen(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsHodan.map((item) => item._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsHodan.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOpenModalConfirm={handleOpenModalConfirm}
          />
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
                rowCount={dsHodan.length}
                headCells={headCellsHodan}
              />
              <TableBody>
                {dsHodan
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
                          <Link
                            to="#"
                            onClick={() => handleOpenModalChitiet(row._id)}
                          >
                            {row.daidien}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{row.sdt}</TableCell>
                        <TableCell align="right">{row.cmnd}</TableCell>
                        <TableCell align="right">{row.namsinh}</TableCell>
                        <TableCell align="right">{row.tenlangnghe}</TableCell>
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
            count={dsHodan.length}
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

      <HodanChitiet
        open={modalChitietOpen}
        onClose={handleCloseModalChitiet}
        hodan={hodanInfo}
      />

      <DialogMaterial
        open={modalConfirmOpen}
        onClose={handleCloseModalConfirm}
        title="Xóa đại lý"
        content="Bạn chắc xóa những hộ dân này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleCloseModalConfirm}
        onClick2={handleDeleteRow}
      />
    </>
  );
};

export default TableHodan;
