const getPublicId = (imageUrl) => imageUrl.split("/").pop().split(".")[0];


module.exports = {
    getPublicId
}