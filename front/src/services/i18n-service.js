export const i18nService = {
    doTrans,
    getLang,
    setLang,
    getTrans
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
        he: ' שם הארוע'
    },
    eventType: {
        en: 'Event Type',
        he: 'סוג הארוע'
    },
    placeName: {
        en: 'Event place name',
        he: 'מקום הארוע'
    },
    eventCity: {
        en: 'Event city name',
        he: 'עיר הארוע'
    },
    eventPricePerCard: {
        en: 'Price per ticket',
        he: 'מחיר לכרטיס'
    },
    ticketCount: {
        en: 'Ticket count',
        he: 'כמות כרטיסים'
    },
    userRemark: {
        en: 'Remarks / Extra details',
        he: 'הערות/פרטים נוספים'
    },
    eventArea: {
        en: 'Event erea',
        he: 'אזור הארוע'
    },
    eventTime: {
        en: 'Event hour',
        he: 'שעת הארוע'
    },
    return: {
        en: 'Go Back',
        he: 'חזור'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    eventDetails: {
        en: 'Event',
        he: 'ארוע'
    },
    eventStatus: {
        en: 'Event status',
        he: 'סטטוס ארוע'
    },
    new: {
        en: 'New',
        he: 'חדש'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    south: {
        en: 'South',
        he: 'דרום'
    },
    haifa: {
        en: 'Haifa',
        he: 'חיפה'
    },
    jerusalem: {
        en: 'jerusalem',
        he: 'ירושלים'
    },
    center_humiliation: {
        en: 'Center and Humiliation',
        he: 'מרכז ושפלה'
    },
    north: {
        en: 'North',
        he: 'צפון'
    },
    sharon: {
        en: 'Sharon',
        he: 'שרון'
    },
    sport: {
        en: 'Sport',
        he: 'ספורט'
    },
    theater: {
        en: 'Theater',
        he: 'תאטרון'
    },
    standup: {
        en: 'Standup',
        he: 'סטנדאפ'
    },
    music: {
        en: 'Music',
        he: 'מוזיקה'
    },
    lecture: {
        en: 'Lecture',
        he: 'הרצאה'
    },
    cinema: {
        en: 'Cinema',
        he: 'קולנוע'
    },
    children: {
        en: 'Children',
        he: 'ילדים'
    },
    seniors: {
        en: 'Seniors',
        he: 'גיל הזהב'
    },
    circus: {
        en: 'Circus',
        he: 'קרקס'
    },
    fashion: {
        en: 'Fashion',
        he: 'אופנה'
    },
    gym: {
        en: 'Gym',
        he: 'מכון כושר'
    },
    festival: {
        en: 'Festival',
        he: 'פסטיבל'
    },
    other: {
        en: 'Other',
        he: 'אחר'
    },
    Food_tours: {
        en: 'Food tours',
        he: 'סיורי אוכל'
    },
    Workshop: {
        en: 'Workshop',
        he: 'סדנה'
    },
    update_event: {
        en: 'Update event',
        he: 'עדכון ארוע'
    },
    new_event: {
        en: 'New event',
        he: 'ארוע חדש'
    },
    search: {
        en: 'Search',
        he: 'חפש'
    },
    clearSearch: {
        en: 'Clear search',
        he: 'נקה'
    },
    selectOption: {
        en: 'Select',
        he:'בחר'
    },
    fromDate: {
        eh: 'From date',
        he: 'מתאריך'
    },
    toDate: {
        en: 'To date',
        he: 'עד תאריך'
    },
    eventTicketQty: {
        en: 'Ticket Quantity',
        he: 'כמות כרטיסים'
    },
    Sport:{
        en: "Sport",
        he: "ספורט"
    },
    Theater: {
        en: "Theater",
        he: "תאטרון"
    },
    Standup: {
        en: "Standup",
        he: "סטנדאפ"
    },
    Music: {
        en: "Music",
        he: "מוזיקה"
    },
    Lecture: {
        en: "Lecture",
        he: "הרצאה"
    },
    Cinema: {
        en: "Cinema",
        he: "קולנוע"
    },
    Children: {
        en: "Children",
        he: "ילדים"
    },
    Seniors: {
        en: "Seniors",
        he: "גיל הזהב"
    },
    Circus: {
        en: "Circus",
        he: "קרקס"
    },
    Fashion: {
        en: "Fashion",
        he: "אופנה"
    },
    Gym: {
        en: "Gym",
        he: "מכון כושר"
    },
    Festival: {
        en: "Festival",
        he: "פסטיבל"
    },
    Other: {
        en: "Other",
        he: "אחר"
    },
    FoodTours: {
        en: "Food tours",
        he: "סיורי אוכל"
    },
    Workshop: {
        en: "Workshop",
        he: "סדנה"
    },
    edit: {
        en: 'Edit',
        he: 'ערוך'
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


// function _formatNum(num) {
//     return new Intl.NumberFormat(gCurrLang).format(num)
// }


// function _formatCurrency(num) {
//     if (gCurrLang === 'en') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
//     else return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
// }


// function _formatDate(time) {
//     const option = {
//         year: 'numeric', month: 'short', day: 'numeric',
//         hour: 'numeric', minute: 'numeric',
//         hour12: true,
//     }

//     return new Intl.DateTimeFormat(gCurrLang, option).format(time)
// }

