import {type HandlePoint, Shape, type ShapeType} from "@/features/imageMark/shape/Shape.ts";

interface Point{
  x: number,
  y: number
}
interface Transform{
  startX:number,
  startY:number,
  points: Point[] ,
  width:number,
  height:number ,
  minX:number,
  minY:number,
  scaleX:number,
  scaleY:number,
}

export class Pen extends Shape{
  public type: ShapeType ='pen';
  public color: string;
  public lineWidth: number = 2;
  public startX: number;
  public startY: number;
  public points: Point[] = [];
  public ctx: CanvasRenderingContext2D
  public description: string;
  public cvs: HTMLCanvasElement;
  public transform:Transform;
  public scaleX: number = 1;
  public scaleY: number = 1;
  constructor( color: string, lineWidth:number,startX: number, startY: number, ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement ) {
	super();
	this.color = color;
	this.lineWidth = lineWidth;
	this.startX = startX;
	this.startY = startY;
	this.ctx = ctx;
	this.cvs = cvs;
	this.description = '画笔';
	this.transform = {
	  startX: startX,
	  startY: startY,
	  points: this.points,
	  minX: startX,
	  minY: startY,
	  width: 0,
	  height: 0,
	  scaleX: 1,
	  scaleY: 1,
	}

  }

  private getLogicalAxis(x: number, y: number) {
	return {
	  x: x / this.cvs.width,
	  y: y / this.cvs.height
	}
  }
  // private getPhysicalAxis(x: number, y: number) {
	// return {
	//   x: x * this.cvs.width,
	//   y: y * this.cvs.height
	// }
  // }

  move(dx:number, dy:number){
	let {x, y} = this.getLogicalAxis(dx, dy);
	this.startX = this.transform.startX + x
	this.startY = this.transform.startY + y
	this.points = this.transform.points.map(point => {
	  return {
		x: point.x + x,
		y: point.y + y
	  } as Point;
	})
  }

  saveTransform(){
  	this.transform = {
	  startX: this.startX,
	  startY: this.startY,
	  points: [...this.points.map(point => point)],
	  minX: this.getAABB()?.x || 0,
	  minY: this.getAABB()?.y || 0,
	  width: this.getAABB()?.width || 0,
	  height: this.getAABB()?.height || 0,
	  scaleX: this.scaleX,
	  scaleY: this.scaleY,
	}
  }

  draw(useCtx: CanvasRenderingContext2D = this.ctx) {
	if (!this.drawable) return;
	let result = this.getAABB()
	if (!result) return;
	let cx = result.x + result.width / 2;
	let cy = result.y + result.height / 2;

	let { x:lcx, y:lcy } = this.getLogicalAxis(cx, cy);


	useCtx.save();
	useCtx.translate(cx, cy);
	useCtx.scale(this.scaleX, this.scaleY);
	useCtx.beginPath();
	let starX = this.startX - lcx;
	let starY = this.startY - lcy;
	useCtx.moveTo(starX * devicePixelRatio * this.cvs.width, starY * devicePixelRatio* this.cvs.height);
	this.points.forEach((point) => {
	  let pointX = point.x - lcx;
	  let pointY = point.y - lcy;
	  useCtx.lineTo(pointX * devicePixelRatio  * this.cvs.width, pointY * devicePixelRatio  * this.cvs.height);
	})
	useCtx.lineTo(starX * devicePixelRatio  * this.cvs.width, starY * devicePixelRatio  * this.cvs.height);
	useCtx.setLineDash([]);
	useCtx.globalAlpha = 0.2;
	useCtx.fillStyle = this.color;
	useCtx.fill();
	useCtx.globalAlpha = 1;
	useCtx.strokeStyle = this.color;
	useCtx.lineCap = 'round';
	useCtx.lineWidth = this.lineWidth * devicePixelRatio;
	useCtx.stroke();

	if (this.isActive) {
	  // 绘制更宽的虚线框
	  this.drawActive(useCtx, -result.width/2,-result.height/2, result.width, result.height);
	  this.drawHandle(useCtx, result.width / 2, result.height / 2);
	}

	useCtx.restore();
	useCtx.font = `${ 1 }rem Arial`;
	useCtx.fillText(this.description, cx, cy - result.height * this.scaleY / 3);
  }

  drawActive(useCtx: CanvasRenderingContext2D = this.ctx , x: number, y: number, width: number, height: number) {
	useCtx.save();
	useCtx.beginPath();
	let dash = 5 / ((this.scaleX + this.scaleY ) /2);
	let dashOffset = dash * devicePixelRatio * 2;
	useCtx.setLineDash([dash, dashOffset]);
	useCtx.strokeStyle = "#fff";
	useCtx.lineWidth = 3 * devicePixelRatio / ((this.scaleX + this.scaleY ) /2);
	useCtx.strokeRect(x, y, width, height);
	useCtx.stroke();
	useCtx.closePath();
	useCtx.restore();
  }

  drawHandle(useCtx: CanvasRenderingContext2D = this.ctx ,x: number, y: number ) {
	useCtx.save();
	useCtx.beginPath();
	useCtx.arc(x,y, 5 * devicePixelRatio / ((this.scaleX + this.scaleY ) /2)  , 0, 2 * Math.PI);
	useCtx.fillStyle = '#fff'
	useCtx.fill();
	useCtx.closePath();
	useCtx.restore();
  }

  /**
   * 获取AABB最小包裹矩形
   * 考虑线宽扩展
   * @returns
   */
  getAABB() {
	const points = [{x:this.startX, y:this.startY}, ...this.points];
	if (points.length === 0) return null;

	let minX = Infinity, maxX = -Infinity;
	let minY = Infinity, maxY = -Infinity;

	for (let {x, y} of points) {
	  x *= this.cvs.width;
	  y *= this.cvs.height;
	  minX = Math.min(minX, x);
	  maxX = Math.max(maxX, x);
	  minY = Math.min(minY, y);
	  maxY = Math.max(maxY, y);
	}

	// 考虑线宽扩展
	const halfWidth = this.lineWidth / 2;
	return {
	  x: minX - halfWidth || this.startX * this.cvs.width,
	  y: minY - halfWidth || this.startY * this.cvs.height,
	  width: (maxX - minX) + this.lineWidth,
	  height: (maxY - minY) + this.lineWidth
	};
  }

  /**
   * 添加点
   * 考虑点的间距，避免点过多。
   * @param x
   * @param y
   */
  public addPoint = ( x:number, y:number )=>{
	let lastPoint = this.points[this.points.length - 1];
	if (lastPoint && Math.abs(lastPoint.x - x) * this.cvs.width < 10 && Math.abs(lastPoint.y - y) * this.cvs.height < 10) {
	  return;
	}else {
	  this.points.push({x, y});
	}
  }


  inside(x: number, y: number){
	let result = this.getAABB()
	if (!result) return false;
	let cx = result.x + result.width / 2;
	let cy = result.y + result.height / 2;

	let { x:lcx, y:lcy } = this.getLogicalAxis(cx, cy);
	let useCtx = this.ctx;

	useCtx.save();
	useCtx.translate(cx, cy);
	useCtx.scale(this.scaleX, this.scaleY);
	useCtx.beginPath();
	let starX = this.startX - lcx;
	let starY = this.startY - lcy;
	useCtx.moveTo(starX * devicePixelRatio * this.cvs.width, starY * devicePixelRatio* this.cvs.height);
	this.points.forEach((point) => {
	  let pointX = point.x - lcx;
	  let pointY = point.y - lcy;
	  useCtx.lineTo(pointX * devicePixelRatio  * this.cvs.width, pointY * devicePixelRatio  * this.cvs.height);
	})
	useCtx.lineTo(starX * devicePixelRatio  * this.cvs.width, starY * devicePixelRatio  * this.cvs.height);
	useCtx.closePath();
	let isInside = useCtx.isPointInPath(x,y);
	useCtx.restore();
	return isInside;
  }

  resize(dx:number, dy:number){
	let result = this.getAABB()
	if (!result) return;
	this.scaleX =this.transform.scaleX + (result.width + dx * 2) / result.width - 1;
	this.scaleY =this.transform.scaleY + (result.height + dy * 2) / result.height - 1;

	this.scaleX = Math.max(0.5, this.scaleX);
	this.scaleY = Math.max(0.5, this.scaleY);
	this.scaleX = Math.min(3, this.scaleX);
	this.scaleY = Math.min(3, this.scaleY);
  }

  copy( newPen:Pen ):void {
  	this.startY = newPen.startY;
  	this.startX = newPen.startX;
	this.points = [...newPen.points.map(p => ({...p}))]; // 深拷贝
  	this.color = newPen.color
    this.lineWidth = newPen.lineWidth
    this.description = newPen.description
  	this.isActive = newPen.isActive;
  	this.transform = newPen.transform;
  	this.scaleX = newPen.scaleX;
	this.scaleY = newPen.scaleY;
  }
  
  onHandlePoint(x: number, y: number): HandlePoint | null {
	let ctx = this.ctx;
	let result = this.getAABB()
	if (!result) {return null}
	let cx = result.x + result.width / 2;
	let cy = result.y + result.height / 2;

	ctx.save()
	ctx.translate(cx, cy);
	ctx.scale(this.scaleX, this.scaleY);
	ctx.beginPath();
	ctx.arc(result.width/2, result.height/2 , 5 * devicePixelRatio / ((this.scaleX + this.scaleY) / 2), 0, 2 * Math.PI);
	ctx.closePath();
	let isInside = ctx.isPointInPath(x,y);
	ctx.restore();

	if (isInside) {
	  return {
		x: result.x + result.width,
		y: result.y + result.height,
		type:'rb'
	  } as HandlePoint;
	}
	return null;
  }


}