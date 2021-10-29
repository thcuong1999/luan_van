import * as React from "react";
import { styled as styledMaterial } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import img_placeholder from "../../../assets/images/img_placeholder.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StyledTableCell = styledMaterial(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styledMaterial(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TablePhanphatChinhsua = ({
  dsCongcu = [],
  phanphat,
  handleRemoveRow,
  setDsCongcu,
}) => {
  const compareSoluong = (sl, slphatphat) => {
    if (parseInt(slphatphat) > sl) {
      return sl;
    } else if (parseInt(slphatphat) === 0) {
      return 1;
    } else {
      return slphatphat;
    }
  };

  const handleChangeSoluong = (e, row) => {
    let val = e.target.value;
    if (isNaN(val)) {
      e.target.value = 1;
    } else {
      const updatedDsCongcu = dsCongcu.map((item) => {
        if (item._id === row._id) {
          return {
            ...item,
            soluongphanphat: compareSoluong(
              item.congcu.soluong,
              e.target.value
            ),
          };
        } else {
          return item;
        }
      });
      setDsCongcu(updatedDsCongcu);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        id="tablePhanphat"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Hình ảnh</StyledTableCell>
            <StyledTableCell>Tên công cụ</StyledTableCell>
            <StyledTableCell>Công dụng</StyledTableCell>
            <StyledTableCell>Số lượng</StyledTableCell>
            <StyledTableCell>Số lượng phân phát</StyledTableCell>
            <StyledTableCell>Ngày phân phát</StyledTableCell>
            <StyledTableCell>Xóa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dsCongcu.map((row) => (
            <StyledTableRow key={row.congcu._id}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={
                    row.congcu.hinhanh
                      ? `/uploads/${row.congcu.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row.congcu.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>{row.congcu.ten}</StyledTableCell>
              <StyledTableCell>{row.congcu.congdung}</StyledTableCell>
              <StyledTableCell>{row.congcu.slsaukhipp}</StyledTableCell>
              <StyledTableCell>
                <input
                  type="text"
                  value={row.soluongphanphat}
                  onChange={(e) => handleChangeSoluong(e, row)}
                />
              </StyledTableCell>
              <StyledTableCell>{phanphat?.ngaytao}</StyledTableCell>
              <StyledTableCell>
                <DeleteOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveRow(row._id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePhanphatChinhsua;
