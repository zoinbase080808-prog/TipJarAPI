const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());


app.get("/passes/:userid", async (req,res)=>{

    const userId = req.params.userid;

    try {

        let games = await axios.get(
            `https://games.roblox.com/v2/users/${userId}/games?accessFilter=Public&sortOrder=Asc&limit=50`
        );


        let passes = [];


        for (const game of games.data.data) {

            let gamePasses = await axios.get(
                `https://games.roblox.com/v1/games/${game.id}/game-passes?limit=100`
            );


            for (const pass of gamePasses.data.data) {

                passes.push({
                    Id: pass.id,
                    Name: pass.name
                });

            }
        }


        res.json(passes);


    } catch(e){

        console.log(e.message);

        res.json([]);

    }

});


app.listen(3000, ()=>{

    console.log("TipJar API online");

});
