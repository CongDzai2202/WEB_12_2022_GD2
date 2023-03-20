<template>
  <div class="m-selectbox-invalid" :class="{ isValid: isValid }">
    <dx-select-box
      placeholder=""
      class="item-fullname"
      :search-enabled="true"
      :data-source="data"
      v-model="dataText"
      :display-expr="displayExpr"
      :value-expr="valueExpr"
      noDataText="Không có dữ liệu"
      item-template="customItem"
      :style="{ border: isValid ? '1px solid #ff6161' : '1px solid #ddd' }"
    >
      <template #customItem="{ data: itemData }">
        <div class="custom-item flex-item c-g-8 item-fullname">
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
            <span class="employee-code"> ({{ itemData.EmployeeCode }}) </span>
            <p>
              {{ itemData.PositionName }}
            </p>
          </div>
        </div>
      </template></dx-select-box
    >
    <div class="validate-error">
      <MTooltip class="test-error" :id="id" :text="name" :position="'top'">
        <div class="m-icon error-icon"></div>
      </MTooltip>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { DxSelectBox } from "devextreme-vue";
import MTooltip from "@/components/base/MTooltip.vue";
export default {
  name: "MSelectboxCustom",
  emits: ["update:modelValue"],
  props: ["modelValue", "data", "displayExpr", "valueExpr", "name","id", "validate"],
  components: { DxSelectBox, MTooltip },
  setup(props, { emit }) {
    const isValid = ref(false);
    const messageValid = ref("");
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
     * Tính toán set modelValue
     * Created By (10/03/2023)
     */
    const dataText = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        emit("update:modelValue", newVal);
      },
    });
    /**
     * Theo dõi dataText kiểm tra trống hay không
     * Created By (10/03/2023)
     */
    watch(dataText, (newVal) => {
      if (newVal == null) {
        isValid.value = true;
        messageValid.value = props.name;
      } else {
        isValid.value = false;
        messageValid.value = "";
      }
    });
    /**
     * Theo dõi prop validate để trả về validate dữ liệu
     * Created By (10/03/2023)
     */
    watch(props.validate, (newVal) => {
      if (newVal.IsValidate) {
        isValid.value = newVal.IsValidate;
        messageValid.value = newVal.Message;
      }
    });
    return {
      dataText,
      isValid,
      messageValid,
      firstAndLastLetters,
    };
  },
};
</script>

<style>
.m-selectbox-invalid.isValid {
  position: relative;
  border-radius: 4px;
}
.m-selectbox-invalid.isValid .validate-error,
.m-selectbox-invalid.isValid .error-icon {
  display: block;
}
.validate-error {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
  visibility: visible;
}
.validate-error:hover .error-text,
.validate-error:hover .div {
  display: flex;
}
.error-icon {
  display: none;
}
.validate-error .div {
  display: none;
  width: 12px;
  height: 12px;
  top: -11px;
  left: 4px;
  transform: rotate(45deg);
  position: absolute;
  background-color: #2a2e41;
}
.error-text {
  z-index: 100000;
  display: none;
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px !important;
  font-size: 12px;
  background-color: #ccc;
  height: 32px;
  font-weight: 400;
  color: #fff;
  align-items: center;
  justify-content: center;
  background-color: #2a2e41;
  border-radius: 4px;
  visibility: visible;
}
.validate-error.dx-popup-content{
  font-size: 11px !important;
  color: #fff !important; 
  font-weight: normal;
}
.test-error.dx-popup-content{
  font-size: 11px !important;
  color: #fff !important; 
  font-weight: normal;
}
</style>