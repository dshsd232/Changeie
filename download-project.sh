#!/bin/bash

# ألوان للنص
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 === مرحباً بك في مثبت CryptoNexus ===${NC}"
echo ""

# التحقق من Node.js
echo -e "${YELLOW}🔍 فحص Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js مثبت: $NODE_VERSION${NC}"
    
    # فحص الإصدار
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        echo -e "${YELLOW}⚠️  إصدار Node.js قديم. يُفضل إصدار 18 أو أحدث${NC}"
    fi
else
    echo -e "${RED}❌ Node.js غير مثبت!${NC}"
    echo -e "${YELLOW}📥 يرجى تحميل Node.js من: https://nodejs.org${NC}"
    echo -e "${YELLOW}⚠️  تأكد من تحميل إصدار LTS (18.x أو أحدث)${NC}"
    echo ""
    read -p "هل تريد فتح موقع Node.js الآن؟ (y/n): " response
    if [[ $response == "y" || $response == "Y" ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://nodejs.org"
        elif command -v open &> /dev/null; then
            open "https://nodejs.org"
        fi
    fi
    exit 1
fi

# اختيار مسار المشروع
DEFAULT_PATH="$HOME/Desktop/cryptonexus-platform"
echo -e "${CYAN}📂 أين تريد إنشاء المشروع؟${NC}"
echo -e "${WHITE}المسار الافتراضي: $DEFAULT_PATH${NC}"
read -p "اضغط Enter للمسار الافتراضي أو اكتب مسار جديد: " PROJECT_PATH

if [[ -z "$PROJECT_PATH" ]]; then
    PROJECT_PATH="$DEFAULT_PATH"
fi

echo ""
echo -e "${GREEN}📁 سيتم إنشاء المشروع في: $PROJECT_PATH${NC}"
echo ""

# إنشاء هيكل المجلدات
echo -e "${YELLOW}📁 إنشاء هيكل المجلدات...${NC}"

FOLDERS=(
    ""
    "src"
    "styles"
    "components"
    "components/ui"
    "components/figma"
    "public"
    "guidelines"
)

for folder in "${FOLDERS[@]}"; do
    if [[ -z "$folder" ]]; then
        FULL_PATH="$PROJECT_PATH"
        mkdir -p "$FULL_PATH"
        echo -e "${GREEN}✅ مجلد المشروع الرئيسي${NC}"
    else
        FULL_PATH="$PROJECT_PATH/$folder"
        mkdir -p "$FULL_PATH"
        echo -e "${GREEN}✅ مجلد: $folder${NC}"
    fi
done

echo ""
echo -e "${CYAN}🎯 === الخطوات التالية ===${NC}"
echo ""
echo -e "${WHITE}1. انسخ الملفات التالية من Figma Make إلى المجلدات المناسبة:${NC}"
echo ""
echo -e "${YELLOW}📄 الملفات الأساسية (في الجذر الرئيسي):${NC}"
MAIN_FILES=(
    "package.json"
    "index.html"
    "App.tsx"
    "vite.config.ts"
    "tsconfig.json"
    "tsconfig.node.json"
    "vite-env.d.ts"
    ".env.example"
    ".gitignore"
    ".eslintrc.cjs"
    "README.md"
)
for file in "${MAIN_FILES[@]}"; do
    echo -e "${WHITE}   • $file${NC}"
done

echo ""
echo -e "${YELLOW}📁 src/:${NC}"
echo -e "${WHITE}   • main.tsx${NC}"

echo ""
echo -e "${YELLOW}📁 styles/:${NC}"
echo -e "${WHITE}   • globals.css${NC}"

echo ""
echo -e "${YELLOW}📁 components/:${NC}"
COMPONENT_FILES=(
    "Navigation.tsx"
    "LandingPage.tsx"
    "CryptoExchange.tsx"
    "CryptoMarkets.tsx"
    "CryptoTrading.tsx"
    "CryptoWallet.tsx"
    "BitcoinBuySell.tsx"
)
for file in "${COMPONENT_FILES[@]}"; do
    echo -e "${WHITE}   • $file${NC}"
done

echo ""
echo -e "${YELLOW}📁 components/ui/:${NC}"
echo -e "${WHITE}   • جميع ملفات UI المكونات (40+ ملف)${NC}"

echo ""
echo -e "${YELLOW}📁 public/:${NC}"
PUBLIC_FILES=(
    "site.webmanifest"
    "sw.js"
)
for file in "${PUBLIC_FILES[@]}"; do
    echo -e "${WHITE}   • $file${NC}"
done

echo ""
echo -e "${WHITE}2. بعد نسخ الملفات، شغل الأوامر التالية:${NC}"
echo ""
echo -e "${CYAN}   cd \"$PROJECT_PATH\"${NC}"
echo -e "${CYAN}   npm install${NC}"
echo -e "${CYAN}   npm run dev${NC}"
echo ""
echo -e "${WHITE}3. افتح المتصفح على: http://localhost:3000${NC}"
echo ""

# إنشاء ملف تعليمات
INSTRUCTIONS_CONTENT="# 🚀 تعليمات تشغيل CryptoNexus

## الخطوات:
1. انسخ جميع الملفات من Figma Make إلى هذا المجلد
2. افتح Terminal
3. انتقل لمجلد المشروع: cd \"$PROJECT_PATH\"
4. ثبت التبعيات: npm install
5. شغل المشروع: npm run dev
6. افتح المتصفح: http://localhost:3000

## في حالة المشاكل:
- تأكد من تثبيت Node.js إصدار 18+
- تأكد من نسخ جميع الملفات بالهيكل الصحيح
- شغل: npm install مرة أخرى إذا فشل

## أوامر مفيدة:
- npm run build     # بناء للإنتاج
- npm run preview   # معاينة النسخة المبنية
- npm run lint      # فحص جودة الكود

## الدعم:
راسلني إذا واجهت أي مشكلة!

مبروك! 🎉"

INSTRUCTIONS_PATH="$PROJECT_PATH/تعليمات_التشغيل.txt"
echo "$INSTRUCTIONS_CONTENT" > "$INSTRUCTIONS_PATH"

echo -e "${GREEN}📝 تم إنشاء ملف التعليمات: تعليمات_التشغيل.txt${NC}"
echo ""

# إنشاء سكريبت تشغيل سريع
START_SCRIPT="#!/bin/bash
echo '🚀 تشغيل CryptoNexus...'
echo ''

# التحقق من وجود package.json
if [ ! -f \"package.json\" ]; then
    echo '❌ package.json غير موجود. تأكد من نسخ الملفات أولاً'
    exit 1
fi

# تثبيت التبعيات إذا لم تكن موجودة
if [ ! -d \"node_modules\" ]; then
    echo '📦 تثبيت التبعيات...'
    npm install
fi

# تشغيل المشروع
echo '🌟 تشغيل المشروع...'
echo '📍 الرابط: http://localhost:3000'
echo '🛑 لإيقاف الخادم: اضغط Ctrl+C'
echo ''

npm run dev"

START_SCRIPT_PATH="$PROJECT_PATH/start.sh"
echo "$START_SCRIPT" > "$START_SCRIPT_PATH"
chmod +x "$START_SCRIPT_PATH"

echo -e "${GREEN}🚀 تم إنشاء سكريبت التشغيل: start.sh${NC}"
echo ""

# عرض النتيجة النهائية
echo -e "${GREEN}🎉 === تم بنجاح! ===${NC}"
echo ""
echo -e "${CYAN}📂 مجلد المشروع: $PROJECT_PATH${NC}"
echo -e "${YELLOW}📝 اقرأ ملف: تعليمات_التشغيل.txt للتفاصيل${NC}"
echo -e "${YELLOW}🚀 استخدم: ./start.sh للتشغيل السريع${NC}"
echo ""

# سؤال عن فتح المجلد
read -p "هل تريد فتح مجلد المشروع الآن؟ (y/n): " OPEN_FOLDER
if [[ $OPEN_FOLDER == "y" || $OPEN_FOLDER == "Y" ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "$PROJECT_PATH"
    elif command -v open &> /dev/null; then
        open "$PROJECT_PATH"
    elif command -v nautilus &> /dev/null; then
        nautilus "$PROJECT_PATH"
    fi
fi

echo ""
echo -e "${PURPLE}✨ شكراً لاستخدام CryptoNexus! ✨${NC}"
echo ""
read -p "اضغط Enter للخروج..."