const request = require("supertest");
const app = require("../src/index");


test("should sign up new user", async () => {
    await request(app).post("/users").send({
        name: "Alqama",
        email: "alqama@gmail.com",
        password: "7777777",
    }).expect(201)
})


