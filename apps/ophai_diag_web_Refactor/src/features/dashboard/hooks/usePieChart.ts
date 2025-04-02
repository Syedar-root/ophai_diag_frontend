import {ref} from "vue"
import {generateColors} from "@/libs/utils/colors.ts";

export const usePieChart = () => {
  const pieChartData = ref([
	{ value: 1048, name: 'Search Engine' },
	{ value: 735, name: 'Direct' },
	{ value: 580, name: 'Email' },
	{ value: 484, name: 'Union Ads' },
	{ value: 300, name: 'Video Ads' },
	{value: 1004, name: 'Video Ad' },
	{value: 200, name: 'Video A' },
  ])

  return {
	tooltip: {
	  trigger: 'item'
	},
	title:{
	  text: 'Search Engine',
	  left: 'center',
	},
	grid:{
	  top:'-300px',
	},
	legend: {
	  top: 'bottom',
	  left: 'left'
	},
	series: [
	  {
		name: 'Access From',
		type: 'pie',
		radius: ['40%', '70%'],
		avoidLabelOverlap: false,
		padAngle: 2,
		itemStyle: {
		  borderRadius: 10
		},
		label: {
		  show: false,
		  position: 'center'
		},
		emphasis: {
		  label: {
			show: true,
			fontSize: 20,
			fontWeight: 'bold'
		  }
		},
		labelLine: {
		  show: false
		},
		data: pieChartData.value
	  }
	],
	color:generateColors('#3ea2e4',10),
  }
}