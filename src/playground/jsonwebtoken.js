const jwt = require("jsonwebtoken");

const myFunc = async () => {
    const token = jwt.sign({ _id: "abc123" }, 'iamlearningnode', { expiresIn: '0 seconds' });
    console.log(token);

    const data = jwt.verify(token, 'iamlearningnode');
    console.log(data);
}

myFunc();