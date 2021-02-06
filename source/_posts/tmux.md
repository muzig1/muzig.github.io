---
title: tmux 快速指北
date: 2021-01-30 09:52:48
tags:
    - tmux
categories: 工具
---

如果您用过screen的话, 相比知道它的好处, 这里记录一款类似的工具tmux.

<!-- more -->

- [TODO](#todo)
- [🚀 快速搭建](#-快速搭建)
- [常用快捷键](#常用快捷键)
- [插件](#插件)
  - [oh-my-tmux](#oh-my-tmux)
  - [tmux-resurrect](#tmux-resurrect)
- [友情链接](#友情链接)

## TODO

- [ ] 常用快捷键

## 🚀 快速搭建

- Install Tmux:

```bash
# mac
brew install tmux

# linux - RedHat
yum install tmux

# linux - Debian
apt install tmux
```

- Clone TPM:

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

- Put this at the bottom of ~/.tmux.conf ($XDG_CONFIG_HOME/tmux/tmux.conf works too):

```bash
# 推荐配置
git clone https://github.com/gpakosz/.tmux.git ~/.tmux/oh-my-tmux/
cp ~/.tmux/oh-my-tmux/.tmux.conf ~/

# 自定义配置
wget https://github.com/muzig/oh-my-mac/blob/main/tmux/.tmux.conf ~/.tmux.conf.local
```

- Reload TMUX environment so TPM is sourced:

```bash
# type this in terminal if tmux is already running
$ tmux source ~/.tmux.conf
```

## 常用快捷键

## 插件

### oh-my-tmux

作用: 通用tmux配置搭配

```bash
git clone https://github.com/gpakosz/.tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .
```

### tmux-resurrect

作用: 保存tmux的layout, 便于重启电脑快速恢复.

- Add plugin to the list of TPM plugins in .tmux.conf:
- Hit prefix + I to fetch the plugin and source it. You should now be able to use the plugin.

```bash
set -g @plugin 'tmux-plugins/tmux-resurrect'
```

## 友情链接

- [TPM](https://github.com/tmux-plugins/tpm)
- [oh-my-tmux](https://github.com/gpakosz/.tmux)
- [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect)