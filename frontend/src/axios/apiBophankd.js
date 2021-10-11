import axiosClient from "./axiosClient";

const apiBophankd = {
  // them bpkd
  themBophankd(data) {
    const url = "/bophankd/them";
    return axiosClient.post(url, data);
  },

  // lay ds bpkd
  dsBophankd() {
    const url = "/bophankd/danhsach";
    return axiosClient.get(url);
  },

  // lay 1 bpkd
  singleBophankd(id) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 bpkd
  xoa1Bophankd(id) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu bpkd
  xoaNhieuBophankd(arrOfId) {
    const url = `/bophankd/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // sua 1 bpkd
  suaBophankd(id, data) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay thong tin 1 bpkd dua tren userId
  bophankdBasedUserId(userId) {
    const url = `/bophankd/baseduserid/${userId}`;
    return axiosClient.get(url);
  },

  // lay danh sach san pham thuoc bophankdId
  bophankdDSSanpham(bophankdId) {
    const url = `/bophankd/dssanpham/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach cong cu thuoc bophankd
  bophankdDSCongcu(bophankdId) {
    const url = `/bophankd/dscongcu/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach sp trong khohang
  bophankdDsspKhohang(bophankdId) {
    const url = `/bophankd/dsspkhohang/${bophankdId}`;
    return axiosClient.get(url);
  },

  //=== lay danh sach daily 1 thuoc bophankd
  bophankdDsDaily1(bophankdId) {
    const url = `/bophankd/dsdaily1/${bophankdId}`;
    return axiosClient.get(url);
  },

  //=== lay danh sach phan phat cua bophankd
  dsPhanphat(bophankdId) {
    const url = `/bophankd/dsphanphat/${bophankdId}`;
    return axiosClient.get(url);
  },

  // xoa 1 sp thuoc bophankd
  bophankdXoaSanpham(payload) {
    const url = `/bophankd/xoasanpham`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` sp thuoc bophankd
  bophankdXoaNhieuSP(payload) {
    const url = `/bophankd/xoanhieusp`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` cc thuoc bophankd
  bophankdXoaNhieuCC(payload) {
    const url = `/bophankd/xoanhieucc`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` daily 1 thuoc bophankd
  bophankdXoaNhieuDaily1(payload) {
    const url = `/bophankd/xoanhieudaily1`;
    return axiosClient.put(url, payload);
  },

  // xoa 1 congcu thuoc bophankd
  bophankdXoaCongcu(payload) {
    const url = `/bophankd/xoacongcu`;
    return axiosClient.put(url, payload);
  },

  //them daily 1
  bophankdThemDaily1(data) {
    const url = `/bophankd/themdaily1`;
    return axiosClient.put(url, data);
  },
};

export default apiBophankd;
