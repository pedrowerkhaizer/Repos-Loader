// Modulo 2:
// // 1.1
// import ClasseUsuario from './functions.js'
// ClasseUsuario.info()

// // 1.2
// import {idade} from './functions.js'
// console.log(idade)

// // 1.3
// import Usuario, {idade as IdadeUsuario} from './functions.js'

//axios serve para fazer requisições de APIs
// import axios from 'axios'

// class Api {
//     static async getUserInfo(username) {
//         try {
//             const response = await axios.get(`https://api.github.com/users/${username}`)
//             console.log(response)
//         } catch (err) {
//             console.warn('Erro ao requisitar Api')
//         }
//     }
// }

// Api.getUserInfo('pedrowerkhaizer')

// // Modulo 3:
// // A
// const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
// async function umPorSegundo() {
//     await delay()
//     console.log('1s')
//     await delay()
//     console.log('2s')
//     await delay()
//     console.log('3s')
// }
// umPorSegundo();

// // B
// import axios from 'axios';

// async function getUserFromGithub(user) {
//     try {
//         const response = await axios.get(`https://api.github.com/users/${user}`);
//         console.log(response.data);
//     } catch (err) {
//         console.warn('Usuário não existe');
//     }
// }
// getUserFromGithub('diego3g');
// getUserFromGithub('diego3g124123');

// // C
// class Github {
//     static async getRepositories(repo) {
//         try {
//             const response = await axios.get(`https://api.github.com/repos/${repo}`)
//             console.log(response.data)
//         } catch (err) {
//             console.warn('Repositório não existe');
//         }
//     }
// }
// Github.getRepositories('rocketseat/rocketseat.com.br');
// Github.getRepositories('rocketseat/dslkvmskv');

// // D
// const buscaUsuario = async usuario => {
//     try {
//         const response = await axios.get(`https://api.github.com/users/${usuario}`)
//         console.log(response.data)
//     } catch (err) {
//         console.warn('Usuário não existe');
//     }
// }
// buscaUsuario('pedrowerkhaizer');

import api from './api'

class App {
    constructor() {
        this.repositories = [];

        this.formElm = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]')
        this.listElm = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formElm.onsubmit = (event) => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'))
            loadingEl.setAttribute('id', 'loading')

            this.formElm.appendChild(loadingEl)
        }
        else {
            document.getElementById('loading').remove()
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0) return;

        this.setLoading()

        try {
            const response = await api.get(`/repos/${repoInput}`)

            const { name, description, html_url, owner: { avatar_url } } = response.data;

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();
        } catch (err) {
            alert('Esse respositório não existe!')
        }

        this.setLoading(false)
    }

    render() {
        // apagar lista
        this.listElm.innerHTML = ''
        // percorrer o repositorio
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name))

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description))

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descriptionEl)
            listItemEl.appendChild(linkEl)

            this.listElm.appendChild(listItemEl);
        });

    }
}

new App();
