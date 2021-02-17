---
title: git相关疑问
date: 2021-02-17 11:06:42
tags:
    - git
categories: 工具
---

记录一些 git 使用相关问题

<!-- more -->

- [push](#push)

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