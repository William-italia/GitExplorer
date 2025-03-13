const listBio = document.getElementById('list-bio');
const img = document.getElementById('img');
const name = document.getElementById('name'); 
const nick = document.getElementById('login'); 
const nickLink = document.getElementById('nick-link'); 
const icongit = document.getElementById('igit');

const url = new URLSearchParams(window.location.search);
const urlGit = "https://api.github.com/";
const token = "";
const user = url.get('user');

const getUser = async () => {

const res = await fetch(`${urlGit}users/${user}`, {
    headers: {
        "Authorization": token
    }
})

const dataUser = await res.json();
removeload()

    console.log(dataUser.login);

    img.src = dataUser.avatar_url
    name.textContent = dataUser.name;
    
    nick.textContent = dataUser.login
    nick.href = `https://github.com/${dataUser.login}`
    nick.setAttribute('target', '_blank')

    createLiBio(dataUser);
}

function removeload() {
 
    listBio.replaceChildren();
    img.classList.remove('hidden');
    icongit.classList.remove('hidden');
    name.classList.remove('skeleton-name');
    nickLink.classList.remove('skeleton-link');
    nick.classList.remove('skeleton-link');
}




const getReposUser = async () => {
    const res = await fetch(`${urlGit}users/${user}/repos?sort=update`, {
        headers: {
            "Authorization": token
        }
    })

    const dataRepos = await res.json();

    console.log(dataRepos);
}

function createLiBio(data) {

    const userData = {
        bio: data.bio,
        Location: data.location,
        Company: data.company,
        Blog: data.blog,
        Twitter: data.twitter_username,
        Following: data.following,
        Followers: data.followers,
        Repos: data.public_repos,
        Gists: data.public_gists,
        created_at: new Date(data.created_at).getFullYear(),
    }

   

    Object.entries(userData).forEach(([key, value]) => {

        if (key === 'bio' && value !== null) {
            const p = createP();
            p.textContent = value;
            const li = createLi();
            li.appendChild(p);
            listBio.appendChild(li);
            return;
        }

        if (key === 'created_at') {
            const h2 = createH();
            h2.textContent = `Membro do github desde ${value}`;
            h2.style.width = 'auto';
            h2.style.fontWeight = '300';
            const li = createLi();
            li.classList.remove('border-b-2');
            li.appendChild(h2);
            listBio.appendChild(li);
            return;
        }

        if (key === 'Blog' && value !== null) {
            const a = createA();
            const h2 = createH();
            const li = createLi();

            h2.textContent = key;
            li.appendChild(h2);
            a.textContent = value;
            a.href = value;
            a.setAttribute("target", "_blank")
            li.appendChild(a);

            listBio.appendChild(li);
            return;
        }

        if (value) {
            const p = createP();
            const h2 = createH();
            const li = createLi();

            h2.textContent = key;
            li.appendChild(h2);
            p.textContent = value;
            li.appendChild(p);

            listBio.appendChild(li);
        }
    });
    
}

function createP() {
    const p = document.createElement('P');
    p.classList.add('font-light', 'break-words', 'w-full');
    return p;
}

function createLi() {
    const li = document.createElement('LI');
    li.classList.add('border-b-2', 'border-zinc-100', 'flex', 'lg:flex-col', 'xl:flex-row', 'gap-2', 'p-4');
    return li;
}

function createH() {
    const h2 = document.createElement('H2');
    h2.classList.add('w-[120px]', 'text-zinc-400', 'font-medium', 'text-[1rem]', 'break-words', 'w-full');
    return h2;
}

function createA() {
    const a = document.createElement('a');
    a.classList.add(
        "transition",
        "duration-200",
        "hover:bg-zinc-200",
        "inline-block",
        "rounded-lg",
        "hover:text-black/100",
        'break-words', 'w-full'
    );

    return a;
}

getUser();
// getReposUser();
