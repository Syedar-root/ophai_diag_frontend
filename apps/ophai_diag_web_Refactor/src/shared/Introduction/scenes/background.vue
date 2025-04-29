<template>
	<div class="wrap">
		<canvas id="cvs"></canvas>
	</div>
</template>

<style scoped>
	* {
		padding: 0;
		margin: 0;
		left: 0;
		top: 0;
	}

	.wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: transparent;
    transform: translate3d(0, 0, 0);
	}

	#cvs {
		position: absolute;
		left: 0px;
		top: 0px;
		background-color: transparent;
	}
</style>

<script setup lang="ts">
	import {
		onMounted,
	} from 'vue';

	let cvs: HTMLCanvasElement | null;
	let ctx: CanvasRenderingContext2D | null;



  const props = defineProps({
    mousePos: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      })
    },
    bgColor: {
    	type: String,
      required: true,
    	default: '#fafafa'
    },
    pointColor: {
      type: String,
      default: '#222222'
    }
  })

  const strokeColor = computed(() => {
    return hexToRgb(props.pointColor);
  });

  // 添加hex颜色转rgb函数
  function hexToRgb(hex :string) {
    // 移除#字符
    hex = hex.replace('#', '');
    // 解析为r, g, b值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r},${g},${b}`;
  }

	function init_canvas() {
    const parent = document.querySelector('.wrap');
    if (!cvs) return;
		cvs.width = parent?.clientWidth || window.innerWidth;
		cvs.height = parent?.clientHeight || window.innerHeight;
    console.log(props.bgColor);
    if (!ctx) return;
    ctx.fillStyle = props.bgColor;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
	}

	function getRandom(min :number, max:number) {
		return Math.floor(Math.random() * (max + 1 - min) + min);
	}


	class Point {
    r: number;
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    lastDrawTime: number | null;

		constructor() {
      if (!cvs) throw new Error('Canvas not initialized');
			this.r = 4;
			this.x = getRandom(0, cvs.width - this.r / 2);
			this.y = getRandom(0, cvs.height - this.r / 2);
			this.xSpeed = getRandom(-100, 100);
			this.ySpeed = getRandom(-100, 100);
			this.lastDrawTime = null;
		}

		drawPoint() {
      if (!cvs || !ctx) return;
			//点移动
			if (this.lastDrawTime) {
				let t = (Date.now() - this.lastDrawTime) / 1000;
				this.x = this.x + this.xSpeed * t;
				this.y = this.y + this.ySpeed * t;

				//边界碰撞
				if (this.x >= cvs.width - this.r / 2) {
					this.x = cvs.width - this.r / 2;
					this.xSpeed *= -1;
				} else if (this.x <= 0 + this.r / 2) {
					this.x = 0 + this.r / 2;
					this.xSpeed *= -1;
				}
				if (this.y >= cvs.height - this.r / 2) {
					this.y = cvs.height - this.r / 2;
					this.ySpeed *= -1;
				} else if (this.y <= 0 + this.r / 2) {
					this.y = 0 + this.r / 2;
					this.ySpeed *= -1;
				}

        //鼠标斥力
        let distance = Math.sqrt((this.x - props.mousePos.x) ** 2 + (this.y - props.mousePos.y) ** 2)
        if (distance < 100) {
          this.xSpeed *= -1;
          this.ySpeed *= -1;
          this.x += (this.x - props.mousePos.x) / 100;
          this.y += (this.y - props.mousePos.y) / 100;
        }

			}
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
			ctx.fillStyle = props.pointColor;
			ctx.fill()
			this.lastDrawTime = Date.now();
		}
	}

	class Graph {
    points: Array<Point>;
    maxDis:number;

		constructor(pointNum = 50, maxDis = 300) {
			this.points = new Array(pointNum).fill(0).map(() => new Point());
			this.maxDis = maxDis;
		}

		drawGraph() {
      if (!cvs || !ctx) return;

			//动画绘制
			requestAnimationFrame(() => {
				this.drawGraph();
			})
			//清空上一帧的图
			ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.fillStyle = props.bgColor;
      ctx.fillRect(0, 0, cvs.width, cvs.height);

			//绘制图
			for (let i = 0; i < this.points.length; i++) {
				const pi = this.points[i];
				pi.drawPoint();
				for (let j = i + 1; j < this.points.length; j++) {
					const pj = this.points[j];

					let distance = Math.sqrt((pi.x - pj.x) ** 2 + (pi.y - pj.y) ** 2)
					let opacity = 1 - distance / this.maxDis;

					ctx.beginPath();
					ctx.moveTo(pi.x, pi.y);
					ctx.lineTo(pj.x, pj.y);
					// ctx.strokeStyle = `rgba(0,179,255,${opacity})`;
          ctx.strokeStyle = `rgba(${strokeColor.value},${opacity})`;
					ctx.stroke();
				}

        //鼠标连线
        let distance = Math.sqrt((pi.x - props.mousePos.x) ** 2 + (pi.y - props.mousePos.y) ** 2)
        if (distance > this.maxDis) {
          continue;
        }
        let opacity = 1 - distance / this.maxDis;
        ctx.beginPath();
        ctx.moveTo(pi.x, pi.y);
        ctx.lineTo(props.mousePos.x, props.mousePos.y);
        ctx.strokeStyle = `rgba(${strokeColor.value},${opacity})`;
        ctx.stroke();
			}
		}
	}
  // function initWrap(){
  //   const wrap = document.querySelector('.wrap');
  //   wrap.style.backgroundColor = props.bgColor;
  // }
	onMounted(() => {
		cvs = document.querySelector('#cvs');
    if (!cvs) return;
		ctx = cvs.getContext('2d');
    if (!ctx) return;
    // window.addEventListener('mousemove', (event)=>{
    //   props.mousePos.x = event.offsetX;
    //   props.mousePos.y = event.offsetY;
    // });
		init_canvas();
		const G = new Graph();
		G.drawGraph();
    // initWrap();
	})
</script>