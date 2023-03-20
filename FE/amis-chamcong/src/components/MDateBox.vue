<template>
  <div class="m-selectbox-invalid" :class="{ isValid: isValid }">
    <DxDateBox
      :show-clear-button="false"
      :use-mask-behavior="true"
      applyButtonText="Lưu"
      cancelButtonText="Hủy"
      type="datetime"
      placeholder="DD/MM/YYYY HH:mm"
      display-format="dd/MM/yyyy HH:mm"
      v-model="dataText"
      :style="{ border: isValid ? '1px solid #ff6161' : '1px solid #ddd' }"
    >
    </DxDateBox>
    <div class="validate-error">
      <MTooltip :id="id" :text="messageValid" :position="'top'">
        <div class="m-icon error-icon"></div>
      </MTooltip>
    </div>
  </div>
</template>
      <script>
import { ref, computed, watch } from "vue";
import DxDateBox from "devextreme-vue/date-box";
import MTooltip from "@/components/base/MTooltip.vue";
export default {
  name: "MDateBox",
  emits: ["update:modelValue"],
  props: ["modelValue", "name", "validate", "id"],
  components: { DxDateBox, MTooltip },
  setup(props, { emit }) {
    const isValid = ref(false);
    const messageValid = ref("");
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
      console.log(messageValid.value);
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
    };
  },
};
</script>
      
      <style>
</style>