let Authentication_Endpoints = {
  "signUp": "POST /api/auth/signup",
  "login": "POST /api/auth/login"
}

let Note_Endpoints = {
  "get all notes": "GET /api/notes",
  "get note by id": "GET /api/notes/:id",
  "create a note": "POST /api/notes/",
  "update note by id": "PUT /api/notes/:id",
  "delete note by id": "DELETE /api/notes/:id",
  "share a note with another user": "POST /api/notes/:id/share",
  "search note by keywords": "GET /api/search?q=:query"

}

exports.homePageController = (req, res) => {
  res.status(200).send({
    Message: "Welcome to the Note Taking application",
    Authentication_Endpoints,
    Note_Endpoints

  })
}

