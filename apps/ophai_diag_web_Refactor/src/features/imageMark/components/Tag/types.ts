export interface TagProps{
  modelValue?:string | null;
  color?:string;
  onClose?:()=>void;
}
export interface TagEmits{
  (e:'update:modelValue',value:string | null | undefined):void;
  (e:'updateEnd') : void;
}