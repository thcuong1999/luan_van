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

const EnhancedTableToolbar = (props) => {
  const { numSelected, selectedCongcu } = props;
  let history = useHistory();

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "phanphat") {
      history.push({
        pathname: "/bophankd/phanphat/them",
        state: { congcu: selectedCongcu },
      });
    }
  };

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
      id="tableCongcuToolbar"
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <div className="d-flex align-items-center">
            <span>Đã chọn {numSelected} công cụ</span>
            <select onChange={handleChange}>
              <option value="">Chọn thao tác</option>
              <option value="phanphat">Phân phát công cụ</option>
            </select>
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

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  ) : null;
};

const TableCongcu = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // api
  const [loading, setLoading] = React.useState(false);
  const [congcu, setCongcu] = React.useState([]);

  // console.log(selected);

  const fetchCongcu = async () => {
    setLoading(true);
    const data = await apiCongcu.dsCongcu();
    setCongcu(data.congcu);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //===
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = congcu.map((item) => item);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, rowObj) => {
    const selectedIndex = selected.indexOf(rowObj);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowObj);
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

  const isSelected = (rowObj) => selected.indexOf(rowObj) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - congcu.length) : 0;

  const generateDateString = (dateStr) => {
    return dateStr.slice(0, 10);
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedCongcu={selected}
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
              rowCount={congcu.length}
              headCells={headCellsCongcu}
            />
            <TableBody>
              {congcu
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
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
                        <Link to={`/bophankd/congcu/chitiet/${row._id}`}>
                          {row.ten}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.soluong}</TableCell>
                      <TableCell align="right">{row.congdung}</TableCell>
                      <TableCell align="right">
                        {generateDateString(row.createdAt)}
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
          count={congcu.length}
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

export default TableCongcu;
