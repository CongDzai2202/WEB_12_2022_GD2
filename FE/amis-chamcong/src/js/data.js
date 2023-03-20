export const TYPEREST = [
  {
    TypeRestId: 0,
    TypeRestName: "Nghỉ phép",
  },
  {
    TypeRestId: 1,
    TypeRestName: "Nghỉ bù",
  },
  {
    TypeRestId: 2,
    TypeRestName: "Nghỉ kết hôn",
  },
  {
    TypeRestId: 3,
    TypeRestName: "Nghỉ không lương",
  },
  {
    TypeRestId: 4,
    TypeRestName: "Nghỉ thai sản",
  },
];

export const STATUS = [
  {
    StatusId: 3,
    StatusName: "Tất cả",
  },
  {
    StatusId: 0,
    StatusName: "Đã duyệt",
  },
  {
    StatusId: 1,
    StatusName: "Chờ duyệt",
  },
  {
    StatusId: 2,
    StatusName: "Chưa duyệt",
  },
];

export const STATUS_DETAIL = [
  {
    StatusId: 0,
    StatusName: "Đã duyệt",
  },
  {
    StatusId: 1,
    StatusName: "Chờ duyệt",
  },
  {
    StatusId: 2,
    StatusName: "Chưa duyệt",
  },
];

export const DEPARTMENT = [
  {
    DepartmentId: 1,
    DepartmentName: "Công ty Test - Dự án CNB_MISA",
    expanded: true,
  },
  {
    DepartmentId: "1_1",
    categoryId: 1,
    DepartmentName: "Phòng Kế Toán",
  },
  {
    DepartmentId: "1_2",
    categoryId: 1,
    DepartmentName: "Phòng Hành Chính",
  },
  {
    DepartmentId: "1_3",
    categoryId: 1,
    DepartmentName: "Phòng Công Nghệ Thông Tin",
  },
  {
    DepartmentId: "1_4",
    categoryId: 1,
    DepartmentName: "Phòng Nhân Sự",
  },
];
export const PAGING_OPTIONS = {
  PageNumber: 1,
  PageSize: 50,
  Keyword: "",
  StatusId: null,
  DepartmentName: null,
  Filters: [],
};

export const VALIDATE_DEFAULT = {
  IsValidate: false,
  Message: "",
};
