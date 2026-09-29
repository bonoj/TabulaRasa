export function installDebugApi({world,components,terrain,three,systems,entities,water,inspect}) {
  const api={
    inspect,
    ecs:{
      entityCount:()=>world.alive.size,
      query:(...names)=>{
        const cs=names.map(name=>components[name]).filter(Boolean);
        return cs.length===names.length?world.query(...cs):[];
      },
      entity:id=>{
        if(!world.alive.has(id))return null;
        const out={id};
        for(const [name,c] of Object.entries(components))if(c.has(id))out[name]=c.get(id);
        return out;
      }
    },
    terrain:()=>terrain.inspect(),
    renderer:()=>({pixelRatio:three.renderer.getPixelRatio()}),
    systems,
    entities,
    water
  };
  globalThis.crucibleDebug=api;
  return api;
}
