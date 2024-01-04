const User = require("../models/userModel");
const Note = require("../models/notesModel");

exports.createNote = async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        if (!title)
            return res.send({ success: false, message: "Title is required" })

        if (!body)
            return res.send({ success: false, message: "Note body is required" })

        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(400);
            return res.send({ success: false, message: "User not found" });
        }

        const note = await Note.create({
            title: title,
            body: body
        })

        user.notes.push(note);

        res.status(200);
        user.save();
        res.send({
            success: true,
            message: "Note created successfully",
            note
        })
    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in creating note',
            error: error.message
        })
    }

}

exports.getAllNotes = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(400)
            return res.send({ success: false, message: "User not found" });
        }


        res.status(200).send({
            success: true,
            message: "Note created successfully",
            TotalNotes: user.notes.length,
            notes: user.notes
        })
    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in getting all note',
            error: error.message
        })
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const { userId } = req.body;
        const id = req.params.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400)
            return res.send({ success: false, message: "User not found" });
        }

        const notes = user.notes;

        const note = notes.filter((note) => {
            if (id == note._id)
                return note;
        })

        res.status(200)
        res.send({
            success: true,
            message: "Note found",
            note: note
        })

    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in getting note by id',
            error: error.message
        })
    }
}


exports.deleteNoteById = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(400);
            return res.send({ success: false, message: "User not found" });
        }

        const updatedNotes = user.notes.filter((note) => {
            if (req.params.id != note._id)
                return note;
        })

        if (user.notes.length == updatedNotes.length) {
            res.status(200);
            return res.send({ success: false, message: "Enter valid Id" });
        }


        user.notes = updatedNotes;
        // const note = await Note.deleteOne({ _id: req.params.id });

        res.status(200);
        user.save();

        res.send({
            success: true,
            message: "Note Deleted Successfully",
        })

    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in deleting note by id',
            error: error.message
        })
    }
}


exports.updateNoteById = async (req, res) => {
    try {

        const { title, body, userId } = req.body;
        const id = req.params.id;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(400);
            return res.send({ success: false, message: "User not found" });
        }


        const notes = user.notes.filter((note) => {
            if (id == note._id)
                return note;
        })

        if (notes.length == 0) {
            res.status(404);
            return res.send({ success: true, message: "Enter valid Note Id" })
        }


        if (title != null)
            notes[0].title = title;
        if (body != null)
            notes[0].body = body;

        res.status(200);
        user.save();
        res.send({
            success: true,
            message: "Note Updated Successfully",
        })

    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in updating note by id',
            error: error.message
        })
    }
}


exports.shareNoteById = async (req, res) => {
    try {
        const { title, body, userId } = req.body;

        const uid = req.params.id;

        if (!title)
            return res.send({ success: false, message: "Title is required" })

        if (!body)
            return res.send({ success: false, message: "Note body is required" })

        const self = await User.findById(userId);

        const other = await User.findOne({ _id: uid });

        if (!self || !other) {
            res.status(400);
            return send({ success: false, message: "User not found" });
        }


        const note = await Note.create({
            title,
            body
        });


        self.notes.push(note);
        other.notes.push(note);

        res.status(200)

        self.save();
        other.save();

        res.send({
            success: true,
            message: "Note created and shared Successfully",
        })

    }
    catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in sharing note',
            error: error.message
        })
    }
}


exports.search = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        if (!user) {
            res.status(400);
            return res.send({ success: false, message: "User not found" });
        }

        const notes = user.notes.filter((note) => {
            var re = new RegExp(req.query.q, 'i')
            if (note.title.match(re) || note.body.match(re))
                return note;
        });

        res.status(200);
        res.send({
            success: true,
            TotalFound: notes.length,
            notes
        })
    } catch (error) {
        res.status(500)
        res.send({
            success: false,
            message: 'Error in searching a note',
            error: error.message
        })
    }
}