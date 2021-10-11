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
import BackdropMaterial from "../../../components/BackdropMaterial";
import apiCongcu from "../../../axios/apiCongcu";
import img_placeholder from "../../../assets/images/img_placeholder.png";
// ====
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
// import EnhancedTableToolbar from "../../../components/table/EnhancedTableToolbar";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsCongcu } from "./headCells";
// === toolbar
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import DropdownCustom from "../../../components/DropdownCustom";
import DialogMaterial from "../../../components/DialogMaterial";
import apiBophankd from "../../../axios/apiBophankd";
import ButtonMaterial from "../../../components/ButtonMaterial";
// modal
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TablePhanphatDi from "./TablePhanphatDi";
import ModalDaily1Select from "../ModalDaily1Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EnhancedTableToolbar = ({
  numSelected,
  rowsSelected,
  toolbarSelectedDropdownVal,
  handleRedirect,
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
                    ? ["Chi tiết công cụ", "Cập nhật công cụ", "Xóa công cụ"]
                    : ["Xóa công cụ"]
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

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <ButtonMaterial variant="contained" onClick={handleRedirect}>
                Phân phát
              </ButtonMaterial>
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  ) : null;
};

const TableCongcu = ({ dsCongcu, setRowsRemoved, bophankdId }) => {
  // console.log({ dsCongcu });
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
    if (val === "Chi tiết công cụ") {
      history.push(`/bophankd/congcu/chitiet/${selected[0]}`);
    } else if (val === "Cập nhật công cụ") {
      history.push(`/bophankd/congcu/chinhsua/${selected[0]}`);
    } else if (val === "Xóa công cụ") {
      handleOpen();
    }
  };

  const handleRedirect = () => {
    history.push({
      pathname: "/bophankd/phanphat/them",
      state: getArrOfCongcuObject(dsCongcu, selected),
    });
  };

  const handleDeleteRow = async () => {
    const data = await apiBophankd.bophankdXoaNhieuCC({
      arrayOfId: selected,
      bophankdId,
    });
    if (data.success) {
      Toastify({
        text: "Xóa đại lý thành công",
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
      const newSelecteds = dsCongcu?.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id, row) => {
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsCongcu?.length) : 0;

  const getArrOfCongcuObject = (arrOfObj, arrOfId) => {
    let arrOfCongcuObj = [];
    arrOfObj.forEach((x) => {
      arrOfId.forEach((y) => {
        if (x._id === y) {
          arrOfCongcuObj.push(x);
        }
      });
    });
    arrOfCongcuObj = arrOfCongcuObj
      .filter((item) => item.soluong > 0)
      .map((item) => ({
        ...item,
        soluongphanphat: 1,
      }));
    return arrOfCongcuObj;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            rowsSelected={selected}
            toolbarSelectedDropdownVal={toolbarSelectedDropdownVal}
            handleRedirect={handleRedirect}
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
                rowCount={dsCongcu?.length}
                headCells={headCellsCongcu}
              />
              <TableBody>
                {dsCongcu
                  ?.slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id, row)}
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
                        <TableCell>
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
                          <Link to={`/bophankd/congcu/chitiet/${row._id}`}>
                            {row.ten}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{row.slsaukhipp}</TableCell>
                        <TableCell align="right">{row.congdung}</TableCell>
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
            count={dsCongcu?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "số dòng trên trang",
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
        title="Xóa đại lý"
        content="Bạn chắc xóa những đại lý này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDeleteRow}
      />
    </>
  );
};

export default TableCongcu;
