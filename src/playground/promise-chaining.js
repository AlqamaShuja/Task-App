require("../db/mongoose");
const Task = require("../model/task");

// // Task.findByIdAndDelete("630d14d1c33710bfdeb5f4f4").then(() => {
// //     return Task.countDocuments({});
// // }).then((count) => {
// //     console.log(count);
// // }).catch(err => {
// //     console.log("Error");
// // })

// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b);
//         }, 2000);
//     });
// }

// const doWork = async () => {
//     const sum1 = await add(2, 3);
//     const sum2 = await add(sum1, 1);
//     const sum3 = await add(sum2, 4);
//     // console.log(sum3);
//     return sum3;
// }

// doWork().then(sum => {
//     // console.log(sum);
// })

// add(2, 3).then(data => {
//     console.log(data);
// });

// console.log(doWork());



const updateByIdAndCountUnComplete = async (id, updItem) => {
    const task = await Task.findByIdAndUpdate(id, updItem);
    return await Task.countDocuments({ completed: false });
}

updateByIdAndCountUnComplete("630fb2814f67ad1e9122ba93", { description: "Chala Ja" })
    .then(count => {
        console.log(count);
    })
    .catch(err => {
        console.log(err);
    });










