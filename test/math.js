
const celciusToFehrenheight = (cel) => {
    return (cel * 1.8) + 32;
}

const fehrenheitToCelcius = (feh) => {
    return (feh - 32) / 1.8;
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject("Number must be negative");
            }
            resolve(a + b);
        }, 2000);
    })
}


module.exports = {
    celciusToFehrenheight,
    fehrenheitToCelcius,
    add
}