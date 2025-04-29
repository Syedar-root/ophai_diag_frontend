import {ref} from "vue"
import {generateColors} from "@/libs/utils/colors.ts";

export const usePieChart = ( data :any , title:string) => {
  const pieChartData = ref([
	{ value: 1048, name: 'A' },
	{ value: 735, name: 'B' },
	{ value: 580, name: 'C' },
	{ value: 484, name: 'D' },
	{ value: 300, name: 'E' },
	{ value: 1004, name: 'F' },
	{ value: 200, name: 'G' },
  ])

  return {
	tooltip: {
	  trigger: 'item'
	},
	title:{
	  text: title ||'Search Engine',
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
		name: title ||'example',
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
		data: data || pieChartData.value
	  }
	],
	color:generateColors('#3ea2e4',10),
  }
}