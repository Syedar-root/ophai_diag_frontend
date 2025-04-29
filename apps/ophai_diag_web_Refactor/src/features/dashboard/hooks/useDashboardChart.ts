import {ref} from 'vue';

export const useDashboardChart = () => {
  const dashboardChartData = ref([
	{
	  value:(Math.random() * 100).toFixed(1),
	  name: '服务器压力',
	  title: {
		offsetCenter: ['0%', '0%']
	  },
	  detail: {
		valueAnimation: true,
		offsetCenter: ['0%', '40%']
	  }
	}
  ])

  return {
	// title: {
	//   text: '服务器压力',
	//   left: 'center',
	//   top: 'center',
	// },
	series: [
	  {
		type: 'gauge',
		startAngle: 90,
		endAngle: -270,
		pointer: {
		  show: false
		},
		progress: {
		  show: true,
		  overlap: false,
		  roundCap: true,
		  clip: false,
		  itemStyle: {
			borderWidth: 1,
			borderColor: '#464646'
		  }
		},
		axisLine: {
		  lineStyle: {
			width: 10
		  }
		},
		splitLine: {
		  show: false,
		  distance: 0,
		  length: 10
		},
		axisTick: {
		  show: false
		},
		axisLabel: {
		  show: false,
		  distance: 50
		},
		data: dashboardChartData.value,
		detail: {
		  width: 25,
		  height: 10,
		  fontSize: 10,
		  color: 'inherit',
		  borderColor: 'inherit',
		  borderRadius: 20,
		  borderWidth: 1,
		  formatter: '{value}%'
		}
	  }
	]
  };
}