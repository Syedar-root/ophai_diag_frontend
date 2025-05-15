import {ref, type Ref} from "vue";

export const useCvs = (cvs: Ref<HTMLCanvasElement | null>) => {
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const init = (w:number = window.innerWidth , h:number = window.innerHeight ) => {
    if (!cvs.value) {
      return
    }
    ctx.value = cvs.value.getContext('2d')
	if (ctx.value){
	  cvs.value.width = w * devicePixelRatio
	  cvs.value.height = h * devicePixelRatio
	  cvs.value.style.width = w + 'px'
	  cvs.value.style.height = h + 'px'
	}
  }

  return {
    ctx,
    init
  } as  CtxInstance
}

export interface CtxInstance {
  ctx: Ref<CanvasRenderingContext2D | null>
  init: (w:number , h:number) => void
}

export function cursorResizeType(type:string){
  if (type === 'lt' || type === 'rb'){
    return 'nwse-resize'
  }else if (type === 'lb' || type === 'rt'){
    return 'nesw-resize'
  }
  return 'default'
}