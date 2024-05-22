const LocalUsers= require('./../models/localUsersModel');

const addNewLocals= async (req, res)=> {
  try {
    const {name, locality, phoneNumber}= req.body;
  
    const response= await LocalUsers.create({
      name: name,
      phoneNumber: phoneNumber,
      localityName: locality
    });
    return res.status(201).json({
      status: true,
      message: 'New User added successfully',
      data: response
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      status: false,
      message: error.message
    });
  }
}

// export default addNewLocals;  this is ES6
// export {addNewLocals};
// export addNewLocals;  this is no syntax
module.exports= addNewLocals;
// module.exports= {addNewLocals};