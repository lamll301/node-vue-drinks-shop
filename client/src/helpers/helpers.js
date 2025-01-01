
export function convertDate(dateString) {
    if (!dateString) return
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    const hour = date.getHours().toString()
    const minute = date.getMinutes().toString()
    // const second = date.getSeconds().toString()
    return `${hour}:${minute} ${day}-${month}-${year}`
}

export function arrayToString(array) {
    if (!array) return
    return array.join('; ')
}

export function isExists(array, value) {
    return array.includes(value)
}
// trích xuất các giá trị của một thuộc tính từ một mảng đối tượng thành một mảng
export function getAttributeFromObjectArray(objects, attribute) {
    if (!objects || !attribute) return
    return objects.map(object => object[attribute])
}
// chuyển đổi các giá trị của một thuộc tính từ một mảng đối tượng thành một chuỗi
export function attributeValuesToString(array, attribute) {
    if (!array || !attribute) return
    const valuesArray = getAttributeFromObjectArray(array, attribute)
    return arrayToString(valuesArray)
}

export function getAttributeFromObject(object, attribute) {
    if (!object || !attribute) return
    return object[attribute]
}
export function getImagePath(imageName, errorImageName) {
    try {
        return require(`@/assets/img/data/${imageName}`)
    }
    catch (error) {
        return require(`@/assets/img/${errorImageName}`)
    }
}
