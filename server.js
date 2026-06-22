app.get("/passes/:userId", async (req,res)=>{

    const userId = req.params.userId;

    try {

        const response = await axios.get(
        `https://www.pekora.zip/api/catalog/items?category=0&limit=100&sortType=0&creatorTargetId=${userId}`
        );


        let result = [];

        for (const item of response.data.data) {

            if(item.creatorTargetId == userId && item.assetType == 34){

                result.push({
                    id: item.id,
                    name: item.name,
                    price: item.price
                });

            }

        }


        console.log(result);

        res.json(result);


    } catch(e){

        console.log(e.response?.data || e.message);

        res.json([]);

    }

});
