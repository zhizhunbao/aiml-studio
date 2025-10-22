import{j as s,u,a as g,b,r as t,E as N,f}from"./index-Ct1b2fJq.js";import{a as y}from"./index-ngrFHoWO.js";const S=()=>{const{t:i}=u(),e=g(),{captureException:j}=b(),[r,m]=t.useState(.5),[l,x]=t.useState(5),[a,c]=t.useState(!1),[o,h]=t.useState(null),p=async()=>{c(!0),e.info("Started DBSCAN clustering",{eps:r,minSamples:l});try{const n=await y.post("/api/algorithms/unsupervised/dbscan/cluster",{eps:r,min_samples:l});h(n.data),e.info("DBSCAN clustering completed successfully",{result:n.data})}catch(n){e.error("DBSCAN clustering failed",{error:n.message,eps:r,minSamples:l}),j(n,{type:f.NETWORK,severity:N.HIGH,context:{algorithm:"dbscan",eps:r,minSamples:l,message:"Clustering failed. Please check if backend service is running"}}),h({error:"Clustering failed. Please check the console for details."})}finally{c(!1)}};return s.jsxs("div",{className:"demo-container",children:[s.jsxs("div",{className:"demo-parameters",children:[s.jsx("h3",{children:"Clustering Parameters"}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"eps",children:"EPS (Maximum Distance):"}),s.jsx("input",{id:"eps",type:"number",value:r,onChange:n=>m(parseFloat(n.target.value)),min:"0.1",max:"2.0",step:"0.1"})]}),s.jsxs("div",{className:"parameter-group",children:[s.jsx("label",{htmlFor:"minSamples",children:"Minimum Samples:"}),s.jsx("input",{id:"minSamples",type:"number",value:l,onChange:n=>x(parseInt(n.target.value)),min:"1",max:"20"})]}),s.jsx("button",{onClick:p,disabled:a,children:a?"Clustering...":"Start Clustering"})]}),o&&s.jsxs("div",{className:"demo-results",children:[s.jsx("h3",{children:"Clustering Results"}),s.jsx("pre",{children:JSON.stringify(o,null,2)})]})]})};function d(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{children:"DBSCAN (Density-Based Spatial Clustering of Applications with Noise)"}),`
`,s.jsx(e.p,{children:"DBSCAN is a density-based clustering algorithm that groups together points that are closely packed together, marking as outliers points that lie alone in low-density regions."}),`
`,s.jsx(e.h2,{children:"How DBSCAN Works"}),`
`,s.jsx(e.p,{children:"DBSCAN works by finding dense regions in the data space. The algorithm requires two key parameters:"}),`
`,s.jsx(e.h3,{children:"1. Epsilon (eps)"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Maximum distance between two samples for one to be considered in the neighborhood of the other"}),`
`,s.jsx(e.li,{children:"Defines the radius of the neighborhood around a data point"}),`
`,s.jsx(e.li,{children:"Critical parameter that determines cluster density"}),`
`]}),`
`,s.jsx(e.h3,{children:"2. Minimum Samples (min_samples)"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Minimum number of samples in a neighborhood for a data point to be considered a core point"}),`
`,s.jsx(e.li,{children:"Determines the minimum density required for a cluster"}),`
`]}),`
`,s.jsx(e.h2,{children:"Algorithm Steps"}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Initialize"}),": Mark all points as unvisited"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Select Point"}),": Choose an unvisited point randomly"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Find Neighbors"}),": Find all points within eps distance"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Core Point Check"}),": If neighbors ≥ min_samples, mark as core point"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Expand Cluster"}),": Add all reachable points to the cluster"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Mark Visited"}),": Mark all points in the cluster as visited"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Repeat"}),": Continue until all points are visited"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Types of Points"}),`
`,s.jsx(e.h3,{children:"Core Points"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Points that have at least min_samples neighbors within eps distance"}),`
`,s.jsx(e.li,{children:"Form the backbone of clusters"}),`
`]}),`
`,s.jsx(e.h3,{children:"Border Points"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Points that have fewer than min_samples neighbors but are within eps distance of a core point"}),`
`,s.jsx(e.li,{children:"Belong to clusters but are not core points"}),`
`]}),`
`,s.jsx(e.h3,{children:"Noise Points"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Points that are neither core points nor border points"}),`
`,s.jsx(e.li,{children:"Considered outliers or noise"}),`
`]}),`
`,s.jsx(e.h2,{children:"Interactive Demo"}),`
`,s.jsx(e.p,{children:"Try DBSCAN clustering with different parameters:"}),`
`,s.jsx(S,{}),`
`,s.jsx(e.h2,{children:"Implementation Example"}),`
`,s.jsx(e.p,{children:"Here's a DBSCAN implementation using Python and scikit-learn:"}),`
`,s.jsx(e.pre,{children:s.jsxs(e.code,{className:"hljs language-python",children:[s.jsx(e.span,{className:"hljs-keyword",children:"from"})," sklearn.cluster ",s.jsx(e.span,{className:"hljs-keyword",children:"import"}),` DBSCAN\r
`,s.jsx(e.span,{className:"hljs-keyword",children:"from"})," sklearn.datasets ",s.jsx(e.span,{className:"hljs-keyword",children:"import"}),` make_blobs\r
`,s.jsx(e.span,{className:"hljs-keyword",children:"import"})," numpy ",s.jsx(e.span,{className:"hljs-keyword",children:"as"}),` np\r
\r
`,s.jsx(e.span,{className:"hljs-comment",children:"# Generate sample data"}),`\r
X, _ = make_blobs(n_samples=`,s.jsx(e.span,{className:"hljs-number",children:"300"}),", centers=",s.jsx(e.span,{className:"hljs-number",children:"4"}),", cluster_std=",s.jsx(e.span,{className:"hljs-number",children:"0.60"}),", random_state=",s.jsx(e.span,{className:"hljs-number",children:"0"}),`)\r
\r
`,s.jsx(e.span,{className:"hljs-comment",children:"# Apply DBSCAN clustering"}),`\r
dbscan = DBSCAN(eps=`,s.jsx(e.span,{className:"hljs-number",children:"0.5"}),", min_samples=",s.jsx(e.span,{className:"hljs-number",children:"5"}),`)\r
cluster_labels = dbscan.fit_predict(X)\r
\r
`,s.jsx(e.span,{className:"hljs-comment",children:"# Get cluster information"}),`\r
n_clusters = `,s.jsx(e.span,{className:"hljs-built_in",children:"len"}),"(",s.jsx(e.span,{className:"hljs-built_in",children:"set"}),"(cluster_labels)) - (",s.jsx(e.span,{className:"hljs-number",children:"1"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"if"})," -",s.jsx(e.span,{className:"hljs-number",children:"1"})," ",s.jsx(e.span,{className:"hljs-keyword",children:"in"})," cluster_labels ",s.jsx(e.span,{className:"hljs-keyword",children:"else"})," ",s.jsx(e.span,{className:"hljs-number",children:"0"}),`)\r
n_noise = `,s.jsx(e.span,{className:"hljs-built_in",children:"list"}),"(cluster_labels).count(-",s.jsx(e.span,{className:"hljs-number",children:"1"}),`)\r
\r
`,s.jsx(e.span,{className:"hljs-built_in",children:"print"}),"(",s.jsxs(e.span,{className:"hljs-string",children:["f'Number of clusters: ",s.jsx(e.span,{className:"hljs-subst",children:"{n_clusters}"}),"'"]}),`)\r
`,s.jsx(e.span,{className:"hljs-built_in",children:"print"}),"(",s.jsxs(e.span,{className:"hljs-string",children:["f'Number of noise points: ",s.jsx(e.span,{className:"hljs-subst",children:"{n_noise}"}),"'"]}),`)
`]})}),`
`,s.jsx(e.h2,{children:"Advantages"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"No Need to Specify Number of Clusters"}),": Automatically determines the number of clusters"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Handles Noise"}),": Identifies outliers as noise points"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Arbitrary Cluster Shapes"}),": Can find clusters of any shape, not just spherical"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Robust"}),": Works well with datasets containing noise and outliers"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Limitations"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Parameter Sensitivity"}),": Performance heavily depends on eps and min_samples parameters"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Density Variation"}),": Struggles with clusters of varying densities"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"High-Dimensional Data"}),": Performance degrades in high-dimensional spaces"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Memory Usage"}),": Can be memory-intensive for large datasets"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Parameter Selection"}),`
`,s.jsx(e.h3,{children:"Choosing EPS"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"K-Distance Graph"}),": Plot k-distance (distance to kth nearest neighbor)"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Elbow Method"}),': Look for the "elbow" in the k-distance graph']}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Domain Knowledge"}),": Use domain expertise to set appropriate values"]}),`
`]}),`
`,s.jsx(e.h3,{children:"Choosing Min_samples"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Rule of Thumb"}),": Start with min_samples = 2 * dimensionality"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Data Size"}),": Larger datasets may need higher min_samples"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Noise Level"}),": Higher noise levels require higher min_samples"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Applications"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Image Segmentation"}),": Group similar pixels in images"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Anomaly Detection"}),": Identify unusual patterns in data"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Market Segmentation"}),": Group customers based on behavior"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Geographic Data"}),": Cluster locations based on proximity"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Bioinformatics"}),": Group genes or proteins with similar functions"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Comparison with Other Algorithms"}),`
`,s.jsx(e.h3,{children:"vs K-Means"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Shape"}),": DBSCAN finds arbitrary shapes, K-Means finds spherical clusters"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Noise"}),": DBSCAN handles noise, K-Means doesn't"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Parameters"}),": DBSCAN needs eps/min_samples, K-Means needs k"]}),`
`]}),`
`,s.jsx(e.h3,{children:"vs Hierarchical Clustering"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Speed"}),": DBSCAN is generally faster"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Memory"}),": DBSCAN uses less memory"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Scalability"}),": DBSCAN scales better to large datasets"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Best Practices"}),`
`,s.jsxs(e.ol,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Data Preprocessing"}),": Normalize features for consistent distance measurements"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Parameter Tuning"}),": Use cross-validation or grid search for parameter selection"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Visualization"}),": Plot results to validate cluster quality"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Feature Engineering"}),": Select relevant features for clustering"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Validation"}),": Use silhouette analysis or other metrics to evaluate clustering quality"]}),`
`]}),`
`,s.jsx(e.h2,{children:"Advanced Techniques"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"HDBSCAN"}),": Hierarchical version that handles varying densities"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"OPTICS"}),": Ordering points to identify clustering structure"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"DenStream"}),": Streaming version for online clustering"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.strong,{children:"Incremental DBSCAN"}),": Updates clusters as new data arrives"]}),`
`]})]})}function D(i={}){const{wrapper:e}=i.components||{};return e?s.jsx(e,{...i,children:s.jsx(d,{...i})}):d(i)}export{S as DBSCANDemo,D as default};
