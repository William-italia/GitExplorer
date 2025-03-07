const devList = document.getElementById('list-users-github');
const input = document.getElementById('input');
const busca = document.getElementById('search');
const eu = document.getElementById('eu');
const p = document.getElementById('rate');
const token = '';

const getRate = async () => {

    const res = await fetch("https://api.github.com/rate_limit", {
        headers: {
            "Authorization": token
        }
    })

    const rate = await res.json();

    console.log(rate.rate.limit);
    
    p.textContent = `Taxa da API: ${rate.rate.remaining} / ${rate.rate.limit}`
    
}

const getDevs = async () => {

    const res = await fetch("https://api.github.com/users?per_page=5", {
        headers: {
          "Authorization": token 
        }
      });

    const devs = await res.json();
      console.log(devs);
      
    devs.forEach(dev => {
        createDev(dev.login);
    });    
}

const createDev = (login) => {
    const li = document.createElement('LI');

    li.classList.add('user', 'cursor-pointer', 'transition-color', 'duration-200', 'py-2', 'px-3', 'text-white/30', 'hover:text-white/100', 'hover:bg-white/20', 'rounded-2xl', 'bg-white/10', 'backdrop-blur-[300px]');
    li.dataset.login = login;
    li.textContent = login;

    devList.prepend(li);
}

const clickDev = (e) => {
    if (e.target && e.target.classList.contains('user') || e.target.id.includes('eu')) {
        console.log(e.target);
        
        const login = e.target.dataset.login;

        input.value = login;
        input.focus();
        toggleButton()
    }
} 

function toggleButton() {
    if(input.value.trim() !== '') {
        search.classList.add('active');
        input.classList.add('bg-white/100');
        input.classList.remove('bg-white/10');
    } else {
        search.classList.remove('active');
        input.classList.add('bg-white/10');
        input.classList.remove('bg-white/100');
    }
}


function init() {
     
    document.addEventListener('click', clickDev);  
    // eu.addEventListener('click', )  
    input.addEventListener('input', toggleButton);

    toggleButton();
    getRate();
    getDevs();
   
}

document.addEventListener('DOMContentLoaded', () => {
    init();
})


