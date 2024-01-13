import {formatNumber} from '/utils.js'
var timer
async function getCountry(){
    const APIURL=`https://restcountries.com/v3.1/`
    const res = await fetch(`${APIURL}all`)
    const data= await res.json()
    return data;
}
function createCountry(country){
    const article= `<a class="country" href='/#/country/${country.name.common}'>
        <img src=${country.flags.png} alt=${country.flags.alt} loading='lazy'>
        <div class="country-details">
            <h2>${country.name.common}</h2>
            <ul>
                <li><span>Populaiton:</span> ${formatNumber(country.population)}</li>
                <li><span>Region:</span> ${country.region}</li>
                <li><span>Capital:</span> ${country.capital ? country.capital : 'No capital'}</li>
            </ul>
        </div>
        </a>`
    return article
}

function createDropDown(country){
        const dropdown = document.querySelector('.dropdown')
        const menu= dropdown.querySelector('.menu')
        const select = dropdown.querySelector('.select')
        const caret = dropdown.querySelector('.caret')
        const selected = dropdown.querySelector('.selected')
        country.map(country=>{
        const ele=document.createElement('li')
        ele.setAttribute('country',country)
        ele.innerHTML=country
        menu.append(ele)
    })
    const options = dropdown.querySelectorAll('.menu li')
    select.addEventListener('click',(e)=>{
        e.stopPropagation()
        select.classList.toggle('select-clicked')
        caret.classList.toggle('caret-rotate')
        menu.classList.toggle('menu-open')
    })
    options.forEach(option=>{
        option.addEventListener('click',()=>{
            selected.innerText=option.innerHTML
            select.classList.remove('select-clicked')
            caret.classList.remove('caret-rotate')
            menu.classList.remove('menu-open')
        })
    })
}

function appendContent(country){
    const countryContainer = document.querySelector('.country-container')
    const content =country.map(country=>{
        return createCountry(country)
     })

    countryContainer.innerHTML=content.join('')
}
function showContnet(data,isSearch='',isSelected=''){
        let country;
        const countryContainer = document.querySelector('.country-container')
      
        if(isSearch && isSelected){
            country = data.filter(country=>{
                return country.name.common.toLowerCase().includes(isSearch.toLowerCase())
            }).filter(country=>{return country.region == isSelected})
        }   
        else if(isSearch){
            country = data.filter(country=>{
                return country.name.common.toLowerCase().includes(isSearch.toLowerCase())
            })
        }
        else if(isSelected){
            country = data.filter(country=>{return country.region == isSelected})
        }
        if(country.length){
            appendContent(country)
        }else{
            countryContainer.innerHTML=`<p class='no-country'>No country found! </p>`
        }
}

const HomeScreen ={

    render:async ()=>{
        let isSelected,isSearch;
       const data= getCountry()
       data.then(res=>{
            const allRegions = res.map(country=>country.region)
            createDropDown([...new Set(allRegions)])
            appendContent(res)
            document.querySelector('.dropdown').addEventListener('click',function(e){
                clearTimeout(timer)
                isSelected =document.querySelector('.selected').innerHTML
                isSearch=document.querySelector('#search').value.trim()
                if(isSelected =='Filter by region' && isSearch==''){
                    appendContent(res)
                } 
                else{
                    showContnet(res,isSearch,isSelected)
                }
             
            })
            document.getElementById('search').addEventListener('input',function(e){
        
                isSelected =document.querySelector('.selected').innerHTML
                isSearch=document.querySelector('#search').value.trim()
                if(isSelected =='Filter by region' && isSearch==''){
                    appendContent(res)
                } else {
                    if(isSelected =='Filter by region')
                    {
                        showContnet(res,isSearch)
                    }
                    else{
                        showContnet(res,isSearch,isSelected)
                    }
                    
                }
                
            })
       })
       
        return `
        <div>
        
        <div class="filter-option">
        <div class="search-box">
            <input type="text" id="search" placeholder="Search for a country..." autocomplete='off'>
            <span class="fa-solid fa-magnifying-glass"></span>
        </div>
        <div class="dropdown">
            <div class="select" >
                <span class="selected active">Filter by region</span>
                <div class="caret">
                </div>
            </div>
            <ul class="menu">
            </ul>
        </div>
        </div>
        <div class='content'>
            <div class="country-container">
            </div>
        </div>
        </div>
        `
    }
}
export default HomeScreen;