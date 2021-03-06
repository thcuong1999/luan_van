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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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

const TablePhanphatDi2 = ({
  danhsachCongcu = [],
  setDanhsachCongcu,
  handleRemoveRow,
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
      const updatedDsCongcu = danhsachCongcu.map((item) => {
        if (item._id === row._id) {
          return {
            ...item,
            soluongphanphat: compareSoluong(item.slsaukhipp, e.target.value),
          };
        } else {
          return item;
        }
      });
      setDanhsachCongcu(updatedDsCongcu);
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
            <StyledTableCell>H??nh ???nh</StyledTableCell>
            <StyledTableCell>T??n v???t t??</StyledTableCell>
            <StyledTableCell>C??ng d???ng</StyledTableCell>
            <StyledTableCell>S??? l?????ng</StyledTableCell>
            <StyledTableCell>S??? l?????ng ph??n ph??t</StyledTableCell>
            <StyledTableCell>X??a</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {danhsachCongcu.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={
                    row.hinhanh ? `/uploads/${row.hinhanh}` : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>{row.ten}</StyledTableCell>
              <StyledTableCell>{row.congdung}</StyledTableCell>
              <StyledTableCell>{row.slsaukhipp}</StyledTableCell>
              <StyledTableCell>
                <input
                  type="text"
                  value={row.soluongphanphat}
                  onChange={(e) => handleChangeSoluong(e, row)}
                />
              </StyledTableCell>
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

export default TablePhanphatDi2;
