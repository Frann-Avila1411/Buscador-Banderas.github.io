document.addEventListener('DOMContentLoaded', () => {
    fetchCountryCodes();
    fetchFlag('ad')
});

//Cambiar de Bandera al cambiar de pais en el combobox
document.getElementById('country').addEventListener('change', function (event) {
    const countryCode = document.getElementById('country').value;
    fetchFlag(countryCode);
});

//Obtener un archivo JSON desde la Url
function fetchCountryCodes() {
    fetch('https://flagcdn.com/en/codes.json')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById('country');
            for (const code in data) {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = data[code];
                countrySelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error fetching country codes:', error));
}

// Fetch para obtener la imagen de cada país seleccionado//
function fetchFlag(countryCode) {
    fetch(`https://flagcdn.com/256x192/${countryCode}.png`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            document.getElementById('flag-image').src = response.url;
        })
        .catch(error => {
            console.error('Error fetching flag:', error);
            document.getElementById('flag-result').classList.remove('hidden');
            document.getElementById('flag-image').alt = 'Error fetching flag. Please tryagain later.';
        });
}
