import { Router } from "express";

import {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "../controllers/bookmark.controller.js";

const bookmarkRouter = Router();

bookmarkRouter.get("/", getBookmarks);
bookmarkRouter.get("/:id", getBookmark);
bookmarkRouter.post("/", createBookmark);
bookmarkRouter.put("/:id", updateBookmark);
bookmarkRouter.delete("/:id", deleteBookmark);

export default bookmarkRouter;
