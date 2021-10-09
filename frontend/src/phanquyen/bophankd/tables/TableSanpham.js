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
import { Link, useHistory } from "react-router-dom";
import img_placeholder from "../../../assets/images/img_placeholder.png";
// ====
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsSanpham } from "./headCells";
import DropdownCustom from "../../../components/DropdownCustom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import DialogMaterial from "../../../components/DialogMaterial";
import apiBophankd from "../../../axios/apiBophankd";

const EnhancedTableToolbar = ({
  numSelected,
  rowsSelected,
  toolbarSelectedDropdownVal,
}) => {
  return numSelected > 0 ? (
    <>
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
            <div className="d-flex align-items-center">
              <span>Đã chọn {numSelected} dòng</span>
              <DropdownCustom
                selected="Chọn thao tác"
                onClick={(val) => toolbarSelectedDropdownVal(val)}
                data={
                  rowsSelected.length === 1
                    ? ["Chi tiết sản phẩm", "Cập nhật sản phẩm", "Xóa sản phẩm"]
                    : ["Xóa sản phẩm"]
                }
                dropdownStyles={{ width: 250, marginLeft: 16 }}
                dropdownBtnStyles={{
                  paddingTop: 7,
                  paddingBottom: 7,
                  paddingLeft: 15,
                }}
              />
            </div>
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
      </Toolbar>
    </>
  ) : null;
};

const TableSanpham = ({ dsSanpham, khohang, setRowsRemoved, bophankdId }) => {
  // console.log({dsSanpham})
  // console.log({ khohang });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toolbarSelectedDropdownVal = (val) => {
    if (val === "Chi tiết sản phẩm") {
      history.push(`/bophankd/sanpham/chitiet/${selected[0]}`);
    } else if (val === "Cập nhật sản phẩm") {
      history.push(`/bophankd/sanpham/chinhsua/${selected[0]}`);
    } else if (val === "Xóa sản phẩm") {
      handleOpen();
    }
  };

  const handleDeleteRow = async () => {
    console.log({
      arrayOfId: selected,
      bophankdId,
    });
    const data = await apiBophankd.bophankdXoaNhieuSP({
      arrayOfId: selected,
      bophankdId,
    });
    if (data.success) {
      Toastify({
        text: "Xóa bộ phận kinh doanh thành công",
        backgroundColor: "#0DB473",
        className: "toastifyInfo",
        position: "center",
      }).showToast();
      setRowsRemoved(true);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //===
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsSanpham.map((item) => item._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsSanpham.length) : 0;

  const getSlTonkho = (rowId) => {
    const foundSp = khohang.find((item) => item.sanpham._id === rowId);
    if (foundSp) {
      return foundSp.tonkho;
    }
    return null;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            rowsSelected={selected}
            toolbarSelectedDropdownVal={toolbarSelectedDropdownVal}
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
                rowCount={dsSanpham.length}
                headCells={headCellsSanpham}
              />
              <TableBody>
                {dsSanpham
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
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <img
                            src={
                              row.hinhanh
                                ? `/uploads/${row.hinhanh}`
                                : img_placeholder
                            }
                            alt="anhcongcu"
                            style={{ width: "30px" }}
                            className={!row.hinhanh && "noImage"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`/bophankd/sanpham/chitiet/${row._id}`}>
                            {row.ten}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {row.loai === "nongsan"
                            ? "Nông sản"
                            : row.loai === "nguyenlieu"
                            ? "Nguyên liệu"
                            : "Thủ công mỹ nghệ"}
                        </TableCell>
                        <TableCell align="right">{row.nhanhieu}</TableCell>
                        <TableCell align="right">{row.cotheban}</TableCell>
                        <TableCell align="right">
                          {getSlTonkho(row._id)}
                        </TableCell>
                        <TableCell align="right">{row.ngaytao}</TableCell>
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
            count={dsSanpham.length}
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

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa bộ phận kinh doanh"
        content="Bạn chắc xóa bộ phận kinh doanh này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDeleteRow}
      />
    </>
  );
};

export default TableSanpham;
