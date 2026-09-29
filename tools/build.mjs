import {mkdir,readFile,writeFile} from "node:fs/promises";
import {resolve} from "node:path";
import {build} from "esbuild";

const root=resolve(import.meta.dirname,".."),dist=resolve(root,"dist");
await mkdir(dist,{recursive:true});
const commit=process.env.GITHUB_SHA||"local";

const js=await build({entryPoints:[resolve(root,"src/main.js")],bundle:true,write:false,format:"iife",platform:"browser",target:"es2022",minify:false});
let shell=await readFile(resolve(root,"src/shell.html"),"utf8");
const css=await readFile(resolve(root,"src/styles.css"),"utf8");
shell=shell.replace("{{BUILD_COMMIT}}",commit)
  .replace("<!-- CRUCIBLE:STYLE -->",`<style>${css}</style>`)
  .replace("<!-- CRUCIBLE:SCRIPT -->",`<script>${js.outputFiles[0].text}</script>`);
await writeFile(resolve(dist,"index.html"),shell,"utf8");
console.log(`Built ECS Crucible dist/index.html (${Buffer.byteLength(shell)} bytes) at ${commit}`);
