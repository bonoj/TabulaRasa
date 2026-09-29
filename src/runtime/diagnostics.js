export function installDiagnostics(element){
  let ready=false;
  const show=(scope,error)=>{const message=error?.stack||error?.message||String(error);element.hidden=false;element.textContent=`CRUCIBLE — ${scope}\n${message}`};
  addEventListener("error",e=>show("runtime",e.error||e.message));
  addEventListener("unhandledrejection",e=>show("promise",e.reason));
  const watchdog=setTimeout(()=>{if(!ready)show("load watchdog","Startup exceeded 30 seconds.")},30000);
  return {fail:show,ready(){ready=true;clearTimeout(watchdog)}};
}
