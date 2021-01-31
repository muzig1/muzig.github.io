---
title: Docker 笔记
date: 2021-01-31 19:54:25
tags:
    - docker
    - 微服务
categories: 后端
---

掌握其在微服务开发中的运用.

<!-- more -->

- [TODO](#todo)
- [容器使用](#容器使用)
- [仓库运用](#仓库运用)
  - [私有仓库](#私有仓库)
  - [高级仓库配置](#高级仓库配置)
- [数据管理](#数据管理)
  - [数据卷](#数据卷)
  - [挂载目录](#挂载目录)
  - [挂载单个文件](#挂载单个文件)

## TODO

基本:

- [ ] 基本概念
- [ ] 镜像使用
- [x] 容器使用
- [x] 仓库运用

进阶:

- [x] 数据管理
- [ ] 网络配置
- [ ] Docker Buildx
- [ ] Docker Compose
- [ ] Swarm Mode
- [ ] 安全
- [ ] 底层实现

实战:

- [ ] ETCD项目
- [ ] CoreOS项目
- [ ] k8s
- [ ] 容器与云计算
- [ ] CI/CD
- [ ] 最佳实践

## 容器使用

```bash
docker run
docker stop
docker logs
docker rm
docker prune # 清理所有停掉的container

docker attach
docker exec -it <id> bash
```

```bash
docker export <id> > ubuntu.tar
cat ubuntu.tar | docker import - test/ubuntu:v1.0

# 区别在于是否丢弃历史记录以及元数据信息
docker import
docker load
```

## 仓库运用

- 仓库(Repository)
- 注册服务器(Registry)

```bash
docker login
docker logout

docker search
docker pull

# 推送image
docker tag ubuntu:18.04 username/ubuntu:18.04
docker push username/ubuntu:18.04
docker search username
```

### 私有仓库

工具: docker-registry

### 高级仓库配置

工具: Docker Compose

拥有权限认证, TLS的私有仓库

略...

## 数据管理

- 数据卷(Volumes) - 可供一个或多个容器使用的特殊目录; 绕过UFS
- 挂载主机目录(Bind Mounts)

### 数据卷

```bash
docker volume create my-vol
docker volume rm my-vol

docker volume ls
docker volume prune

docker volume inspect my-vol
```

```bash
docker run -d -P \
--name web \
--mount source=myvol,target=/webapp \
training/webapp \
python app.py

docker inspect web
```

### 挂载目录

```bash
docker run -d -P \
--name web \
--mount type=bind,source=/src/webapp,target=/opt/webapp,readonly \ # source代表宿主机; target代表容器位置; readonly代表容器位置只读
training/webapp \
python app.py
```

### 挂载单个文件

```bash
# 这样就可以记录容器的命令使用情况
docker run --rm -it \
--mount type=bind,source=$HOME/.bash_history,target=/root/.bash_history \
ubuntu:18.04 \
bash
```
