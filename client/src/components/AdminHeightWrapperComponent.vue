<template>
    <div class="admin-page" :style="{ height: adminPageHeight }">
        <div class="admin-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminContentWrapper',
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
        }
    },
    mounted() {     // được gọi khi component gán vào DOM và DOM sẵn sàng
        this.setAdminPageHeight()
    },
    updated() {
        this.setAdminPageHeight()
    },
    methods: {
        setAdminPageHeight() {
            this.$nextTick(() => {
                const adminContentForm = document.querySelector(this.contentSelector)
                if (adminContentForm) {
                    const adminContentFormHeight = adminContentForm.clientHeight;
                    this.adminPageHeight = `${adminContentFormHeight + this.addHeight}px`;
                }
            })
        },
    },
}
</script>