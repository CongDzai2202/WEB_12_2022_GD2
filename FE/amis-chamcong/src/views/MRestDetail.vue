<template>
  <div class="container">
    <TheHeader></TheHeader>
    <div class="content">
      <div class="content__header flex-item">
        <div class="content__header-left flex-item">
          <router-link to="/test">
            <div class="m-icon back-icon"></div>
          </router-link>
          <h2 class="content__header-title">{{ titleForm }}</h2>
        </div>
        <div class="content__header-right flex-item">
          <dx-button
            class="m-btn btn-cancel"
            type="normal"
            text="Hủy"
            @click="hideFormAdd"
          />
          <dx-button
            :use-submit-behavior="true"
            class="m-btn"
            type="success"
            text="Lưu"
            @click="addAndSaveClick"
          />
        </div>
      </div>
      <div class="content__form">
        <div
          class="content__detail flex-item"
          :show-colon-after-label="true"
          :show-validation-summary="true"
        >
          <DxForm :form-data="dataSource" class="content__detail-form">
            <DxGroupItem :col-count="4">
              <DxGroupItem :col-span="2" class="content__detail-left">
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.FULLNAME }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MSelectBoxCustom
                      v-model="dataSource.EmployeeId"
                      :data="employeeOptions"
                      displayExpr="FullName"
                      valueExpr="EmployeeId"
                      :name="$MISAResource.VALIDATE.FULLNAME"
                      id="m-select-employee"
                      :validate="validateEmp"
                    >
                    </MSelectBoxCustom>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DEPARTMENTNAME }}
                  </div>
                  <div class="item-detail-right">
                    <DxTextBox
                      :disabled="true"
                      v-model="dataSource.DepartmentName"
                    />
                  </div>
                </div>
                <div class="flex-item item-detail textbox-title-required">
                  <div class="textbox-title">
                    <span>{{ $MISAResource.LABEL_INPUT.SUBMITDATE }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MDateBox
                      v-model="dataSource.SubmitDate"
                      :name="$MISAResource.VALIDATE.SUMIT_DATE"
                      :validate="validateSubmitDate"
                      id="m-date-submitdate"
                    >
                    </MDateBox>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.DATEFROM }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MDateBox
                      v-model="dataSource.DateFrom"
                      :name="$MISAResource.VALIDATE.FROM_DATE"
                      :validate="validateFromDate"
                      id="m-date-datefrom"
                    >
                    </MDateBox>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.DATETO }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MDateBox
                      v-model="dataSource.DateTo"
                      :name="$MISAResource.VALIDATE.TO_DATE"
                      :validate="validateToDate"
                      id="m-date-dateto"
                    >
                    </MDateBox>
                  </div>
                </div>
                <div
                  class="flex-item item-detail"
                  v-if="isOnLeave || isOnOther"
                >
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.NUMREST }}
                  </div>
                  <div class="item-detail-right">
                    <DxNumberBox
                      :min="0"
                      :show-spin-buttons="true"
                      v-model="dataSource.NumRest"
                    >
                    </DxNumberBox>
                  </div>
                </div>
                <div class="flex-item item-detail" v-if="isOnCompenstation">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.HOURREST }}
                  </div>
                  <div class="item-detail-right">
                    <DxNumberBox
                      :disabled="true"
                      :min="0"
                      :show-spin-buttons="true"
                      v-model="dataSource.HourRest"
                    >
                    </DxNumberBox>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.TYPEREST }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MSelectBox
                      v-model="dataSource.TypeRest"
                      :data="typeRestOptions"
                      displayExpr="TypeRestName"
                      valueExpr="TypeRestId"
                      :name="$MISAResource.VALIDATE.TYPEREST"
                      id="m-select-typerest"
                      :validate="validateTypeRest"
                    >
                    </MSelectBox>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.SALARY_PERCENT }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox
                      :disabled="true"
                      v-model="dataSource.SalaryPercent"
                    />
                  </div>
                </div>
              </DxGroupItem>
              <DxGroupItem :col-span="2" class="content__detail-right">
                <div v-if="isOnLeave" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_USE }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" :value="12" />
                  </div>
                </div>
                <div v-if="isOnLeave" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_USED }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" :value="0" />
                  </div>
                </div>
                <div v-if="isOnLeave" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_LEFTS }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" v-model="dayRestUsed" />
                  </div>
                </div>
                <div v-if="isOnOther" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_MAX }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" :value="10" />
                  </div>
                </div>
                <div v-if="isOnOther" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_NORMAL_USED }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" :value="0" />
                  </div>
                </div>
                <div v-if="isOnOther" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.DAY_COMPENSATION }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" :value="10" />
                  </div>
                </div>
                <div v-if="isOnCompenstation" class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.HOUR_COMPENSATION }}
                  </div>
                  <div class="item-detail-right">
                    <dxNumberBox :disabled="true" v-model="hoursRestUsed" />
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.REASON_REST }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MTextArea
                      v-model="dataSource.ReasonRest"
                      :name="$MISAResource.VALIDATE.REASON_REST"
                      :validate="validateReason"
                      id="m-textarea-reason"
                    >
                    </MTextArea>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{
                      $MISAResource.LABEL_INPUT.APPLYPERSON_NAME
                    }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MSelectBoxCustom
                      v-model="dataSource.ApplyPersonId"
                      :data="employeeOptions"
                      displayExpr="FullName"
                      valueExpr="EmployeeId"
                      :name="$MISAResource.VALIDATE.APPLYPERSON_NAME"
                      id="m-select-apply"
                      :validate="validateApply"
                    >
                    </MSelectBoxCustom>
                  </div>
                </div>

                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.SWAPPERSON_NAME }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MSelectBoxCustom
                      v-model="dataSource.SwapPersonId"
                      :data="employeeOptions"
                      displayExpr="FullName"
                      valueExpr="EmployeeId"
                      :name="$MISAResource.VALIDATE.SWAPPERSON_NAME"
                      :validate="validateSwap"
                      id="m-select-swap"
                    >
                    </MSelectBoxCustom>
                  </div>
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title">
                    {{ $MISAResource.LABEL_INPUT.RELATEPERSON_NAME }}
                  </div>
                  <div class="item-detail-right">
                    <dx-select-box
                      placeholder=""
                      :search-enabled="true"
                      :data-source="employeeOptions"
                      v-model="dataSource.RelatePersonId"
                      display-expr="FullName"
                      value-expr="EmployeeId"
                      item-template="customItem"
                    >
                      <template #customItem="{ data: itemData }">
                        <div class="custom-item flex-item c-g-8">
                          <div
                            class="employee-avatar"
                            :style="`background-color: rgb(
                            ${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)},
                            ${Math.floor(Math.random() * 256)}
                            );`"
                          >
                            {{ firstAndLastLetters(itemData.FullName) }}
                          </div>
                          <div class="employee-info">
                            <span class="employee-name">
                              <b>{{ itemData.FullName }}</b>
                            </span>
                            <span class="employee-code">
                              ({{ itemData.EmployeeCode }})
                            </span>
                            <p>
                              {{ itemData.PositionName }}
                            </p>
                          </div>
                        </div>
                      </template></dx-select-box
                    >
                  </div>
                  <DxRequiredRule message="Field is required" />
                </div>
                <div class="flex-item item-detail">
                  <div class="textbox-title textbox-title-required">
                    <span>{{ $MISAResource.LABEL_INPUT.STATUS_NAME }}</span>
                  </div>
                  <div class="item-detail-right">
                    <MSelectBox
                      v-model="dataSource.StatusId"
                      :data="statusOptions"
                      displayExpr="StatusName"
                      valueExpr="StatusId"
                      :name="$MISAResource.VALIDATE.STATUS"
                      id="m-select-status"
                      :validate="validateStatus"
                    >
                    </MSelectBox>
                  </div>
                  <DxRequiredRule message="Field is required" />
                </div>
              </DxGroupItem>
            </DxGroupItem>
          </DxForm>
        </div>
        <div class="content__footer">
          <h1>{{ $MISAResource.LABEL_INPUT.NOTEREST }}</h1>
          <div class="content__footer-note flex-item c-g-24">
            <img
              src="@/assets/img/avatar.svg"
              alt=""
              class="content__footer-avatar"
            />
            <input
              v-model="dataSource.NoteRest"
              placeholder="Nhập ghi chú"
              @keydown.tab.prevent="focusFirst"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-popup">
    <dx-popup
      v-model:visible="isShowPopup"
      :width="415"
      title="Thông báo"
      :show-close-button="true"
      :drag-enabled="false"
      :showTitle="true"
    >
      <div class="m-popup-content">
        <span>{{ messagePopup[0] }}</span>
        <span>{{ messagePopup[1] }}</span>
        <span>{{ messagePopup[2] }}</span>
        <span>{{ messagePopup[3] }}</span>
      </div>
      <div class="m-popup-btn c-g-8">
        <dx-button
          text="Đóng"
          type="success"
          class="m-btn m-btn-error"
          @click="confirmHidePopup"
        />
      </div>
    </dx-popup>
  </div>
  <div class="m-popup">
    <dx-popup
      v-model:visible="isShowPopupValidate"
      :width="415"
      :height="220"
      title="Thông báo"
      :show-close-button="true"
      :drag-enabled="false"
      :showTitle="true"
    >
      <div class="m-popup-content">{{ contentPopupValidate }}</div>
      <div class="m-popup-btn c-g-8">
        <dx-button
          text="Đóng"
          type="success"
          class="m-btn m-btn-error"
          @click="hidePopUpValidate"
        />
      </div>
    </dx-popup>
  </div>
  <div class="m-popup">
    <dx-popup
      v-model:visible="isShowPopupChanged"
      :width="415"
      :height="190"
      title="Thông báo"
      :show-close-button="true"
      :drag-enabled="false"
      :showTitle="true"
    >
      <div class="m-popup-content">
        {{ $MISAResource.CONTENT_POPUP.DATA_CHANGED }}
      </div>
      <div class="m-popup-btn c-g-8">
        <dx-button
          type="normal"
          class="m-btn btn-cancel"
          text="Hủy"
          @click="hidePopupChanged"
        />
        <dx-button
          type="normal"
          class="m-btn btn-cancel"
          text="Không lưu"
          @click="confirmUnSaveData"
        />
        <dx-button
          text="Lưu"
          type="success"
          class="m-btn"
          @click="confirmSaveData"
        />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { MISAResource } from "@/js/base/resource";
import { MISAEnum } from "@/js/base/enum";
import moment from "moment-timezone";
import MSelectBoxCustom from "@/components/MSelectBoxCustom.vue";
import MSelectBox from "@/components/MSelectBox.vue";
import MTextArea from "@/components/MTextArea.vue";
import MDateBox from "@/components/MDateBox.vue";
import { VALIDATE_DEFAULT } from "@/js/data";
import { PAGING_OPTIONS } from "@/js/data";

import TheHeader from "@/layout/TheHeader.vue";
import { DxButton } from "devextreme-vue/button";
import { DxSelectBox } from "devextreme-vue";
import DxDateBox from "devextreme-vue/date-box";
import DxTextBox from "devextreme-vue/text-box";
import DxTextArea from "devextreme-vue/text-area";
import {
  DxNumberBox,
  DxButton as DxNumberBoxButton,
} from "devextreme-vue/number-box";
import { DxForm, div, DxGroupItem, DxLabel } from "devextreme-vue/form";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { reactive, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { TYPEREST, STATUS_DETAIL } from "../js/data";
import { DxPopup, DxToolbarItem, DxPosition } from "devextreme-vue/popup";

import AXIOS_RESTDETAIL from "@/axios/detail";
import AXIOS_EMPLOYEE from "@/axios/employee";

import _ from "lodash";
import router from "@/router";
import { useToast } from "vue-toastification";
import { OPTION_TOAST_MESS_SUCCESS } from "@/js/toast";
export default {
  name: "MRestDetail",
  components: {
    MSelectBoxCustom,
    MSelectBox,
    MTextArea,
    MDateBox,
    TheHeader,
    DxButton,
    DxForm,
    DxGroupItem,
    DxLabel,
    DxTextArea,
    DxNumberBox,
    DxNumberBoxButton,
    DxSelectBox,
    DxRequiredRule,
    DxValidator,
    DxDateBox,
    DxTextBox,
    DxPopup,
    DxPosition,
  },
  setup() {
    const toast = useToast();
    const isOnOther = ref(false);
    const isOnLeave = ref(true);
    const isOnCompenstation = ref(false);
    const diffInMiliseconds = ref();
    const diffInDays = ref();
    const titleForm = ref(MISAResource.TITLE_FORM.ADD);
    const isFocusFirst = ref(true);
    const isShowPopup = ref(false);
    const isShowPopupChanged = ref(false);
    const isChanged = ref(false);
    const isValidateCustom = ref(false);
    const messagePopup = ref([]);
    const confirmHidePopup = () => {
      isShowPopup.value = false;
    };
    const hidePopUpValidate = () => {
      isShowPopupValidate.value = false;
    };
    const contentPopupValidate = ref("");
    const isShowPopupValidate = ref(false);
    const dayRestUsed = ref(12);
    const hoursRestUsed = ref(24);
    const filter = reactive(PAGING_OPTIONS);
    const validateEmp = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateApply = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateSwap = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateStatus = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateReason = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateTypeRest = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateSubmitDate = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateFromDate = reactive(_.cloneDeep(VALIDATE_DEFAULT));
    const validateToDate = reactive(_.cloneDeep(VALIDATE_DEFAULT));

    /**
     * Hàm validate dữ liệu
     * Created by NVTAN(06/03/2023)
     */
    const validate = () => {
      if (dataSource.EmployeeId == null) {
        validateEmp.IsValidate = true;
        validateEmp.Message = MISAResource.VALIDATE.FULLNAME;
      } else {
        validateEmp.IsValidate = false;
        validateEmp.Message = "";
      }
      if (dataSource.ApplyPersonId == null) {
        validateApply.IsValidate = true;
        validateApply.Message = MISAResource.VALIDATE.APPLYPERSON_NAME;
      } else {
        validateApply.IsValidate = false;
        validateApply.Message = "";
      }
      if (dataSource.SwapPersonId == null) {
        validateSwap.IsValidate = true;
        validateSwap.Message = MISAResource.VALIDATE.SWAPPERSON_NAME;
      } else {
        validateSwap.IsValidate = false;
        validateSwap.Message = "";
      }
      if (dataSource.StatusId == null) {
        validateStatus.IsValidate = true;
        validateStatus.Message = MISAResource.VALIDATE.STATUS;
      } else {
        validateStatus.IsValidate = false;
        validateStatus.Message = "";
      }
      if (dataSource.TypeRest == null) {
        validateTypeRest.IsValidate = true;
        validateTypeRest.Message = MISAResource.VALIDATE.TYPEREST;
      } else {
        validateTypeRest.IsValidate = false;
        validateTypeRest.Message = "";
      }
      if (dataSource.ReasonRest == null) {
        validateReason.IsValidate = true;
        validateReason.Message = MISAResource.VALIDATE.REASON_REST;
      } else {
        validateReason.IsValidate = false;
        validateReason.Message = "";
      }
      if (!dataSource.SubmitDate) {
        validateSubmitDate.IsValidate = true;
        validateSubmitDate.Message = MISAResource.VALIDATE.SUMIT_DATE;
      } else {
        validateSubmitDate.IsValidate = false;
        validateSubmitDate.Message = "";
      }
      if (!dataSource.DateFrom) {
        validateFromDate.IsValidate = true;
        validateFromDate.Message = MISAResource.VALIDATE.FROM_DATE;
      } else {
        if (new Date(dataSource.DateFrom) > new Date(dataSource.DateTo)) {
          validateFromDate.IsValidate = true;
          validateFromDate.Message = "Từ ngày phải nhỏ hơn hoặc bằng đến ngày";
        } else {
          validateToDate.IsValidate = false;
          validateToDate.Message = "";
        }
      }
      if (!dataSource.DateTo) {
        validateToDate.IsValidate = true;
        validateToDate.Message = MISAResource.VALIDATE.TO_DATE;
      } else {
        if (new Date(dataSource.DateFrom) > new Date(dataSource.DateTo)) {
          validateToDate.IsValidate = true;
          validateToDate.Message = "Đến ngày phải lớn hơn hoặc bằng từ ngày";
        } else {
          validateToDate.IsValidate = false;
          validateToDate.Message = "";
        }
      }
    };
    const isInVal = computed(() => {
      return (
        validateEmp.IsValidate ||
        validateApply.IsValidate ||
        validateSwap.IsValidate ||
        validateStatus.IsValidate ||
        validateReason.IsValidate ||
        validateTypeRest.IsValidate ||
        validateSubmitDate.IsValidate ||
        validateFromDate.IsValidate ||
        validateToDate.IsValidate
      );
    });

    /**
     * Ấn nút hủy trên form chi tiết
     * Created by NVTAN(06/03/2023)
     */
    const hideFormAdd = () => {
      if (isChanged.value) {
        isShowPopupChanged.value = true;
      } else {
        router.push({ path: "/" });
      }
    };

    /**
     * Ẩn popup dữ liệu đã bị thay đổi
     * Created by NVTAN(06/03/2023)
     */
    const hidePopupChanged = () => {
      isShowPopupChanged.value = false;
    };

    /**
     * Lấy chữ cái đầu tiền và chữ cái cuối cùng để ghép avatar
     * Create By NVTAN 09/03/2023
     */
    const firstAndLastLetters = (string) => {
      if (string) {
        const words = _.words(_.trimEnd(string));
        const firstLetter = string.charAt(0);
        const lastLetter = _.upperCase(_.last(_.map(words, (w) => _.first(w))));
        return `${firstLetter}${lastLetter}`;
      }
    };
    /**
     * Tính toán Số giờ nghỉ
     * Created by NVTAN(06/03/2023)
     */
    const hourOfRest = computed(() => {
      if (new Date(dataSource.DateTo) > new Date(dataSource.DateFrom)) {
        diffInMiliseconds.value = Math.abs(
          new Date(dataSource.DateTo) - new Date(dataSource.DateFrom)
        );
        diffInDays.value = Math.ceil(
          diffInMiliseconds.value / (1000 * 60 * 60)
        );
      } else {
        diffInDays.value = 0;
      }
      return diffInDays.value;
    });

    /**
     * Khởi tạo giá trị cho typerest
     * Created by NVTAN(06/03/2023)
     */
    const typeRestOptions = reactive(TYPEREST);

    /**
     * Khởi tạo giá trị cho status
     * Created by NVTAN(06/03/2023)
     */
    const statusOptions = reactive(STATUS_DETAIL);

    /**
     * Giá trị mặc định cho ngày nộp đơn và từ ngày
     * Created by NVTAN(06/03/2023)
     */
    const now = new Date();
    now.setHours(8, 0, 0, 0);

    /**
     * Giá trị mặc định cho đến ngày
     * Created by NVTAN(06/03/2023)
     */
    const nowTo = new Date();
    nowTo.setHours(17.5, 0, 0, 0);
    /**
     * disable input
     */
    const disableEditorOptions = reactive({ disabled: true });

    /**
     * Khởi tạo giá trị cho employee
     * Created by NVTAN(06/03/2023)
     */
    const employeeOptions = ref([]);
    /**
     * Hàm lấy danh sách nhân viên
     * Created by NVTAN(06/03/2023)
     */
    const getAllEmployees = async () => {
      try {
        let response = await AXIOS_EMPLOYEE.getAllEmployees();
        if (response) {
          employeeOptions.value = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllEmployees();
    /**
     * Khởi tạo thông tin ban đầu
     * Created by NVTAN(06/03/2023)
     */
    const route = useRoute();
    const restDetailId = ref();
    const dataSource = reactive({
      SubmitDate: now,
      DateFrom: now,
      DateTo: nowTo,
      NumRest: 0,
      StatusId: 1,
      TypeRest: 0,
      SalaryPercent: 100,
    });
    /**
     * Khởi tạo thông tin ban đầu
     * Created by NVTAN(06/03/2023)
     */
    const dataSourceChanged = reactive({
      SubmitDate: now,
      DateFrom: now,
      DateTo: nowTo,
      NumRest: 0,
      StatusId: 1,
      TypeRest: 0,
      SalaryPercent: 100,
    });

    /**
     * Kiểm tra dữ liệu thay đổi chưa để hiện popup
     * Created by NVTAN(06/03/2023)
     */
    watch(dataSource, (newVal) => {
      if (JSON.stringify(newVal) !== JSON.stringify(dataSourceChanged)) {
        isChanged.value = true;
      }
    });
    /**
     * Hàm ấn không lưu khi dữ liệu thay đổi
     * Created by NVTAN(06/03/2023)
     */
    const confirmUnSaveData = () => {
      router.push({ path: "/" });
    };
    /**
     * Hàm ấn lưu khi dữ liệu thay đổi
     * Created by NVTAN(06/03/2023)
     */
    const confirmSaveData = () => {
      addAndSaveClick();
    };
    /**
     * Hàm lấy thông tin đơn thông qua Id
     * Created by NVTAN(06/03/2023)
     */
    restDetailId.value = route.params.id;
    const getRestDetailById = async (param) => {
      try {
        let response = await AXIOS_RESTDETAIL.getRestDetailById(param);
        if (response) {
          Object.assign(dataSource, response.data[0]);
          Object.assign(dataSourceChanged, response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (restDetailId.value != MISAEnum.FORM_MODE.ADD) {
      getRestDetailById(restDetailId.value);
      titleForm.value = MISAResource.TITLE_FORM.UPDATE;
    }

    /**
     * Hàm gọi API thêm đơn
     * Created by NVTAN(06/03/2023)
     */
    const addRestDetail = async (param) => {
      try {
        let response = await AXIOS_RESTDETAIL.postNewRestDetail(param);
        if (response) {
          toast.success(
            MISAResource.TOAST.MESSAGE_ADD,
            OPTION_TOAST_MESS_SUCCESS
          );
          filter.PageNumber = 1;
          router.push({ path: "/" });
        }
      } catch (error) {
        console.log(error);
        messagePopup.value = error.response.data.MoreInfo;
        isShowPopup.value = true;
      }
    };
    /**
     * Hàm gọi API sửa thông tin đơn
     * Created by NVTAN(06/03/2023)
     */
    const editRestDetail = async (id, param) => {
      try {
        let response = await AXIOS_RESTDETAIL.updateRestDetail(id, param);
        if (response) {
          toast.success(
            MISAResource.TOAST.MESSAGE_UPDATE,
            OPTION_TOAST_MESS_SUCCESS
          );
          filter.PageNumber = 1;
          router.push({ path: "/" });
        }
      } catch (error) {
        console.log(error);
      }
    };
    /**
     * Hàm Chuyển múi giờ
     * Created by NVTAN(06/03/2023)
     */
    const convertToVietnamTimezone = (datetime) => {
      return moment.tz(datetime, "Asia/Ho_Chi_Minh").format();
    };
    /**
     * Chuyển đổi múi giờ
     * Created by NVTAN(06/03/2023)
     */
    dataSource.SubmitDate = convertToVietnamTimezone(dataSource.SubmitDate);
    dataSource.DateFrom = convertToVietnamTimezone(dataSource.DateFrom);
    dataSource.DateTo = convertToVietnamTimezone(dataSource.DateTo);
    dataSourceChanged.SubmitDate = convertToVietnamTimezone(
      dataSourceChanged.SubmitDate
    );
    dataSourceChanged.DateFrom = convertToVietnamTimezone(
      dataSourceChanged.DateFrom
    );
    dataSourceChanged.DateTo = convertToVietnamTimezone(
      dataSourceChanged.DateTo
    );
    /**
     * Kiểm tra router để gọi api sửa hay thêm
     * Created by NVTAN(06/03/2023)
     */
    const addAndSaveClick = async () => {
      await validate();
      validateCustom();
      if (!isValidateCustom.value) {
        if (!isInVal.value) {
          if (restDetailId.value == MISAEnum.FORM_MODE.ADD) {
            addRestDetail(dataSource);
          } else {
            editRestDetail(restDetailId.value, dataSource);
          }
        } else {
          return;
        }
      } else {
        return;
      }
    };
    /**
     * Kiểm tra xét giá trị mặc định cho một số trường
     * Created by NVTAN(06/03/2023)
     */
    watch(dataSource, (newVal) => {
      if (newVal.TypeRest == MISAEnum.TYPEREST.ONLEAVE) {
        isOnLeave.value = true;
        isOnOther.value = false;
        isOnCompenstation.value = false;
        dataSource.SalaryPercent = 100;
      } else if (newVal.TypeRest == MISAEnum.TYPEREST.ONCOMPENSTATION) {
        isOnLeave.value = false;
        isOnOther.value = false;
        isOnCompenstation.value = true;
        dataSource.SalaryPercent = 100;
      } else if (newVal.TypeRest == MISAEnum.TYPEREST.OTHER) {
        isOnOther.value = true;
        isOnLeave.value = false;
        isOnCompenstation.value = false;
        dataSource.SalaryPercent = 100;
      } else {
        isOnLeave.value = false;
        isOnOther.value = true;
        isOnCompenstation.value = false;
        dataSource.SalaryPercent = 0;
      }
    });

    /**
     * Hàm theo dõi sự thay đổi của employeeId để gán lại phòng ban của nhân viên
     * Created by NVTAN(10/03/2023)
     */
    watch(dataSource, (newVal) => {
      Object.keys(employeeOptions.value).map((key) => {
        if (employeeOptions.value[key].EmployeeId == newVal.EmployeeId) {
          dataSource.DepartmentName = employeeOptions.value[key].DepartmentName;
        }
      });
    });
    /**
     * Tính toán Số ngày nghỉ
     * Created by NVTAN(06/03/2023)
     */
    watch(dataSource, (newVal) => {
      if (new Date(newVal.DateTo) > new Date(newVal.DateFrom)) {
        diffInMiliseconds.value = Math.abs(
          new Date(newVal.DateTo) - new Date(newVal.DateFrom)
        );
        diffInDays.value = Math.ceil(
          diffInMiliseconds.value / (1000 * 60 * 60 * 24)
        );
      } else {
        diffInDays.value = 0;
      }
      dataSource.NumRest = diffInDays.value;
    });

    /**
     * Hàm kiểm tra xem số ngày nghỉ có thỏa mãn không
     * Created by NVTAN(06/03/2023)
     */
    const validateCustom = () => {
      if (isOnLeave.value) {
        if (dataSource.NumRest > dayRestUsed.value) {
          isValidateCustom.value = true;
          isShowPopupValidate.value = true;
          contentPopupValidate.value = MISAResource.VALIDATE.NUMREST_LIMIT;
        } else {
          isValidateCustom.value = false;
        }
      }

      if (isOnCompenstation.value) {
        if (hourOfRest.value > hoursRestUsed.value) {
          isValidateCustom.value = true;
          isShowPopupValidate.value = true;
          contentPopupValidate.value = MISAResource.VALIDATE.HOURSREST_LIMIT;
        } else {
          isValidateCustom.value = false;
        }
      }
      if (isOnOther.value) {
        if (hourOfRest.value > hoursRestUsed.value) {
          isValidateCustom.value = true;
          isShowPopupValidate.value = true;
          contentPopupValidate.value = MISAResource.VALIDATE.DAYSREST_LIMIT;
        } else {
          isValidateCustom.value = false;
        }
      }
    };
    return {
      filter,
      toast,
      isFocusFirst,
      diffInMiliseconds,
      diffInDays,
      titleForm,
      hourOfRest,
      isOnOther,
      isOnLeave,
      isOnCompenstation,
      dataSource,
      restDetailId,
      now,
      nowTo,
      disableEditorOptions,
      employeeOptions,
      typeRestOptions,
      statusOptions,
      isShowPopupChanged,
      isShowPopupValidate,
      isValidateCustom,
      contentPopupValidate,
      dataSourceChanged,
      isChanged,
      isShowPopup,
      messagePopup,
      validate,
      validateCustom,
      hidePopUpValidate,
      dayRestUsed,
      hoursRestUsed,
      isInVal,
      validateEmp,
      validateApply,
      validateSwap,
      validateStatus,
      validateReason,
      validateTypeRest,
      validateSubmitDate,
      validateFromDate,
      validateToDate,
      hideFormAdd,
      hidePopupChanged,
      confirmHidePopup,
      getRestDetailById,
      getAllEmployees,
      addRestDetail,
      editRestDetail,
      addAndSaveClick,
      convertToVietnamTimezone,
      firstAndLastLetters,
      confirmUnSaveData,
      confirmSaveData,
    };
  },
  mounted() {},
};
</script>

<style>
@import url(../css/views/RestDetail.css);
/* .dx-popup-content {
  font-size: 20px !important;
  font-family: Roboto fonts !important;
  font-weight: 400 !important;
  color: #fff;
  background-color: #000;
  border: unset !important;
} */
.dx-item-content {
  width: 100%;
}
.employee-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
/* .dx-scrollview-content {
  border-radius: 6px;
  padding: 0 !important;
} */
.custom-item {
  height: 64px;
}
.m-popup-content span {
  display: inline-block;
}
</style>