import axiosClient from "./axiosClient";

const apiKhohang = {
  dsSPKhohang() {
    const url = "/khohang/danhsach";
    return axiosClient.get(url);
  },
};

export default apiKhohang;
