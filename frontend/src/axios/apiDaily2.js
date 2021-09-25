import axiosClient from "./axiosClient";

const apiDaily2 = {
  themDaily2(data) {
    const url = "/daily2/them";
    return axiosClient.post(url, data);
  },

  suaDaily2(id, data) {
    const url = `/daily2/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsDaily2() {
    const url = "/daily2/danhsach";
    return axiosClient.get(url);
  },

  singleDaily2(id) {
    const url = `/daily2/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Daily2(id) {
    const url = `/daily2/single/${id}`;
    return axiosClient.delete(url);
  },
};

export default apiDaily2;
