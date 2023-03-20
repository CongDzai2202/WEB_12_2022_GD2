<template>
  <div class="main-container flex-item">
    <div class="full-table" :class="[iShowAdvanceFilter ? 'w-70' : '']">
      <div class="content__midle flex-item" v-if="!isSelected">
        <div class="content__midle-left flex-item" style="position: relative">
          <span class="m-icon search-icon"></span>
          <dx-text-box
            v-model="textSearch"
            :placeholder="'Tìm kiếm'"
            class="textbox-search"
            style="width: 320px"
            value-change-event="keyup"
          >
          </dx-text-box>
        </div>
        <div class="content__midle-right flex-item">
          <div class="content__midle-status flex-item">
            <span>Trạng thái</span>
            <dx-select-box
              class="m-select-status"
              :data-source="statusOptions"
              v-model="searchStatus"
              display-expr="StatusName"
              value-expr="StatusId"
            />
          </div>
          <div class="content__midle-option flex-item">
            <div class="m-select-department">
              <DxDropDownBox
                style="width: 320px"
                v-model:value="treeBoxValue"
                v-model:opened="isTreeBoxOpened"
                :show-clear-button="true"
                placeholder="Tất cả đơn vị"
                :data-source="departmentOptions"
                value-expr="DepartmentId"
                display-expr="DepartmentName"
                :defer-rendering="false"
              >
                <template #content>
                  <DxTreeView
                    class="m-tree-view"
                    :data-source="departmentOptions"
                    :select-by-click="true"
                    data-structure="plain"
                    :search-mode="contants"
                    :search-enabled="true"
                    selection-mode="single"
                    key-expr="DepartmentId"
                    value-expr="DepartmentName"
                    display-expr="DepartmentName"
                    parent-id-expr="categoryId"
                    @item-click="onTreeItemClick($event)"
                    @item-selection-changed="
                      treeView_itemSelectionChanged($event)
                    "
                  />
                </template>
              </DxDropDownBox>
            </div>

            <MTooltip id="reload-icon" text="Tải lại" :position="'bottom'">
              <div class="m-icon-border" @click="refeshData">
                <div class="m-icon reload-icon"></div>
              </div>
            </MTooltip>
            <MTooltip id="filter-icon" text="Bộ lọc" :position="'bottom'">
              <div class="m-icon-border" @click="onShowAdvanceFilter">
                <div class="m-icon filter-icon"></div>
              </div>
            </MTooltip>
            <MTooltip id="export-icon" text="Xuất khẩu" :position="'bottom'">
              <div class="m-icon-border" @click="exportToExcel">
                <div class="m-icon export-icon"></div>
              </div>
            </MTooltip>
            <div class="setting-column">
              <MTooltip
                id="setting-icon"
                text="Tùy chỉnh cột"
                :position="'bottom'"
              >
                <div
                  class="m-icon-border"
                  id="table-column-custom"
                  @click="onClickSetting"
                >
                  <div class="m-icon setting-icon"></div>
                </div>
              </MTooltip>
              <DxPopover
                target="#table-column-custom"
                :visible="isPopover"
                :width="350"
                position="bottom"
              >
                <div class="content-container">
                  <div class="content-custom">
                    <div class="p-12">
                      <div class="flex-item justify-between">
                        <div>
                          <div>
                            <div class="title">Tùy chỉnh cột</div>
                          </div>
                        </div>
                        <div
                          @click="hideSetting"
                          class="m-icon close-icon"
                          style="cursor: pointer"
                        ></div>
                      </div>
                    </div>
                    <div class="list-group-wrap">
                      <DxScrollView
                        id="scroll"
                        style="width: 100%; height: 100%"
                        show-scrollbar="always"
                        direction="vertical"
                      >
                        <DxSortable
                          id="list"
                          drop-feedback-mode="push"
                          item-orientation="vertical"
                          drag-direction="both"
                          @drag-start="onDragStart"
                          @reorder="onReorder"
                        >
                          <!-- <template #drag="{ data }">
                            <div
                              class="item dx-card dx-theme-text-color dx-theme-background-color"
                              style="
                                font-weight: bold;
                                width: 200px;
                                padding: 10px;
                              "
                            >
                              {{ data.itemData.Caption }}
                            </div>
                          </template> -->
                          <template #content>
                            <div
                              class="list-group"
                              v-for="item in lstHeaderTable"
                              :key="item.Field"
                            >
                              <div class="element">
                                <div class="list-group-item">
                                  <div class="flex-item justify-between">
                                    <div class="flex-item">
                                      <label class="containerCb ms-checkbox">
                                        <DxCheckBox
                                          v-model:value="item.IsCheck"
                                        />
                                      </label>
                                      <div
                                        class="columnName"
                                        :title="item.Caption"
                                      >
                                        {{ item.Caption }}
                                      </div>
                                    </div>
                                    <div
                                      class="m-icon list-icon"
                                      style="cursor: all-scroll"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </DxSortable>
                      </DxScrollView>
                    </div>
                    <div class="comand-wrap">
                      <div class="buttons flex-item c-g-16">
                        <dx-button
                          type="normal"
                          class="m-btn btn-cancel"
                          text="Mặc định"
                          @click="setDefaultSetting"
                        />
                        <dx-button
                          text="Lưu"
                          type="success"
                          class="m-btn"
                          @click="setChangeSetting"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </DxPopover>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isSelected"
        class="content__midle content__midle-options flex-item c-g-8"
      >
        <div class="content__midle-text">
          Đã chọn: {{ itemSelected.length }}
        </div>
        <dx-button
          type="normal"
          class="m-btn m-btn-unselect"
          text="Bỏ chọn"
          @click="unSelectAll"
        />
        <div v-if="isShowRefuse">
          <dx-button
            text="Từ chối"
            type="normal"
            icon="m-icon-refuse"
            class="m-btn m-btn-refuse"
            @click="onRefuseStatusMultiple"
          />
        </div>
        <div v-if="isShowApproved">
          <dx-button
            text="Đuyệt"
            type="normal"
            icon="m-icon-apply"
            class="m-btn m-btn-apply"
            @click="onApprovedStatusMultiple"
          />
        </div>
        <dx-button
          text="Xuất khẩu"
          type="normal"
          icon="m-icon-export"
          class="m-btn m-btn-export"
          @click="exportToExcel"
        />
        <dx-button
          text="Xóa"
          type="normal"
          icon="m-icon-recycle"
          class="m-btn m-btn-deteteall"
          @click="onShowPopupDeleteAll"
        />
      </div>
      <div class="employeeDetail">
        <dx-data-grid
          class="myDataGrid"
          noDataText=""
          :dataSource="dataSources.Data"
          :remote-operations="false"
          :allow-column-reordering="true"
          :row-alternation-enabled="true"
          :show-borders="false"
          :hover-state-enabled="true"
          key-expr="RestDetailId"
          :width="'100%'"
          :height="'100%'"
          :selected-row-keys="itemSelected"
          @selection-changed="itemSelectedChange"
        >
          <DxColumnFixing :enabled="true" />
          <DxSelection
            mode="multiple"
            showCheckBoxesMode="always"
            selectAllMode="page"
            width="40px"
          >
          </DxSelection>
          <DxColumn
            v-for="item in lstHeaderTableRender"
            :key="item.TabOrder"
            :dataField="item.Field"
            :caption="item.Caption"
            :width="item.Width"
            :alignment="item.Alignment"
            :fixed="item.Fixed"
            :cell-template="item.Template"
            :format="item.Format"
            :data-type="item.DataType"
          />
          <template #fullname-template="{ data }">
            <div class="flex-item c-g-8">
              <div
                class="fullname-avatar"
                :style="`background-color: rgb(
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)}
            );`"
              >
                {{ firstAndLastLetters(data.value) }}
              </div>
              <span>{{ data.value }}</span>
            </div>
          </template>
          <template #status="{ data }">
            <div>
              <span
                class="status-type"
                :class="{
                  'approved-status':
                    data.value == $MISAResource.STATUS_NAME.APPROVED,
                  'pending-status':
                    data.value == $MISAResource.STATUS_NAME.PENDING,
                  'refuse-status':
                    data.value == $MISAResource.STATUS_NAME.REFUSE,
                }"
                >{{ data.value }}</span
              >
            </div>
          </template>
          <dx-column
            :fixed="true"
            fixed-position="right"
            caption=""
            cell-template="features-cell"
            width="96px"
            data-field="RestDetailId"
          />
          <template #features-cell="{ data }">
            <div class="ms-feature flex-item c-g-16">
              <div style="position: relative">
                <router-link :to="`/RestDetail/${data.value}`"
                  ><div class="circle-icon flex-item">
                    <div class="m-icon update-icon" title="Sửa"></div></div
                ></router-link>
              </div>
              <div style="position: relative">
                <div class="circle-icon flex-item">
                  <div
                    class="m-icon delete-icon"
                    title="Xóa"
                    @click="onShowPopupDelete(data.value)"
                  ></div>
                </div>
              </div>
            </div>
          </template>

          <DxPaging :page-size="filter.PageSize" />
          <DxLoadPanel :enabled="false" />
          <DxPager :enable="false" :visible="true"> </DxPager>
        </dx-data-grid>
        <MPaging
          @onChangePageSize="onChangePageSize"
          @onChangPageNumber="onChangPageNumber"
          :dataSources="dataSources"
        ></MPaging>

        <div class="m-popup">
          <dx-popup
            v-model:visible="isShowPopup"
            :width="415"
            :height="190"
            title="Cảnh báo"
            :show-close-button="true"
            :drag-enabled="false"
            :showTitle="true"
          >
            <div class="m-popup-content">
              {{ $MISAResource.CONTENT_POPUP.DELETE_ONE }}
            </div>
            <div class="m-popup-btn c-g-8">
              <dx-button
                type="normal"
                class="m-btn btn-cancel"
                text="Hủy"
                @click="hidePopup"
              />
              <dx-button
                text="Xóa"
                type="success"
                class="m-btn m-btn-error"
                @click="confirmDelete(value)"
              />
            </div>
          </dx-popup>
        </div>
        <div class="m-popup">
          <dx-popup
            v-model:visible="isShowPopupDeleteAll"
            :width="415"
            :height="190"
            title="Cảnh báo"
            :show-close-button="true"
            :drag-enabled="false"
            :showTitle="true"
          >
            <div class="m-popup-content">
              {{ $MISAResource.CONTENT_POPUP.DELETE_MULPTY }}
            </div>
            <div class="m-popup-btn c-g-8">
              <dx-button
                type="normal"
                class="m-btn btn-cancel"
                text="Hủy"
                @click="hidePopup"
              />
              <dx-button
                text="Xóa"
                type="success"
                class="m-btn m-btn-error"
                @click="confirmDelete"
              />
            </div>
          </dx-popup>
        </div>
      </div>
    </div>
    <div
      class="advanced-filter flex flex-direction"
      :class="[iShowAdvanceFilter ? 'w-30' : '']"
    >
      <div class="header-filter flex flex-direction justify-between">
        <div class="flex-item justify-between">
          <h1 style="font-size: 20px">Bộ lọc</h1>
          <div class="m-icon close-icon" @click="onShowAdvanceFilter"></div>
        </div>
        <div
          class="content__midle-left flex-item"
          style="position: relative; margin-top: 12px"
        >
          <span class="m-icon search-filter-icon"></span>
          <dx-text-box
            :placeholder="'Tìm kiếm'"
            class="textbox-search search-filter m-b-8"
            style="width: 210px"
            value-change-event="keyup"
          >
          </dx-text-box>
        </div>
      </div>
      <div class="content-filter">
        <MFilterItem @onFilter="onFilter" :lstFilter="lstFilter"></MFilterItem>
      </div>
      <div class="footer-filter">
        <dx-button
          type="normal"
          class="m-btn btn-cancel w-100"
          text="Bỏ lọc"
          @click="onSetDefaultFilter"
        />

        <dx-button
          text="Áp dụng"
          type="success"
          class="m-btn w-100"
          @click="onSubmitFilter"
        />
      </div>
    </div>
  </div>

  <div class="m-show-nodata" v-if="isShowNoData">
    <div>{{ $MISAResource.NODATA.NODATA }}</div>
  </div>
  <MLoading v-if="isShowLoading"></MLoading>
</template>

<script>
import _ from "lodash";
import debounce from "lodash";

import { PAGING_OPTIONS } from "@/js/data";
import { MISAResource } from "@/js/base/resource";
import MPaging from "@/components/base/MPaging.vue";
import MTooltip from "@/components/base/MTooltip.vue";
import MFilterItem from "@/components/MFilterItem.vue";
import MLoading from "@/components/MLoading.vue";
import { STATUS } from "@/js/data";
import { DEPARTMENT } from "@/js/data";
import { OPTION_TOAST_MESS_SUCCESS } from "@/js/toast";
import { LSTHEADER_TABLE } from "@/js/constant";
import AXIOS_RESTDETAIL from "@/axios/detail";
import AXIOS_RESTTABLE from "@/axios/resttable";
import { FILTER_OPTIONS } from "@/js/constant";

import { defineComponent, ref, reactive, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import { DxTextBox } from "devextreme-vue";
import { DxSelectBox } from "devextreme-vue";
import { DxPopup, DxToolbarItem, DxPosition } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue/button";
import DxTreeView from "devextreme-vue/tree-view";
import { DxPopover } from "devextreme-vue/popover";
import DxScrollView from "devextreme-vue/scroll-view";
import DxSortable from "devextreme-vue/sortable";
import { DxCheckBox } from "devextreme-vue/check-box";
import DxDropDownBox from "devextreme-vue/drop-down-box";

import {
  DxDataGrid,
  DxColumn,
  DxColumnFixing,
  DxPaging,
  DxScrolling,
  DxSelection,
  DxPager,
  DxSearchPanel,
  DxLoadPanel,
} from "devextreme-vue/data-grid";
import { MISAEnum } from "@/js/base/enum";

export default {
  name: "MRestList",
  components: {
    DxPosition,
    DxToolbarItem,
    DxPopup,
    DxSelectBox,
    DxTextBox,
    MTooltip,
    MPaging,
    DxLoadPanel,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxColumnFixing,
    DxButton,
    DxPaging,
    DxScrolling,
    DxPager,
    DxSelection,
    MLoading,
    DxTreeView,
    DxPopover,
    DxScrollView,
    DxSortable,
    DxCheckBox,
    DxDropDownBox,
    MFilterItem,
  },
  setup() {
    //Lọc nâng cao
    const lstFilter = ref(_.cloneDeep(FILTER_OPTIONS));
    const arrFilter = ref();

    const toast = useToast();
    const dataSources = ref([]);
    const showPageSizeSelector = ref(true);
    const showInfo = ref(true);
    const filter = reactive(PAGING_OPTIONS);
    const showNavButtons = ref(true);
    const displayMode = ref("compact");
    const textSearch = ref("");
    const isShowPopup = ref(false);
    const restDetailId = ref("");
    const isToast = ref(false);
    const messageToast = ref("");
    const typeToast = ref("");
    const isShowLoading = ref(false);
    const isShowNoData = ref(false);
    const isSelected = ref(false);
    const itemSelected = ref([]);
    const contentPopup = ref("");
    const statusOptions = reactive(STATUS);
    const searchStatus = ref(3);
    const isShowPopupDeleteAll = ref(false);
    const isShowRefuse = ref(true);
    const isShowApproved = ref(true);
    const iShowAdvanceFilter = ref(false);

    const treeBoxValue = ref(null);
    const isTreeBoxOpened = ref(false);

    const departmentOptions = reactive(DEPARTMENT);
    const lstHeaderTable = ref();
    const lstHeaderTableRender = ref();

    /*
     * Hàm thực hiện áp dụng bộ lọc
     * CreatedBy: NVTAN(18/03/2023)
     */
    const onSubmitFilter = () => {
      getRestDetailSearchAndPaging(filter.Filters, filter);
    };

    /*
     * Hàm lấy mảng gồm các đối tượng cần lọc
     * CreatedBy: NVTAN(18/03/2023)
     */
    const onFilter = (data) => {
      arrFilter.value = data.value;
    };

    /*
     * Hàm gán giá trị rỗng cho đối tượng không lọc
     * CreatedBy: NVTAN(18/03/2023)
     */
    watch(
      () => _.cloneDeep(lstFilter.value),
      (newVal) => {
        lstFilter.value.map((item) => {
          if (!item.IsCheck) {
            item.Value = "";
          }
        });
      }
    );

    /*
     * Hàm tính toán lại Filters
     * CreatedBy: NVTAN(18/03/2023)
     */
    watch(
      () => _.cloneDeep(arrFilter.value),
      (newVal) => {
        filter.Filters = newVal
          .filter((x) => x.IsCheck != false)
          .map((item) => {
            return {
              Field: item.Field,
              Operator: item.Operator,
              Value: item.Value,
              DataType: item.Type,
            };
          });
      }
    );

    /*
     * Hàm lấy danh sách cột
     * CreatedBy: NVTAN(12/03/2023)
     */
    const getAllRestTableList = async () => {
      try {
        let response = await AXIOS_RESTTABLE.getAllRestTable();
        if (response) {
          lstHeaderTable.value = _.cloneDeep(response.data);
          lstHeaderTableRender.value = _.cloneDeep(response.data).filter(
            (x) => x.IsCheck == true
          );
          console.log(lstHeaderTableRender.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllRestTableList();
    /**
     * Hàm lấy xóa danh sách cột
     * CreatedBy: NVTAN(12/03/2023)
     */
    const deleteAllRestTable = async () => {
      try {
        await AXIOS_RESTTABLE.deleteAllRestTable();
      } catch (error) {
        console.log(error);
      }
    };
    /**
     * Hàm chèn danh sách cột
     * CreatedBy: NVTAN(12/03/2023)
     */
    const insertMulptyRestTable = async (params) => {
      try {
        await AXIOS_RESTTABLE.insertMulptyRestTable(params);
      } catch (error) {
        console.log(error);
      }
    };
    /*
     * Hàm kiểm tra sự thay đổi của giá trị tìm kiếm theo phòng ban, gọi lại dữ liệu
     * CreatedBy: NVTAN(12/03/2023)
     */
    watch(treeBoxValue, (newVal) => {
      Object.keys(departmentOptions).map((key) => {
        if (newVal != null) {
          if (newVal[0] == 1) {
            filter.DepartmentName = null;
          } else if (departmentOptions[key].DepartmentId == newVal[0]) {
            filter.DepartmentName = departmentOptions[key].DepartmentName;
          }
        } else {
          filter.DepartmentName = null;
        }
      });
      refeshData(filter);
    });
    /*
     * Hàm mở popover setting
     * CreatedBy: NVTAN(12/03/2023)
     */
    const isPopover = ref(false);
    const onClickSetting = () => {
      isPopover.value = !isPopover.value;
    };

    /*
     * Hàm xử lý khi drag
     * CreatedBy: NVTAN(12/03/2023)
     */
    const onDragStart = (e) => {
      e.itemData = lstHeaderTable.value[e.fromIndex];
    };

    /*
     * Hàm xử lý khi drag
     * CreatedBy: NVTAN(12/03/2023)
     */
    const onReorder = (e) => {
      lstHeaderTable.value.splice(e.fromIndex, 1);
      lstHeaderTable.value.splice(e.toIndex, 0, e.itemData);
    };
    /*
     * Hàm đóng popover setting
     * CreatedBy: NVTAN(12/03/2023)
     */
    const hideSetting = () => {
      isPopover.value = false;
    };
    /*
     * Hàm thay đổi list header table sau khi drag
     * CreatedBy: NVTAN(12/03/2023)
     */
    const setChangeSetting = async () => {
      lstHeaderTable.value.forEach((item, index) => {
        item.TabOrder = index + 1;
      });
      await deleteAllRestTable();
      await insertMulptyRestTable(lstHeaderTable.value);
      setTimeout(() => {
        getAllRestTableList();
      }, 2000);
      hideSetting();
      refeshData(filter);
    };
    /*
     * Hàm set list header table về mặc định
     * CreatedBy: NVTAN(12/03/2023)
     */
    const setDefaultSetting = () => {
      lstHeaderTable.value = _.cloneDeep(LSTHEADER_TABLE);
      lstHeaderTableRender.value = _.cloneDeep(LSTHEADER_TABLE).filter(
        (x) => x.IsCheck != false
      );
      hideSetting();
      refeshData(filter);
    };

    /**
     * Hàm theo dõi thay đổi statusid để tìm kiếm theo statusId
     * Create By NVTAN 07/03/2023
     */
    watch(searchStatus, (newVal) => {
      if (newVal == MISAEnum.STATUS_ID.OTHER) {
        filter.StatusId = null;
      } else {
        filter.StatusId = newVal;
      }
      refeshData(filter);
    });
    /**
     * Hàm set value khi checkbox
     * Create By NVTAN 07/03/2023
     */
    const itemSelectedChange = (data) => {
      itemSelected.value = data.selectedRowKeys;
      if (itemSelected.value?.length) {
        isSelected.value = true;
        contentPopup.value = MISAResource.CONTENT_POPUP.DELETE_MULPTY;
      } else {
        contentPopup.value = MISAResource.CONTENT_POPUP.DELETE_ONE;
        isSelected.value = false;
      }
    };

    /**
     * Hàm uncheck
     * Create By NVTAN 07/03/2023
     */
    const unSelectAll = () => {
      itemSelected.value = null;
      isSelected.value = false;
    };

    /**
     * Thay đổi số bản ghi trên một trang
     * Create By NVTAN 07/03/2023
     */
    const onChangePageSize = (value) => {
      filter.PageNumber = 1;
      filter.PageSize = value;
      getRestDetailSearchAndPaging(filter.Filters, filter);
    };
    /**
     * Lấy chữ cái đầu tiền và chữ cái cuối cùng để ghép avatar
     * Create By NVTAN 09/03/2023
     */
    const firstAndLastLetters = (string) => {
      const words = _.words(_.trimEnd(string));
      const firstLetter = string.charAt(0);
      const lastLetter = _.upperCase(_.last(_.map(words, (w) => _.first(w))));
      return `${firstLetter}${lastLetter}`;
    };
    /**
     * Thay đổi trang hiện tại
     * Create By NVTAN 07/03/2023
     */
    const onChangPageNumber = (value) => {
      filter.PageNumber = value;
      getRestDetailSearchAndPaging(filter.Filters, filter);
    };
    /**
     * Kiểm tra thay đổi textsearch gọi lại api
     * Create By NVTAN 07/03/2023
     */
    watch(
      textSearch,
      _.debounce((newVal) => {
        filter.PageNumber = 1;
        filter.Keyword = newVal;
        getRestDetailSearchAndPaging(filter.Filters, filter);
      }, 200)
    );
    /**
     * Hàm lấy danh sách đơn theo phân trang và tìm kiếm
     * Create By NVTAN 06/03/2023
     */
    const getRestDetailSearchAndPaging = async (filters, params) => {
      try {
        isShowLoading.value = true;
        let response = await AXIOS_RESTDETAIL.getRestDetailSearchPaging(
          filters,
          params
        );
        if (response) {
          dataSources.value = response.data;
          setTimeout(() => {
            isShowLoading.value = false;
          }, 300);
          if (response.data.TotalRecord < 1) {
            isShowNoData.value = true;
          } else {
            isShowNoData.value = false;
          }
        }
      } catch (error) {
        console.log(error);
        isToast.value = true;
        messageToast.value = error.response.data.MoreInfo;
        typeToast.value = MISAResource.TOAST.TYPE_ERROR;
      }
    };
    /**
     * Hàm refesh dữ liệu
     * Create By NVTAN 06/03/2023
     */
    const refeshData = () => {
      filter.PageNumber = 1;
      getRestDetailSearchAndPaging(filter.Filters, filter);
    };

    /**
     * Hàm lấy danh sách đơn theo phân trang và tìm kiếm
     * Create By NVTAN 06/03/2023
     */
    getRestDetailSearchAndPaging(filter.Filters, filter);

    /**
     * Hàm hiển thị popup xóa đơn
     * Create By NVTAN 06/03/2023
     */
    const onShowPopupDelete = (value) => {
      restDetailId.value = value;
      isShowPopup.value = true;
    };
    /**
     * Hàm hiển thị popup xóa nhiều đơn
     * Create By NVTAN 06/03/2023
     */
    const onShowPopupDeleteAll = () => {
      isShowPopupDeleteAll.value = true;
    };
    /**
     * Hàm chọn xóa đơn
     * Create By NVTAN 06/03/2023
     */
    const confirmDelete = () => {
      if (itemSelected.value?.length) {
        onDeleteAll(itemSelected.value);
      } else if (restDetailId.value != null) {
        onDeleteRest(restDetailId.value);
      }
    };
    /**
     * Hàm ẩn popup
     * Create By NVTAN 06/03/2023
     */
    const hidePopup = () => {
      if (isShowPopup.value) {
        isShowPopup.value = false;
      } else {
        isShowPopupDeleteAll.value = false;
      }
    };
    /**
     * Hàm xóa đơn
     * Create By NVTAN 06/03/2023
     */
    const onDeleteRest = async (value) => {
      try {
        let response = await AXIOS_RESTDETAIL.deleteRest(value);
        if (response) {
          toast.success(
            MISAResource.TOAST.MESSAGE_DELETE,
            OPTION_TOAST_MESS_SUCCESS
          );
          hidePopup();
          refeshData();
        }
      } catch (error) {
        console.log(error);
        isToast.value = true;
        messageToast.value = error.response.data.MoreInfo;
        typeToast.value = MISAResource.TOAST.TYPE_ERROR;
      }
    };

    /**
     * Hàm xóa nhiều đơn
     * Create By NVTAN 06/03/2023
     */
    const onDeleteAll = async (params) => {
      try {
        let response = await AXIOS_RESTDETAIL.deleteMultipleRest(params);
        if (response) {
          hidePopup();
          refeshData();
          toast.success(
            MISAResource.TOAST.MESSAGE_DELETE,
            OPTION_TOAST_MESS_SUCCESS
          );
        }
      } catch (error) {
        console.log(error);
        isToast.value = true;
        messageToast.value = error.response.data.MoreInfo;
        typeToast.value = MISAResource.TOAST.TYPE_ERROR;
      }
    };

    /**
     * Hàm cập nhật trạng thái nhiều đơn
     * Create By NVTAN 06/03/2023
     */
    const onUpdateStatus = async (statusId, params) => {
      try {
        let response = await AXIOS_RESTDETAIL.updateMultipleRestDetail(
          statusId,
          params
        );
        if (response) {
          unSelectAll();
          refeshData();
          isToast.value = true;
          messageToast.value = MISAResource.TOAST.MESSAGE_UPDATE;
          typeToast.value = MISAResource.TOAST.TYPE_SUCCESS;
        }
      } catch (error) {
        console.log(error);
        isToast.value = true;
        messageToast.value = error.response.data.MoreInfo;
        typeToast.value = MISAResource.TOAST.TYPE_ERROR;
      }
    };

    /**
     * Hàm cập nhật trạng thái duyệt
     * Create By NVTAN 09/03/2023
     */
    const onApprovedStatusMultiple = () => {
      onUpdateStatus(0, itemSelected.value);
    };

    /**
     * Hàm cập nhật trạng thái từ chối
     * Create By NVTAN 09/03/2023
     */
    const onRefuseStatusMultiple = () => {
      onUpdateStatus(2, itemSelected.value);
    };

    /**
     * Hàm xuất khẩu dữ liệu theo id
     * Create By NVTAN 09/03/2023
     */
    const exportToExcel = async () => {
      try {
        isShowLoading.value = true;
        let response = await AXIOS_RESTDETAIL.exportToExcel(itemSelected.value);
        if (response) {
          const href = URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "Đơn_xin_nghỉ_Tất cả đơn vị.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
          unSelectAll();
          isShowLoading.value = false;
        }
      } catch (error) {
        console.log(error);
        isToast.value = true;
        messageToast.value = error.response.data.MoreInfo;
        typeToast.value = MISAResource.TOAST.TYPE_ERROR;
      }
    };
    /*
     * Mở tree item đơn vị
     * CreatedBy: NVTAN(12/03/2023)
     */
    const onTreeItemClick = () => {
      isTreeBoxOpened.value = false;
    };

    /*
     * Set lại value cho text đơn vị
     * CreatedBy: NVTAN(12/03/2023)
     */
    const treeView_itemSelectionChanged = (e) => {
      treeBoxValue.value = e.component.getSelectedNodeKeys();
    };
    /*
     * Hàm ẩn hiện bộ lọc nâng cao
     * CreatedBy: NVTAN(12/03/2023)
     */
    const onShowAdvanceFilter = () => {
      iShowAdvanceFilter.value = !iShowAdvanceFilter.value;
    };

    /*
     * Hàm thực hiện bỏ filter
     * CreatedBy: NVTAN(18/03/2023)
     */
    const onSetDefaultFilter = () => {
      filter.Filters = [];
      filter.PageNumber = 1;
      lstFilter.value = _.cloneDeep(FILTER_OPTIONS);
      getRestDetailSearchAndPaging(filter.Filters, filter);
      iShowAdvanceFilter.value = false;
    };
    return {
      onSetDefaultFilter,
      onSubmitFilter,
      onFilter,
      arrFilter,
      lstFilter,
      deleteAllRestTable,
      insertMulptyRestTable,
      getAllRestTableList,
      iShowAdvanceFilter,
      onShowAdvanceFilter,
      isTreeBoxOpened,
      treeBoxValue,
      onTreeItemClick,
      treeView_itemSelectionChanged,
      setDefaultSetting,
      setChangeSetting,
      hideSetting,
      isPopover,
      onDragStart,
      onReorder,
      onClickSetting,
      lstHeaderTable,
      lstHeaderTableRender,
      toast,
      isShowRefuse,
      isShowApproved,
      contentPopup,
      itemSelected,
      isShowPopup,
      isShowPopupDeleteAll,
      textSearch,
      dataSources,
      showPageSizeSelector,
      showInfo,
      showNavButtons,
      displayMode,
      filter,
      isShowLoading,
      isShowNoData,
      isSelected,
      statusOptions,
      searchStatus,
      departmentOptions,
      getRestDetailSearchAndPaging,
      refeshData,
      onChangePageSize,
      onChangPageNumber,
      onShowPopupDelete,
      onShowPopupDeleteAll,
      hidePopup,
      confirmDelete,
      onDeleteRest,
      onUpdateStatus,
      onApprovedStatusMultiple,
      onRefuseStatusMultiple,
      unSelectAll,
      itemSelectedChange,
      onDeleteAll,
      firstAndLastLetters,
      exportToExcel,
    };
  },
};
</script>

<style>
@import url(../css/views/RestList.css);
.m-select-status.dx-dropdowneditor {
  max-width: 115px;
  border: none;
}

.m-select-status input {
  font-weight: 700 !important;
  cursor: text !important;
}
.fullname-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-type {
  padding: 6px;
  border-radius: 4px;
  min-width: 8 0px;
}

.approved-status {
  border: 1px solid #11aa7a;
  color: #11aa7a;
  background-color: #b9f8e4;
}
.pending-status {
  border: 1px solid #6153df;
  color: #6153df;
  background-color: #ebe9fb;
}
.refuse-status {
  border: 1px solid #ef292f;
  color: #ef292f;
  background-color: #fee8e7;
}

.m-show-nodata {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate((-50%, -50%));
}
.m-show-nodata div {
  opacity: 0.5;
  font-style: italic;
}
.m-show-nodata :before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  background-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/empty_state.41c4796.svg);
  background-repeat: no-repeat;
  width: 50px;
  height: 68px;
  background-position: -255px -190px;
  background-size: 670px;
}
.m-tree-view {
  padding: 20px;
}
.dx-treeview-item.dx-state-hover {
  background-color: #ffede2 !important;
  color: #212121;
}
.dx-treeview-item {
  margin: 0 0 2px 6px;
  border-radius: 4px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
  padding: 0;
}

.dx-item-content.dx-treeview-item-content {
  padding: 4px 8px;
  width: 100%;
  height: 100%;
}
.dx-treeview-item-without-checkbox.dx-state-focused > .dx-treeview-item {
  background-color: #fff;
  color: #212121;
}
.dx-treeview-item-without-checkbox.dx-state-selected > .dx-treeview-item {
  color: var(--primary-color);
  background-color: #ffede2;
}
.dx-treeview-toggle-item-visibility {
  top: 4px;
  left: 0;
  width: 24px;
  height: 24px;
  -webkit-mask-position: -288px -48px;
  -moz-mask-position: -288px -48px;
  -ms-mask-position: -288px -48px;
  -o-mask-position: -288px -48px;
  mask-position: -288px -48px;
  margin-right: 6px;
  -webkit-mask-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/Icon.c6e6c5f.svg) !important;
  -moz-mask-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/Icon.c6e6c5f.svg) !important;
  -ms-mask-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/Icon.c6e6c5f.svg) !important;
  -o-mask-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/Icon.c6e6c5f.svg) !important;
  mask-image: url(https://amisplatform.misacdn.net/apps/timesheet/static/img/Icon.c6e6c5f.svg) !important;
  -webkit-mask-repeat: no-repeat;
  -moz-mask-repeat: no-repeat;
  -ms-mask-repeat: no-repeat;
  -o-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  background-color: #666;
}
.dx-treeview-toggle-item-visibility.dx-treeview-toggle-item-visibility-opened {
  -webkit-mask-position: -264px -48px;
  -moz-mask-position: -264px -48px;
  -ms-mask-position: -264px -48px;
  -o-mask-position: -264px -48px;
  mask-position: -264px -48px;
}
.dx-treeview-toggle-item-visibility.dx-treeview-toggle-item-visibility-opened {
  font: 22px/22px DXIcons;
  text-align: center;
}
</style>