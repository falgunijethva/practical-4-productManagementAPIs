const express = require("express");
const router = express.Router();
router.use(express.json());
const product = require("../productData")
const seller = require("../sellerData");
const company = require("../companyData");

router.get("/",(req,res)=> res.send("company Details"));

//list of company
router.get("/list",(req,res) => {
    res.json({data:company});
});

//add company
router.post("/addCompany",(req,res)=> {
    const companylist = req.body;
    company.push(companylist)
    console.log(companylist); 
    res.json({data:"company successfully inserted .."});
});

//delete company
router.delete('/deletecompany/:id',(req,res)=>{
    try{
        const findIndex = company.findIndex((c)=>c.cid === req.params.id)
        if(findIndex == -1){
            return res.json({data:'company not found..!'})
        }
        else{
            product.splice(findIndex,1);
            return res.json({data:'company successfully deleted ..!'});
        }
    }catch(err){
        return res.json({data:'try again..!'});  
    }
});


//update company
router.put('/updatecompany/:id', (req, res) => {
    
    const findIndex = company.findIndex((c)=>c.cid  === req.params.id)
    if(findIndex === -1){
        return res.json({data : 'Company not found.'})
    } 
    else {
        company[findIndex]["pid"] = req.body.pid;
        return res.json({ data:'Company Update Successfully'});
    }

});

//fetch company detail based on product name

router.get("/companydetails/:title",(req,res) => {

    const title = req.params.title;
    const Index = product.findIndex((p)=>p.title === title);

    if(Index === -1){
        return res.json({data:"Product not found"})
    } else {
        const companyid=product[Index]["cid"];
        const companyData = company.filter((c)=>c.cid === companyid);       
        return res.json({data: companyData})
      
    }
});

module.exports = router;