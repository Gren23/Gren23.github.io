---
title: 西门子PLC Modbus TCP通讯教程
date: 2026-05-26 16:05:00
categories:
  - PLC通讯
tags:
  - 西门子
  - PLC
  - ModbusTCP
---

# 西门子PLC Modbus TCP通讯教程

## 概述

Modbus TCP是标准的网络通信协议，通过CPU上PN接口进行TCP/IP通信，不需要额外的通信硬件模块。西门子S7-1200/1500 PLC支持Modbus TCP客户端和服务器两种模式。

---

## 一、西门子S7-1200 Modbus TCP通讯

### 1.1 通讯架构

- **Client（客户端）**：PLC作为客户端，主动读取/写入第三方设备
- **Server（服务器）**：PLC作为服务器，等待第三方设备访问

### 1.2 必备指令

**MB_CLIENT** - 客户端指令
- 功能：建立TCP连接、发送命令、接收响应、控制断开连接

**MB_SERVER** - 服务器指令
- 功能：等待客户端连接、响应Modbus请求

### 1.3 MB_CLIENT参数说明

| 参数 | 说明 |
|------|------|
| REQ | 使能信号，上升沿触发 |
| DISCONNECT | 0=建立连接，1=断开连接 |
| CONNECT_ID | 连接ID号，每个连接唯一 |
| IP_OCTET_1~4 | 服务器IP地址 |
| IP_PORT | 服务器端口，默认502 |
| MB_MODE | 请求模式（读取/写入/诊断） |
| MB_DATA_ADDR | 访问数据的起始地址 |
| MB_DATA_LEN | 数据长度 |
| MB_DATA_PTR | 数据缓冲区指针（DB块或M区） |
| DONE | 完成位 |
| BUSY | 作业状态位 |
| ERROR | 错误位 |
| STATUS | 错误代码 |

### 1.4 功能码对应关系

| Modbus功能 | MB_MODE | MB_DATA_ADDR | 操作类型 | 数据长度 |
|------------|---------|--------------|----------|----------|
| FC01 | 0 | 00001~09999 | 读取输出位 | 1~2000 |
| FC02 | 0 | 10001~19999 | 读取输入位 | 1~2000 |
| FC03 | 0 | 40001~49999 | 读取保持寄存器 | 1~125字 |
| FC04 | 0 | 30001~39999 | 读取输入字 | 1~125字 |
| FC05 | 1 | 00001~09999 | 写一个输出位 | 1 |
| FC06 | 1 | 40001~49999 | 写一个保持寄存器 | 1 |
| FC15 | 1 | 00001~09999 | 写多个输出位 | 2~1968 |
| FC16 | 1 | 40001~49999 | 写多个保持寄存器 | 2~123 |

### 1.5 数据块创建要求

- 必须创建"标准与S7-300/400兼容"的DB块
- 建议定义为100个字的数组

### 1.6 错误代码查询

**协议错误代码：**
- 8381：不支持功能代码
- 8382：数据长度错误
- 8383：数据地址错误
- 8384：数据值错误

**参数错误代码：**
- 7001：等待连接响应（首次执行）
- 7002：等待连接响应（后续执行）
- 7003：断开操作成功
- 80C8：服务器无响应
- 8188：MB_MODE值无效
- 8189：MB_DATA_ADDR值无效
- 818A：MB_DATA_LEN长度无效

---

## 二、梅卡曼德与西门子PLC通讯配置

### 2.1 通讯架构

梅卡曼德视觉系统作为**Server（从站）**，西门子PLC作为**Client（主站）**主动访问。

### 2.2 硬件要求

- Siemens SIMATIC S7-1200（CPU 1211C或更高）
- Mech-Vision和Mech-Viz软件 V2.0.0及以上
- TIA Portal V15.1或更高

### 2.3 工控机配置

1. **设置IP地址**：与PLC在同一网段
2. **关闭防火墙**
3. **机器人通信配置**：
   - 接口服务类型：标准接口
   - 协议：MODBUS TCP Slave
   - 字节顺序：ABCD（小端）或DCBA（大端）
   - 从站设备地址：255
   - 端口号：2000（或50000+）

### 2.4 PLC例程文件

例程文件位于：`Mech-Vision安装路径/Communication Component/Robot_Interface/Modbus TCP/Siemens TIA Portal/`

包含文件：
- MM Modbus TCP.scl - 建立Modbus TCP通信
- MM Modbus TCP Interface Program.scl - 实现接口指令功能

### 2.5 PLC编程要点

1. 导入例程文件到TIA Portal
2. 从源生成块
3. 修改MM Modbus TCP数据块中的：
   - RemoteAddress：工控机IP地址
   - RemotePort：端口号（与Mech-Vision一致）
4. 修改MB_CLIENT_DB中的：
   - MB_Unit_ID：从站设备地址（与Mech-Vision一致）
5. 下载到PLC

### 2.6 状态码说明

| 状态码 | 说明 |
|--------|------|
| 1100 | 成功获取视觉点 |
| 1102 | 成功触发Mech-Vision工程 |
| 2100 | 成功获取Mech-Viz路径 |
| 2103 | 成功触发Mech-Viz工程 |
| 2105 | 分支设置成功 |

---

## 三、典型配置步骤

### 3.1 PLC作为Client读取梅卡曼德

1. 创建DB数据块（标准兼容型）
2. 调用MB_CLIENT指令
3. 设置参数：
   - IP地址：工控机IP
   - 端口：2000
   - MB_MODE=0（读取）
   - MB_DATA_ADDR=40001
   - MB_DATA_LEN=10
4. 上升沿触发REQ

### 3.2 梅卡曼德配置

1. Mech-Vision - 机器人通信配置
2. 协议选择MODBUS TCP Slave
3. 端口2000
4. 字节顺序根据PLC设置（ABCD或DCBA）
5. 开启接口服务

---

## 四、注意事项

1. DB块必须为"标准与S7-300/400兼容"类型
2. 端口502是Modbus标准端口，但梅卡曼德建议使用50000+
3. 字节顺序要匹配：PLC为小端(ABCD)，梅卡曼德为ABCD
4. CONNECT_ID只能有一个，与每个MB_CLIENT背景数据块配合使用
5. 建议采用上升沿触发REQ，避免重复请求
6. 工控机需关闭防火墙

---

## 五、参考资源

- 西门子官方：S7-1200 Modbus TCP通信
- 梅卡曼德文档：通信配置及示例程序使用
- CSDN：西门子1500/1200 PLC MODBUS TCP教程