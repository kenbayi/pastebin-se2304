import app from "./server";
import {HashDataSource} from "./config/data-source";

const port = process.env.PORT || 3002;

async function startServer(){
    try{
        await HashDataSource.initialize();
        console.log("connected to hashdb");

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }catch(error){
        console.log("Error during connections: ", error);
    };
};

startServer();
