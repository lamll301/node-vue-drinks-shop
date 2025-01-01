<template>
    <nav>
        <ul class="pagination custom-pagination">
            <li class="page-item custom-page-item" :class="{ disabled: currentPage <= 1 || totalPages <= 1 }">
                <router-link :to="previous" class="page-link custom-page-link">
                <span aria-hidden="true">&laquo;</span>
                </router-link>
            </li>
            <li v-for="page in paginationRange" :key="page" class="page-item custom-page-item">
                <span v-if="page === '...'" class="page-link custom-page-link">
                    {{ page }}
                </span>
                <router-link v-else class="page-link custom-page-link" 
                :to="selectPage(page)" :class="{ active: page === Math.min(Math.max(currentPage, 1), totalPages) || totalPages === 0}">
                    {{ page }}
                </router-link>
            </li>
            <li class="page-item custom-page-item" :class="{ disabled: currentPage >= totalPages || totalPages <= 1 }">
                <router-link :to="next" class="page-link custom-page-link">
                <span aria-hidden="true">&raquo;</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        totalPages: Number,
        currentPage: Number,
    },
    computed: {     // tự động cập nhật khi totalPages thay đổi
        paginationRange() {
            let page = parseInt(this.$route.query.page) || 1
            if (!this.totalPages) return [1];
            page = page > this.totalPages ? this.totalPages : page
            page = page < 1 ? 1 : page
            let range = [];
            if (this.totalPages <= 5) {
                for (let i = 1; i <= this.totalPages; i++) {
                    range.push(i)
                }
                return range
            }
            if (page <= 3) {
                range = [1, 2, 3, 4, '...', this.totalPages]
            }
            else if (page >= this.totalPages - 2) {
                range = [1, '...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages]
            }
            else {
                range = [1, '...', page - 1, page, page + 1, '...', this.totalPages]
            }
            return range;
        },
        previous() {
            let page = this.currentPage > this.totalPages ? this.totalPages - 1 : this.currentPage - 1
            let query = { ...this.$route.query }
            query.page = page
            return { path: this.$route.path, query }
        },
        next() {
            let page = this.currentPage < 1 ? 2 : this.currentPage + 1
            let query = { ...this.$route.query }
            query.page = page
            return { path: this.$route.path, query }
        },
        selectPage() {
            return (page) => {
                const query = { ...this.$route.query, page }
                return { path: this.$route.path, query }
            }
        }
    },
}
</script>