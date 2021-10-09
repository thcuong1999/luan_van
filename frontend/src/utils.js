export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const getCurrentDatetime = () => {
  let currentdate = new Date();
  return `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
};

export const getXa = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[0];
};

export const gethuyen = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[1];
};

export const getTinh = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[2];
};
