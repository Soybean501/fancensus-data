<template>
    <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="close"
    >
        <div class="bg-white rounded-lg overflow-hidden max-w-full max-h-full relative p-4 m-8">
            <!-- Modal Header -->
            <div class="px-4 py-2 bg-gray-100 border-b flex justify-between items-center">
                <h3 class="text-lg font-semibold">{{ title }}</h3>
                <button
                    class="text-red-500 hover:text-red-700 text-xl"
                    @click="close"
                >
                    &#x2716;
                </button>
            </div>
            <!-- Modal Body -->
            <div class="p-4 overflow-y-auto" :style="{ maxHeight: '80vh' }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>
