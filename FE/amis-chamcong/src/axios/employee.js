import axios from "axios";

const API = "https://localhost:7103/api/v1/Employees";

const AXIOS_EMPLOYEE = {
    /**
     * API lấy mã nhân viên mới
     * Created By: NVTAN (08/03/2023)
     */
    async getAllEmployees() {
      return await axios.get(`${API}`);
    },

}
export default AXIOS_EMPLOYEE;