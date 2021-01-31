---
title: The art of command line
date: 2021-01-31 21:59:48
tags:
    - 效率
categories: 后端
---

在此回顾一下命令行的高效使用方式, 提高日常操作流程.

<!-- more -->

- [TOOD](#tood)
- [基础](#基础)
- [日常使用](#日常使用)

## TOOD

- [x] 基础
- [x] 日常使用
- [ ] 文件以及数据处理
- [ ] 系统调试
- [ ] 单行脚本
- [ ] 冷门但有用
- [ ] 仅限OSX系统

## 基础

- [ ] 通读man bash
- [x] 熟悉vim
- [x] 学会man, apropos, type, shell别名等
- [x] 学会重定向管道; 明白输出文件>>; stdout, stdin, stderr;
- [x] 学会通配符 * ? [ ... ], ' " 区别
- [x] 熟悉bash的任务管理工具; &, nohup, ctrl-z, ctrl-c, jobs, fg, bg, kill
- [x] 熟悉ssh登陆, ssh-agent, ssh-add无密码认证登陆
- [ ] 基本文件管理工具
  - [x] ls, ls -l
  - [x] less, head, tail, tail -F, less +F
  - [x] ln, ln -s (软硬链接的区别)
  - [ ] df, mount, fdisk, mkfs, lsblk
  - [ ] 知道inode是什么; ls -i, df -i 等命令相关
- [ ] 网络管理工具
  - [x] ip, ifconfig
  - [ ] dig
- [x] 版本控制git, svn, 以及oh-my-zsh里面的alias
- [x] 熟悉正则表达, grep, egrep, zgrep
  - [x] -ABC
  - [x] -v
  - [x] -i
  - [x] -o
  - [x] -r
- [x] 学会管理工具使用, apt, yum, dnf, pacman, pip3

## 日常使用

- [ ] Tab自动补全
  - [x] ctrl-r, ctrl-w, ctrl-u, ctrl-a, ctrl-e, ctrl-k, ctrl-l
  - [x] alt-b, alt-f
  - [ ] alt-., alt-*
  - [x] man readline
- [ ] set -i vi | set -i emacs
- [x] export EDITOR=vim
  - [x] ctrl-x ctrl-e
  - [ ] escape-v
- [x] history
  - [x] !n
  - [x] !$
  - [x] !!
  - [ ] HISTORY EXPANSION
- [x] cd ~, $HOME, cd -
- [x] xargs | parallel 结合 awk
  - [x] xargs -I {} echo {}
- [x] pstree -p 进程树
- [ ] pgrep, pkill
- [x] kill -STOP [pid]
  - [x] man 7 signal
- [x] nohup, disown
- [ ] netstat -lntp | ss -plat
  - [ ] -u
  - [ ] lsof -iTCP -sTCP:LISTEN -P -n
- [ ] lsof查看套接字和文件
- [x] uptime | w
- [x] seq
- [x] alias
  - [x] alias ll='ls -latr'
  - [x] 别名保存在~/.bashrc
  - [x] 环境变量保存在~/.bash_profile
- [ ] 变量名和文件名包含空格, 需要使用引号包括起来