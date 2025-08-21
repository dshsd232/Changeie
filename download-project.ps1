# سكريبت تحميل مشروع CryptoNexus - Windows PowerShell
Write-Host "🚀 === مرحباً بك في مثبت CryptoNexus ===" -ForegroundColor Cyan
Write-Host ""

# التحقق من الصلاحيات
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  يُفضل تشغيل هذا السكريبت كمدير للحصول على أفضل النتائج" -ForegroundColor Yellow
    Write-Host ""
}

# التحقق من Node.js
Write-Host "🔍 فحص Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js مثبت: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js غير مثبت!" -ForegroundColor Red
    Write-Host "📥 يرجى تحميل Node.js من: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "⚠️  تأكد من تحميل إصدار LTS (18.x أو أحدث)" -ForegroundColor Yellow
    $response = Read-Host "هل تريد فتح موقع Node.js الآن؟ (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Start-Process "https://nodejs.org"
    }
    exit 1
}

# اختيار مسار المشروع
$defaultPath = Join-Path $env:USERPROFILE "Desktop\cryptonexus-platform"
Write-Host "📂 أين تريد إنشاء المشروع؟" -ForegroundColor Cyan
Write-Host "المسار الافتراضي: $defaultPath" -ForegroundColor Gray
$projectPath = Read-Host "اضغط Enter للمسار الافتراضي أو اكتب مسار جديد"

if ([string]::IsNullOrWhiteSpace($projectPath)) {
    $projectPath = $defaultPath
}

Write-Host ""
Write-Host "📁 سيتم إنشاء المشروع في: $projectPath" -ForegroundColor Green
Write-Host ""

# إنشاء هيكل المجلدات
Write-Host "📁 إنشاء هيكل المجلدات..." -ForegroundColor Yellow

$folders = @(
    "",
    "src",
    "styles", 
    "components",
    "components\ui",
    "components\figma",
    "public",
    "guidelines"
)

foreach ($folder in $folders) {
    $fullPath = if ($folder -eq "") { $projectPath } else { Join-Path $projectPath $folder }
    try {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        if ($folder -eq "") {
            Write-Host "✅ مجلد المشروع الرئيسي" -ForegroundColor Green
        } else {
            Write-Host "✅ مجلد: $folder" -ForegroundColor Green
        }
    } catch {
        Write-Host "❌ فشل في إنشاء: $folder" -ForegroundColor Red
        Write-Error $_.Exception.Message
        exit 1
    }
}

Write-Host ""
Write-Host "🎯 === الخطوات التالية ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. انسخ الملفات التالية من Figma Make إلى المجلدات المناسبة:" -ForegroundColor White
Write-Host ""
Write-Host "📄 الملفات الأساسية (في الجذر الرئيسي):" -ForegroundColor Yellow
@(
    "package.json",
    "index.html", 
    "App.tsx",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.node.json", 
    "vite-env.d.ts",
    ".env.example",
    ".gitignore",
    ".eslintrc.cjs",
    "README.md"
) | ForEach-Object { Write-Host "   • $_" -ForegroundColor White }

Write-Host ""
Write-Host "📁 src/:" -ForegroundColor Yellow
Write-Host "   • main.tsx" -ForegroundColor White

Write-Host ""
Write-Host "📁 styles/:" -ForegroundColor Yellow  
Write-Host "   • globals.css" -ForegroundColor White

Write-Host ""
Write-Host "📁 components/:" -ForegroundColor Yellow
@(
    "Navigation.tsx",
    "LandingPage.tsx", 
    "CryptoExchange.tsx",
    "CryptoMarkets.tsx",
    "CryptoTrading.tsx",
    "CryptoWallet.tsx",
    "BitcoinBuySell.tsx"
) | ForEach-Object { Write-Host "   • $_" -ForegroundColor White }

Write-Host ""
Write-Host "📁 components/ui/:" -ForegroundColor Yellow
Write-Host "   • جميع ملفات UI المكونات (40+ ملف)" -ForegroundColor White

Write-Host ""
Write-Host "📁 public/:" -ForegroundColor Yellow
@(
    "site.webmanifest",
    "sw.js"
) | ForEach-Object { Write-Host "   • $_" -ForegroundColor White }

Write-Host ""
Write-Host "2. بعد نسخ الملفات، شغل الأوامر التالية:" -ForegroundColor White
Write-Host ""
Write-Host "   cd `"$projectPath`"" -ForegroundColor Cyan
Write-Host "   npm install" -ForegroundColor Cyan  
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. افتح المتصفح على: http://localhost:3000" -ForegroundColor White
Write-Host ""

# إنشاء ملف تعليمات
$instructionsContent = @"
# 🚀 تعليمات تشغيل CryptoNexus

## الخطوات:
1. انسخ جميع الملفات من Figma Make إلى هذا المجلد
2. افتح Command Prompt أو PowerShell
3. انتقل لمجلد المشروع: cd "$projectPath"
4. ثبت التبعيات: npm install  
5. شغل المشروع: npm run dev
6. افتح المتصفح: http://localhost:3000

## في حالة المشاكل:
- تأكد من تثبيت Node.js إصدار 18+
- تأكد من نسخ جميع الملفات بالهيكل الصحيح
- شغل: npm install مرة أخرى إذا فشل

## الدعم:
راسلني إذا واجهت أي مشكلة!

مبروك! 🎉
"@

$instructionsPath = Join-Path $projectPath "تعليمات_التشغيل.txt"
Set-Content -Path $instructionsPath -Value $instructionsContent -Encoding UTF8

Write-Host "📝 تم إنشاء ملف التعليمات: تعليمات_التشغيل.txt" -ForegroundColor Green
Write-Host ""

# عرض النتيجة النهائية
Write-Host "🎉 === تم بنجاح! ===" -ForegroundColor Green
Write-Host ""
Write-Host "📂 مجلد المشروع: $projectPath" -ForegroundColor Cyan
Write-Host "📝 اقرأ ملف: تعليمات_التشغيل.txt للتفاصيل" -ForegroundColor Yellow
Write-Host ""

# سؤال عن فتح المجلد
$openFolder = Read-Host "هل تريد فتح مجلد المشروع الآن؟ (y/n)"
if ($openFolder -eq 'y' -or $openFolder -eq 'Y') {
    Start-Process "explorer.exe" -ArgumentList $projectPath
}

Write-Host ""
Write-Host "✨ شكراً لاستخدام CryptoNexus! ✨" -ForegroundColor Magenta
Write-Host ""
Read-Host "اضغط Enter للخروج"