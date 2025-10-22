import{j as s,u,a as g,b as N,r as c,E as b,f as S}from"./index-Ct1b2fJq.js";import{a as _}from"./index-ngrFHoWO.js";const C=()=>{const{t:l}=u(),n=g(),{captureException:t}=N(),[r,o]=c.useState(.5),[i,m]=c.useState(5),[h,d]=c.useState(!1),[j,a]=c.useState(null),p=async()=>{d(!0),n.info("开始 DBSCAN 聚类",{eps:r,minSamples:i});try{const e=await _.post("/api/algorithms/unsupervised/dbscan/cluster",{eps:r,min_samples:i});a(e.data),n.info("DBSCAN 聚类成功",{result:e.data})}catch(e){n.error("DBSCAN 聚类失败",{error:e.message,eps:r,minSamples:i}),t(e,{type:S.NETWORK,severity:b.HIGH,context:{algorithm:"dbscan",eps:r,minSamples:i,message:"聚类失败，请检查后端服务是否正常运行"}}),a({error:"聚类失败，请检查控制台获取详细信息"})}finally{d(!1)}};return s.jsxs("div",{className:"demo-container",children:[s.jsxs("div",{className:"demo-parameters",children:[s.jsx("h3",{children:"聚类参数"}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"eps",children:"EPS (最大距离):"}),s.jsx("input",{id:"eps",type:"number",value:r,onChange:e=>o(parseFloat(e.target.value)),min:"0.1",max:"2.0",step:"0.1"})]}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"minSamples",children:"最小样本数:"}),s.jsx("input",{id:"minSamples",type:"number",value:i,onChange:e=>m(parseInt(e.target.value)),min:"1",max:"20"})]}),s.jsx("button",{onClick:p,disabled:h,children:h?"聚类中...":"开始聚类"})]}),j&&s.jsxs("div",{className:"demo-results",children:[s.jsx("h3",{children:"聚类结果"}),s.jsx("pre",{children:JSON.stringify(j,null,2)})]})]})};function x(l){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"DBSCAN (基于密度的噪声应用空间聚类)"}),`
`,s.jsx(n.p,{children:"DBSCAN 是一种基于密度的聚类算法，它将紧密聚集的点分组在一起，将位于低密度区域中的孤立点标记为异常值。"}),`
`,s.jsx(n.h2,{children:"DBSCAN 的工作原理"}),`
`,s.jsx(n.p,{children:"DBSCAN 通过找到数据空间中的密集区域来工作。算法需要两个关键参数："}),`
`,s.jsx(n.h3,{children:"1. Epsilon (eps)"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"两个样本之间的最大距离，以便一个样本被认为是另一个样本的邻域"}),`
`,s.jsx(n.li,{children:"定义数据点周围邻域的半径"}),`
`,s.jsx(n.li,{children:"决定聚类密度的关键参数"}),`
`]}),`
`,s.jsx(n.h3,{children:"2. 最小样本数 (min_samples)"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"数据点被认为是核心点的邻域中的最小样本数"}),`
`,s.jsx(n.li,{children:"确定聚类所需的最小密度"}),`
`]}),`
`,s.jsx(n.h2,{children:"算法步骤"}),`
`,s.jsxs(n.ol,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"初始化"}),"：将所有点标记为未访问"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"选择点"}),"：随机选择一个未访问的点"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"查找邻居"}),"：找到 eps 距离内的所有点"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"核心点检查"}),"：如果邻居数 ≥ min_samples，标记为核心点"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"扩展聚类"}),"：将所有可达点添加到聚类中"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"标记已访问"}),"：将聚类中的所有点标记为已访问"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"重复"}),"：继续直到所有点都被访问"]}),`
`]}),`
`,s.jsx(n.h2,{children:"点的类型"}),`
`,s.jsx(n.h3,{children:"核心点"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"在 eps 距离内至少有 min_samples 个邻居的点"}),`
`,s.jsx(n.li,{children:"形成聚类的骨干"}),`
`]}),`
`,s.jsx(n.h3,{children:"边界点"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"邻居数少于 min_samples 但在核心点的 eps 距离内的点"}),`
`,s.jsx(n.li,{children:"属于聚类但不是核心点"}),`
`]}),`
`,s.jsx(n.h3,{children:"噪声点"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"既不是核心点也不是边界点的点"}),`
`,s.jsx(n.li,{children:"被认为是异常值或噪声"}),`
`]}),`
`,s.jsx(n.h2,{children:"交互式演示"}),`
`,s.jsx(n.p,{children:"尝试使用不同参数进行 DBSCAN 聚类："}),`
`,s.jsx(C,{}),`
`,s.jsx(n.h2,{children:"实现示例"}),`
`,s.jsx(n.p,{children:"以下是使用 Python 和 scikit-learn 的 DBSCAN 实现："}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-python",children:[s.jsx(n.span,{className:"hljs-keyword",children:"from"})," sklearn.cluster ",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),` DBSCAN\r
`,s.jsx(n.span,{className:"hljs-keyword",children:"from"})," sklearn.datasets ",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),` make_blobs\r
`,s.jsx(n.span,{className:"hljs-keyword",children:"import"})," numpy ",s.jsx(n.span,{className:"hljs-keyword",children:"as"}),` np\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 生成样本数据"}),`\r
X, _ = make_blobs(n_samples=`,s.jsx(n.span,{className:"hljs-number",children:"300"}),", centers=",s.jsx(n.span,{className:"hljs-number",children:"4"}),", cluster_std=",s.jsx(n.span,{className:"hljs-number",children:"0.60"}),", random_state=",s.jsx(n.span,{className:"hljs-number",children:"0"}),`)\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 应用 DBSCAN 聚类"}),`\r
dbscan = DBSCAN(eps=`,s.jsx(n.span,{className:"hljs-number",children:"0.5"}),", min_samples=",s.jsx(n.span,{className:"hljs-number",children:"5"}),`)\r
cluster_labels = dbscan.fit_predict(X)\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 获取聚类信息"}),`\r
n_clusters = `,s.jsx(n.span,{className:"hljs-built_in",children:"len"}),"(",s.jsx(n.span,{className:"hljs-built_in",children:"set"}),"(cluster_labels)) - (",s.jsx(n.span,{className:"hljs-number",children:"1"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"if"})," -",s.jsx(n.span,{className:"hljs-number",children:"1"})," ",s.jsx(n.span,{className:"hljs-keyword",children:"in"})," cluster_labels ",s.jsx(n.span,{className:"hljs-keyword",children:"else"})," ",s.jsx(n.span,{className:"hljs-number",children:"0"}),`)\r
n_noise = `,s.jsx(n.span,{className:"hljs-built_in",children:"list"}),"(cluster_labels).count(-",s.jsx(n.span,{className:"hljs-number",children:"1"}),`)\r
\r
`,s.jsx(n.span,{className:"hljs-built_in",children:"print"}),"(",s.jsxs(n.span,{className:"hljs-string",children:["f'聚类数量: ",s.jsx(n.span,{className:"hljs-subst",children:"{n_clusters}"}),"'"]}),`)\r
`,s.jsx(n.span,{className:"hljs-built_in",children:"print"}),"(",s.jsxs(n.span,{className:"hljs-string",children:["f'噪声点数量: ",s.jsx(n.span,{className:"hljs-subst",children:"{n_noise}"}),"'"]}),`)
`]})}),`
`,s.jsx(n.h2,{children:"优势"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"无需指定聚类数量"}),"：自动确定聚类数量"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"处理噪声"}),"：将异常值识别为噪声点"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"任意聚类形状"}),"：可以找到任何形状的聚类，不仅仅是球形"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"鲁棒性"}),"：在包含噪声和异常值的数据集上表现良好"]}),`
`]}),`
`,s.jsx(n.h2,{children:"局限性"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"参数敏感性"}),"：性能严重依赖于 eps 和 min_samples 参数"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"密度变化"}),"：难以处理密度变化的聚类"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"高维数据"}),"：在高维空间中性能下降"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"内存使用"}),"：对于大型数据集可能很耗内存"]}),`
`]}),`
`,s.jsx(n.h2,{children:"参数选择"}),`
`,s.jsx(n.h3,{children:"选择 EPS"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"K-距离图"}),"：绘制 k-距离（到第 k 个最近邻居的距离）"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"肘部方法"}),'：在 k-距离图中寻找"肘部"']}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"领域知识"}),"：使用领域专业知识设置适当的值"]}),`
`]}),`
`,s.jsx(n.h3,{children:"选择 Min_samples"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"经验法则"}),"：从 min_samples = 2 * 维度数开始"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"数据大小"}),"：更大的数据集可能需要更高的 min_samples"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"噪声水平"}),"：更高的噪声水平需要更高的 min_samples"]}),`
`]}),`
`,s.jsx(n.h2,{children:"应用场景"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"图像分割"}),"：对图像中的相似像素进行分组"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"异常检测"}),"：识别数据中的异常模式"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"市场细分"}),"：根据行为对客户进行分组"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"地理数据"}),"：根据邻近性对位置进行聚类"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"生物信息学"}),"：对具有相似功能的基因或蛋白质进行分组"]}),`
`]}),`
`,s.jsx(n.h2,{children:"与其他算法的比较"}),`
`,s.jsx(n.h3,{children:"vs K-Means"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"形状"}),"：DBSCAN 找到任意形状，K-Means 找到球形聚类"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"噪声"}),"：DBSCAN 处理噪声，K-Means 不处理"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"参数"}),"：DBSCAN 需要 eps/min_samples，K-Means 需要 k"]}),`
`]}),`
`,s.jsx(n.h3,{children:"vs 层次聚类"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"速度"}),"：DBSCAN 通常更快"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"内存"}),"：DBSCAN 使用更少的内存"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"可扩展性"}),"：DBSCAN 更好地扩展到大型数据集"]}),`
`]}),`
`,s.jsx(n.h2,{children:"最佳实践"}),`
`,s.jsxs(n.ol,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"数据预处理"}),"：标准化特征以确保一致的距离测量"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"参数调优"}),"：使用交叉验证或网格搜索进行参数选择"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"可视化"}),"：绘制结果以验证聚类质量"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"特征工程"}),"：选择相关的聚类特征"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"验证"}),"：使用轮廓分析或其他指标评估聚类质量"]}),`
`]}),`
`,s.jsx(n.h2,{children:"高级技术"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"HDBSCAN"}),"：处理密度变化的层次版本"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"OPTICS"}),"：排序点以识别聚类结构"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"DenStream"}),"：用于在线聚类的流式版本"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"增量 DBSCAN"}),"：随着新数据到达更新聚类"]}),`
`]})]})}function A(l={}){const{wrapper:n}=l.components||{};return n?s.jsx(n,{...l,children:s.jsx(x,{...l})}):x(l)}export{C as DBSCANDemo,A as default};
