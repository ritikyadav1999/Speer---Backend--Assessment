const bcrypt = require('bcrypt');

exports.hashPassword = async (password, saltRounds) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
    }
}


exports.comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)

}
