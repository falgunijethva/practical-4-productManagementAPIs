const express = require("express");
const router = express.Router();
router.use(express.json());
const product = require("../productData")
const seller = require("../sellerData");
const company = require("../companyData");

router.get("/",(req,res)=> res.send("seller Details"));

//list of seller
router.get("/list",(req,res) => {
    res.json({data:seller});
});

//add seller
router.post("/addseller",(req,res)=> {
    const sellerlist = req.body;
    company.push(sellerlist)
    console.log(sellerlist); 
    res.json({data:"seller successfully inserted .."});
});

//delete seller
router.delete('/deleteseller/:id',(req,res)=>{
    try{
        const findIndex = seller.findIndex((s)=>s.sid === req.params.id)
        if(findIndex == -1){
            return res.json({data:'seller not found..!'})
        }
        else{
            product.splice(findIndex,1);
            return res.json({data:'seller successfully deleted ..!'});
        }
    }catch(err){
        return res.json({data:'try again..!'});  
    }
});

//update seller
router.put('/updateseller/:id', (req, res) => {
    try {
        const findIndex = seller.findIndex((s) => s.sid === req.params.id)
        if(findIndex === -1){
            return res.json({data : 'Seller not found.'})
        } 
        else {
            seller[findIndex]["pid"] = req.body.pid;
            return res.json({ data:'Seller Update Successfully'});
        }
    } catch (err) {
        return res.json({data:'try again..!'});  
    }
});

//fetch seller detail based on product name
router.get("/sellerdetail/:title",(req,res) => {

    const title = req.params.title;
    const Index = product.findIndex((p)=>p.title === title);

    if(Index === -1){
        return res.json({data:"Product not found"})
    } else {
        const sellerid=product[Index]["sid"];
      const sellerData = seller.filter((s) => sellerid.indexOf(s.sid) !== -1  );        
      return res.json({data: sellerData})
      
    }
});
module.exports = router;