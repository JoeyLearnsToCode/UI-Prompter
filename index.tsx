
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { COMPONENT_DATA, COMPONENT_STATS } from './js/componentData.js';
import { getAiChatResponse, ChatMessage } from './services/geminiService';
import './css/style.css';

// --- Data ---
const PURPOSES = [
    { id: 'dashboard', title: '数据仪表盘', icon: '📊', desc: '用于数据可视化、分析和后台管理的复杂界面。' },
    { id: 'landing', title: '营销落地页', icon: '🚀', desc: '高转化率的产品介绍页面，强调视觉冲击力。' },
    { id: 'ecommerce', title: '电商平台', icon: '🛍️', desc: '商品展示、购物车和结账流程。' },
    { id: 'saas', title: 'SaaS 应用', icon: '💻', desc: '功能丰富的网络应用程序界面。' },
    { id: 'mobile', title: '移动端 App', icon: '📱', desc: 'iOS/Android 原生应用界面设计。' },
    { id: 'portfolio', title: '个人作品集', icon: '🎨', desc: '展示创意作品和个人简历的简约页面。' },
    { id: 'blog', title: '内容博客', icon: '📝', desc: '注重阅读体验的文章列表和详情页。' },
    { id: 'settings', title: '设置中心', icon: '⚙️', desc: '复杂的配置选项、表单和用户资料管理。' }
];

const STYLES = [
    { id: 'apple', title: 'Modern Apple', desc: '极致简约，大量留白，模糊半透明效果，完美的圆角和阴影。', color: '#007AFF' },
    { id: 'fluent2', title: 'Fluent 2 Design', desc: '微软最新设计语言，强调光影、材质和动效，通过圆角、阴影和半透明效果营造友好、现代且有深度的界面。', color: '#0078D4' },
    { id: 'glassmorphism', title: '玻璃拟态 (Glassmorphism)', desc: '通过背景模糊、半透明和细腻边框创造层次感，效果轻盈通透，常见于Apple和微软的设计中。', color: '#14B8A6' },
    { id: 'material', title: 'Material V3', desc: 'Google设计语言，动态色彩，高对比度，卡片式布局。', color: '#6750A4' },
    { id: 'neumorphism', title: '新拟物主义 (Neumorphism)', desc: '通过柔和的内外阴影，让UI元素仿佛从背景中浮出或凹陷，营造出柔软、简约、一体化的质感。', color: '#E0E5EC' },
    { id: 'minimal', title: '极致极简', desc: '黑白为主，极少的装饰元素，强调排版和内容本身。', color: '#000000' },
    { id: 'brutalist', title: '新粗野主义', desc: '大胆的边框，高饱和度色彩，复古且不拘一格的排版。', color: '#FF5722' },
    { id: 'corporate', title: '专业商务', desc: '稳重、值得信赖的蓝色系，传统的布局，信息密度较高。', color: '#0A66C2' },
    { id: 'playful', title: '活泼趣味', desc: '圆润的字体，鲜艳的色彩，丰富的微交互和插画元素。', color: '#FFC107' }
];

// --- Custom Hook for LocalStorage ---
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
}

// --- App Component ---
const App = () => {
    // --- State ---
    const [appState, setAppState] = useLocalStorage('promptCraftState', {
        step: 1,
        purpose: null as string | null,
        style: null as string | null,
        primaryColor: '#007AFF',
        components: [] as string[],
        promptFormat: 'markdown'
    });
    const [isAiAssistantOpen, setAiAssistantOpen] = useState(false);
    const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' }[]>([]);

    const updateState = (updates: Partial<typeof appState>) => {
        setAppState(prev => ({ ...prev, ...updates }));
    };

    const selectedComponents = useMemo(() => new Set(appState.components), [appState.components]);

    // --- Toast Notifications ---
    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3300);
    }, []);

    // --- Navigation ---
    const nextStep = () => {
        if (appState.step < 3) {
            if (appState.step === 1 && !appState.purpose) {
                showToast('请先选择一个设计目的', 'error');
                return;
            }
            if (appState.step === 2 && !appState.style) {
                showToast('请先选择一种视觉风格', 'error');
                return;
            }
            updateState({ step: appState.step + 1 });
        } else {
            showToast('提示词已准备就绪！');
            document.getElementById('prompt-text')?.focus();
        }
    };

    const prevStep = () => {
        if (appState.step > 1) {
            updateState({ step: appState.step - 1 });
        }
    };

    // --- Actions ---
    const resetState = () => {
        if (confirm('确定要重置所有选择吗？')) {
            setAppState({
                step: 1,
                purpose: null,
                style: null,
                primaryColor: '#007AFF',
                components: [],
                promptFormat: 'markdown'
            });
            showToast('已重置');
        }
    };

    const showHelp = () => {
        alert('UI Prompt Generator 帮助\n\n1. 选择目的：确定你要设计的应用类型。\n2. 定义风格：选择喜欢的视觉语言和品牌色。\n3. 配置组件：勾选需要包含的具体功能模块。\n\n完成后，右下角会自动生成结构化的AI提示词，可直接复制用于 Midjourney、Stable Diffusion 或 GPT-4。\n\n💬 AI设计助手：\n与AI实时对话获取设计建议。');
    };
    
    // --- Prompt Generation ---
    const generatedPrompt = useMemo(() => {
        const pObj = PURPOSES.find(p => p.id === appState.purpose);
        const sObj = STYLES.find(s => s.id === appState.style);

        if (!pObj || !sObj) {
            return "请在左侧完成选择以生成提示词...";
        }

        const pName = pObj.title;
        const sName = sObj.title;
        const sDesc = sObj.desc;

        let componentListStr = '';
        if (selectedComponents.size > 0) {
            selectedComponents.forEach(compId => {
                for (const catData of Object.values(COMPONENT_DATA)) {
                    // FIX: Cast catData to any to access components property. This resolves the type error
                    // where TypeScript cannot infer the type of objects from a non-module JavaScript file.
                    const comp = (catData as any).components.find((c: any) => c.id === compId);
                    if (comp) {
                        componentListStr += `- ${comp.name}: ${comp.desc}\n`;
                        break;
                    }
                }
            });
        } else {
            componentListStr = '- (暂无特定组件要求，请自由发挥)\n';
        }

        switch (appState.promptFormat) {
            case 'json':
                const promptObj = {
                    role: "UI/UX Designer",
                    task: "Create High-Fidelity Mockup",
                    project: pName,
                    style: { name: sName, description: sDesc, primaryColor: appState.primaryColor },
                    components: Array.from(selectedComponents),
                    requirements: ["Responsive", "WCAG 2.1 AA", "Modern Grid Layout"]
                };
                return JSON.stringify(promptObj, null, 2);
            case 'text':
                return `作为一名专业UI设计师，请为【${pName}】设计一套界面。风格采用【${sName}】（${sDesc}），主色调为 ${appState.primaryColor}。\n\n需要包含以下组件：\n${componentListStr}\n请确保设计是响应式的，并且符合现代设计趋势，注重用户体验细节。`;
            case 'markdown':
            default:
                return `# UI 设计需求文档

## 1. 项目概述
为 **${pName}** 设计一套专业的用户界面。
- **设计风格**: ${sName}
- **风格特征**: ${sDesc}
- **主色调**: ${appState.primaryColor}

## 2. 核心组件要求
请确保设计包含以下功能模块，并保持视觉一致性：
${componentListStr}
## 3. 设计要求
- **响应式**: 必须完美适配桌面端和移动端。
- **可访问性**: 符合 WCAG 2.1 AA 标准，保证足够的对比度。
- **交互**: 为关键操作（如按钮悬停、点击）设计细腻的微交互反馈。
- **布局**: 使用现代网格系统，保持充足的留白，避免信息过载。

---
*请基于以上需求，生成高保真的 UI 设计图或可直接使用的 HTML/CSS 代码框架。*`.trim();
        }
    }, [appState.purpose, appState.style, appState.primaryColor, selectedComponents, appState.promptFormat]);
    
    const copyPrompt = () => {
        navigator.clipboard.writeText(generatedPrompt)
            .then(() => showToast('已复制到剪贴板'))
            .catch(() => showToast('复制失败，请手动复制', 'error'));
    };

    return (
        <>
            <div id="app">
                <Header onReset={resetState} onHelp={showHelp} onOpenAiAssistant={() => setAiAssistantOpen(true)} />
                <div className="main-container">
                    <WizardPanel
                        appState={appState}
                        updateState={updateState}
                        selectedComponents={selectedComponents}
                    />
                    <PreviewPanel
                        appState={appState}
                        generatedPrompt={generatedPrompt}
                        onCopy={copyPrompt}
                        onFormatChange={(e) => updateState({ promptFormat: e.target.value })}
                    />
                </div>
                <Footer step={appState.step} onPrev={prevStep} onNext={nextStep} />
            </div>

            <AiAssistantModal
                isOpen={isAiAssistantOpen}
                onClose={() => setAiAssistantOpen(false)}
                appState={appState}
                showToast={showToast}
            />

            <div id="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast show`}>
                        <svg width="20" height="20" fill="none" stroke={toast.type === 'success' ? '#34C759' : '#FF3B30'} strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {toast.message}
                    </div>
                ))}
            </div>
        </>
    );
};

// --- Sub-Components ---

const Header = ({ onReset, onHelp, onOpenAiAssistant }: any) => (
    <header className="app-header">
        <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21,12.4a1,1,0,0,0-1.3-.27L17,13.9V6.5A2.5,2.5,0,0,0,14.5,4h-5A2.5,2.5,0,0,0,7,6.5v7.4l-2.7-1.77a1,1,0,0,0-1.3.27,1,1,0,0,0,.27,1.37l4.65,3.1a2.48,2.48,0,0,0,1.38.42h5.4a2.48,2.48,0,0,0,1.38-.42l4.65-3.1A1,1,0,0,0,21,12.4Z" />
            </svg>
            <span>UI Prompt Generator</span>
        </div>
        <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-icon" aria-label="Reset" onClick={onReset} title="重置">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button>
            <button className="btn btn-ghost btn-icon" aria-label="Help" onClick={onHelp} title="帮助">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button className="btn btn-primary" onClick={onOpenAiAssistant} style={{ marginLeft: '8px' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                AI设计助手
            </button>
        </div>
    </header>
);

const WizardPanel = ({ appState, updateState, selectedComponents }: any) => {
    const { step, purpose, style, primaryColor } = appState;

    const titles: { [key: number]: string } = {
        1: '选择设计目的',
        2: '定义视觉风格',
        3: '配置功能组件'
    };
    const descs: { [key: number]: string } = {
        1: '您希望构建什么样的用户界面？这将决定整体的结构布局。',
        2: '选择一种设计语言，它将决定配色、排版和组件质感。',
        3: `选择页面中需要包含的关键功能模块（多选）。当前有 ${COMPONENT_STATS.totalCategories} 个类别，共 ${COMPONENT_STATS.totalComponents} 个组件`
    };

    const handleComponentToggle = (id: string) => {
        const newComponents = new Set(selectedComponents);
        if (newComponents.has(id)) {
            newComponents.delete(id);
        } else {
            newComponents.add(id);
        }
        updateState({ components: Array.from(newComponents) });
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="grid-cards">
                        {PURPOSES.map(p => (
                            <div key={p.id} className={`selection-card ${purpose === p.id ? 'selected' : ''}`} onClick={() => updateState({ purpose: p.id })}>
                                <div className="check-mark"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                                <div className="card-icon">{p.icon}</div>
                                <h3 className="card-title">{p.title}</h3>
                                <p className="card-desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <>
                        <div className="grid-cards">
                            {STYLES.map(s => (
                                <div key={s.id} className={`selection-card ${style === s.id ? 'selected' : ''}`} onClick={() => updateState({ style: s.id, primaryColor: s.color })}>
                                    <div className="check-mark"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div className="card-icon" style={{ color: s.color }}><div style={{ width: '24px', height: '24px', background: 'currentColor', borderRadius: '50%' }}></div></div>
                                    <h3 className="card-title">{s.title}</h3>
                                    <p className="card-desc">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '40px' }}>
                            <h3 className="category-header" style={{ border: 'none', padding: 0, marginBottom: '12px', fontSize: '19px' }}>主色调</h3>
                            <div className="flex gap-4 items-center">
                                <input type="color" id="color-picker" value={primaryColor} onChange={e => updateState({ primaryColor: e.target.value })} style={{ height: '40px', width: '60px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                                <span className="text-secondary text-sm">点击色块自定义品牌色</span>
                            </div>
                        </div>
                    </>
                );
            case 3:
                return <ComponentsStep selectedComponents={selectedComponents} onToggle={handleComponentToggle} />;
            default:
                return null;
        }
    };

    return (
        <main className="wizard-panel">
            <div className="wizard-header">
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
                <h1 className="step-title">{titles[step]}</h1>
                <p className="step-description">{descs[step]}</p>
            </div>
            <div className="animate-fade-in">
                {renderStepContent()}
            </div>
        </main>
    );
};

const ComponentsStep = ({ selectedComponents, onToggle }: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredComponents = useMemo(() => {
        if (!searchTerm) return COMPONENT_DATA;
        const lowerKeyword = searchTerm.toLowerCase();
        const filtered: any = {};
        for (const [category, data] of Object.entries(COMPONENT_DATA)) {
            // FIX: Cast data to any to access components property, as its type is not correctly inferred from the JS module.
            const matchingComponents = (data as any).components.filter((comp: any) =>
                comp.name.toLowerCase().includes(lowerKeyword) ||
                comp.desc.toLowerCase().includes(lowerKeyword)
            );
            if (matchingComponents.length > 0) {
                // FIX: Cast data to any to allow spreading, as its type is not inferred as an object.
                filtered[category] = { ...(data as any), components: matchingComponents };
            }
        }
        return filtered;
    }, [searchTerm]);

    return (
        <>
            <div className="component-search-container">
                <div className="search-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input type="text" id="component-search" placeholder="搜索组件..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    {searchTerm && <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>}
                </div>
            </div>
            {Object.entries(filteredComponents).map(([category, data]: [string, any]) => (
                <div key={category} className="component-category-section">
                    <h3 className="category-header">
                        <span className="category-icon">{data.icon}</span>
                        <span className="category-title">{category}</span>
                        <span className="component-count">{data.components.length} 个组件</span>
                    </h3>
                    <div className="component-grid">
                        {data.components.map((comp: any) => {
                            const isSelected = selectedComponents.has(comp.id);
                            return (
                                <div key={comp.id} className={`component-item ${isSelected ? 'selected' : ''}`} onClick={() => onToggle(comp.id)}>
                                    <div className="checkbox-custom">
                                        {isSelected && <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>}
                                    </div>
                                    <div className="component-info">
                                        <div className="component-name">{comp.name}</div>
                                        <div className="component-desc">{comp.desc}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </>
    );
};


const PreviewPanel = ({ appState, generatedPrompt, onCopy, onFormatChange }: any) => {
    const { purpose, style, primaryColor, components } = appState;
    const pObj = PURPOSES.find(p => p.id === purpose);
    const sObj = STYLES.find(s => s.id === style);

    // FIX: Use a type assertion on the object literal to allow for CSS custom properties,
    // which are not included in React.CSSProperties by default.
    const canvasStyle = {
        '--c-primary': primaryColor,
        border: style === 'brutalist' ? '3px solid #000' : '1px solid var(--c-border-light)',
        borderRadius: style === 'brutalist' || style === 'minimal' ? '0' : 'var(--radius-lg)'
    } as React.CSSProperties;
    
    return (
        <aside className="preview-panel">
            <div className="preview-header">
                <span>实时预览</span>
                <span className="text-xs text-secondary">Auto-updating</span>
            </div>
            <div className="preview-content">
                <div className="preview-canvas" style={canvasStyle}>
                     <div className="mock-nav"><div className="mock-nav-logo"></div><div className="mock-nav-link" style={{width: '40px'}}></div><div className="mock-nav-link"></div><div className="mock-nav-link"></div></div>
                    <div className="mock-hero"><div className="mock-title"></div><div className="mock-subtitle"></div><div className="mock-btn"></div></div>
                    <div className="mock-grid"><div className="mock-card"></div><div className="mock-card"></div></div>
                </div>
                <div id="selection-tags" className="flex flex-wrap gap-2">
                    {pObj && <span className="text-xs font-medium" style={{padding: '4px 10px', background: '#E5F1FF', borderRadius: '20px'}}>{pObj.title}</span>}
                    {sObj && <span className="text-xs font-medium" style={{padding: '4px 10px', background: 'var(--c-bg-tertiary)', borderRadius: '20px'}}>{sObj.title}</span>}
                    {components.length > 0 && <span className="text-xs font-medium" style={{padding: '4px 10px', background: 'var(--c-bg-tertiary)', borderRadius: '20px'}}>{components.length} 个组件</span>}
                </div>
            </div>
            <div className="prompt-output-container">
                <div className="prompt-header">
                    <span className="font-semibold text-sm">生成的提示词</span>
                    <div className="prompt-actions">
                        <select id="prompt-format" className="text-sm" value={appState.promptFormat} onChange={onFormatChange} style={{ borderRadius: '6px', border: '1px solid var(--c-border)', padding: '2px 8px' }}>
                            <option value="markdown">Markdown</option><option value="text">纯文本</option><option value="json">JSON</option>
                        </select>
                        <button className="btn btn-sm btn-primary" onClick={onCopy}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                            复制
                        </button>
                    </div>
                </div>
                <textarea id="prompt-text" readOnly spellCheck="false" value={generatedPrompt}></textarea>
            </div>
        </aside>
    );
};

const Footer = ({ step, onPrev, onNext }: any) => (
    <footer className="app-footer">
        <div className="text-sm text-secondary">步骤 {step} / 3</div>
        <div className="flex gap-4">
            <button className="btn btn-secondary" onClick={onPrev} disabled={step === 1}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                上一步
            </button>
            <button className="btn btn-primary" onClick={onNext}>
                {step === 3 ? '生成完毕' : '下一步'}
                {step === 3 ? <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg> : <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>}
            </button>
        </div>
    </footer>
);

const AiAssistantModal = ({ isOpen, onClose, appState, showToast }: any) => {
    const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatHistory', []);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        const newUserMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content: trimmedInput, timestamp: Date.now() };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const context = {
                purpose: PURPOSES.find(p => p.id === appState.purpose)?.title || '未选择',
                style: STYLES.find(s => s.id === appState.style)?.title || '未选择',
                styleDesc: STYLES.find(s => s.id === appState.style)?.desc || '无',
                primaryColor: appState.primaryColor,
                components: appState.components.join(', ') || '无',
            };
            const response = await getAiChatResponse(trimmedInput, context, messages);
            const newAiMessage: ChatMessage = { id: `model-${Date.now()}`, role: 'model', content: response, timestamp: Date.now() };
            setMessages(prev => [...prev, newAiMessage]);
        } catch (error: any) {
            const errorMessage: ChatMessage = { id: `error-${Date.now()}`, role: 'error', content: error.message, timestamp: Date.now() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay show">
            <div className="ai-chatbot-modal">
                <div className="ai-chatbot-header">
                    <div className="ai-chatbot-title">
                        <div className="ai-avatar-large">🤖</div>
                        <div className="ai-title-text"><h3>AI 设计助手</h3><p className="ai-status">在线</p></div>
                    </div>
                    <button className="ai-close-btn" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div className="ai-chatbot-body">
                    <div className="ai-chatbot-messages">
                        {messages.length === 0 && (
                            <div className="ai-welcome-screen">
                                <div className="ai-welcome-icon">✨</div>
                                <h2>欢迎使用 AI 设计助手</h2>
                                <p>基于您当前的选择，我可以帮助您：</p>
                                <ul className="ai-features">
                                    <li>💡 获得配色或字体建议</li>
                                    <li>🧩 讨论组件交互细节</li>
                                    <li>🤔 探索新的设计想法</li>
                                </ul>
                            </div>
                        )}
                        {messages.map(msg => (
                           <div key={msg.id} className={`ai-message ${msg.role === 'error' ? 'assistant' : msg.role}`}>
                                <div className="ai-message-avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
                                <div className="ai-message-content">
                                    <div className={`ai-message-bubble ${msg.role === 'error' ? 'error' : ''}`}>{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="ai-typing">
                                <span>AI正在思考</span>
                                <div className="ai-typing-dots"><span></span><span></span><span></span></div>
                            </div>
                        )}
                         <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="ai-chatbot-input">
                    <div className="ai-input-wrapper">
                        <textarea
                            id="ai-input"
                            placeholder="询问关于设计的任何问题..."
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                        ></textarea>
                         <div className="ai-input-actions">
                             <button className="ai-send-btn" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
