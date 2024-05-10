function responsesToGraph (response){
  const arrayOfData= response.map(doc=> doc.data);
  console.log(arrayOfData);
  let count1= 0, count2= 0, count3= 0, n= arrayOfData.length;

  arrayOfData.map((ind)=> {
    console.log(ind);
    if(ind[0]== 1)  count1++;
    if(ind[1]== 1)  count2++;
    if(ind[2]== 1)  count3++;
  })

  let inputToGraph= [count1, n- count1, count2, n- count2, count3, n- count3];
  return inputToGraph;
}

module.exports= responsesToGraph;