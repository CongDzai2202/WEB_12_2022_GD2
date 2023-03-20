<template>
  <div class="header flex-item">
    <div class="header__left flex-item">
      <div class="header__left-content flex-item">
        <div class="circle-icon flex-item">
          <div class="m-icon toggle-icon"></div>
        </div>

        <img src="../assets/img/logo.svg" alt="" class="header__left-logo" />
        <div class="header__left-title"><span>Chấm công</span></div>
      </div>
      <div class="header__left-navbar">
        <ul class="header__left-navlist flex-item">
          <li class="navlist-item m-l-8 m-r-24"><span>Tổng quan</span></li>
          <li class="navlist-item m-l-8 m-r-24">
            <span>Chấm công</span>
            <div class="m-icon arrow-down-icon"></div>
          </li>
          <li class="navlist-item m-l-8 m-r-24">
            <span>Ca làm việc</span>
            <div class="m-icon arrow-down-icon"></div>
          </li>
          <li class="navlist-item active m-l-8 m-r-24">
            <span>Quản lý đơn</span>
            <div class="m-icon arrow-down-icon"></div>
          </li>
          <li class="navlist-item m-l-8 m-r-24">
            <span>Báo cáo</span>
            <div class="m-icon arrow-down-icon"></div>
          </li>
          <li class="navlist-item m-l-8 m-r-24"><span>Thiết lập</span></li>
        </ul>
      </div>
    </div>
    <div class="header__right flex-item">
      <div class="header__right-icon c-g-8 flex-item">
        <MTooltip id="bell-icon" text="Thông báo"  :position="'bottom'">
          <div class="circle-icon flex-item">
            <div class="m-icon bell-icon"></div>
          </div>
        </MTooltip>
        <MTooltip id="question-icon" text="Trợ giúp" :position="'bottom'"
          ><div class="circle-icon flex-item">
            <div class="m-icon question-icon"></div></div
        ></MTooltip>

        <MTooltip id="more-icon" text="Tính năng khác" :position="'bottom'"
          ><div class="circle-icon flex-item">
            <div class="m-icon more-icon"></div></div
        ></MTooltip>
        
      </div>
      <img class="header__right-avatar" src="../assets/img/avatar.svg" alt="" />
    </div>
  </div>
</template>

<script >
import MTooltip from "@/components/base/MTooltip.vue";
import { DxTooltip } from "devextreme-vue";

export default {
  components: { MTooltip },
  name: "TheHeader",
  component: {
    MTooltip,
    DxTooltip
  },
};
</script>

<style>
@import url(@/css/layout/header.css);
</style>