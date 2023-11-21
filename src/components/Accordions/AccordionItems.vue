<template>
    <div accordion-section class="mb-4 rounded-t-1">
        <h5 class="mb-0">
            <button section-trigger
                class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-700 rounded-t-1 text-lg"
                aria-expanded="true" v-on:click="isOpen = !isOpen">
                {{ title }}
                <i class="absolute right-0 pt-1 ml-4 leading-tight text-xs" :class="icon"></i>
            </button>
        </h5>
        <div section-content class="overflow-hidden transition-all ease-soft-in-out duration-350"
            :class="isOpen ? 'd-block' : 'hidden'">
            <div class="p-4 leading-normal text-sm opacity-80 ">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccordionItems',
    props: {
        title: String
    },
    data: () => {
        return {
            isOpen: false,
            icon: 'fa fa-plus'
        }
    },
}
</script>