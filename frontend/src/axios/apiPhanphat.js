import axiosClient from "./axiosClient";

const apiPhanphat = {
  // them phan phat
  themPhanphat(data) {
    const url = "/phanphat/them";
    return axiosClient.post(url, data);
  },

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
