import axiosClient from "./axiosClient";

const apiPhanphat = {
  // them phan phat
  themPhanphat(data) {
    const url = "/phanphat/them";
    return axiosClient.post(url, data);
  },

  // chinh sua phan phat
  suaPhanphat(id, data) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay danh sach phan phat
  dsPhanphat() {
    const url = "/phanphat/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat
  singlePhanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.get(url);
  },

  // nhap cong cu vao kho
  nhapKhoCongcu(payload) {
    const url = `/phanphat/nhapkhocongcu`;
    return axiosClient.put(url, payload);
  },

  // daily1 pp -> daily2
  daily1ppDaily2(payload) {
    const url = `/phanphat/daily1ppdaily2`;
    return axiosClient.put(url, payload);
  },

  xoa1Phanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.delete(url);
  },

  dsPhanphatDenDaily1(id) {
    const url = `/phanphat/daily1/${id}`;
    return axiosClient.get(url);
  },

  dsPhanphatDenDaily2(id) {
    const url = `/phanphat/daily2/${id}`;
    return axiosClient.get(url);
  },

  xacnhandaydu(data) {
    const url = "/phanphat/xacnhandaydu";
    return axiosClient.put(url, data);
  },

  baocaothieu(data) {
    const url = "/phanphat/baocaothieu";
    return axiosClient.put(url, data);
  },
};

export default apiPhanphat;
