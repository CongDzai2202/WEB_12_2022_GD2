<template>
  <div class="content__header flex-item">
    <h2 class="content__header-title">Đơn xin nghỉ</h2>
    <router-link :to="`/RestDetail/0`"
      ><div>
        <dx-button
          class="m-btn btn-add"
          type="success"
          text="Thêm"
          icon="plus"
        />
        <dx-button
          icon="chevrondown"
          type="success"
          class="m-btn btn-dropdown"
        /></div
    ></router-link>
  </div>
  <MRestList></MRestList>
</template>

<script>
import MRestList from "@/views/MRestList.vue";
import MTooltip from "@/components/base/MTooltip.vue";
import { DxButton } from "devextreme-vue/button";
import { DxTextBox } from "devextreme-vue";
import { DxSelectBox } from "devextreme-vue";
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "TheContent",
  components: {
    MRestList,
    DxButton,
    DxTextBox,
    DxSelectBox,
    MTooltip,
  },

  setup() {
    const textBoxTemplate = ref(`
        <div class="flex-item">
          <i class="dx-icon-plus"></i>
        </div>
      `);
    return {
      textBoxTemplate,
    };
  },
});
</script>

<style>
</style>