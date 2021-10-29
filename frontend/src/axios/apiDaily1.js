import axiosClient from "./axiosClient";

const apiDaily1 = {
  // them daily 1
  themDaily1(data) {
    const url = "/daily1/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 dai ly 1
  suaDaily1(id, data) {
    const url = `/daily1/single/${id}`;
    return axiosClient.put(url, data);
  },

  // danh sach daily 1
  dsDaily1() {
    const url = "/daily1/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 daily 1
  singleDaily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.get(url);
  },

  // lay ds daily 1 chưa có bộ phận kinh doanh
  dsDaily1BpkdNull() {
    const url = "/daily1/dsdaily1bpkdnull";
    return axiosClient.get(url);
  },

  // lay ds CONG CU phan phat thuoc daily1
  dsPhanphat(daily1Id) {
    const url = `/daily1/dsphanphat/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds VAT TU phan phat thuoc daily1
  dsVattuPhanphat(daily1Id) {
    const url = `/daily1/dsvattuphanphat/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuocd daily1
  singlePhanphat(daily1Id, phanphatId) {
    const url = `/daily1/singlephanphat/${daily1Id}/${phanphatId}`;
    return axiosClient.get(url);
  },

  // xoa 1 dai ly 1
  xoa1Daily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu daily 1
  xoaNhieuDaily1(arrOfId) {
    const url = `/daily1/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // xoa nhieu daily 2
  xoaNhieuDaily2(payload) {
    const url = `/daily1/xoanhieudaily2`;
    return axiosClient.put(url, payload);
  },

  // lay thong tin daily1 based userId
  singleDaily1BasedUser(userId) {
    const url = `/daily1/user/${userId}`;
    return axiosClient.get(url);
  },

  // daily1 them daily2
  themDaily2(data) {
    const url = `/daily1/themdaily2`;
    return axiosClient.put(url, data);
  },

  // lay danh sach daily 2 thuoc daily 1
  dsDaily2(daily1Id) {
    const url = `/daily1/dsdaily2/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach CONG CU thuoc daily1
  dsCongcu(daily1Id) {
    const url = `/daily1/danhsachcongcu/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach VAT TU thuoc daily1
  dsVattu(daily1Id) {
    const url = `/daily1/danhsachvattu/${daily1Id}`;
    return axiosClient.get(url);
  },
};

export default apiDaily1;
