const { signupController, loginController } = require("../../controllers/authController");

const User = require("../../models/userModel");
const { hashPassword, comparePassword } = require("../../helper/authHelper");

jest.mock('../../models/userModel');
jest.mock("../../helper/authHelper", () => ({
    hashPassword: jest.fn(() => "hash"),
    comparePassword: jest.fn((x) => x)
}))

const req = {
    body: {
        name: "test name",
        email: "test@gmail.com",
        password: "test password"
    }
}

const res = {
    status: jest.fn((x) => x),
    send: jest.fn(x => x)
}


it('should send a status code of 400 when user exists', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "test password"
    });
    await signupController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should send a status code of 201 when a new user is created', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    User.create.mockResolvedValueOnce({
        _id: 1,
        name: 'test',
        email: 'test@gmail.com',
        password: "test password"
    })
    await signupController(req, res);
    expect(hashPassword).toHaveBeenCalledWith('test password', 10)
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
        name: "test name",
        email: "test@gmail.com",
        password: "hash"
    })

})



it('should sent a status code of 400 when user is not present in db', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should sent a status code of 200 when when email and password are valid and matched in db', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password"
    })
    await loginController(req, res);
    expect(comparePassword).toHaveBeenCalledWith("test password", "hashed password")
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})