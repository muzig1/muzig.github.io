---
title: Golang 初级面试
date: 2020-12-27 20:18:15
tags:
    - golang
    - interview
---

最近需要答辩, 收集了部分来自各方的实战面试内容, 便于巩固.

**如有不当之处，请予指正 🙏.**

<!-- more -->

## TODO

- [ ] 尽可能完善题目答案

## 参考链接

- [ShowMeBug-初级 Golang 面试视频](https://www.bilibili.com/video/BV1yy4y1v7ad)

## 基础篇

> new 和 make 的区别?

> 函数调用传引用类型还是值类型? (涉及逃逸问题)

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

- leaf 的消息路由方式?

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
