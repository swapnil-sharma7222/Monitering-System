const LocalUsers= require('../models/localUsersModel');

async function getAllUsers(locality) {
  try {
    const response= await LocalUsers.find({
      localityName: locality
    });
    const arrayOfPhoneNumbers= response.map((doc)=> {
      return doc.phoneNumber;
    });
    return arrayOfPhoneNumbers;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports= getAllUsers;