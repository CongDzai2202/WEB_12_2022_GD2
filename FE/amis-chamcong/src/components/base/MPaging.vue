<template>
  <div class="paging flex-item">
    <div class="grid-navigation">
      <div class="page-total flex-item">
        Tổng số bản ghi:
        <b style="padding: 0 6px">{{ dataSources.TotalRecord }}</b>
      </div>
      <div class="page-select-pagesize flex-item">
        <DxDropDownButton
          class="select-pagesize"
          :text="pageSize"
          :items="pageSizes"
          :drop-down-options="{ width: 100 }"
          @item-click="onSelectItem"
        />
        <div class="page-info">
          Từ
          <b>{{ prevRecord }}</b>
          đến
          <b>{{ afterRecord }}</b>
          bản ghi
        </div>
      </div>
      <div class="page-navigation flex-item c-g-22">
        <div
          class="m-icon chevron-left"
          :class="{ disabled: dataSources.CurrentPage === 1 }"
          :onclick="onPrevPage"
        ></div>
        <div
          class="m-icon chevron-right"
          :class="{
            disabled: dataSources.CurrentPage === dataSources.TotalPage,
          }"
          :onclick="onNextPage"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, watch, ref } from "vue";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import { defineEmits } from "vue";
import { defineProps } from "vue";
export default {
  name: "MPaging",
  components: { DxDropDownButton },
  props: ["dataSources"],
  emits: ["onChangePageSize", "onChangPageNumber"],
  setup(props, { emit }) {
    const pageSizes = ["15", "25", "50", "100"];
    const pageSize = ref("50");
    const dataSources = toRef(props, "dataSources");
    const prevRecord = ref(1);
    const afterRecord = ref("");
    const pageNumber = ref(1);
    pageNumber.value = dataSources.value.CurrentPage;
    afterRecord.value = dataSources.value.CurrentPageRecords;

    /**
     * Tính toán lại số bản ghi từ bao nhiêu đến bao nhiêu
     * Created By NVTAN (07/03/2023)
     */
    watch(dataSources, (newVal, oldVal) => {
      if (newVal.TotalPage != oldVal.TotalPage) {
        pageNumber.value = 1;
      }
      prevRecord.value =
        (newVal.CurrentPage - 1) * newVal.CurrentPageRecords + 1;
      afterRecord.value =
        newVal.CurrentPage == newVal.TotalPage
          ? newVal.TotalRecord
          : newVal.CurrentPage * newVal.CurrentPageRecords;
    });

    /**
     * Chọn số lượng bản ghi trên một trang
     * Created By NVTAN (07/03/2023)
     */
    const onSelectItem = (data) => {
      pageSize.value = data.itemData;
      emit("onChangePageSize", parseInt(pageSize.value));
    };

    /**
     * Ấn chọn trang trước
     * Created By NVTAN (07/03/2023)
     */

    const onPrevPage = () => {
      if (pageNumber.value > 1) {
        pageNumber.value -= 1;
        emit("onChangPageNumber", pageNumber.value);
      }
    };
    /**
     * Ấn chọn trang tiếp theo
     * Created By NVTAN (07/03/2023)
     */
    const onNextPage = () => {
      if (pageNumber.value < dataSources.value.TotalPage) {
        pageNumber.value += 1;
        emit("onChangPageNumber", pageNumber.value);
      }
    };
    return {
      pageNumber,
      pageSizes,
      pageSize,
      onSelectItem,
      onPrevPage,
      onNextPage,
      dataSources,
      prevRecord,
      afterRecord,
    };
  },
};
</script>

<style scoped>
</style>