const TAU=Math.PI*2,EPSILON=.03; const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export function createOrbitSystem({world,components,THREE}) {
  const {Transform,CameraTarget,OrbitBehavior}=components;
  function apply(id){const o=OrbitBehavior.get(id),t=Transform.get(id),rel=CameraTarget.get(id);if(!o||!t||rel?.entity==null)return false;const target=Transform.get(rel.entity);if(!target?.position)return false;o.azimuth=((o.azimuth%TAU)+TAU)%TAU;o.polar=clamp(o.polar,o.minPolar??EPSILON,o.maxPolar??Math.PI-EPSILON);o.distance=clamp(o.distance,o.minDistance??1,o.maxDistance??20);const s=Math.sin(o.polar),off=new THREE.Vector3(o.distance*s*Math.sin(o.azimuth),o.distance*Math.cos(o.polar),o.distance*s*Math.cos(o.azimuth));t.position.copy(target.position).add(off);if(o.minWorldY!=null&&t.position.y<o.minWorldY)t.position.y=o.minWorldY;return true;}
  function applyAll(){for(const id of world.query(OrbitBehavior,Transform,CameraTarget))apply(id);}
  function adjust(id,{azimuth=0,polar=0,distance=0}={}){const o=OrbitBehavior.get(id);if(!o)return false;o.azimuth+=azimuth;o.polar+=polar;o.distance+=distance;return true;}
  function inspect(id){const o=OrbitBehavior.get(id);return o?{azimuthDegrees:Number((o.azimuth*180/Math.PI).toFixed(1)),polarDegrees:Number((o.polar*180/Math.PI).toFixed(1)),distance:Number(o.distance.toFixed(2)),limits:{distance:[o.minDistance,o.maxDistance],minWorldY:o.minWorldY??null,polarDegrees:[Number((o.minPolar*180/Math.PI).toFixed(1)),Number((o.maxPolar*180/Math.PI).toFixed(1))]}}:null;}
  return {apply,applyAll,adjust,inspect};
}