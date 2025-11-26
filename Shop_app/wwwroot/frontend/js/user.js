document.addEventListener('DOMContentLoaded', () => {
    const user_profile = document.getElementById("user_profile");
    user_profile.style.display = "none";
    session_user();
});

async function login() {
    const email = document.getElementById("emailId").value.trim();
    const password = document.getElementById("passwordId").value;

    if (!email || !password) {
        document.getElementById("output").textContent = "Заповніть email та пароль!";
        return;
    }

    try {
        const response = await fetch("https://localhost:7089/api/apiuser/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error(`Помилка авторизації: ${response.status}`);
        const data = await response.json();
        localStorage.setItem("jwt_token", data.token.result);
        session_user();
    } catch (err) {
        document.getElementById("output").textContent = err.message;
    }
}

async function register() {
    const username = document.getElementById("username_register_id").value.trim();
    const password = document.getElementById("password_register_id").value;

    try {
        const response = await fetch("https://localhost:7089/api/apiuser/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: username, password })
        });

        if (!response.ok) throw new Error(`Помилка реєстрації: ${response.status}`);
        const data = await response.json();
        document.getElementById("output").textContent = "Реєстрація успішна! Тепер увійдіть.";
        console.log(data);
    } catch (error) {
        document.getElementById("output").textContent = error.message;
    }
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function user_profile() {
    const user_profile_div = document.getElementById("user_profile");
    const token = localStorage.getItem("jwt_token");

    if (!token) {
        user_profile_div.innerHTML = `<div class="alert alert-danger">Токен не знайдено</div>`;
        return;
    }

    const userData = parseJwt(token);
    if (!userData) {
        user_profile_div.innerHTML = `<div class="alert alert-danger">Помилка розбору токена</div>`;
        return;
    }

    let fields = '';
    for (const [key, value] of Object.entries(userData)) {
        fields += `
            <div class="d-flex justify-content-between py-2 border-bottom">
                <strong>${key}</strong>
                <span class="text-muted">${value}</span>
            </div>
        `;
    }

    user_profile_div.innerHTML = `
        <div class="card shadow-sm mx-auto mt-4" style="max-width: 500px;">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Профіль користувача</h4>
            </div>
            <div class="card-body">
                ${fields}
            </div>
        </div>
    `;
}

async function session_user() {
    const token = localStorage.getItem('jwt_token');
    const payload = parseJwt(token);

    if (token && payload) {
        document.getElementById("user_profile").style.display = "block";
        document.getElementById("box_register").style.display = "none";
        document.getElementById("box_login").style.display = "none";
        document.querySelector(".box_profile").classList.remove("d-none");

        const userEmailEl = document.getElementById("user_email");
        userEmailEl.textContent = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || payload.email || "Користувач";

        user_profile();
    } else {
        document.getElementById("user_profile").style.display = "none";
        document.getElementById("box_register").style.display = "block";
        document.getElementById("box_login").style.display = "block";
        document.querySelector(".box_profile").classList.add("d-none");
    }
}

function logout() {
    localStorage.removeItem("jwt_token");
    window.location.reload();
}