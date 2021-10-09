import axiosClient from "./axiosClient";

const apiHodan = {
  // them ho dan
  themHodan(data) {
    const url = "/hodan/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 ho dan
  suaHodan(id, data) {
    const url = `/hodan/single/${id}`;
    return axiosClient.put(url, data);
  },

  // danh sach ho dan
  dsHodan() {
    const url = "/hodan/danhsach";
    return axiosClient.get(url);
  },

  // danh sach ho dan thuoc langngheId
  dsHodanThuoc1Langnghe(langngheId) {
    const url = `/hodan/danhsach/${langngheId}`;
    return axiosClient.get(url);
  },

  // danh sach ho dan co' daily 2 null
  dsHodanDaily2Null(langngheId) {
    const url = '/hodan/dsdaily2null';
    return axiosClient.get(url);
  },

  // lay thong tin 1 ho dan
  singleHodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 ho dan
  xoa1Hodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(arrOfId) {
    const url = `/hodan/multiple`;
    return axiosClient.put(url, arrOfId);
  },
};

export default apiHodan;
