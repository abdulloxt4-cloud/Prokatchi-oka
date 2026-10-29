
'use strict';
(() => {
  const TABLE = {
  "PROKATCHI OKA — Qurilish uskunalari ijarasi": {
    "ru": "PROKATCHI OKA — аренда строительного оборудования",
    "en": "PROKATCHI OKA — construction equipment rental"
  },
  "Asosiy qismga o‘tish": {
    "ru": "Перейти к содержанию",
    "en": "Skip to content"
  },
  "Qurilish uskunalari ijarasi": {
    "ru": "Аренда строительного оборудования",
    "en": "Construction equipment rental"
  },
  "IJARA KOMPANIYASI": {
    "ru": "АРЕНДА ОБОРУДОВАНИЯ",
    "en": "EQUIPMENT RENTAL"
  },
  "Bosh sahifa": {
    "ru": "Главная",
    "en": "Home"
  },
  "Kategoriyalar": {
    "ru": "Категории",
    "en": "Categories"
  },
  "Katalog": {
    "ru": "Каталог",
    "en": "Catalog"
  },
  "Xizmatlar": {
    "ru": "Услуги",
    "en": "Services"
  },
  "Aloqa": {
    "ru": "Контакты",
    "en": "Contact"
  },
  "ISHONCHLI IJARA XIZMATI": {
    "ru": "НАДЁЖНЫЙ ПРОКАТ",
    "en": "RELIABLE RENTAL SERVICE"
  },
  "Qurilish va ta’mirlash uchun kerakli uskunalarni bir joydan toping. Katalogni ko‘ring, ma’lumot oling va kerakli filial bilan bog‘laning.": {
    "ru": "Всё необходимое оборудование для строительства и ремонта в одном месте. Изучите каталог и свяжитесь с удобным филиалом.",
    "en": "Find the construction and renovation equipment you need in one place. Explore the catalog and contact a convenient branch."
  },
  "Katalogni ko‘rish": {
    "ru": "Смотреть каталог",
    "en": "View catalog"
  },
  "Biz bilan bog‘lanish": {
    "ru": "Связаться с нами",
    "en": "Contact us"
  },
  "Uskunalar suratlari bilan katalog": {
    "ru": "Каталог с фотографиями оборудования",
    "en": "Equipment catalog with photos"
  },
  "ISHONCHLI XIZMAT": {
    "ru": "НАДЁЖНЫЙ СЕРВИС",
    "en": "RELIABLE SERVICE"
  },
  "SIFAT KAFOLATI": {
    "ru": "ГАРАНТИЯ КАЧЕСТВА",
    "en": "QUALITY GUARANTEE"
  },
  "Mahsulot kartasi": {
    "ru": "Карточек товаров",
    "en": "Product listings"
  },
  "Uskuna kategoriyasi": {
    "ru": "Категорий оборудования",
    "en": "Equipment categories"
  },
  "Toshkentdagi filial": {
    "ru": "Филиала в Ташкенте",
    "en": "Branches in Tashkent"
  },
  "Savol?": {
    "ru": "Есть вопрос?",
    "en": "Questions?"
  },
  "Sayt yordamchisi": {
    "ru": "Помощник сайта",
    "en": "Website assistant"
  },
  "USKUNALAR TURLARI": {
    "ru": "ВИДЫ ОБОРУДОВАНИЯ",
    "en": "EQUIPMENT TYPES"
  },
  "Barcha kategoriyalar": {
    "ru": "Все категории",
    "en": "All categories"
  },
  "Beton ishlari": {
    "ru": "Бетонные работы",
    "en": "Concrete work"
  },
  "Elektr asboblar": {
    "ru": "Электроинструменты",
    "en": "Power tools"
  },
  "Maxsus texnika": {
    "ru": "Спецтехника",
    "en": "Heavy equipment"
  },
  "Payvandlash": {
    "ru": "Сварочное оборудование",
    "en": "Welding"
  },
  "Kesish uskunalari": {
    "ru": "Режущее оборудование",
    "en": "Cutting tools"
  },
  "Zichlash uskunalari": {
    "ru": "Уплотняющая техника",
    "en": "Compaction equipment"
  },
  "IJARAGA OLINADIGAN USKUNALAR": {
    "ru": "ОБОРУДОВАНИЕ В АРЕНДУ",
    "en": "EQUIPMENT FOR RENT"
  },
  "Mahsulotlar katalogi": {
    "ru": "Каталог оборудования",
    "en": "Equipment catalog"
  },
  "Texnika turlari alohida bo‘limlarda. Narx va mavjudlikni filial operatori tasdiqlaydi.": {
    "ru": "Техника распределена по разделам. Стоимость и наличие уточняйте у оператора филиала.",
    "en": "Equipment is grouped by category. Branch staff confirm prices and availability."
  },
  "mahsulot": {
    "ru": "товаров",
    "en": "products"
  },
  "Suratlar ma’lumotnoma sifatida berilgan; barcha apparatlar mavjudligini tekshiring.": {
    "ru": "Фотографии представлены для справки; наличие оборудования уточняйте.",
    "en": "Photos are for reference; please confirm equipment availability."
  },
  "Tozalash": {
    "ru": "Очистка",
    "en": "Cleaning"
  },
  "Mahsulotlar yuklanmoqda...": {
    "ru": "Загрузка товаров...",
    "en": "Loading products..."
  },
  "Texnik xususiyatlar va narxlar tasdiqlangach kiritiladi.": {
    "ru": "Характеристики и цены появятся после подтверждения.",
    "en": "Specifications and prices will be added after confirmation."
  },
  "Kerakli uskunani topmadingizmi?": {
    "ru": "Не нашли нужное оборудование?",
    "en": "Can't find the equipment you need?"
  },
  "Ishingizga kerakli": {
    "ru": "Нужная для вашей работы",
    "en": "The equipment you need"
  },
  "texnika shu yerda.": {
    "ru": "техника — здесь.",
    "en": "is right here."
  },
  "Uskunalarni ko‘rib chiqing, sizga qulay filialni tanlang va ijara shartlarini telefon orqali aniqlang.": {
    "ru": "Посмотрите оборудование, выберите филиал и уточните условия аренды по телефону.",
    "en": "Explore equipment, choose a branch and confirm rental terms by phone."
  },
  "Filiallar bilan bog‘lanish": {
    "ru": "Связаться с филиалами",
    "en": "Contact branches"
  },
  "NIMA UCHUN BIZ?": {
    "ru": "НАШИ ПРЕИМУЩЕСТВА",
    "en": "WHY CHOOSE US?"
  },
  "Qulaylik birinchi o‘rinda": {
    "ru": "Удобство — прежде всего",
    "en": "Convenience comes first"
  },
  "Tartibli katalog": {
    "ru": "Удобный каталог",
    "en": "Organized catalog"
  },
  "Maxsus texnika, kesish, payvandlash, tozalash va boshqa uskunalar alohida guruhlarda.": {
    "ru": "Спецтехника, резка, сварка, уборка и другие инструменты распределены по категориям.",
    "en": "Heavy equipment, cutting, welding, cleaning and other tools are in separate categories."
  },
  "Oson qidiruv": {
    "ru": "Простой поиск",
    "en": "Easy search"
  },
  "Nom yoki kategoriya orqali kerakli uskunani bir necha soniyada toping.": {
    "ru": "Находите нужную технику по названию или категории.",
    "en": "Find equipment by name or category in seconds."
  },
  "Chat katalog, filiallar va aloqa haqida oddiy savollarga avtomatik javob beradi.": {
    "ru": "Чат автоматически отвечает на простые вопросы о каталоге, филиалах и контактах.",
    "en": "The chat automatically answers simple questions about the catalog, branches and contacts."
  },
  "IJARA JARAYONI": {
    "ru": "КАК АРЕНДОВАТЬ",
    "en": "RENTAL PROCESS"
  },
  "Qanday ishlaydi?": {
    "ru": "Как это работает?",
    "en": "How does it work?"
  },
  "Uskunani tanlang": {
    "ru": "Выберите оборудование",
    "en": "Select equipment"
  },
  "Katalogdagi rasm, nom va tavsiflarni ko‘rib chiqing.": {
    "ru": "Посмотрите фотографии, названия и описания в каталоге.",
    "en": "Review photos, names and descriptions in the catalog."
  },
  "Filialni tanlang": {
    "ru": "Выберите филиал",
    "en": "Select branch"
  },
  "Gulzor yoki Ibn Sino filialiga qo‘ng‘iroq qiling.": {
    "ru": "Позвоните в филиал «Гульзор» или «Ибн Сино».",
    "en": "Call the Gulzor or Ibn Sino branch."
  },
  "Shartlarni kelishing": {
    "ru": "Уточните условия",
    "en": "Confirm terms"
  },
  "Narx, mavjudlik va ijara muddatini operator bilan tasdiqlang.": {
    "ru": "Уточните стоимость, наличие и срок аренды у оператора.",
    "en": "Confirm price, availability and rental duration with the operator."
  },
  "MANZIL VA KONTAKTLAR": {
    "ru": "АДРЕСА И КОНТАКТЫ",
    "en": "LOCATIONS & CONTACTS"
  },
  "Biz bilan bog‘laning": {
    "ru": "Свяжитесь с нами",
    "en": "Get in touch"
  },
  "Ikkala filialning telefonlari va xaritadagi joylashuvi quyida.": {
    "ru": "Ниже представлены телефоны и карты обоих филиалов.",
    "en": "See phone numbers and maps for both branches below."
  },
  "SAVOLLARINGIZ BORMI?": {
    "ru": "ОСТАЛИСЬ ВОПРОСЫ?",
    "en": "HAVE QUESTIONS?"
  },
  "Yordam beramiz.": {
    "ru": "Мы поможем.",
    "en": "We're here to help."
  },
  "Telefon yoki ijtimoiy tarmoqlarimiz orqali bog‘lanishingiz mumkin.": {
    "ru": "Позвоните нам или свяжитесь через социальные сети.",
    "en": "Call us or contact us through social media."
  },
  "Yozish": {
    "ru": "Написать",
    "en": "Message"
  },
  "Kontaktlar yuklanmoqda...": {
    "ru": "Загрузка контактов...",
    "en": "Loading contacts..."
  },
  "IJARA FORMASI": {
    "ru": "ЗАЯВКА НА АРЕНДУ",
    "en": "RENTAL INQUIRY"
  },
  "So‘rov qoldirish": {
    "ru": "Оставить заявку",
    "en": "Send inquiry"
  },
  "Ma’lumotlaringiz Flask serverdagi bazaga saqlanadi; avtomatik javob emas, operator tasdiqlashi kerak.": {
    "ru": "Ваша заявка сохраняется в базе Flask; детали подтверждает оператор, не автоответчик.",
    "en": "Your request is saved to the Flask database; an operator must confirm the details."
  },
  "Ismingiz *": {
    "ru": "Ваше имя *",
    "en": "Your name *"
  },
  "Telefon *": {
    "ru": "Телефон *",
    "en": "Phone *"
  },
  "Uskuna": {
    "ru": "Оборудование",
    "en": "Equipment"
  },
  "Qachondan kerak?": {
    "ru": "Дата начала",
    "en": "Start date"
  },
  "Filial": {
    "ru": "Филиал",
    "en": "Branch"
  },
  "Izoh": {
    "ru": "Комментарий",
    "en": "Notes"
  },
  "Sayt": {
    "ru": "Сайт",
    "en": "Website"
  },
  "Aloqa ma’lumotlarim so‘rovga javob berish maqsadida saqlanishiga roziman. *": {
    "ru": "Я согласен(на) на хранение контактных данных для ответа на мою заявку. *",
    "en": "I agree that my contact details may be stored to respond to my request. *"
  },
  "So‘rov yuborish": {
    "ru": "Отправить заявку",
    "en": "Send inquiry"
  },
  "FILIAL / XARITA": {
    "ru": "ФИЛИАЛ / КАРТА",
    "en": "BRANCH / MAP"
  },
  "Google Maps’da ochish": {
    "ru": "Открыть в Google Maps",
    "en": "Open in Google Maps"
  },
  "Qurilish va ta’mirlash uskunalarini tanlash uchun qulay katalog.": {
    "ru": "Удобный каталог строительного и ремонтного оборудования.",
    "en": "A convenient catalog of construction and renovation equipment."
  },
  "Saytdagi ijara narxlari operator orqali tasdiqlanadi.": {
    "ru": "Стоимость аренды уточняйте у оператора.",
    "en": "Rental prices are confirmed by branch staff."
  },
  "Yuqoriga": {
    "ru": "Наверх",
    "en": "Back to top"
  },
  "PROKATCHI OKA / MAHSULOT": {
    "ru": "PROKATCHI OKA / ОБОРУДОВАНИЕ",
    "en": "PROKATCHI OKA / PRODUCT"
  },
  "Avtomatik sayt yordamchisi": {
    "ru": "Автоматический помощник",
    "en": "Automated website assistant"
  },
  "Savolingiz": {
    "ru": "Ваш вопрос",
    "en": "Your question"
  },
  "Avtomatik javoblar · Narx va mavjudlikni filial tasdiqlaydi": {
    "ru": "Автоответы · Цену и наличие уточняйте в филиале",
    "en": "Auto replies · Branch staff confirm price and availability"
  },
  "Yordam kerakmi?": {
    "ru": "Нужна помощь?",
    "en": "Need help?"
  },
  "Shu uskuna uchun so‘rov": {
    "ru": "Заявка на это оборудование",
    "en": "Ask about this equipment"
  },
  "Batafsil": {
    "ru": "Подробнее",
    "en": "Details"
  },
  "So'rov": {
    "ru": "Заявка",
    "en": "Inquire"
  },
  "KUNLIK IJARA": {
    "ru": "АРЕНДА В ДЕНЬ",
    "en": "RENT PER DAY"
  },
  "Narxni so'rash": {
    "ru": "Уточнить цену",
    "en": "Ask for price"
  },
  "Barchasi": {
    "ru": "Все",
    "en": "All"
  },
  "Kesish va arralash": {
    "ru": "Резка и пиление",
    "en": "Cutting & sawing"
  },
  "Burg‘ulash va buzish": {
    "ru": "Сверление и демонтаж",
    "en": "Drilling & demolition"
  },
  "Zichlash": {
    "ru": "Уплотнение",
    "en": "Compaction"
  },
  "Silliqlash": {
    "ru": "Шлифовка",
    "en": "Sanding & grinding"
  },
  "Kompressorlar": {
    "ru": "Компрессоры",
    "en": "Compressors"
  },
  "Generator va elektr": {
    "ru": "Генераторы и электрика",
    "en": "Generators & power"
  },
  "Bo‘yash": {
    "ru": "Покраска",
    "en": "Painting"
  },
  "Isitish": {
    "ru": "Обогрев",
    "en": "Heating"
  },
  "Boshqa": {
    "ru": "Другое",
    "en": "Other"
  },
  "NAMUNAVIY KARTA": {
    "ru": "ОБРАЗЕЦ",
    "en": "SAMPLE LISTING"
  },
  "NAMUNA RASMI": {
    "ru": "ФОТО ДЛЯ ПРИМЕРА",
    "en": "REFERENCE PHOTO"
  },
  "FOTO KUTILMOQDA": {
    "ru": "ФОТО ОЖИДАЕТСЯ",
    "en": "PHOTO PENDING"
  },
  "Mahsulot tafsilotlari tez orada qo'shiladi.": {
    "ru": "Описание будет добавлено позже.",
    "en": "Product details coming soon."
  },
  "Bu so‘rov bo‘yicha mahsulot topilmadi. Boshqa so‘z bilan qidiring.": {
    "ru": "Ничего не найдено. Попробуйте другой запрос.",
    "en": "No products found. Try another search."
  },
  "Uskunani tanlang (ixtiyoriy)": {
    "ru": "Выберите оборудование (необязательно)",
    "en": "Choose equipment (optional)"
  },
  "Batafsil tavsif kiritilmagan.": {
    "ru": "Подробное описание пока не добавлено.",
    "en": "No detailed description yet."
  },
  "Texnik xususiyatlar faqat tasdiqlanganidan keyin qo‘shiladi.": {
    "ru": "Характеристики добавим после подтверждения.",
    "en": "Specifications will be added once confirmed."
  },
  "Bu mahsulot kartasi namunaviy; apparatning aniq modeli, rasmi va mavjudligi hali tasdiqlanmagan.": {
    "ru": "Это демонстрационная карточка; модель, фото и наличие пока не подтверждены.",
    "en": "This sample listing has an unconfirmed model, photo and availability."
  },
  "Rasm ma’lumotnoma sifatida berilgan. Aynan shu texnika mavjudligini filial bilan tasdiqlang.": {
    "ru": "Изображение для справки. Уточните наличие именно этой техники в филиале.",
    "en": "Reference image only. Confirm this specific equipment is available with the branch."
  },
  "Filial joylashuvi xaritada ko'rsatilgan": {
    "ru": "Расположение филиала показано на карте",
    "en": "Branch location shown on map"
  },
  "Ish vaqti: telefon orqali aniqlang": {
    "ru": "Время работы уточняйте по телефону",
    "en": "Confirm opening hours by phone"
  },
  "Google Maps’da ochish ↗": {
    "ru": "Открыть Google Maps ↗",
    "en": "Open Google Maps ↗"
  },
  "Telegram orqali yozish": {
    "ru": "Написать в Telegram",
    "en": "Message on Telegram"
  },
  "Instagram profil": {
    "ru": "Профиль Instagram",
    "en": "Instagram profile"
  },
  "Telefon raqamni tekshiring.": {
    "ru": "Проверьте номер телефона.",
    "en": "Please check the phone number."
  },
  "Yuborilmoqda...": {
    "ru": "Отправка...",
    "en": "Sending..."
  },
  "So‘rovni yuborish": {
    "ru": "Отправить заявку",
    "en": "Send inquiry"
  },
  "So‘rovingiz saqlandi va mas’ul shaxsga Telegram xabarnomasi yuborildi.": {
    "ru": "Заявка сохранена, уведомление отправлено в Telegram ответственному.",
    "en": "Your request was saved and a Telegram notification was sent."
  },
  "So‘rovingiz serverga saqlandi. Telegram xabarnomasi hali ulanmagan — bazani tekshirish kerak.": {
    "ru": "Заявка сохранена на сервере. Telegram-уведомления ещё не подключены.",
    "en": "Your request was saved on the server. Telegram notifications are not yet connected."
  },
  "Yozmoqda…": {
    "ru": "Печатает…",
    "en": "Typing…"
  },
  "Oka yordamchisi": {
    "ru": "Помощник Oka",
    "en": "Oka assistant"
  },
  "Siz": {
    "ru": "Вы",
    "en": "You"
  },
  "Narxlar": {
    "ru": "Цены",
    "en": "Prices"
  },
  "Filiallar": {
    "ru": "Филиалы",
    "en": "Branches"
  },
  "Barcha filiallar": {
    "ru": "Все филиалы",
    "en": "All branches"
  },
  "Gulzor filiali": {
    "ru": "Филиал «Гульзор»",
    "en": "Gulzor branch"
  },
  "Ibn Sino filiali": {
    "ru": "Филиал «Ибн Сино»",
    "en": "Ibn Sino branch"
  },
  "Telefon raqamlar": {
    "ru": "Телефоны",
    "en": "Phone numbers"
  },
  "Ijaraga olish": {
    "ru": "Арендовать",
    "en": "Rent equipment"
  },
  "Telegram": {
    "ru": "Telegram",
    "en": "Telegram"
  },
  "Burg‘ulash uskunalari": {
    "ru": "Буровое оборудование",
    "en": "Drilling equipment"
  },
  "Payvandlash uskunalari": {
    "ru": "Сварочное оборудование",
    "en": "Welding equipment"
  },
  "Frontal yuklagich": {
    "ru": "Фронтальный погрузчик",
    "en": "Wheel loader"
  },
  "Qurilish maydonlarida yuk ortish va tashish ishlariga mo‘ljallangan g‘ildirakli yuklagich. Parametrlari aniqlashtiriladi.": {
    "ru": "Техника для строительных и земляных работ. Точную модель и наличие уточняйте в филиале.",
    "en": "Equipment for construction and earthworks. Confirm model and availability with the branch."
  },
  "Komatsu ekskavatori": {
    "ru": "Экскаватор Komatsu",
    "en": "Komatsu excavator"
  },
  "Yer qazish va qurilish maydonidagi texnika ishlari uchun gusenitsali ekskavator. Model va mavjudligi tasdiqlanadi.": {
    "ru": "Техника для строительных и земляных работ. Точную модель и наличие уточняйте в филиале.",
    "en": "Equipment for construction and earthworks. Confirm model and availability with the branch."
  },
  "Liebherr LTM 1300-6.2 avtokran": {
    "ru": "Автокран Liebherr LTM 1300-6.2",
    "en": "Liebherr LTM 1300-6.2 mobile crane"
  },
  "Katta qurilish obyektlari uchun mobil kran turi. Aynan shu modelning mavjudligi va xizmat ko‘rsatish shartlari tasdiqlanishi kerak.": {
    "ru": "Техника для строительных и земляных работ. Точную модель и наличие уточняйте в филиале.",
    "en": "Equipment for construction and earthworks. Confirm model and availability with the branch."
  },
  "Ural samosval": {
    "ru": "Самосвал Урал",
    "en": "Ural dump truck"
  },
  "Qurilish materiallarini tashish uchun yuk mashinasi turi. Xizmat hududi va mavjudlik filial orqali tasdiqlanadi.": {
    "ru": "Техника для строительных и земляных работ. Точную модель и наличие уточняйте в филиале.",
    "en": "Equipment for construction and earthworks. Confirm model and availability with the branch."
  },
  "Beton kesish apparati": {
    "ru": "Аппарат для резки бетона",
    "en": "Concrete cutting machine"
  },
  "Diskli kesuvchi qurilma. Kesish chuqurligi, disk turi va modelini aniqlashtiring.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Burchakli arra — tortsovka": {
    "ru": "Торцовочная пила",
    "en": "Mitre saw"
  },
  "Yog‘och va boshqa mos materiallarni burchak ostida kesishga mo‘ljallangan statsionar arra.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Diskli beton kesish apparati": {
    "ru": "Дисковый бетонорез",
    "en": "Disc concrete cutter"
  },
  "Beton va qurilish materiallarini kesishga mo‘ljallangan diskli elektr uskuna. Model va texnik parametrlar filial bilan aniqlashtiriladi.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Diskli kesish mashinalari": {
    "ru": "Дисковые отрезные машины",
    "en": "Disc cutting machines"
  },
  "Suratda ikkita diskli kesish apparati ko‘rsatilgan; ularning modellari va ijaraga berish tartibi aniqlashtiriladi.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Plitka kesish stanogi": {
    "ru": "Плиткорезный станок",
    "en": "Tile cutting machine"
  },
  "Plitka va kafelni tekis kesish uchun yo‘naltirgichli uskuna.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Qo‘l frezeri": {
    "ru": "Ручной фрезер",
    "en": "Handheld router"
  },
  "Yog‘ochni ishlashda kesish va shakl berish uchun qo‘l frezeri.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Stol usti kesish stanogi": {
    "ru": "Настольный отрезной станок",
    "en": "Tabletop cutting machine"
  },
  "Aniq kesish ishlari uchun stolga o‘rnatiladigan elektr stanok.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "ZEROMAX CUT-45 plazma kesgichi": {
    "ru": "Плазморез ZEROMAX CUT-45",
    "en": "ZEROMAX CUT-45 plasma cutter"
  },
  "Suratda ZEROMAX CUT-45 deb belgilangan kesish apparati ko‘rsatilgan.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Zanjirli arra — 1": {
    "ru": "Цепная пила — 1",
    "en": "Chainsaw — 1"
  },
  "Yog‘och kesish ishlari uchun zanjirli arra. Modeli operator orqali tekshiriladi.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Zanjirli arra — 2": {
    "ru": "Цепная пила — 2",
    "en": "Chainsaw — 2"
  },
  "Suratda ko‘rsatilgan boshqa zanjirli arra modeli; mavjudligi tekshiriladi.": {
    "ru": "Инструмент для резки подходящих материалов. Модель и характеристики уточняйте у оператора.",
    "en": "Equipment for cutting suitable materials. Confirm the model and specifications with staff."
  },
  "Buzish perforatori": {
    "ru": "Отбойный перфоратор",
    "en": "Demolition rotary hammer"
  },
  "Qattiq materiallarni burg‘ulash va buzish uchun elektr uskuna.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Elektr beton buzish bolg‘asi": {
    "ru": "Электрический отбойный молоток",
    "en": "Electric demolition hammer"
  },
  "Beton va boshqa qattiq qurilish materiallarini buzish ishlarida ishlatiladigan elektr uskuna.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Elektr buzish bolg‘asi — 2": {
    "ru": "Отбойный молоток — 2",
    "en": "Demolition hammer — 2"
  },
  "Qurilish materiallarini buzishga mo‘ljallangan zarbli elektr asbob.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Olmosli burg‘ulash apparati": {
    "ru": "Алмазная буровая установка",
    "en": "Diamond core drill"
  },
  "Beton va qattiq materiallarda teshik ochish uchun uskuna. Komplekt va parametrlar filial orqali aniqlanadi.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Perforator": {
    "ru": "Перфоратор",
    "en": "Rotary hammer"
  },
  "Beton va devor materiallarini burg‘ulash uchun elektr perforator.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Yer burg‘ulash apparati": {
    "ru": "Мотобур",
    "en": "Earth auger"
  },
  "Tuproqda quduq va ustunlar uchun teshik ochishda ishlatiladigan motorli burg‘u.": {
    "ru": "Инструмент для бурения или демонтажных работ. Комплектацию и наличие уточняйте в филиале.",
    "en": "Tool for drilling or demolition tasks. Confirm accessories and availability with the branch."
  },
  "Armatura bukish stanogi": {
    "ru": "Станок для гибки арматуры",
    "en": "Rebar bending machine"
  },
  "Armatura elementlarini bukish uchun mo‘ljallangan stanok. Texnik imkoniyatlari va ijara shartlari aniqlashtiriladi.": {
    "ru": "Оборудование для работы с бетоном и строительными смесями. Характеристики уточняйте у оператора.",
    "en": "Equipment for concrete work and building mixes. Confirm specifications with staff."
  },
  "Beton silliqlash vertolyoti": {
    "ru": "Затирочная машина по бетону",
    "en": "Concrete power trowel"
  },
  "Beton pol yuzasini tekislash va silliqlashga mo‘ljallangan benzinli mashina.": {
    "ru": "Оборудование для работы с бетоном и строительными смесями. Характеристики уточняйте у оператора.",
    "en": "Equipment for concrete work and building mixes. Confirm specifications with staff."
  },
  "Qurilish aralashtirgichi": {
    "ru": "Строительный миксер",
    "en": "Construction mixer"
  },
  "Qurilish aralashmalarini tayyorlash va aralashtirishda qo‘llanadigan motorli uskuna. Aniq turi tekshiriladi.": {
    "ru": "Оборудование для работы с бетоном и строительными смесями. Характеристики уточняйте у оператора.",
    "en": "Equipment for concrete work and building mixes. Confirm specifications with staff."
  },
  "Atlas Copco LP6500 katok": {
    "ru": "Виброкаток Atlas Copco LP6500",
    "en": "Atlas Copco LP6500 vibratory roller"
  },
  "Maydonlarni zichlash ishlari uchun ko‘chma valetsli zichlash texnikasi. Mavjudligi tasdiqlanadi.": {
    "ru": "Техника для уплотнения грунта и основания. Модель и наличие нужно подтвердить.",
    "en": "Equipment for soil and base compaction. Model and availability need confirmation."
  },
  "Denzel vibroplita": {
    "ru": "Виброплита Denzel",
    "en": "Denzel plate compactor"
  },
  "Tuproq va mayda shag‘alli asoslarni zichlash uchun vibroplita. Aniq model va texnik ma’lumotlar tasdiqlanadi.": {
    "ru": "Техника для уплотнения грунта и основания. Модель и наличие нужно подтвердить.",
    "en": "Equipment for soil and base compaction. Model and availability need confirmation."
  },
  "Vibrotrambovka — 1": {
    "ru": "Вибротрамбовка — 1",
    "en": "Rammer compactor — 1"
  },
  "Tuproq va qurilish asoslarini zichlash uchun ishlatiladigan mexanik uskuna.": {
    "ru": "Техника для уплотнения грунта и основания. Модель и наличие нужно подтвердить.",
    "en": "Equipment for soil and base compaction. Model and availability need confirmation."
  },
  "Vibrotrambovka — 2": {
    "ru": "Вибротрамбовка — 2",
    "en": "Rammer compactor — 2"
  },
  "Suratda boshqa vibrotrambovka ko‘rsatilgan; birinchi suratdagi apparat bilan aynan bir xil yoki alohidaligi tekshiriladi.": {
    "ru": "Техника для уплотнения грунта и основания. Модель и наличие нужно подтвердить.",
    "en": "Equipment for soil and base compaction. Model and availability need confirmation."
  },
  "Vibrotrambovka — 3": {
    "ru": "Вибротрамбовка — 3",
    "en": "Rammer compactor — 3"
  },
  "Yer va to‘ldirma asoslarni zichlash uchun vertikal zarbali uskuna.": {
    "ru": "Техника для уплотнения грунта и основания. Модель и наличие нужно подтвердить.",
    "en": "Equipment for soil and base compaction. Model and availability need confirmation."
  },
  "PITER ARC-400 payvandlash apparati": {
    "ru": "Сварочный инвертор PITER ARC-400",
    "en": "PITER ARC-400 welding inverter"
  },
  "Payvandlash uchun invertor uskunasi. Suratda PITER ARC-400 yozuvi ko‘rinadi; texnik ko‘rsatkichlari aniqlashtiriladi.": {
    "ru": "Оборудование для сварочных работ. Технические характеристики уточняйте у оператора.",
    "en": "Equipment for welding jobs. Confirm technical specifications with staff."
  },
  "Devor va shift silliqlagichi": {
    "ru": "Шлифмашина для стен и потолков",
    "en": "Wall and ceiling sander"
  },
  "Devor va ship yuzalarini silliqlashga mo‘ljallangan uzun dastali elektr uskuna.": {
    "ru": "Инструмент для шлифовки подходящих поверхностей. Модель уточняйте в филиале.",
    "en": "Tool for sanding suitable surfaces. Confirm the model with staff."
  },
  "Kärcher SE 5 yuvuvchi changyutgichi": {
    "ru": "Моющий пылесос Kärcher SE 5",
    "en": "Kärcher SE 5 wet vacuum"
  },
  "Yuzalarni yuvib tozalashga mo‘ljallangan qurilma. Suratda Kärcher SE 5 mahsulot tasviri.": {
    "ru": "Оборудование для уборки и очистки. Уточните комплект и наличие в филиале.",
    "en": "Cleaning equipment. Confirm accessories and availability with the branch."
  },
  "Pol yuvish apparati": {
    "ru": "Поломоечная машина",
    "en": "Floor scrubber"
  },
  "Polni mexanik cho‘tka yordamida tozalash uchun mo‘ljallangan ko‘chma uskuna.": {
    "ru": "Оборудование для уборки и очистки. Уточните комплект и наличие в филиале.",
    "en": "Cleaning equipment. Confirm accessories and availability with the branch."
  },
  "Sanoat changyutgichi": {
    "ru": "Промышленный пылесос",
    "en": "Industrial vacuum cleaner"
  },
  "Qurilish va ta’mirlashdan keyingi chang va kirni yig‘ishga mo‘ljallangan uskuna.": {
    "ru": "Оборудование для уборки и очистки. Уточните комплект и наличие в филиале.",
    "en": "Cleaning equipment. Confirm accessories and availability with the branch."
  },
  "Yuqori bosimli yuvish apparati": {
    "ru": "Мойка высокого давления",
    "en": "Pressure washer"
  },
  "Yuzalarni yuqori bosimli suv yordamida tozalash uchun mo‘ljallangan uskunalar turi.": {
    "ru": "Оборудование для уборки и очистки. Уточните комплект и наличие в филиале.",
    "en": "Cleaning equipment. Confirm accessories and availability with the branch."
  },
  "Havo kompressori": {
    "ru": "Воздушный компрессор",
    "en": "Air compressor"
  },
  "Siqilgan havo bilan ishlaydigan asboblar uchun kompressor; hajm va bosim ma’lumotlari aniqlanadi.": {
    "ru": "Компрессорное оборудование. Модель, давление и наличие уточняйте у оператора.",
    "en": "Compressor equipment. Confirm model, pressure and availability with staff."
  },
  "ZEROMAX kompressori": {
    "ru": "Компрессор ZEROMAX",
    "en": "ZEROMAX compressor"
  },
  "Siqilgan havo olish uchun ZEROMAX brendli kompressor; model va quvvat aniqlashtiriladi.": {
    "ru": "Компрессорное оборудование. Модель, давление и наличие уточняйте у оператора.",
    "en": "Compressor equipment. Confirm model, pressure and availability with staff."
  },
  "Benzin generatori — 1": {
    "ru": "Бензиновый генератор — 1",
    "en": "Petrol generator — 1"
  },
  "Elektr tarmog‘i bo‘lmagan joylarda vaqtinchalik elektr ta’minoti uchun generator.": {
    "ru": "Электрооборудование для различных задач. Мощность и наличие нужно уточнить.",
    "en": "Electrical equipment for different uses. Confirm power specifications and availability."
  },
  "Benzin generatori — 2": {
    "ru": "Бензиновый генератор — 2",
    "en": "Petrol generator — 2"
  },
  "Suratda boshqa ko‘chma generator aks etgan; quvvati va ijaraga berish shartlari aniqlashtiriladi.": {
    "ru": "Электрооборудование для различных задач. Мощность и наличие нужно уточнить.",
    "en": "Electrical equipment for different uses. Confirm power specifications and availability."
  },
  "CRAFT kuchlanish stabilizatori": {
    "ru": "Стабилизатор напряжения CRAFT",
    "en": "CRAFT voltage stabilizer"
  },
  "Suratda 20 kVt deb yozilgan stabilizator tasviri ko‘rsatilgan. Aynan shu modelning mavjudligi tasdiqlanadi.": {
    "ru": "Электрооборудование для различных задач. Мощность и наличие нужно уточнить.",
    "en": "Electrical equipment for different uses. Confirm power specifications and availability."
  },
  "Bo‘yoq purkash apparati — 1": {
    "ru": "Краскораспылитель — 1",
    "en": "Paint sprayer — 1"
  },
  "Yuzalarga bo‘yoq purkash uchun mo‘ljallangan uskuna; surat ma’lumotnoma ko‘rinishida.": {
    "ru": "Оборудование для покрасочных работ. Уточните модель и условия аренды.",
    "en": "Painting equipment. Confirm model and rental terms with the branch."
  },
  "Bo‘yoq purkash apparati — 2": {
    "ru": "Краскораспылитель — 2",
    "en": "Paint sprayer — 2"
  },
  "Bo‘yoq purkash uchun elektr apparatning ma’lumotnoma rasmi.": {
    "ru": "Оборудование для покрасочных работ. Уточните модель и условия аренды.",
    "en": "Painting equipment. Confirm model and rental terms with the branch."
  },
  "Elektr issiqlik pushkasi": {
    "ru": "Электрическая тепловая пушка",
    "en": "Electric space heater"
  },
  "Ish joyi yoki qurilish obyektlarini isitishda foydalaniladigan ko‘chma apparat.": {
    "ru": "Оборудование для обогрева. Уточните характеристики и наличие у оператора.",
    "en": "Heating equipment. Confirm specifications and availability with staff."
  },
  "Gazli isitkich — reklama rasmi": {
    "ru": "Газовый обогреватель — рекламное фото",
    "en": "Gas heater — reference image"
  },
  "Gazli isitish uskunasi aks etgan reklama tasviri. Aynan rasmda ko‘rsatilgan model borligi tasdiqlanmagan.": {
    "ru": "Оборудование для обогрева. Уточните характеристики и наличие у оператора.",
    "en": "Heating equipment. Confirm specifications and availability with staff."
  },
  "PITER elektr isitkichlari": {
    "ru": "Электрообогреватели PITER",
    "en": "PITER electric heaters"
  },
  "Rasmda uchta ko‘chma elektr isitkich aks etgan. Ijaraga mavjud soni va quvvati telefon orqali tasdiqlanadi.": {
    "ru": "Оборудование для обогрева. Уточните характеристики и наличие у оператора.",
    "en": "Heating equipment. Confirm specifications and availability with staff."
  },
  "Bosimli ish apparati": {
    "ru": "Напорная установка",
    "en": "Pressurized equipment"
  },
  "Suratda g‘ildirakli bosimli uskuna ko‘rsatilgan. Vazifasi va modelini filial tasdiqlaydi.": {
    "ru": "Оборудование для строительных работ. Назначение и модель уточните в филиале.",
    "en": "Construction-related equipment. Confirm the exact purpose and model with staff."
  },
  "Montaj uskunasi to‘plami": {
    "ru": "Комплект монтажного инструмента",
    "en": "Installation tool kit"
  },
  "Qutida saqlanadigan montaj uskunasi. Modeli, vazifasi va tarkibi bilan operator orqali tanishing.": {
    "ru": "Оборудование для строительных работ. Назначение и модель уточните в филиале.",
    "en": "Construction-related equipment. Confirm the exact purpose and model with staff."
  },
  "Assalomu alaykum! 👋 PROKATCHI OKA saytiga xush kelibsiz. Sizga qaysi uskuna kerak? Katalog, narxlar yoki filiallar haqida so‘rashingiz mumkin.": {
    "ru": "Здравствуйте! 👋 Добро пожаловать в PROKATCHI OKA. Какое оборудование вам нужно? Спросите о каталоге, ценах или филиалах.",
    "en": "Hello! 👋 Welcome to PROKATCHI OKA. What equipment do you need? Ask about our catalog, pricing, or branches."
  },
  "Marhamat! 😊 Yana biror savolingiz bo‘lsa, yozavering. Uskunani tanlashda katalogimiz ham yordam beradi.": {
    "ru": "Пожалуйста! 😊 Если будут вопросы, пишите. Каталог поможет выбрать оборудование.",
    "en": "You're welcome! 😊 Feel free to ask more questions or browse our equipment catalog."
  },
  "📍 Gulzor filiali\n📞 +998 77 701 44 17\n🗺️ Xaritadagi lokatsiya Aloqa bo‘limida bor. Ish vaqti va mavjud uskunani telefon orqali aniqlang.": {
    "ru": "📍 Филиал «Гульзор»\n📞 +998 77 701 44 17\n🗺️ Карта есть в разделе «Контакты». Уточните график и наличие по телефону.",
    "en": "📍 Gulzor branch\n📞 +998 77 701 44 17\n🗺️ See the map under Contact. Please confirm hours and availability by phone."
  },
  "📍 Ibn Sino filiali\n📞 +998 99 818 24 25\n📞 +998 98 772 27 20\n🗺️ Xaritadagi lokatsiyani Aloqa bo‘limidan ochishingiz mumkin.": {
    "ru": "📍 Филиал «Ибн Сино»\n📞 +998 99 818 24 25\n📞 +998 98 772 27 20\n🗺️ Карта доступна в разделе «Контакты».",
    "en": "📍 Ibn Sino branch\n📞 +998 99 818 24 25\n📞 +998 98 772 27 20\n🗺️ Open the map in the Contact section."
  },
  "📍 Toshkentda 2 ta filialimiz ko‘rsatilgan:\n\n• Gulzor — +998 77 701 44 17\n• Ibn Sino — +998 99 818 24 25, +998 98 772 27 20\n\nAniq joylashuv uchun saytning Aloqa bo‘limida har bir filialning Google Maps tugmasini bosing.": {
    "ru": "📍 У нас указаны 2 филиала в Ташкенте:\n\n• Гульзор — +998 77 701 44 17\n• Ибн Сино — +998 99 818 24 25, +998 98 772 27 20\n\nТочные адреса смотрите в Google Maps в разделе «Контакты».",
    "en": "📍 We list 2 branches in Tashkent:\n\n• Gulzor — +998 77 701 44 17\n• Ibn Sino — +998 99 818 24 25, +998 98 772 27 20\n\nFind exact locations via Google Maps under Contact."
  },
  "💰 Ijara narxi uskuna turi va ijara muddatiga qarab aniqlanadi. Saytda hozircha tasdiqlangan narxlar yo‘q, shuning uchun noto‘g‘ri summa aytmayman. Kerakli uskunani aytsangiz, operator bilan bog‘lanish yo‘lini ko‘rsataman.": {
    "ru": "💰 Стоимость зависит от оборудования и срока аренды. Подтверждённых цен на сайте пока нет. Напишите, что вам нужно — подскажем контакты оператора.",
    "en": "💰 Prices depend on the equipment and rental period. We don't have confirmed prices on the site yet. Tell me what you need and I'll direct you to a branch operator."
  },
  "🔎 Uskunaning hozir bo‘sh yoki band ekanligini chat avtomatik tekshira olmaydi. Buni filial operatori aniq tasdiqlaydi. Katalogda uskunani tanlab, so‘rov yuborishingiz mumkin.": {
    "ru": "🔎 Чат не проверяет наличие в реальном времени. Уточните у оператора филиала или отправьте заявку из каталога.",
    "en": "🔎 This chat cannot check real-time availability. Please confirm with a branch operator or send an inquiry from the catalog."
  },
  "🚚 Yetkazib berish imkoniyati, manzili va narxini filial bilan kelishib olasiz. Uskuna va qaysi hududga kerakligini operatorga ayting.": {
    "ru": "🚚 Возможность, район и стоимость доставки уточняйте в филиале. Назовите оборудование и адрес доставки.",
    "en": "🚚 Delivery options, locations and costs are confirmed by the branch. Tell the operator what you need and where."
  },
  "🕒 Filiallarning tasdiqlangan ish vaqti hozircha bizda yo‘q. Yo‘lga chiqishdan oldin Gulzor: +998 77 701 44 17 yoki Ibn Sino: +998 99 818 24 25 raqamiga qo‘ng‘iroq qilishingizni tavsiya qilaman.": {
    "ru": "🕒 У нас пока нет подтверждённого графика. Перед визитом позвоните: Гульзор +998 77 701 44 17, Ибн Сино +998 99 818 24 25.",
    "en": "🕒 Branch hours aren't confirmed yet. Before visiting, call Gulzor at +998 77 701 44 17 or Ibn Sino at +998 99 818 24 25."
  },
  "📞 Bog‘lanish uchun:\n\nGulzor: +998 77 701 44 17\nIbn Sino: +998 99 818 24 25 yoki +998 98 772 27 20\n\nTelegram kanal: @prookat24. Aloqa bo‘limida tugmalar ham bor.": {
    "ru": "📞 Контакты:\n\nГульзор: +998 77 701 44 17\nИбн Сино: +998 99 818 24 25 или +998 98 772 27 20\n\nTelegram: @prookat24. Кнопки — в разделе «Контакты».",
    "en": "📞 Contact numbers:\n\nGulzor: +998 77 701 44 17\nIbn Sino: +998 99 818 24 25 or +998 98 772 27 20\n\nTelegram: @prookat24. See Contact for links."
  },
  "📲 Sahifalarimizni saytning Aloqa bo‘limidan topasiz. Telegram: @prookat24, Instagram: @buildcity_uz, YouTube: @prokatuz. Chat orqali operatorga xabar yuborilmaydi; tegishli sahifani alohida oching.": {
    "ru": "📲 Наши страницы — в разделе «Контакты». Telegram: @prookat24, Instagram: @buildcity_uz, YouTube: @prokatuz. Чат не отправляет сообщения оператору.",
    "en": "📲 Find our pages under Contact. Telegram: @prookat24, Instagram: @buildcity_uz, YouTube: @prokatuz. This chat does not message operators."
  },
  "🛠️ Ijaraga olish uchun:\n1. Katalogdan uskunani tanlang.\n2. «So‘rov» tugmasini bosing yoki filialga telefon qiling.\n3. Narx, muddat, mavjudlik va ehtimoliy garov shartlarini operator bilan tasdiqlang.\n\nSaytdagi so‘rov formasi Flask server ishga tushirilganda ma’lumotni bazaga saqlaydi.": {
    "ru": "🛠️ Как арендовать:\n1. Выберите оборудование в каталоге.\n2. Нажмите «Заявка» или позвоните в филиал.\n3. Уточните стоимость, срок, наличие и возможный залог.\n\nФорма сохраняет данные при работающем Flask-сервере.",
    "en": "🛠️ How to rent:\n1. Choose equipment in the catalog.\n2. Tap Inquire or call a branch.\n3. Confirm price, rental duration, availability and any deposit.\n\nThe form saves inquiries when the Flask server is running."
  },
  "🚜 Katalogimizda maxsus texnika bo‘limi mavjud: ekskavator, avtokran, yuklagich va samosval suratlari bilan tanishishingiz mumkin. Aynan qaysi texnika filialda mavjudligini telefon orqali aniqlang.": {
    "ru": "🚜 В каталоге есть раздел «Спецтехника»: экскаватор, автокран, погрузчик и самосвал. Наличие уточняйте по телефону.",
    "en": "🚜 Our Heavy equipment category shows excavators, cranes, loaders and dump trucks. Confirm availability by phone."
  },
  "🪚 Kesish va arralash bo‘limida beton, plitka va boshqa materiallar uchun turli kesuvchi uskunalar bor. Barchasini alohida katalog bo‘limida ko‘rsatamiz.": {
    "ru": "🪚 В разделе резки есть оборудование для бетона, плитки и других материалов. Смотрите соответствующую категорию каталога.",
    "en": "🪚 The cutting category includes tools for concrete, tile and other materials. Explore them in the catalog."
  },
  "🔩 Burg‘ulash va buzish bo‘limida elektr asboblarni ko‘rishingiz mumkin. Quvvat va texnik tafsilotlarni faqat tasdiqlanganidan keyin qo‘shamiz.": {
    "ru": "🔩 В разделе сверления и демонтажа есть электроинструменты. Характеристики будут добавлены после подтверждения.",
    "en": "🔩 The drilling and demolition category has power tools. Specifications will be added when confirmed."
  },
  "🏗️ Zichlash uskunalari alohida bo‘limda: vibroplita va katok kabi texnikalarni ko‘rishingiz mumkin. Ijara shartlarini filialdan so‘rang.": {
    "ru": "🏗️ В разделе уплотнения есть виброплиты и катки. Условия аренды уточняйте в филиале.",
    "en": "🏗️ The compaction category includes plate compactors and rollers. Ask the branch for rental terms."
  },
  "⚡ Payvandlash uskunalari bo‘limi mavjud. Katalogdagi mahsulot haqida batafsil ma’lumotni ko‘rib, operator bilan bog‘lanishingiz mumkin.": {
    "ru": "⚡ В каталоге есть сварочное оборудование. Выберите позицию и свяжитесь с оператором.",
    "en": "⚡ Our catalog has welding equipment. Choose an item and contact the operator for details."
  },
  "🔧 Katalogda generator va elektr, kompressor, tozalash, silliqlash hamda bo‘yash uskunalari uchun alohida bo‘limlar bor. Qaysi uskuna sizga kerak?": {
    "ru": "🔧 Есть разделы генераторов, компрессоров, очистки, шлифовки и покраски. Что вам нужно?",
    "en": "🔧 We have separate categories for generators, compressors, cleaning, sanding and painting. What do you need?"
  },
  "📦 Katalogda 46 ta mahsulot kartasi va 13 ta kategoriya bor. Maxsus texnika, kesish, beton ishlari, payvandlash, tozalash va boshqa bo‘limlarni katalogda alohida ko‘rishingiz mumkin.": {
    "ru": "📦 В каталоге 46 карточек и 13 категорий: спецтехника, резка, бетонные работы, сварка, очистка и другие.",
    "en": "📦 The catalog has 46 listings across 13 categories, including heavy equipment, cutting, concrete work, welding and cleaning."
  },
  "Assalomu alaykum! 👋 Men Prokatchi Oka sayt yordamchisiman. Katalog, filiallar va ijara haqida savollaringizga javob bera olaman. Qanday yordam beray?": {
    "ru": "Здравствуйте! 👋 Я помощник сайта Prokatchi Oka. Подскажу о каталоге, филиалах и аренде. Чем помочь?",
    "en": "Hello! 👋 I'm the Prokatchi Oka website assistant. I can help with the catalog, branches and rentals. How can I help?"
  },
  "Savolingizni to‘liq tushunmadim 🙂 Katalog, ijara narxi, filiallar, telefon yoki biror uskuna nomini yozib ko‘ring. Aniq narx va mavjudlik bo‘yicha operatorimizga murojaat qiling.": {
    "ru": "Не совсем понял вопрос 🙂 Попробуйте спросить о каталоге, цене, филиале или оборудовании. Точную стоимость и наличие уточняйте у оператора.",
    "en": "I didn't quite understand 🙂 Try asking about the catalog, pricing, branches or specific equipment. Please confirm prices and availability with an operator."
  },
  " / NAMUNA": {
    "ru": " / ОБРАЗЕЦ",
    "en": " / SAMPLE"
  },
  "Ijara narxi: telefon orqali": {
    "ru": "Цена: по телефону",
    "en": "Price: ask by phone"
  },
  "Mahsulot": {
    "ru": "Товар",
    "en": "Product"
  },
  "Savolingizni yozing...": {
    "ru": "Напишите ваш вопрос...",
    "en": "Type your question..."
  },
  "Mahsulot qidirish: ekskavator, kesgich...": {
    "ru": "Поиск: экскаватор, резка...",
    "en": "Search: excavator, cutter..."
  },
  "Ismingizni kiriting": {
    "ru": "Введите ваше имя",
    "en": "Enter your name"
  },
  "Masalan: necha kunga kerakligi": {
    "ru": "Например, на сколько дней",
    "en": "For example, number of days"
  },
  "Ism": {
    "ru": "Имя",
    "en": "Name"
  },
  "Ijara muddati": {
    "ru": "Срок аренды",
    "en": "Rental duration"
  },
  "Gulzor": {
    "ru": "Гульзор",
    "en": "Gulzor"
  },
  "Ibn Sino": {
    "ru": "Ибн Сино",
    "en": "Ibn Sino"
  },
  "Yopish": {
    "ru": "Закрыть",
    "en": "Close"
  },
  "Chatni yopish": {
    "ru": "Закрыть чат",
    "en": "Close chat"
  },
  "Xabar yuborish": {
    "ru": "Отправить сообщение",
    "en": "Send message"
  },
  "Menyuni ochish": {
    "ru": "Открыть меню",
    "en": "Open menu"
  },
  "PROKATCHI OKA — bosh sahifa": {
    "ru": "PROKATCHI OKA — Главная",
    "en": "PROKATCHI OKA — Home"
  },
  "Asosiy menyu": {
    "ru": "Основное меню",
    "en": "Main navigation"
  },
  "Suratda ko‘rsatilgan marka: Komatsu": {
    "ru": "На фото бренд: Komatsu",
    "en": "Brand shown: Komatsu"
  },
  "Suratda ko‘rsatilgan model: LTM 1300-6.2": {
    "ru": "На фото модель: LTM 1300-6.2",
    "en": "Model shown: LTM 1300-6.2"
  },
  "Suratda ko‘rsatilgan marka: Ural": {
    "ru": "На фото бренд: Урал",
    "en": "Brand shown: Ural"
  },
  "Suratda ko‘rsatilgan model: LP6500": {
    "ru": "На фото модель: LP6500",
    "en": "Model shown: LP6500"
  },
  "Suratda ko‘rsatilgan marka: Denzel": {
    "ru": "На фото бренд: Denzel",
    "en": "Brand shown: Denzel"
  },
  "Rasmda 3 ta uskuna ko‘rsatilgan": {
    "ru": "На фото три устройства",
    "en": "Photo shows three devices"
  },
  "Filtrni tozalash": {
    "ru": "Сбросить фильтры",
    "en": "Clear filters"
  },
  "ta mahsulot": {
    "ru": "товаров",
    "en": "products"
  },
  "so'm": {
    "ru": "сум",
    "en": "UZS"
  }
};
  TABLE['So‘rovingiz operator tomonidan tasdiqlanadi.'] = {ru:'Ваш запрос будет подтверждён оператором.',en:'Your request will be confirmed by an operator.'};
  const originalNodeText = new WeakMap();
  const originalAttribute = new WeakMap();
  const pathLang = window.location.pathname.match(/^\/(ru|en)\/?$/);
  let lang = pathLang ? pathLang[1] : 'uz';
  const clean = s => String(s).trim();
  const lookup = (text, target=lang) => {
    if (target === 'uz') return text;
    const key=clean(text);
    const value=TABLE[key]?.[target];
    if (!value) return text;
    return String(text).replace(key,value);
  };

  const original = (text) => {
    const s=clean(text);
    for (const [uz,translated] of Object.entries(TABLE)) {
      if (s === translated.en || s === translated.ru) return uz;
    }
    return text;
  };
  function translateText(node) {
    if (node.parentElement?.closest('.chat-message.user .chat-bubble, script, style, noscript')) return;
    let saved=originalNodeText.get(node);
    const current=node.nodeValue || '';
    if (!saved || (current !== saved.rendered && current !== saved.original)) {
      saved={original:current,rendered:current}; originalNodeText.set(node,saved);
    }
    const updated=lookup(saved.original);
    if (updated !== current) node.nodeValue=updated;
    saved.rendered=updated;
  }
  const attrs=['placeholder','aria-label','title'];
  function translateElement(el) {
    let originalAttrs=originalAttribute.get(el);
    if (!originalAttrs){originalAttrs={};originalAttribute.set(el,originalAttrs);}
    for (const attr of attrs) {
      if (!el.hasAttribute?.(attr)) continue;
      const actual=el.getAttribute(attr);
      if (!originalAttrs[attr] || (actual!==originalAttrs[attr].rendered && actual!==originalAttrs[attr].original)) {
        originalAttrs[attr]={original:actual,rendered:actual};
      }
      const translated=lookup(originalAttrs[attr].original);
      if (actual!==translated) el.setAttribute(attr,translated);
      originalAttrs[attr].rendered=translated;
    }
  }
  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return translateText(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    translateElement(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const next=walker.currentNode;
      if(next.nodeType===Node.TEXT_NODE) translateText(next);
      else translateElement(next);
    }
  }
  function updateControls(){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-lang]').forEach(button=>{
      const isActive=button.dataset.lang===lang;
      button.setAttribute('aria-pressed',String(isActive));
    });

    // SEO: Uzbek, Russian and English
    const seo={
      uz:{
        title:'PROKATCHI OKA ? Qurilish asboblari va texnikasi ijarasi | Toshkent',
        description:'Toshkentda qurilish asboblari, elektr asboblar va maxsus texnika ijarasi. PROKATCHI OKA ? Gulzor va Ibn Sino filiallari. Katalogni ko?ring va so?rov yuboring.',
        locale:'uz_UZ'
      },
      ru:{
        title:'?????? ???????????? ? ???????????? ??????? ? ???????? | PROKATCHI OKA',
        description:'?????? ???????????? ????????????, ??????????????????? ? ??????????? ? ????????. PROKATCHI OKA ? ??????? ??????? ? ??? ????. ??????? ? ?????? ??????.',
        locale:'ru_RU'
      },
      en:{
        title:'Construction Equipment & Tool Rental in Tashkent | PROKATCHI OKA',
        description:'Construction equipment rental and power tool hire in Tashkent. Browse the PROKATCHI OKA catalog, then contact our Gulzor or Ibn Sino branch.',
        locale:'en_US'
      }
    }[lang];

    document.title=seo.title;

    function setMeta(selector,value){
      const meta=document.querySelector(selector);
      if(meta) meta.setAttribute('content',value);
    }

    setMeta('meta[name="description"]',seo.description);
    setMeta('meta[property="og:title"]',seo.title);
    setMeta('meta[property="og:description"]',seo.description);
    setMeta('meta[property="og:locale"]',seo.locale);
    setMeta('meta[name="twitter:title"]',seo.title);
    setMeta('meta[name="twitter:description"]',seo.description);
  }
  function setLang(next){
    if (!['uz','ru','en'].includes(next)) return;
    const targetPath = next === 'uz' ? '/' : `/${next}/`;
    if (window.location.pathname !== targetPath) {
      window.location.assign(targetPath + window.location.hash);
    }
  }
  window.I18N={t:lookup,original,setLang,get lang(){return lang;}};
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLang(button.dataset.lang)));
    updateControls();
    translateTree(document.body);

    const observer=new MutationObserver(mutations=>{
      for (const m of mutations) {
        if(m.type==='characterData') translateText(m.target);
        else if(m.type==='attributes') translateElement(m.target);
        else for(const added of m.addedNodes) translateTree(added);
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
  });
})();
