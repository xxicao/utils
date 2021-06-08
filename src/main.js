const all = require.context('./modules/', true, /\.js$/)
let tools = {};
all.keys().forEach((key) => {
 const otherModule = all[key];
 tools= {...tools, ... (otherModule.default || otherModule)}
})

export default tools
