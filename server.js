const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/passes/:userId", async (req,res)=>{

    const userId = req.params.userId;

    let passes = [];
    let cursor = "";

    try {

        do {

            let url =
            `https://apis.roblox.com/game-passes/v1/users/${userId}/game-passes?count=100&exclusiveStartId=${cursor}`;


            const response = await axios.get(url);


            const data = response.data;


            for(const pass of data.gamePasses){

                passes.push({
                    id: pass.id,
                    name: pass.name,
                    price: pass.price
                });

            }


            cursor = data.nextPageToken || "";


        } while(cursor);



        res.json(passes);


    } catch(e){

        console.log(e.message);
        res.json([]);

    }

});


app.get("/",(req,res)=>{
    res.send("TipJar API online");
});


app.listen(PORT,()=>{
    console.log("TipJar API online");
});
