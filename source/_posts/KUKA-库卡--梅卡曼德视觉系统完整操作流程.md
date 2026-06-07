---
title: KUKA（库卡）+ 梅卡曼德视觉系统完整操作流程
date: 2026-05-26 15:15:00
categories:
  - 机器人通讯
tags:
  - KUKA
  - 库卡
  - Mech-Vision
---

# KUKA（库卡）+ 梅卡曼德视觉系统完整操作流程

KUKA机器人通过KRL（KUKA Robot Language）与梅卡曼德视觉系统通信，使用Ethernet KRL模块建立TCP连接。

适用机器人轴数：6轴
适用控制柜型号：KR C4、KR C5
适用系统版本：KSS 8.2、8.3、8.5、8.6、8.7
适用Mech-Vision版本：V2.1.2及以上

---

## 一、烧录前准备

### 1.1 检查硬件和软件版本

| 项目 | 要求 |
|------|------|
| 机器人轴数 | 6轴 |
| 控制柜型号 | KR C4或KR C5 |
| 系统版本 | KSS 8.2~8.7 |
| 软件包 | Ethernet KRL |

查看系统版本：帮助 → 信息

Ethernet KRL版本对应：
- KSS 8.2/8.3 → Ethernet KRL V2.2.8
- KSS 8.5 → Ethernet KRL V3.0.3
- KSS 8.6 → Ethernet KRL V3.1.2.29
- KSS 8.7 → Ethernet KRL V3.2.2.16

### 1.2 准备烧录文件

从Mech-Vision安装目录复制：
- mm_module.src（指令程序文件）
- mm_module.dat（指令程序文件）
- XML_Kuka_MMIND.xml（网络配置文件）
- MM_COMTEST.src（测试程序）
- MM_COMTEST.dat（测试程序）
- sample（样例程序文件夹）

文件位置：Mech-Vision安装目录/Communication Component/Robot_Interface/KUKA/

---

## 二、配置Mech-Vision软件

### 2.1 创建/打开方案

打开Mech-Vision软件：
- 新软件：点击新建空白方案
- 有方案：文件 → 打开方案

### 2.2 机器人通信配置

| 参数 | 设置值 | 说明 |
|------|------|------|
| 选择机器人 | KUKA | 品牌 |
| 选择机器人型号 | 对应型号 | 如KR 210 |
| 接口服务类型 | 标准接口 | 必须选这个 |
| 协议 | TCP Server | |
| 协议格式 | HEX（little-endian） | 注意是HEX格式 |
| 端口号 | 50000 | 建议用50000或以上 |
| 方案打开时自动打开接口服务 | 勾选 | 方便 |

⚠️ 重要：KUKA使用HEX格式！

### 2.3 开启接口服务

配置完成后，点击应用
确认工具栏显示：接口服务（绿色/开启状态）

---

## 三、配置机器人网络

### 3.1 连接网线

| 控制柜型号 | 网口 |
|----------|------|
| KR C4 Compact | X66端口 |
| KR C4其他型号 | KLI端口 |
| KR C5 | XF5端口 |

### 3.2 切换到专家权限

1. 点击配置 → 用户组
2. 点击专家，输入密码（默认：kuka）
3. 点击登录

### 3.3 设置机器人IP地址

1. 点击投入运行 → 网络配置
2. 输入IP地址（与工控机同网段）
3. 点击保存
4. 在弹窗中点击是、OK

### 3.4 设置工控机IP地址

要求：机器人和工控机必须在同一网段！

| 机器人IP | 工控机IP | 说明 |
|----------|----------|------|
| 192.168.100.169 | 192.168.100.170 | 最后一组不同即可 |

子网掩码：255.255.255.0

### 3.5 重启控制系统

1. 点击关机 → 重新启动控制系统PC

---

## 四、备份机器人程序

### 4.1 备份步骤

1. 切换到专家模式
2. U盘插入控制柜
3. 确认U盘被识别
4. 点击文件 → 存档 → USB控制柜 → 所有
5. 点击是，等待存档完成
6. 保存ZIP文件到U盘
7. 安全拔出U盘

---

## 五、烧录程序

### 5.1 准备烧录文件

1. U盘插入工控机USB接口
2. 复制整个KUKA文件夹到U盘根目录
3. 安全拔出U盘

### 5.2 拷贝文件到机器人

1. 切换到专家模式
2. U盘插入控制柜
3. 在示教器找到U盘中的KUKA文件夹
4. 创建mm文件夹：点击KRC:\ → 点击R1 → 点击新，输入mm，点击OK
5. 复制程序文件：选中mm_module.src、mm_module.dat、MM_COMTEST.src、MM_COMTEST.dat → 点击编辑 → 复制
6. 打开KRC:\R1\mm文件夹 → 点击编辑 → 粘贴

7. 复制配置文件：
   - 将XML_Kuka_MMIND.xml拷贝到：C:\KRC\ROBOTER\Config\User\Common\EthernetKRL\
   - 打开XML_Kuka_MMIND.xml
   - 修改IP地址为工控机IP地址
   - 修改端口号与Mech-Vision一致
   - 点击关闭，点击是保存

### 5.3 重启机器人

1. 登录到管理员模式
2. 点击关机
3. 选择冷启动、重新读入文件、重新启动控制系统PC
4. 点击是，重启机器人

---

## 六、测试通信

### 6.1 选择测试程序

1. 登录到管理员模式
2. 进入KRC:\R1\mm文件夹
3. 选中MM_COMTEST.src
4. 点击左下角选定

### 6.2 运行测试程序

1. 切换到T1运行方式
2. 点击O，点击I切换驱动装置状态
3. 点击将运行方式设置为GO
4. 按住使能键，按绿色运行键
5. 等待程序运行完成
6. 屏幕显示"MM:Init Connection ok"

### 6.3 检查连接

- 成功：Mech-Vision日志窗口显示连接成功
- 失败：检查IP、网络、接口服务

---

## 七、示例程序说明

### 7.1 文件说明

| 文件 | 功能 |
|------|------|
| mm_module.src | 指令程序模块 |
| mm_module.dat | 指令数据模块 |
| MM_COMTEST | 通信测试程序 |
| sample/ | 样例程序文件夹 |

### 7.2 常用指令

| 指令 | 功能 |
|------|------|
| MM_Init_Socket | 通信初始化 |
| MM_Open_Socket | 建立连接 |
| MM_Close_Socket | 断开连接 |
| MM_Start_Vis | 触发视觉 |
| MM_Get_VisData | 获取视觉结果 |
| MM_Get_Pose | 转存位姿 |

### 7.3 状态码

| 状态码 | 含义 |
|--------|------|
| 1100 | 成功（Mech-Vision） |
| 1103 | 路径规划成功 |
| 1002 | 无视觉结果 |
| 1003 | ROI内无物体 |

---

## 八、新手操作顺序（一步一步来）

### 第一天：准备工作

1. **步骤1：检查版本**
   - 帮助 → 信息 → 确认KSS版本
   - 检查Ethernet KRL版本

2. **步骤2：准备文件**
   - 从Mech-Vision安装目录复制KUKA文件夹到U盘

### 第二天：网络配置

3. **步骤3：连接网线**
   - 根据控制柜型号连接网线

4. **步骤4：设置IP**
   - 切换专家模式
   - 投入运行 → 网络配置
   - 设置IP地址

5. **步骤5：重启**
   - 关机 → 重新启动控制系统PC

### 第三天：Mech-Vision配置

6. **步骤6：打开软件**
   - Mech-Vision → 新建/打开方案

7. **步骤7：配置通信**
   - 机器人通信配置
   - 品牌：KUKA
   - 协议格式：HEX
   - 端口：50000
   - 确认接口服务开启

### 第四天：烧录

8. **步骤8：拷贝文件**
   - 专家模式
   - U盘插入控制柜
   - 复制程序文件到KRC:\R1\mm
   - 复制配置文件到EthernetKRL

9. **步骤9：修改IP**
   - 修改XML_Kuka_MMIND.xml中的IP地址

10. **步骤10：重启**
    - 冷启动重新读入文件

### 第五天：测试

11. **步骤11：选择程序**
    - 进入MM_COMTEST

12. **步骤12：运行测试**
    - T1模式
    - 按住使能+运行键
    - 确认连接成功

### 第六天：完整测试

13. **步骤13：运行示例程序**
    - 放置物体到相机视野内
    - 运行sample中的程序
    - 观察机器人动作

---

## 九、错误代码排查

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| 连接失败 | 网线没接好 | 检查网线两端 |
| 连接失败 | IP不在同网段 | 改IP或网段 |
| 连接失败 | 端口不一致 | 改一致 |
| 超时 | Mech-Vision没开接口 | 开启接口服务 |
| 无视觉结果 | 物体不在视野内 | 检查物体位置 |
| ROI内无物体 | 调整物体位置或ROI | 调整 |

---

## 官方文档链接

- KUKA标准接口通信配置：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/kuka-setup-instructions.html
- KUKA自动标定：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/kuka-calibration-program.html
- KUKA标准接口指令：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/kuka-interface-commands.html

文档创建：2026-04-02
如有问题请联系梅卡曼德技术支持