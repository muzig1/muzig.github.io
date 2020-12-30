---
title: Shell 笔记
date: 2020-12-19 15:22:53
tags:
    - shell
    - note
---

在项目中开发过程中, 难免会处理一些脚本化的业务, 编写 shell 脚本能帮助我们更方便的处理一些固定业务.

科技改变生活, 脚本释放双手.

<!-- more -->

- [基础语法](#基础语法)
  - [变量](#变量)
  - [字符串](#字符串)
  - [数组](#数组)
  - [注释](#注释)
- [传参](#传参)
- [流程控制](#流程控制)
  - [条件控制](#条件控制)
  - [循环控制](#循环控制)
- [函数](#函数)
- [重定向](#重定向)
  - [/dev/null 文件](#devnull-文件)
- [文件引用](#文件引用)

## 基础语法

### 变量

```bash
# 赋值等号两边不能添加空格
name='hello'
echo ${name}
```

```bash
# 常量
name='hello'
readonly name
```

```bash
# 删除变量
name='hello'
unset name
```

### 字符串

- 单引号
  - 原样输出, 不支持变量引用
- 双引号
  - 支持变量引用
  - 支持转义字符

```bash
# 获取字符串长度
name='hello'
echo ${#name}
```

```bash
# 提取字符串
name='hello world'
echo ${name:1:3} # 输出ell
```

```bash
# 查找字符串
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

### 数组

```bash
array_name=(value1 value2 ... valuen)
# 访问
v1=${array_name[0]}
```

### 注释

```bash
# 单行注释

:<<EOF
多行注释
多行注释
EOF符号可以换成其他, 比如`'之类的
EOF
```

## 传参

- $0: 文件名
- $1: 命令行执行的第一个参数
- $2: 命令行执行的第二个参数

![shell-arg](../img/shell-arg.png)

## 流程控制

关键字: break continue

### 条件控制

```bash
# 多行
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

# 单行
if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```

```bash
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
```

### 循环控制

```bash
# 多行
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

# 单行
for var in item1 item2 ... itemN; do command1; command2… done;
```

```bash
# 条件循环
while condition
do
    command
done

# 条件循环
until condition
do
    command
done

# 无限循环
while :
do
    command
done
```

## 函数

```bash
# 语法
[ function ] funname [()]

{

    action;

    [return int;]

}
```

```bash
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```

```md
输出结果:
-----函数开始执行-----
这是我的第一个 shell 函数!
-----函数执行完毕-----
```

## 重定向

![shell-redirect](../img/shell-redirect.png)

### /dev/null 文件

如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null：

```bash
command > /dev/null
```

## 文件引用

```bash
url="http://muzig.github.io"
```

```bash
# 使用 . 号来引用src.sh 文件
. ./src.sh

# 或者使用以下包含文件代码
source ./src.sh

echo "Blog：$url"
```

```md
输出:
Blog: http://muzig.github.io
```
