import HomeScreen from "./screens/HomeScreen.js";
import CountryScreen from "./screens/CountryScreen.js";
import { parseRequestUrl } from "./utils.js";

const toggle = document.querySelector('.mode')
toggle.addEventListener('click',function(e){
    if(!document.body.classList.contains('dark')){

        toggle.innerHTML = `<i class="fa-regular fa-sun"></i><span>Light Mode</span>`
    }
    else{
        toggle.innerHTML = `<i class="fa-regular fa-moon"></i><span>Dark Mode</span>`
    }
    document.body.classList.toggle('dark')
})
const routes={
    '/':HomeScreen,
    '/country/:name':CountryScreen
}
const router= async()=>{
    const request = parseRequestUrl()
    const parseUrl = (request.resource ? `/${request.resource}` :'/') +
    (request.name ? '/:name' : '')
    const Screen = routes[parseUrl] ? routes[parseUrl] : 'Error'
    const main = document.getElementById('main-container')
    main.innerHTML =await Screen.render()
}
window.addEventListener('load',router)
window.addEventListener('hashchange',router)