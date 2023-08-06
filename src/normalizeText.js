const normalizeText = (text) => {
    // text = text.trim()
    if(!text)
    return ""
    const camelCase =text.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")
    let flat=''
    camelCase.forEach(word=>{    
        flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
    }) 

    return flat
}

module.exports = normalizeText