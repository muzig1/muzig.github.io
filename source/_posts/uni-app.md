---
title: uni-app 入门
date: 2021-03-05 15:10:44
tags:
    - uni-app
categories: 前端
---

最近需要搭建前端界面, 熟悉一下前端框架.

<!-- more -->

- [前言](#前言)
- [准备](#准备)
- [搭建项目代码](#搭建项目代码)
- [搭建本地服务](#搭建本地服务)
- [遇到的问题](#遇到的问题)
  - [跨域问题](#跨域问题)

## 前言

最早了解到vue, 大概浏览了一番评价都是挺好的, 而且容易上手, 所以顺势找到了多端开发框架uni-app, 基于vue来实现的, 所以这次探索从uni-app开始.

**持续更新...**

## 准备

1. 搭建项目 - 根据[官方文档](https://uniapp.dcloud.io/quickstart-hx)
2. 搭建本地服务 - 使用golang搭建本地http服务, 用于测试

## 搭建项目代码

```html
<template>
  <view class="content">
    <span>{{title}}</span>
    <p>{{text}}</p>
    <u-button @click="onTest">点我</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      text: "",
    };
  },
  onLoad() {},
  methods: {
    onTest: function () {
        // 使用uni-app内置的请求接口
      uni.request({
        url: "http://localhost:8081/index",
        data: {
          // text: "uni.request",
        },
        header: {
          // "custom-header": "hello", //自定义请求头信息
        },
        success: (res) => {
          this.title = "requestOK";
          this.text = res.data;
        },
      });
    },
  },
};
</script>
```

## 搭建本地服务

```golang
func main() {
	http.HandleFunc("/index", func(w http.ResponseWriter, r *http.Request) {
		_, _ = fmt.Fprintln(w, `{name:\"xiaoming\"}`)
	})
	_ = http.ListenAndServe(":8081", nil)
}
```

## 遇到的问题

### 跨域问题

- [解决方案链接](https://ask.dcloud.net.cn/article/35267)

自己在chrome调试的时候会存在跨域的问题, 文章指出**另外运行期间在HBuilderX的内置浏览器里是不存在跨域的**, 所以安装了hbuilder的内置浏览器调试.