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
            const key = this.$route.query.key
            const action = this.$route.query.action
            const filterId = this.$route.query.filterId
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
            if (key) link += `&key=${key}`
            if (action) link += `&action=${action}`
            if (filterId) link += `&filterId=${filterId}`
            if (page) link += `&page=${page}`
            return { link, icon }
        }
    }
}
</script>