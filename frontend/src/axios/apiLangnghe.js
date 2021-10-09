import axiosClient from "./axiosClient";

const apiLangnghe = {
  // them langnghe
  themLangnghe(data) {
    const url = "/langnghe/them";
    return axiosClient.post(url, data);
  },

  // lay thong tin 1 langnghe
  singleLangnghe(langngheId) {
    const url = `/langnghe/chitiet/${langngheId}`;
    return axiosClient.get(url);
  },

  // lay ds Langnghe
  dsLangnghe() {
    const url = "/langnghe/danhsach";
    return axiosClient.get(url);
  },

  // chinh sua Langnghe
  chinhsuaLangnghe(langngheId, data) {
    const url = `/langnghe/chinhsua/${langngheId}`;
    return axiosClient.put(url, data);
  },

  // xoa nhieu` Langnghe
  xoaNhieuLangnghe(arrayOfId) {
    const url = `/langnghe/multiple`;
    return axiosClient.put(url, arrayOfId);
  },
};

export default apiLangnghe;
