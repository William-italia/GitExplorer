const devList = document.getElementById('list-users-github');
const input = document.getElementById('input');
const busca = document.getElementById('search');
const eu = document.getElementById('eu');
const p = document.getElementById('rate');
const form = document.getElementById('form');
const msg = document.getElementById('msg');
const url = "https://api.github.com/";
const token = "";

// https://api.github.com/users/{username}/repos

async function checkForm(e) {
    e.preventDefault();

    const user = input.value.trim();

    const isValidUser = await verifiedUser(user);

    if (isValidUser) {
        cleanMsg();
        input.value = '';
        window.location.href = `perfil.html?user=${user}`;
    }

}


const verifiedUser = async (user) => {

    try {
        const res = await fetch(`${url}users/${user}`,{
            headers: {
                "Authorization": token
            }
        });

        if(!res.ok) {
            msg.classList.remove('hidden');
            input.style.border = '2px solid red';
            throw new Error("Usuário invalido!");
        }

        return true;

    } catch(e) {
        console.log(e);
        return false;
    }
}

const getRate = async () => {

    const res = await fetch(`${url}rate_limit`, {
        headers: {
            "Authorization": token
        }
    })

    const rate = await res.json();
    
    p.textContent = `Taxa da API: ${rate.rate.remaining} / ${rate.rate.limit}`
    
}

const getDevs = async () => {

    const res = await fetch(`${url}users?per_page=30`, {
        headers: {
          "Authorization": token 
        }
      });

    const devs = await res.json();

    const shuffledUsers = devs.sort(() => .5 - Math.random());
    
    const randomDevs = shuffledUsers.slice(0, 5);
    
    console.log(randomDevs);

      
    randomDevs.forEach(dev => {
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
        cleanMsg();
    }
}

function cleanMsg() {
    input.style.border = 'none';
    msg.classList.add('hidden');
}


function init() {
     
    document.addEventListener('click', clickDev);  
    form.addEventListener('submit', checkForm);
    input.addEventListener('input', toggleButton);
    input.addEventListener('input', cleanMsg);

    toggleButton();
    getRate();
    getDevs();
   
}

document.addEventListener('DOMContentLoaded', () => {
    init();
})


