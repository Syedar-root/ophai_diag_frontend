import useEventListener from "@/libs/utils/useEventListener.ts";
import {type Ref, ref } from "vue";
export default function useMousePosition(target: Ref<EventTarget | null> | EventTarget) {
  const x = ref(0);
  const y = ref(0);

  useEventListener(target,'mousemove',(event:Event) => {
    const e = event as MouseEvent;
    x.value = e.offsetX;
    y.value = e.offsetY;
  })
  return {
    x,
    y,
  }
}