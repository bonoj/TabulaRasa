export function createWorld(){
  let next=1; const alive=new Set(),stores=new Map();
  const component=name=>{if(!stores.has(name))stores.set(name,new Map());return stores.get(name)};
  const entity=()=>{const id=next++;alive.add(id);return id};
  const add=(id,store,value=true)=>{if(!alive.has(id))throw new Error(`dead entity ${id}`);store.set(id,value);return value};
  const remove=(id,store)=>store.delete(id);
  const query=(...parts)=>{if(!parts.length)return [...alive];const smallest=parts.reduce((a,b)=>a.size<=b.size?a:b);return [...smallest.keys()].filter(id=>alive.has(id)&&parts.every(p=>p.has(id)))};
  const destroy=id=>{alive.delete(id);for(const store of stores.values())store.delete(id)};
  return {component,entity,add,remove,query,destroy,alive,stores};
}
