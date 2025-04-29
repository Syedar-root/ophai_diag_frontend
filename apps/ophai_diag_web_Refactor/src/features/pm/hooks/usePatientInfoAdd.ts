import {ref} from "vue";
import {addPatientService} from "@/features/pm/api";
import {validate,patientInfoSchema} from "@/libs/utils/validate";


interface PatientInfo {
  name: string
  age: number | null
  gender: number | null
}

export const usePatientInfoAdd = () => {
  const patientInfo = ref<PatientInfo>({
	name: "",
	age: 0,
	gender: 0,
  })
  const addLoading = ref<boolean>(false);

  const handleAdd = async () => {
	try {
	  await validate(patientInfo.value, patientInfoSchema);
	}catch (error) {
	  return false;
	}
    if (patientInfo.value) {
      addLoading.value = true;
     return addPatientService(patientInfo.value).then((res) => {
		if (res.code === 200) {
		  ElMessage.success(res.message)
		}
		return true;
	  }).finally(() => {
		addLoading.value = false;
	  })
    }
  }

  return{
	patientInfo,
	addLoading,
	handleAdd,
  }
}