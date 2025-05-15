import { type HandlePoint, Shape, type ShapeType } from './Shape'

interface Transform {
  centerX: number
  centerY: number
  radius: number
  scale: number
}

export class Circle extends Shape {
  public type: ShapeType = 'circle'
  public radius: number = 0
  public centerX: number = 0
  public centerY: number = 0
  public color: string = '#000000'
  public lineWidth: number = 2
  public scale = 1
  public transform: Transform = {
    centerX: this.centerX,
    centerY: this.centerY,
    radius: this.radius,
    scale: this.scale
  }

  constructor(
    centerX: number,
    centerY: number,
    radius: number,
    color: string,
    lineWidth: number,
    ctx: CanvasRenderingContext2D,
    cvs: HTMLCanvasElement
  ) {
    super()
    this.ctx = ctx
    this.cvs = cvs
    this.centerX = centerX
    this.centerY = centerY
    this.radius = radius
    this.color = color
    this.lineWidth = lineWidth
    this.transform = {
      centerX: this.centerX,
      centerY: this.centerY,
      radius: this.radius,
      scale: this.scale
    }
  }

  private getLogicalAxis(x: number, y: number) {
    return {
      x: x / this.cvs.width,
      y: y / this.cvs.height
    }
  }
  private getPhysicalAxis(x: number, y: number) {
    return {
      x: x * this.cvs.width,
      y: y * this.cvs.height
    }
  }

  draw(useCtx: CanvasRenderingContext2D = this.ctx) {
    if (!this.drawable) return
    useCtx.save()
    let { x, y } = this.getPhysicalAxis(this.centerX, this.centerY)
    useCtx.translate(x, y)
    useCtx.scale(this.scale, this.scale)
    useCtx.beginPath()
    useCtx.arc(0, 0, this.radius, 0, Math.PI * 2)
    useCtx.fillStyle = this.color
    useCtx.globalAlpha = 0.2
    useCtx.fill()
    useCtx.strokeStyle = this.color
    useCtx.lineWidth = this.lineWidth
    useCtx.lineCap = 'round'
    useCtx.globalAlpha = 1
    useCtx.stroke()
    useCtx.closePath()
    if (this.isActive) {
      this.drawActive(useCtx)
      this.drawHandle(useCtx)
    }
    useCtx.restore()
  }

  drawActive(useCtx: CanvasRenderingContext2D = this.ctx) {
    useCtx.save()
    useCtx.strokeStyle = '#fff'
    useCtx.lineWidth = this.lineWidth / this.scale
    useCtx.lineCap = 'round'
    useCtx.setLineDash([5, 10])
    useCtx.strokeRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2)
    useCtx.restore()
  }

  drawHandle(useCtx: CanvasRenderingContext2D = this.ctx) {
    useCtx.save()
    useCtx.beginPath()
    useCtx.arc(this.radius, this.radius, 3 / this.scale, 0, Math.PI * 2)
    useCtx.fillStyle = '#fff'
    useCtx.fill()
    useCtx.closePath()
    useCtx.restore()
  }

  inside(x: number, y: number) {
    let ctx = this.ctx
    let { x: cx, y: cy } = this.getPhysicalAxis(this.centerX, this.centerY)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(this.scale, this.scale)
    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    let isInside = ctx.isPointInPath(x, y)
    ctx.restore()
    return isInside
  }

  onHandlePoint(x: number, y: number): HandlePoint | null {
    let ctx = this.ctx
    let { x: cx, y: cy } = this.getPhysicalAxis(this.centerX, this.centerY)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(this.scale, this.scale)
    ctx.beginPath()
    ctx.arc(this.radius, this.radius, 5 / this.scale, 0, Math.PI * 2)
    ctx.closePath()
    let isInside = ctx.isPointInPath(x, y)
    ctx.restore()
    if (isInside) {
      return {
        x: cx + this.radius,
        y: cy + this.radius,
        type: 'rb'
      } as HandlePoint
    }
    return null
  }

  move(dx: number, dy: number) {
    let { x, y } = this.getLogicalAxis(dx, dy)
    this.centerX = this.transform.centerX + x
    this.centerY = this.transform.centerY + y
  }

  resize(dx: number, dy: number) {
    let { x: cx, y: cy } = this.getPhysicalAxis(this.centerX, this.centerY)
	if (dx < cx || dy < cy) {
	  return
	}
	this.radius = Math.sqrt((cx - dx) ** 2 + (cy - dy) ** 2)/ Math.sqrt(2)
	this.radius = Math.max(10, this.radius)
  }

  copy(newShape: Circle) {
    this.color = newShape.color
    this.lineWidth = newShape.lineWidth
    this.radius = newShape.radius
    this.centerX = newShape.centerX
    this.centerY = newShape.centerY
    this.scale = newShape.scale
  }

  saveTransform() {
    this.transform = {
      centerX: this.centerX,
      centerY: this.centerY,
      radius: this.radius,
      scale: this.scale
    }
  }
}