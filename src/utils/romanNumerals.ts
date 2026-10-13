/**
 * Rim raqamlarini hisoblash, o'girish va tekshirish qoidalari
 */

export interface RomanSymbol {
  symbol: string;
  value: number;
  description: string;
}

export const ROMAN_SYMBOLS: RomanSymbol[] = [
  { symbol: 'I', value: 1, description: 'Birlik (1)' },
  { symbol: 'V', value: 5, description: 'Beshlik (5)' },
  { symbol: 'X', value: 10, description: 'O‘nlik (10)' },
  { symbol: 'L', value: 50, description: 'Ellik (50)' },
  { symbol: 'C', value: 100, description: 'Yuzlik (100)' },
  { symbol: 'D', value: 500, description: 'Besh yuzlik (500)' },
  { symbol: 'M', value: 1000, description: 'Minglik (1000)' },
];

export const ROMAN_RULES_EXAMPLES = [
  { roman: 'IV', arabic: 4, rule: 'Ayirish qoidasi: 5 dan 1 ayiriladi (5 - 1 = 4)' },
  { roman: 'IX', arabic: 9, rule: 'Ayirish qoidasi: 10 dan 1 ayiriladi (10 - 1 = 9)' },
  { roman: 'XIV', arabic: 14, rule: 'Qo‘shish va ayirish: 10 + (5 - 1) = 14' },
  { roman: 'XL', arabic: 40, rule: 'Ayirish qoidasi: 50 dan 10 ayiriladi (50 - 10 = 40)' },
  { roman: 'XC', arabic: 90, rule: 'Ayirish qoidasi: 100 dan 10 ayiriladi (100 - 10 = 90)' },
  { roman: 'CD', arabic: 400, rule: 'Ayirish qoidasi: 500 dan 100 ayiriladi (500 - 100 = 400)' },
  { roman: 'CM', arabic: 900, rule: 'Ayirish qoidasi: 1000 dan 100 ayiriladi (1000 - 100 = 900)' },
  { roman: 'MMXXVI', arabic: 2026, rule: '1000 + 1000 + 10 + 10 + 5 + 1 = 2026-yil' },
];

/**
 * 5- va 6-sinf tarix darslarida asrlar Rim raqamlarida yoziladi (I asr — XXI asr)
 */
export interface CenturyInfo {
  centuryRoman: string;
  centuryNumber: number;
  yearsSpan: string;
  historicalEra: string;
}

export const ROMAN_CENTURIES: CenturyInfo[] = [
  { centuryRoman: 'I asr', centuryNumber: 1, yearsSpan: '1 – 100-yillar', historicalEra: 'Qadimgi Rim imperiyasi, Antik davr' },
  { centuryRoman: 'II asr', centuryNumber: 2, yearsSpan: '101 – 200-yillar', historicalEra: 'Rim imperiyasining "Oltin asri", Kushon podsholigi' },
  { centuryRoman: 'III asr', centuryNumber: 3, yearsSpan: '201 – 300-yillar', historicalEra: 'Rimda harbiy inqiroz, Sosoniylar davlati' },
  { centuryRoman: 'IV asr', centuryNumber: 4, yearsSpan: '301 – 400-yillar', historicalEra: 'Konstantinopol poytaxt bo‘lishi, Xioniylar' },
  { centuryRoman: 'V asr', centuryNumber: 5, yearsSpan: '401 – 500-yillar', historicalEra: '476-y. G‘arbiy Rim qulashi, Qadimgi dunyo yakuni' },
  { centuryRoman: 'VI asr', centuryNumber: 6, yearsSpan: '501 – 600-yillar', historicalEra: 'Turk xoqonligi tashkil topishi' },
  { centuryRoman: 'VII asr', centuryNumber: 7, yearsSpan: '601 – 700-yillar', historicalEra: 'Arab xalifaligi, Islom dinining yoyilishi' },
  { centuryRoman: 'VIII asr', centuryNumber: 8, yearsSpan: '701 – 800-yillar', historicalEra: 'Movarounnahrda Muqanna qo‘zg‘oloni' },
  { centuryRoman: 'IX asr', centuryNumber: 9, yearsSpan: '801 – 900-yillar', historicalEra: 'Al-Xorazmiy davri, Somoniylar davlati' },
  { centuryRoman: 'X asr', centuryNumber: 10, yearsSpan: '901 – 1000-yillar', historicalEra: 'Ibn Sino va Beruniy, Qoraxoniylar davlati' },
  { centuryRoman: 'XI asr', centuryNumber: 11, yearsSpan: '1001 – 1100-yillar', historicalEra: 'Xorazm Ma’mun akademiyasi, Saljuqiylar' },
  { centuryRoman: 'XII asr', centuryNumber: 12, yearsSpan: '1101 – 1200-yillar', historicalEra: 'Xorazmshohlar qudrati, Minorai Kalon' },
  { centuryRoman: 'XIII asr', centuryNumber: 13, yearsSpan: '1201 – 1300-yillar', historicalEra: 'Jaloliddin Manguberdi jasorati, Mo‘g‘ullar istilosi' },
  { centuryRoman: 'XIV asr', centuryNumber: 14, yearsSpan: '1301 – 1400-yillar', historicalEra: 'Sohibqiron Amir Temur saltanati (1370–1405)' },
  { centuryRoman: 'XV asr', centuryNumber: 15, yearsSpan: '1401 – 1500-yillar', historicalEra: 'Mirzo Ulug‘bek, Alisher Navoiy, Buyuk geografik kashfiyotlar' },
  { centuryRoman: 'XVI asr', centuryNumber: 16, yearsSpan: '1501 – 1600-yillar', historicalEra: 'Boburiy Hindiston saltanati, Shayboniylar' },
  { centuryRoman: 'XVII asr', centuryNumber: 17, yearsSpan: '1601 – 1700-yillar', historicalEra: 'Ashtarxoniylar, Samarqand Registoni Tillakori madrasasi' },
  { centuryRoman: 'XVIII asr', centuryNumber: 18, yearsSpan: '1701 – 1800-yillar', historicalEra: 'Buxoro, Xiva va Qo‘qon xonliklari davri, Sanoat inqilobi' },
  { centuryRoman: 'XIX asr', centuryNumber: 19, yearsSpan: '1801 – 1900-yillar', historicalEra: 'Yangi davr, jadidchilik harakatining kurtaklari' },
  { centuryRoman: 'XX asr', centuryNumber: 20, yearsSpan: '1901 – 2000-yillar', historicalEra: 'Jadid ma’rifatparvarligi, 1991-y. O‘zbekiston mustaqilligi' },
  { centuryRoman: 'XXI asr', centuryNumber: 21, yearsSpan: '2001 – 2100-yillar', historicalEra: 'Zamonaviy davr (hozirgi kunimiz)' },
];

export const ROMAN_KEY_GROUPS = [
  {
    name: 'Birliklar (1–9)',
    items: [
      { arabic: 1, roman: 'I' },
      { arabic: 2, roman: 'II' },
      { arabic: 3, roman: 'III' },
      { arabic: 4, roman: 'IV' },
      { arabic: 5, roman: 'V' },
      { arabic: 6, roman: 'VI' },
      { arabic: 7, roman: 'VII' },
      { arabic: 8, roman: 'VIII' },
      { arabic: 9, roman: 'IX' },
    ],
  },
  {
    name: 'O‘nliklar (10–90)',
    items: [
      { arabic: 10, roman: 'X' },
      { arabic: 20, roman: 'XX' },
      { arabic: 30, roman: 'XXX' },
      { arabic: 40, roman: 'XL' },
      { arabic: 50, roman: 'L' },
      { arabic: 60, roman: 'LX' },
      { arabic: 70, roman: 'LXX' },
      { arabic: 80, roman: 'LXXX' },
      { arabic: 90, roman: 'XC' },
    ],
  },
  {
    name: 'Yuzliklar (100–900)',
    items: [
      { arabic: 100, roman: 'C' },
      { arabic: 200, roman: 'CC' },
      { arabic: 300, roman: 'CCC' },
      { arabic: 400, roman: 'CD' },
      { arabic: 500, roman: 'D' },
      { arabic: 600, roman: 'DC' },
      { arabic: 700, roman: 'DCC' },
      { arabic: 800, roman: 'DCCC' },
      { arabic: 900, roman: 'CM' },
    ],
  },
  {
    name: 'Mingliklar (1000–3000)',
    items: [
      { arabic: 1000, roman: 'M' },
      { arabic: 2000, roman: 'MM' },
      { arabic: 3000, roman: 'MMM' },
      { arabic: 3999, roman: 'MMMCMXCIX' },
    ],
  },
];

const ROMAN_MAP: { value: number; symbol: string }[] = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' },
];

/**
 * 1 dan 100 gacha to'liq jadvalni olish
 */
export function getAll1to100(): { arabic: number; roman: string }[] {
  const result: { arabic: number; roman: string }[] = [];
  for (let i = 1; i <= 100; i++) {
    const conv = arabicToRoman(i);
    result.push({ arabic: i, roman: conv.result || '' });
  }
  return result;
}

/**
 * Arab raqamini Rim raqamiga o'girish (1 dan 3999 gacha)
 */
export function arabicToRoman(num: number): { success: boolean; result?: string; error?: string } {
  if (isNaN(num) || !Number.isInteger(num)) {
    return { success: false, error: 'Iltimos, butun son kiriting.' };
  }
  if (num < 1) {
    return { success: false, error: 'Rim raqamlarida nol yoki manfiy sonlar mavjud emas (kamida 1 bo‘lishi kerak).' };
  }
  if (num > 3999) {
    return { success: false, error: 'Standart Rim raqamlari tizimi 1 dan 3999 gacha bo‘lgan sonlarni ifodalaydi.' };
  }

  let remaining = num;
  let roman = '';

  for (const item of ROMAN_MAP) {
    while (remaining >= item.value) {
      roman += item.symbol;
      remaining -= item.value;
    }
  }

  return { success: true, result: roman };
}

/**
 * Rim raqamini tekshirish va xatolik sababini tushuntirish
 */
export function validateRomanNumeral(raw: string): { isValid: boolean; error?: string } {
  const clean = raw.trim().toUpperCase();

  if (!clean) {
    return { isValid: false, error: 'Rim raqamini kiriting.' };
  }

  // Notog'ri belgilar borligini tekshirish
  const invalidChars = clean.replace(/[IVXLCDM]/g, '');
  if (invalidChars.length > 0) {
    return {
      isValid: false,
      error: `Noto‘g‘ri belgilar aniqlandi: "${invalidChars}". Faqat I, V, X, L, C, D, M belgilaridan foydalaning.`,
    };
  }

  // Takrorlanmas belgilar tekshiruvi (V, L, D)
  if (/V{2,}/.test(clean)) {
    return { isValid: false, error: '"V" (5) belgisi ketma-ket takrorlanmaydi. 10 uchun "X" ishlatiladi.' };
  }
  if (/L{2,}/.test(clean)) {
    return { isValid: false, error: '"L" (50) belgisi ketma-ket takrorlanmaydi. 100 uchun "C" ishlatiladi.' };
  }
  if (/D{2,}/.test(clean)) {
    return { isValid: false, error: '"D" (500) belgisi ketma-ket takrorlanmaydi. 1000 uchun "M" ishlatiladi.' };
  }

  // 4 ta bir xil belgi ketma-ket kelishi mumkin emas
  if (/I{4,}/.test(clean)) {
    return { isValid: false, error: '"I" ketma-ket 4 marta yozilmaydi. 4 soni "IV" tarzida yoziladi.' };
  }
  if (/X{4,}/.test(clean)) {
    return { isValid: false, error: '"X" ketma-ket 4 marta yozilmaydi. 40 soni "XL" tarzida yoziladi.' };
  }
  if (/C{4,}/.test(clean)) {
    return { isValid: false, error: '"C" ketma-ket 4 marta yozilmaydi. 400 soni "CD" tarzida yoziladi.' };
  }
  if (/M{4,}/.test(clean)) {
    return { isValid: false, error: 'Standart Rim raqamlarida "M" 3 martadan ortiq ketma-ket yozilmaydi (maksimal 3999).' };
  }

  // Noto'g'ri ayirish birikmalari
  if (/IL|IC|ID|IM/.test(clean)) {
    return { isValid: false, error: '"I" faqat "V" va "X" dan ayirilishi mumkin (masalan: IV=4, IX=9). 99 uchun "XCIX" yoziladi.' };
  }
  if (/XD|XM/.test(clean)) {
    return { isValid: false, error: '"X" faqat "L" va "C" dan ayirilishi mumkin (masalan: XL=40, XC=90).' };
  }
  if (/VX|VL|VC|VD|VM/.test(clean)) {
    return { isValid: false, error: '"V" belgisi boshqa kattaroq belgilardan hech qachon ayirilmaydi.' };
  }
  if (/LC|LD|LM/.test(clean)) {
    return { isValid: false, error: '"L" belgisi boshqa kattaroq belgilardan hech qachon ayirilmaydi.' };
  }
  if (/DM/.test(clean)) {
    return { isValid: false, error: '"D" belgisi "M" dan ayirilmaydi. 900 uchun "CM" ishlatiladi.' };
  }

  // Standart qat'iy Rim raqami formati regex tekshiruvi
  const strictPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!strictPattern.test(clean)) {
    return {
      isValid: false,
      error: `"${clean}" yozuvi Rim raqamlarining standart qoidalariga mos emas. Harflar ketma-ketligini tekshiring.`,
    };
  }

  return { isValid: true };
}

/**
 * Rim raqamini Arab soniga o'girish (qatiy tekshiruv bilan)
 */
export function romanToArabic(raw: string): { success: boolean; result?: number; breakdown?: string; error?: string } {
  const clean = raw.trim().toUpperCase();
  const validation = validateRomanNumeral(clean);

  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const values: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  const steps: string[] = [];

  for (let i = 0; i < clean.length; i++) {
    const current = values[clean[i]];
    const next = i + 1 < clean.length ? values[clean[i + 1]] : 0;

    if (next > current) {
      // Subtraction rule (e.g., IV = 4, IX = 9)
      const diff = next - current;
      total += diff;
      steps.push(`(${clean[i + 1]} - ${clean[i]} = ${diff})`);
      i++; // Skip next
    } else {
      total += current;
      steps.push(`${clean[i]}=${current}`);
    }
  }

  return {
    success: true,
    result: total,
    breakdown: steps.join(' + ') + ` = ${total}`,
  };
}

/**
 * Tasodifiy mashq yaratish
 */
export interface RomanPracticeItem {
  id: string;
  type: 'toArabic' | 'toRoman';
  arabic: number;
  roman: string;
  options: (string | number)[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
}

export function generatePracticeQuestion(difficulty: 'oson' | 'orta' | 'qiyin'): RomanPracticeItem {
  let min = 1;
  let max = 50;

  if (difficulty === 'orta') {
    min = 40;
    max = 500;
  } else if (difficulty === 'qiyin') {
    min = 400;
    max = 3999;
  }

  const arabic = Math.floor(Math.random() * (max - min + 1)) + min;
  const conv = arabicToRoman(arabic);
  const roman = conv.result || 'X';

  const isToArabic = Math.random() > 0.5;

  if (isToArabic) {
    // Rim -> Arab
    const distractor1 = Math.max(1, arabic + (Math.random() > 0.5 ? 1 : -1) * (difficulty === 'oson' ? 1 : 10));
    const distractor2 = Math.max(1, arabic + (Math.random() > 0.5 ? 2 : -2) * (difficulty === 'oson' ? 2 : 5));
    const distractor3 = Math.max(1, arabic + (Math.random() > 0.5 ? 5 : -5));

    const optionsSet = new Set<number>([arabic, distractor1, distractor2, distractor3]);
    let counter = 1;
    while (optionsSet.size < 4) {
      optionsSet.add(arabic + counter);
      counter++;
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      id: Math.random().toString(36).substring(2, 9),
      type: 'toArabic',
      arabic,
      roman,
      options,
      correctAnswer: arabic,
      explanation: `${roman} rim raqami arab raqamida ${arabic} ga teng.`,
      difficulty,
    };
  } else {
    // Arab -> Rim
    const altArabic1 = Math.max(1, arabic + (Math.random() > 0.5 ? 1 : -1));
    const altArabic2 = Math.max(1, arabic + (Math.random() > 0.5 ? 5 : -5));
    const altArabic3 = Math.max(1, arabic + (Math.random() > 0.5 ? 10 : -10));

    const r1 = arabicToRoman(altArabic1).result || 'I';
    const r2 = arabicToRoman(altArabic2).result || 'V';
    const r3 = arabicToRoman(altArabic3).result || 'X';

    const optionsSet = new Set<string>([roman, r1, r2, r3]);
    let off = 2;
    while (optionsSet.size < 4) {
      const extra = arabicToRoman(arabic + off).result;
      if (extra) optionsSet.add(extra);
      off += 3;
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      id: Math.random().toString(36).substring(2, 9),
      type: 'toRoman',
      arabic,
      roman,
      options,
      correctAnswer: roman,
      explanation: `${arabic} soni Rim raqamida ${roman} deb yoziladi.`,
      difficulty,
    };
  }
}
