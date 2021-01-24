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
  - [Void](#void)
  - [null & undefined](#null--undefined)
  - [Never](#never)
  - [Object](#object)
  - [Any](#any)
  - [类型断言](#类型断言)
  - [关于let](#关于let)
- [变量声明](#变量声明)
  - [var声明](#var声明)
  - [let声明](#let声明)
  - [const声明](#const声明)
  - [解构](#解构)
    - [数组解构](#数组解构)
    - [对象解构](#对象解构)
  - [展开(与解构相反操作)](#展开与解构相反操作)
    - [数组展开](#数组展开)
    - [对象展开](#对象展开)

## TODO

- [x] 速览
- [x] 基础类型
- [x] 变量声明
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

### Void

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

### null & undefined

然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。

> 注意：我们鼓励尽可能地使用--strictNullChecks

```ts
let u: undefined = undefined
let n: null = null
```

### Never

never类型表示的是那些永不存在的值的类型。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）.

即使 any也不可以赋值给never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### Object

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### Any

对于暂时无法预期的类型, 可以使用 any 去描述

```ts
let msg: any = 100
msg = true // OK
msg = "foo" // OK

let arr: any[] = [1, "foo", "boo"]
arr[1] = 100 // OK
```

### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

> 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

```ts
// 第一种写法: 尖括号
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 第二种写法: as语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 关于let

你可能已经注意到了，我们使用let关键字来代替大家所熟悉的JavaScript关键字var。 let关键字是JavaScript的一个新概念，TypeScript实现了它。 我们会在以后详细介绍它，很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。

## 变量声明

### var声明

- 作用域规则
- 捕获变量特殊之处

### let声明

- 块作用域
- 重定义屏蔽
- 块级作用域变量获取 - 通过闭包

### const声明

- 声明之后不能修改; 但是可以修改对象内部值

### 解构

#### 数组解构

- 让数组变量更清晰
- 支持函数参数解构格式
- 支持...语法创建剩余变量

#### 对象解构

- 结构化对象成员
- ...语法支持结构余下对象成员
- 支持结构化之后重命名
- =语法支持缺省默认值
- 函数声明支持结构对象

### 展开(与解构相反操作)

#### 数组展开

```ts
let first = [1, 2];
let second = [3, 4];
// 浅拷贝
let bothPlus = [0, ...first, ...second, 5];
```

#### 对象展开

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

```ts
let obj: object = { a: "a", b: "b" };
let obj2: object = { ...obj, a: "b" }; // 不会重写 a 成员值 => a = "b"
let obj2: object = { a: "b", ...obj }; // 会重写 a 成员值 => a = "a"
console.log(obj2);
```

> 对象展开还有其它一些意想不到的限制

- 扩展之后, 会丢失了成员函数
- tsc不允许展开泛型函数上的类型参数

```ts
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```
