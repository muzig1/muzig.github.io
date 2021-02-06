---
title: My Mac
date: 2021-02-03 23:38:39
tags:
    - mac
categories: Mac
---

整理从0到1使用Mac系统, 提高生产力第一步, 学会良好的使用工具.

<!-- more -->

今天由于电池问题, 换了一波电脑, big sur系统, 之前打算升级来着一直怕有兼容性问题, 不过今天实际体验了下, 目前没有遇到什么问题, 这里顺带写一些装电脑细节, 便于快速整理恢复系统细节.

- [TODO](#todo)
- [Terminal](#terminal)
  - [Homebrew](#homebrew)
  - [iTerm2](#iterm2)
  - [zsh](#zsh)
- [软件篇](#软件篇)
  - [必备](#必备)
  - [工具](#工具)
  - [程序开发](#程序开发)
- [其他细节](#其他细节)
  - [iTerm2](#iterm2-1)
  - [Goland](#goland)
  - [Tmux](#tmux)
  - [oh-my-zsh](#oh-my-zsh)
- [友情链接](#友情链接)

## TODO

- [x] Terminal
- [x] 软件篇
- [x] 其他细节

## Terminal

### [Homebrew](https://muzig.github.io/2021/01/30/tmux/)

```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### iTerm2

```zsh
brew install --cask iterm2
```

### zsh

- 安装

```zsh
brew install zsh && chsh -s usr/local/bin/zsh
```

- 插件

[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```zsh
brew install autojump
brew install fzf

brew install git
brew install git-lfs

brew install tmux

brew install vim
```

## 软件篇

### 必备

```zsh
brew install --cask google-chrome
brew install --cask dingtalk
brew install --cask wechat
brew install --cask qq
brew install --cask sogouinput
brew install --cask neteasemusic
```

- [印象笔记](https://www.yinxiang.com/)

### 工具

```zsh
brew install --cask appcleaner
brew install --cask [dozer](https://github.com/Mortennn/Dozer)
brew install --cask snipaste
brew install --cask tencent-lemon
```

### 程序开发

```zsh
brew install --cask goland
brew install --cask docker
brew install --cask postman
brew install --cask robo-3t
brew install --cask visual-studio-code
brew install --cask unity-hub
```

## 其他细节

### iTerm2

> Alt + b / f 无法使用问题

![解决方案](../img/altfb.png)

### Goland

> ideaVim快捷键冲突, 或者不生效的修改.

![1](../img/goland-setting.png)
![2](../img/goland-setting2.png)

### [Tmux](https://muzig.github.io/2021/01/30/tmux/)

### oh-my-zsh

> [autojump](https://github.com/wting/autojump)

```zsh
brew install autojump
```

> [zsh-autosuggestion](https://github.com/zsh-users/zsh-autosuggestions)

```zsh
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

> [zsh-syntax-highlighting]()

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```zsh
# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
	git
	git-flow
	git-auto-fetch
	git-lfs
	git-prompt
	github

	vscode

	tmux
	timer
	golang
	fzf

	autojump
	zsh-syntax-highlighting
	zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh
source ~/.gvm/scripts/gvm

# User configuration

# export golang
export PATH=$PATH:$HOME/go/go1.13/bin
export PATH=$PATH:$HOME/go/bin
```

## 友情链接

- [左岸博客 - zsh插件推荐](https://www.zrahh.com/archives/167.html)