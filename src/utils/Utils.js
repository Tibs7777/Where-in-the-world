export const filterDuplicates = (arr1, arr2) => {
    return arr2.filter(val => !arr1.includes(val));
}

export const checkMatches = (arr, value, sortPriority) => {
    value = value.toLowerCase()

    let includes = arr.filter(country => {
        return country.name.toLowerCase().includes(value)
    })
    if(sortPriority === "population") {
        includes.sort((a, b) => {
            return b.population - a.population
        })
    }
    let startsWith = includes.filter(country => {
        return country.name.toLowerCase().startsWith(value)
    })
    includes = filterDuplicates(startsWith, includes)

    let halfMatches = includes.filter((country, i) => {
        if(!country.name.includes(" ")) return false
        let split = country.name.toLowerCase().split(' ')
        return split.find(str => {
            return str.startsWith(value)
        })
    })
    includes = filterDuplicates(halfMatches, includes)
    let finalResults = [...startsWith, ...halfMatches, ...includes]
    return finalResults
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
