---
title: Shell 笔记
date: 2020-12-19 15:22:53
tags:
    - shell
    - note
categories: 脚本
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
- [运算符](#运算符)
  - [算数运算符](#算数运算符)
  - [逻辑运算符](#逻辑运算符)
  - [布尔运算符](#布尔运算符)
  - [关系运算符](#关系运算符)
  - [字符串运算符](#字符串运算符)
  - [文件测试运算符](#文件测试运算符)
- [流程控制](#流程控制)
  - [条件控制](#条件控制)
  - [循环控制](#循环控制)
- [函数](#函数)
- [重定向](#重定向)
  - [/dev/null 文件](#devnull-文件)
- [文件引用](#文件引用)
- [oh-my-zsh 源码](#oh-my-zsh-源码)
- [参考链接](#参考链接)

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

## 运算符

### 算数运算符

![算数](../img/shell-algorithm.png)

### 逻辑运算符

![逻辑](../img/shell-logic.png)

### 布尔运算符

![布尔](../img/shell-bool.png)

### 关系运算符

![关系](../img/shell-relation.png)

### 字符串运算符

![字符串](../img/shell-str.png)

### 文件测试运算符

![文件测试](../img/shell-file-test.png)

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

## oh-my-zsh 源码

```zsh
# If ZSH is not defined, use the current script's directory.
[[ -z "$ZSH" ]] && export ZSH="${${(%):-%x}:a:h}"

# Set ZSH_CACHE_DIR to the path where cache files should be created
# or else we will use the default cache/
if [[ -z "$ZSH_CACHE_DIR" ]]; then
  ZSH_CACHE_DIR="$ZSH/cache"
fi

# Check for updates on initial load...
if [ "$DISABLE_AUTO_UPDATE" != "true" ]; then
  source $ZSH/tools/check_for_upgrade.sh
fi

# Initializes Oh My Zsh

# add a function path
fpath=($ZSH/functions $ZSH/completions $fpath)

# Load all stock functions (from $fpath files) called below.
autoload -U compaudit compinit

# Set ZSH_CUSTOM to the path where your custom config files
# and plugins exists, or else we will use the default custom/
if [[ -z "$ZSH_CUSTOM" ]]; then
    ZSH_CUSTOM="$ZSH/custom"
fi


is_plugin() {
  local base_dir=$1
  local name=$2
  builtin test -f $base_dir/plugins/$name/$name.plugin.zsh \
    || builtin test -f $base_dir/plugins/$name/_$name
}

# Add all defined plugins to fpath. This must be done
# before running compinit.
for plugin ($plugins); do
  if is_plugin $ZSH_CUSTOM $plugin; then
    fpath=($ZSH_CUSTOM/plugins/$plugin $fpath)
  elif is_plugin $ZSH $plugin; then
    fpath=($ZSH/plugins/$plugin $fpath)
  else
    echo "[oh-my-zsh] plugin '$plugin' not found"
  fi
done

# Figure out the SHORT hostname
if [[ "$OSTYPE" = darwin* ]]; then
  # macOS's $HOST changes with dhcp, etc. Use ComputerName if possible.
  SHORT_HOST=$(scutil --get ComputerName 2>/dev/null) || SHORT_HOST=${HOST/.*/}
else
  SHORT_HOST=${HOST/.*/}
fi

# Save the location of the current completion dump file.
if [ -z "$ZSH_COMPDUMP" ]; then
  ZSH_COMPDUMP="${ZDOTDIR:-${HOME}}/.zcompdump-${SHORT_HOST}-${ZSH_VERSION}"
fi

# Construct zcompdump OMZ metadata
zcompdump_revision="#omz revision: $(builtin cd -q "$ZSH"; git rev-parse HEAD 2>/dev/null)"
zcompdump_fpath="#omz fpath: $fpath"

# Delete the zcompdump file if OMZ zcompdump metadata changed
if ! command grep -q -Fx "$zcompdump_revision" "$ZSH_COMPDUMP" 2>/dev/null \
   || ! command grep -q -Fx "$zcompdump_fpath" "$ZSH_COMPDUMP" 2>/dev/null; then
  command rm -f "$ZSH_COMPDUMP"
  zcompdump_refresh=1
fi

if [[ $ZSH_DISABLE_COMPFIX != true ]]; then
  source $ZSH/lib/compfix.zsh
  # If completion insecurities exist, warn the user
  handle_completion_insecurities
  # Load only from secure directories
  compinit -i -C -d "${ZSH_COMPDUMP}"
else
  # If the user wants it, load from all found directories
  compinit -u -C -d "${ZSH_COMPDUMP}"
fi

# Append zcompdump metadata if missing
if (( $zcompdump_refresh )); then
  # Use `tee` in case the $ZSH_COMPDUMP filename is invalid, to silence the error
  # See https://github.com/ohmyzsh/ohmyzsh/commit/dd1a7269#commitcomment-39003489
  tee -a "$ZSH_COMPDUMP" &>/dev/null <<EOF

$zcompdump_revision
$zcompdump_fpath
EOF
fi

unset zcompdump_revision zcompdump_fpath zcompdump_refresh


# Load all of the config files in ~/oh-my-zsh that end in .zsh
# TIP: Add files you don't want in git to .gitignore
for config_file ($ZSH/lib/*.zsh); do
  custom_config_file="${ZSH_CUSTOM}/lib/${config_file:t}"
  [ -f "${custom_config_file}" ] && config_file=${custom_config_file}
  source $config_file
done

# Load all of the plugins that were defined in ~/.zshrc
for plugin ($plugins); do
  if [ -f $ZSH_CUSTOM/plugins/$plugin/$plugin.plugin.zsh ]; then
    source $ZSH_CUSTOM/plugins/$plugin/$plugin.plugin.zsh
  elif [ -f $ZSH/plugins/$plugin/$plugin.plugin.zsh ]; then
    source $ZSH/plugins/$plugin/$plugin.plugin.zsh
  fi
done

# Load all of your custom configurations from custom/
for config_file ($ZSH_CUSTOM/*.zsh(N)); do
  source $config_file
done
unset config_file

# Load the theme
if [ ! "$ZSH_THEME" = ""  ]; then
  if [ -f "$ZSH_CUSTOM/$ZSH_THEME.zsh-theme" ]; then
    source "$ZSH_CUSTOM/$ZSH_THEME.zsh-theme"
  elif [ -f "$ZSH_CUSTOM/themes/$ZSH_THEME.zsh-theme" ]; then
    source "$ZSH_CUSTOM/themes/$ZSH_THEME.zsh-theme"
  else
    source "$ZSH/themes/$ZSH_THEME.zsh-theme"
  fi
fi
```

## 参考链接

- [阮一峰的《Bash 脚本教程》](https://github.com/wangdoc/bash-tutorial)
- [Shell 教程 | 菜鸟教程](https://www.runoob.com/linux/linux-shell.html)