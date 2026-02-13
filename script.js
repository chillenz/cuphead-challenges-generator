shots = {
    "Peashooter": "#53a6ca",
    "Spread": "#c43b23",
    "Chaser": "#78a268",
    "Lobber": "#575ea2",
    "Charge": "#b18f42",
    "Roundabout": "#5bbdc1",
    "Crackshot": "#9d5d67",
    "Converge": "#cc970b",
    "Twist-Up": "#399981"
}

charms = {
    "Heart": "#b75b52",
    "Smoke Bomb": "#de7d23",
    "P. Sugar": "#ab76a3",
    "Coffee": "#a63d5c",
    "Twin Heart": "#5d8365",
    "Whetstone": "#8e8648",
    "Astral Cookie": "#7a5d40",
    "Heart Ring": "#a6524b",
    "Divine Relic": "#567fa0"
}

supers = ["I", "II", "III"]

mode = ["Regular", "Expert"]

airshots = {"Peashooter": "#b88b37","Mini-Bomb": '#7a5d27'}

bosses = {
    "rootpack": ["G", "The Root Pack", 1],
    "goopy": ["G", "Goopy Le Grande", 1],
    "hilda": ["A", "Hilda Berg", 1],
    "cagney": ["G", "Cagney Carnation", 1],
    "ribby": ["G", "Ribby & Croaks", 1],
    "baroness": ["G", "Baroness Von Bon Bon", 2],
    "djimmi": ["A", "Djimmi the Great", 2],
    "grim": ["G", "Grim Matchstick", 2],
    "wally": ["A", "Wally Warbles", 2],
    "beppi": ["G", "Beppi the Clown", 2],
    "rumor": ["G", "Rumor Honeybottoms", 3],
    "kahl": ["A", "Dr. Kahl's Robot", 3],
    "sally": ["G", "Sally Stageplay", 3],
    "werner": ["G", "Werner Werman", 3],
    "captain": ["G", "Captain Brineybeard", 3],
    "cala": ["A", "Cala Maria", 3],
    "phantom": ["G", "Phantom Express", 3],
    "kingdice": ["G", "King Dice", 5],
    "thedevil": ["G", "The Devil", 5],
    "moonshine": ["G", "The Moonshine Mob", 4],
    "glumstone": ["G", "Glumstone the Giant", 4],
    "howling": ["G", "Howling Aces", 4],
    "esther": ["A", "Esther Winchester", 4],
    "myboysimon": ["G", "Mortimer Freeze", 4],
    "saltbaker": ["G", "Chef Saltbaker", 4]
}


const mainweapons = ["Peashooter", "Spread", "Chaser", "Lobber", "Charge", "Roundabout"];
const dlcweapons = ["Crackshot", "Converge", "Twist-Up"];

const mainAirweapons = ["Peashooter", "Mini-Bomb"];


const maincharms = ["Heart", "Smoke Bomb", "P. Sugar", "Coffee", "Twin Heart", "Whetstone"];
const dlccharms = ["Astral Cookie", "Heart Ring", "Divine Relic"];


const easychallenges = ["No parrying", "Use only shot 1", "No ex's and supers"]
const mediumchallenges = ["Get all parries", "Use exactly 20 ex's", "Parry exactly 10 times", "No audio and black & white mode", "No dashing", "Hold down lock the entire fight",  "Don't miss a shot",  "Don't kill any minions"]
const hardchallenges = ["Get the worst rank possible (D-)", "No shooting", "No jumping", "Defeat the boss without taking damage",  "Reverse controls",  "Get the best rank possible", "Don't stay on the ground for more than 1 second"]

let settings = {
    isles: [1, 2, 3, 4, 5],
    bossTypes: ['G', 'A'],
    challengeDifficulties: ['easy', 'medium', 'hard'],
    weaponTypes: ['main', 'dlc'],
    charmTypes: ['main', 'dlc']
};

function updateshotUI(isAir) {
    const shot1front = document.querySelector('#shot1con .front');
    const shot2front = document.querySelector('#shot2con .front');
    const shot2Con = document.getElementById('shot2con');
    if (!shot1front || !shot2front || !shot2Con) return;

    if (isAir) {
        shot1front.textContent = 'SHOT';
        shot2Con.style.opacity = '0';
    } else {
        shot1front.textContent = 'SHOT 1';
        shot2front.textContent = 'SHOT 2';
        shot2Con.style.opacity = '1';
    }
}

function filterBosses() {
    return Object.keys(bosses).filter(key => {
        const boss = bosses[key];
        return settings.isles.includes(boss[2]) && settings.bossTypes.includes(boss[0]);
    });
}

function filterweapons(isAir) {
    if (isAir) {
        let weapons = [];
        if (settings.weaponTypes.includes('main')) weapons.push(...mainAirweapons);
        return weapons.length > 0 ? weapons : mainAirweapons;
    } else {
        let weapons = [];
        if (settings.weaponTypes.includes('main')) weapons.push(...mainweapons);
        if (settings.weaponTypes.includes('dlc')) weapons.push(...dlcweapons);
        return weapons.length > 0 ? weapons : mainweapons;
    }
}

function filtercharms() {
    let filteredcharms = [];
    if (settings.charmTypes.includes('main')) filteredcharms.push(...maincharms);
    if (settings.charmTypes.includes('dlc')) filteredcharms.push(...dlccharms);
    return filteredcharms.length > 0 ? filteredcharms : maincharms;
}

function filterchallenges(isAir = false) {
    let challenges = [];
    if (settings.challengeDifficulties.includes('easy')) challenges.push(...easychallenges);
    if (settings.challengeDifficulties.includes('medium')) challenges.push(...mediumchallenges);
    if (settings.challengeDifficulties.includes('hard')) challenges.push(...hardchallenges);
    
    const defaultChallenges = [...easychallenges, ...mediumchallenges, ...hardchallenges];
    challenges = challenges.length > 0 ? challenges : defaultChallenges;
    
    if (isAir) {
        challenges = challenges.filter(c => c !== "No jumping" && c !== "No dashing" && c !== "Don't stay on the ground for more than 1 second"
            && c !== "Use only shot 1"
        );
    }
    
    return challenges;
}

function filternoshoot(challenge) {
    if (challenge === "No shooting") {
        return ["Coffee", "Divine Relic", "Whetstone"];
    }
    
    let filteredcharms = [];
    if (settings.charmTypes.includes('main')) filteredcharms.push(...maincharms);
    if (settings.charmTypes.includes('dlc')) filteredcharms.push(...dlccharms);
    return filteredcharms.length > 0 ? filteredcharms : maincharms;
}

function randomise(){
    const sound = new Audio('parry.wav');
    sound.play();

    const randombtn = document.getElementById("randombtn");
    randombtn.style.pointerEvents = "none";
    randombtn.style.opacity = "0.6";
    
    const animationDuration = 2000;
    let currentIteration = 0;
    
    let finalshot1, finalshot2, finalsuper, finalMode, finalbosskey, finalboss, finalchallenge, finalcharm;
    
    
    const filteredBossKeys = filterBosses();

    finalbosskey = filteredBossKeys[Math.floor(Math.random() * filteredBossKeys.length)];
    finalboss = bosses[finalbosskey];
    
    const filteredweapons = filterweapons(finalboss[0] === 'A');
    const filteredchallenges = filterchallenges(finalboss[0] === 'A');
    
    if (finalboss[0] === 'A') {
        finalshot1 = filteredweapons[Math.floor(Math.random() * filteredweapons.length)];
        finalshot2 = 'None';
    } else {
        finalshot1 = filteredweapons[Math.floor(Math.random() * filteredweapons.length)];
        let secondweapons = filteredweapons.filter(item => item !== finalshot1);
        secondweapons.push('None');
        finalshot2 = secondweapons[Math.floor(Math.random() * secondweapons.length)];
    }
    
    finalsuper = supers[Math.floor(Math.random() * supers.length)];
    finalMode = mode[Math.floor(Math.random() * mode.length)];
    finalchallenge = filteredchallenges[Math.floor(Math.random() * filteredchallenges.length)];
    
    const filteredcharms = filternoshoot(finalchallenge);
    finalcharm = filteredcharms[Math.floor(Math.random() * filteredcharms.length)];

    updateshotUI(finalboss[0] === 'A');
    
    const animationInterval = setInterval(() => {
        currentIteration++;
        
        let tempshot1, tempshot2;
        let tempbosskey = filteredBossKeys[Math.floor(Math.random() * filteredBossKeys.length)];
        let tempboss = bosses[tempbosskey];
        
        const tempweapons = filterweapons(tempboss[0] === 'A');
        
        if (tempboss[0] === 'A') {
            tempshot1 = tempweapons[Math.floor(Math.random() * tempweapons.length)];
            tempshot2 = 'None';
        } else {
            tempshot1 = tempweapons[Math.floor(Math.random() * tempweapons.length)];
            let secondweapons = tempweapons.filter(item => item !== tempshot1);
            secondweapons.push('None');
            tempshot2 = secondweapons[Math.floor(Math.random() * secondweapons.length)];
        }
        
        let tempsuper = supers[Math.floor(Math.random() * supers.length)];
        let tempMode = mode[Math.floor(Math.random() * mode.length)];
        let tempfilteredchallenges = filterchallenges(tempboss[0] === 'A');
        let tempchallenge = tempfilteredchallenges[Math.floor(Math.random() * tempfilteredchallenges.length)];
        
        let tempfilteredcharms = filternoshoot(tempchallenge);
        let tempcharm = tempfilteredcharms[Math.floor(Math.random() * tempfilteredcharms.length)];
        
        let shot1Color = (tempboss[0] === 'A') ? airshots[tempshot1] : shots[tempshot1];
        let shot2Color = (tempboss[0] === 'A') ? "#000000" : (shots[tempshot2] || "#000000");
        
        document.getElementById('shot1').textContent = tempshot1;
        document.getElementById('shot1').style.color = shot1Color;
        document.getElementById('shot2').textContent = tempshot2;
        document.getElementById('shot2').style.color = shot2Color;
        document.getElementById('charm').textContent = tempcharm;
        document.getElementById('charm').style.color = charms[tempcharm];
        document.getElementById('super').textContent = tempsuper;
        document.getElementById('mode').textContent = tempMode;
        document.querySelector('#bossinfo h1').textContent = tempboss[1];
        document.getElementById('bossimg').src = `mughead/${tempbosskey}.png`;
        document.getElementById('challengedesc').textContent = tempchallenge;
        updateshotUI(tempboss[0] === 'A');
        
        if (currentIteration >= 20) {
            clearInterval(animationInterval);
            
            let finalshot1Color = (finalboss[0] === 'A') ? airshots[finalshot1] : shots[finalshot1];
            let finalshot2Color = (finalboss[0] === 'A') ? "#000000" : (shots[finalshot2] || "#000000");
            
            document.getElementById('shot1').textContent = finalshot1;
            document.getElementById('shot1').style.color = finalshot1Color;
            document.getElementById('shot2').textContent = finalshot2;
            document.getElementById('shot2').style.color = finalshot2Color;
            document.getElementById('charm').textContent = finalcharm;
            document.getElementById('charm').style.color = charms[finalcharm];
            document.getElementById('super').textContent = finalsuper;
            document.getElementById('mode').textContent = finalMode;
            document.querySelector('#bossinfo h1').textContent = finalboss[1];
            document.getElementById('bossimg').src = `mughead/${finalbosskey}.png`;
            document.getElementById('bossimg').alt = finalboss[1];
            document.getElementById('challengedesc').textContent = finalchallenge;
            updateshotUI(finalboss[0] === 'A');
            
            randombtn.style.pointerEvents = "auto";
            randombtn.style.opacity = "1";
        }
    }, 50);
}

function opensetting(){
    if (document.getElementById('settingmenu').style.display == 'block'){
        document.getElementById('settingmenu').style.display = 'none'
        document.getElementById('realmenu').style.display = 'block'
    } else{
        document.getElementById('settingmenu').style.display = 'block'
        document.getElementById('realmenu').style.display = 'none'     
    }
}

function toggleTick(element, settingKey, value) {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        if (!settings[settingKey].includes(value)) {
            settings[settingKey].push(value);
        }
    } else {
        settings[settingKey] = settings[settingKey].filter(v => v !== value);

        const allOptions = {
            isles: [1, 2, 3, 4, 5],
            bossTypes: ['G', 'A'],
            challengeDifficulties: ['easy', 'medium', 'hard'],
            weaponTypes: ['main', 'dlc'],
            charmTypes: ['main', 'dlc']
        };

        const optionElementIds = {
            isles: ['isle1', 'isle2', 'isle3', 'isle4', 'isle5'],
            bossTypes: ['typeground', 'typeaerial'],
            challengeDifficulties: ['diffeasy', 'diffmedium', 'diffhard'],
            weaponTypes: ['weaponmain', 'weapondlc'],
            charmTypes: ['charmmain', 'charmdlc']
        };

        if (Array.isArray(settings[settingKey]) && settings[settingKey].length === 0) {
            settings[settingKey] = Array.isArray(allOptions[settingKey]) ? [...allOptions[settingKey]] : [];

            const ids = optionElementIds[settingKey] || [];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el && !el.classList.contains('active')) el.classList.add('active');
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const bgImg = document.getElementById('bg');
    const loadingScreen = document.getElementById('loadingscreen');
    
    if (bgImg.complete) {
        loadingScreen.classList.add('hidden');
    } else {
        bgImg.onload = () => {
            loadingScreen.classList.add('hidden');
        };
        bgImg.onerror = () => {
            loadingScreen.classList.add('hidden');
        };
    }
    
    document.getElementById('isle1').addEventListener('click', function() {
        toggleTick(this, 'isles', 1);
    });
    document.getElementById('isle2').addEventListener('click', function() {
        toggleTick(this, 'isles', 2);
    });
    document.getElementById('isle3').addEventListener('click', function() {
        toggleTick(this, 'isles', 3);
    });
    document.getElementById('isle4').addEventListener('click', function() {
        toggleTick(this, 'isles', 4);
    });
    document.getElementById('isle5').addEventListener('click', function() {
        toggleTick(this, 'isles', 5);
    });
    
    
    document.getElementById('typeground').addEventListener('click', function() {
        toggleTick(this, 'bossTypes', 'G');
    });
    document.getElementById('typeaerial').addEventListener('click', function() {
        toggleTick(this, 'bossTypes', 'A');
    });
    
    
    document.getElementById('diffeasy').addEventListener('click', function() {
        toggleTick(this, 'challengeDifficulties', 'easy');
    });
    document.getElementById('diffmedium').addEventListener('click', function() {
        toggleTick(this, 'challengeDifficulties', 'medium');
    });
    document.getElementById('diffhard').addEventListener('click', function() {
        toggleTick(this, 'challengeDifficulties', 'hard');
    });
    
    
    document.getElementById('weaponmain').addEventListener('click', function() {
        toggleTick(this, 'weaponTypes', 'main');
    });
    document.getElementById('weapondlc').addEventListener('click', function() {
        toggleTick(this, 'weaponTypes', 'dlc');
    });
    
    
    document.getElementById('charmmain').addEventListener('click', function() {
        toggleTick(this, 'charmTypes', 'main');
    });
    document.getElementById('charmdlc').addEventListener('click', function() {
        toggleTick(this, 'charmTypes', 'dlc');
    });
    
    
    randomise();
});

document.getElementById("randombtn").addEventListener("click", randomise);