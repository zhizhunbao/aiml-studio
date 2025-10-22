import{j as e,u as N,a as f,b as y,r as t,E as v,f as b}from"./index-Ct1b2fJq.js";import{a as C}from"./index-ngrFHoWO.js";const k=()=>{const{t:r}=N(),n=f(),{captureException:j}=y(),[a,p]=t.useState(10),[i,x]=t.useState(32),[l,u]=t.useState(.001),[c,o]=t.useState(!1),[h,d]=t.useState(null),g=async()=>{o(!0),n.info("Started training CNN model",{epochs:a,batchSize:i,learningRate:l});try{const s=await C.post("/api/algorithms/neural-networks/cnn/train",{epochs:a,batch_size:i,learning_rate:l});d(s.data),n.info("CNN training completed successfully",{result:s.data})}catch(s){n.error("CNN training failed",{error:s.message,epochs:a,batchSize:i,learningRate:l}),j(s,{type:b.NETWORK,severity:v.HIGH,context:{algorithm:"cnn",epochs:a,batchSize:i,learningRate:l,message:"Training failed. Please check if backend service is running"}}),d({error:"Training failed. Please check the console for details."})}finally{o(!1)}};return e.jsxs("div",{className:"demo-container",children:[e.jsxs("div",{className:"demo-parameters",children:[e.jsx("h3",{children:"Training Parameters"}),e.jsxs("div",{className:"parameter-group",children:[e.jsx("label",{htmlFor:"epochs",children:"Epochs:"}),e.jsx("input",{id:"epochs",type:"number",value:a,onChange:s=>p(parseInt(s.target.value)),min:"1",max:"100"})]}),e.jsxs("div",{className:"parameter-group",children:[e.jsx("label",{htmlFor:"batchSize",children:"Batch Size:"}),e.jsx("input",{id:"batchSize",type:"number",value:i,onChange:s=>x(parseInt(s.target.value)),min:"1",max:"256"})]}),e.jsxs("div",{className:"parameter-group",children:[e.jsx("label",{htmlFor:"learningRate",children:"Learning Rate:"}),e.jsx("input",{id:"learningRate",type:"number",value:l,onChange:s=>u(parseFloat(s.target.value)),min:"0.0001",max:"1",step:"0.001"})]}),e.jsx("button",{onClick:g,disabled:c,children:c?"Training...":"Start Training"})]}),h&&e.jsxs("div",{className:"demo-results",children:[e.jsx("h3",{children:"Training Results"}),e.jsx("pre",{children:JSON.stringify(h,null,2)})]})]})};function m(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Convolutional Neural Networks (CNN)"}),`
`,e.jsx(n.p,{children:"A Convolutional Neural Network (CNN) is a deep learning algorithm that is particularly effective for image recognition and computer vision tasks. CNNs are designed to automatically learn spatial hierarchies of features through backpropagation."}),`
`,e.jsx(n.h2,{children:"How CNNs Work"}),`
`,e.jsx(n.p,{children:"CNNs use a mathematical operation called convolution, which involves applying a filter (kernel) to an input image to extract features. The key components of a CNN include:"}),`
`,e.jsx(n.h3,{children:"1. Convolutional Layers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Apply filters to detect features like edges, textures, and shapes"}),`
`,e.jsx(n.li,{children:"Each filter learns to detect different patterns"}),`
`,e.jsx(n.li,{children:"Creates feature maps that highlight where specific features are found"}),`
`]}),`
`,e.jsx(n.h3,{children:"2. Pooling Layers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Reduce the spatial dimensions of feature maps"}),`
`,e.jsx(n.li,{children:"Common types: Max pooling and Average pooling"}),`
`,e.jsx(n.li,{children:"Helps reduce computational complexity and prevent overfitting"}),`
`]}),`
`,e.jsx(n.h3,{children:"3. Fully Connected Layers"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Connect every neuron in one layer to every neuron in another layer"}),`
`,e.jsx(n.li,{children:"Used for final classification decisions"}),`
`,e.jsx(n.li,{children:"Similar to traditional neural networks"}),`
`]}),`
`,e.jsx(n.h2,{children:"Architecture"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Input Image → Convolutional Layer → Pooling Layer → Convolutional Layer → Pooling Layer → Fully Connected Layers → Output
`})}),`
`,e.jsx(n.h2,{children:"Key Advantages"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Translation Invariance"}),": Can recognize objects regardless of their position in the image"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Parameter Sharing"}),": Reduces the number of parameters compared to fully connected networks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hierarchical Feature Learning"}),": Automatically learns low-level to high-level features"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Applications"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Image classification"}),`
`,e.jsx(n.li,{children:"Object detection"}),`
`,e.jsx(n.li,{children:"Face recognition"}),`
`,e.jsx(n.li,{children:"Medical image analysis"}),`
`,e.jsx(n.li,{children:"Autonomous vehicles"}),`
`]}),`
`,e.jsx(n.h2,{children:"Interactive Demo"}),`
`,e.jsx(n.p,{children:"Try training a CNN model with different parameters:"}),`
`,e.jsx(k,{}),`
`,e.jsx(n.h2,{children:"Implementation Example"}),`
`,e.jsx(n.p,{children:"Here's a simple CNN implementation using Python and TensorFlow:"}),`
`,e.jsx(n.pre,{children:e.jsxs(n.code,{className:"hljs language-python",children:[e.jsx(n.span,{className:"hljs-keyword",children:"import"})," tensorflow ",e.jsx(n.span,{className:"hljs-keyword",children:"as"}),` tf\r
`,e.jsx(n.span,{className:"hljs-keyword",children:"from"})," tensorflow.keras ",e.jsx(n.span,{className:"hljs-keyword",children:"import"}),` layers, models\r
\r
`,e.jsx(n.span,{className:"hljs-comment",children:"# Create a CNN model"}),`\r
model = models.Sequential([\r
    layers.Conv2D(`,e.jsx(n.span,{className:"hljs-number",children:"32"}),", (",e.jsx(n.span,{className:"hljs-number",children:"3"}),", ",e.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",e.jsx(n.span,{className:"hljs-string",children:"'relu'"}),", input_shape=(",e.jsx(n.span,{className:"hljs-number",children:"28"}),", ",e.jsx(n.span,{className:"hljs-number",children:"28"}),", ",e.jsx(n.span,{className:"hljs-number",children:"1"}),`)),\r
    layers.MaxPooling2D((`,e.jsx(n.span,{className:"hljs-number",children:"2"}),", ",e.jsx(n.span,{className:"hljs-number",children:"2"}),`)),\r
    layers.Conv2D(`,e.jsx(n.span,{className:"hljs-number",children:"64"}),", (",e.jsx(n.span,{className:"hljs-number",children:"3"}),", ",e.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",e.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.MaxPooling2D((`,e.jsx(n.span,{className:"hljs-number",children:"2"}),", ",e.jsx(n.span,{className:"hljs-number",children:"2"}),`)),\r
    layers.Conv2D(`,e.jsx(n.span,{className:"hljs-number",children:"64"}),", (",e.jsx(n.span,{className:"hljs-number",children:"3"}),", ",e.jsx(n.span,{className:"hljs-number",children:"3"}),"), activation=",e.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Flatten(),\r
    layers.Dense(`,e.jsx(n.span,{className:"hljs-number",children:"64"}),", activation=",e.jsx(n.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,e.jsx(n.span,{className:"hljs-number",children:"10"}),", activation=",e.jsx(n.span,{className:"hljs-string",children:"'softmax'"}),`)\r
])\r
\r
`,e.jsx(n.span,{className:"hljs-comment",children:"# Compile the model"}),`\r
model.`,e.jsx(n.span,{className:"hljs-built_in",children:"compile"}),"(optimizer=",e.jsx(n.span,{className:"hljs-string",children:"'adam'"}),`,\r
              loss=`,e.jsx(n.span,{className:"hljs-string",children:"'sparse_categorical_crossentropy'"}),`,\r
              metrics=[`,e.jsx(n.span,{className:"hljs-string",children:"'accuracy'"}),`])\r
\r
`,e.jsx(n.span,{className:"hljs-comment",children:"# Train the model"}),`\r
model.fit(train_images, train_labels, epochs=`,e.jsx(n.span,{className:"hljs-number",children:"10"}),", batch_size=",e.jsx(n.span,{className:"hljs-number",children:"32"}),`)
`]})}),`
`,e.jsx(n.h2,{children:"Hyperparameters"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Epochs"}),": Number of complete passes through the training dataset"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Batch Size"}),": Number of samples processed before the model is updated"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Learning Rate"}),": Controls how much the model weights are updated during training"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Number of Filters"}),": Determines the capacity of the network to learn features"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Filter Size"}),": Size of the convolutional kernel (e.g., 3x3, 5x5)"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Best Practices"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Augmentation"}),": Increase dataset size by applying transformations"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Regularization"}),": Use dropout and batch normalization to prevent overfitting"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Transfer Learning"}),": Use pre-trained models for better performance"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Learning Rate Scheduling"}),": Adjust learning rate during training"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Early Stopping"}),": Stop training when validation performance stops improving"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Challenges"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Computational Requirements"}),": CNNs require significant computational resources"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Overfitting"}),": Risk of memorizing training data instead of learning general patterns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hyperparameter Tuning"}),": Finding optimal parameters can be time-consuming"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Data Requirements"}),": Large amounts of labeled data are often needed"]}),`
`]}),`
`,e.jsx(n.h2,{children:"Future Developments"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Attention Mechanisms"}),": Focus on relevant parts of the input"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Efficient Architectures"}),": MobileNets, EfficientNets for mobile deployment"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"3D CNNs"}),": Extending CNNs to video and volumetric data"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Capsule Networks"}),": Alternative architecture that preserves spatial relationships"]}),`
`]})]})}function L(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(m,{...r})}):m(r)}export{k as CNNDemo,L as default};
