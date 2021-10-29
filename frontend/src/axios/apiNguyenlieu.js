import axiosClient from "./axiosClient";

const apiNguyenlieu = {
  themNguyenlieu(data) {
    const url = "/nguyenlieu/them";
    return axiosClient.post(url, data);
  },

  suaNguyenlieu(id, data) {
    const url = `/nguyenlieu/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsNguyenlieu() {
    const url = "/nguyenlieu/danhsach";
    return axiosClient.get(url);
  },

  singleNguyenlieu(id) {
    const url = `/nguyenlieu/single/${id}`;
    return axiosClient.get(url);
  },
};

export default apiNguyenlieu;
