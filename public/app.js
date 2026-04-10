const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const feedback = document.getElementById('feedback');
const registerFeedback = document.getElementById('registerFeedback');
const welcomeCard = document.getElementById('welcomeCard');
const welcomeName = document.getElementById('welcomeName');
const welcomeEmail = document.getElementById('welcomeEmail');
const welcomePhone = document.getElementById('welcomePhone');
const logoutButton = document.getElementById('logoutButton');
const showLoginButton = document.getElementById('showLoginButton');
const showRegisterButton = document.getElementById('showRegisterButton');

const SESSION_KEY = 'agroconecta-session';

const setFeedback = (element, message, type = '') => {
    element.textContent = message;
    element.className = `feedback ${type}`.trim();
};

const setMode = (mode) => {
    const isLoginMode = mode === 'login';

    loginForm.classList.toggle('hidden', !isLoginMode);
    registerForm.classList.toggle('hidden', isLoginMode);
    showLoginButton.classList.toggle('active', isLoginMode);
    showRegisterButton.classList.toggle('active', !isLoginMode);

    if (!welcomeCard.classList.contains('hidden')) {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
    }
};

const showSession = (usuario) => {
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    welcomeCard.classList.remove('hidden');
    welcomeName.textContent = `Hola, ${usuario.nombre}`;
    welcomeEmail.textContent = `Correo: ${usuario.correo}`;
    welcomePhone.textContent = `Telefono: ${usuario.telefono}`;
};

const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    welcomeCard.classList.add('hidden');
    loginForm.reset();
    registerForm.reset();
    setMode('login');
    setFeedback(feedback, '');
    setFeedback(registerFeedback, '');
};

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const correo = formData.get('correo')?.toString().trim();
    const contrasena = formData.get('contrasena')?.toString().trim();

    if (!correo) {
        setFeedback(feedback, 'Ingresa un correo valido.', 'error');
        return;
    }

    if (!contrasena) {
        setFeedback(feedback, 'Ingresa tu contrasena.', 'error');
        return;
    }

    setFeedback(feedback, 'Validando acceso...');

    try {
        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'No fue posible iniciar sesion.');
        }

        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data.usuario));
        showSession(data.usuario);
        setFeedback(feedback, '');
    } catch (error) {
        setFeedback(feedback, error.message, 'error');
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const payload = {
        nombre: formData.get('nombre')?.toString().trim(),
        correo: formData.get('correo')?.toString().trim(),
        contrasena: formData.get('contrasena')?.toString().trim(),
        telefono: formData.get('telefono')?.toString().trim()
    };

    if (!payload.nombre || !payload.correo || !payload.telefono || !payload.contrasena) {
        setFeedback(registerFeedback, 'Completa todos los campos.', 'error');
        return;
    }

    if (payload.contrasena.length < 4) {
        setFeedback(registerFeedback, 'La contrasena debe tener al menos 4 caracteres.', 'error');
        return;
    }

    setFeedback(registerFeedback, 'Guardando usuario...');

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'No fue posible crear el usuario.');
        }

        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        registerForm.reset();
        setFeedback(registerFeedback, 'Usuario creado correctamente.', 'success');
        showSession(data);
    } catch (error) {
        setFeedback(registerFeedback, error.message, 'error');
    }
});

showLoginButton.addEventListener('click', () => {
    if (welcomeCard.classList.contains('hidden')) {
        setMode('login');
        setFeedback(registerFeedback, '');
    }
});

showRegisterButton.addEventListener('click', () => {
    if (welcomeCard.classList.contains('hidden')) {
        setMode('register');
        setFeedback(feedback, '');
    }
});

logoutButton.addEventListener('click', clearSession);

const savedSession = sessionStorage.getItem(SESSION_KEY);

if (savedSession) {
    try {
        showSession(JSON.parse(savedSession));
    } catch (error) {
        clearSession();
    }
} else {
    setMode('login');
}