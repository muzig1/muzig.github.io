---
title: Mac 同步文件到 Linux
date: 2021-03-21 18:48:48
tags:
    - scp
categories: Mac
---

scp -- secure copy (remote file copy program)

<!-- more -->

## 基本用法

1. Mac 上传文件到Linux

```bash
# scp + 文件路径 + 用户名@服务器地址:目标路径
scp tmp.md root@192.168.0.1:/root/
```

2、Linux 下载文件到 Mac

```bash
# scp 用户名@服务器地址:目标路径 下载路径
scp root@192.168.0.1:/root/tmp.md ~/Desktop/
```

## 参数说明

- -r: Recursively copy entire directories.  Note that scp follows symbolic links encountered in the tree traversal.
- -P(port): Specifies the port to connect to on the remote host.