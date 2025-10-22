import{j as n,u as L,a as f,b,r as l,E as v,f as P}from"./index-Ct1b2fJq.js";import{a as M}from"./index-ngrFHoWO.js";const S=()=>{const{t:r}=L(),s=f(),{captureException:p}=b(),[i,m]=l.useState(2),[c,u]=l.useState(128),[h,g]=l.useState(.001),[d,y]=l.useState(100),[a,x]=l.useState(!1),[j,t]=l.useState(null),N=async()=>{x(!0),s.info("开始训练多层感知器(MLP)",{hiddenLayers:i,neuronsPerLayer:c,learningRate:h,epochs:d});try{const e=await M.post("/api/algorithms/neural-networks/mlp/train",{hidden_layers:i,neurons_per_layer:c,learning_rate:h,epochs:d});t(e.data),s.info("MLP 训练成功",{result:e.data})}catch(e){s.error("MLP 训练失败",{error:e.message,hiddenLayers:i,neuronsPerLayer:c,learningRate:h,epochs:d}),p(e,{type:P.NETWORK,severity:v.HIGH,context:{algorithm:"mlp",hiddenLayers:i,neuronsPerLayer:c,learningRate:h,epochs:d,message:"训练失败，请检查后端服务是否正常运行"}}),t({error:"训练失败，请检查控制台获取详细信息"})}finally{x(!1)}};return n.jsxs("div",{className:"demo-container",children:[n.jsxs("div",{className:"demo-parameters",children:[n.jsx("h3",{children:"训练参数"}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"hiddenLayers",children:"隐藏层数:"}),n.jsx("input",{id:"hiddenLayers",type:"number",value:i,onChange:e=>m(parseInt(e.target.value)),min:"1",max:"10"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"neuronsPerLayer",children:"每层神经元数:"}),n.jsx("input",{id:"neuronsPerLayer",type:"number",value:c,onChange:e=>u(parseInt(e.target.value)),min:"1",max:"1024"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"learningRate",children:"学习率:"}),n.jsx("input",{id:"learningRate",type:"number",value:h,onChange:e=>g(parseFloat(e.target.value)),min:"0.0001",max:"1",step:"0.001"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"epochs",children:"训练轮数:"}),n.jsx("input",{id:"epochs",type:"number",value:d,onChange:e=>y(parseInt(e.target.value)),min:"1",max:"1000"})]}),n.jsx("button",{onClick:N,disabled:a,children:a?"训练中...":"开始训练"})]}),j&&n.jsxs("div",{className:"demo-results",children:[n.jsx("h3",{children:"训练结果"}),n.jsx("pre",{children:JSON.stringify(j,null,2)})]})]})};function o(r){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(s.h1,{children:"多层感知机 (MLP)"}),`
`,n.jsx(s.p,{children:"多层感知机（MLP）是一类前馈人工神经网络（ANN）。它由至少三层节点组成：输入层、隐藏层和输出层。每个节点是一个使用非线性激活函数的神经元。"}),`
`,n.jsx(s.h2,{children:"MLP 的工作原理"}),`
`,n.jsx(s.p,{children:"MLP 是全连接网络，其中一层的每个神经元都连接到下一层的每个神经元。关键组件包括："}),`
`,n.jsx(s.h3,{children:"1. 输入层"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"接收输入数据"}),`
`,n.jsx(s.li,{children:"每个输入特征对应一个神经元"}),`
`,n.jsx(s.li,{children:"此层不执行计算"}),`
`]}),`
`,n.jsx(s.h3,{children:"2. 隐藏层"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"执行实际计算"}),`
`,n.jsx(s.li,{children:"应用权重、偏置和激活函数"}),`
`,n.jsx(s.li,{children:"可以有多个隐藏层（深度学习）"}),`
`]}),`
`,n.jsx(s.h3,{children:"3. 输出层"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"产生最终预测或分类"}),`
`,n.jsx(s.li,{children:"神经元数量取决于任务"}),`
`,n.jsx(s.li,{children:"使用适当的激活函数（如分类的 softmax）"}),`
`]}),`
`,n.jsx(s.h2,{children:"架构"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`输入层 → 隐藏层1 → 隐藏层2 → ... → 输出层
`})}),`
`,n.jsx(s.h2,{children:"数学基础"}),`
`,n.jsx(s.p,{children:"对于单个神经元，输出计算为："}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`y = f(∑(wi * xi) + b)
`})}),`
`,n.jsx(s.p,{children:"其中："}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.code,{children:"wi"})," 是权重"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.code,{children:"xi"})," 是输入值"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.code,{children:"b"})," 是偏置"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.code,{children:"f"})," 是激活函数"]}),`
`]}),`
`,n.jsx(s.h2,{children:"激活函数"}),`
`,n.jsx(s.h3,{children:"常见激活函数："}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.p,{children:n.jsx(s.strong,{children:"ReLU（修正线性单元）"})}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`f(x) = max(0, x)
`})}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.p,{children:n.jsx(s.strong,{children:"Sigmoid"})}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`f(x) = 1 / (1 + e^(-x))
`})}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.p,{children:n.jsx(s.strong,{children:"Tanh"})}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`f(x) = tanh(x)
`})}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsxs(s.p,{children:[n.jsx(s.strong,{children:"Softmax"}),"（用于分类的输出层）"]}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{children:`f(xi) = e^(xi) / ∑(e^(xj))
`})}),`
`]}),`
`]}),`
`,n.jsx(s.h2,{children:"训练过程"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"前向传播"}),"：数据从输入流向输出"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"损失计算"}),"：比较预测与实际目标"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"反向传播"}),"：计算损失相对于权重的梯度"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"权重更新"}),"：使用优化算法调整权重（如 SGD、Adam）"]}),`
`]}),`
`,n.jsx(s.h2,{children:"应用场景"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"分类"}),"：图像分类、垃圾邮件检测、情感分析"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"回归"}),"：价格预测、股票市场分析、天气预报"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"模式识别"}),"：手写识别、语音识别"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"函数逼近"}),"：通用函数逼近器"]}),`
`]}),`
`,n.jsx(s.h2,{children:"交互式演示"}),`
`,n.jsx(s.p,{children:"尝试使用不同参数训练 MLP 模型："}),`
`,n.jsx(S,{}),`
`,n.jsx(s.h2,{children:"实现示例"}),`
`,n.jsx(s.p,{children:"以下是使用 Python 和 TensorFlow 的简单 MLP 实现："}),`
`,n.jsx(s.pre,{children:n.jsxs(s.code,{className:"hljs language-python",children:[n.jsx(s.span,{className:"hljs-keyword",children:"import"})," tensorflow ",n.jsx(s.span,{className:"hljs-keyword",children:"as"}),` tf\r
`,n.jsx(s.span,{className:"hljs-keyword",children:"from"})," tensorflow.keras ",n.jsx(s.span,{className:"hljs-keyword",children:"import"}),` layers, models\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 创建 MLP 模型"}),`\r
model = models.Sequential([\r
    layers.Dense(`,n.jsx(s.span,{className:"hljs-number",children:"128"}),", activation=",n.jsx(s.span,{className:"hljs-string",children:"'relu'"}),", input_shape=(",n.jsx(s.span,{className:"hljs-number",children:"784"}),`,)),\r
    layers.Dense(`,n.jsx(s.span,{className:"hljs-number",children:"64"}),", activation=",n.jsx(s.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,n.jsx(s.span,{className:"hljs-number",children:"32"}),", activation=",n.jsx(s.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,n.jsx(s.span,{className:"hljs-number",children:"10"}),", activation=",n.jsx(s.span,{className:"hljs-string",children:"'softmax'"}),`)\r
])\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 编译模型"}),`\r
model.`,n.jsx(s.span,{className:"hljs-built_in",children:"compile"}),"(optimizer=",n.jsx(s.span,{className:"hljs-string",children:"'adam'"}),`,\r
              loss=`,n.jsx(s.span,{className:"hljs-string",children:"'sparse_categorical_crossentropy'"}),`,\r
              metrics=[`,n.jsx(s.span,{className:"hljs-string",children:"'accuracy'"}),`])\r
\r
`,n.jsx(s.span,{className:"hljs-comment",children:"# 训练模型"}),`\r
model.fit(train_images, train_labels, epochs=`,n.jsx(s.span,{className:"hljs-number",children:"100"}),", batch_size=",n.jsx(s.span,{className:"hljs-number",children:"32"}),`)
`]})}),`
`,n.jsx(s.h2,{children:"超参数"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"隐藏层数"}),"：输入层和输出层之间的层数"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"每层神经元数"}),"：每个隐藏层中的神经元数量"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"学习率"}),"：控制优化过程中的步长"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"训练轮数"}),"：完整遍历训练数据集的次数"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"批次大小"}),"：模型更新前处理的样本数量"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"激活函数"}),"：应用于神经元输出的非线性函数"]}),`
`]}),`
`,n.jsx(s.h2,{children:"优势"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"通用逼近"}),"：可以逼近任何连续函数"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"灵活性"}),"：可以处理各种类型的数据"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"非线性映射"}),"：可以学习复杂的模式"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"可扩展性"}),"：可以扩展到大型数据集"]}),`
`]}),`
`,n.jsx(s.h2,{children:"局限性"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"过拟合"}),"：存在记忆训练数据的风险"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"局部最小值"}),"：训练期间可能陷入局部最优"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"计算成本"}),"：对于大型网络可能很昂贵"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"黑盒"}),"：难以解释学习的表示"]}),`
`]}),`
`,n.jsx(s.h2,{children:"最佳实践"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"数据预处理"}),"：标准化或规范化输入特征"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"正则化"}),"：使用 dropout、L1/L2 正则化防止过拟合"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"批归一化"}),"：稳定训练并改善收敛"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"学习率调度"}),"：训练期间调整学习率"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"早停"}),"：当验证性能停止改善时停止训练"]}),`
`]}),`
`,n.jsx(s.h2,{children:"高级技术"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Dropout"}),"：训练期间随机将神经元设置为零"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"批归一化"}),"：规范化每层的输入"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"权重初始化"}),"：使用适当的初始化方案（Xavier、He）"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"优化"}),"：使用高级优化器（Adam、RMSprop）"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"集成方法"}),"：组合多个 MLP 以获得更好的性能"]}),`
`]})]})}function D(r={}){const{wrapper:s}=r.components||{};return s?n.jsx(s,{...r,children:n.jsx(o,{...r})}):o(r)}export{S as MLPDemo,D as default};
