document.addEventListener('DOMContentLoaded', (event) => {
    const videoBg = document.getElementById('video-bg');
    const introScreen = document.getElementById('intro-screen'); // Click ekranı
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeIcon = document.getElementById('volume-icon');

    // ----------------------------------------------------
    // A. VİDEO VE CLICK KONTROLÜ (LOCAL STORAGE YOK)
    // ----------------------------------------------------

    if (videoBg) {
        // Tarayıcı kısıtlaması için sessiz başlat
        videoBg.muted = true; 
        videoBg.play().catch(error => {
            console.log("Video otomatik başlatılamadı, Click bekleniyor: ", error);
        });
    }

    if (introScreen) {
        // Click ekranına tıklandığında
        introScreen.addEventListener('click', () => {
            introScreen.classList.add('hidden'); 
            
            if (videoBg) {
                // Sesi aç
                videoBg.muted = false; 
                videoBg.volume = 1; 
                if (volumeSlider) volumeSlider.value = 1; 
                
                if (volumeIcon) {
                    volumeIcon.classList.remove('fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-up');
                }
            }
        });
    }

    // ----------------------------------------------------
    // B. SES VE DİĞER İŞLEVLER (Aynı Kalır)
    // ----------------------------------------------------

    // Ses kaydırma çubuğu dinleyicisi
    if (volumeSlider) {
        volumeSlider.addEventListener('input', () => {
            if (videoBg) {
                videoBg.muted = false; 
                videoBg.volume = volumeSlider.value;
                if (volumeIcon) {
                    if (videoBg.volume === 0) {
                        volumeIcon.classList.remove('fa-volume-up');
                        volumeIcon.classList.add('fa-volume-mute');
                    } else {
                        volumeIcon.classList.remove('fa-volume-mute');
                        volumeIcon.classList.add('fa-volume-up');
                    }
                }
            }
        });
    }

    // Ses ikonu (aç/kapa) dinleyicisi
    if (volumeIcon) {
        volumeIcon.addEventListener('click', () => {
            if (videoBg) {
                videoBg.muted = false; 
                if (videoBg.volume === 0) {
                    videoBg.volume = 1; 
                    volumeSlider.value = 1;
                    volumeIcon.classList.remove('fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-up');
                } else {
                    videoBg.volume = 0; 
                    volumeSlider.value = 0;
                    volumeIcon.classList.remove('fa-volume-up');
                    volumeIcon.classList.add('fa-volume-mute');
                }
            }
        });
    }

    // Discord Kopyalama İşlevi
    const copyDiscordButton = document.getElementById('copy-discord');
    if (copyDiscordButton) {
        copyDiscordButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            const discordUsername = "@dwnrzx"; 
            
            navigator.clipboard.writeText(discordUsername).then(() => {
                const tooltip = copyDiscordButton.querySelector('.tooltip');
                const originalText = tooltip.textContent;
                tooltip.textContent = "Copied!"; 
                setTimeout(() => {
                    tooltip.textContent = originalText; 
                }, 1500); 
            }).catch(err => {
                console.error('Discord kullanıcı adını kopyalanamadı: ', err);
            });
        });
    }
});