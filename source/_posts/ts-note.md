---
title: TypeScript 笔记
date: 2021-01-10 19:16:43
tags:
    - ts
categories: 前端
---

对于需要掌握前端技术, 对于 ts 的基础语法掌握也是必不可少的. 利于读懂前端源码.

<!-- more -->

- [TODO](#todo)
- [速览](#速览)
  - [类型注解](#类型注解)
  - [接口](#接口)
  - [类](#类)
  - [补充](#补充)
- [基础类型](#基础类型)
  - [字符串](#字符串)
  - [数组](#数组)
  - [元组 Tuple](#元组-tuple)
  - [枚举](#枚举)
  - [Any](#any)

## TODO

- [x] 速览
- [ ] 基础类型
- [ ] 变量声明
- [ ] 接口
- [ ] 函数
- [ ] 泛型
- [ ] 枚举
- [ ] 类型推导
- [ ] 类型兼容性
- [ ] 高级类型
- [ ] Symbols
- [ ] 迭代器和生成器
- [ ] 模块
- [ ] 命令空间
- [ ] 命令空间和模块
- [ ] 模块解析
- [ ] 声明合并
- [ ] JSX
- [ ] 装饰器
- [ ] Mixins
- [ ] 三斜线指令
- [ ] JS文件类型检查

## 速览

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

### 补充

> ts & js 对大小写敏感; 对于属性名建议取名为小写, 因为 typeof 返回的类型名为小写.

## 基础类型

### 字符串

```ts
// 字符串
let name: string = "TypeScript"
let sentence: string = `Hello ${ name }.`
```

### 数组

```ts
// 数组
let arr: number[] = [1,2,3]
let arr: Array<number> = [1,2,3] // 泛型数组
```

### 元组 Tuple

```ts
// 元组 Tuple
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

### 枚举

更好的描述一组数值

```ts
// 默认从0开始为元素编号
// 支持手动赋值
enum Color { Red, Green, Blue = 3}
let c: Color = Color.Green

// 支持打印枚举名
let colorName: string = Color[2] 
console.log(colorName)
// 输出:
// Color
```

### Any

