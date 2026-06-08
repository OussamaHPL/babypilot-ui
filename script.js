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
            btnLock.classList.add('locked');
            if(lockBtnText) lockBtnText.innerText = "UNLOCK WHEELS";
            if(lockStatus) {
                lockStatus.innerText = "The Wheels Are Locked";
                lockStatus.style.color = "#FF4757";
            }
            if (strollerImage) {
                strollerImage.src = "locked-poussette.png"; 
                strollerImage.style.filter = "drop-shadow(0 10px 15px rgba(255, 71, 87, 0.3))";
            }
        } else {
            btnLock.classList.remove('locked');
            if(lockBtnText) lockBtnText.innerText = "LOCK WHEELS";
            if(lockStatus) {
                lockStatus.innerText = "The Wheels are unlocked";
                lockStatus.style.color = "#7AC4D8";
            }
            if (strollerImage) {
                strollerImage.src = "poussette.png";
                strollerImage.style.filter = "drop-shadow(0 10px 15px rgba(0,0,0,0.1))";
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

// --- JOYSTICK ANALOGIQUE (ESP32) ---
const joystickZone = document.getElementById('joystick-zone');
const joystickKnob = document.getElementById('joystick-knob');
const joystickStatus = document.getElementById('joystick-status');

let isDragging = false;
let centerX, centerY;
const maxDistance = 45; // Ch7al y9der yt7erk l'axe

function initJoystick() {
    const rect = joystickZone.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
}

function handleStart(e) {
    if(e.cancelable) e.preventDefault(); // Bach maydizch scrolling f telephone
    isDragging = true;
    joystickKnob.classList.add('active');
    joystickKnob.style.transition = 'none'; // N7ydo transition bach ytba3 sbe3 direct
    initJoystick(); 
    handleMove(e);
}

function handleMove(e) {
    if (!isDragging) return;
    if(e.cancelable) e.preventDefault();

    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let angle = Math.atan2(deltaY, deltaX);

    // N7bsoh f l7ed dyal cercle
    if (distance > maxDistance) {
        deltaX = Math.cos(angle) * maxDistance;
        deltaY = Math.sin(angle) * maxDistance;
    }

    joystickKnob.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Calcul dyal la direction
    let direction = "STOP";
    if (distance > 15) { // Deadzone (khass yfot chwiya lwest bach yt7seb mouvement)
        let deg = angle * (180 / Math.PI);
        if (deg > -45 && deg <= 45) direction = "DROITE";
        else if (deg > 45 && deg <= 135) direction = "ARRIÈRE";
        else if (deg > 135 || deg <= -135) direction = "GAUCHE";
        else if (deg > -135 && deg <= -45) direction = "AVANT";
    }

    if(joystickStatus) {
        joystickStatus.innerText = `COMMANDE: ${direction}`;
        if(direction === "STOP") {
            joystickStatus.style.color = "#F4A261";
        } else {
            joystickStatus.style.color = "#2ED573";
        }
    }
}

function handleEnd() {
    isDragging = false;
    joystickKnob.classList.remove('active');
    joystickKnob.style.transition = 'transform 0.2s ease-out';
    joystickKnob.style.transform = `translate(0px, 0px)`; // Yrje3 lwest
    if(joystickStatus) {
        joystickStatus.innerText = "COMMANDE: STOP";
        joystickStatus.style.color = "#F4A261";
    }
}

// Les events dyal la Souris (PC)
joystickKnob.addEventListener('mousedown', handleStart);
document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseup', handleEnd);

// Les events dyal Tactile (Téléphone)
joystickKnob.addEventListener('touchstart', handleStart, {passive: false});
document.addEventListener('touchmove', handleMove, {passive: false});
document.addEventListener('touchend', handleEnd);
