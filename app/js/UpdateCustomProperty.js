export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
    //! get css value + returns a string, convert to number + set default value to 0
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value) //! sets property and value (left: 0, per example)
}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc) //! gets the current value, adds to it an sets that as value
}