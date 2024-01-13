export const parseRequestUrl=()=>{
    const url = document.location.hash
    const request = url.split('/')
    return {
        resource:request[1],
        name:request[2]
    }
}
export const formatNumber=(number)=>{
    return new Intl.NumberFormat('en-IN').format(number)
}