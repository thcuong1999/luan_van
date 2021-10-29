import * as React from "react";
import { styled as styled1 } from "@mui/material/styles";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import img_placeholder from "../../../assets/images/img_placeholder.png";

const StyledTableCell = styled1(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled1(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableBaocaoThieu = ({ rows, setCongcuThieu }) => {
  const [dsCongcu, setDsCongcu] = React.useState([]);
  // console.log({ rows });

  // const compareSoluong = (slcap, slthieu) => {
  //   // console.log({ slcap, slthieu });
  //   if (parseInt(slthieu) > slcap) {
  //     return slcap;
  //   } else {
  //     return slthieu;
  //   }
  // };

  // const handleChangeSlThieu = (e, row) => {
  //   let val = e.target.value;
  //   if (isNaN(val)) {
  //     e.target.value = 1;
  //   } else {
  //     setDsCongcu(
  //       dsCongcu.map((item) => {
  //         if (item._id === row._id) {
  //           item.soluongthieu = compareSoluong(item.soluongphanphat, val);
  //         }
  //         return item;
  //       })
  //     );
  //     setCongcuThieu(dsCongcu);
  //   }
  // };

  React.useEffect(() => {
    const mappedState = rows?.items.map((item) => ({
      selected: false,
      soluongthieu: "",
      ...item,
    }));
    // console.log(mappedState);
    setDsCongcu(mappedState);
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
            <StyledTableCell />
            <StyledTableCell>Hình ảnh</StyledTableCell>
            <StyledTableCell>Tên công cụ</StyledTableCell>
            <StyledTableCell>Số lượng cấp</StyledTableCell>
            <StyledTableCell>Số lượng thiếu</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.thieu.map((row) => (
            <StyledTableRow key={row?._id}>
              <StyledTableCell />
              <StyledTableCell component="th" scope="row">
                <Image
                  src={
                    row?.congcu?.hinhanh
                      ? `/uploads/${row?.congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  style={{ width: "30px" }}
                  className={!row?.congcu?.hinhanh && "noImage"}
                />
              </StyledTableCell>
              <StyledTableCell>{row?.congcu.ten}</StyledTableCell>
              <StyledTableCell>{row?.soluongphanphat}</StyledTableCell>
              <StyledTableCell>
                <input
                  type="text"
                  style={slnhanduocfield}
                  value={row?.soluongthieu}
                  disabled
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Image = styled.img`
  width: 30px;
  &.noImage {
    opacity: 0.15;
  }
`;
const slnhanduocfield = {
  outline: "none",
  width: 50,
  borderWidth: 1,
  color: "#333",
  borderColor: "#ddd",
  textAlign: "center",
};

export default TableBaocaoThieu;
