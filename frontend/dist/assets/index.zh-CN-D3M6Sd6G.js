import{j as s,u as g,a as b,b as y,r as c,E as C,f as v}from"./index-Ct1b2fJq.js";import{a as f}from"./index-ngrFHoWO.js";const S=()=>{const{t:l}=g(),n=b(),{captureException:o}=y(),[r,m]=c.useState(10),[i,p]=c.useState(32),[a,u]=c.useState(.001),[h,t]=c.useState(!1),[j,d]=c.useState(null),N=async()=>{t(!0),n.info("开始训练卷积神经网络(CNN)",{epochs:r,batchSize:i,learningRate:a});try{const e=await f.post("/api/algorithms/neural-networks/cnn/train",{epochs:r,batch_size:i,learning_rate:a});d(e.data),n.info("CNN 训练成功",{result:e.data})}catch(e){n.error("CNN 训练失败",{error:e.message,epochs:r,batchSize:i,learningRate:a}),o(e,{type:v.NETWORK,severity:C.HIGH,context:{algorithm:"cnn",epochs:r,batchSize:i,learningRate:a,message:"训练失败，请检查后端服务是否正常运行"}}),d({error:"训练失败，请检查控制台获取详细信息"})}finally{t(!1)}};return s.jsxs("div",{className:"demo-container",children:[s.jsxs("div",{className:"demo-parameters",children:[s.jsx("h3",{children:"训练参数"}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"epochs",children:"训练轮数:"}),s.jsx("input",{id:"epochs",type:"number",value:r,onChange:e=>m(parseInt(e.target.value)),min:"1",max:"100"})]}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"batchSize",children:"批次大小:"}),s.jsx("input",{id:"batchSize",type:"number",value:i,onChange:e=>p(parseInt(e.target.value)),min:"1",max:"256"})]}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"learningRate",children:"学习率:"}),s.jsx("input",{id:"learningRate",type:"number",value:a,onChange:e=>u(parseFloat(e.target.value)),min:"0.0001",max:"1",step:"0.001"})]}),s.jsx("button",{onClick:N,disabled:h,children:h?"训练中...":"开始训练"})]}),j&&s.jsxs("div",{className:"demo-results",children:[s.jsx("h3",{children:"训练结果"}),s.jsx("pre",{children:JSON.stringify(j,null,2)})]})]})};function x(l){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(n.h1,{children:"卷积神经网络 (CNN)"}),`
`,s.jsx(n.p,{children:"卷积神经网络（CNN）是一种深度学习算法，在图像识别和计算机视觉任务中特别有效。CNN 通过反向传播自动学习特征的空间层次结构。"}),`
`,s.jsx(n.h2,{children:"CNN 的工作原理"}),`
`,s.jsx(n.p,{children:"CNN 使用称为卷积的数学运算，将滤波器（核）应用于输入图像以提取特征。CNN 的关键组件包括："}),`
`,s.jsx(n.h3,{children:"1. 卷积层"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"应用滤波器检测边缘、纹理和形状等特征"}),`
`,s.jsx(n.li,{children:"每个滤波器学习检测不同的模式"}),`
`,s.jsx(n.li,{children:"创建特征图，突出显示特定特征的位置"}),`
`]}),`
`,s.jsx(n.h3,{children:"2. 池化层"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"减少特征图的空间维度"}),`
`,s.jsx(n.li,{children:"常见类型：最大池化和平均池化"}),`
`,s.jsx(n.li,{children:"有助于降低计算复杂度并防止过拟合"}),`
`]}),`
`,s.jsx(n.h3,{children:"3. 全连接层"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"将一层的每个神经元连接到另一层的每个神经元"}),`
`,s.jsx(n.li,{children:"用于最终的分类决策"}),`
`,s.jsx(n.li,{children:"类似于传统神经网络"}),`
`]}),`
`,s.jsx(n.h2,{children:"架构"}),`
`,s.jsx(n.pre,{children:s.jsx(n.code,{children:`输入图像 → 卷积层 → 池化层 → 卷积层 → 池化层 → 全连接层 → 输出
`})}),`
`,s.jsx(n.h2,{children:"主要优势"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"平移不变性"}),"：无论对象在图像中的位置如何，都能识别"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"参数共享"}),"：与全连接网络相比，减少了参数数量"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"层次特征学习"}),"：自动学习从低级到高级的特征"]}),`
`]}),`
`,s.jsx(n.h2,{children:"应用场景"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsx(n.li,{children:"图像分类"}),`
`,s.jsx(n.li,{children:"目标检测"}),`
`,s.jsx(n.li,{children:"人脸识别"}),`
`,s.jsx(n.li,{children:"医学图像分析"}),`
`,s.jsx(n.li,{children:"自动驾驶汽车"}),`
`]}),`
`,s.jsx(n.h2,{children:"交互式演示"}),`
`,s.jsx(n.p,{children:"尝试使用不同参数训练 CNN 模型："}),`
`,s.jsx(S,{}),`
`,s.jsx(n.h2,{children:"实现示例"}),`
`,s.jsx(n.p,{children:"以下是使用 Python 和 TensorFlow 的简单 CNN 实现："}),`
`,s.jsx(n.pre,{children:s.jsxs(n.code,{className:"hljs language-python",children:[s.jsx(n.span,{className:"hljs-keyword",children:"import"})," tensorflow ",s.jsx(n.span,{className:"hljs-keyword",children:"as"}),` tf\r
`,s.jsx(n.span,{className:"hljs-keyword",children:"from"})," tensorflow.keras ",s.jsx(n.span,{className:"hljs-keyword",children:"import"}),` layers, models\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 创建 CNN 模型"}),`\r
model = models.Sequential([\r
    layers.Conv2D(`,s.jsx(n.span,{className:"hljs-number",children:"32"}),", (",s.jsx(n.span,{className:"hljs-number",children:"3"}),", ",s.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",s.jsx(n.span,{className:"hljs-string",children:"'relu'"}),", input_shape=(",s.jsx(n.span,{className:"hljs-number",children:"28"}),", ",s.jsx(n.span,{className:"hljs-number",children:"28"}),", ",s.jsx(n.span,{className:"hljs-number",children:"1"}),`)),\r
    layers.MaxPooling2D((`,s.jsx(n.span,{className:"hljs-number",children:"2"}),", ",s.jsx(n.span,{className:"hljs-number",children:"2"}),`)),\r
    layers.Conv2D(`,s.jsx(n.span,{className:"hljs-number",children:"64"}),", (",s.jsx(n.span,{className:"hljs-number",children:"3"}),", ",s.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",s.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.MaxPooling2D((`,s.jsx(n.span,{className:"hljs-number",children:"2"}),", ",s.jsx(n.span,{className:"hljs-number",children:"2"}),`)),\r
    layers.Conv2D(`,s.jsx(n.span,{className:"hljs-number",children:"64"}),", (",s.jsx(n.span,{className:"hljs-number",children:"3"}),", ",s.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",s.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Flatten(),\r
    layers.Dense(`,s.jsx(n.span,{className:"hljs-number",children:"64"}),", activation=",s.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,s.jsx(n.span,{className:"hljs-number",children:"10"}),", activation=",s.jsx(n.span,{className:"hljs-string",children:"'softmax'"}),`)\r
])\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 编译模型"}),`\r
model.`,s.jsx(n.span,{className:"hljs-built_in",children:"compile"}),"(optimizer=",s.jsx(n.span,{className:"hljs-string",children:"'adam'"}),`,\r
              loss=`,s.jsx(n.span,{className:"hljs-string",children:"'sparse_categorical_crossentropy'"}),`,\r
              metrics=[`,s.jsx(n.span,{className:"hljs-string",children:"'accuracy'"}),`])\r
\r
`,s.jsx(n.span,{className:"hljs-comment",children:"# 训练模型"}),`\r
model.fit(train_images, train_labels, epochs=`,s.jsx(n.span,{className:"hljs-number",children:"10"}),", batch_size=",s.jsx(n.span,{className:"hljs-number",children:"32"}),`)
`]})}),`
`,s.jsx(n.h2,{children:"超参数"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"训练轮数"}),"：完整遍历训练数据集的次数"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"批次大小"}),"：模型更新前处理的样本数量"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"学习率"}),"：控制训练期间模型权重更新的程度"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"滤波器数量"}),"：决定网络学习特征的能力"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"滤波器大小"}),"：卷积核的大小（如 3x3、5x5）"]}),`
`]}),`
`,s.jsx(n.h2,{children:"最佳实践"}),`
`,s.jsxs(n.ol,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"数据增强"}),"：通过应用变换增加数据集大小"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"正则化"}),"：使用 dropout 和批归一化防止过拟合"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"迁移学习"}),"：使用预训练模型获得更好的性能"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"学习率调度"}),"：训练期间调整学习率"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"早停"}),"：当验证性能停止改善时停止训练"]}),`
`]}),`
`,s.jsx(n.h2,{children:"挑战"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"计算要求"}),"：CNN 需要大量的计算资源"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"过拟合"}),"：存在记忆训练数据而不是学习一般模式的风险"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"超参数调优"}),"：找到最优参数可能很耗时"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"数据需求"}),"：通常需要大量标记数据"]}),`
`]}),`
`,s.jsx(n.h2,{children:"未来发展方向"}),`
`,s.jsxs(n.ul,{children:[`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"注意力机制"}),"：关注输入的相关部分"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"高效架构"}),"：MobileNets、EfficientNets 用于移动部署"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"3D CNN"}),"：将 CNN 扩展到视频和体积数据"]}),`
`,s.jsxs(n.li,{children:[s.jsx(n.strong,{children:"胶囊网络"}),"：保持空间关系的替代架构"]}),`
`]})]})}function w(l={}){const{wrapper:n}=l.components||{};return n?s.jsx(n,{...l,children:s.jsx(x,{...l})}):x(l)}export{S as CNNDemo,w as default};
