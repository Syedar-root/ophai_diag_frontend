import {ref} from 'vue';

export const useLineChart = ( data:any ) => {
  const lineChartData = ref([
	  { label:'Mon', value:'150' },
	  { label:'Tue', value:'230' },
	  { label:'Wed', value:'224' },
	  { label:'Thu', value:'216' },
	  { label:'Fri', value:'160' },
	  { label:'Sat', value:'186' },
	  { label:'Sun', value:'302' },
  ]);

  return  {
	title: {
	  text:'周新患者数',
	  left:'center',
	},
	tooltip: {
	  trigger: 'axis',
	},
	xAxis: {
	  type: 'category',
	  data: (data || lineChartData.value).map((item :any) => {
		return item.label;
	  })
	},
	yAxis: {
	  type: 'value'
	},
	series: [
	  {
		data: (data || lineChartData.value).map((item :any) => {
		  return item.value;
		}),
		type: 'line',
		smooth: true,
		color: '#3ea2e4',
		areaStyle: {
		  color: {
			type: 'linear',
			x:0,
			y:0,
			x2:0,
			y2:1,
			colorStops:[
			  { offset: 0, color: '#3ea2e4ee' },
			  { offset: 1, color: '#ffffff00' },
			]
		  },
		}
	  }
	]
  }
}