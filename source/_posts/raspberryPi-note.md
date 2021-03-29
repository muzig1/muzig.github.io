---
title: raspberryPi 入门
date: 2021-01-23 21:54:28
tags:
    - raspberryPi
categories: 工具
---

之前在储备前端技术, 目前使用树莓派来搭建开发环境, 便于测试.

<!-- more -->

- [TODO](#todo)
- [购买建议](#购买建议)
- [初次使用](#初次使用)
- [初次启动](#初次启动)
- [必会命令](#必会命令)
- [如何搭建LAMP环境](#如何搭建lamp环境)
- [如何搭建开发环境](#如何搭建开发环境)
- [友情链接](#友情链接)

## TODO

- [ ] 完善文档

## 购买建议

准备:

1. 树莓派4b
2. 设备电源
3. microHDMI转HDMI 或 转VGA
4. 读卡器
5. micro-SD卡(8G,16G, 32G) 任意即可
6. 键盘
7. 显示器

## 初次使用

1. [下载iso镜像](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit)
2. 烧录进micro-sd
3. 将micro-sd插入树莓派(不是用读卡器插入usb接口, 而是有一个专门的插入micro-sd的位置)
4. 直接启动, 即可进入界面

```bash
# mac 烧录方式
# 在Mac OS下SD卡的设备名一般为rdisk*，可以用diskutil list命令查看。
# 在Linux下SD卡的设备名一般为sd*，可以用lsblk命令查看。
sudo dd bs=1m if=<下载的镜像.img> of=/dev/<SD卡设备名> conv=sync
```

## 初次启动

1. 设置区域, 开启wifi功能
2. 连接wifi
3. 设置root密码

```bash
# 设置相关参数
sudo raspi-config

# 设置root密码
sudo passwd root
```

## 必会命令

## 如何搭建LAMP环境

## 如何搭建开发环境

## 友情链接

- [如何给树莓派安装操作系统](https://zhuanlan.zhihu.com/p/59027897)
- [如何方便的烧录镜像](https://shumeipai.nxez.com/2020/03/07/raspberry-pi-imager-imaging-utility.html)