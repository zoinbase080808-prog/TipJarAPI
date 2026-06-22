const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());


app.get("/passes/:userid", async(req,res)=>{

    const userId = req.params.userid;

    try {


        let url =
        `https://www.pekora.zip/list-json?userId=${userId}&assetTypeId=34&pageNumber=1&itemsPerPage=100`;


        let response = await axios.get(url);


        let items = response.data.Data.Items;


        let passes = [];


        for(let item of items){


            if(item.Product && item.Product.IsForSale){


                passes.push({

                    Id: item.Item.AssetId,

                    Name: item.Item.Name,

                    Price: item.Product.PriceInRobux

                });

            }

        }


        console.log(
            "Игрок:",
            userId,
            "GamePass:",
            passes.length
        );


        res.json(passes);



    } catch(e){

        console.log(e.message);

        res.json([]);

    }


});


app.listen(process.env.PORT || 3000,()=>{

console.log("TipJar API online");

});
