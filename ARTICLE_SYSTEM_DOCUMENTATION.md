# 文章生成系统文档

## 系统概述

本系统是一个基于Vue.js的RC汽车升级指南文章生成平台，支持动态SEO优化、多车型管理和数据驱动的文章创作策略。

## 核心JSON配置文件详解

### 1. config.json - 车型基础配置
**文件路径**: `/src/data/config.json`
**作用**: 存储所有RC车型的基础信息，是系统的核心数据源

```json
{
  "models": [
    {
      "id": 1,
      "brand": "Traxxas",
      "model": "Slash 2WD",
      "fullName": "Traxxas Slash 2WD",
      "scale": "1:10",
      "drive": "2WD",
      "url": "/upgrade-parts/traxxas/slash-2wd"
    }
    // ... 共20个车型
  ]
}
```

**关键字段说明**:
- `id`: 车型唯一标识符（1-20）
- `brand`: 品牌名称（Traxxas, Arrma, Team Associated等）
- `model`: 车型型号
- `fullName`: 完整车型名称
- `scale`: 比例尺（1:10, 1:8等）
- `drive`: 驱动方式（2WD, 4WD, 4x4等）
- `url`: 车型页面URL路径

### 2. articleSEO.json - SEO优化配置
**文件路径**: `/src/data/articleSEO.json`
**作用**: 管理所有文章的SEO元数据和关键词优化

```json
{
  "default": {
    "title": "RC Car Upgrades - Complete RC Upgrade Guide | RC Match AI",
    "description": "Complete RC car upgrades guide...",
    "keywords": "rc car upgrades, rc car motor upgrade..."
  },
  "articles": {
    "201": {
      "title": "Traxxas Slash 2WD Performance Upgrade Guide",
      "description": "Complete Traxxas Slash 2WD upgrade guide...",
      "keywords": "traxxas slash 2wd upgrade, slash 2wd performance..."
    }
    // ... 其他文章SEO配置
  }
}
```

**关键功能**:
- `default`: 默认SEO配置，用于新文章
- `articles`: 各文章的个性化SEO配置
- 支持动态更新页面标题和描述

### 3. hotParts.json - 热门部件数据
**文件路径**: `/src/data/hotParts.json`
**作用**: 存储RC汽车热门升级部件信息和用户提交的升级记录

```json
{
  "upgradeRecords": [
    {
      "id": 10,
      "modelId": 1,
      "part": "Upgraded ESC",
      "upgrade_spec": "Hobbywing Xerun XR8 SCT",
      "reason": "Advanced programming for racing applications",
      "difficulty": 4,
      "source": "https://www.hobbywing.com",
      "submitter": "Race Champion",
      "timestamp": "2024-04-20 12:10:00",
      "approved": true,
      "modelInfo": {
        "brand": "Traxxas",
        "model": "Slash 2WD",
        "fullName": "Traxxas Slash 2WD"
      }
    }
  ]
}
```

**关键字段说明**:
- `id`: 升级记录唯一标识符
- `modelId`: 关联的车型ID（1-20）
- `part`: 升级部件名称
- `upgrade_spec`: 具体升级规格/型号
- `reason`: 升级理由
- `difficulty`: 安装难度（1-5级）
- `source`: 产品来源链接
- `submitter`: 提交者名称
- `timestamp`: 提交时间
- `approved`: 审核状态
- `modelInfo`: 车型详细信息

**与文章系统的集成规则**:
1. **文章创作时必须引用hotParts数据** - 新文章应基于现有的升级记录
2. **车型ID一致性** - 文章中的车型必须与hotParts中的modelId对应
3. **部件推荐验证** - 文章中推荐的部件应在hotParts中有对应记录
4. **数据驱动内容** - 文章内容应反映用户实际升级需求和经验

### 4. imageManagementConfig.json - 图片管理配置
**文件路径**: `/src/data/imageManagementConfig.json`
**作用**: 管理20个车型的图片需求和执行策略

```json
{
  "project_overview": {
    "total_models": 20,
    "brand_distribution": {
      "Traxxas": 13,
      "Team Associated": 3,
      "Losi": 1,
      "Arrma": 2,
      "Nitro": 1
    }
  },
  "execution_phases": {
    "phase_1": {
      "models": [
        {
          "id": 1,
          "brand": "Traxxas",
          "model": "Slash 2WD",
          "fullName": "Traxxas Slash 2WD",
          "reason": "基础车型，用户基数大",
          "estimated_images": 8
        }
      ]
    }
  }
}
```

**核心功能**:
- 分阶段执行策略（3个阶段）
- 每个车型的图片需求估算
- 品牌优先级分配

### 5. imageConfigChecklist.json - 配置确认清单
**文件路径**: `/src/data/imageConfigChecklist.json`
**作用**: 图片管理配置的确认和审核清单

```json
{
  "project_overview": {
    "total_models": 20,
    "status": "待确认"
  },
  "execution_phases": {
    "phase_1": {
      "models": [
        {
          "id": 1,
          "name": "Traxxas Slash 2WD",
          "status": "待确认"
        }
      ]
    }
  }
}
```

**用途**:
- 配置项的逐项确认
- 执行状态跟踪
- 用户审核界面

### 6. articlePriorityPlan.json - 文章优先级计划
**文件路径**: `/src/data/articlePriorityPlan.json`
**作用**: 基于数据的文章创作优先级规划

```json
{
  "数据驱动文章执行计划": {
    "SEMrush搜索计划": {
      "第一阶段搜索": [
        "traxxas slash 2wd upgrade",
        "traxxas rustler 4x4 upgrade"
      ]
    },
    "基于数据的文章优先级": {
      "高优先级": [
        {
          "车型ID": 1,
          "车型": "Traxxas Slash 2WD",
          "理由": "已有文章基础，SEO优化完成"
        }
      ]
    }
  }
}
```

**策略特点**:
- 基于SEMrush搜索数据
- 分优先级执行
- 数据驱动的决策

### 7. semrushSearchPlan.json - SEMrush搜索计划
**文件路径**: `/src/data/semrushSearchPlan.json`
**作用**: 详细的SEMrush关键词搜索和执行计划

```json
{
  "SEMrush搜索执行计划": {
    "立即执行的SEMrush搜索": {
      "第一优先级搜索": [
        {
          "关键词": "traxxas slash 2wd upgrade",
          "关联文章ID": 202,
          "搜索目的": "验证现有文章关键词热度"
        }
      ]
    }
  }
}
```

**搜索策略**:
- 分优先级的关键词搜索
- 关联现有文章验证
- 品牌对比分析

## 系统工作流程

### 1. 数据准备阶段
1. **车型配置** → 更新 `config.json`
2. **SEO基础** → 配置 `articleSEO.json`
3. **部件数据** → 完善 `hotParts.json`

### 2. 策略规划阶段
1. **图片管理** → 制定 `imageManagementConfig.json`
2. **文章优先级** → 创建 `articlePriorityPlan.json`
3. **搜索策略** → 规划 `semrushSearchPlan.json`

### 3. 执行确认阶段
1. **配置审核** → 使用 `imageConfigChecklist.json`
2. **分阶段执行** → 按优先级执行计划
3. **数据验证** → 基于搜索数据调整策略

## 文件依赖关系

```
config.json (基础数据)
    ↓
articleSEO.json (SEO优化)
    ↓
hotParts.json (内容数据)
    ↓
imageManagementConfig.json (资源规划)
    ↓
articlePriorityPlan.json (内容策略)
    ↓
semrushSearchPlan.json (数据驱动)
    ↓
imageConfigChecklist.json (执行确认)
```

## 后续开发参考指南

### 创建新文章时参考顺序：
1. 检查 `config.json` - 确认车型ID和基本信息
2. 参考 `articleSEO.json` - 应用SEO最佳实践
3. 查看 `articlePriorityPlan.json` - 确定文章优先级
4. 使用 `semrushSearchPlan.json` - 验证关键词热度

### 图片管理时参考顺序：
1. 查看 `imageManagementConfig.json` - 了解图片需求
2. 使用 `imageConfigChecklist.json` - 确认执行状态
3. 参考 `config.json` - 获取车型详细信息

### 系统优化时参考：
1. 分析 `hotParts.json` - 了解用户需求热点
2. 检查 `articleSEO.json` - 优化现有文章SEO
3. 更新 `articlePriorityPlan.json` - 调整内容策略

## 重要提醒

- 所有JSON文件都存储在 `/src/data/` 目录下
- 车型ID（1-20）在所有文件中保持一致
- SEO配置会动态影响页面标题和描述
- 图片管理配置支持分阶段批量执行
- 搜索数据用于指导内容创作优先级

## 开发流程规范

### 1. 需求分析阶段（先探讨，不立即编码）
**原则：先定方案，确认后再执行**

**分析内容：**
- 可行性评估
- 优缺点对比分析
- 影响范围评估
- 制定多个可选方案

**输出：**
- 详细的需求分析报告
- 2-3个可行的技术方案
- 每个方案的优缺点对比
- 预期的实施时间估算

### 2. 方案确认阶段（用户确认后执行）
**原则：用户确认方案后再开始编码**

**确认流程：**
1. 呈现分析结果和方案选项
2. 详细说明每个方案的技术实现细节
3. 评估对现有系统的影响
4. 明确实施步骤和时间安排
5. 获得用户明确确认

**确认标准：**
- 方案选择明确
- 技术细节清晰
- 影响范围可控
- 时间安排合理

### 3. 编码实施阶段（分阶段执行）
**原则：分阶段实施，及时沟通进度**

**实施流程：**
1. 按照确认方案分阶段开发
2. 每个阶段完成后进行测试验证
3. 及时沟通进度和遇到的问题
4. 确保代码质量和系统稳定性

**质量保证：**
- 代码符合项目规范
- 功能测试通过
- 性能指标达标
- 用户体验良好

### 4. 特殊情况处理

**紧急修复：**
- 对于紧急bug修复，可简化流程
- 但需事后补充分析和文档

**小改动：**
- 对于不影响系统架构的小改动
- 可适当简化分析流程
- 但仍需保持沟通确认

## 开发原则总结

1. **先探讨，后编码** - 不立即开始编码实现
2. **方案确认制** - 用户确认方案后再执行
3. **分阶段实施** - 避免一次性大规模改动
4. **及时沟通** - 保持开发进度的透明度
5. **质量优先** - 确保代码质量和系统稳定性

## 文章语言规范

### Traxxas Slash 4x4系列全英文规则

**规则生效日期**: 2024-12-20
**适用范围**: 所有Traxxas Slash 4x4相关文章

#### 1. 适用车型
- Traxxas Slash 4x4 (车型ID: 2)
- 包括所有4x4版本：标准版、VXL版、Ultimate版等

#### 2. 语言要求
- **标题**: 必须使用英文
- **描述**: 必须使用英文
- **关键词**: 必须使用英文
- **正文内容**: 必须使用英文
- **图片说明**: 必须使用英文
- **元数据**: 必须使用英文

#### 3. 已转换的文章
以下Traxxas Slash 4x4相关文章已转换为全英文格式：

1. **traxxas-slash-4x4-performance-upgrade-guide.md**
   - 标题: "Traxxas Slash 4x4 Performance Upgrade Guide: Complete Step-by-Step Tutorial"
   - 路径: `/public/articles/traxxas-slash-4x4-performance-upgrade-guide.md`

2. **traxxas-slash-4x4-ultimate-upgrade-guide.md**
   - 标题: "Traxxas Slash 4x4 Ultimate Upgrade Guide: Premium Performance Optimization"
   - 路径: `/public/articles/traxxas-slash-4x4-ultimate-upgrade-guide.md`

3. **traxxas-slash-4x4-vxl-upgrade-guide.md**
   - 标题: "Traxxas Slash 4x4 VXL Upgrade Guide: High-Performance Electronics Optimization"
   - 路径: `/public/articles/traxxas-slash-4x4-vxl-upgrade-guide.md`

#### 4. 路径规范
所有Traxxas Slash 4x4文章的mdPath必须使用相对路径格式（无开头斜杠）：
- ✅ 正确格式: `articles/traxxas-slash-4x4-performance-upgrade-guide.md`
- ❌ 错误格式: `/articles/traxxas-slash-4x4-performance-upgrade-guide.md`

#### 5. 未来文章创作要求
- 所有新创建的Traxxas Slash 4x4相关文章必须遵循全英文规则
- 在hotParts.json中创建新记录时，确保type字段设置为"article"
- 确保modelId正确设置为2（Traxxas Slash 4x4）

#### 6. 维护和更新
- 定期检查现有文章是否符合英文规范
- 如有新的Traxxas Slash 4x4版本发布，及时创建对应的英文文章
- 保持与hotParts.json中记录的一致性

### 其他车型语言规范
- 其他车型暂时保持现有语言格式（中英文混合）
- 如有特定车型需要全英文规范，将在此文档中单独添加

此文档将帮助您在后续开发中快速理解系统架构和各配置文件的作用，并遵循规范的开发流程。