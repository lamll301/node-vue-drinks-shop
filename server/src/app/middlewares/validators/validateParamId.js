
const validateParamId = (paramId) => {
    if (isNaN(parseInt(paramId))) return false
    return true
}

module.exports = validateParamId