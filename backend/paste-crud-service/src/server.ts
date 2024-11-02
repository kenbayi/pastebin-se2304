import express,{Request, Response} from "express";
import cors from "cors";
import PasteRouter from "./routes/paste-manager";
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({origin: `${process.env.FRONTEND_URL}`, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req: Request, res:Response) => {
    res.status(404).send("<h1>Welcome to paste-crud service<h1>");
});

export default app;