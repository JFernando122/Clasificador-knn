const {DATA_TYPES} = require('./k-nn')


// shuffle function to randomize the data.
//This was taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const dataDivider = (data, folds) =>{
    const foldSize = Math.floor(data.length / folds)
    const foldedData = []
    let shuffledData = shuffle(data) //Shuffles the array so it doesn't always divide the same
    for(let i = 0; i < folds; i++){
        foldedData.push([...shuffledData.slice(i*foldSize,(i+1)*foldSize)])
    }
    foldedData[foldedData.length - 1] = [...foldedData[foldedData.length - 1] , ...data.slice(folds*foldSize)]
    return foldedData
  }

const labelSeparator = (data) =>{
    const labels = data.map(item => item.pop())
    return{
        attributes: data,
        labels
    }
}

const getDataTypes = row =>{
    return row.map(item =>{
            return isNaN(item)?
            DATA_TYPES.NOMINAL:
            DATA_TYPES.NUMERIC
    })
}

const convertData = (data) =>{
    const dataTypes = getDataTypes(data[0])
    return data.map(
        row => 
            row.map((item,index) => 
                (dataTypes[index] == DATA_TYPES.NUMERIC)? parseFloat(item): item))
}

const generateConfusionMatrix = (predictedLabels,actualLabels) =>{
    let number = actualLabels.reduce((count,value) => {
        count[value] = (count[value])? count[value] + 1 : 1
        return count
    },{})

    const classes = Object.keys(number)
    let Matrix = []
    //Initialize Matrix
    classes.forEach((row,i) =>{
        Matrix[i] = []
        classes.forEach((item, j) => {
            Matrix[i][j] = 0
        })
    })
    //Fill Confusion Matrix
    actualLabels.forEach((item,index) =>{
        Matrix[item][predictedLabels[index]] += 1
    })
    return Matrix
}

const getBestMatrix = (predictedLabels,actualLabels) =>{
    let matrixes = actualLabels.map((item,index)=>{
        return generateConfusionMatrix(predictedLabels[index],actualLabels[index])
    })

    return matrixes.reduce((best,current)=>{
        let correctPredictions = 0
        current.forEach((row,index) =>{
            correctPredictions += row[index]
        })
        return (correctPredictions > best.correctPredictions)? {
            matrix: current,
            correctPredictions
        }: best
    },{
        matrix: [],
        correctPredictions: -1
    }).matrix

}



module.exports = {
    labelSeparator,
    dataDivider,
    getDataTypes,
    convertData,
    generateConfusionMatrix,
    getBestMatrix
}

