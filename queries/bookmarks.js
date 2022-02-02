const db = require("../db/dbConfig");

const getAllBookmarks = async () => {
  try {
    const bookmarks = await db.any("SELECT * FROM bookmarks");
    return bookmarks;
  } catch (error) {
    return error;
  }
};

const getBookmark = async (id) => {
  try {
    const bookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
    return bookmark;
  } catch (error) {
    return error;
  }
};

const createBookmark = async (bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  const createdBookmark = await db.one(
    "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, url, category, is_favorite]
  );
  return createdBookmark;
};

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
};
