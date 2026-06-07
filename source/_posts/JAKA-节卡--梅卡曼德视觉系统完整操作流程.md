---
title: JAKA（节卡）+ 梅卡曼德视觉系统完整操作流程
date: 2026-05-26 15:55:00
categories:
  - 机器人通讯
tags:
  - JAKA
  - 节卡
  - Mech-Vision
---

# JAKA（节卡）+ 梅卡曼德视觉系统完整操作流程

JAKA机器人通过JAKA App和addon插件与梅卡曼德视觉系统通信，使用TCP协议和ASCII格式。

⚠️ 注意：控制器软件版本需为1.7或以上！

适用机器人型号：JAKA系列
适用控制器软件版本：1.7+
适用Mech-Vision版本：V2.1.2及以上

---

## 一、烧录前准备

### 1.1 检查软件版本

| 项目 | 要求 |
|------|------|
| 控制器软件版本 | 1.7或以上 |
| JAKA App版本 | 与控制器版本一致 |

查看方法：JAKA App连接后可查看版本

⚠️ 低于1.7版本需升级，或使用节卡程序实现的标准接口程序

### 1.2 准备文件

从Mech-Vision安装目录：
- mm_custom_cmd.tar.gz（addon插件）
- mm_cali.zip（标定样例）
- mm_vis_sample.zip（视觉样例）
- mm_vispath_sample.zip（路径样例）
- mm_viz_sample.zip（Viz样例）

文件位置：Mech-Vision安装目录/Communication Component/Robot_Interface/Robot_Plugin/JAKA_Addon/

### 1.3 下载JAKA App

从节卡官网下载JAKA App：
https://www.jaka.com/download

---

## 二、配置Mech-Vision软件

### 2.1 创建/打开方案

打开Mech-Vision软件：
- 新软件：点击新建空白方案
- 有方案：文件 → 打开方案

### 2.2 机器人通信配置

| 参数 | 设置值 | 说明 |
|------|------|------|
| 选择机器人 | JAKA | 品牌 |
| 选择机器人型号 | 对应型号 | 如JAR |
| 接口服务类型 | 标准接口 | 必须选这个 |
| 协议 | TCP Server | |
| 协议格式 | ASCII | |
| 端口号 | 50000 | 建议50000或以上 |
| 方案打开时自动打开接口服务 | 勾选 | 方便 |

### 2.3 开启接口服务

配置完成后，点击应用
确认工具栏显示：接口服务（绿色/开启状态）

---

## 三、配置机器人网络

### 3.1 硬件连接方式

- 方式一：工控机网线直连控制柜以太网接口
- 方式二：工控机和控制柜接同一路由器

### 3.2 设置IP地址

1. 打开JAKA App
2. 点击右上角"未连接"
3. 输入管理员密码（默认：jakazuadmin）
4. 连接机器人
5. 点击"打开本体电源"
6. 点击"使能机器人"
7. 设置 → 系统设置 → 网络设置
8. 设置机器人IP地址（与工控机同网段）

### 3.3 设置工控机IP地址

要求：机器人和工控机必须在同一网段！

| 机器人IP | 工控机IP | 说明 |
|----------|----------|------|
| 192.168.2.10 | 192.168.2.11 | 最后一组不同即可 |

子网掩码：255.255.255.0

---

## 四、烧录程序

### 4.1 烧录addon插件

1. 打开JAKA App
2. 设置 → 附加程序
3. 点击+ → ···
4. 选择mm_custom_cmd.tar.gz
5. 点击确定
6. 点击启动按钮启动mm_custom_cmd

### 4.2 创建系统变量

1. 设置 → 程序设置 → 系统变量
2. 点击右上角+
3. 创建变量MM_CMD，初始值0
4. 创建变量MM_STATUS，初始值0

### 4.3 烧录样例程序

1. 编程控制 → 打开文件夹
2. 点击导入
3. 选择样例程序文件（mm_cali.zip等）
4. 点击确定

---

## 五、测试通信

### 5.1 创建测试程序

1. 编程控制
2. 点击+新建程序
3. 左侧点击扩展
4. 拖动MM_Connect到编辑区

### 5.2 设置参数

1. 点击MM_Connect
2. 设置工控机IP地址
3. 设置端口号（如50000）

### 5.3 运行测试

1. 点击左上角运行
2. 观察连接

### 5.4 检查连接

- 成功：Mech-Vision日志窗口显示连接成功
- 失败：检查IP、网络、接口服务

---

## 六、设置DH参数（可选）

### 6.1 为什么要设置DH参数

每台机器人的实际DH参数���理论值存在差异，需要校准以减少误差。

### 6.2 设置步骤

1. 打开Mech-Viz，选择JAKA机器人
2. 在JAKA主页点击10次logo
3. 输入密码（JAKAAMAZING）
4. Mech-Viz右键机器人名称
5. 打开机器人文件目录
6. 打开xxxx_algo.json文件
7. 将[d1,a2,a3,d4,d5,d6]填入dh字段
8. 保存文件
9. Mech-Viz右键机器人名称，选择重新加载

---

## 七、程序说明

### 7.1 文件说明

| 文件 | 功能 |
|------|------|
| mm_custom_cmd.tar.gz | addon插件程序 |
| mm_cali.zip | 标定样例 |
| mm_vis_sample.zip | 视觉样例 |
| mm_vispath_sample.zip | 路径样例 |
| mm_viz_sample.zip | Viz样例 |

### 7.2 系统变量

| 变量 | 说明 |
|------|------|
| MM_CMD | 命令变量 |
| MM_STATUS | 状态变量 |

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
   - JAKA App连接后查看
   - 确认1.7版本

2. **步骤2：准备文件**
   - 下载JAKA App
   - 准备addon和样例文件

### 第二天：网络配置

3. **步骤3：连接网线**
   - 直连或通过路由器

4. **步骤4：设置IP**
   - JAKA App → 系统设置 → 网络设置

### 第三天：Mech-Vision配置

5. **步骤5：打开软件**
   - Mech-Vision → 新建/打开方案

6. **步骤6：配置通信**
   - 机器人通信配置
   - 品牌：JAKA
   - 端口：50000
   - 确认接口服务开启

### 第四天：烧录

7. **步骤7：烧录addon**
   - 设置 → 附加程序 → 添加mm_custom_cmd
   - 启动插件

8. **步骤8：创建变量**
   - 设置 → 程序设置 → 系统变量
   - 创建MM_CMD和MM_STATUS

9. **步骤9：导入样例**
   - 编程控制 → 导入样例程序

### 第五天：测试

10. **步骤10：测试**
    - 新建程序 → MM_Connect
    - 设置IP和端口
    - 运行确认连接

### 第六天：DH参数（如需要）

11. **步骤11：设置DH**
    - 打开Mech-Viz
    - 10次logo进入设置
    - 修改algo.json的dh参数

---

## 九、错误代码排查

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| 连接失败 | 网线没接好 | 检查网线两端 |
| 连接失败 | IP不在同网段 | 改IP或网段 |
| 连接失败 | 端口不一致 | 改一致 |
| 超时 | Mech-Vision没开接口 | 开启接口服务 |
| addon启动失败 | 软件版本低 | 升级到1.7版本 |

---

## 官方文档链接

- JAKA标准接口通信配置：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/jaka-setup-instructions.html
- JAKA自动标定：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/jaka-calibration-program.html
- JAKA程序实现标准接口：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/jaka-program-implementation.html

文档创建：2026-04-02
如有问题请联系梅卡曼德技术支持