import{j as n,u as v,a as N,b as L,r,E as b,f as w}from"./index-Ct1b2fJq.js";import{a as P}from"./index-ngrFHoWO.js";const C=()=>{const{t:i}=v(),e=N(),{captureException:p}=L(),[a,u]=r.useState(2),[l,m]=r.useState(128),[t,g]=r.useState(.001),[c,f]=r.useState(100),[o,d]=r.useState(!1),[h,x]=r.useState(null),y=async()=>{d(!0),e.info("Started training MLP model",{hiddenLayers:a,neuronsPerLayer:l,learningRate:t,epochs:c});try{const s=await P.post("/api/algorithms/neural-networks/mlp/train",{hidden_layers:a,neurons_per_layer:l,learning_rate:t,epochs:c});x(s.data),e.info("MLP training completed successfully",{result:s.data})}catch(s){e.error("MLP training failed",{error:s.message,hiddenLayers:a,neuronsPerLayer:l,learningRate:t,epochs:c}),p(s,{type:w.NETWORK,severity:b.HIGH,context:{algorithm:"mlp",hiddenLayers:a,neuronsPerLayer:l,learningRate:t,epochs:c,message:"Training failed. Please check if backend service is running"}}),x({error:"Training failed. Please check the console for details."})}finally{d(!1)}};return n.jsxs("div",{className:"demo-container",children:[n.jsxs("div",{className:"demo-parameters",children:[n.jsx("h3",{children:"Training Parameters"}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"hiddenLayers",children:"Hidden Layers:"}),n.jsx("input",{id:"hiddenLayers",type:"number",value:a,onChange:s=>u(parseInt(s.target.value)),min:"1",max:"10"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"neuronsPerLayer",children:"Neurons per Layer:"}),n.jsx("input",{id:"neuronsPerLayer",type:"number",value:l,onChange:s=>m(parseInt(s.target.value)),min:"1",max:"1024"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"learningRate",children:"Learning Rate:"}),n.jsx("input",{id:"learningRate",type:"number",value:t,onChange:s=>g(parseFloat(s.target.value)),min:"0.0001",max:"1",step:"0.001"})]}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"epochs",children:"Epochs:"}),n.jsx("input",{id:"epochs",type:"number",value:c,onChange:s=>f(parseInt(s.target.value)),min:"1",max:"1000"})]}),n.jsx("button",{onClick:y,disabled:o,children:o?"Training...":"Start Training"})]}),h&&n.jsxs("div",{className:"demo-results",children:[n.jsx("h3",{children:"Training Results"}),n.jsx("pre",{children:JSON.stringify(h,null,2)})]})]})};function j(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Multi-Layer Perceptron (MLP)"}),`
`,n.jsx(e.p,{children:"A Multi-Layer Perceptron (MLP) is a class of feedforward artificial neural network (ANN). It consists of at least three layers of nodes: an input layer, a hidden layer, and an output layer. Each node is a neuron that uses a nonlinear activation function."}),`
`,n.jsx(e.h2,{children:"How MLPs Work"}),`
`,n.jsx(e.p,{children:"MLPs are fully connected networks where each neuron in one layer connects to every neuron in the next layer. The key components include:"}),`
`,n.jsx(e.h3,{children:"1. Input Layer"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Receives the input data"}),`
`,n.jsx(e.li,{children:"Each input feature corresponds to one neuron"}),`
`,n.jsx(e.li,{children:"No computation is performed in this layer"}),`
`]}),`
`,n.jsx(e.h3,{children:"2. Hidden Layers"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Perform the actual computation"}),`
`,n.jsx(e.li,{children:"Apply weights, biases, and activation functions"}),`
`,n.jsx(e.li,{children:"Can have multiple hidden layers (deep learning)"}),`
`]}),`
`,n.jsx(e.h3,{children:"3. Output Layer"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Produces the final prediction or classification"}),`
`,n.jsx(e.li,{children:"Number of neurons depends on the task"}),`
`,n.jsx(e.li,{children:"Uses appropriate activation function (e.g., softmax for classification)"}),`
`]}),`
`,n.jsx(e.h2,{children:"Architecture"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`Input Layer → Hidden Layer 1 → Hidden Layer 2 → ... → Output Layer
`})}),`
`,n.jsx(e.h2,{children:"Mathematical Foundation"}),`
`,n.jsx(e.p,{children:"For a single neuron, the output is calculated as:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`y = f(∑(wi * xi) + b)
`})}),`
`,n.jsx(e.p,{children:"Where:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"wi"})," are the weights"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"xi"})," are the input values"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"b"})," is the bias"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"f"})," is the activation function"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Activation Functions"}),`
`,n.jsx(e.h3,{children:"Common Activation Functions:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"ReLU (Rectified Linear Unit)"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`f(x) = max(0, x)
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Sigmoid"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`f(x) = 1 / (1 + e^(-x))
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Tanh"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`f(x) = tanh(x)
`})}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Softmax"})," (for output layer in classification)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`f(xi) = e^(xi) / ∑(e^(xj))
`})}),`
`]}),`
`]}),`
`,n.jsx(e.h2,{children:"Training Process"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Forward Propagation"}),": Data flows from input to output"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Loss Calculation"}),": Compare prediction with actual target"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Backpropagation"}),": Calculate gradients of loss with respect to weights"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Weight Update"}),": Adjust weights using optimization algorithm (e.g., SGD, Adam)"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Applications"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Classification"}),": Image classification, spam detection, sentiment analysis"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Regression"}),": Price prediction, stock market analysis, weather forecasting"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Pattern Recognition"}),": Handwriting recognition, speech recognition"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Function Approximation"}),": Universal function approximators"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Interactive Demo"}),`
`,n.jsx(e.p,{children:"Try training an MLP model with different parameters:"}),`
`,n.jsx(C,{}),`
`,n.jsx(e.h2,{children:"Implementation Example"}),`
`,n.jsx(e.p,{children:"Here's a simple MLP implementation using Python and TensorFlow:"}),`
`,n.jsx(e.pre,{children:n.jsxs(e.code,{className:"hljs language-python",children:[n.jsx(e.span,{className:"hljs-keyword",children:"import"})," tensorflow ",n.jsx(e.span,{className:"hljs-keyword",children:"as"}),` tf\r
`,n.jsx(e.span,{className:"hljs-keyword",children:"from"})," tensorflow.keras ",n.jsx(e.span,{className:"hljs-keyword",children:"import"}),` layers, models\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Create an MLP model"}),`\r
model = models.Sequential([\r
    layers.Dense(`,n.jsx(e.span,{className:"hljs-number",children:"128"}),", activation=",n.jsx(e.span,{className:"hljs-string",children:"'relu'"}),", input_shape=(",n.jsx(e.span,{className:"hljs-number",children:"784"}),`,)),\r
    layers.Dense(`,n.jsx(e.span,{className:"hljs-number",children:"64"}),", activation=",n.jsx(e.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,n.jsx(e.span,{className:"hljs-number",children:"32"}),", activation=",n.jsx(e.span,{className:"hljs-string",children:"'relu'"}),`),\r
    layers.Dense(`,n.jsx(e.span,{className:"hljs-number",children:"10"}),", activation=",n.jsx(e.span,{className:"hljs-string",children:"'softmax'"}),`)\r
])\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Compile the model"}),`\r
model.`,n.jsx(e.span,{className:"hljs-built_in",children:"compile"}),"(optimizer=",n.jsx(e.span,{className:"hljs-string",children:"'adam'"}),`,\r
              loss=`,n.jsx(e.span,{className:"hljs-string",children:"'sparse_categorical_crossentropy'"}),`,\r
              metrics=[`,n.jsx(e.span,{className:"hljs-string",children:"'accuracy'"}),`])\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Train the model"}),`\r
model.fit(train_images, train_labels, epochs=`,n.jsx(e.span,{className:"hljs-number",children:"100"}),", batch_size=",n.jsx(e.span,{className:"hljs-number",children:"32"}),`)
`]})}),`
`,n.jsx(e.h2,{children:"Hyperparameters"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Hidden Layers"}),": Number of layers between input and output"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Neurons per Layer"}),": Number of neurons in each hidden layer"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Learning Rate"}),": Controls the step size during optimization"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Epochs"}),": Number of complete passes through the training dataset"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Batch Size"}),": Number of samples processed before model update"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Activation Function"}),": Non-linear function applied to neuron outputs"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Advantages"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Universal Approximation"}),": Can approximate any continuous function"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Flexibility"}),": Can handle various types of data"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Non-linear Mapping"}),": Can learn complex patterns"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Scalability"}),": Can be scaled to large datasets"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Limitations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Overfitting"}),": Risk of memorizing training data"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Local Minima"}),": May get stuck in local optima during training"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Computational Cost"}),": Can be expensive for large networks"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Black Box"}),": Difficult to interpret learned representations"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Best Practices"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Data Preprocessing"}),": Normalize or standardize input features"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Regularization"}),": Use dropout, L1/L2 regularization to prevent overfitting"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Batch Normalization"}),": Stabilize training and improve convergence"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Learning Rate Scheduling"}),": Adjust learning rate during training"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Early Stopping"}),": Stop training when validation performance stops improving"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Advanced Techniques"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Dropout"}),": Randomly set neurons to zero during training"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Batch Normalization"}),": Normalize inputs to each layer"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Weight Initialization"}),": Use proper initialization schemes (Xavier, He)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Optimization"}),": Use advanced optimizers (Adam, RMSprop)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Ensemble Methods"}),": Combine multiple MLPs for better performance"]}),`
`]})]})}function S(i={}){const{wrapper:e}=i.components||{};return e?n.jsx(e,{...i,children:n.jsx(j,{...i})}):j(i)}export{C as MLPDemo,S as default};
