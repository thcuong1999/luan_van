import axiosClient from "./axiosClient";

const apiPhanphat = {
  // them phan phat
  themPhanphat(data) {
    const url = "/phanphat/them";
    return axiosClient.post(url, data);
  },

  // chinh sua phan phat
  suaPhanphat(id, data) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay danh sach phan phat
  dsPhanphat() {
    const url = "/phanphat/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat
  singlePhanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.get(url);
  },

  // nhap cong cu vao kho
  nhapKhoCongcu(payload) {
    const url = `/phanphat/nhapkhocongcu`;
    return axiosClient.put(url, payload);
  },

  // daily1 pp -> daily2
  daily1ppDaily2(payload) {
    const url = `/phanphat/daily1ppdaily2`;
    return axiosClient.put(url, payload);
  },

  // hoan thanh phan phat (ho dan xac nhan)
  hoanthanhPhanphat(payload) {
    const url = `/phanphat/hoanthanhpp`;
    return axiosClient.put(url, payload);
  },

  // daily2 pp -> hodan
  daily2ppHodan(payload) {
    const url = `/phanphat/daily2pphodan`;
    return axiosClient.put(url, payload);
  },

  xoa1Phanphat(id) {
    const url = `/phanphat/single/${id}`;
    return axiosClient.delete(url);
  },

  dsPhanphatDenDaily1(id) {
    const url = `/phanphat/daily1/${id}`;
    return axiosClient.get(url);
  },

  dsPhanphatDenDaily2(id) {
    const url = `/phanphat/daily2/${id}`;
    return axiosClient.get(url);
  },

  xacnhandaydu(data) {
    const url = "/phanphat/xacnhandaydu";
    return axiosClient.put(url, data);
  },

  baocaothieu(data) {
    const url = "/phanphat/baocaothieu";
    return axiosClient.put(url, data);
  },

  //========================================================

  // them phan phat vattu
  themPhanphatVattu(payload) {
    const url = "/phanphat/themppvattu";
    return axiosClient.post(url, payload);
  },

  // chinh sua phan phat vat tu
  suaPhanphatVattu(id, data) {
    const url = `/phanphat/capnhatvattupp/${id}`;
    return axiosClient.put(url, data);
  },

  // lay danh sach phan phat cong cu
  dsCongcuPhanphat(bophankdId) {
    const url = `/phanphat/dscongcuphanphat/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach phan phat vat tu
  dsVattuPhanphat(bophankdId) {
    const url = `/phanphat/dsvattuphanphat/${bophankdId}`;
    return axiosClient.get(url);
  },

  // nhap VAT TU vao kho
  nhapKhoVattu(payload) {
    const url = `/phanphat/nhapkhovattu`;
    return axiosClient.put(url, payload);
  },

  // daily1 pp VAT TU -> daily2
  daily1ppvattuDaily2(payload) {
    const url = `/phanphat/daily1ppvattudaily2`;
    return axiosClient.put(url, payload);
  },

  // daily2 pp VAT TU -> hodan
  daily2ppvattuHodan(payload) {
    const url = `/phanphat/daily2ppvattuhodan`;
    return axiosClient.put(url, payload);
  },

  // hoan thanh phan phat (ho dan xac nhan) VAT TU
  hoanthanhVattuPhanphat(payload) {
    const url = `/phanphat/hoanthanhvattupp`;
    return axiosClient.put(url, payload);
  },
};

export default apiPhanphat;
