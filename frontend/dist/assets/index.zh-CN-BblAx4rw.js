import{j as n,u as p,a as m,b as g,r as i,E as u,f as C}from"./index-Ct1b2fJq.js";import{a as N}from"./index-ngrFHoWO.js";const A=()=>{const{t:l}=p(),s=m(),{captureException:a}=g(),[e,t]=i.useState(2),[c,h]=i.useState(!1),[d,j]=i.useState(null),o=async()=>{h(!0),s.info("开始 PCA 降维",{nComponents:e});try{const r=await N.post("/api/algorithms/unsupervised/pca/transform",{n_components:e});j(r.data),s.info("PCA 降维成功",{result:r.data})}catch(r){s.error("PCA 降维失败",{error:r.message,nComponents:e}),a(r,{type:C.NETWORK,severity:u.HIGH,context:{algorithm:"pca",nComponents:e,message:"PCA 降维失败，请检查后端服务是否正常运行"}}),j({error:"PCA 降维失败，请检查控制台获取详细信息"})}finally{h(!1)}};return n.jsxs("div",{className:"demo-container",children:[n.jsxs("div",{className:"demo-parameters",children:[n.jsx("h3",{children:"PCA 参数"}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"nComponents",children:"组件数量:"}),n.jsx("input",{id:"nComponents",type:"number",value:e,onChange:r=>t(parseInt(r.target.value)),min:"1",max:"10"})]}),n.jsx("button",{onClick:o,disabled:c,children:c?"转换中...":"应用 PCA"})]}),d&&n.jsxs("div",{className:"demo-results",children:[n.jsx("h3",{children:"PCA 结果"}),n.jsx("pre",{children:JSON.stringify(d,null,2)})]})]})};function x(l){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l.components};return n.jsxs(n.Fragment,{children:[n.jsx(s.h1,{children:"主成分分析 (PCA)"}),`
`,n.jsx(s.p,{children:"主成分分析（PCA）是一种降维技术，将数据转换到低维空间，同时尽可能保留方差。它广泛用于数据可视化、噪声减少和特征提取。"}),`
`,n.jsx(s.h2,{children:"PCA 的工作原理"}),`
`,n.jsx(s.p,{children:"PCA 通过找到数据变化最大的方向（主成分）来工作。算法遵循以下步骤："}),`
`,n.jsx(s.h3,{children:"1. 数据居中"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"从每个数据点减去均值"}),`
`,n.jsx(s.li,{children:"确保数据以原点为中心"}),`
`]}),`
`,n.jsx(s.h3,{children:"2. 协方差矩阵计算"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"计算居中数据的协方差矩阵"}),`
`,n.jsx(s.li,{children:"显示特征如何一起变化"}),`
`]}),`
`,n.jsx(s.h3,{children:"3. 特征值分解"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"找到协方差矩阵的特征值和特征向量"}),`
`,n.jsx(s.li,{children:"特征值表示每个成分解释的方差量"}),`
`,n.jsx(s.li,{children:"特征向量表示最大方差的方向"}),`
`]}),`
`,n.jsx(s.h3,{children:"4. 成分选择"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"选择前 k 个特征向量（主成分）"}),`
`,n.jsx(s.li,{children:"将数据转换到新的坐标系"}),`
`]}),`
`,n.jsx(s.h2,{children:"数学基础"}),`
`,n.jsx(s.p,{children:"对于具有 n 个样本和 p 个特征的数据集 X："}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"数据居中"}),"：X_centered = X - μ"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"计算协方差矩阵"}),"：C = (1/n) * X_centered^T * X_centered"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"找到特征值和特征向量"}),"：C * v = λ * v"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"按特征值排序"}),"：λ₁ ≥ λ₂ ≥ ... ≥ λₚ"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"选择前 k 个成分"}),"：V_k = [v₁, v₂, ..., vₖ]"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"转换数据"}),"：Y = X_centered * V_k"]}),`
`]}),`
`,n.jsx(s.h2,{children:"交互式演示"}),`
`,n.jsx(s.p,{children:"尝试使用不同参数进行 PCA 转换："}),`
`,n.jsx(A,{}),`
`,n.jsx(s.h2,{children:"实现示例"}),`
`,n.jsx(s.p,{children:"以下是使用 Python 和 scikit-learn 的 PCA 实现："}),`
`,n.jsx(s.pre,{children:n.jsxs(s.code,{className:"hljs language-python",children:[n.jsx(s.span,{className:"hljs-keyword",children:"from"})," sklearn.decomposition ",n.jsx(s.span,{className:"hljs-keyword",children:"import"}),` PCA\r
`,n.jsx(s.span,{className:"hljs-keyword",children:"from"})," sklearn.datasets ",n.jsx(s.span,{className:"hljs-keyword",children:"import"}),` load_iris\r
`,n.jsx(s.span,{className:"hljs-keyword",children:"import"})," matplotlib.pyplot ",n.jsx(s.span,{className:"hljs-keyword",children:"as"}),` plt\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 加载样本数据"}),`\r
iris = load_iris()\r
X = iris.data\r
y = iris.target\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 应用 PCA"}),`\r
pca = PCA(n_components=`,n.jsx(s.span,{className:"hljs-number",children:"2"}),`)\r
X_pca = pca.fit_transform(X)\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 可视化结果"}),`\r
plt.scatter(X_pca[:, `,n.jsx(s.span,{className:"hljs-number",children:"0"}),"], X_pca[:, ",n.jsx(s.span,{className:"hljs-number",children:"1"}),"], c=y, cmap=",n.jsx(s.span,{className:"hljs-string",children:"'viridis'"}),`)\r
plt.xlabel(`,n.jsx(s.span,{className:"hljs-string",children:"'第一主成分'"}),`)\r
plt.ylabel(`,n.jsx(s.span,{className:"hljs-string",children:"'第二主成分'"}),`)\r
plt.title(`,n.jsx(s.span,{className:"hljs-string",children:"'鸢尾花数据集的 PCA'"}),`)\r
plt.show()\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 解释方差比"}),`\r
`,n.jsx(s.span,{className:"hljs-built_in",children:"print"}),"(",n.jsxs(s.span,{className:"hljs-string",children:["f'解释方差比: ",n.jsx(s.span,{className:"hljs-subst",children:"{pca.explained_variance_ratio_}"}),"'"]}),`)
`]})}),`
`,n.jsx(s.h2,{children:"关键概念"}),`
`,n.jsx(s.h3,{children:"解释方差"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"每个成分解释的总方差百分比"}),`
`,n.jsx(s.li,{children:"有助于确定保留多少个成分"}),`
`,n.jsx(s.li,{children:"所有解释方差比的总和等于 1.0"}),`
`]}),`
`,n.jsx(s.h3,{children:"主成分"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"最大方差的正交方向"}),`
`,n.jsx(s.li,{children:"第一个成分捕获最多方差"}),`
`,n.jsx(s.li,{children:"后续成分捕获剩余方差"}),`
`]}),`
`,n.jsx(s.h3,{children:"特征值"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"沿每个主成分的方差度量"}),`
`,n.jsx(s.li,{children:"较大的特征值表示更重要的成分"}),`
`]}),`
`,n.jsx(s.h2,{children:"应用场景"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"数据可视化"}),"：将高维数据降维到 2D 或 3D 进行绘图"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"噪声减少"}),"：移除低方差成分（通常是噪声）"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"特征提取"}),"：创建捕获重要模式的新特征"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"数据压缩"}),"：在保留信息的同时减少存储需求"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"预处理"}),"：为其他机器学习算法准备数据"]}),`
`]}),`
`,n.jsx(s.h2,{children:"优势"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"线性变换"}),"：简单且可解释"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"方差保留"}),"：在降维中保持最大方差"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"正交成分"}),"：主成分不相关"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"计算效率"}),"：对大多数数据集计算快速"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"无参数"}),"：无需调优超参数（除了成分数量）"]}),`
`]}),`
`,n.jsx(s.h2,{children:"局限性"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"线性假设"}),"：假设特征之间存在线性关系"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"基于方差"}),"：可能不保留重要的非方差信息"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"可解释性"}),"：主成分可能没有明确的含义"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"对缩放敏感"}),"：需要特征标准化才能获得有意义的结果"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"信息丢失"}),"：降维总是会丢失一些信息"]}),`
`]}),`
`,n.jsx(s.h2,{children:"参数选择"}),`
`,n.jsx(s.h3,{children:"成分数量"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"方差阈值"}),"：保留解释 95% 方差的成分"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"肘部方法"}),'：在解释方差图中寻找"肘部"']}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"交叉验证"}),"：使用下游任务性能选择成分"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"可视化"}),"：使用 2-3 个成分进行可视化"]}),`
`]}),`
`,n.jsx(s.h3,{children:"数据预处理"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"标准化"}),"：在应用 PCA 之前始终标准化特征"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"缺失值"}),"：在应用 PCA 之前处理缺失值"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"异常值"}),"：考虑移除异常值，因为它们会影响主成分"]}),`
`]}),`
`,n.jsx(s.h2,{children:"最佳实践"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"标准化特征"}),"：在应用 PCA 之前使用 StandardScaler"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"检查方差"}),"：绘制解释方差比以了解数据结构"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"验证结果"}),"：使用交叉验证确保 PCA 提高性能"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"解释成分"}),"：尝试理解每个成分代表什么"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"监控信息丢失"}),"：跟踪丢失了多少方差"]}),`
`]}),`
`,n.jsx(s.h2,{children:"高级技术"}),`
`,n.jsx(s.h3,{children:"核 PCA"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"使用核函数的 PCA 非线性版本"}),`
`,n.jsx(s.li,{children:"可以捕获数据中的非线性关系"}),`
`,n.jsx(s.li,{children:"比线性 PCA 计算更昂贵"}),`
`]}),`
`,n.jsx(s.h3,{children:"增量 PCA"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"适用于大型数据集的内存高效版本"}),`
`,n.jsx(s.li,{children:"批量处理数据"}),`
`,n.jsx(s.li,{children:"当数据无法装入内存时有用"}),`
`]}),`
`,n.jsx(s.h3,{children:"稀疏 PCA"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"产生稀疏主成分"}),`
`,n.jsx(s.li,{children:"比密集成分更容易解释"}),`
`,n.jsx(s.li,{children:"适用于特征选择"}),`
`]}),`
`,n.jsx(s.h2,{children:"与其他方法的比较"}),`
`,n.jsx(s.h3,{children:"vs 线性判别分析 (LDA)"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"目标"}),"：PCA 最大化方差，LDA 最大化类分离"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"监督"}),"：PCA 是无监督的，LDA 是有监督的"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"成分"}),"：PCA 成分是正交的，LDA 成分不是"]}),`
`]}),`
`,n.jsx(s.h3,{children:"vs t-SNE"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"目的"}),"：PCA 用于线性降维，t-SNE 用于非线性可视化"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"距离"}),"：PCA 保留全局结构，t-SNE 保留局部结构"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"速度"}),"：PCA 更快，t-SNE 更慢"]}),`
`]}),`
`,n.jsx(s.h2,{children:"可视化"}),`
`,n.jsx(s.p,{children:"PCA 常用于数据可视化："}),`
`,n.jsx(s.pre,{children:n.jsxs(s.code,{className:"hljs language-python",children:[n.jsx(s.span,{className:"hljs-keyword",children:"import"})," matplotlib.pyplot ",n.jsx(s.span,{className:"hljs-keyword",children:"as"}),` plt\r
`,n.jsx(s.span,{className:"hljs-keyword",children:"from"})," sklearn.decomposition ",n.jsx(s.span,{className:"hljs-keyword",children:"import"}),` PCA\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 2D 可视化"}),`\r
pca_2d = PCA(n_components=`,n.jsx(s.span,{className:"hljs-number",children:"2"}),`)\r
X_2d = pca_2d.fit_transform(X)\r
plt.scatter(X_2d[:, `,n.jsx(s.span,{className:"hljs-number",children:"0"}),"], X_2d[:, ",n.jsx(s.span,{className:"hljs-number",children:"1"}),`], c=y)\r
plt.show()\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 3D 可视化"}),`\r
pca_3d = PCA(n_components=`,n.jsx(s.span,{className:"hljs-number",children:"3"}),`)\r
X_3d = pca_3d.fit_transform(X)\r
fig = plt.figure()\r
ax = fig.add_subplot(`,n.jsx(s.span,{className:"hljs-number",children:"111"}),", projection=",n.jsx(s.span,{className:"hljs-string",children:"'3d'"}),`)\r
ax.scatter(X_3d[:, `,n.jsx(s.span,{className:"hljs-number",children:"0"}),"], X_3d[:, ",n.jsx(s.span,{className:"hljs-number",children:"1"}),"], X_3d[:, ",n.jsx(s.span,{className:"hljs-number",children:"2"}),`], c=y)\r
plt.show()
`]})})]})}function y(l={}){const{wrapper:s}=l.components||{};return s?n.jsx(s,{...l,children:n.jsx(x,{...l})}):x(l)}export{A as PCADemo,y as default};
