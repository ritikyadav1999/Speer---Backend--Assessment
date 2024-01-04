const {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById,
    shareNoteById,
    search
} = require('../../controllers/notesController');
const User = require("../../models/userModel");
const { requireSignIn } = require('../../middlewares/authMiddleware');


const Note = require("..//../models/notesModel");

jest.mock('../../models/userModel');
jest.mock('../../models/notesModel');

const req = {
    body: {
        title: "test",
        body: "test body",
        userId: "test Id"
    },
    params: {
        id: "testing Id"
    }
}

const res = {
    status: jest.fn((x) => x),
    send: jest.fn(x => x)
}

// create Note
it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await createNote(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})

it('should send a status 200 when user is registered and successfully push newly created note in user notes', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: []
    });
    Note.create.mockResolvedValueOnce({
        id: 2,
        title: "test",
        body: "test body"
    })

    await createNote(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);

})

// get All Notes
it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await getAllNotes(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);

})

it('should send a status 200 while getting all notes when user is signedIn', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            title: "test",
            body: "test"
        }]
    });
    await getAllNotes(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);

})

// get note by id
it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await getNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})

it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            _id: "testing Id",
            title: "test",
            body: "test"
        }]
    });
    await getNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})



// delete Node By Id
it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await deleteNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})

it('should send a status 200 while deleting a note when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            _id: "testing Id",
            title: "test",
            body: "test"
        }]
    });
    await deleteNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})


// update Note by Id
it('should send a status 400 when used is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await updateNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should send a status 404 while updating a note when user is signedIn and when note Id is invalid', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            _id: "testing_Id1",
            title: "test",
            body: "test"
        },
        {
            _id: "testing_Id2",
            title: "test",
            body: "test"
        }
        ]
    });
    await updateNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should send a status 200 while updating a note when user is signedIn and when note Id is valid', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            // valid Id
            _id: "testing Id",
            title: "test1",
            body: "test"
        },
        {
            _id: "testing_Id2",
            title: "test2",
            body: "test"
        }
        ]
    });
    await updateNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})


// share Note by Id
it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await shareNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should send a status 200 while sharing a note when user is signedIn and when Id is valid', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            // valid Id
            _id: "testing Id",
            title: "test1",
            body: "test"
        }]
    });
    User.findById.mockResolvedValueOnce({
        id: 1,
        email: 'email1',
        name: "test1",
        password: "hashed password1",
        userId: "1",
        notes: [{
            // valid Id
            _id: "testing Id1",
            title: "test2",
            body: "test"
        }]
    });
    await shareNoteById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})


// search
const request = {
    body: {
        title: "test",
        body: "test body",
        userId: "test Id"
    },
    query: {
        q: "hello",
    }
}

it('should send a status 400 when user is not signedIn', async () => {
    User.findOne.mockResolvedValueOnce(undefined);
    await search(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledTimes(1);
})


it('should send a status 200 when user is signedIn', async () => {
    User.findOne.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        name: "test",
        password: "hashed password",
        userId: "1",
        notes: [{
            // valid Id
            _id: "testing Id",
            title: "hello,This is my backend Assessment",
            body: "completed Backend Assessment"
        }]
    });
    await search(request, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
})

