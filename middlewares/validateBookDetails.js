
/* To validate whether all details of book is given not  */
const isBookDetailsProvided = async (req, res, next) => {
    const { title, author, ISBN, publisher, price, language  } = req.body;

    if(!title || !author || !ISBN || !publisher || !price || !language) {
        console.log("All Details are not provided")
        res.status(403).send("Some details are missing! Please re-check")
        return
    }  
    else next()
} 

module.exports = {
    isBookDetailsProvided
}