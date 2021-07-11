//js has an idiotic definition of the modulus operator where it returns negative results for negative inputs.
function mod(a, b) {
    return (a % b + b) % b;
}

class RNG {
    constructor(seed = 0n) {
        this.rngState = BigInt.asUintN(32, seed);
        this.rngIncrs = 0n;
    }

    rng() {
        this.rngIncrs++;
        this.rngState = BigInt.asUintN(32, (0x41C64E6Dn * this.rngState) + 0x3039n);
        return (this.rngState >> 0x10n) & 0x7FFFn;
    }
}

class ChocoboData {
    constructor(items, tileCards, names) {
        this.items = items;
        this.tileCards = tileCards;
        this.names = names;
    }

    namesString() {
        let arr = new Array(this.names.length);
        for (let i = 0; i < this.names.length; i++) {
            arr[i] = CHOCO_NAMES[this.names[i]]
        }
        return arr;
    }

    itemsString() {
        let arr = new Array(this.items.length);
        for (let i = 0; i < this.items.length; i++) {
            arr[i] = ITEM_NAMES[this.items[i]]
        }
        return arr;
    }
}

const CHOCO_NAMES = [
    "SAM", "ELEN", "BLUES", "TOM", "JOHN", "GARY", "MIKE", "SANDY", "JU", "LY", "JOEL", "GREY", "EDWARD", "JAMES",
    "HARVEY", "DAN", "RUDY", "GRAHAM", "FOX", "CLIVE", "SEAN", "YOUNG", "ROBIN", "DARIO", "ARL", "SARA", "MARIE",
    "SAMMY", "LIA", "KNIGHT", "PAULA", "PAU", "LE", "PETER", "AIMEE", "TERRY", "ANDY", "NANCY", "TIM", "ROBER",
    "GEORGE", "JENNY", "RICA", "JULIA"
];

const ITEM_NAMES = [
    "Sprint Shoes", "Counter Attack", "Magic Counter", "Precious Watch", "Cat's Bell", "Enemy Away", "Sneak Attack",
    "Chocobracelet", "Ether", "Elixir", "Hero Drink", "Bolt Plume", "Fire Fang", "Antarctic Wind", "Swift Bolt",
    "Fire Veil", "Ice Crystal", "Megalixir", "Turbo Ether", "Potion", "Phoenix Down", "Hyper", "Tranquilizer",
    "Hi-Potion"
];

const REWARD_TABLES = {
    "C": [ // C
        [0x17n, 0x00, 0x05, 0x01],
        [0x08n, 0x00, 0x14, 0x01],
        [0x15n, 0x00, 0x0A, 0x00],
        [0x16n, 0x00, 0x0A, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x0Bn, 0x00, 0x05, 0x01],
        [0x0Cn, 0x00, 0x05, 0x00],
        [0x0Dn, 0x00, 0x05, 0x00],
        [0x13n, 0x00, 0x05, 0x01],
        [0x14n, 0x00, 0x14, 0x01],
    ], "B": [ // B
        [0x08n, 0x00, 0x1E, 0x00],
        [0x0An, 0x00, 0x0A, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x12n, 0x00, 0x05, 0x01],
        [0x08n, 0x00, 0x1E, 0x00],
        [0x17n, 0x00, 0x05, 0x00],
        [0x15n, 0x00, 0x0A, 0x00],
        [0x16n, 0x00, 0x0A, 0x00],
        [0x17n, 0x00, 0x05, 0x00],
        [0x0Bn, 0x00, 0x0A, 0x01],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x0Dn, 0x00, 0x0A, 0x00],
        [0x09n, 0x00, 0x0A, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x17n, 0x00, 0x05, 0x00],
    ], "A": [ // A
        [0x08n, 0x00, 0x14, 0x00],
        [0x0An, 0x00, 0x0A, 0x00],
        [0x0En, 0x01, 0x0A, 0x00],
        [0x0Fn, 0x01, 0x0A, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x10n, 0x01, 0x0A, 0x00],
        [0x01n, 0x00, 0x0A, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x0Bn, 0x00, 0x0A, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x0Dn, 0x00, 0x0A, 0x00],
        [0x09n, 0x00, 0x0A, 0x01],
        [0x17n, 0x00, 0x05, 0x00],
        [0x08n, 0x00, 0x14, 0x00],
        [0x00n, 0x01, 0x07, 0x01],
        [0x09n, 0x00, 0x05, 0x01],
        [0x14n, 0x00, 0x14, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x04n, 0x01, 0x07, 0x01],
        [0x06n, 0x01, 0x07, 0x01],
    ], "S": [ // S
        [0x12n, 0x01, 0x05, 0x00],
        [0x0An, 0x00, 0x05, 0x00],
        [0x09n, 0x00, 0x05, 0x01],
        [0x01n, 0x00, 0x05, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x06n, 0x01, 0x05, 0x01],
        [0x0En, 0x01, 0x05, 0x00],
        [0x0Fn, 0x01, 0x05, 0x00],
        [0x0Bn, 0x00, 0x02, 0x00],
        [0x0Fn, 0x01, 0x05, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x10n, 0x00, 0x05, 0x00],
        [0x11n, 0x01, 0x05, 0x01],
        [0x12n, 0x00, 0x05, 0x00],
        [0x00n, 0x01, 0x05, 0x01],
        [0x0En, 0x00, 0x05, 0x00],
        [0x04n, 0x01, 0x05, 0x01],
        [0x09n, 0x00, 0x05, 0x01],
        [0x07n, 0x01, 0x05, 0x01],
        [0x10n, 0x01, 0x05, 0x00],
        [0x03n, 0x01, 0x05, 0x01],
        [0x02n, 0x01, 0x05, 0x01],
    ]
};

const AUDIO_MAP = {
    "clack": $("#audio-clack").get()[0],
    "click1": $("#audio-click1").get()[0],
    "ping1": $("#audio-ping1").get()[0],
    "ping2": $("#audio-ping2").get()[0],
}

function frameMatches(frame, items, names, rank = 'C') {
    let data = generateChocoboRaceData(new RNG(BigInt.asUintN(32, BigInt(frame))), rank);
    for (let i = 0; i < items.length; i++) {
        if (data.items[i] !== BigInt(items[i])) {
            return false;
        }
    }
    for (let i = 0; i < names.length; i++) {
        if (names[i] !== -1 && data.names[i] !== BigInt(names[i])) {
            return false;
        }
    }
    return true;
}

function framesBetweenTimes(time1, time2) {
    return Math.round(((time1 - time2) * 60) / 1000);
}

function framesToMilliseconds(frame) {
    return frame * (1000 / 60);
}

function offsetToNearestMatchingFrame(frame, items, names, rank) {

    let search_window_size = parseInt($("#input-calibration-search-window-size").val());

    if (frameMatches(frame, items, names, rank)) {
        return 0;
    }

    for (let i = 1; i < search_window_size; i += 1) {
        if (frame - i >= 0 && frameMatches(frame - i, items, names, rank)) {
            return -i;
        }
        if (frameMatches(frame + i, items, names, rank)) {
            return i;
        }
    }

    return null;
}

function generateChocoboRaceData(rng = null, rank = 'C', _B747C = 0xffffffff) {
    if (rng == null) {
        rng = new RNG();
    }

    let frame = BigInt.asUintN(32, rng.rngState);

    for (let i = 0; i < 0x28; i++) {
        rng.rng();
        rng.rng();
    }
    rng.rng();
    for (let i = 0; i < 5; i++) {
        rng.rng();
        rng.rng();
        rng.rng();
        rng.rng();
        rng.rng();
        rng.rng();
    }
    let names = new Array(43);
    for (let i = 0; i < names.length; i++) {
        names[i] = BigInt(i);
    }
    let hilo = 0n;
    let v0 = 0n;
    let v1 = 0n;
    let s0 = 0n;
    let s1 = 0n;
    let s2 = 0n;
    let s3 = 0x2FA0BE83n;
    let t2 = 0n;
    let t7 = 0n;
    let a0 = 0n;
    let a1 = 0n;
    let a2 = 0n;

    while (s1 < 0xC8) {
        s1 += 1n;
        v0 = rng.rng();
        hilo = BigInt.asUintN(64, v0 * s3);
        t2 = BigInt.asUintN(32, hilo >> 32n);
        v1 = v0 >> 0x1Fn;
        a0 = t2 >> 3n;
        s0 = a0 - v1;
        v1 = s0 << 1n;
        v1 += s0;
        v1 = v1 << 2n;
        v1 -= s0;
        v1 = v1 << 2n;
        v1 -= s0;
        s0 = v0 - v1;

        let swap1 = s0;

        v0 = rng.rng();
        hilo = BigInt.asUintN(64, v0 * s3);
        t2 = BigInt.asUintN(32, hilo >> 32n);
        v1 = v0 >> 0x1Fn;
        a0 = t2 >> 3n;
        a0 -= v1;
        v1 = a0 << 1n;
        v1 += a0;
        v1 = v1 << 2n;
        v1 -= a0;
        v1 = v1 << 2n;
        v1 -= a0;
        a0 = v0 - v1;

        let swap2 = a0;

        a0 = names[swap2];
        a1 = names[swap1];
        names[swap1] = a0;
        names[swap2] = a1;
    }

    let rewardTable = REWARD_TABLES[rank];
    let rewardPool = [0xFFn, 0xFFn, 0xFFn];

    s1 = 0n;
    s2 = 0n;
    s3 = 0xFFFFFFFFn;

    while (s1 !== 3n) {
        v0 = mod(rng.rng(), BigInt(rewardTable.length));
        let item = rewardTable[v0];
        if (rewardPool[0] === item[0] || rewardPool[1] === item[0] || rewardPool[2] === item[0]) {
            continue;
        }
        if (rewardTable[v0][1] !== 0) {
            if (s2 !== 0n) {
                if (item[3] !== 0) {
                    continue;
                }
            }
            if (_B747C !== 0) {
                rewardPool[s1] = item[0];
                s1 += 1n;
            }
            if (rewardTable[v0][3] === 0) {
                continue;
            }
            s3 = item[0];
            s2 = 0xFFFFFFFFn;
            continue;
        }
        if (s2 !== 0n) {
            if (rewardTable[v0][3] !== 0) {
                continue;
            }
        }
        rewardPool[s1] = item[0];
        s1 += 1n;
        if (rewardTable[v0][3] === 0) {
            continue;
        }
        s3 = item[0];
        s2 = 0xFFFFFFFFn;
    }

    // rewardPool.sort((a,b) => a-b);
    rewardPool.sort((a, b) => {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    });

    if (s3 !== 0xFFFFFFFFn) {
        if (rewardPool[0] === s3) {
            v0 = rewardPool[2];
            rewardPool[2] = BigInt.asUintN(8, s3);
            rewardPool[0] = BigInt.asUintN(8, v0);
        } else if (rewardPool[1] === s3) {
            v0 = rewardPool[2];
            rewardPool[2] = BigInt.asUintN(8, s3);
            rewardPool[1] = BigInt.asUintN(8, v0);
        }
    }

    let tileBufferItems = new Array(15);
    let tileBufferCards = new Array(15);

    for (let i = 0; i < 7; i++) {
        tileBufferItems[i] = rewardPool[0];
        tileBufferCards[i] = 0;
    }
    for (let i = 7; i < 12; i++) {
        tileBufferItems[i] = rewardPool[1];
        tileBufferCards[i] = 1;
    }
    for (let i = 12; i < 12 + 3; i++) {
        tileBufferItems[i] = rewardPool[2];
        tileBufferCards[i] = 2;
    }

    s1 = 0n;
    s3 = 0x88888889n;
    let s3l = -0x77777777n;

    while (s1 < 100n) {
        s1 += 2n;
        v0 = rng.rng();
        a0 = v0 >> 0x1Fn;
        hilo = BigInt.asUintN(64, v0 * s3l);
        t7 = BigInt.asUintN(32, hilo >> 32n);
        v1 = BigInt.asUintN(32, t7 + v0) >> 3n;
        s0 = v1 - a0;
        v1 = s0 << 4n;
        v1 = v1 - s0;
        s0 = v0 - v1;

        let swap1 = s0;

        v0 = rng.rng();
        hilo = BigInt.asUintN(64, v0 * s3l);
        t7 = BigInt.asUintN(32, hilo >> 32n);
        a0 = v0 >> 0x1Fn;

        a2 = tileBufferItems[swap1];
        v1 = BigInt.asUintN(32, t7 + v0) >> 3n;
        a0 = v1 - a0;
        v1 = a0 << 4n;
        v1 -= a0;
        a0 = v0 - v1;

        let swap2 = a0;

        v0 = tileBufferItems[swap2];
        tileBufferItems[swap1] = v0;
        v0 = tileBufferCards[swap2];
        tileBufferItems[swap2] = a2;
        a2 = tileBufferCards[swap1];
        tileBufferCards[swap1] = v0;
        tileBufferCards[swap2] = a2;

        v0 = rng.rng();
        hilo = BigInt.asUintN(64, v0 * s3l);
        t7 = BigInt.asUintN(32, hilo >> 32n);
        a0 = v0 >> 0x1Fn;
        v1 = BigInt.asUintN(32, t7 + v0) >> 3n;
        s0 = v1 - a0;
        v1 = s0 << 4n;
        v1 -= s0;
        s0 = v0 - v1;

        swap1 = s0;

        v0 = rng.rng();
        hilo = BigInt.asUintN(64, v0 * s3l);
        t7 = BigInt.asUintN(32, hilo >> 32n);
        a2 = tileBufferItems[s0];
        v1 = BigInt.asUintN(32, t7 + v0) >> 3n;
        a0 = v1 - a0;
        v1 = a0 << 4n;
        v1 -= a0;
        a0 = v0 - v1;

        swap2 = a0;

        v0 = tileBufferItems[swap2];
        tileBufferItems[swap1] = v0;
        v0 = tileBufferCards[swap2];
        tileBufferItems[swap2] = a2;
        a2 = tileBufferCards[swap1];
        tileBufferCards[swap1] = v0;
        tileBufferCards[swap2] = a2;
    }

    let rewardPoolUint = new Array(rewardPool.length);
    for (let i = 0; i < rewardPool.length; i++) {
        rewardPoolUint[i] = rewardPool[i];
    }

    let namesOut = new Array(5);
    for (let i = 0; i < 5; i++) {
        namesOut[i] = names[i + 1];
    }
    return new ChocoboData(rewardPoolUint, tileBufferCards, namesOut);
}

let ivar;
let power_on_time;
let calibration_race_start_time;
let calibration_race_start_frame;
let next_window_start_frame;
let next_window_length;
let next_window_target_frame;
let next_window_target_time;

function redraw() {
    $("#power-on-time").text(power_on_time);
    $("#race-start-time").text(calibration_race_start_time);
    $("#race-start-frame").text(calibration_race_start_frame);
    $("#next-window-start-frame").text(next_window_start_frame);
    $("#next-window-length").text(next_window_length);
    $("#next-window-target-frame").text(next_window_target_frame);
    $("#next-window-target-time").text(next_window_target_time);
}

function runTimer(start) {
    let d = new Date();
    let audio = AUDIO_MAP[$("#input-beep-noise").val()];
    let beeps = parseInt($("#input-beeps").val());
    let ms_between_beeps = parseInt($("#input-between-beeps").val());
    let timer_element = $("#timer").get()[0];
    let beep_time = Math.min((beeps - 1) * ms_between_beeps, start - d.getTime());
    if (ivar !== undefined && ivar !== null) {
        window.clearInterval(ivar);
    }
    ivar = window.setInterval(function () {
        d = new Date();
        let delta = start - d.getTime();
        timer_element.innerText = (delta / 1000);
        if (delta <= beep_time) {
            beep_time -= ms_between_beeps;
            audio.play();
        }
        if (delta < 0) {
            timer_element.innerText = "0.000";
            stopTimer();
        }
    }, 10);
}

function stopTimer() {
    window.clearInterval(ivar);
}

function clickPowerOn() {
    let d = new Date();
    power_on_time = d.getTime();
    redraw();
}

function clickCalibrate() {
    let d = new Date();
    let calibration_timer = parseInt($("#input-calibration-timer").val());
    calibration_race_start_time = d.getTime() + calibration_timer;
    redraw();
    runTimer(calibration_race_start_time);
}

function clickCalculateFrame() {
    if (power_on_time === undefined || power_on_time === null || calibration_race_start_time === undefined || calibration_race_start_time === null) {
        window.alert("Signal a power on time and prepare to calibrate with a race before putting in data.");
        return;
    }
    let itemsStrs = [
        $("#item-pool-1").val(),
        $("#item-pool-2").val(),
        $("#item-pool-3").val()
    ];
    let namesStrs = [
        $("#choco-name-2").val(),
        $("#choco-name-3").val(),
        $("#choco-name-4").val(),
        $("#choco-name-5").val(),
        $("#choco-name-6").val()
    ];
    let items = new Array(3);
    let names = new Array(5);
    for (let i = 0; i < items.length; i++) {
        items[i] = ITEM_NAMES.indexOf(itemsStrs[i]);
        if (items[i] === -1) {
            window.alert("Must input all items in item pool.");
            return;
        }
    }
    for (let i = 0; i < names.length; i++) {
        names[i] = CHOCO_NAMES.indexOf(namesStrs[i]);
    }
    let frames_first_estimate = framesBetweenTimes(power_on_time, calibration_race_start_time);
    console.log(frames_first_estimate);
    let rank = $("input[type='radio'][name='rank']:checked").val();
    let offset = offsetToNearestMatchingFrame(frames_first_estimate, items, names, rank);
    if (offset === null) {
        window.alert("Could not locate frame.");
        return;
    }
    calibration_race_start_frame = frames_first_estimate + offset;
    power_on_time += Math.round((1000 / 60) * offset);
    redraw();
}

function clearInput() {
    $("#sync-input-table input").val("");
}

function clickClearInput() {
    if (window.confirm("Are you sure you want to clear the table input?")) {
        clearInput();
    }
}

function isGoodFrame(frame, items, rank) {
    let chocoData = generateChocoboRaceData(new RNG(BigInt(frame)), rank);
    for (let i = 0; i < 5; i++) {
        if (items.has(chocoData.items[chocoData.tileCards[i]])) {
            return true;
        }
    }
    return false;
}

function getNextWindow(startFrame, windowSize, maxFrames, items, rank) {
    for (let frame = startFrame + windowSize; frame <= maxFrames; frame += windowSize) {
        if (isGoodFrame(frame, items, rank)) {
            let windowStart = frame;
            let windowEnd = frame;
            while (isGoodFrame(windowStart - 1, items, rank)) {
                windowStart--;
            }
            while (isGoodFrame(windowEnd + 1, items, rank)) {
                windowEnd++;
            }
            let length = (windowEnd - windowStart) + 1;
            if (length >= windowSize) {
                return {
                    "start": windowStart,
                    "end": windowEnd,
                    "length": length,
                    "target": windowStart + Math.floor((windowEnd - windowStart) / 2)
                }
            }
        }
    }
    return null;
}

function clickLoadNextWindow() {
    if (power_on_time === undefined || power_on_time === null
        || calibration_race_start_time === undefined || calibration_race_start_time === null
        || calibration_race_start_frame === undefined || calibration_race_start_frame === null) {
        window.alert("Calibrate first!");
        return;
    }
    let d = new Date();
    let search_offset = parseInt($("#input-next-window-min-time").val());
    let start_frame = framesBetweenTimes(search_offset + d.getTime(), power_on_time);
    let window_size = parseInt($("#input-min-window-size").val());
    let max_frames = parseInt($("#input-window-search-max-frames").val());
    let items = new Set();
    let item_checkboxes = $("#div-input-items>input[type='checkbox']:checked").get();
    for (let i = 0; i < item_checkboxes.length; i++) {
        items.add(BigInt(parseInt(item_checkboxes[i].value)));
    }
    let rank = $("input[type='radio'][name='rank']:checked").val();
    let next_window = getNextWindow(start_frame, window_size, max_frames, items, rank);
    if (next_window === null) {
        window.alert("Could not find window.");
        return;
    }
    next_window_start_frame = next_window.start;
    next_window_length = next_window.length;
    next_window_target_frame = next_window.target;
    next_window_target_time = power_on_time + Math.round(framesToMilliseconds(next_window_target_frame));
    redraw();
}

function clickStartNextWindow() {
    if (power_on_time === undefined || power_on_time === null
        || calibration_race_start_time === undefined || calibration_race_start_time === null
        || calibration_race_start_frame === undefined || calibration_race_start_frame === null
        || next_window_start_frame === undefined || next_window_start_frame === null
        || next_window_length === undefined || next_window_length === null
        || next_window_target_frame === undefined || next_window_target_frame === null
        || next_window_target_time === undefined || next_window_target_time === null) {
        window.alert("Load a window first!");
        return;
    }
    runTimer(next_window_target_time);
}

//clear sync input
clearInput();

for (let i = 0; i < ITEM_NAMES.length; i++) {
    $("#item-options").append($(`<option value="${ITEM_NAMES[i]}">${ITEM_NAMES[i]}</option>`));
}

for (let i = 0; i < CHOCO_NAMES.length; i++) {
    $("#choco-name-options").append($(`<option value="${CHOCO_NAMES[i]}">${CHOCO_NAMES[i]}</option>`));
}