const { fehrenheitToCelcius, celciusToFehrenheight, add } = require("./math");

// test("fehren to celcius", () => {
//     const temp = fehrenheitToCelcius(32);
//     expect(temp).toBe(0);
// });

// test("celcius to Fehrenheit", () => {
//     const temp = celciusToFehrenheight(0);
//     expect(temp).toBe(32)
// });


// // test("hello world", () => {
// //     //
// // });

// // test("error aiga", () => {
// //     throw new Error("Failure");
// // });


test("should add two num", (done) => {
    add(2, 4).then(sum => {
        expect(sum).toBe(6);
        done();
    });
});

test("asyn-await", async () => {
    const sum = await add(10, 12);
    expect(sum).toBe(22);
})


// test("Async - 1", (cb) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         cb()
//     }, 1000);
// });