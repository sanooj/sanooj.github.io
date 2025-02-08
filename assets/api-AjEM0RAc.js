const e=async()=>await(await fetch("/data/stories.json")).json(),n=async t=>{const s=await e();return await(s==null?void 0:s.find(a=>a.userId===t))};export{n as a,e as f};
