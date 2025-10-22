import{j as n,u as j,a as x,b as u,r as a,E as g,f}from"./index-Ct1b2fJq.js";import{a as v}from"./index-ngrFHoWO.js";const C=()=>{const{t:s}=j(),e=x(),{captureException:h}=u(),[i,p]=a.useState(2),[l,t]=a.useState(!1),[o,c]=a.useState(null),m=async()=>{t(!0),e.info("Started PCA transformation",{nComponents:i});try{const r=await v.post("/api/algorithms/unsupervised/pca/transform",{n_components:i});c(r.data),e.info("PCA transformation completed successfully",{result:r.data})}catch(r){e.error("PCA transformation failed",{error:r.message,nComponents:i}),h(r,{type:f.NETWORK,severity:g.HIGH,context:{algorithm:"pca",nComponents:i,message:"PCA transformation failed. Please check if backend service is running"}}),c({error:"PCA transformation failed. Please check the console for details."})}finally{t(!1)}};return n.jsxs("div",{className:"demo-container",children:[n.jsxs("div",{className:"demo-parameters",children:[n.jsx("h3",{children:"PCA Parameters"}),n.jsxs("div",{className:"parameter-group",children:[n.jsx("label",{htmlFor:"nComponents",children:"Number of Components:"}),n.jsx("input",{id:"nComponents",type:"number",value:i,onChange:r=>p(parseInt(r.target.value)),min:"1",max:"10"})]}),n.jsx("button",{onClick:m,disabled:l,children:l?"Transforming...":"Apply PCA"})]}),o&&n.jsxs("div",{className:"demo-results",children:[n.jsx("h3",{children:"PCA Results"}),n.jsx("pre",{children:JSON.stringify(o,null,2)})]})]})};function d(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Principal Component Analysis (PCA)"}),`
`,n.jsx(e.p,{children:"Principal Component Analysis (PCA) is a dimensionality reduction technique that transforms data into a lower-dimensional space while preserving as much variance as possible. It's widely used for data visualization, noise reduction, and feature extraction."}),`
`,n.jsx(e.h2,{children:"How PCA Works"}),`
`,n.jsx(e.p,{children:"PCA works by finding the directions (principal components) in which the data varies the most. The algorithm follows these steps:"}),`
`,n.jsx(e.h3,{children:"1. Data Centering"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Subtract the mean from each data point"}),`
`,n.jsx(e.li,{children:"Ensures the data is centered around the origin"}),`
`]}),`
`,n.jsx(e.h3,{children:"2. Covariance Matrix Calculation"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Compute the covariance matrix of the centered data"}),`
`,n.jsx(e.li,{children:"Shows how features vary together"}),`
`]}),`
`,n.jsx(e.h3,{children:"3. Eigenvalue Decomposition"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Find eigenvalues and eigenvectors of the covariance matrix"}),`
`,n.jsx(e.li,{children:"Eigenvalues represent the amount of variance explained by each component"}),`
`,n.jsx(e.li,{children:"Eigenvectors represent the directions of maximum variance"}),`
`]}),`
`,n.jsx(e.h3,{children:"4. Component Selection"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Select the top k eigenvectors (principal components)"}),`
`,n.jsx(e.li,{children:"Transform the data to the new coordinate system"}),`
`]}),`
`,n.jsx(e.h2,{children:"Mathematical Foundation"}),`
`,n.jsx(e.p,{children:"For a dataset X with n samples and p features:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Center the data"}),": X_centered = X - μ"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Compute covariance matrix"}),": C = (1/n) * X_centered^T * X_centered"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Find eigenvalues and eigenvectors"}),": C * v = λ * v"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Sort by eigenvalues"}),": λ₁ ≥ λ₂ ≥ ... ≥ λₚ"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Select top k components"}),": V_k = [v₁, v₂, ..., vₖ]"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Transform data"}),": Y = X_centered * V_k"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Interactive Demo"}),`
`,n.jsx(e.p,{children:"Try PCA transformation with different parameters:"}),`
`,n.jsx(C,{}),`
`,n.jsx(e.h2,{children:"Implementation Example"}),`
`,n.jsx(e.p,{children:"Here's a PCA implementation using Python and scikit-learn:"}),`
`,n.jsx(e.pre,{children:n.jsxs(e.code,{className:"hljs language-python",children:[n.jsx(e.span,{className:"hljs-keyword",children:"from"})," sklearn.decomposition ",n.jsx(e.span,{className:"hljs-keyword",children:"import"}),` PCA\r
`,n.jsx(e.span,{className:"hljs-keyword",children:"from"})," sklearn.datasets ",n.jsx(e.span,{className:"hljs-keyword",children:"import"}),` load_iris\r
`,n.jsx(e.span,{className:"hljs-keyword",children:"import"})," matplotlib.pyplot ",n.jsx(e.span,{className:"hljs-keyword",children:"as"}),` plt\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Load sample data"}),`\r
iris = load_iris()\r
X = iris.data\r
y = iris.target\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Apply PCA"}),`\r
pca = PCA(n_components=`,n.jsx(e.span,{className:"hljs-number",children:"2"}),`)\r
X_pca = pca.fit_transform(X)\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Visualize results"}),`\r
plt.scatter(X_pca[:, `,n.jsx(e.span,{className:"hljs-number",children:"0"}),"], X_pca[:, ",n.jsx(e.span,{className:"hljs-number",children:"1"}),"], c=y, cmap=",n.jsx(e.span,{className:"hljs-string",children:"'viridis'"}),`)\r
plt.xlabel(`,n.jsx(e.span,{className:"hljs-string",children:"'First Principal Component'"}),`)\r
plt.ylabel(`,n.jsx(e.span,{className:"hljs-string",children:"'Second Principal Component'"}),`)\r
plt.title(`,n.jsx(e.span,{className:"hljs-string",children:"'PCA of Iris Dataset'"}),`)\r
plt.show()\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# Explained variance ratio"}),`\r
`,n.jsx(e.span,{className:"hljs-built_in",children:"print"}),"(",n.jsxs(e.span,{className:"hljs-string",children:["f'Explained variance ratio: ",n.jsx(e.span,{className:"hljs-subst",children:"{pca.explained_variance_ratio_}"}),"'"]}),`)
`]})}),`
`,n.jsx(e.h2,{children:"Key Concepts"}),`
`,n.jsx(e.h3,{children:"Explained Variance"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Percentage of total variance explained by each component"}),`
`,n.jsx(e.li,{children:"Helps determine how many components to keep"}),`
`,n.jsx(e.li,{children:"Sum of all explained variance ratios equals 1.0"}),`
`]}),`
`,n.jsx(e.h3,{children:"Principal Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Orthogonal directions of maximum variance"}),`
`,n.jsx(e.li,{children:"First component captures the most variance"}),`
`,n.jsx(e.li,{children:"Subsequent components capture remaining variance"}),`
`]}),`
`,n.jsx(e.h3,{children:"Eigenvalues"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Measure of variance along each principal component"}),`
`,n.jsx(e.li,{children:"Larger eigenvalues indicate more important components"}),`
`]}),`
`,n.jsx(e.h2,{children:"Applications"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Data Visualization"}),": Reduce high-dimensional data to 2D or 3D for plotting"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Noise Reduction"}),": Remove components with low variance (often noise)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Feature Extraction"}),": Create new features that capture important patterns"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Data Compression"}),": Reduce storage requirements while preserving information"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Preprocessing"}),": Prepare data for other machine learning algorithms"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Advantages"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Linear Transformation"}),": Simple and interpretable"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Variance Preservation"}),": Maintains maximum variance in reduced dimensions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Orthogonal Components"}),": Principal components are uncorrelated"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Computationally Efficient"}),": Fast computation for most datasets"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"No Parameters"}),": No hyperparameters to tune (except number of components)"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Limitations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Linear Assumption"}),": Assumes linear relationships between features"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Variance-Based"}),": May not preserve important non-variance information"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Interpretability"}),": Principal components may not have clear meaning"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Sensitive to Scaling"}),": Requires feature standardization for meaningful results"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Information Loss"}),": Some information is always lost in dimensionality reduction"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Parameter Selection"}),`
`,n.jsx(e.h3,{children:"Number of Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Variance Threshold"}),": Keep components that explain 95% of variance"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Elbow Method"}),': Look for the "elbow" in explained variance plot']}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Cross-Validation"}),": Use downstream task performance to select components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Visualization"}),": Use 2-3 components for visualization purposes"]}),`
`]}),`
`,n.jsx(e.h3,{children:"Data Preprocessing"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Standardization"}),": Always standardize features before PCA"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Missing Values"}),": Handle missing values before applying PCA"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Outliers"}),": Consider removing outliers as they can affect principal components"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Best Practices"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Standardize Features"}),": Use StandardScaler before applying PCA"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Check Variance"}),": Plot explained variance ratio to understand data structure"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Validate Results"}),": Use cross-validation to ensure PCA improves performance"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Interpret Components"}),": Try to understand what each component represents"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Monitor Information Loss"}),": Track how much variance is lost"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Advanced Techniques"}),`
`,n.jsx(e.h3,{children:"Kernel PCA"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Non-linear version of PCA using kernel functions"}),`
`,n.jsx(e.li,{children:"Can capture non-linear relationships in data"}),`
`,n.jsx(e.li,{children:"More computationally expensive than linear PCA"}),`
`]}),`
`,n.jsx(e.h3,{children:"Incremental PCA"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Memory-efficient version for large datasets"}),`
`,n.jsx(e.li,{children:"Processes data in batches"}),`
`,n.jsx(e.li,{children:"Useful when data doesn't fit in memory"}),`
`]}),`
`,n.jsx(e.h3,{children:"Sparse PCA"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Produces sparse principal components"}),`
`,n.jsx(e.li,{children:"Easier to interpret than dense components"}),`
`,n.jsx(e.li,{children:"Good for feature selection"}),`
`]}),`
`,n.jsx(e.h2,{children:"Comparison with Other Methods"}),`
`,n.jsx(e.h3,{children:"vs Linear Discriminant Analysis (LDA)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Goal"}),": PCA maximizes variance, LDA maximizes class separation"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Supervision"}),": PCA is unsupervised, LDA is supervised"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Components"}),": PCA components are orthogonal, LDA components are not"]}),`
`]}),`
`,n.jsx(e.h3,{children:"vs t-SNE"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Purpose"}),": PCA for linear reduction, t-SNE for non-linear visualization"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Distance"}),": PCA preserves global structure, t-SNE preserves local structure"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Speed"}),": PCA is faster, t-SNE is slower"]}),`
`]}),`
`,n.jsx(e.h2,{children:"Visualization"}),`
`,n.jsx(e.p,{children:"PCA is commonly used for data visualization:"}),`
`,n.jsx(e.pre,{children:n.jsxs(e.code,{className:"hljs language-python",children:[n.jsx(e.span,{className:"hljs-keyword",children:"import"})," matplotlib.pyplot ",n.jsx(e.span,{className:"hljs-keyword",children:"as"}),` plt\r
`,n.jsx(e.span,{className:"hljs-keyword",children:"from"})," sklearn.decomposition ",n.jsx(e.span,{className:"hljs-keyword",children:"import"}),` PCA\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# 2D visualization"}),`\r
pca_2d = PCA(n_components=`,n.jsx(e.span,{className:"hljs-number",children:"2"}),`)\r
X_2d = pca_2d.fit_transform(X)\r
plt.scatter(X_2d[:, `,n.jsx(e.span,{className:"hljs-number",children:"0"}),"], X_2d[:, ",n.jsx(e.span,{className:"hljs-number",children:"1"}),`], c=y)\r
plt.show()\r
\r
`,n.jsx(e.span,{className:"hljs-comment",children:"# 3D visualization"}),`\r
pca_3d = PCA(n_components=`,n.jsx(e.span,{className:"hljs-number",children:"3"}),`)\r
X_3d = pca_3d.fit_transform(X)\r
fig = plt.figure()\r
ax = fig.add_subplot(`,n.jsx(e.span,{className:"hljs-number",children:"111"}),", projection=",n.jsx(e.span,{className:"hljs-string",children:"'3d'"}),`)\r
ax.scatter(X_3d[:, `,n.jsx(e.span,{className:"hljs-number",children:"0"}),"], X_3d[:, ",n.jsx(e.span,{className:"hljs-number",children:"1"}),"], X_3d[:, ",n.jsx(e.span,{className:"hljs-number",children:"2"}),`], c=y)\r
plt.show()
`]})})]})}function A(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(d,{...s})}):d(s)}export{C as PCADemo,A as default};
