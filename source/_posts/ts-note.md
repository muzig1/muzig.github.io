---
title: TypeScript 笔记
date: 2021-01-10 19:16:43
tags:
    - ts
---

对于需要掌握前端技术, 对于 ts 的基础语法掌握也是必不可少的. 利于读懂前端源码.

<!-- more -->

- [基础语法](#基础语法)
  - [类型注解](#类型注解)
  - [接口](#接口)
  - [类](#类)
- [补充](#补充)

## 基础语法

- [官方手册指南](https://www.tslang.cn/docs/handbook/basic-types.html)

### 类型注解

ts 支持静态类型检查, 便于在运行之前, 提前发现代码问题.

```ts
function hello(name: string) {
  return "hello" + name;
}

let flag = "ts";
hello(flag);
```

### 接口

执行约束 object 类型的格式, 便于保证函数按照预期执行

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function say(p: Person) {
  return p.firstName + p.lastName;
}
let user = { firstName: "xiao", lastName: "ming" };
say(user);
```

### 类

提供面向对象编程的思想, 具体更多抽象能力

```ts
class Student {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = firstName + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function say(p: Person) {
  return p.firstName + p.lastName;
}
let user = new Student("xiao", "ming");
say(user);
```

## 补充

> ts & js 对大小写敏感; 对于属性名建议取名为小写, 因为 typeof 返回的类型名为小写.
