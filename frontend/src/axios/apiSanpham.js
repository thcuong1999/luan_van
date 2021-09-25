import axiosClient from "./axiosClient";

const apiSanpham = {
  themSanpham(data) {
    const url = "/sanpham/them";
    return axiosClient.post(url, data);
  },

  suaSanpham(id, data) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsSanpham() {
    const url = "/sanpham/danhsach";
    return axiosClient.get(url);
  },

  singleSanpham(id) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Sanpham(id) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.delete(url);
  },

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
