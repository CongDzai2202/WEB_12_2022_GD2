export const MISAResource = {
  API:{
    API: "https://localhost:7103/api/v1"
  },
  NODATA:{
    NODATA: "Không có dữ liệu"
  },
  MSG: {
    DEL_SUCCESS: "Xóa nhân viên thành công!",
    ERROR_DUPLICATE: "đã tồn tại.",
    ERROR_NEWEMPCODE: "Lỗi Server call new EmpCode",
  },
  LABEL_INPUT: {
    FULLNAME: "Người nộp đơn",
    DEPARTMENTNAME: "Đơn vị công tác",
    SUBMITDATE: "Ngày nộp đơn",
    DATEFROM: "Từ ngày",
    DATETO: "Đến ngày",
    NUMREST: "Số ngày nghỉ",
    HOURREST: "Số giờ nghỉ",
    TYPEREST: "Loại nghỉ",
    SALARY_PERCENT: "Tỷ lệ hưởng lương (%)",
    DAY_USE: "Số NP được sử dụng",
    DAY_USED: "Số NP đã nghỉ",
    DAY_LEFTS: "Số NP còn lại",
    DAY_MAX: "Số ngày nghỉ tối đa",
    DAY_NORMAL_USED: "Số ngày nghỉ đã nghỉ",
    DAY_COMPENSATION: "Số ngày nghỉ còn lại",
    HOUR_COMPENSATION: "Số giờ nghỉ bù còn lại",
    REASON_REST: "Lý do nghỉ",
    APPLYPERSON_NAME: "Người duyệt",
    SWAPPERSON_NAME: "Người thay thế",
    RELATEPERSON_NAME: "Người liên quan",
    STATUS_NAME: "Trạng thái",
    NOTEREST: "Ghi chú"
  },
  VALIDATE: {
    FULLNAME: "Người nộp đơn không được để trống.",
    APPLYPERSON_NAME: "Người duyệt không được để trống.",
    SWAPPERSON_NAME: "Người thay thế không được để trống.",
    RELATEPERSON_NAME: "",
    SUMIT_DATE: "Ngày nộp đơn không được để trống.",
    FROM_DATE: "Từ ngày không được để trống.",
    TO_DATE: "Đến không được để trống.",
    TYPEREST: "Loại nghỉ không được để trống.",
    STATUS: "Trạng thái không được để trống.",
    REASON_REST: "Lý do nghỉ không được để trống.",
    NUMREST_LIMIT: "Số ngày nghỉ phép không được lớn hơn số ngày nghỉ phép còn lại.",
    HOURSREST_LIMIT: "Số giờ nghỉ không được lớn hơn số giờ nghỉ còn lại.",
    DAYSREST_LIMIT: "Số ngày nghỉ không được lớn hơn số ngày nghỉ còn lại."
  },
  CONTENT_POPUP: {
    DELETE_MULPTY: "Bạn có chắc chắn muốn những xóa đơn này không?",
    DELETE_ONE: "Bạn có chắc chắn muốn xóa đơn này không?",
    DATA_CHANGED: "Thông tin đã được thay đổi. Bạn có muốn lưu lại không?",
  },
  STATUS_NAME: {
    APPROVED: "Đã duyệt",
    PENDING: "Chờ duyệt",
    REFUSE: "Từ chối",
  },
  TOAST: {
    MESSAGE_DELETE: "Xóa thành công",
    MESSAGE_UPDATE: "Sửa thành công",
    MESSAGE_ADD: "Thêm thành công",
    TYPE_SUCCESS: "success",
    TYPE_ERROR: "error",
  },
  TITLE_FORM: {
    ADD: "Thêm mới đơn xin nghỉ",
    UPDATE: "Sửa đơn xin nghỉ",
  },
};
