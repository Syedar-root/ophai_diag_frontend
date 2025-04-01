import {ref} from 'vue';

export const usePatientListSearch = () => {
    const searchQuery = ref({
        id:'',
        name:'',
        diseaseName:'',
        pageNum: 1,
        pageSize: 10,
    });
    function handleSearch(isPage: boolean = false) {
        if (isPage) {
            searchQuery.value = {
                ...searchQuery.value,
                pageNum: 1
            }
        }
        console.log(searchQuery.value)
    }

    return { searchQuery,handleSearch }
}