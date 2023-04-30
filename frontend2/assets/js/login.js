const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

function signIn(event) {
    event.preventDefault();
    const API_URL = 'https://tarefas-app.onrender.com/auth/signin';
    const user = {
        usuario: usernameInput.value,
        senha: passwordInput.value
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
        }
        return response.json();
    })
    .then(data => {
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        Swal.fire({
        title: 'Login efetuado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK',
        });
        window.location.replace('https://incredible-baklava-5ac7c2.netlify.app/screen.html')
    })
    .catch(error => {
        console.error(error);
        Swal.fire({
        title: 'Erro',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
        });
    });
}

form.addEventListener('submit', signIn);
