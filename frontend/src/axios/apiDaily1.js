import axiosClient from "./axiosClient";

const apiDaily1 = {
  themDaily1(data) {
    const url = "/daily1/them";
    return axiosClient.post(url, data);
  },

  suaDaily1(id, data) {
    const url = `/daily1/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsDaily1() {
    const url = "/daily1/danhsach";
    return axiosClient.get(url);
  },

  singleDaily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Daily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.delete(url);
  },

  singleBophankdBasedUser(userId) {
    const url = `/daily1/user/${userId}`;
    return axiosClient.get(url);
  },
};

export default apiDaily1;
