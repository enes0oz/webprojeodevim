
window.validateWithJS = function() {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!name || !email || !phone || name.trim() === "") {
        alert("JS Hatası: Lütfen tüm zorunlu alanları doldurun!");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("JS Hatası: Geçersiz e-posta formatı!");
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert("JS Hatası: Telefon sadece rakamlardan oluşmalıdır!");
        return;
    }
    alert("JS Denetimi Başarılı: Form gönderilmeye hazır.");
};

if (document.getElementById('app')) {
    const { createApp } = Vue;
    createApp({
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    phone: '',
                    gender: '',
                    message: ''
                }
            }
        },
        methods: {
            validateWithVue() {
                const { name, email, phone } = this.formData;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!name || !email || !phone) {
                    alert("Vue.js Hatası: Boş alan bırakmayınız!");
                } else if (!emailRegex.test(email)) {
                    alert("Vue.js Hatası: E-posta hatalı!");
                } else if (isNaN(phone) || phone.trim() === "") {
                    alert("Vue.js Hatası: Telefon sadece sayı olmalı!");
                } else {
                    alert("Vue.js Denetimi Başarılı!\nİsim: " + name);
                }
            }
        }
    }).mount('#app');
}

const API_KEY = '1bb378f29e1ef925f41f527e8550fefa'; 
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=tr-TR&page=1`;

async function filmleriGetir() {
    const filmListesi = document.getElementById('film-listesi');
    
    if (!filmListesi) return;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const filmler = data.results.slice(0, 6);
        
        filmListesi.innerHTML = '';

        filmler.forEach(film => {
            const card = `
                <div class="col-md-4">
                    <a href="https://www.themoviedb.org/movie/${film.id}" target="_blank" class="text-decoration-none">
                        <div class="card movie-card h-100 shadow-sm">
                            <div class="position-relative">
                                <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.title}">
                                <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3">
                                    ⭐ ${film.vote_average.toFixed(1)}
                                </span>
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold text-dark">${film.title}</h5>
                                <p class="card-text text-muted small flex-grow-1">
                                    ${film.overview ? film.overview.substring(0, 110) + '...' : 'İçerik özeti bulunamadı.'}
                                </p>
                                <div class="mt-auto border-top pt-2 text-secondary">
                                    <small>Yayın: ${film.release_date ? film.release_date.split('-')[0] : 'N/A'}</small>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            filmListesi.innerHTML += card;
        });
    } catch (error) {
        console.error("API hatası:", error);
        filmListesi.innerHTML = '<p class="text-center text-danger">Filmler yüklenirken bir hata oluştu.</p>';
    }
}

window.addEventListener('DOMContentLoaded', filmleriGetir);