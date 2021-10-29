import axiosClient from "./axiosClient";

const apiNhanhieu = {
  // them nhanhieu
  themNhanhieu(data) {
    const url = "/nhanhieu/them";
    return axiosClient.post(url, data);
  },

  // lay danh sach nhan hieu
  dsNhanhieu() {
    const url = "/nhanhieu/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 nhan hieu
  singleNhanhieu(id) {
    const url = `/nhanhieu/single/${id}`;
    return axiosClient.get(url);
  },

  // Cap nhat 1 nhan hieu
  capnhatNhanhieu(nhanhieuId, payload) {
    const url = `/nhanhieu/single/${nhanhieuId}`;
    return axiosClient.put(url, payload);
  },

  // Xoa nhieu nhan hieu
  xoaNhieuNhanhieu(arrOfIds) {
    const url = `/nhanhieu/xoanhieunhanhieu`;
    return axiosClient.put(url, arrOfIds);
  },
};

export default apiNhanhieu;
