import { defineStore } from "pinia";
import axios from "axios";

export const useFaqjStore = defineStore('faqj', {
    state: () => ({
        faqj: []
    }),

    getters: {
        fqj: (state) => state.faqj,
    },

    actions: {
        async getFaqj() {
            await axios.get('/api/faqs').then(res => {
                this.faqj = res.data.faqj;
            })
        },
    },
})