<template>
  <div class="tooltip-container">
    <div
      class="con-ms-tooltip"
      :id="id"
      @mouseenter="toggleDefault"
      @mouseleave="toggleDefault"
    >
      <slot></slot>
    </div>
    <div v-if="defaultVisible">
      <DxTooltip
        css-class="dx-tooltip"
        v-model:visible="defaultVisible"
        :hide-on-outside-click="false"
        :target="`#${id}`"
        :position="position"
      >
        {{ textContent }}
      </DxTooltip>
    </div>
  </div>
</template>
  
  <script>
import { ref, watch, computed } from "vue";
import { DxTooltip } from "devextreme-vue/tooltip";
export default {
  name: "MTooltip",
  props: ["id", "text", "position"],
  components: {
    DxTooltip,
  },
  setup(props) {
    let defaultVisible = ref(false);

    let toggleDefault = () => {
      defaultVisible.value = !defaultVisible.value;
    };
    const textContent = computed(() => {
      return props.text;
    });
    console.log(textContent);
    return {
      textContent,
      defaultVisible,
      toggleDefault,
    };
  },
};
</script>
  
  <style scoped></style>
  