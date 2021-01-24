---
title: Golang 初级技术
date: 2020-12-27 20:18:15
tags:
    - golang
    - interview
---

最近需要答辩, 收集了部分来自各方的实战面试内容, 便于巩固.

**如有不当之处，请予指正 🙏.**

<!-- more -->

- [TODO](#todo)
- [参考链接](#参考链接)
- [基础篇](#基础篇)
- [概念篇](#概念篇)
- [框架篇](#框架篇)
  - [开源框架](#开源框架)
- [数据库篇](#数据库篇)
- [线上经验](#线上经验)
- [编程题](#编程题)
  - [实现字符串匹配检查](#实现字符串匹配检查)
  - [实现一种或多种负载均衡算法](#实现一种或多种负载均衡算法)

## TODO

- [ ] 尽可能完善题目答案

## 参考链接

- [ShowMeBug-初级 Golang 面试视频](https://www.bilibili.com/video/BV1yy4y1v7ad)

## 基础篇

> new 和 make 的区别?

都是用于**分配内存**, 区别在于:

前者主要用于创建返回类型的指针引用;

后者只能用于 slice / map / channel 的初始化.

补充: 其实 new 不常用, 相比较下字面量初始化的方式更为常用, 同时获取指针引用之后, 对于对象的赋值, 还会导致[间接赋值的逃逸问题](./golang-escape-analysis.md)

> 函数调用传引用类型还是值类型? (涉及逃逸问题)

一般采用引用类型, 少数采用值类型, 这里主要参考的是: 函数内需要或者不需要修改引用类型的值;

其他情况考虑逃逸的问题, 若函数是变量, 则函数参数是引用的话, 会导致[函数变量逃逸](./golang-escape-analysis.md).

> 反射的原理? (如何解析 struct 的 tag)

> recover 能捕获子 goroutine 的 panic 吗?

> 锁相关的使用情况?

> 自己使用 channel 的使用场景以及坑?

## 概念篇

> 内存管理

1. 线程协程的占用内存大小?

> 进程模型

1. 进程状态转换

> 线程模型

1. 线程如果发生 OOM 如何排查处理? 同理 goroutine 发生 OOM ?

> 调度逻辑

1. 什么时候 goroutine 阻塞? 调度器如何处理?
2. goroutine 一直占用资源如何处理?

## 框架篇

> 项目中如何错误处理?

> 会自定义 error 错误处理吗?

> gRPC 使用情况? 服务发现/负债均衡的实现?

> proto 文件如何管理? (monorepo 尝试)

> 如果中心节点挂掉如何处理? (Raft算法保证可靠性)

### 开源框架

Web:

- [gin](https://github.com/gin-gonic/gin)
- [beego](https://github.com/beego/beego)

> Gin 中的自定义参数校验规则?

> Gin 中间件的使用情况

Game:

- [leaf](https://github.com/name5566/leaf)
- [origin](https://github.com/duanhf2012/origin)

> leaf 的消息路由方式?

## 数据库篇

- mongodb
- mysql
- redis

> redis mongodb mysql 的锁机制?

> redis 的基本内容, 使用情况?

> redis 持久性如何处理?

> mysql ORM使用情况? (XORM / GORM)

> mysql 分库分表情况? (分片存储, HBase存储)

> 主从模式/集群模式/哨兵模式区别?

## 线上经验

> 线上 bug 如何排查?

> 如何分析线上性能瓶颈?

## 编程题

### 实现字符串匹配检查

正确输出以下结果: 即需要同时成对的符号, 即判断成功

```txt
"[()]"  => true
"[(]"   => false
"{]]"   => false
```

### 实现一种或多种负载均衡算法
