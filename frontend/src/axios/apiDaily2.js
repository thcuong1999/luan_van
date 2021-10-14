import axiosClient from "./axiosClient";

const apiDaily2 = {
  // them daily 2
  themDaily2(data) {
    const url = "/daily2/them";
    return axiosClient.post(url, data);
  },

  // daily2 them hodan
  themHodan(payload) {
    const url = "/daily2/themhodan";
    return axiosClient.put(url, payload);
  },

  // lay thong tin daily 2
  singleDaily2(daily2Id) {
    const url = `/daily2/single/${daily2Id}`;
    return axiosClient.get(url);
  },

  // chinh sua 2 dai ly 2
  suaDaily2(id, data) {
    const url = `/daily2/single/${id}`;
    return axiosClient.put(url, data);
  },

  // danh sach daily 2
  dsDaily2() {
    const url = "/daily2/danhsach";
    return axiosClient.get(url);
  },

  // danh sach hodan thuoc daily 2
  dsHodan(daily2Id) {
    const url = `/daily2/dshodan/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds phan phat thuoc daily2
  dsPhanphat(daily2Id) {
    const url = `/daily2/dsphanphat/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuoc daily2
  singlePhanphat(daily2Id, phanphatId) {
    const url = `/daily2/singlephanphat/${daily2Id}/${phanphatId}`;
    return axiosClient.get(url);
  },

  // lay ds daily 2 + daily1: null
  dsDaily2Daily1Null() {
    const url = "/daily2/dsdly2dly1null";
    return axiosClient.get(url);
  },

  // // lay thong tin 2 daily 2
  // singleDaily2(id) {
  //   const url = `/daily2/single/${id}`;
  //   return axiosClient.get(url);
  // },

  // xoa 1 dai ly 2
  xoa1daily2(id) {
    const url = `/daily2/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu daily 2
  xoaNhieuDaily2(arrOfId) {
    const url = `/daily2/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(payload) {
    const url = `/daily2/xoanhieuhodan`;
    return axiosClient.put(url, payload);
  },

  // lay thong daily1 based userId
  singleBophankdBasedUser(userId) {
    const url = `/daily2/user/${userId}`;
    return axiosClient.get(url);
  },

  dsCongcu(daily1Id) {
    const url = `/daily2/danhsachcongcu/${daily1Id}`;
    return axiosClient.get(url);
  },
};

export default apiDaily2;
