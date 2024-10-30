import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true}));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
    console.log(req.cookies);
    res.status(404).send("<h1>Welcome to user service<h1>");
});

export default app;