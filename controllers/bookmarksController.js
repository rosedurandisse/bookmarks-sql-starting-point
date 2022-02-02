const express = require("express");
const { json } = require("express/lib/response");

const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
} = require("../queries/bookmarks");

const bookmarks = express.Router();

bookmarks.get("/", async (_, response) => {
  console.log("GET request to /bookmarks");
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks.length === 0) {
    response.status(500).json({ error: "server error" });
    return;
  }
  response.status(200).json(allBookmarks);
});

bookmarks.get("/:id", async (request, response) => {
  console.log("I got one bookmark");
  const oneBookmark = await getBookmark(request.params.id);
  response.status(200).json(oneBookmark);
});

bookmarks.post("/", async (request, response) => {
  console.log(request.body);
  // console.log("I added a bookmark");
  // const addedBookmark = await createBookmark(request.body);
  // response.status(200).json(addedBookmark);
});

module.exports = bookmarks;
