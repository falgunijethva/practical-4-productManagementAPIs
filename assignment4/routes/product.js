const express = require("express");
const router = express.Router();
router.use(express.json());
const product = require("../productData")
const seller = require("../sellerData");
const company = require("../companyData");

router.get("/",(req,res)=> res.send("Product Details"));

//list of product
router.get("/list",(req,res) => {
    res.json({data:product});
});


//add product
router.post("/addProduct",(req,res)=> {
    const productlist = req.body;
    product.push(productlist)
    console.log(productlist); 
    res.json({data:"product successfully inserted .."});
});

//delete product
router.delete('/deleteProduct/:id',(req,res)=>{
    try{
        const findIndex = product.findIndex((p)=>p.pid === req.params.id)
        if(findIndex == -1){
            return res.json({data:'Product not found..!'})
        }
        else{
            product.splice(findIndex,1);
            return res.json({data:'Product successfully deleted ..!'});
        }
    }catch(err){
        return res.json({data:'try again..!'});  
    }
});

//update product
router.put('/updateProduct/:id', (req, res) => {
    try {
        const findIndex = product.findIndex((p) => p.pid === req.params.id)
        if(findIndex === -1){
            return res.json({data : 'Product ID not found.'})
        } 
        else {
            product[findIndex]["category"] = req.body.category;
            return res.json({ data:'Product Update Successfully'});
        }
    } catch (err) {
        return res.json({data:'try again..!'});  
    }
});

//fetch all product of a company
router.get("/fetchproduct/:id",(req,res) => {   
    const companyid = req.params.id;
    const Index = company.findIndex((c)=>c.cid === companyid);

    if(Index === -1){
        return res.json({data:"Company not  found!"})
    } else {
        const productids=company[Index]["pid"];
      const productData = product.filter((p) => productids.indexOf(p.pid) !== -1  );        
      return res.json({data: productData})
    }
});

//fetch all product of a seller 
router.get("/fetchseller/:id",(req,res) => {
    const sellerid = req.params.id;
    const Index = seller.findIndex((s)=>s.sid === sellerid);

    if(Index === -1){
        return res.json({data:"Seller Not Found"})
    } else {
      const productid=seller[Index]["pid"];
      const productData = product.filter((p) => productid.indexOf(p.pid) !== -1  );        
      return res.json({data: productData})
    }
});

module.exports = router;
