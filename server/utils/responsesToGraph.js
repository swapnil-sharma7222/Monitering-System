const  responsesToGraph =(responses) =>{
  const arrayOfData= responses.map(doc=> doc.data);
  let inputToGraph = [];
  let n;
  if(arrayOfData[0]){
    n= arrayOfData[0].length;
  }else{
    n= 0;
  }
  // Iterate over each question index
  for (let i = 0; i < n; i++) {
    // Initialize counts for option 1 and option 2 for this question
    let countOption1 = 0;
    let countOption2 = 0;

    // Iterate over each user's response
    arrayOfData.forEach(response => {
      // If the user chose option 1, increment countOption1
      if (response[i] === 1) {
        countOption1++;
      }
      // If the user chose option 2, increment countOption2
      else if (response[i] === 2) {
        countOption2++;
      }
    });

    // Push an array for this question to the inputToGraph array
    inputToGraph.push({Ques : i + 1, uv:countOption1, pv:countOption2});
  } 
  return inputToGraph;
}
module.exports = responsesToGraph;