const bcrypt = require("bcryptjs");

const hashedPassword = async (pass) => {
    const hashPass = await bcrypt.hash(pass, 8);
    console.log(hashPass);
    const isMatch = await bcrypt.compare("Alqama124", hashPass);
    console.log(isMatch);
}

const pass = "Alqama123";
hashedPassword(pass);