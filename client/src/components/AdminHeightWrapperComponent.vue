<template>
    <div class="admin-page" :style="{ height: adminPageHeight }">
        <div class="admin-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        addHeight: {
            type: Number,
            required: true
        },
        contentSelector: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            adminPageHeight: 'auto',
            resizeObserver: null
        }
    },
    mounted() {
        this.updateAdminPageHeight();
        this.setupResizeObserver();
    },
    unmounted() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    },
    methods: {
        updateAdminPageHeight() {
            this.$nextTick(() => {
                const adminContentForm = document.querySelector(this.contentSelector);
                if (adminContentForm) {
                    const adminContentFormHeight = adminContentForm.clientHeight;
                    this.adminPageHeight = `${adminContentFormHeight + this.addHeight}px`;
                }
            });
        },
        setupResizeObserver() {
            const adminContentForm = document.querySelector(this.contentSelector);
            if (adminContentForm) {
                this.resizeObserver = new ResizeObserver(() => {
                    this.updateAdminPageHeight();
                });
                this.resizeObserver.observe(adminContentForm);
            }
        }
    }
}
</script>
