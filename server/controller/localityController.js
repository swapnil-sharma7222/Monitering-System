
const Locality = require("../models/localityModels");
const asynchandler = require("express-async-handler");
const getLocality = asynchandler(async (req, res) => {
    const contacts = await Locality.find();
    console.log(contacts.length);
    res.status(200).json({message:"get the locality"});
})
const createLocality = asynchandler(async (req, res) => {

    console.log("the request body is ", req.body);
    const {name} = req.body;
    if (!name) {
        res.status(400);
        throw new Error("all are mandatory");
    }
    const contact = await Locality.create({
        name,
    });
    res.status(201).json(contact);

});
const updateLocality = asynchandler(async (req, res) => {
   // const contact=await Contact.findById(req.params.id); 
   //const updatedcontact=await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new :true}
//    );
    res.status(200).json({message:`update locality for ${req.params.id}`});

});
const deleteLocality = asynchandler(async (req, res) => {
    
    res.status(200).json({message:`delete locality for ${req.params.id}`});
    res.status(200).json();

});

module.exports = {
    getLocality,
    createLocality,
    updateLocality,
    deleteLocality,
};
