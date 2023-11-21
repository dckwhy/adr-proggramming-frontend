import { defineStore } from "pinia";
import axios from "axios";

export const useFaqbStore = defineStore('faqb', {
    state: () => ({
        faqb: []
    }),

    getters: {
        fqb: (state) => state.faqb,
    },

    actions: {
        async getFaqb() {
            await axios.get('/api/faqb').then(res => {
                this.faqb = res.data.faqb;
            })
        },
    },
})