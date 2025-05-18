import {computed} from "vue";
export const useMoveBarChart = () => {

  const data = computed(() => {
	return [
	  20,
	  97,
	  39,
	  24,
	  26,
	  18,
	  61
	]
	// return [
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//   Math.floor(Math.random() * 100 + 50),
	//
	// ]
  })


  const options = computed(() => {
	return{
	  title: {
	  	text: '本季度接诊患者疾病分布情况',
		left: 'center',
	  },
	  xAxis: {
		type: 'category',
		data: ['AMD', '糖尿病', '白内障', '青光眼', '高血压', '近视', '其他疾病'],
		axisLabel: {
		  show: true,
		  interval: 0,
		}
	  },
	  tooltip: {

	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		  data: data.value,
		  type: 'bar'
		}
	  ]
	};
  })

  return options;
}