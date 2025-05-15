import {type HandlePoint, Shape, type ShapeType} from "@/features/imageMark/shape/Shape.ts";

export class Rectangle extends  Shape{
   public type: ShapeType = 'rectangle';
   public color: string;
   public lineWidth: number;
   public startX: number;
   public startY: number;
   public endX: number;
   public endY: number;
   public ctx: CanvasRenderingContext2D
   public cvs: HTMLCanvasElement;

   constructor( color: string,lineWidth:number,startX: number, startY: number, ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement) {
	 super();
	this.color = color || "#000000";
	this.lineWidth = lineWidth || 2;
	this.startX = startX;
	this.startY = startY;
	this.endX = startX;
	this.endY = startY;
	this.ctx = ctx;
	this.cvs = cvs;
	this.description = '矩形';

	 this.transform = {
	    startX: startX,
	    startY: startY,
	    endX: startX,
	    endY: startY,
	 }
  }

  create(dx:number, dy:number){
	 dx = dx / this.cvs.width;
	 dy = dy / this.cvs.height;
	 this.endX = dx;
	 this.endY = dy;
  }

   move(dx:number, dy:number){
	 dx = dx / this.cvs.width;
	 dy = dy / this.cvs.height;
	 this.startX = this.transform.startX + dx;
	 this.startY = this.transform.startY + dy;
	 this.endX = this.transform.endX + dx;
	 this.endY = this.transform.endY + dy;
  }

  saveTransform (){
	 this.transform = {
	   startX: this.startX,
	   startY: this.startY,
	   endX: this.endX,
	   endY: this.endY,
	 }
	 return this.transform;
  }


  get minX(){
	return Math.min(this.startX, this.endX) * this.cvs.width;
  }
  get minY(){
	return Math.min(this.startY, this.endY) * this.cvs.height;
  }
  get maxX(){
	return Math.max(this.startX, this.endX)	* this.cvs.width;
  }
  get maxY(){
	return Math.max(this.startY, this.endY) * this.cvs.height;
  }
  // 获取较小X坐标的引用
  get minXRef() {
	return this.startX <= this.endX ? 'startX' : 'endX';
  }
  get maxXRef() {
	return this.startX > this.endX ? 'startX' : 'endX';
  }
  get minYRef() {
	return this.startY <= this.endY ? 'startY' : 'endY';
  }
  get maxYRef() {
	return this.startY > this.endY ? 'startY' : 'endY';
  }
  get centerX(){
	 return (this.maxX + this.minX) / 2;
  }
  get centerY(){
	 return (this.maxY + this.minY) / 2;
  }
  /**
   * 左上 右上 右下 左下
   * @returns 物理坐标
   */
  get handlePoints(){
  	return [
		{
		  x: this.minX - 5,
		  y: this.minY - 5,
		  type: 'lt'
		},
		{
		  x: this.maxX + 5,
		  y: this.minY - 5,
		  type:'rt'
		},
		{
		  x: this.maxX + 5,
		  y: this.maxY + 5,
		  type: 'rb'
		},
		{
		  x: this.minX - 5,
		  y: this.maxY + 5,
		  type: 'lb'
		}
	]
  }

  getHandlePoint(type:string):{x: 'startX' | 'endX', y:'startY' | 'endY'}{
	switch (type){
	  case 'lt':{
		return{
		  x: this.minXRef,
		  y: this.minYRef,
		}
	  }
	  case 'rt':{
		return {
		  x: this.maxXRef,
		  y: this.minYRef,
		}
	  }
	  case 'rb':{
		return {
		  x: this.maxXRef,
		  y: this.maxYRef,
		}
	  }
	  case 'lb':{
		return {
		  x: this.minXRef,
		  y: this.maxYRef,
		}
	  }
	}
	return {
	  x: this.maxXRef,
	  y: this.maxYRef
	}
  }

  draw(useCtx: CanvasRenderingContext2D = this.ctx){
	if (!this.drawable) return;
	useCtx.beginPath();
	useCtx.moveTo(this.minX* devicePixelRatio, this.minY* devicePixelRatio);
	useCtx.lineTo(this.maxX* devicePixelRatio, this.minY* devicePixelRatio);
	useCtx.lineTo(this.maxX* devicePixelRatio, this.maxY* devicePixelRatio);
	useCtx.lineTo(this.minX* devicePixelRatio, this.maxY* devicePixelRatio);
	useCtx.lineTo(this.minX* devicePixelRatio, this.minY* devicePixelRatio);
	
	useCtx.globalAlpha = 0.2;
	useCtx.fillStyle = this.color;
	useCtx.fill();
	useCtx.globalAlpha = 1;


	useCtx.strokeStyle = this.color;
	useCtx.lineCap = "round";
	useCtx.setLineDash([]);
	useCtx.lineWidth = this.lineWidth * devicePixelRatio;
	useCtx.stroke();
	useCtx.closePath();

	if (this.isActive) {
		// 绘制更宽的虚线框
		useCtx.beginPath();
		useCtx.moveTo(this.handlePoints[0].x, this.handlePoints[0].y);
		this.handlePoints.forEach((point) => {
		  useCtx.lineTo(point.x, point.y);
		})
		useCtx.lineTo(this.handlePoints[0].x, this.handlePoints[0].y);
		useCtx.setLineDash([5, 10]);
		useCtx.strokeStyle = "#fff";
		useCtx.lineWidth = 3 * devicePixelRatio;
		useCtx.stroke();
		// 高亮填充
		useCtx.globalAlpha = 0.4;
		useCtx.fillStyle = "#fff";
		useCtx.fill();
		useCtx.globalAlpha = 1;
		useCtx.closePath();
		// 绘制手柄

		this.handlePoints.forEach((point) => {
		  useCtx.beginPath();
		  useCtx.arc(point.x, point.y, 5 * devicePixelRatio, 0, Math.PI * 2);
		  useCtx.fillStyle = "#fff";
		  useCtx.fill();
		  useCtx.closePath();
		})
	}

	let size = 16 * devicePixelRatio;
	useCtx.font = `${size}px Arial`;
	useCtx.fillText(this.description, this.minX + size * 0.5, this.minY + size * 1.5);
  }
  inside(x: number, y: number){
  	return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  copy( newRect:Rectangle ):void {
	this.color = newRect.color;
	this.lineWidth = newRect.lineWidth;
	this.startX = newRect.startX;
	this.startY = newRect.startY;
	this.endX = newRect.endX;
	this.endY = newRect.endY;
	this.description = newRect.description;
	this.isActive = newRect.isActive;
	this.transform = newRect.transform;
  }

  /**
   * 调整大小
   * @param dx 调整x, dx是物理单位
   * @param dy 调整y，dy是物理单位
   * @param xRef
   * @param yRef
   */
  resize(dx: number, dy: number , xRef:  'startX' | 'endX', yRef: 'startY' | 'endY'): void {
	let logicalDeltaX = dx / this.cvs.width;
	let logicalDeltaY = dy / this.cvs.height;
	this[xRef] = logicalDeltaX;
	this[yRef] = logicalDeltaY;
  }

  /**
   * 判断是否在手柄上
   * @param x x坐标，物理坐标
   * @param y y坐标，物理坐标
   * @returns 返回手柄类型，否则返回null
   */
  onHandlePoint(x: number, y: number){
	let closestHandle : HandlePoint | null = null;
	let minDistance = Infinity;
	this.handlePoints.forEach((point) => {
		let distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
		if (distance < minDistance && distance < 5 * devicePixelRatio) {
			minDistance = distance;
			closestHandle = point;
		}
	})
	return closestHandle;
  }

  /**
   * 判断是否在手柄的旋转区域上
   * @param x x坐标，物理坐标
   * @param y y坐标，物理坐标
   * @returns
   */
  onRotateHandle(x: number, y: number){
	for (let i = 0; i < this.handlePoints.length; i++) {
		let point = this.handlePoints[i];
		let distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
		if (distance > 5 * devicePixelRatio && distance < 10 * devicePixelRatio){
		  return true
		}
	}
	return false;
  }

}
