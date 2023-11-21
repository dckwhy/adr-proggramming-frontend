import { defineStore } from "pinia";
import axios from "axios";

export const usePmbStore = defineStore('pmb', {
    state: () => ({
        pmbs: []
    }),

    getters: {
        pmb: (state) => state.pmbs,
    },

    actions: {
        async getPmb() {
            await axios.get('/api/payment_method').then(res => {
                this.pmbs = res.data.pmb;
            })
        },
    },
})