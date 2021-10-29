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

const TablePhanphatChitiet = ({ dsCongcu = [], phanphat }) => {
  console.log({ DSCC: dsCongcu });
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
          </TableRow>
        </TableHead>
        <TableBody>
          {dsCongcu.map((row) => (
            <StyledTableRow key={row.congcu._id}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={
                    row?.congcu.hinhanh
                      ? `/uploads/${row?.congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row?.congcu?.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>{row?.congcu?.ten}</StyledTableCell>
              <StyledTableCell>{row?.congcu?.congdung}</StyledTableCell>
              <StyledTableCell>{row?.congcu?.soluong}</StyledTableCell>
              <StyledTableCell>
                <input type="text" value={row?.soluongphanphat} />
              </StyledTableCell>
              <StyledTableCell>{phanphat.ngaytao}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePhanphatChitiet;
