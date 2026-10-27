# PROKATCHI OKA — YANGI FIXLAR (25.10.2026)

1. **Katalog rasmi endi haqiqatan yuklanadi.** `isProductImage` katalogning `assets/images/catalog/` manzilini ham qabul qiladi; oldingi versiyada faqat `assets/images/products/` ishlagan.
2. **46 ta oq canvasli mahsulot rasmi:** barchasi 960×960 WebP, mahsulot to‘liq joylashishi uchun `object-fit: contain` va padding ishlatildi. Mahsulotlar kesilib ketmasligi uchun kartalar va modal ko‘rinishi qayta sozlandi.
3. **Raqamlar endi takrorlanmaydi:** `OKA-001 ... OKA-046` — katalog filtrlansa ham, kategoriya o‘zgarsa ham shu tartibdagi doimiy kodlar.
4. **Original suratlar yo‘qolmaydi:** `assets/images/products/` asl nusxalar uchun saqlandi. Original rasmlar mahsulot tafsilotlari galereyasiga biriktirilgan.
5. **9 ta AI-retushlangan namunaviy rasm** oq fonli studiya uslubida mavjud. Qolganlarda dasturiy oq fon/segmentatsiya ishlatildi. Ayrim murakkab suratlarda do‘kon foni bo‘laklari qolgan bo‘lishi mumkin; hammasi mukammal qo‘l retushi deb da'vo qilinmaydi.
6. **Bootstrap uslubidagi social tugmalar:** Instagram, Telegram, YouTube, Facebook alohida karta, mos ikonka va brend ranglari bilan.
7. **Dark mode kontrasti:** karta, matn, kontakt, input, footer, filter, menyu va chat uchun qo‘shimcha rang tuzatishlar. Katalog rasmlari dark mode’da ham oq fonda.
8. **UZ/RU/EN:** tillar va oldingi avtomatik sayt yordamchisi saqlangan, kategoriyalar dinamik tarjima uchun yangilangan.
9. **Rasmlar navigatsiyada ham:** bosh ekrani (hero) va tezkor kategoriyalarda yangi katalog rasmlari ishlatiladi.
10. **Tekshiruv:** 18 ta unittest + JS syntax test o‘tdi. Brauzer vizual avtomatlashtirish muhitdagi cheklov sabab amalga oshirilmadi.

## Hali qoladigan tekshiruvlar

- AI yordamida o‘zgartirilgan apparat model va yozuvlari original nusxaga 100% to‘g‘ri kelishini tekshirish.
- Do‘konda olingan ayrim rasmlardagi fon parchalarini qo‘lda retushlash kerak bo‘lishi mumkin.
- Narx, mavjudlik, ish vaqti, yetkazish shartlari kiritilmagan. Sayt ular haqida yolg‘on ma’lumot bermaydi.
- Chat bu oldindan yozilgan ko‘p tilli javoblardan foydalanadigan avtomatik yordamchi, tashqi AI API emas.

## Windows’da ishga tushirish
1. Eski Flask serverini terminalda `Ctrl+C` bilan to‘xtating.
2. Yangi ZIP’ni **Extract All** qiling va `prokatchi-oka` papkasini VS Code’da oching.
3. Terminal: `.\start_windows.bat`
4. Brauzer: `http://127.0.0.1:5000/`
5. Chrome cache saqlangan bo‘lsa: `Ctrl+Shift+R`.

## V17
- 015, 039, 041, 042 rasmlaridan ortiqcha chiziq va dog'lar tozalandi.
- Rasm va nom mos kelmagan kartalar to'g'rilandi: 016, 018, 034, 045, 046 (rasmlar almashtirildi), 023, 011 (nomi aniqlandi).
- Imlo: Bolgarka, Tortsovka, Zanjirli arra, Vibrotrambovka, Generator 10 kVt, Isitish pushkasi 5 kVt.
- Kategoriyalar soni 12 ga yangilandi.
- OKA-031 va OKA-032: oq qismlar oq fonda yo'qolmasligi uchun yengil kulrang tus berildi, sariq chetlar tozalandi.
- OKA-001..004: asl rasmdan qayta tayyorlandi, kabina oynalaridagi dog'lar tozalandi. OKA-022: fon qaytadan to'liq olib tashlandi (ushlagich va himoya halqasi butun).
- OKA-011, 017, 035 asl suratdan qayta kesildi; OKA-030 yotqizib kartaga sig'dirildi va nomi aniqlandi; OKA-010, 014, 019, 038 oq qismlari yaxshilandi; OKA-001 oynasi tabiiylashtirildi.

## V21
- OKA-001 (Frontal yuklagich) rasmi qaytadan tayyorlandi: JPEG shovqini tozalandi, chetlar aniq (supersampling + o'tkirlash), kabina oynalari dog'siz toza shisha sifatida chizildi, ustunlar va yon oyna tartibga keltirildi, cho'michdagi oq nuqtalar olib tashlandi. Telefon (390 px, 3x) va kompyuterda tekshirildi.

## V22
- OKA-001: kabina ostidagi oq korpus qismi oq fonda "ochiq" bo'lib ko'rinardi; endi och kulrang soya berilib, yaxlit korpus sifatida ko'rinadi.

## V23
- OKA-001: kabina ostidagi oq korpus qismi aniq kulrang soya va chiziq bilan yaxlit korpus qilindi (V22'da tus juda och edi).

## V24
- OKA-019, OKA-010, OKA-014: oq qismlarga berilgan kulrang tus ob'ektdan tashqariga (tutqich ichidagi bo'sh joylarga, shnur halqasiga, qo'lqop oynalariga) chiqib ketgan edi; bo'sh joylar toza oq fonga qaytarildi.
- OKA-035: nasos boshi atrofidagi iflos dog'lar tozalandi, ingichka quvur toza qilib qayta chizildi.
- Barcha 46 ta rasm yana bir bor oldin/keyin solishtirildi.

## V25
- OKA-019: korpus qismi asl suratdagi haqiqiy kumush rang va soyalari bilan qayta tayyorlandi (oq dog'lar va yirtiq chetlar yo'qoldi), tutqich ichidagi bo'sh joy toza oq fonda.
- OKA-031: oq idish yassi oq blok o'rniga yumshoq soya (gradient) va ingichka kontur bilan hajmli ko'rinishga keltirildi.

## V26
- OKA-019: dial va old tutqich orasidagi yo'qolgan kumush korpus qismi asl suratdan tiklandi; korpus endi uzluksiz.
- OKA-035: kumush elektr motor va nasos bloki (oldin oq bo'sh joy bo'lib qolgan edi) asl suratdan tiklandi, jigarrang fon qoldiqlari tozalandi.

## V27
- OKA-008: kesish disklaridagi oq "teshik" ko'rinishidagi yaltiroq dog'lar kumush metall tusiga keltirildi.
- Barcha 46 ta rasm "oq fonda yo'qolgan oq/kumush qism" nuqsoni uchun avtomatik va ko'z bilan qayta tekshirildi; boshqa o'xshash nuqson topilmadi.

## V28
- Sotuvda yo'q uskunalar olib tashlandi: OKA-026 (benzinli trambovka), OKA-041 (Vagner apparati — 2), OKA-018 (eski olmos burg'ulash). O'rniga: OKA-026 Narvon 3–6 m, OKA-041 Payka (dazmol), OKA-018 Almaznoy bur (stanokli).
- Yangi rasm, nom, tavsif va RU/EN tarjima: OKA-008 Bolgarka 125/180/230, OKA-011 Tortsovka s polkoy, OKA-020 Motobur (yer qazish uchun), OKA-029 Payvandlash apparati 220 V, OKA-034 Karcher yuvish apparati (220 bar). Eski narxlar saqlandi; narvon va payka narxi bo'sh ("Narxni so'rash").
- Yangi rasmlar internet (namuna) suratlari bo'lgani uchun "NAMUNA RASMI" belgisi bilan chiqadi. Asl fayllar `assets/images/products/ref-*.jpg` da saqlandi.
- Narvon "Boshqa" kategoriyasiga tushdi, kategoriyalar soni 13 ga yangilandi (chat va tarjima matnlari). Bosh sahifadagi "Payvandlash" plitkasi yangi svarka rasmini ko'rsatadi.

## V29 — OKA-038 generator rasmi
- OKA-038 (Generator 10 kVt): rasm egasi yuborgan yashil generator fotosi bilan almashtirildi (oq fon, 1000×750 WebP). Narx (350 000), nom va tavsif o‘zgarmadi.
- id `uskuna-3674` → `generator-10-kvt`; asl foto `assets/images/products/ref-generator-10-kvt.jpg`; eski `uskuna-3674.webp` o‘chirildi; kartada «NAMUNA RASMI» belgisi chiqadi.
