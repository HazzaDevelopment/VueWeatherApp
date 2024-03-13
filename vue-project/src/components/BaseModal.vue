<template>
    <!-- Teleport modal to <body> for better styling and accessibility -->
    <Teleport to="body">
        <!-- Outer transition for backdrop fade-in/out -->
        <Transition name="modal-outer">
            <!-- Modal backdrop, shown based on modalActive -->
            <div v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
                <!-- Inner transition for modal dialog animation -->
                <Transition name="modal-inner">
                    <!-- Modal dialog, shown if modalActive -->
                    <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md">
                        <!-- Slot for modal content -->
                        <slot />
                        <!-- Close button emits 'close-modal' event -->
                        <button class="text-white mt-8 bg-weather-primary py-2 px-6"
                            @click="$emit('close-modal')">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
// Emit 'close-modal' event
defineEmits(["close-modal"]);

// modalActive prop controls modal visibility
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped>
/* Backdrop enter/leave transitions */
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

/* Dialog enter/leave transitions */
.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>
