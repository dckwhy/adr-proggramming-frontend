<script setup>
import { onMounted, ref } from "vue";
import { useFaqjStore } from "@/stores/faqj";
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import Accordion from "@/components/Accordions/Accordion.vue";
import AccordionItems from "@/components/Accordions/AccordionItems.vue";

const faqjStore = useFaqjStore()

const faqjs = ref()

onMounted(async () => {
    await faqjStore.getFaqj()
    faqjs.value = faqjStore.fqj
})

</script>

<template>
    <div class="container-fluid">
        <navbar />
        <main>
            <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div class="absolute top-0 w-full h-full bg-center bg-cover"
                    style="background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80');">
                    <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
                </div>
                <div class="container relative mx-auto">
                    <div class="items-center flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div>
                                <h1 class="text-white font-semibold text-5xl">
                                    Pertanyaan Terkait Joki
                                </h1>
                                <p class="mt-4 text-lg text-blueGray-200">
                                    Pertanyaan yang sering diajukan terkait joki
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style="transform: translateZ(0);">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon class="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>

            <section class="pb-20 bg-white -mt-24">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap items-center mt-32">
                        <div class="w-full md:w-12/12 px-4 mr-auto ml-auto">
                            <div
                                class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <i class="fas fa-question text-xl"></i>
                            </div>
                            <h3 class="text-3xl mb-2 font-semibold leading-normal">
                                FAQ Joki
                            </h3>

                            <div class="flex flex-wrap">
                                <div class="w-full md:w-12/12 px-2 text-center mt-4">
                                    <Accordion>
                                        <AccordionItems v-for="faqj, index in faqjs" :key="faqj.id"
                                            :title="(index + 1) + '. ' + faqj.attributes.question">
                                            <div v-if="faqj.attributes.answer && !faqj.attributes.link"
                                                class="text-left text-base ml-3" v-html="faqj.attributes.answer"></div>
                                            <div v-else-if="!faqj.attributes.answer && faqj.attributes.link"
                                                class="text-left ">
                                                <a :href="faqj.attributes.link" class="text-base underline"
                                                    target="_blank">{{ faqj.attributes.link }}</a>
                                            </div>
                                            <div v-else-if="faqj.attributes.answer && faqj.attributes.link">
                                                <div class="text-left text-base ml-3 mb-3" v-html="faqj.attributes.answer">
                                                </div>
                                                <div class="text-left">
                                                    <a :href="faqj.attributes.link" class="text-base underline"
                                                        target="_blank">{{ faqj.attributes.link }}</a>
                                                </div>
                                            </div>
                                            <div v-else>
                                                Jawaban tidak ditemukan
                                            </div>
                                        </AccordionItems>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer-component />
    </div>
</template>

<style>
ul {
    list-style: disc !important;
}
</style>
