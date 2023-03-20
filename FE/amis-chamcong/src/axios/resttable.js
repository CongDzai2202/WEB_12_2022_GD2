import { MISAResource } from "@/js/base/resource";
import axios from "axios";
const API = `${MISAResource.API.API}/RestTables`;

const AXIOS_RESTTABLE = {
  /**
   * API lấy danh sách cột của bảng đơn
   * Created By: NVTAN (14/03/2023)
   */
  async getAllRestTable() {
    return await axios.get(API);
  },
  /**
   * API xóa danh sách cột của bảng đơn
   * Created By: NVTAN (14/03/2023)
   */
  async deleteAllRestTable() {
    return await axios.delete(API);
  },
  /**
   * API xóa danh sách cột của bảng đơn
   * Created By: NVTAN (14/03/2023)
   */
  async insertMulptyRestTable(params) {
    return await axios.post(API , params);
  },
};
export default AXIOS_RESTTABLE;
