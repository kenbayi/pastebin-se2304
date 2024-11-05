import express,{Request, Response} from "express";
import hasherRoute from "../src/routes/hash-route";
import cors from "cors";

const app = express();

app.use(cors({origin: `${process.env.FRONTEND_URL}`, credentials: true}));
app.use(express.json());

app.use("/hash", hasherRoute);
app.get("/",(req: Request, res:Response) => {
    res.status(404).send("<h1>Welcome to hash-service<h1>");
});

export default app;