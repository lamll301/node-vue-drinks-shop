
function pagination(req, total, PAGE_SIZE) {
    let page = parseInt(req.query.page)
    const totalPages = Math.ceil(total / PAGE_SIZE)
    page = page > totalPages ? totalPages : page    // đảm bảo trang luôn trong khoảng [1, totalPages]    
    page = page < 1 ? 1 : page
    let skip = (page - 1) * PAGE_SIZE
    return { totalPages, skip }
}

function stringToArray(string) {
    if (!string) return []
    return string.split(';').map(element => element.trim()).filter(tag => tag !== '')
}

module.exports = {
    pagination,
    stringToArray,
    
}