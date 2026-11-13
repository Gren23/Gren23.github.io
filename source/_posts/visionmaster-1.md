---
title: Vision Master 通讯配置
slug: visionmaster-1
date: 2025-09-02 04:27:12
updated: 2026-06-21 21:52:13
categories:
  - 视觉
tags:
  - VisionMaster
  - 通讯
---


# 🔌 Vision Master 通讯配置

Vision Master 支持多种通讯方式与外部设备交互。

<!-- more -->

## 通讯类型

### TCP/IP 通讯
- 用于与 PC 程序通讯
- 支持自定义协议

### PLC 通讯
- 支持西门子 S7 协议
- 支持三菱 MC 协议

## 变量映射

通过寄存器地址进行数据交换：
- `Q` - 输出寄存器
- `I` - 输入寄存器

## 实战应用

结合视觉定位与机械手抓取，实现自动化上下料。