const DATA_TYPES = {
    NOMINAL: 0,
    NUMERIC: 1
}
/*
    Available Functions
    Eucledian
    Manhattan
    Chebychev
*/

/*
*   @param {Array} x
*   @param {Array} y
*   @param {string} distanceFunction
*/
const distanceFunction = (x,y,dataTypes,distanceFunction) => {
    switch(distanceFunction){
        case "Eucledian":
            let sumE = 0
            for(let i = 0; i < x.length; i++)
                if(dataTypes[i] == DATA_TYPES.NOMINAL){
                    if(x[i] != y[i])
                        sumE += 1
                }else
                    sumE+= Math.pow(x[i] - y[i], 2)
            return Math.sqrt(sumE)
        case "Manhattan":
            let sumM = 0
            for(let i = 0; i < x.length; i++){
                if(dataTypes[i] == DATA_TYPES.NOMINAL){
                    if(x[i] != y[i])
                        sumM += 1
                }else
                    sumM += Math.abs(x[i] - y[i])
            }
            return sumM
        case "Chebychev":
            let max = -Infinity
            for(let i = 0; i < x.length; i++){
                let current = 0
                if(dataTypes[i] == DATA_TYPES.NOMINAL){
                    if(x[i] != y[i])
                        current = 1
                }else
                    current = Math.abs(x[i] - y[i])
                if(current > max) max = current
            }
            return max
    }
}

const knn = (trainData,trainLabels,testData,dataTypes,{func = "Eucledian", k = 2}) =>{
    return testData.map(item => {
        let distances = trainData.map(trainItem =>{
            return distanceFunction(trainItem,item,dataTypes,func)
        })
        let nearestNeighboursLabels = [];
        let trainLabelstemp = [...trainLabels]
        for(let i = 0; i < k; i++){
            const min = Math.min(...distances)
            const minIndex = distances.indexOf(min)
            nearestNeighboursLabels.push(trainLabelstemp[minIndex])
            distances.splice(minIndex,1)
            trainLabelstemp.splice(minIndex,1)
        }
        let number = nearestNeighboursLabels.reduce((count,value) => {
            count[value] = (count[value])? count[value] + 1 : 1
            return count
        },{})
        let max = 0;
        let maxLabel = 0;
        Object.keys(number).forEach(item => {
            if(number[item] > max){
                max = number[item]
                maxLabel = item
            }
        })
        return maxLabel
    })
}

module.exports = {
    knn,
    DATA_TYPES
}