export function createCameraSystem({ world, components, three }) {
  const { Transform, Camera, CameraTarget, Viewport, ActiveCamera, CameraView } = components;
  function ensureView(id) {
    const spec = Camera.get(id); let view = CameraView.get(id)?.camera;
    if (!view) {
      view = spec.projection === "orthographic" ? new three.THREE.OrthographicCamera(-1,1,1,-1,spec.near,spec.far) : new three.THREE.PerspectiveCamera(spec.fov,1,spec.near,spec.far);
      world.add(id, CameraView, { camera:view });
    }
    return view;
  }
  function syncProjection(id,camera,width,height) {
    const spec=Camera.get(id), aspect=Math.max(1,width)/Math.max(1,height);
    if(camera.isPerspectiveCamera){camera.fov=spec.fov;camera.near=spec.near;camera.far=spec.far;camera.aspect=aspect;}
    else {const hh=spec.height/2;camera.left=-hh*aspect;camera.right=hh*aspect;camera.top=hh;camera.bottom=-hh;camera.near=spec.near;camera.far=spec.far;}
    camera.updateProjectionMatrix();
  }
  function syncPose(id,camera) {
    const t=Transform.get(id); if(!t)return;
    if(t.position)camera.position.copy(t.position); if(t.quaternion)camera.quaternion.copy(t.quaternion); else if(t.rotation)camera.rotation.copy(t.rotation);
    const rel=CameraTarget.get(id); if(rel?.entity!=null){const target=Transform.get(rel.entity);if(target?.position)camera.lookAt(target.position);}
  }
  function syncAll(){const {width,height}=three.size();for(const id of world.query(Camera,Transform)){const c=ensureView(id);syncProjection(id,c,width,height);syncPose(id,c);}}
  function activeId(){return world.query(Camera,ActiveCamera)[0]??world.query(Camera)[0]??null;}
  function setActive(id){if(!Camera.has(id))throw new Error(`entity ${id} is not a camera`);for(const other of world.query(ActiveCamera))world.remove(other,ActiveCamera);world.add(id,ActiveCamera,true);}
  function render(){syncAll();const id=activeId();if(id==null)return;const view=CameraView.get(id)?.camera;if(view)three.render(view);}
  function inspect(){return world.query(Camera,Transform).map(id=>{const spec=Camera.get(id),t=Transform.get(id),rel=CameraTarget.get(id),viewport=Viewport.get(id),view=CameraView.get(id)?.camera;return{id,name:spec.name,projection:spec.projection,active:ActiveCamera.has(id),position:t.position?.toArray().map(n=>Number(n.toFixed(2)))??null,target:rel?.entity??null,viewport:viewport??null,realizedAs:view?.type??null};});}
  return {syncAll,render,setActive,activeId,inspect};
}