const Locality= require('./../models/localityModels');
const LocalUsers= require('./../models/localUsersModel');

async function getAllLocalUser (){
  try {
    const response= await LocalUsers.countDocuments();
    return response;
  } catch (e) {
    console.error(e);
    throw new e;
  }
}

async function getAllLocality (){
  try {
    const response= await Locality.countDocuments();
    return response;
  } catch (e) {
    console.error(e);
    throw new e;
  }
}

module.exports= {getAllLocalUser, getAllLocality};