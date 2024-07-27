export const getArrSlider = (start, end, number) => {
    const limit = start > end ? number : end
    let output = []
    for(let i = start; i<=limit; i++){
        output.push(i)
    }
    if(start > end){
        for (let i=0; i<=end; i++){
            output.push(i)
        }
    }
    return output
}

export const handleRound = (number) => {
    if(+number > 1000000){
        return `${Math.round(number * 10 / 1000000)/10}M`
    }
    else{
        if(+number > 1000){
            return `${Math.round(number * 10 / 1000)/10}K`
        }
        else{
            return number
        }
    }
}