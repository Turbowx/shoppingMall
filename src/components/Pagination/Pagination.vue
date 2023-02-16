<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="reduce()">上一页</button>
    <button v-if="this.startend.start > 1" @click="setPageNumber('1')">
      1
    </button>
    <button v-if="this.startend.start > 2">···</button>
    <span v-for="(page, index) in startend.end" :key="index">
      <button
        v-if="page >= startend.start"
        :class="{ active: page == pageNo }"
        @click="setPageNumber(page)"
      >
        {{ page }}
      </button>
    </span>
    <button v-if="this.startend.end < pagesNumber - 1">···</button>
    <button
      v-if="this.startend.end < pagesNumber"
      @click="setPageNumber(pagesNumber)"
    >
      {{ pagesNumber }}
    </button>
    <button :disabled="pageNo == pagesNumber" @click="plus()">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <h1>{{ startend }}</h1>
    <span>{{ pageNo }}</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总页数
    pagesNumber() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页的起始值和终止值
    startend() {
      const { pageNo, pagesNumber, continues } = this;
      let start = 0,
        end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】不正常现象【总页数没有连续页码多】
      if (continues > pagesNumber) {
        start = 1;
        end = pagesNumber;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        } else if (end > pagesNumber) {
          end = pagesNumber;
          start = pagesNumber - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    //点击页数
    setPageNumber(page) {
      this.$bus.$emit("setPageNumber", page);
    },
    //点击上一页
    reduce() {
      this.$bus.$emit("setPageNumber", this.pageNo - 1);
    },
    //点击下一页
    plus() {
      this.$bus.$emit("setPageNumber", this.pageNo + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>