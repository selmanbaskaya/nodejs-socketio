function extractResponseValueByKey(response, path) {
    return path.split('.').reduce((previous, current) => previous[current], response)
}

module.exports = {
    extractResponseValueByKey: extractResponseValueByKey
}