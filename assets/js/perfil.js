const url = new URLSearchParams(window.location.search);
const urlUser = 'https://github.com/';
const urlGit = "https://api.github.com/";
const token = "";
const user = url.get('user');


const names = document.getElementById('names');
const boxImg = document.getElementById('boxImg');
const imgPerfil = document.getElementById('imgPerfil');
const name = document.getElementById('name');
const username = document.getElementById('link-git');
const iconeGit = document.getElementById('icone-git');
const iconeLink = document.getElementById('icone-link');
const bio = document.getElementById('bio');
const listBio = document.getElementById('listBio');

const getUser = async () => {

        const res = await fetch(`${urlGit}users/${user}`, {
            headers: {
                "Authorization": token
            }
        });

        const userData = await res.json();
        removeLoad();

        const profile = {
            img: userData.avatar_url,
            name: userData.name,
            user: userData.login
        }

        const bio = {
            location: userData.location,
            company: userData.company,
            blog: userData.blog,
            email: userData.email,
            twitter: userData.twitter_username,
            fwer: userData.followers,
            fwing: userData.following,
            repos: userData.public_repos,
            gists: userData.public_gists,
        } 

        getProfile(profile);
        getBio(userData);
        getList(bio);
        getDate(userData);
        console.log(userData);
}


function getProfile(profile) {
    username.href = urlUser + profile.user;
    createPerfilImg(profile.img);
    name.textContent = profile.name;
    CreateUsername(profile.user);
}

function getBio(bio) {
    if(bio.bio) {
        const li = createText(bio.bio); 
        listBio.appendChild(li);
    }
}

function getList(bio) {


    Object.entries(bio).forEach(([key, value]) => {
        console.log(key, value);
        
        if (key === 'location' && value) {
            const li = createItem('Localização:', value, 'normal');
            listBio.appendChild(li);

            return;
        }

        if (key === 'company' && value) {
            const li = createItem('Compania:', value, 'normal');
            listBio.appendChild(li);

            return;
        }
        if (key === 'blog' && value) {
            const li = createItem('Website:', value, 'link', value);
            listBio.appendChild(li);

            return;
        }
        if (key === 'email' && value) {
            const li = createItem('Email:', value, 'normal');
            listBio.appendChild(li);

            return;
        }
        if (key === 'twitter' && value) {
            const li = createItem('Twitter:', value, 'link', `https://twitter.com/${value}`);
            listBio.appendChild(li);

            return;
        }
        if (key === 'fwer' && value) {
            const li = createItem('Seguidores:', value, 'normal');
            listBio.appendChild(li);

            return;
        }
        if (key === 'fwing' && value) {
            const li = createItem('Seguindo:', value, 'normal');
            listBio.appendChild(li);

            return;
        }
        if (key === 'repos' && value) {
            const li = createItem('Repos:', value, 'normal' );
            listBio.appendChild(li);

            return;
        }
        if (key === 'gists') {
            const li = createItem('Gists:', value, 'normal');
            listBio.appendChild(li);

            return;
        }
    

    });
    // bio.forEach(() => {
        
    // })

    // console.log(bio);
    
    // const teste = createItem('location:', bio.location);

    // listBio.appendChild(teste);
}

function createItem(title, content, type, link) {
    const li = createLiBio();
    const h3 = createH3Bio();



    li.classList.add('flex', 'px-[1.1rem]', 'py-[0.75rem]', 'border-b-[1px]');
    h3.classList.add('w-[100px]', 'text-[#6C7690]', 'font-medium');

   

    h3.textContent = title;
    li.appendChild(h3);


    if (type === 'normal') {
        const p = createPBio();
        p.classList.add('font-light');
        p.textContent = content;
        li.appendChild(p);
        return li;
    }

    if(type === 'link') {
        const a = document.createElement('A');
        a.classList.add('font-light', 'hover:bg-zinc-200', 'duration-200');
        a.textContent = content;
        a.href = link;
        a.target = '_blank'; 
        li.appendChild(a);
        return li;
    }

}

function getDate(date) {
    const data = new Date(date.created_at).getFullYear();
    
    const li = createYear(data);
    listBio.appendChild(li);
}

function createText(Text) {
    const li = createLiBio();
    const p = createPBio();

    li.id = 'bio';
    li.classList.add('py-[0.75rem]', 'px-[1.1rem]', 'border-b-[1px]');
    p.classList.add('break-words'); 
    p.textContent = Text;

    li.appendChild(p);

    return li;
}

function createYear(Date) {
    const li = createLiBio();
    const h3 = createH3Bio();

    li.classList.add('flex', 'px-[1.1rem]', 'py-[0.75rem]');
    h3.classList.add('text-[#6C7690]', 'font-light');
    h3.innerHTML = `Membro do Github desde ${Date}`;
    li.appendChild(h3);

    return li;
}

function createLiBio() {
    const li = document.createElement('LI');

    return li;
}

function createH3Bio() {
    const h3 = document.createElement('H3');

    return h3;
}

function createPBio() {
    const p = document.createElement('P');

    return p;
}

function removeLoad() {
    listBio.replaceChildren();
    name.classList.remove('skeleton-name');
    username.classList.remove('skeleton-link');     
    iconeGit.classList.remove('hidden');
    iconeLink.classList.remove('hidden');
}

function createPerfilImg(src) {
    const img = document.createElement('IMG');

    img.id = 'imgPerfil';
    img.classList.add('w-full', 'h-full');
    img.src = src;

    boxImg.appendChild(img);
}

function CreateUsername(name) {

    const text = document.createTextNode(name);
    iconeLink.parentNode.insertBefore(text, iconeLink);
}


getUser();

