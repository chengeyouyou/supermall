<template>
  <div class="comment" v-if="Object.keys(commentInfo).length != 0">
    <div class="header">
      <div class="more">更多</div>
      <div>用户评价</div>
    </div>
    <div class="content">
      <div class="user">
        <img :src="commentInfo.user.avatar" alt />
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="comment-desc">{{commentInfo.content}}</div>
      <div class="goods-desc">
        <span>{{commentInfo.created | date}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="goods-img">
        <div v-for="(image,index) in commentInfo.images" :key="index" class="item">
          <img :src="image" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "common/utils.ts";
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    date(timestamp) {
      return format(timestamp * 1000, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0 10px;
  border-bottom: 5px solid #f2f5f8;
  .header {
    height: 40px;
    line-height: 40px;
    .more {
      float: right;
      margin-right: 10px;
    }
  }
  .content {
    font-size: 14px;
    line-height: 1.3;
    color: #4c4c4c;
    .user {
      img {
        width: 60px;
        border-radius: 50%;
        vertical-align: middle;
        padding-right: 10px;
      }
      margin-bottom: 10px;
    }
    .comment-desc {
      margin-bottom: 10px;
    }
    .goods-desc {
      span {
        padding: 0 10px;
      }
      margin-bottom: 10px;
    }
    .goods-img {
      display: flex;
      .item {
        margin-right: 10px;
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>