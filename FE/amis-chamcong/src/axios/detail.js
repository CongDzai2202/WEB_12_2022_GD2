import axios from "axios";

const API = "https://localhost:7103/api/v1/RestDetails";

const AXIOS_RESTDETAIL = {
  /**
   * API lấy mã nhân viên mới
   * Created By: NVTAN (08/03/2023)
   */
  async getAllRestDetail() {
    return await axios.get(`${API}`);
  },

  /**
   * API Tìm kiếm và phân trang
   * Created By: NVTAN (08/03/2023)
   */
  async getRestDetailSearchPaging(filters, params) {
    return await axios.post(`${API}/filter`, filters, { params });
  },

  /**
   * API lấy thông tin đơn qua id
   * Created By: NVTAN (08/03/2023)
   */
  async getRestDetailById(param) {
    return await axios.get(`${API}/${param}`);
  },
  /**
   * API Thêm
   * Created By: NVTAN (08/03/2023)
   */
  async postNewRestDetail(param) {
    return await axios.post(`${API}`, param);
  },
  /**
   * API Sửa
   * Created By: NVTAN (08/03/2023)
   */
  async updateRestDetail(id, param) {
    return await axios.put(`${API}/${id}`, param);
  },
  /**
   * API xóa đơn
   * Created By: NVTAN (08/03/2023)
   */
  async deleteRest(param) {
    return await axios.delete(`${API}/${param}`);
  },
  /**
   * API xóa nhiều đơn
   * Created By: NVTAN (08/03/2023)
   */
  async deleteMultipleRest(params) {
    return await axios.delete(`${API}/restDetailIds/`, { data: params });
  },
  /**
   * API cập nhật trạng thái cho nhiều đơn
   * Created By: NVTAN (08/03/2023)
   */
  async updateMultipleRestDetail(id, params) {
    return await axios.put(`${API}/updateRestDetail/${id}`, params);
  },
  /**
   * API xuất khẩu dữ liệu
   * Created By: NVTAN (08/03/2023)
   */
  async exportToExcel(params) {
    return await axios.post(`${API}/export`, params, {
      responseType: "blob",
    });
  },
};
export default AXIOS_RESTDETAIL;
