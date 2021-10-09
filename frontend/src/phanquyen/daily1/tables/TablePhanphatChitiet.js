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

const TablePhanphatChitiet = ({ rows, handleClickOpen }) => {
  //   const { setItems, rows } = props;
  // const [rows, setRows] = React.useState(props.rows);

  const handleDeleteRow = (id) => {
    // setRows(rows.filter((row) => row._id !== id));
    // setItems(rows.filter((row) => row._id !== id));
  };

  const compareSoluong = (sl, slphatphat) => {
    if (parseInt(slphatphat) > sl) {
      return sl;
    } else if (parseInt(slphatphat) === 0) {
      return 1;
    } else {
      return slphatphat;
    }
  };

  const handleChangeSoluong = (e, _row) => {
    let val = e.target.value;

    if (isNaN(val)) {
      e.target.value = 1;
    } else {
      const rs = rows.map((row) => {
        if (row._id === _row._id) {
          return {
            ...row,
            soluongphanphat: compareSoluong(row.soluong, e.target.value),
          };
        } else {
          return row;
        }
      });
      // setRows(rs);
      // setItems(rs);
    }
  };

  React.useEffect(() => {
    // setItems(rows);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        className="chitietCongcuPhanphat"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Hình ảnh</StyledTableCell>
            <StyledTableCell>Tên công cụ</StyledTableCell>
            <StyledTableCell>Công dụng</StyledTableCell>
            <StyledTableCell>Số lượng cấp</StyledTableCell>
            <StyledTableCell>Ngày cấp</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.items.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <img
                  src={
                    row.congcu?.hinhanh
                      ? `/uploads/${row.congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row.congcu?.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>
                <span onClick={() => handleClickOpen(row.congcu?._id)}>
                  {row.congcu.ten}
                </span>
              </StyledTableCell>
              <StyledTableCell>{row.congcu.congdung}</StyledTableCell>
              <StyledTableCell>{row.soluongphanphat}</StyledTableCell>
              <StyledTableCell>{rows.ngaytao}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePhanphatChitiet;
