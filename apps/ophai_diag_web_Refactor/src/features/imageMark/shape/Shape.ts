export abstract class Shape {
  public description: string = 'shape';
  public color:string = 'red';
  public id = new Date().getTime();
  public isActive = false;
  public ctx: CanvasRenderingContext2D = null!;
  public cvs: HTMLCanvasElement = null!;
  public drawable: boolean = true;
  public type: ShapeType = 'rectangle';
  public transform:any;
  draw(useCtx:CanvasRenderingContext2D = this.ctx): void{
    throw new Error(`draw method not implemented ${useCtx}`);
  };
  abstract inside(x: number, y: number): boolean;
  abstract onHandlePoint(x: number, y: number): HandlePoint | null ;
  abstract copy(newShape: Shape): void;
  abstract saveTransform(): void;
}

export type ShapeType = 'rectangle' | 'pen' | 'circle';
export interface HandlePoint {
  x: number;
  y: number;
  type: string;
}