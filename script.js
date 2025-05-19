document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const savePrefsBtn = document.getElementById('savePrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const body = document.body;
    
    // Load saved preferences
    loadPreferences();
    
    // Animation button click handler
    animateBtn.addEventListener('click', function() {
        // Toggle between animations
        if (animatedElement.classList.contains('spin')) {
            animatedElement.classList.remove('spin');
            animatedElement.classList.add('bounce');
        } else {
            animatedElement.classList.remove('bounce');
            animatedElement.classList.add('spin');
        }
        
        // Change box color randomly
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        animatedElement.style.backgroundColor = randomColor;
    });
    
    // Save preferences button click handler
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        // Save to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        
        // Apply theme immediately
        applyTheme(preferences.theme);
        
        // Show confirmation
        alert('Preferences saved!');
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set form values
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            
            // Apply theme
            applyTheme(preferences.theme);
        }
    }
    
    // Apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        body.classList.remove('light', 'dark', 'blue', 'green');
        
        // Add the selected theme class
        if (theme) {
            body.classList.add(theme);
        } else {
            body.classList.add('light');
        }
    }
    
    // Additional animation on page load
    setTimeout(() => {
        animateBtn.classList.add('pulse');
    }, 1000);
});
