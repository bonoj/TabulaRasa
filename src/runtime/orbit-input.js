export function installOrbitInput({element,activeCamera,orbit,onChange}) {
  const pointers=new Map();let pinchDistance=null;const notify=()=>onChange?.();
  function orbitBy(dx,dy){const id=activeCamera();if(id!=null&&orbit.adjust(id,{azimuth:-dx*.006,polar:-dy*.006}))notify();}
  function zoomBy(delta){const id=activeCamera();if(id!=null&&orbit.adjust(id,{distance:delta}))notify();}
  element.addEventListener("pointerdown",e=>{pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});element.setPointerCapture?.(e.pointerId);});
  element.addEventListener("pointermove",e=>{const prev=pointers.get(e.pointerId);if(!prev)return;const next={x:e.clientX,y:e.clientY};pointers.set(e.pointerId,next);if(pointers.size===1){orbitBy(next.x-prev.x,next.y-prev.y);return;}if(pointers.size===2){const[a,b]=[...pointers.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance!=null){const id=activeCamera(),state=id==null?null:orbit.inspect(id);if(state&&d>0&&pinchDistance>0){const nd=state.distance*(pinchDistance/d);zoomBy(nd-state.distance);}}pinchDistance=d;}});
  function release(e){pointers.delete(e.pointerId);if(pointers.size<2)pinchDistance=null;} element.addEventListener("pointerup",release);element.addEventListener("pointercancel",release);
  element.addEventListener("wheel",e=>{e.preventDefault();const id=activeCamera(),state=id==null?null:orbit.inspect(id);if(state)zoomBy(state.distance*(Math.exp(e.deltaY*.001)-1));},{passive:false});
}