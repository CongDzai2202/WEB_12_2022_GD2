<template>
  <div class="filter-scroll">
    <div v-for="(item,index) in filterOptions" :key="index" class="p-8" :class="[item.IsCheck ? 'filter-item ' : 'p-b-0']">
    <label class="filter-check flex-item m-b-8">
      <div class="checkmark"><DxCheckBox v-model:value="item.IsCheck" /></div>
      <span>{{ item.Caption }}</span>
    </label>
    <div :class="[item.IsCheck ? 'filterInput p-b-8' : 'filterInput-disable']">
      <div class="m-b-8">
        <DxSelectBox
          :search-enabled="true"
          noDataText="Không có dữ liệu"
          placeholder=""
          :data-source="filterOperators"
          v-model="item.Operator"
          display-expr="OperatorName"
          value-expr="Operator"
        />
      </div>
      <div v-if="item.Type == ''">
        <DxTextBox v-model="item.Value" @value-changed="valueChanged" />
      </div>
      <div class="input" v-if="item.Type == 'date'">
        <DxDateBox
          :show-clear-button="false"
          :use-mask-behavior="true"
          type="date"
          placeholder="DD/MM/YYYY"
          display-format="dd/MM/yyyy"
          dateSerializationFormat="yyyy/MM/dd"
          v-model="item.Value"
          :onValueChanged="onChangeValue"
        /> 
      </div>
    </div>
  </div>
  </div>
</template>
  <script>
import _ from "lodash";
import { ref, toRef,computed } from "vue";
import { DxCheckBox } from "devextreme-vue/check-box";
import DxDateBox from "devextreme-vue/date-box";
import { DxSelectBox } from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";
import { FILTERS_OPERATOR } from "@/js/constant";

export default {
  name: "MFilterItem",
  emits: ["onFilter"],
  props: ["lstFilter"],
  components: { DxCheckBox, DxSelectBox, DxTextBox, DxDateBox },
  setup(props, {emit}) {
    const filterOptions = toRef(props, "lstFilter");
    const filterOperators = ref(_.cloneDeep(FILTERS_OPERATOR));
    const valueChanged = () => {
      emit("onFilter", filterOptions);
    };
    const onChangeValue = () => {
      emit("onFilter", filterOptions);
    };
    return {
      filterOptions,
      filterOperators,
      valueChanged,
      onChangeValue,
    };
  },
};
</script>
  <style scoped>
@import url(@/css/base/filter.css);
</style>