document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById('splashScreen');
    const bluetoothScreen = document.getElementById('bluetooth-screen');
    const mainApp = document.getElementById('main-app');

    const btnConnectBt = document.getElementById('btn-connect-bt');
    const btStatusText = document.getElementById('bt-status-text');
    const btIcon = document.getElementById('bt-icon');

    // 1. TRANSITION (Splash -> Bluetooth)
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        bluetoothScreen.classList.remove('hidden');
    }, 3000);

    // 2. BLUETOOTH
    if (btnConnectBt) {
        btnConnectBt.addEventListener('click', () => {
            btnConnectBt.disabled = true;
            btnConnectBt.innerText = "CONNECTING...";
            btStatusText.innerText = "Pairing with BabyPilot System...";
            btIcon.classList.add('bt-searching');

            setTimeout(() => {
                btIcon.classList.remove('bt-searching');
                btIcon.classList.add('bt-connected');
                btStatusText.style.color = "#2ED573";
                btStatusText.innerText = "CONNECTED SUCCESSFULLY !";
                btnConnectBt.style.borderColor = "#2ED573";
                btnConnectBt.style.color = "#2ED573";
                btnConnectBt.innerText = "ACCESSING DASHBOARD...";

                setTimeout(() => {
                    bluetoothScreen.classList.add('hidden');
                    mainApp.classList.remove('hidden');
                }, 1500);

            }, 3000);
        });
    }
});

// --- BATTERIE ---
let level = 85;
const batteryFill = document.querySelector('.battery-fill');
const batteryText = document.getElementById('battery-level');
const batteryIcon = document.querySelector('.battery-icon');
const batteryIconFill = document.querySelector('.battery-icon-fill');

function updateBatteryColor(currentLevel) {
    let colorHex = '';
    if (currentLevel > 75) { colorHex = '#2ED573'; } 
    else if (currentLevel > 50) { colorHex = '#2ED573'; } 
    else if (currentLevel > 25) { colorHex = '#F4A261'; } 
    else { colorHex = '#FF4757'; }

    if(batteryText) { batteryText.style.color = colorHex; }
    if(batteryFill) { batteryFill.style.background = colorHex; }
    if(batteryIcon) { batteryIcon.style.color = colorHex; }
}

if(batteryIconFill && batteryFill && batteryText) {
    updateBatteryColor(level);
    batteryIconFill.style.width = (19 * (level / 100)) + 'px';
    batteryFill.style.width = level + '%';
    batteryText.innerText = level + '%';

    setInterval(() => {
        if (level > 0) {
            level -= 1;
            batteryFill.style.width = level + '%';
            batteryText.innerText = level + '%';
            batteryIconFill.style.width = (19 * (level / 100)) + 'px';
            updateBatteryColor(level);
        }
    }, 5000); 
}

// --- LOCK SYSTEM ---
const btnLock = document.getElementById('btn-lock');
const lockBtnText = document.getElementById('lock-btn-text');
const lockStatus = document.getElementById('lock-status');
const strollerImage = document.getElementById('stroller-image');
let isLocked = false;

if(btnLock) {
    btnLock.addEventListener('click', () => {
        isLocked = !isLocked; 
        if (isLocked) {
            // VERROUILLÉ
            btnLock.classList.add('locked');
            if(lockBtnText) lockBtnText.innerText = "UNLOCK WHEELS";
            if(lockStatus) {
                lockStatus.innerText = "The Wheels Are Locked";
                lockStatus.style.color = "#FF4757";
            }
            // Remplace l'image par la version verrouillée
            if (strollerImage) {
                strollerImage.src = "locked-poussette.png"; // Ou .png selon comment tu as enregistré l'image
                strollerImage.style.filter = "drop-shadow(0 10px 15px rgba(255, 71, 87, 0.3))"; // Optionnel : garde une petite ombre rouge
            }
        } else {
            // DÉVERROUILLÉ
            btnLock.classList.remove('locked');
            if(lockBtnText) lockBtnText.innerText = "LOCK WHEELS";
            if(lockStatus) {
                lockStatus.innerText = "The Wheels are unlocked";
                lockStatus.style.color = "#7AC4D8";
            }
            // Remet l'image de base
            if (strollerImage) {
                strollerImage.src = "poussette.png";
                strollerImage.style.filter = "drop-shadow(0 10px 15px rgba(0,0,0,0.1))"; // Remet l'ombre normale
            }
        }
    });
}

// --- METEO ---
const btnWeather = document.getElementById('btn-weather');
const weatherBtnText = document.getElementById('weather-btn-text');
const weatherDisplay = document.getElementById('weather-display');
const weatherLocation = document.getElementById('weather-location');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
let isCheckingWeather = false;

if (btnWeather) {
    btnWeather.addEventListener('click', () => {
        if (!isCheckingWeather) {
            isCheckingWeather = true;
            btnWeather.classList.add('gps-searching');
            if (weatherBtnText) weatherBtnText.innerText = "ANALYSE...";
            weatherDisplay.classList.add('hidden');

            setTimeout(() => {
                isCheckingWeather = false;
                btnWeather.classList.remove('gps-searching');
                if (weatherBtnText) weatherBtnText.innerText = "ACTUALISER MÉTÉO";
                if (weatherLocation && weatherTemp && weatherDesc) {
                    weatherLocation.innerText = "POSITION : AGADIR";
                    weatherTemp.innerText = "24°C";
                    weatherDesc.innerText = "Ensoleillé / Optimales ☀️";
                }
                weatherDisplay.classList.remove('hidden');
            }, 2500);
        }
    });
}

// --- ALARME ---
const btnAlarm = document.getElementById('btn-alarm');
const alarmBtnText = document.getElementById('alarm-btn-text');
const soundBarContainer = document.getElementById('sound-bar-container');
const soundBarFill = document.getElementById('sound-bar-fill');
const alarmAudio = document.getElementById('alarm-sound');
let isAlarmOn = false;

if (btnAlarm && alarmAudio) {
    btnAlarm.addEventListener('click', () => {
        isAlarmOn = !isAlarmOn;
        if (isAlarmOn) {
            btnAlarm.classList.add('alarm-active');
            if(alarmBtnText) alarmBtnText.innerText = "ARRÊTER L'ALARME";
            soundBarContainer.classList.remove('hidden');
            alarmAudio.play().catch(e => console.log("Interaction requise"));
            soundBarFill.style.width = "100%";
        } else {
            btnAlarm.classList.remove('alarm-active');
            if(alarmBtnText) alarmBtnText.innerText = "ACTIVER L'ALARME";
            soundBarContainer.classList.add('hidden');
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
            soundBarFill.style.width = "0%";
        }
    });
}

// --- GPS MAPS ---
const btnGps = document.getElementById('btn-gps');
const gpsText = document.getElementById('gps-text');
const mapContainer = document.getElementById('map-container');
const mapPlaceholder = document.getElementById('map-placeholder');
const placeholderText = document.getElementById('placeholder-text');
const gpsStatusText = document.getElementById('gps-status-text');
let isSearching = false;

if(btnGps) {
    btnGps.addEventListener('click', () => {
        if (!isSearching) {
            isSearching = true;
            btnGps.classList.add('gps-searching');
            if(gpsText) gpsText.innerText = "SATELLITE...";
            
            if(mapContainer) mapContainer.style.display = "none";
            if(gpsStatusText) gpsStatusText.style.display = "none";
            if(mapPlaceholder) {
                mapPlaceholder.style.display = "flex";
                placeholderText.innerHTML = "<span style='color:#F4A261; font-weight:bold;'>Recherche... ⏳</span>";
            }
            
            setTimeout(() => {
                isSearching = false;
                btnGps.classList.remove('gps-searching');
                if(gpsText) gpsText.innerText = "ACTUALISÉE";
                if(mapPlaceholder) mapPlaceholder.style.display = "none";
                if(mapContainer) mapContainer.style.display = "block";
                if(gpsStatusText) gpsStatusText.style.display = "block";
            }, 4000); 
        }
    });
}