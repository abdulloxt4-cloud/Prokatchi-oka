# Prokatchi Oka — GitHub'ga push

1. VS Code'ga `prokatchi-oka` papkasini oching.
2. GitHub'da `prokatchi-oka` nomli bo‘sh repository yarating; undagi `Add a README` / `.gitignore` tanlovlarini belgilang deb kerak emas.
3. Terminalda quyidagilarni kiriting:

```powershell
git init
git add .
git commit -m "Initial Prokatchi Oka website"
git branch -M main
git remote add origin https://github.com/USERNAME/prokatchi-oka.git
git push -u origin main
```

`USERNAME` o‘rniga o‘z GitHub login nomingizni yozing. `git add .` `.gitignore`ga mos tarzda `instance/*.sqlite3` va boshqa vaqtinchalik fayllarni qo‘shmaydi. Agar username yoki email so‘ralsa Git sozlamalaringizni to‘g‘rilang.
