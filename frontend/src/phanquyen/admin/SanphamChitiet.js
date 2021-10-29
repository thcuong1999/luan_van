import React, { useEffect, useState } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import Checkbox from "@mui/material/Checkbox";

const SanphamChitiet = (props) => {
  const [sanpham, setSanpham] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: sanphamId } = props.match.params;

  const fetchSanpham = async () => {
    setLoading(true);
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    setSanpham(sanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/sanpham")}
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <h5>Thông tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Mã sản phẩm:</Label>
                    <Input type="text" value={sanpham?.ma} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input type="text" value={sanpham?.ten} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Số lượng có thể bán:</Label>
                    <Input
                      type="text"
                      style={{ width: "50%" }}
                      value={sanpham?.cotheban}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea value={sanpham?.mota} rows="5" />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Giá sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <div className="row">
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Giá bản lẻ:</Label>
                        <Input type="text" value={sanpham?.giabanle} />
                      </FormGroup>
                    </div>
                    <div className="col-lg-6">
                      <FormGroup>
                        <Label>Giá bản buôn:</Label>
                        <Input type="text" value={sanpham?.giabanbuon} />
                      </FormGroup>
                    </div>
                  </div>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Ảnh sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <Image
                    src={
                      sanpham?.hinhanh
                        ? `/uploads/${sanpham?.hinhanh}`
                        : img_placeholder
                    }
                    className={!sanpham?.hinhanh && "noImage"}
                    alt="anhsp"
                  />
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Thuộc tính</h5>
                </BoxTitle>
                <BoxContent>
                  {sanpham && sanpham.thuoctinh.length
                    ? sanpham?.thuoctinh.map((item, key) => {
                        return (
                          <div className="row">
                            <div className="col-lg-5">
                              <FormGroup style={{ marginBottom: 10 }}>
                                <Input type="text" value={item?.ten} />
                              </FormGroup>
                            </div>
                            <div className="col-lg-7">
                              <FormGroup style={{ marginBottom: 10 }}>
                                <Input type="text" value={item?.giatri} />
                              </FormGroup>
                            </div>
                          </div>
                        );
                      })
                    : "--------"}
                </BoxContent>
              </Box>
            </div>

            <div className="col-lg-4">
              <Box>
                <BoxTitle>
                  <h5>Hình thức quản lý</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Loại sản phẩm:</Label>
                    <Input type="text" value={sanpham?.loai} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Nhãn hiệu:</Label>
                    <Input type="text" value={sanpham?.nhanhieu} />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Cho phép bán</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    checked={sanpham?.chophepban}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    disabled
                  />
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <h5>Áp dụng thuế</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    checked={sanpham?.apdungthue}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    disabled
                  />
                </BoxContent>
              </Box>

              {/* <Box>
                <BoxTitle>
                  <h5>Thêm vào kho hàng</h5>
                </BoxTitle>
                <BoxContent>
                  <Checkbox
                    checked={luuvaokho}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </BoxContent>
              </Box> */}
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 20px 36px;
  font-family: "Poppins", sans-serif;
`;
const Box = styled.div`
  background: #fff;
  margin-bottom: 20px;
`;
const BoxTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  h5 {
    font-size: 16px;
    display: inline-block;
    padding: 20px;
    margin-bottom: 0;
  }
`;
const BoxContent = styled.div`
  padding: 20px;
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
`;
const Label = styled.span`
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
const Image = styled.img`
  width: 150px;
  &.noImage {
    opacity: 0.1;
  }
`;

export default SanphamChitiet;
