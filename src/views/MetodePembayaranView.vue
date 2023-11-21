<script setup>
import { onMounted, ref } from "vue";
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import Accordion from "@/components/Accordions/Accordion.vue";
import AccordionItems from "@/components/Accordions/AccordionItems.vue";
import { usePmbStore } from "@/stores/pmb";

const pmbStore = usePmbStore()

const pmbs = ref()
const paymentMethods = [
    { name: 'BRI', account: '444601010056506', logo: 'Logo BRI.png' },
    { name: 'BCA', account: '0541971997', logo: 'Logo BCA.png' },
    { name: 'DANA', account: '082321017426', logo: 'Logo DANA.png' },
]
const isCopied = ref([false, false, false])
const copyText = ref(null);

const imgUrl = (img) => {
    return new URL(`../assets/img/${img}`, import.meta.url).href
}

const copyToClipboard = (index) => {
    const textToCopy = paymentMethods[index].account;

    isCopied.value[index] = true

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            setTimeout(() => {
                isCopied.value[index] = false;
            }, 1000);
        })
        .catch((error) => {
            console.error('Gagal menyalin teks ke clipboard:', error);
        });
}

onMounted(async () => {
    await pmbStore.getPmb()
    pmbs.value = pmbStore.pmb
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
                                    Tersedia Beberapa Metode Pembayaran
                                </h1>
                                <p class="mt-4 text-lg text-blueGray-200">
                                    Anda dapat memilih salah satu dari beberapa metode pembayaran yang tersedia. Pembayaran
                                    mudah dilengkapi dengan
                                    petunjuk yang dapat anda ikuti.
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
                                <i class="fas fa-credit-card text-xl"></i>
                            </div>
                            <h3 class="text-3xl mb-2 font-semibold leading-normal">
                                Transfer
                            </h3>

                            <div class="flex flex-wrap">
                                <div v-for="(item, index) in paymentMethods" :key="index"
                                    class="w-full md:w-4/12 px-2 text-center mt-4">
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div class="flex justify-end mt-2 mr-4" style="height: 2rem;">
                                            <button v-if="!isCopied[index]" @click="copyToClipboard(index)"
                                                class="text-white p-1 w-8 h-8 rounded-full focus:outline-none"
                                                style="background-color: lightgray;">
                                                <i class="fa fa-copy"></i>
                                            </button>
                                            <p v-if="isCopied[index]" class="rounded-full px-2 text-sm text-white"
                                                style="background-color: lightgray; height: fit-content;">
                                                copied
                                            </p>
                                        </div>
                                        <div class="px-4 pb-5 flex-auto">
                                            <div
                                                class="p-2 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-gray-400">
                                                <img :src="imgUrl(item.logo)" alt="" srcset="">
                                            </div>
                                            <h6 class="text-xl font-semibold">{{ item.name }} - <span
                                                    ref="copyText">{{ item.account }}</span></h6>
                                            <p class="mt-2 mb-4 text-blueGray-500">
                                                A.N. Agus Darmawan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center mt-12">
                        <div class="w-full md:w-12/12 px-4 mr-auto ml-auto">
                            <div
                                class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                <i class="fas fa-wallet text-xl"></i>
                            </div>
                            <h3 class="text-3xl mb-2 font-semibold leading-normal">
                                Virtual Account DANA
                            </h3>

                            <div class="flex flex-wrap">
                                <div class="w-full md:w-12/12 px-2 text-center mt-4">
                                    <Accordion>
                                        <AccordionItems v-for="pmb in pmbs" :key="pmb.id" :title="pmb.attributes.name">
                                            <div v-for="p_details in pmb.relationships.payment_details">
                                                <h1 class="text-xl font-bold"> {{ p_details.name }}</h1>
                                                <div class="flex justify-center mt-3 mb-3">
                                                    <img :src="imgUrl(p_details.img)" :alt="p_details.img"
                                                        class="max-w-md hidden md:block">
                                                    <img :src="imgUrl(p_details.img)" :alt="p_details.img"
                                                        class="max-w-sm md:hidden lg:hidden xl:hidden">
                                                </div>
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
