import {ref} from "vue";
import {getChartDataService} from "@/features/dashboard/api";

export const useMapChartData = () => {
  const lineChartData = ref<{label: string, value: number}[]>([]);
  const genderPieChartData = ref<Map<string, any[]>>(new Map());
  const agePieChartData = ref<Map<string, any[]>>(new Map());
  const todayReadyPatientData = ref<number>(0);
  const todayFinishedPatientData = ref<number>(0);
  const totalPatientData = ref<number>(0);

  function mapLineChartData(data :any) {
	lineChartData.value = data.weekPatientData.map((item :any) => {
	  return {
		label: `周${item.dayOfWeek}`,
		value: item.count
	  }
	});
  }

  function mapGenderPieChartData(data: any) {
    if (!data) return;
	// AMD
    genderPieChartData.value?.set('AMD', Object.keys(data.agenderData).map(key => {
	  return { name: key, value: data.agenderData[key] };
	}));
	// 高血压
    genderPieChartData.value?.set('高血压', Object.keys(data.hgenderData).map(key => {
      return { name: key, value: data.hgenderData[key] };
    }))
	genderPieChartData.value?.set('糖尿病', Object.keys(data.dgenderData).map(key => {
	  return { name: key, value: data.dgenderData[key] };
	}))
	genderPieChartData.value?.set('白内障', Object.keys(data.cgenderData).map(key => {
	  return { name: key, value: data.cgenderData[key] };
	}))
	genderPieChartData.value?.set('青光眼', Object.keys(data.ggenderData).map(key => {
	  return { name: key, value: data.ggenderData[key] };
	}))
	genderPieChartData.value?.set('其他疾病', Object.keys(data.ogenderData).map(key => {
	  return { name: key, value: data.ogenderData[key] };
	}))
	genderPieChartData.value?.set('近视', Object.keys(data.mgenderData).map(key => {
	  return { name: key, value: data.mgenderData[key] };
	}))
  }

  function mapAgePieChartData(data: any) {
	// AMD
	agePieChartData.value?.set('AMD', Object.keys(data.aageData).map(key => {
	  return { name: key, value: data.aageData[key] };
	}));
	// 高血压
	agePieChartData.value?.set('高血压', Object.keys(data.hageData).map(key => {
	  return { name: key, value: data.hageData[key] };
	}))
	agePieChartData.value?.set('糖尿病', Object.keys(data.dageData).map(key => {
	  return { name: key, value: data.dageData[key] };
	}))
	agePieChartData.value?.set('白内障', Object.keys(data.cageData).map(key => {
	  return { name: key, value: data.cageData[key] };
	}))
	agePieChartData.value?.set('青光眼', Object.keys(data.gageData).map(key => {
	  return { name: key, value: data.gageData[key] };
	}))
	agePieChartData.value?.set('其他疾病', Object.keys(data.oageData).map(key => {
	  return { name: key, value: data.oageData[key] };
	}))
	agePieChartData.value?.set('近视', Object.keys(data.mageData).map(key => {
	  return { name: key, value: data.mageData[key] };
	}))
  }


 async function initMapChartData() {
	return getChartDataService().then((res) => {
	  if (res.code === 200) {
		mapLineChartData(res.data);
		mapGenderPieChartData(res.data);
		mapAgePieChartData(res.data);
		todayReadyPatientData.value = res.data.todayReadyPatientData;
		todayFinishedPatientData.value = res.data.todayFinishedPatientData;
		totalPatientData.value = res.data.totalPatientData;
	  }
	  return res.data;
	});
  }

  return {
	lineChartData,
	genderPieChartData,
	agePieChartData,
	initMapChartData,
	todayReadyPatientData,
	todayFinishedPatientData,
	totalPatientData,
  }

}