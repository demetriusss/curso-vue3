import {reactive} from 'vue';

const state = reactive({
    isLoding: false
});

export default state;

export function setGlobalLoading (status) {
    state.isLoding = status;
}