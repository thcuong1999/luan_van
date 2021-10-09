import axiosClient from "./axiosClient";

const apiGSV = {
  // them gsv
  themGsv(data) {
    const url = "/gsv/them";
    return axiosClient.post(url, data);
  },

  // lay thong tin 1 gsv
  singleGsv(gsvId) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.get(url);
  },

  // sua thong tin 1 gsv
  chinhsuaGsv(gsvId, data) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.put(url, data);
  },

  // xoa nhieu` gsv
  xoaNhieuGsv(arrayOfId) {
    const url = `/gsv/multiple`;
    return axiosClient.put(url, arrayOfId);
  },

  // lay thong tin 1 gsv based useId
  singleGsvBasedUserId(userId) {
    const url = `/gsv/baseduserid/${userId}`;
    return axiosClient.get(url);
  },

  // lay ds gsv
  dsGsv() {
    const url = "/gsv/danhsach";
    return axiosClient.get(url);
  },
};

export default apiGSV;
