/**
 * Component Data
 * Enhanced Components: 18 categories, 100+ components
 * Maintains Apple Design Language
 */

// FIX: Export constants to be used as ES modules.
// This resolves the error "File ... is not a module." and allows TypeScript
// to correctly import and infer types for COMPONENT_DATA and COMPONENT_STATS.
export const COMPONENT_DATA = {
    '导航': {
        icon: '🧭',
        color: '#007AFF',
        components: [
            { id: 'navbar', name: '导航栏', desc: '标准水平导航，包含Logo和主菜单' },
            { id: 'sidebar', name: '侧边栏', desc: '垂直折叠菜单，适合复杂后台系统' },
            { id: 'breadcrumb', name: '面包屑导航', desc: '显示当前页面路径层级' },
            { id: 'tabs', name: '选项卡', desc: '同级内容之间的快速切换' },
            { id: 'menu', name: '下拉菜单', desc: '多级下拉导航菜单' },
            { id: 'pagination', name: '分页', desc: '分页导航控件' },
            { id: 'steps', name: '步骤条', desc: '显示流程步骤进度' },
            { id: 'affix', name: '回到顶部', desc: '固定位置返回顶部按钮' }
        ]
    },

    '表单': {
        icon: '📝',
        color: '#34C759',
        components: [
            { id: 'input', name: '文本输入', desc: '单行文本输入框' },
            { id: 'textarea', name: '多行输入', desc: '多行文本输入区域' },
            { id: 'select', name: '下拉选择', desc: '单选下拉选择器' },
            { id: 'multiselect', name: '多选', desc: '多选下拉选择器' },
            { id: 'checkbox', name: '复选框', desc: '多项选择控件' },
            { id: 'radio', name: '单选框', desc: '单选项选择控件' },
            { id: 'switch', name: '开关', desc: '开关切换控件' },
            { id: 'slider', name: '滑块', desc: '范围选择滑块' },
            { id: 'datepicker', name: '日期选择', desc: '日期选择器' },
            { id: 'daterange', name: '日期范围', desc: '日期范围选择器' },
            { id: 'timepicker', name: '时间选择', desc: '时间选择器' },
            { id: 'upload', name: '文件上传', desc: '文件上传组件' },
            { id: 'cascader', name: '级联选择', desc: '多级联动选择器' },
            { id: 'rate', name: '评分', desc: '星级评分控件' },
            { id: 'transfer', name: '穿梭框', desc: '双向选择组件' },
            { id: 'autocomplete', name: '自动完成', desc: '带自动补全的输入框' }
        ]
    },

    '数据展示': {
        icon: '📊',
        color: '#FF9500',
        components: [
            { id: 'table', name: '数据表格', desc: '带排序、筛选功能的表格' },
            { id: 'list', name: '列表', desc: '垂直排列的信息列表' },
            { id: 'card', name: '卡片', desc: '内容卡片容器' },
            { id: 'badge', name: '徽章', desc: '状态或数量徽章' },
            { id: 'tag', name: '标签', desc: '分类标签' },
            { id: 'progress', name: '进度条', desc: '进度指示器' },
            { id: 'avatar', name: '头像', desc: '用户头像展示' },
            { id: 'statistic', name: '统计数字', desc: '数据统计展示' },
            { id: 'descriptions', name: '描述列表', desc: '成对展示描述信息' },
            { id: 'timeline', name: '时间轴', desc: '时间线展示' },
            { id: 'tree', name: '树形控件', desc: '树形结构展示' }
        ]
    },

    '反馈': {
        icon: '💬',
        color: '#AF52DE',
        components: [
            { id: 'alert', name: '警告框', desc: '重要提示信息' },
            { id: 'modal', name: '模态框', desc: '弹窗对话框' },
            { id: 'tooltip', name: '提示', desc: '悬停提示信息' },
            { id: 'toast', name: '通知', desc: '全局通知提示' },
            { id: 'skeleton', name: '骨架屏', desc: '加载占位动画' },
            { id: 'spinner', name: '加载', desc: '加载中动画' },
            { id: 'result', name: '结果页', desc: '操作结果展示' },
            { id: 'empty', name: '空状态', desc: '无数据占位页' },
            { id: 'confirm', name: '确认框', desc: '确认操作对话框' }
        ]
    },

    '布局': {
        icon: '📐',
        color: '#32ADE6',
        components: [
            { id: 'grid', name: '栅格', desc: '响应式栅格布局' },
            { id: 'flex', name: '弹性布局', desc: 'Flexbox弹性盒子' },
            { id: 'container', name: '容器', desc: '内容容器' },
            { id: 'divider', name: '分割线', desc: '内容分割线' },
            { id: 'space', name: '间距', desc: '调整元素间距' },
            { id: 'layout', name: '布局', desc: '页面整体布局' },
            { id: 'col', name: '列', desc: '栅格列组件' },
            { id: 'row', name: '行', desc: '栅格行组件' }
        ]
    },

    '内容': {
        icon: '📄',
        color: '#FF2D55',
        components: [
            { id: 'typography', name: '排版', desc: '文字排版样式' },
            { id: 'quote', name: '引用', desc: '引用文本块' },
            { id: 'code', name: '代码', desc: '代码展示块' },
            { id: 'image', name: '图片', desc: '图片展示组件' },
            { id: 'video', name: '视频', desc: '视频播放器' },
            { id: 'audio', name: '音频', desc: '音频播放器' }
        ]
    },

    '图表': {
        icon: '📈',
        color: '#5AC8FA',
        components: [
            { id: 'line-chart', name: '折线图', desc: '趋势折线图表' },
            { id: 'bar-chart', name: '柱状图', desc: '对比柱状图表' },
            { id: 'pie-chart', name: '饼图', desc: '占比饼图' },
            { id: 'area-chart', name: '面积图', desc: '区域面积图' },
            { id: 'scatter-chart', name: '散点图', desc: '分布散点图' },
            { id: 'radar-chart', name: '雷达图', desc: '多维雷达图' },
            { id: 'gauge-chart', name: '仪表盘', desc: '仪表盘图表' },
            { id: 'heatmap', name: '热力图', desc: '数据热力图' }
        ]
    },

    '导航菜单': {
        icon: '☰',
        color: '#30D158',
        components: [
            { id: 'dropdown', name: '下拉菜单', desc: '下拉列表菜单' },
            { id: 'contextmenu', name: '右键菜单', desc: '右键上下文菜单' },
            { id: 'menu-button', name: '菜单按钮', desc: '带菜单的按钮' },
            { id: 'mega-menu', name: '巨菜单', desc: '大型导航菜单' }
        ]
    },

    '数据输入': {
        icon: '⌨️',
        color: '#FF9F0A',
        components: [
            { id: 'input-number', name: '数字输入', desc: '数字专用输入框' },
            { id: 'input-password', name: '密码输入', desc: '密码输入框' },
            { id: 'input-search', name: '搜索输入', desc: '带搜索按钮的输入框' },
            { id: 'input-group', name: '输入组合', desc: '输入框组合控件' },
            { id: 'input-size', name: '大中小输入框', desc: '不同尺寸输入框' },
            { id: 'search-table', name: '搜索表格', desc: '带搜索的表格' }
        ]
    },

    '展示': {
        icon: '🖼️',
        color: '#BF5AF2',
        components: [
            { id: 'image-preview', name: '图片预览', desc: '图片预览组件' },
            { id: 'image-carousel', name: '图片轮播', desc: '图片轮播组件' },
            { id: 'avatar-list', name: '头像列表', desc: '头像组展示' },
            { id: 'preview', name: '文件预览', desc: '文件预览组件' },
            { id: 'gallery', name: '图片画廊', desc: '图片画廊展示' }
        ]
    },

    '反馈状态': {
        icon: 'ℹ️',
        color: '#64D2FF',
        components: [
            { id: 'message', name: '消息提示', desc: '页面内消息提示' },
            { id: 'notification', name: '通知提醒', desc: '系统通知提醒' },
            { id: 'popover', name: '气泡卡片', desc: '弹出气泡卡片' },
            { id: 'popconfirm', name: '气泡确认', desc: '弹出确认框' },
            { id: 'popselect', name: '气泡选择', desc: '弹出选择器' }
        ]
    },

    '高级数据': {
        icon: '🎯',
        color: '#FF375F',
        components: [
            { id: 'tree-select', name: '树形选择', desc: '树形结构选择器' },
            { id: 'tree-table', name: '树表格', desc: '树形结构表格' },
            { id: 'drag-sort', name: '拖拽排序', desc: '拖拽排序组件' },
            { id: 'resizable', name: '可调整大小', desc: '可调整列宽的表格' },
            { id: 'fixed-columns', name: '固定列', desc: '固定列的表格' }
        ]
    },

    '业务组件': {
        icon: '💼',
        color: '#FFD60A',
        components: [
            { id: 'transfer-business', name: '穿梭框', desc: '双向选择组件' },
            { id: 'tour', name: '引导', desc: '产品功能引导' },
            { id: 'watermark', name: '水印', desc: '页面水印' },
            { id: 'anchor-nav', name: '锚点', desc: '页面锚点定位' }
        ]
    },

    '通用': {
        icon: '🔧',
        color: '#64D2FF',
        components: [
            { id: 'button', name: '按钮', desc: '多种样式的按钮' },
            { id: 'icon', name: '图标', desc: 'SVG图标组件' },
            { id: 'link', name: '链接', desc: '文字链接' },
            { id: 'text', name: '文本', desc: '纯文本展示' },
            { id: 'paragraph', name: '段落', desc: '文本段落' },
            { id: 'title', name: '标题', desc: '多级标题' }
        ]
    },

    '实验性': {
        icon: '🧪',
        color: '#BF5AF2',
        components: [
            { id: 'color-picker', name: '颜色选择器', desc: '颜色选择组件' },
            { id: 'cropper', name: '图片裁剪', desc: '图片裁剪组件' },
            { id: 'flowchart', name: '流程图', desc: '可视化流程图' },
            { id: 'mentions', name: '提及', desc: '@提及组件' },
            { id: 'password-strength', name: '密码强度', desc: '密码强度检测' }
        ]
    },

    '移动端专用': {
        icon: '📱',
        color: '#30D158',
        components: [
            { id: 'bottom-nav', name: '底部导航', desc: '移动端底部导航栏' },
            { id: 'swipe-action', name: '滑动操作', desc: '滑动删除/收藏' },
            { id: 'pull-refresh', name: '下拉刷新', desc: '下拉刷新组件' },
            { id: 'action-sheet', name: '操作面板', desc: '底部弹出操作面板' },
            { id: 'floating-button', name: '悬浮按钮', desc: '移动端悬浮按钮' },
            { id: 'safe-area', name: '安全区域', desc: '适配刘海屏安全区域' }
        ]
    }
};

// 组件统计信息
export const COMPONENT_STATS = {
    totalCategories: Object.keys(COMPONENT_DATA).length,
    totalComponents: Object.values(COMPONENT_DATA).reduce((sum, cat) => sum + cat.components.length, 0),
    categoryList: Object.keys(COMPONENT_DATA)
};

// 工具函数：按分类获取组件
function getComponentsByCategory(category) {
    return COMPONENT_DATA[category]?.components || [];
}

// 工具函数：获取所有组件
function getAllComponents() {
    const all = [];
    Object.values(COMPONENT_DATA).forEach(category => {
        all.push(...category.components);
    });
    return all;
}

// 工具函数：根据ID获取组件
function getComponentById(id) {
    for (const category of Object.values(COMPONENT_DATA)) {
        const component = category.components.find(c => c.id === id);
        if (component) return component;
    }
    return null;
}

// 工具函数：搜索组件
function searchComponents(keyword) {
    if (!keyword) return getAllComponents();

    const lowerKeyword = keyword.toLowerCase();
    return getAllComponents().filter(comp =>
        comp.name.toLowerCase().includes(lowerKeyword) ||
        comp.desc.toLowerCase().includes(lowerKeyword) ||
        comp.id.toLowerCase().includes(lowerKeyword)
    );
}