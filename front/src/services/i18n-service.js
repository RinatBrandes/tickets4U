export const i18nService = {
    doTrans,
    getLang,
    setLang
}


var gCurrLang = 'he'

const gTrans = {
    login: {
        en: 'Login',
        he: 'כניסה'
    },
    signup: {
        en: 'Signup',
        he: 'התחבר'
    },
    userName: {
        en: 'User Name',
        he: 'שם משתמש'
    },
    password: {
        en: 'Password',
        he: 'סיסמה'
    },
    firstName: {
        en: 'First Name',
        he: 'שם פרטי'
    },
    lastName: {
        en: 'Last Name',
        he: 'שם משפחה'
    },
    mobile: {
        en: 'Mobile',
        he: 'נייד'
    },
    email: {
        en: 'Email',
        he: 'מייל'
    },
    approvedMobile: {
        en: 'Approved sending message',
        he: 'אישור שליחת הודעה'
    },
    approvedEmail: {
        en: 'Approved sending email',
        he: 'אישור שליחת מייל'
    },
    logout: {
        en: 'Logout',
        he: 'התנתק'
    },
    langHe: {
        en: 'Hebrew',
        he: 'עברית'
    },
    langEn: {
        en: 'English',
        he: 'אנגלית'
    },
    addEvent: {
        en: 'Add event',
        he: 'הוסף ארוע'
    },
    hello: {
        en: 'Hello',
        he: 'שלום'
    },
    NewEvent: {
        en: 'New Event',
        he: 'ארוע חדש'
    },
    eventDate: {
        en: 'Event Date',
        he: 'תאריך הארוע'
    },
    evetTime: {
        en: 'Event Time',
        he: 'שעת הארוע'
    },
    save: {
        en: 'Save',
        he: 'שמור'
    },
    eventName: {
        en: 'Event Name',
        he: 'שם הארוע'
    },
    eventType: {
        en: 'Event Type',
        he: 'סוג הארוע'
    },
    placeName: {
        en: 'Event place name',
        he: 'שם מקום הארוע'
    },
    eventCity: {
        en: 'Event city name',
        he: 'שם עיר הארוע'
    }   
}



function getTrans(transKey) {
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'


    const translate = key[gCurrLang]
    if (!translate) return key['en']

    return translate
}


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}

function getLang() {
    return gCurrLang
}

function setLang(lang) {
    gCurrLang = lang
}


function _formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


function _formatCurrency(num) {
    if (gCurrLang === 'en') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
    else return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}


function _formatDate(time) {
    const option = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}

