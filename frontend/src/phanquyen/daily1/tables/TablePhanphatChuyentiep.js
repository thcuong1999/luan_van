import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import img_placeholder from "../../../assets/images/img_placeholder.png";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TablePhanphatChuyentiep = ({
  dsCongcu = [],
  setSingleCongcu,
  handleOpenModal,
}) => {
  const handleClick = (congcu) => {
    setSingleCongcu(congcu);
    handleOpenModal();
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
            <StyledTableCell>Số lượng phân phát</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dsCongcu.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={
                    row?.congcu.hinhanh
                      ? `/uploads/${row?.congcu.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row?.congcu.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>
                <Link to="#" onClick={() => handleClick(row.congcu)}>
                  {row?.congcu.ten}
                </Link>
              </StyledTableCell>
              <StyledTableCell>{row?.congcu.congdung}</StyledTableCell>
              <StyledTableCell>{row?.soluongphanphat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePhanphatChuyentiep;
