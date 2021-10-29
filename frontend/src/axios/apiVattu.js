import axiosClient from "./axiosClient";

const apiVattu = {
  themVattu(data) {
    const url = "/vattu/them";
    return axiosClient.post(url, data);
  },

  suaVattu(id, data) {
    const url = `/vattu/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsVattu() {
    const url = "/vattu/danhsach";
    return axiosClient.get(url);
  },

  singleVattu(id) {
    const url = `/vattu/single/${id}`;
    return axiosClient.get(url);
  },

  xoa1Vattu(id) {
    const url = `/vattu/single/${id}`;
    return axiosClient.delete(url);
  },

  // them vat tu loi
  themVattuLoi(payload) {
    const url = "/vattu/themvattuhuloi";
    return axiosClient.put(url, payload);
  },
};

export default apiVattu;
