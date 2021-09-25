import axiosClient from "./axiosClient";

const apiPhanphat = {
  themPhanphat(data) {
    const url = "/phanphat/them";
    return axiosClient.post(url, data);
  },

  suaPhanphat(id, data) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsPhanphat() {
    const url = "/phanphat/danhsach";
    return axiosClient.get(url);
  },

  singlePhanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Phanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiPhanphat;
