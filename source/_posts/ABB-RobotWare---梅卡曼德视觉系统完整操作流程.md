---
title: ABB RobotWare + 梅卡曼德视觉系统完整操作流程
date: 2026-05-26 15:10:00
categories:
  - 机器人通讯
tags:
  - ABB
  - Mech-Vision
---

# ABB RobotWare + 梅卡曼德视觉系统完整操作流程

ABB机器人通过RobotWare系统与梅卡曼德视觉系统通信，支持自动烧录和手动烧录两种方式。

适用控制器型号：IRC4、IRC5
适用RobotWare版本：6.02~6.15
适用Mech-Vision版本：V2.1.2及以上

---

## 一、烧录前准备

### 1.1 准备工作

| 项目 | 要求 |
|------|------|
| U盘 | FAT32格式，容量1GB以上 |
| 网线 | 标准以太网网线 |
| 电脑 | 运行Mech-Vision的工控机 |
| RobotStudio | 建议安装（用于备份和恢复） |

确认机器人系统版本：
- 控制器型号：IRC4或IRC5
- RobotWare版本：6.02~6.15
- 控制模块：已安装616-1 PC Interface选项
- 查看方法：示教器左上角菜单 → 系统信息 → 系统属性

### 1.2 准备烧录文件

自动烧录：使用Robot Program Loader工具

手动烧录需要准备以下文件（从Mech-Vision安装目录获取）：
- MM_Module.mod（指令程序模块文件）
- MM_Auto_Calib.mod（标定程序模块文件）
- MM_Com_Test.mod（测试通信程序模块文件）

文件位置：Mech-Vision安装目录/Communication Component/Robot_Interface/ABB/RobotWare 6/

---

## 二、配置Mech-Vision软件

### 2.1 创建/打开方案

打开Mech-Vision软件：
- 新软件：点击新建空白方案
- 有方案：文件 → 打开方案

### 2.2 机器人通信配置

| 参数 | 设置值 | 说明 |
|------|------|------|
| 选择机器人 | ABB | 品牌 |
| 选择机器人型号 | 对应型号 | 如IRB 6700 |
| 接口服务类型 | 标准接口 | 必须选这个 |
| 协议 | TCP Server | |
| 协议格式 | HEX（little-endian） | 注意是HEX格式 |
| 端口号 | 50000 | 建议用50000或以上 |
| 方案打开时自动打开接口服务 | 勾选 | 方便 |

⚠️ 重要：ABB使用HEX格式，不是ASCII！

### 2.3 开启接口服务

配置完成后，点击应用
确认工具栏显示：接口服务（绿色/开启状态）

---

## 三、配置机器人网络

### 3.1 连接网线

网线一端接机器人控制柜X6（WAN）网口
网线另一端接工控机网口

### 3.2 设置机器人IP地址

**方法一：通过示教器设置**
1. 重启机器人进入引导应用程序
2. 设置IP地址（与工控机同网段）
3. 例：机器人IP 192.168.100.169

**方法二：通过RobotStudio设置**
1. 连接控制器
2. 点击设置IP地址
3. 重启机器人

### 3.3 设置工控机IP地址

要求：机器人和工控机必须在同一网段！

| 机器人IP | 工控机IP | 说明 |
|----------|----------|------|
| 192.168.100.169 | 192.168.100.170 | 最后一组不同即可 |

子网掩码：255.255.255.0

---

## 四、烧录程序（自动）

### 4.1 自动烧录步骤

1. 将控制柜开关转到自动模式，确保电机指示灯点亮
2. 打开Robot Program Loader工具
3. 路径：Mech-Vision安装目录/Communication Component/tool/Robot Program Loader/
4. 选择ABB品牌，填入机器人IP地址
5. 点击连接
6. 选择备份文件夹，点击备份（重要！用于恢复）
7. 选择烧录标准接口程序
8. 点击一键烧录
9. 显示"烧录成功"即完成

### 4.2 备份和恢复

- 备份：工具会自动备份原机器人程序
- 恢复：如果烧录出错，使用备份的文件恢复

---

## 五、烧录程序（手动）

### 5.1 准备烧录文件

1. U盘插入工控机USB接口
2. 复制以下文件到U盘根目录：
   - MM_Module.mod
   - MM_Auto_Calib.mod
   - MM_Com_Test.mod
3. 安全拔出U盘

### 5.2 通过示教器烧录

1. U盘插入示教器USB接口
2. 点击程序编辑器
3. 点击任务与程序
4. 选中T_ROB1，点击显示模块
5. 点击文件 → 加载模块
6. 选择MM_Module.mod，点击确定
7. 重复导入另外两个文件
8. 确认T_ROB1下三个文件都已导入

### 5.3 通过RobotStudio烧录

1. 打开RobotStudio，连接控制器
2. 请求写权限（示教器端同意）
3. 右键T_ROB1 → 加载模块
4. 依次加载三个.mod文件
5. 确认导入成功

---

## 六、测试通信

### 6.1 选择和修改测试程序

1. 将控制柜开关转到手动模式
2. 示教器：左上角菜单 → 程序编辑器 → T_ROB1
3. 选中MM_Com_Test，点击显示模块
4. 双击程序中的IP地址，修改为工控机IP地址
5. 确保端口号与Mech-Vision中一致（默认50000）

### 6.2 运行测试程序

1. 点击调试 → PP移至例行程序
2. 选中MM_Comtest，点击确定
3. 按住使能按钮，手动单步运行程序
4. 观察程序运行到第9行
5. 点击按钮查看消息内容

### 6.3 检查连接

- 成功：Mech-Vision日志窗口显示连接成功
- 失败：检查IP、网络、接口服务

---

## 七、示例程序说明

### 7.1 程序文件列表（sample文件夹）

| 程序文件 | 功能 |
|----------|------|
| MM_S1_Vis_Basic | 基础视觉抓取 |
| MM_S2_Viz_Basic | 基础路径规划 |
| MM_S3_Vis_Path | 视觉路径规划 |
| MM_S4_Vis_ChangeModel | 配方切换 |
| MM_S5_Viz_SetBranch | 消息分支 |
| MM_S6_Viz_ErrorHandle | 错误处理 |
| MM_S7_Viz_SwitchTCP | 切换工具 |
| MM_S8_Viz_Subtask | 子任务 |
| MM_S9_Viz_RunInAdvance | 提前运行 |
| MM_S10_Viz_Subtask | 子任务2 |
| MM_S11_Viz_Timer | 定时器 |
| MM_S12_Viz_ForLoop | 循环 |
| MM_S13_Vis_MoveInAdvance | 提前移动 |
| MM_S14_Vis_GetUserData | 获取用户数据 |
| MM_S15_Viz_GetDoList | 获取DO信号列表 |
| MM_S16_Viz_GetDirection | 获取方向 |
| MM_S17_Vis_ParseLabel | 解析标签 |
| MM_S18_Vis_GetUserData | 获取用户数据2 |
| MM_S19_Vis_PlanAllVision | 全视觉规划 |
| MM_S20_Viz_PlanAllVision | 全路径规划 |

### 7.2 常用指令说明

| 指令 | 功能 |
|------|------|
| MM_Init_Socket | 通信初始化 |
| MM_Open_Socket | 建立连接 |
| MM_Close_Socket | 断开连接 |
| MM_Start_Vis | 触发视觉 |
| MM_Get_VisData | 获取视觉结果 |
| MM_Get_Pose | 转存位姿 |
| MM_Start_Viz | 触发路径规划 |

### 7.3 状态码说明

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
   - 示教器 → 系统信息 → 系统属性
   - 确认RobotWare版本6.02~6.15

2. **步骤2：准备文件**
   - 从Mech-Vision安装目录复制烧录文件到U盘
   - 或安装Robot Program Loader工具

### 第二天：配置网络

3. **步骤3：连接网线**
   - 网线接控制柜X6网口和工控机

4. **步骤4：设置IP**
   - 通过示教器或RobotStudio设置
   - 确保与工控机同网段

### 第三天：Mech-Vision配置

5. **步骤5：打开软件**
   - Mech-Vision → 新建/打开方案

6. **步骤6：配置通信**
   - 机器人通信配置
   - 品牌：ABB
   - 协议格式：HEX（little-endian）
   - 端口：50000
   - 确认接口服务开启

### 第四天：烧录

7. **步骤7：自动烧录**
   - 打开Robot Program Loader
   - 连接机器人
   - 备份
   - 一键烧录

8. **步骤8：手动烧录（如自动失败）**
   - 通过示教器或RobotStudio导入.mod文件

### 第五天：测试

9. **步骤9：修改测试程序**
   - 修改MM_Com_Test中的IP地址

10. **步骤10：运行测试**
    - 单步运行
    - 确认连接成功

### 第六天：完整测试

11. **步骤11：运行示例程序**
    - ���置物体到相机视野内
    - 运行MM_S1_Vis_Basic
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

## 十、重置和恢复

### 10.1 重置RAPID

将删除当前RAPID程序和数据，但保留系统参数：
1. 左上角菜单 → 重新启动
2. 点击高级
3. 选中重置RAPID
4. 点击重置RAPID

### 10.2 重置系统

恢复出厂设置（会重置IO配置）：
1. 先备份
2. 左上角菜单 → 重新启动
3. 点击高级
4. 选中重置系统
5. 点击重置系统

---

## 官方文档链接

- ABB RobotWare 6：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/abb-setup-instructions.html
- ABB RobotWare 7：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/abb-robotware7.html
- ABB标准接口指令：https://docs.mech-mind.net/zh/robot-integration/latest/standard-interface-robot/abb-interface-commands.html

文档创建：2026-04-02
如有问题请联系梅卡曼德技术支持