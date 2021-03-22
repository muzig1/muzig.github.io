---
title: Git
date: 2021-02-17 11:06:42
tags:
    - git
categories: 工具
---

Git 的踩坑总结

<!-- more -->

- [push](#push)
- [clone](#clone)
  - [--depth](#--depth)

## push

报错信息: 切换多个github账号的时候, 会有权限冲突.

```zsh
remote: Permission to <user-a>.git denied to <user-b>
fatal: unable to access 'https://github.com/ xxxxx.git/': > The requested URL returned error: 403
```

解决方案:

```zsh
git config credential.username <user-a>
git push origin main
```

## clone

### --depth

> 报错信息:

```zsh
! [remote rejected] main -> main (shallow update not allowed)
```

> 原因: 

最初克隆仓库采用的 --depth 参数, 然后修改 remote 重新推送新仓库.

```zsh
# 浅克隆
git clone --depth=1 <仓库地址>
# 修改remote
git remote remove origin
git remote add origin <新仓库地址>
# 推送
git push -u origin <xxx> # 这个步骤就会发生报错
```

> 解决办法:

简单粗暴:

```zsh
# 清理记录
rm -rf .git

# 重新构建仓库
git init
git remote add origin <新仓库地址>
git push -u origin <xxx>
```
