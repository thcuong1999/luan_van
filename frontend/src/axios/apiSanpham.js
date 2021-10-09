import axiosClient from "./axiosClient";

const apiSanpham = {
  // them sp
  themSanpham(data) {
    const url = "/sanpham/them";
    return axiosClient.post(url, data);
  },

  // sua san pham
  suaSanpham(id, data) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay ds sp
  dsSanpham() {
    const url = "/sanpham/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 sp
  singleSanpham(id) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.get(url);
  },

  // lay ds loai sp
  dsLoai() {
    const url = "/sanpham/loai";
    return axiosClient.get(url);
  },

  dsNhanhieu() {
    const url = "/sanpham/nhanhieu";
    return axiosClient.get(url);
  },

  themNhanhieu(data) {
    const url = "/sanpham/nhanhieu";
    return axiosClient.post(url, data);
  },
};

export default apiSanpham;
