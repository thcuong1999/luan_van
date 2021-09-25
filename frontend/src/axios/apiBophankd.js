import axiosClient from "./axiosClient";

const apiBophankd = {
  singleBophankdBasedUser(userId) {
    const url = `/bophankd/user/${userId}`;
    return axiosClient.get(url);
  },

  //   themBophankd(data) {
  //     const url = "/bophankd/them";
  //     return axiosClient.post(url, data);
  //   },

  //   suaBophankd(id, data) {
  //     const url = `/bophankd/single/${id}`;
  //     return axiosClient.put(url, data);
  //   },

  //   dsBophankd() {
  //     const url = "/bophankd/danhsach";
  //     return axiosClient.get(url);
  //   },

  //   singleBophankd(id) {
  //     const url = `/bophankd/single/${id}`;
  //     return axiosClient.get(url);
  //   },

  //   xoa1Bophankd(id) {
  //     const url = `/bophankd/single/${id}`;
  //     return axiosClient.delete(url);
  //   },
};

export default apiBophankd;
