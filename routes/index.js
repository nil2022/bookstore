// routes/index.js
import Router from "express";
import authRouter from "#routes/auth";
import bookRouter from "#routes/book";
const router = Router();

router.use("/auth", authRouter);
router.use("/book", bookRouter);

export default router;
