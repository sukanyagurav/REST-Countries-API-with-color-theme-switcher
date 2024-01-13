import { parseRequestUrl,formatNumber } from "../utils.js";
 async function getProduct(name){
    
        const APIURL = `https://restcountries.com/v3.1/name/${name}`
        const res= await fetch(APIURL)
        if(!res.ok){
            throw new Error()
        }
        const data = await res.json()
        return data
    
}
async function createCountry(countryName){
    const Languages=[]
    for(const language in countryName.languages){
        Languages.push(countryName.languages[language])
    }
    const borders=[]
    let borderContent
    if(countryName.borders)
    {
        for(const border in countryName.borders){
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryName.borders[border]}`)
        const data =await  res.json() 
        const borderName = data[0].name.common
        borders.push(borderName)
        }
        borderContent= borders.map((border)=>{
            return `<li><a id=${border} class='country-border' href='/#/country/${border}'>${border}</a></li>`
         }).join('')
    }else{
        borderContent= `<p>No border</p>`
    }
    
     
    
    return `
        <div class='detail-page'> 
            <a href='/#' class='back-btn'><i class="fa-solid fa-arrow-left"></i>Back</a>
            <article class='detail-card'>
                <img src=${countryName.flags.svg} alt=${countryName.flags.alt} class='detail-flag'>
                <div class='country-content'>
                    <h2 class='country-name'>${countryName.name.common}</h2>
                    <div class='detail-container'>
                        <ul class='country-detail'>
                            <li>Native Name: <span>
                            ${ Object.values(countryName.name.nativeName)[0].common}</span></li>
                            <li>Population: <span>${formatNumber(countryName.population)}</span></li>
                            <li>Region: <span>${countryName.region}</span></li>
                            <li>Sub Region: <span>${countryName.subregion}</span></li>
                            <li>Capital: <span>${countryName.capital}</span></li>
                        </ul>
                        <ul class='country-detail'>
                            <li>Top Level Domain: <span>${countryName.tld}</span></li>
                            <li>Currencies: <span>${Object.values(countryName.currencies)[0].name}</span></li>
                            <li>Languages: <span>${Languages.join(', ')}</span></li>
                        </ul>
                    </div>
                    <div class='border-countries'>
                        <span>Border Countries: </span>
                        <ul >
                            ${borderContent}
                        </ul>
                    </div>
                </div>
        
            </article>
        </div>
    `

}

const CountryScreen ={
    render:async()=>{
        try{

            const request =parseRequestUrl()
            const product=await getProduct(request.name.replace(/%20/g, " "))
            if(product[0] !='undefined' ){
                console.log(product[0])
                const data = await createCountry(product[0])
                return await createCountry(product[0])
            }
            else{
                throw new Error()
            }
        }catch(err){

           return `<p class='no-country'>Sorry for the inconvenience, Please try again after sometime!'</p>`
        }
      
    }
}
export default CountryScreen;