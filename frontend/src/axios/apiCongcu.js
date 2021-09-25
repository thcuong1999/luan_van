import axiosClient from "./axiosClient";

const apiCongcu = {
  themCongcu(data) {
    const url = "/congcu/them";
    return axiosClient.post(url, data);
  },

  suaCongcu(id, data) {
    const url = `/congcu/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsCongcu() {
    const url = "/congcu/danhsach";
    return axiosClient.get(url);
  },

  singleCongcu(id) {
    const url = `/congcu/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Congcu(id) {
    const url = `/congcu/single/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiCongcu;
