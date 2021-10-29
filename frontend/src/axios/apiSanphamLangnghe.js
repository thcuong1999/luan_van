import axiosClient from "./axiosClient";

const apiSanphamLangnghe = {
  // them sp lang nghe
  themSanpham(data) {
    const url = "/sanphamlangnghe/them";
    return axiosClient.post(url, data);
  },

  // lay danh sach sp lang nghe
  dsSanpham() {
    const url = "/sanphamlangnghe/danhsach";
    return axiosClient.get(url);
  },

  // xoa nhieu sp lang nghe
  xoaNhieuSanpham(arrOfIds) {
    const url = `/sanphamlangnghe/xoanhieusplangnghe`;
    return axiosClient.put(url, arrOfIds);
  },

  // lay thong tin 1 sp lang nghe
  singleSanpham(id) {
    const url = `/sanphamlangnghe/single/${id}`;
    return axiosClient.get(url);
  },

  // cap nhat 1 sp lang nghe
  capnhat1Sanpham(id, payload) {
    const url = `/sanphamlangnghe/single/${id}`;
    return axiosClient.put(url, payload);
  },
};

export default apiSanphamLangnghe;
