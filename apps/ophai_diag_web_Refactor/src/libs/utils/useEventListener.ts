import { onMounted,onBeforeUnmount, isRef, watch, unref } from "vue";
import type { Ref } from "vue";
export default function useEventListener(
    target: Ref<EventTarget | null> | EventTarget,
    event:string,
    handler: (e:Event) => any,
    autoRemove = true, //是否自动移除事件监听，默认是true，即自动移除，false则需要手动移除
){
    if (isRef(target)) {
       watch(target,(newVal,oldVal) => {
           oldVal?.removeEventListener(event,handler);
           newVal?.addEventListener(event,handler);
       },{immediate:true})
    }else{
        onMounted(() => {
            target.addEventListener(event,handler);
        });
    }
    
    if (autoRemove){
        onBeforeUnmount(() => {
            unref(target)?.removeEventListener(event,handler);
        });
    }
    
}