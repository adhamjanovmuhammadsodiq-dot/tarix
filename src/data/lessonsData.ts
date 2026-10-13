import { CategoryInfo, Lesson } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ozbekiston-tarixi',
    name: 'O‘zbekiston tarixi',
    shortDesc: 'Ajdodlarimiz merosi, To‘maris, Shiroq, Spitamen, Amir Temur saltanati va buyuk allomalar.',
    era: 'Mil. avv. I ming yillik — XX asr',
    iconName: 'Compass',
  },
  {
    id: 'qadimgi-rim',
    name: 'Qadimgi Rim',
    shortDesc: 'Respublika davridan imperiyagacha, Rim legionlari, Rim huquqi va me’moriy yodgorliklar.',
    era: 'Mil. avv. 753 — Mil. 476-yil',
    iconName: 'Landmark',
  },
  {
    id: 'qadimgi-misr',
    name: 'Qadimgi Misr',
    shortDesc: 'Nil daryosi tuhfasi, Giza ehromlari, fir’avnlar panteoni va qadimgi iyerogliflar.',
    era: 'Mil. avv. 3100 — Mil. avv. 30-yil',
    iconName: 'Pyramid',
  },
  {
    id: 'qadimgi-yunoniston',
    name: 'Qadimgi Yunoniston',
    shortDesc: 'Polislar (shahar-davlatlar), Afina demokratiyasi, Sparta, Olimpiya o‘yinlari va falsafa.',
    era: 'Mil. avv. VIII — Mil. avv. II asr',
    iconName: 'Columns3',
  },
  {
    id: 'qadimgi-dunyo',
    name: 'Qadimgi Mesopotamiya',
    shortDesc: 'Dajla va Furot oralig‘i, Shumerlar mixxat yozuvi, zikkuratlar va Xammurapi qonunlari.',
    era: 'Mil. avv. IV ming yillik — Mil. avv. VI asr',
    iconName: 'Scroll',
  },
  {
    id: 'orta-asrlar',
    name: 'O‘rta asrlar va Renessans',
    shortDesc: 'Buyuk Ipak yo‘li, Sharq Renessansi, allomalar ilmiy kashfiyotlari va kitob bosish.',
    era: 'V asr — XV asr oxiri',
    iconName: 'Castle',
  },
  {
    id: 'jahon-tarixi',
    name: 'Jahon tarixi',
    shortDesc: 'Buyuk geografik kashfiyotlar, yangi dengiz yo‘llari va dunyoning yangi xaritasi.',
    era: 'XV asr — XX asr',
    iconName: 'Globe',
  },
];

export const LESSONS: Lesson[] = [
  // =========================================================================
  // 5-SINF DARSLARI: "TARIXDAN HIKOYALAR" (O‘ZBEKISTON MAKTAB DASTURI)
  // =========================================================================

  // 5-sinf: 1-dars
  {
    id: '5-sinf-1-dars-tarix-va-vaqt-hisobi',
    grade: '5-sinf',
    categoryId: 'ozbekiston-tarixi',
    categoryName: 'O‘zbekiston tarixi',
    title: '1-dars (5-sinf): Tarix fani nima? Tarixiy manbalar va vaqt hisobi',
    subtitle: 'Milodiy yil hisobi, eramizdan avvalgi yillar va asrlarni Rim raqamlarida aniqlash qoidalari',
    readingTimeMinutes: 6,
    image: '/src/assets/images/hero_ancient_history_1791870084909.jpg',
    objectives: [
      'Tarix fani nimani o‘rganishini va uning insoniyat hayotidagi ahamiyatini tushunish.',
      'Tarixiy manbalar turlarini (moddiy, yozma, og‘zaki, etnografik) bir-biridan farqlay olish.',
      'Milodiy yil hisobi, miloddan avvalgi (mil. avv.) davrlar va asrlarni Rim raqamlari (I–XXI) bilan to‘g‘ri ifodalashni o‘rganish.',
    ],
    overview:
      '5-sinfda tarix fani "Tarixdan hikoyalar" darsligi orqali boshlanadi. Tarix — insoniyatning o‘tmishdagi hayoti, mehnati, madaniyati, orzu-umidlari va qahramonliklarini o‘rganuvchi fanning nomi. Tarixni o‘rganmasdan turib bugungi kunni anglab bo‘lmaydi.',
    historicalContext:
      'Tarix fani ashyoviy (moddiy), yozma va og‘zaki manbalarga tayanadi. Vaqt hisobida milodiy yil hisobi qo‘llaniladi: Iso payg‘ambar tavallud topgan sana 1-yil deb belgilangan. Undan oldingi davr "miloddan avvalgi" (mil. avv.) deb yuritiladi va yillar kattadan kichikka qarab sanaladi. Har 100 yil bir asrni tashkil etadi. Tarix darslarida asrlar doimo Rim raqamlari (I, V, X, XV, XX, XXI) orqali yoziladi.',
    factsVsLegends: {
      legend: 'Tarixiy hisobda "0-yil" mavjud bo‘lgan degan noto‘g‘ri tasavvur bor.',
      fact: 'Tarixiy vaqt hisobida nol yili yo‘q: miloddan avvalgi 1-yildan so‘ng to‘g‘ridan-to‘g‘ri milodiy 1-yil boshlanadi.',
    },
    importantDates: [
      { year: '1-yil', event: 'Milodiy yil hisobining boshlang‘ich nuqtasi.' },
      { year: 'I–XXI asrlar', event: 'Rim raqamlarida ifodalanadigan insoniyat sivilizatsiyasi asrlari.' },
      { year: 'XXI asr', event: 'Hozirgi yashayotgan asrimiz (2001-yil 1-yanvardan 2100-yil 31-dekabrgacha).' },
    ],
    historicalFigures: [
      {
        name: 'Gerodot (mil. avv. 484–425)',
        role: 'Qadimgi yunon allomasi',
        period: 'Mil. avv. V asr',
        description: 'Tarixiy voqealarni dastlabki tizimli tadqiq qilgan va "Tarixning otasi" deb atalgan mutafakkir.',
      },
      {
        name: 'Dionisiy Kichik',
        role: 'Rimlik astronom va rohib',
        period: 'VI asr',
        description: 'Milodiy yil hisobi (eramiz) tizimini ishlab chiqqan va 1-yilni hisoblab bergan olim.',
      },
    ],
    keyFacts: [
      'Yilni asrga aylantirish: agar yil oxiridagi ikki raqam "00" bo‘lmasa, oldingi raqamga 1 qo‘shiladi (Masalan: 1336-yil -> 13 + 1 = 14, ya’ni XIV asr).',
      'Moddiy manbalar — arxeologik qazishmalarda topiladigan sopol idishlar, qurollar, tangalar va qadimiy binolar.',
      'Yozma manbalar — tosh, qog‘oz, charm va papirusga yozilgan bitiklar va kitoblar.',
    ],
    summary:
      'Tarix fani insoniyat o‘tmishini o‘rganadi. Tarixiy voqealar ketma-ketligini bilish uchun milodiy va miloddan avvalgi yillar hamda Rim raqamlaridagi asrlar hisobini puxta bilish lozim.',
    miniQuiz: [
      {
        id: '5m-1',
        question: 'Amir Temur tavallud topgan 1336-yil Rim raqamida qaysi asrga to‘g‘ri keladi?',
        options: ['XIII asr', 'XIV asr', 'XV asr', 'XVI asr'],
        correctAnswer: 1,
        explanation: '1336-yil: 13 + 1 = 14, ya’ni Rim raqamida XIV asrga to‘g‘ri keladi.',
      },
      {
        id: '5m-2',
        question: 'Tarixiy vaqt hisobida 0-yil bormi?',
        options: ['Ha, bor', 'Yo‘q, mil. avv. 1-yildan so‘ng darhol milodiy 1-yil keladi', 'Faqat Rimda bo‘lgan', 'Faqat Yunonistonda bo‘lgan'],
        correctAnswer: 1,
        explanation: 'Vaqt hisobida nol yili mavjud emas: mil. avv. 1-yildan so‘ng to‘g‘ridan-to‘g‘ri milodiy 1-yil boshlanadi.',
      },
    ],
  },

  // 5-sinf: 2-dars
  {
    id: '5-sinf-2-dars-tomaris-va-shiroq',
    grade: '5-sinf',
    categoryId: 'ozbekiston-tarixi',
    categoryName: 'O‘zbekiston tarixi',
    title: '2-dars (5-sinf): Qadimgi ajdodlarimiz jasorati — To‘maris va Shiroq',
    subtitle: 'Massagetlar malikasi To‘marisning Kir II ustidan g‘alabasi va cho‘pon Shiroqning vatanparvarligi',
    readingTimeMinutes: 7,
    image: '/src/assets/images/uzbekistan_samarkand_1791870085081.jpg',
    objectives: [
      'Qadimgi O‘zbekiston hududida yashagan massaget va saq qabilalari madaniyatini bilish.',
      'To‘marisning Eron shohi Kir II ga qarshi olib borgan ozodlik jangini tahlil qilish.',
      'Cho‘pon Shiroqning o‘z xalqini qutqarish yo‘lida jon fido qilgan jasoratidan saboq olish.',
    ],
    overview:
      '5-sinf o‘quvchilarida vatanparvarlik tuyg‘usini tarbiyalovchi eng muhim mavzu ajdodlarimizning ozodlik kurashidir. Qadimgi massagetlar va saqlar o‘z yurtini bosqinchilardan mardonavor himoya qilganlar.',
    historicalContext:
      'Miloddan avvalgi VI asrda Eron shohi Kir II Orolbo‘yi va Qizilqum hududlarida yashovchi massagetlar yeriga bostirib kirdi. To‘maris o‘g‘li Spargapis makkorlik bilan asir olinganidan so‘ng, bosqinchilarga qarshi qaqshatqich jang uyushtirib, Kir II qo‘shinini tor-mor etdi (mil. avv. 530-yil).\n\nKeyinchalik Eron shohi Doro I saqlar yeriga yurish qilganda, oddiy saq cho‘poni Shiroq o‘z vujudini jarohatlab, dushmanga "qochoq" qiyofasida ko‘rindi va ularni suvsiz Qizilqum cho‘liga adashtirib olib kirib, qirib yubordi.',
    factsVsLegends: {
      legend: 'To‘maris Kir II ning boshini kesib qonli meshga soldi degan rivoyat Gerodot tomonidan yozib qoldirilgan.',
      fact: 'Jang haqiqatan yuz bergan va qudratli jahongir Kir II aynan massagetlar bilan to‘qnashuvda halok bo‘lgan.',
    },
    importantDates: [
      { year: 'Mil. avv. 530', event: 'Massagetlar malikasi To‘marisning Eron shohi Kir II ustidan tarixiy g‘alabasi.' },
      { year: 'Mil. avv. 519', event: 'Eron shohi Doro I ning saqlarga qarshi yurishi va Shiroqning buyuk jasorati.' },
    ],
    historicalFigures: [
      {
        name: 'To‘maris',
        role: 'Massagetlar malikasi va sarkarda',
        period: 'Mil. avv. VI asr',
        description: 'Vatan ozodligi yo‘lida bosqinchi Kir II qo‘shinlarini tor-mor qilgan buyuk ayol hukmdor.',
      },
      {
        name: 'Shiroq',
        role: 'Saq cho‘poni, xalq qahramoni',
        period: 'Mil. avv. VI asr oxiri',
        description: 'O‘z tanasini tilkalab, dushman lashkarini aldab suvsiz sahro qa’rida yo‘q qilgan fidoyi qahramon.',
      },
    ],
    keyFacts: [
      'To‘maris jang oldidan: "Qonxo‘r shoh, qon ichishga to‘ymagan eding, endi o‘z qoningga to‘ygin!" deya qasamyod qilgan.',
      'Saqlar va massagetlar mohir otliq kamonchilar bo‘lib, ot ustida to‘liq burilib nishonga benuqson o‘q uzganlar.',
    ],
    summary:
      'To‘maris va Shiroq jasorati vatan tuyg‘usi har qanday boylik va kuchdan ustun ekanligini isbotlagan tarixiy timsollardir.',
    miniQuiz: [
      {
        id: '5m-3',
        question: 'To‘maris qaysi Eron shohining bosqinchi qo‘shinini mag‘lub etgan?',
        options: ['Kir II', 'Doro I', 'Kserks', 'Aleksandr'],
        correctAnswer: 0,
        explanation: 'To‘maris miloddan avvalgi 530-yilda Eron shohi Kir II ni yenggan.',
      },
      {
        id: '5m-4',
        question: 'Doro I lashkarini aldab suvsiz Qizilqum sahrosiga olib kirgan saq cho‘poni kim?',
        options: ['Spitamen', 'Shiroq', 'Muqanna', 'Rustam'],
        correctAnswer: 1,
        explanation: 'Cho‘pon Shiroq o‘z jonini qurbon qilib, dushman qo‘shinini sahroda halok qilgan.',
      },
    ],
  },

  // 5-sinf: 3-dars
  {
    id: '5-sinf-3-dars-buyuk-ipak-yoli-va-shaharlar',
    grade: '5-sinf',
    categoryId: 'ozbekiston-tarixi',
    categoryName: 'O‘zbekiston tarixi',
    title: '3-dars (5-sinf): Buyuk Ipak yo‘li va qadimiy shaharlarimiz',
    subtitle: 'Samarqand, Buxoro, Xiva — Sharq va G‘arb o‘rtasidagi savdo, madaniyat va me’morchilik ko‘prigi',
    readingTimeMinutes: 7,
    image: '/src/assets/images/uzbekistan_samarkand_1791870085081.jpg',
    objectives: [
      'Buyuk Ipak yo‘lining kelib chiqishi, asosiy tarmoqlari va ahamiyatini bilish.',
      'O‘zbekistonning qadimiy shaharlari: Samarqand, Buxoro va Xivaning tarixiy o‘rnini o‘rganish.',
      'Ipak yo‘li orqali qanday tovarlar va ilmiy g‘oyalar tarqalganini tahlil qilish.',
    ],
    overview:
      'Buyuk Ipak yo‘li — qadimda va o‘rta asrlarda Xitoyni O‘rta yer dengizi mamlakatlari bilan bog‘lagan ulkan karvon yo‘lidir. Uning markaziy chorrahasida O‘zbekistonning qadimiy shaharlari joylashgan bo‘lib, ular dunyo savdosining gavjum markaziga aylangan.',
    historicalContext:
      'Miloddan avvalgi II asrda xitoylik sayohatchi Chjan Tsyan Markaziy Osiyo orqali Farg‘onaning "samoviy tulporlari" va boy viloyatlarini ko‘rib, imperatorga hisobot berdi. Shundan so‘ng muntazam savdo yo‘li shakllandi. Karvonlar Samarqand, Buxoro, Termiz va Xiva orqali o‘tib, ipak, qog‘oz, shisha, ziravorlar va qimmatbaho toshlarni tashigan. Bu yo‘l nafaqat tovarlar, balki dinlar, fan, me’morchilik va san’at almashinuviga xizmat qilgan.',
    factsVsLegends: {
      legend: 'Ipak yo‘li faqat bitta to‘g‘ri chiziqli yo‘ldan iborat bo‘lgan.',
      fact: 'Buyuk Ipak yo‘li o‘nlab tarmoqlarga bo‘lingan bo‘lib, uning umumiy uzunligi 7000 kilometrdan oshgan.',
    },
    importantDates: [
      { year: 'Mil. avv. II asr', event: 'Chjan Tsyan elchiligi va Buyuk Ipak yo‘lining rasmiy shakllanishi.' },
      { year: '1990-yillar', event: 'Samarqand, Buxoro va Xiva YuNESKO Umumjahon madaniy merosi ro‘yxatiga kiritilishi.' },
    ],
    historicalFigures: [
      {
        name: 'Chjan Tsyan',
        role: 'Xitoylik sayohatchi va elchi',
        period: 'Mil. avv. II asr',
        description: 'Farg‘ona (Dovon) va Movarounnahrga kelib, Ipak yo‘li ochilishiga turtki bergan sayohatchi.',
      },
      {
        name: 'Marko Polo',
        role: 'Venetsiyalik sayohatchi',
        period: 'XIII asr',
        description: 'Ipak yo‘li bo‘ylab Osiyo shaharlariga sayohat qilib, ular haqida mashhur kitob yozgan yevropalik.',
      },
    ],
    keyFacts: [
      'Xitoyliklar ipak qurti boqish va shoyi mato to‘qish sirini yuzlab yillar davomida davlat siri sifatida saqlagan.',
      'Samarqand qog‘ozi o‘zining pishiqligi, silliqligi va ming yillab saqlanishi bilan dunyoga mashhur bo‘lgan.',
      'Karvonsaroylar savdogarlar dam oladigan, xavfsiz tunaydigan va tijorat bitimlari tuziladigan mehmonxonalar bo‘lgan.',
    ],
    summary:
      'Buyuk Ipak yo‘li O‘zbekiston zamini xalqlarini jahon tamaddunining markaziga olib chiqqan buyuk tarixiy aloqa yo‘lidir.',
    miniQuiz: [
      {
        id: '5m-5',
        question: 'Buyuk Ipak yo‘li qaysi mamlakatdan boshlanib O‘rta yer dengiziga qadar cho‘zilgan?',
        options: ['Hindistondan', 'Xitoydan', 'Misrdan', 'Rossiyadan'],
        correctAnswer: 1,
        explanation: 'Buyuk Ipak yo‘li Xitoyning qadimiy poytaxti Chanan shahridan boshlangan.',
      },
      {
        id: '5m-6',
        question: 'Ipak yo‘li karvonlari dam oladigan maxsus inshootlar nima deb atalgan?',
        options: ['Zikkurat', 'Karvonsaroy', 'Kolizey', 'Akropol'],
        correctAnswer: 1,
        explanation: 'Savdo yo‘llaridagi xavfsiz mehmonxonalar "karvonsaroy" deb atalgan.',
      },
    ],
  },

  // 5-sinf: 4-dars
  {
    id: '5-sinf-4-dars-amir-temur-va-temuriylar',
    grade: '5-sinf',
    categoryId: 'ozbekiston-tarixi',
    categoryName: 'O‘zbekiston tarixi',
    title: '4-dars (5-sinf): Sohibqiron Amir Temur va Temuriylar saltanati',
    subtitle: 'Amir Temur davlati, "Kuch — adolatdadir" shiori, "Temur tuzuklari" va Samarqand Registoni',
    readingTimeMinutes: 7,
    image: '/src/assets/images/uzbekistan_samarkand_1791870085081.jpg',
    objectives: [
      'Sohibqiron Amir Temurning hayot yo‘li va markazlashgan davlat tuzishdagi xizmatlarini bilish.',
      '"Rosti-rusti" ("Kuch — adolatdadir") tamoyili va "Temur tuzuklari" asari mohiyatini anglash.',
      'Temuriylar davridagi me’morchilik va obodonchilik ishlarini o‘rganish.',
    ],
    overview:
      'Sohibqiron Amir Temur (1336–1405) — o‘zbek davlatchiligi tarixidagi eng buyuk hukmdor va sarkarda. U Movarounnahrni mo‘g‘ul zulmidan ozod qildi, tarqoqlikka chek qo‘ydi va buyuk saltanat barpo etdi.',
    historicalContext:
      'Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xo‘ja Ilg‘or qishlog‘ida tavallud topdi. 1370-yilda Movarounnahrning yagona hukmdori bo‘lib, poytaxt etib Samarqandni tanladi. U adolatli qonunlar majmuasi — "Temur tuzuklari"ni yaratdi. Amir Temur davrida Registon maydoni, Go‘ri Amir maqbarasi, Bibixonim jome masjidi, Shohi Zinda ansambli va Shahrisabzdagi Oqsaroy kabi betakror obidalar qad ko‘tardi.',
    factsVsLegends: {
      legend: 'Amir Temur faqat harbiy yurishlar bilan band bo‘lgan degan yanglish tasavvur.',
      fact: 'Amir Temur ulkan obodonchilik ishlari olib borgan, sug‘orish kanallari qazdirgan, bog‘lar yaratgan, olimlar va hunarmandlarni homiylik qilgan ma’rifatparvar shaxs bo‘lgan.',
    },
    importantDates: [
      { year: '1336-yil 9-aprel', event: 'Kesh (Shahrisabz) yaqinida Amir Temurning tavallud topishi.' },
      { year: '1370-yil', event: 'Balx qurultoyida Amir Temurning oliy hukmdor deb e’lon qilinishi.' },
      { year: '1405-yil', event: 'Amir Temurning O‘tror shahrida vafot etishi.' },
    ],
    historicalFigures: [
      {
        name: 'Amir Temur (1336–1405)',
        role: 'Sohibqiron, buyuk davlat arbobi',
        period: 'XIV — XV asr',
        description: '27 ta davlatni birlashtirgan ulkan saltanat asoschisi, "Temur tuzuklari" muallifi.',
      },
      {
        name: 'Bibixonim (Saraymulkxonim)',
        role: 'Malika, Amir Temurning suyukli rafiqasi',
        period: 'XIV — XV asr',
        description: 'Zukko, ma’rifatli va Samarqandda ulkan jome masjidi qurilishiga homiylik qilgan ayol.',
      },
    ],
    keyFacts: [
      'Amir Temurning davlat uzugi va bayrog‘iga "Kuch — adolatdadir" so‘zlari o‘yib yozilgan.',
      'Samarqand atrofida jahonning yirik shaharlari nomlari bilan atalgan: Bag‘dod, Damashq, Sheroz, Sultoniya, Parij kabi qishloqlar barpo qilingan.',
    ],
    summary:
      'Amir Temur qat’iy intizom, yuksak adolat va ilm-fan taraqqiyotiga asoslangan qudratli davlat qura olgan buyuk shaxsdir.',
    miniQuiz: [
      {
        id: '5m-7',
        question: 'Amir Temurning bosh davlat shiori qanday bo‘lgan?',
        options: ['"Kuch — boylikdadir"', '"Kuch — adolatdadir"', '"Bilim — qudratdir"', '"G‘alaba — jasurlarniki"'],
        correctAnswer: 1,
        explanation: 'Amir Temur "Rosti-rusti" ("Kuch — adolatdadir") shiorini davlat siyosatiga aylantirgan.',
      },
      {
        id: '5m-8',
        question: 'Amir Temurning davlat boshqaruvi qonunlari jamlangan mashhur asari qaysi?',
        options: ['"Boburnoma"', '"Temur tuzuklari"', '"Qobusnoma"', '"Zafarnoma"'],
        correctAnswer: 1,
        explanation: 'Sohibqironning davlat boshqaruvi haqidagi qo‘llanmasi "Temur tuzuklari"dir.',
      },
    ],
  },

  // 5-sinf: 5-dars
  {
    id: '5-sinf-5-dars-buyuk-allomalar-va-fan',
    grade: '5-sinf',
    categoryId: 'orta-asrlar',
    categoryName: 'O‘rta asrlar va Renessans',
    title: '5-dars (5-sinf): Sharq Renessansi allomalari — Al-Xorazmiy, Beruniy va Ibn Sino',
    subtitle: 'Algebra asoschisi, Yer sharini o‘lchagan qomusiy alloma va jahon tabobati sultoni',
    readingTimeMinutes: 7,
    image: '/src/assets/images/uzbekistan_samarkand_1791870085081.jpg',
    objectives: [
      'Muhammad al-Xorazmiyning matematika va "algoritm" tushunchasiga qo‘shgan hissasini bilish.',
      'Abu Rayhon Beruniyning geografiya va astronomiya sohasidagi kashfiyotlarini o‘rganish.',
      'Abu Ali ibn Sinoning "Tib qonunlari" asari va inson salomatligi haqidagi ta’limotini anglash.',
    ],
    overview:
      'IX–XII asrlarda Markaziy Osiyo zamini butun dunyoga ilm-fan daholarini tuhfa etdi. Bu davr tarixda Birinchi Sharq Renessansi (Uyg‘onish davri) deb ataladi. 5-sinf darsligida bu buyuk mutafakkirlarning mehnati yosh avlodga ibrat sifatida o‘rgatiladi.',
    historicalContext:
      'Al-Xorazmiy Bag‘doddagi "Bayt ul-hikma"da ishlab, "al-jabr" asari orqali algebra faniga asos soldi. Beruniy 150 dan ortiq asar yozib, Yer radiusini zamonaviy hisob-kitoblarga teng aniqlikda o‘lchadi va Amerika qit’asini 500 yil oldin ilmiy bashorat qildi. Ibn Sino esa 16 yoshida tabib bo‘lib tanilib, 5 jildlik "Tib qonunlari" asarini yaratdi va u Yevropa universitetlarida 600 yil asosiy qo‘llanma bo‘ldi.',
    factsVsLegends: {
      legend: 'Ibn Sino o‘lmaslik sirini topgan degan xalq ertagi bor.',
      fact: 'Ibn Sino kasalliklarni to‘g‘ri davolash, jismoniy tarbiya, toza suv va toza havo inson umrini uzaytirishini ilmiy jihatdan isbotlagan haqiqiy tabibdir.',
    },
    importantDates: [
      { year: '783 — 850', event: 'Muhammad al-Xorazmiy hayot yillari.' },
      { year: '973 — 1048', event: 'Abu Rayhon Beruniy hayot yillari.' },
      { year: '980 — 1037', event: 'Abu Ali ibn Sino hayot yillari.' },
    ],
    historicalFigures: [
      {
        name: 'Muhammad al-Xorazmiy',
        role: 'Matematik, astronom, geograf',
        period: 'VIII — IX asr',
        description: 'Algebra fani asoschisi, uning nomidan "algoritm" atamasi kelib chiqqan.',
      },
      {
        name: 'Abu Rayhon Beruniy',
        role: 'Qomusiy alloma',
        period: 'X — XI asr',
        description: 'Yer radiusini aniq o‘lchagan va globus yasagan buyuk mutafakkir.',
      },
      {
        name: 'Abu Ali ibn Sino (Avitsenna)',
        role: 'Tabib, faylasuf',
        period: 'X — XI asr',
        description: '"Tib qonunlari" asari muallifi, jahon tibbiyoti cho‘qqisi.',
      },
    ],
    keyFacts: [
      'Bugungi kunda har bir kompyuter va smartfon Al-Xorazmiy nomi bilan ataluvchi "algoritm" qoidalari asosida ishlaydi.',
      'Beruniy Xorazm Ma’mun akademiyasida Ibn Sino bilan birgalikda ilmiy tadqiqotlar olib borgan.',
    ],
    summary:
      'Al-Xorazmiy, Beruniy va Ibn Sino — zamonaviy dunyo sivilizatsiyasining poydevorini qurgan buyuk allomalardir.',
    miniQuiz: [
      {
        id: '5m-9',
        question: 'Qaysi allomaning nomidan "algoritm" atamasi kelib chiqqan?',
        options: ['Abu Ali ibn Sino', 'Muhammad al-Xorazmiy', 'Abu Rayhon Beruniy', 'Mirzo Ulug‘bek'],
        correctAnswer: 1,
        explanation: 'Al-Xorazmiy nomining lotincha "Algorithmi" shaklidan zamonaviy "algoritm" so‘zi vujudga kelgan.',
      },
      {
        id: '5m-10',
        question: '600 yil davomida Yevropa tabiblarining bosh kitobi bo‘lgan "Tib qonunlari" muallifi kim?',
        options: ['Ibn Sino', 'Al-Forobiy', 'Al-Farg‘oniy', 'Al-Xorazmiy'],
        correctAnswer: 0,
        explanation: 'Abu Ali ibn Sino (Avitsenna) "Tib qonunlari" ("Al-Qonun fit-tibb") asari muallifidir.',
      },
    ],
  },

  // =========================================================================
  // 6-SINF DARSLARI: "QADIMGI DUNYO TARIXI" (O‘ZBEKISTON MAKTAB DASTURI)
  // =========================================================================

  // 6-sinf: 1-dars
  {
    id: '6-sinf-1-dars-qadimgi-misr-va-ehromlar',
    grade: '6-sinf',
    categoryId: 'qadimgi-misr',
    categoryName: 'Qadimgi Misr',
    title: '1-dars (6-sinf): Qadimgi Misr — Nil tuhfasi va buyuk ehromlar',
    subtitle: 'Nil vodiysi dehqonchiligi, fir’avnlar hokimiyati, Giza piramidalari va iyerogliflar',
    readingTimeMinutes: 7,
    image: '/src/assets/images/ancient_egypt_giza_1791870085481.jpg',
    objectives: [
      'Nil daryosining Misr hayoti va dehqonchiligidagi hal qiluvchi rolini tushunish.',
      'Yuqori va Quyi Misr birlashishi (Narmer) hamda fir’avnlar qudratini o‘rganish.',
      'Giza ehromlari (Xeops), mumiyolash sirlari va Jan-Fransua Shampolyon kashfiyotini bilish.',
    ],
    overview:
      '6-sinfda "Qadimgi dunyo tarixi" fani insoniyatning ilk davlatlari va buyuk madaniyatlari bilan tanishtiradi. Qadimgi yunon tarixchisi Gerodot aytganidek: "Misr — Nil daryosining tuhfasidir". Nil bo‘yidagi unumdor loyqa tuproq insoniyat tarixidagi eng barqaror sivilizatsiyalardan birini yaratdi.',
    historicalContext:
      'Taxminan miloddan avvalgi 3100-yilda podsho Narmer Misrni birlashtirdi. Qadimgi podsholik davrida fir’avnlar o‘zlari uchun abadiy maskan sifatida ulkan piramidalar qurdirdilar. Gizadagi eng baland ehrom fir’avn Xeops (Xufu) sharafiga 20 yildan ortiq vaqt mobaynida barpo etildi. Keyinchalik Yangi podsholik davrida Ramzes II Xettlar bilan to‘qnashib, Kadesh shartnomasini tuzdi. 1822-yilda esa fransuz olimi Shampolyon Rozetta toshi orqali iyerogliflarni o‘qishga muvaffaq bo‘ldi.',
    factsVsLegends: {
      legend: 'Ehromlarni millionlab qullar faqat qamchilar ostida majburlab qurgan degan afsona bor.',
      fact: 'Arxeologik qazishmalar (ishchilar shaharchasi va qabrlari) piramidalarni go‘sht, non va pivo bilan ta’minlangan erkin misrlik hunarmandlar va dehqonlar maosh evaziga qurganini isbotladi.',
    },
    importantDates: [
      { year: 'Taxminan mil. avv. 3100', event: 'Narmer tomonidan Yuqori va Quyi Misrning birlashtirilishi.' },
      { year: 'Taxminan mil. avv. 2560', event: 'Gizadagi Buyuk Xeops (Xufu) ehromining qurilishi.' },
      { year: 'Mil. avv. 1274', event: 'Kadesh jangi: Ramzes II va Xettlar o‘rtasidagi tarixda ilk yozma tinchlik shartnomasi.' },
      { year: '1822-yil', event: 'Jan-Fransua Shampolyon tomonidan Misr iyerogliflarining deshifrovka qilinishi.' },
    ],
    historicalFigures: [
      {
        name: 'Xeops (Xufu)',
        role: 'IV sulola fir’avni',
        period: 'Mil. avv. XXVI asr',
        description: 'Dunyoning yetti mo‘jizasidan biri — 146 metrli Buyuk ehromni qurdirtirgan fir’avn.',
      },
      {
        name: 'Ramzes II',
        role: 'Yangi podsholik fir’avni',
        period: 'Mil. avv. XIII asr',
        description: 'Misrni 66 yil boshqargan, Abu Simbel ibodatxonasini barpo etgan mashhur hukmdor.',
      },
      {
        name: 'Tutanxamon',
        role: 'XVIII sulola yosh fir’avni',
        period: 'Mil. avv. XIV asr',
        description: '1922-yilda Govard Karter tomonidan butun holda topilgan oltin maqbara sohibi.',
      },
    ],
    keyFacts: [
      'Giza ehromi 2.3 milliondan ortiq har biri 2.5 tonnalik ohaktosh bloklardan terilgan.',
      'Misrliklar 365 kunlik quyosh kalendarini yaratgan bo‘lib, bugungi kalendarimiz unga asoslangan.',
    ],
    summary:
      'Qadimgi Misr Nil daryosi bag‘rida shakllangan qudratli davlat bo‘lib, geometriya, tibbiyot, astronomiya va me’morchilikda o‘lmas meros qoldirdi.',
    miniQuiz: [
      {
        id: '6m-1',
        question: 'Gizadagi eng baland va mashhur ehrom qaysi fir’avn sharafiga qurilgan?',
        options: ['Ramzes II', 'Xeops (Xufu)', 'Tutanxamon', 'Exnaton'],
        correctAnswer: 1,
        explanation: 'Gizadagi Buyuk ehrom fir’avn Xeops (Xufu) sharafiga qurilgan.',
      },
      {
        id: '6m-2',
        question: 'Misr iyerogliflarini 1822-yilda Rozetta toshi yordamida o‘qigan olim kim?',
        options: ['Govard Karter', 'Jan-Fransua Shampolyon', 'Geynrix Shliman', 'Napoleon'],
        correctAnswer: 1,
        explanation: 'Fransuz olimi Jan-Fransua Shampolyon 1822-yilda iyerogliflarni o‘qish kalitini topgan.',
      },
    ],
  },

  // 6-sinf: 2-dars
  {
    id: '6-sinf-2-dars-mesopotamiya-va-bobil',
    grade: '6-sinf',
    categoryId: 'qadimgi-dunyo',
    categoryName: 'Qadimgi Mesopotamiya',
    title: '2-dars (6-sinf): Mesopotamiya — Dastlabki yozuv va Xammurapi qonunlari',
    subtitle: 'Shumer shahar-davlatlari, mixxat yozuvi, g‘ildirak ixtirosi va 282 moddali qonunlar to‘plami',
    readingTimeMinutes: 7,
    image: '/src/assets/images/hero_ancient_history_1791870084909.jpg',
    objectives: [
      'Dajla va Furot oralig‘idagi dastlabki sivilizatsiyalar jo‘g‘rofiyasini bilish.',
      'Shumerlarning kashfiyotlari: mixxat yozuvi, g‘ildirak va 60 lik sanoq tizimini o‘rganish.',
      'Bobil shohi Xammurapi qonunlarining tarixiy va huquqiy ahamiyatini tahlil qilish.',
    ],
    overview:
      'Mesopotamiya (yunoncha "Ikki daryo oralig‘i") — hozirgi Iroq hududidagi Dajla va Furot daryolari oralig‘idagi hosildor zamin. Aynan shu yerda insoniyat tarixida birinchi shahar-davlatlar, qonunlar to‘plami va mixxat yozuvi dunyoga kelgan.',
    historicalContext:
      'Miloddan avvalgi IV ming yillik oxirida Shumerlar Ur, Uruk, Lagash kabi shahar-davlatlarni barpo etdilar. Ular yumshoq loy taxtachalarga qamish qalam bilan mixxat (ponasimon) yozuvini ixtiro qildilar. Shumerlar shuningdek, kulolchilik charxi va aravaga g‘ildirak o‘rnatdilar. Miloddan avvalgi XVIII asrda Bobil podshosi Xammurapi 282 moddadan iborat qonunlarni qora bazalt toshga o‘ydirib, mamlakat bo‘ylab adolatni joriy etdi.',
    factsVsLegends: {
      legend: 'Gilgamesh haqidagi doston butunlay ertak deb hisoblangan.',
      fact: 'Gilgamesh miloddan avvalgi 2700-yillarda Uruk shahrini boshqargan haqiqiy podsho bo‘lib, shahar mudofaa devorlarini qurdirgan.',
    },
    importantDates: [
      { year: 'Taxminan mil. avv. 3500', event: 'Shumerlar tomonidan ilk mixxat yozuvining yaratilishi.' },
      { year: 'Taxminan mil. avv. 3000', event: 'G‘ildirak va aravaning transportda qo‘llanilishi.' },
      { year: 'Mil. avv. 1792 — 1750', event: 'Bobil shohi Xammurapi hukmronligi va mashhur qonunlar to‘plami.' },
    ],
    historicalFigures: [
      {
        name: 'Xammurapi',
        role: 'Bobil podshosi',
        period: 'Mil. avv. XVIII asr',
        description: 'Tarixdagi eng mukammal qadimgi qonunlar majmuasi muallifi.',
      },
      {
        name: 'Sargon Akkadlik',
        role: 'Akkad davlati asoschisi',
        period: 'Mil. avv. XXIII asr',
        description: 'Mesopotamiyadagi shahar-davlatlarni birlashtirgan ilk imperiya bunyodkori.',
      },
    ],
    keyFacts: [
      'Vaqtni 60 daqiqaga, aylanani 360 darajaga bo‘lish shumerlarning 60 lik sanoq tizimidan kelib chiqqan.',
      'Shumerlarning pog‘onali ulkan ibodatxonalari "Zikkurat" deb atalgan.',
      'Xammurapi qonunlari tosh lavhasi bugungi kunda Parijdagi Luvr muzeyida saqlanadi.',
    ],
    summary:
      'Mesopotamiya insoniyatga yozuvni, g‘ildirakni, vaqt hisobini va qonun ustuvorligini bergan tamaddun beshigidir.',
    miniQuiz: [
      {
        id: '6m-3',
        question: 'Shumerlar loy taxtachalarga yozgan yozuv turi qanday nomlanadi?',
        options: ['Iyeroglif', 'Mixxat (ponasimon yozuv)', 'Lotin alifbosi', 'Finikiya yozuvi'],
        correctAnswer: 1,
        explanation: 'Shumerlar kashf etgan yozuv "mixxat" (ponasimon yozuv) deb ataladi.',
      },
      {
        id: '6m-4',
        question: 'Xammurapi qaysi qadimgi davlatning podshosi bo‘lgan?',
        options: ['Misr', 'Bobil', 'Sparta', 'Rim'],
        correctAnswer: 1,
        explanation: 'Xammurapi qadimgi Bobil podsholigi hukmdori bo‘lgan.',
      },
    ],
  },

  // 6-sinf: 3-dars
  {
    id: '6-sinf-3-dars-qadimgi-yunoniston',
    grade: '6-sinf',
    categoryId: 'qadimgi-yunoniston',
    categoryName: 'Qadimgi Yunoniston',
    title: '3-dars (6-sinf): Qadimgi Yunoniston — Demokratiya, Sparta va Olimpiada',
    subtitle: 'Polislar (shahar-davlatlar), Afina xalq hokimiyati, Marafon jangi va Parfenon ibodatxonasi',
    readingTimeMinutes: 7,
    image: '/src/assets/images/hero_ancient_history_1791870084909.jpg',
    objectives: [
      'Yunonistonda polislarning shakllanishi va Afina demokratiyasi tamoyillarini o‘rganish.',
      'Spartaning harbiy intizomi va Afina madaniyati o‘rtasidagi farqlarni tahlil qilish.',
      'Olimpiya o‘yinlari va Yunon-Fors urushlarining tarixiy oqibatlarini bilish.',
    ],
    overview:
      'Qadimgi Yunoniston (Ellada) bir butun yagona davlat emas, balki mustaqil shahar-davlatlar — polislardan iborat bo‘lgan. Ular orasida eng mashhurlari demokratik Afina va qat’iy harbiy intizomga asoslangan Sparta edi.',
    historicalContext:
      'Miloddan avvalgi V asrda Perikl boshchiligidagi Afinada bevosita demokratiya (xalq hokimiyati) gullab-yashnadi. Barcha erkin erkak fuqarolar Xalq yig‘inida ovoz berish huquqiga ega edilar. Yunonlar forslarning bosqinchi qo‘shinlarini Marafon (mil. avv. 490) va Salamin (mil. avv. 480) janglarida yengib, mustaqilliklarini saqlab qoldilar. Miloddan avvalgi 776-yilda esa ilk Olimpiya o‘yinlari o‘tkazildi.',
    factsVsLegends: {
      legend: 'Fermopil jangida shoh Leonid va uning 300 spartaligi butun fors armiyasini yolg‘iz o‘zi to‘xtatgan.',
      fact: 'Spartaliklar bilan birga 7000 ga yaqin boshqa yunon polislari askarlari ham qahramonona kurashgan.',
    },
    importantDates: [
      { year: 'Mil. avv. 776', event: 'Birinchi antik Olimpiya o‘yinlarining o‘tkazilishi.' },
      { year: 'Mil. avv. 490', event: 'Marafon jangi (Afinaning forslar ustidan g‘alabasi).' },
      { year: 'Mil. avv. 480', event: 'Fermopil va Salamin dengiz janglari.' },
    ],
    historicalFigures: [
      {
        name: 'Perikl',
        role: 'Afina davlat arbobi',
        period: 'Mil. avv. V asr',
        description: 'Afina demokratiyasi va madaniyatini cho‘qqiga olib chiqqan buyuk rahbar.',
      },
      {
        name: 'Suqrot (Sokrat)',
        role: 'Faylasuf',
        period: 'Mil. avv. V asr',
        description: 'Insoniy axloq, haqiqat va mantiqiy tafakkur asoschisi bo‘lgan mutafakkir.',
      },
    ],
    keyFacts: [
      'Olimpiya o‘yinlari paytida barcha polislarda urushlar to‘xtatilib, muqaddas sulh e’lon qilingan.',
      'Parfenon ibodatxonasi Afina akropolida ma’buda Afina sharafiga mukammal oltin nisbat asosida qurilgan.',
    ],
    summary:
      'Qadimgi Yunoniston fanga "demokratiya", "falsafa", "tarix", "teatr" va "olimpiada" tushunchalarini taqdim etgan tamaddun beshigidir.',
    miniQuiz: [
      {
        id: '6m-5',
        question: 'Qadimgi Afinada xalq hokimiyati qanday nomlangan?',
        options: ['Oligarxiya', 'Tiraniya', 'Demokratiya', 'Monarxiya'],
        correctAnswer: 2,
        explanation: 'Afinada "demos" (xalq) va "kratos" (hokimiyat) so‘zlaridan olingan demokratiya o‘rnatilgan.',
      },
      {
        id: '6m-6',
        question: 'Ilk antik Olimpiya o‘yinlari qaysi yilda boshlangan?',
        options: ['Mil. avv. 776-yil', 'Mil. avv. 500-yil', 'Mil. avv. 490-yil', 'Milodiy 1-yil'],
        correctAnswer: 0,
        explanation: 'Qadimgi ma’lumotlarga ko‘ra, birinchi Olimpiya o‘yinlari mil. avv. 776-yilda o‘tkazilgan.',
      },
    ],
  },

  // 6-sinf: 4-dars
  {
    id: '6-sinf-4-dars-qadimgi-rim-respublika-va-imperiya',
    grade: '6-sinf',
    categoryId: 'qadimgi-rim',
    categoryName: 'Qadimgi Rim',
    title: '4-dars (6-sinf): Qadimgi Rim — Respublika davridan imperiyagacha',
    subtitle: 'Rimning barpo etilishi, Senat, legionlar, Yuliy Sezar, Rim raqamlari va Kolizey',
    readingTimeMinutes: 8,
    image: '/src/assets/images/ancient_rome_forum_1791870085158.jpg',
    objectives: [
      'Rim shahrining tashkil topishi va Respublika boshqaruv shakllarini bilish.',
      'Yuliy Sezarning yuksalishi va Oktavian Avgust davrida imperiyaning shakllanishini o‘rganish.',
      'Rim raqamlari, Rim huquqi va muhandislik yutuqlarini (akveduk, Kolizey, beton) anglash.',
    ],
    overview:
      'Qadimgi Rim — kichik dehqonlar qishlog‘idan boshlanib, uch qit’ani (Yevropa, Osiyo, Afrika) qamrab olgan qudratli saltanatga aylandi. U zamonaviy dunyoga qonunlar, Rim raqamlari, arxitektura va kalendarni meros qoldirdi.',
    historicalContext:
      'Rim tarixi Podsholik (mil. avv. 753–509), Respublika (mil. avv. 509–27) va Imperiya (mil. avv. 27 – mil. 476) davrlariga bo‘linadi. Respublika davrida Rim Senat va xalq yig‘ini orqali boshqarildi. Karfagen bilan urushlarda g‘alaba qozondi. Yuliy Sezar harbiy diktaturani o‘rnatdi, ammo mil. avv. 44-yilda suiqasd qurboni bo‘ldi. Mil. avv. 27-yilda esa Oktavian Avgust birinchi imperator bo‘ldi.',
    factsVsLegends: {
      legend: 'Rimga ona bo‘ri emizgan Romul va Rem asos solgan degan afsona bor.',
      fact: 'Arxeologik topilmalar Tiber daryosi bo‘yidagi tepaliklarda lotin va sabin qabilalari birlashib, Rim shahrini bunyod etganini ko‘rsatadi.',
    },
    importantDates: [
      { year: 'Mil. avv. 753', event: 'Rim shahrining an’anaviy asos solingan yili.' },
      { year: 'Mil. avv. 509', event: 'Rim Respublikasining e’lon qilinishi.' },
      { year: 'Mil. avv. 44 (15-mart)', event: 'Yuliy Sezarning Senatda o‘ldirilishi.' },
      { year: 'Mil. avv. 27', event: 'Oktavian Avgust imperator bo‘lishi va Rim imperiyasi davrining boshlanishi.' },
      { year: 'Milodiy 476', event: 'G‘arbiy Rim imperiyasining qulashi (Qadimgi dunyo tarixining yakuni).' },
    ],
    historicalFigures: [
      {
        name: 'Gaius Julius Caesar (Yuliy Sezar)',
        role: 'Sarkarda va diktator',
        period: 'Mil. avv. 100 — 44',
        description: 'Galliyani zabt etgan, kalendar islohoti o‘tkazgan va yakka hokimlikni o‘rnatgan Rim harbiy arbobi.',
      },
      {
        name: 'Oktavian Avgust',
        role: 'Birinchi Rim imperatori',
        period: 'Mil. avv. 63 — mil. 14',
        description: 'Rim imperiyasiga asos solgan va poytaxtni marmar shaharga aylantirgan siyosatchi.',
      },
    ],
    keyFacts: [
      'Rim raqamlari (I, V, X, L, C, D, M) imperiyaning rasmiy hisob vositasi bo‘lgan.',
      'Rim me’morlari beton va ravoq usulini ixtiro qilib, 50,000 tomoshabinga mo‘ljallangan Kolizeyni qurdilar.',
    ],
    summary:
      'Qadimgi Rim respublika va imperiya davrlarida harbiy intizom, qonunchilik va me’morchilikda dunyo andozalarini yaratdi.',
    miniQuiz: [
      {
        id: '6m-7',
        question: 'Rimning birinchi imperatori kim bo‘lgan?',
        options: ['Yuliy Sezar', 'Oktavian Avgust', 'Tiberiy', 'Trayan'],
        correctAnswer: 1,
        explanation: 'Miloddan avvalgi 27-yilda Oktavian Avgust birinchi imperator deb e’lon qilingan.',
      },
      {
        id: '6m-8',
        question: 'G‘arbiy Rim imperiyasi qaysi yilda qulab, Qadimgi dunyo yakun topgan?',
        options: ['Mil. avv. 44-yil', 'Milodiy 395-yil', 'Milodiy 476-yil', 'Milodiy 1453-yil'],
        correctAnswer: 2,
        explanation: 'Milodiy 476-yilda Romul Avgustul taxtdan ag‘darilib, G‘arbiy Rim o‘z mavjudligini tugatgan.',
      },
    ],
  },

  // 6-sinf: 5-dars
  {
    id: '6-sinf-5-dars-qadimgi-ozbekiston-va-spitamen',
    grade: '6-sinf',
    categoryId: 'ozbekiston-tarixi',
    categoryName: 'O‘zbekiston tarixi',
    title: '5-dars (6-sinf): Qadimgi O‘zbekiston davlatlari va Spitamen jasorati',
    subtitle: 'Qadimgi Baqtriya, So‘g‘diyona, Iskandarga qarshi Spitamen qo‘zg‘oloni va Kushon podsholigi',
    readingTimeMinutes: 8,
    image: '/src/assets/images/uzbekistan_samarkand_1791870085081.jpg',
    objectives: [
      'Miloddan avvalgi I ming yillikda O‘zbekiston hududidagi davlatlar (Baqtriya, Xorazm, So‘g‘d) asoslarini bilish.',
      'Spitamenning Aleksandr Makedonskiyga qarshi olib borgan fidokorona kurashini tahlil qilish.',
      'Kushon podsholigi davrida savdo, madaniyat va dinlar uyg‘unligini o‘rganish.',
    ],
    overview:
      '6-sinf o‘quvchilari uchun O‘zbekistonning qadimiy davlatchiligi Qadimgi Baqtriya, Katta Xorazm va So‘g‘diyona misolida o‘rganiladi. Spitamenning ozodlik kurashi xalqimizning jasorat va or-nomus ramzidir.',
    historicalContext:
      'Miloddan avvalgi 329-yilda Aleksandr Makedonskiy Movarounnahrga bostirib kirdi. So‘g‘d sarkardasi Spitamen unga qarshi 3 yil davomida partizanlik kurashini olib bordi. Politimet (Zarafshon) daryosi bo‘yidagi jangda Spitamen makedon qo‘shinini butunlay tor-mor etdi. Keyinchalik milodiy I–III asrlarda bu zaminlarda buyuk Kushon podsholigi gullab-yashnadi va Kanishka I davrida jahonning to‘rtta buyuk imperiyasidan biriga aylandi.',
    factsVsLegends: {
      legend: 'Iskandar So‘g‘diyonani osonlikcha zabt etgan degan afsona bor.',
      fact: 'Iskandar So‘g‘diyona va Baqtriyada uch yil ushlanib qoldi va o‘zining eng og‘ir talafotlarini ko‘rib, aslzoda Oksiatning qizi Raxshonaga uylanishga majbur bo‘ldi.',
    },
    importantDates: [
      { year: 'Mil. avv. 329 — 327', event: 'Spitamen boshchiligida Iskandar qo‘shinlariga qarshi xalq ozodlik qo‘zg‘oloni.' },
      { year: 'Mil. avv. III asr', event: 'Yunon-Baqtriya davlatining tashkil topishi.' },
      { year: 'I — III asrlar', event: 'Buyuk Kushon podsholigining gullab-yashnashi.' },
    ],
    historicalFigures: [
      {
        name: 'Spitamen',
        role: 'So‘g‘d sarkardasi va xalq qahramoni',
        period: 'Mil. avv. IV asr',
        description: 'Makedoniyalik Iskandar qo‘shinini birinchi bo‘lib ochiq jangda yenggan buyuk vatanparvar.',
      },
      {
        name: 'Kanishka I',
        role: 'Kushon imperatori',
        period: 'II asr',
        description: 'Kushon davlatini qudratli imperiyaga aylantirgan va Buyuk Ipak yo‘lini rivojlantirgan podsho.',
      },
    ],
    keyFacts: [
      'Politimet (Zarafshon) jangi Iskandarning butun Sharq yurishida uning qo‘shinlari mag‘lub bo‘lgan yagona yirik jangi edi.',
      'Kushon podsholigi davrida Movarounnahr orqali Rim, Xitoy va Hindiston o‘rtasida gavjum savdo aloqalari yo‘lga qo‘yilgan.',
    ],
    summary:
      'Qadimgi Baqtriya va So‘g‘d zamonaviy davlatchiligimiz asoschilari bo‘lib, Spitamen jasorati xalqimiz tarixining eng shonli sahifasidir.',
    miniQuiz: [
      {
        id: '6m-9',
        question: 'Spitamen kimga qarshi 3 yil ozodlik kurashini olib borgan?',
        options: ['Kir II ga qarshi', 'Aleksandr Makedonskiyga qarshi', 'Doro I ga qarshi', 'Yuliy Sezarga qarshi'],
        correctAnswer: 1,
        explanation: 'Spitamen mil. avv. 329–327-yillarda Aleksandr Makedonskiyga qarshi mardonavor kurashgan.',
      },
      {
        id: '6m-10',
        question: 'Zarafshon daryosi qadimgi yunon manbalarida qanday nomlangan?',
        options: ['Oks', 'Yaksart', 'Politimet', 'Nil'],
        correctAnswer: 2,
        explanation: 'Zarafshon daryosi yunon manbalarida "Politimet" (Ko‘p qimmatli daryo) deb atalgan.',
      },
    ],
  },

  // 6-sinf: 6-dars
  {
    id: '6-sinf-6-dars-buyuk-geografik-kashfiyotlar',
    grade: '6-sinf',
    categoryId: 'jahon-tarixi',
    categoryName: 'Jahon tarixi',
    title: '6-dars (6-sinf): Buyuk geografik kashfiyotlar va yangi dunyo xaritasi',
    subtitle: 'Kolumb, Vasko da Gama, Fernand Magellan sayohatlari va yangi zamon sari burilish',
    readingTimeMinutes: 7,
    image: '/src/assets/images/ancient_rome_forum_1791870085158.jpg',
    objectives: [
      'Yevropaliklarning Sharqqa dengiz yo‘llarini izlash sabablarini bilish.',
      'Kolumb, Vasko da Gama va Fernand Magellanning sayohatlarini o‘rganish.',
      'Geografik kashfiyotlarning jahon savdosi va xaritashunosligiga ta’sirini tahlil qilish.',
    ],
    overview:
      'XV asr oxiri va XVI asr boshlarida noma’lum okeanlar bo‘ylab qilingan sayohatlar natijasida yer yuzi xalqlari bir-biri bilan bevosita bog‘landi. Bu davr insoniyat tarixida "Buyuk geografik kashfiyotlar" davri deb ataladi.',
    historicalContext:
      '1453-yilda Usmoniylar Konstantinopolni egallagach, quruqlikdagi savdo yo‘llari to‘sildi. Yevropaliklar Hindistonga boradigan dengiz yo‘lini izlashga majbur bo‘ldilar. 1492-yilda Kolumb Atlantika okeanini kesib o‘tib, Amerika qit’asini kashf qildi. 1498-yilda Vasko da Gama Hindistonga yetib bordi, 1519–1522-yillarda esa Magellan ekspeditsiyasi ilk bor Yer sharini to‘liq aylanib chiqdi.',
    factsVsLegends: {
      legend: 'Magellanning o‘zi dunyo bo‘ylab sayohatni oxirigacha yetkazgan.',
      fact: 'Magellan Filippin orollarida to‘qnashuvda halok bo‘lgan, sayohatni Xuan Sebastyan Elkano "Viktoriya" kemasida yakunlagan.',
    },
    importantDates: [
      { year: '1492-yil 12-oktabr', event: 'Kolumb tomonidan Amerika qit’asining kashf etilishi.' },
      { year: '1498-yil', event: 'Vasko da Gama Hindiston qirg‘oqlariga yetib borishi.' },
      { year: '1519 — 1522', event: 'Dunyoni ilk bor to‘liq aylanib chiqqan dengiz ekspeditsiyasi.' },
    ],
    historicalFigures: [
      {
        name: 'Xristofor Kolumb (1451–1506)',
        role: 'Dengizchi sayohatchi',
        period: 'XV — XVI asr',
        description: 'Yangi Dunyo (Amerika) eshigini ochgan italiyalik-ispan dengizchisi.',
      },
      {
        name: 'Fernand Magellan (1480–1521)',
        role: 'Dengizchi sarkarda',
        period: 'XVI asr',
        description: 'Yer sharining dumaloqligini amaliy dengiz sayohati orqali isbotlagan ekspeditsiya rahbari.',
      },
    ],
    keyFacts: [
      'Kashfiyotlar tufayli kartoshka, pomidor, makkajo‘xori va shokolad (kakao) butun dunyoga tarqalgan.',
      'Sayohatlar yelkanli kemalar — karavellalar va kompas vositasida amalga oshirilgan.',
    ],
    summary:
      'Buyuk geografik kashfiyotlar butun dunyo qit’alarini yagona savdo va madaniyat tizimiga birlashtirdi.',
    miniQuiz: [
      {
        id: '6m-11',
        question: 'Xristofor Kolumb Yangi Dunyo qirg‘oqlariga qaysi yilda qadam qo‘ygan?',
        options: ['1453-yil', '1492-yil', '1519-yil', '1789-yil'],
        correctAnswer: 1,
        explanation: 'Kolumb 1492-yil 12-oktabrda San-Salvador oroliga yetib borgan.',
      },
      {
        id: '6m-12',
        question: 'Ilk bor Yer sharini to‘liq aylanib chiqqan ekspeditsiyaga kim rahbarlik qilgan?',
        options: ['Fernand Magellan', 'Vasko da Gama', 'Jeyms Kuk', 'Marko Polo'],
        correctAnswer: 0,
        explanation: '1519–1522-yillarda Fernand Magellan ekspeditsiyasi dunyoni to‘liq aylanib chiqqan.',
      },
    ],
  },
];
