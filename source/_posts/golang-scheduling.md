---
title: Golang Scheduling
date: 2020-12-26 15:40:47
tags:
    - golang
    - scheduling
---

熟悉 Golang 的调度原理, 能够帮助编写更加高效的并发逻辑; 同时还能避免调度相关的坑.

- [GPM 模型](#gpm-模型)
- [参考链接](#参考链接)

<!-- more -->

## GPM 模型

- G(Goroutine)
- P(Process)
- M(Machine)

## 参考链接

- [吴戴均-Go 调度模型](https://wudaijun.com/2018/01/go-scheduler/)
- [吴戴均-再谈调度](https://wudaijun.com/2018/11/scheduler-blabla/)
- [达菲格-Go 语言调度（一）: 系统调度](https://www.jianshu.com/p/db0aea4d60ed)
- [达菲格-Go 语言调度（二）: goroutine 调度器](https://www.jianshu.com/p/cb6881a2661d)
- [达菲格-Go 语言调度（三）: 并发](https://www.jianshu.com/p/ef654413f2c1)