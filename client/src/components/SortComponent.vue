<template>
    <router-link :to="getLink">
        <i :class="getIcon"></i>
    </router-link>
</template>

<script>
export default {
    props: {
        field: String,
        sort: Object
    },
    computed: {
        getLink() {
            return this.sortable().link
        },
        getIcon() {
            return this.sortable().icon
        }
    },
    methods: {
        sortable() {
            const page = this.$route.query.page
            const sortType = this.field === this.sort.column ? this.sort.type : 'default'
            const icons = {
                default: 'fa-solid fa-sort',
                asc: 'fa-solid fa-sort-up',
                desc: 'fa-solid fa-sort-down'
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }
            const icon = icons[sortType]
            const type = types[sortType]
            let link = `?_sort&column=${this.field}&type=${type}`
            if (page) {
                link += `&page=${page}`
            }
            return { link, icon }
        }
    }
}
</script>