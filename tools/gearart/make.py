import os
W, H = 1200, 800
os.makedirs('/home/claude/animeblog/gearart/out', exist_ok=True)

ICONS = {
 'pullup-bar': '''
  <!-- door frame -->
  <rect x="300" y="90" width="600" height="700" rx="8" fill="none" stroke="#3A3A42" stroke-width="18"/>
  <rect x="330" y="120" width="540" height="700" fill="#0B0B0F"/>
  <!-- bar -->
  <rect x="260" y="246" width="680" height="42" rx="21" fill="#F5F5F5"/>
  <!-- grips -->
  <rect x="360" y="240" width="110" height="54" rx="27" fill="#FF2D2D"/>
  <rect x="730" y="240" width="110" height="54" rx="27" fill="#FF2D2D"/>
  <!-- hooks -->
  <path d="M300 250 v-80 h70" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round"/>
  <path d="M900 250 v-80 h-70" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round"/>
 ''',
 'dumbbells': '''
  <g transform="translate(600 420) rotate(-25) scale(1.45)">
   <rect x="-150" y="-16" width="300" height="32" rx="16" fill="#F5F5F5"/>
   <rect x="-290" y="-80" width="60" height="160" rx="10" fill="#FF2D2D"/>
   <rect x="-230" y="-60" width="46" height="120" rx="8" fill="#F5F5F5"/>
   <rect x="-186" y="-44" width="40" height="88" rx="8" fill="#FF2D2D"/>
   <rect x="230" y="-80" width="60" height="160" rx="10" fill="#FF2D2D"/>
   <rect x="184" y="-60" width="46" height="120" rx="8" fill="#F5F5F5"/>
   <rect x="146" y="-44" width="40" height="88" rx="8" fill="#FF2D2D"/>
   <rect x="-320" y="-30" width="34" height="60" rx="6" fill="#F5F5F5"/>
   <rect x="286" y="-30" width="34" height="60" rx="6" fill="#F5F5F5"/>
  </g>
 ''',
 'bench': '''
  <g transform="translate(600 400)">
   <!-- back pad (inclined) -->
   <g transform="translate(-50 25) rotate(35)"><rect x="-280" y="-35" width="270" height="70" rx="18" fill="#FF2D2D"/></g>
   <!-- seat pad -->
   <rect x="-60" y="-10" width="330" height="70" rx="18" fill="#FF2D2D"/>
   <!-- frame -->
   <path d="M-200 80 L60 80 L60 60" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M-200 80 L-260 220 M-140 80 L-80 220" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round"/>
   <path d="M160 60 L160 220 M250 60 L250 220 M120 220 L290 220" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round"/>
   <path d="M-170 -50 L-110 20" fill="none" stroke="#F5F5F5" stroke-width="22" stroke-linecap="round"/>
  </g>
 ''',
 'bands': '''
  <g fill="none" stroke-linecap="round">
   <ellipse cx="600" cy="420" rx="330" ry="210" stroke="#F5F5F5" stroke-width="30" transform="rotate(-18 600 420)"/>
   <ellipse cx="600" cy="420" rx="330" ry="210" stroke="#FF2D2D" stroke-width="30" transform="rotate(12 600 420)"/>
   <ellipse cx="600" cy="420" rx="330" ry="210" stroke="#F5F5F5" stroke-width="30" transform="rotate(42 600 420)" opacity="0.35"/>
  </g>
 ''',
 'whey': '''
  <g transform="translate(600 430)">
   <rect x="-190" y="-260" width="380" height="520" rx="60" fill="#F5F5F5"/>
   <rect x="-210" y="-300" width="420" height="90" rx="30" fill="#FF2D2D"/>
   <rect x="-150" y="-110" width="300" height="230" rx="18" fill="#0B0B0F"/>
   <text x="0" y="-15" font-family="'Bebas Neue','Impact',sans-serif" font-size="96" fill="#F5F5F5" text-anchor="middle">WHEY</text>
   <text x="0" y="60" font-family="'Bebas Neue','Impact',sans-serif" font-size="40" fill="#FF2D2D" text-anchor="middle" letter-spacing="6">PROTEIN</text>
   <rect x="-150" y="160" width="300" height="22" rx="11" fill="#FF2D2D"/>
  </g>
 ''',
 'creatine': '''
  <g transform="translate(600 430)">
   <rect x="-170" y="-230" width="340" height="490" rx="50" fill="#F5F5F5"/>
   <rect x="-190" y="-280" width="380" height="90" rx="30" fill="#FF2D2D"/>
   <rect x="-130" y="-100" width="260" height="220" rx="18" fill="#0B0B0F"/>
   <text x="0" y="-5" font-family="'Bebas Neue','Impact',sans-serif" font-size="78" fill="#F5F5F5" text-anchor="middle">CREATINE</text>
   <text x="0" y="60" font-family="'Bebas Neue','Impact',sans-serif" font-size="36" fill="#FF2D2D" text-anchor="middle" letter-spacing="5">5 G / DAY</text>
   <circle cx="100" cy="190" r="40" fill="#FF2D2D"/>
  </g>
 ''',
}
LABEL = {'pullup-bar':'DOORWAY PULL-UP BAR','dumbbells':'ADJUSTABLE DUMBBELLS','bench':'ADJUSTABLE BENCH','bands':'RESISTANCE BANDS','whey':'WHEY PROTEIN','creatine':'CREATINE MONOHYDRATE'}

FRAME = '''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
 <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F1F24"/><stop offset="1" stop-color="#0B0B0F"/></linearGradient>
 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#2C2C33" stroke-width="1"/></pattern>
</defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/>
<rect width="{W}" height="{H}" fill="url(#grid)" opacity="0.6"/>
<path d="M0 {H} L{W} 0 L{W} 130 L130 {H} Z" fill="#FF2D2D" opacity="0.10"/>
<path d="M0 {H} L{W} 60 L{W} 140 L0 {H}" fill="#FF2D2D" opacity="0.18"/>
{icon}
<text x="60" y="{ly}" font-family="'Bebas Neue','Impact',sans-serif" font-size="46" fill="#FF2D2D" letter-spacing="6">{label}</text>
<text x="{W}" y="{ly}" dx="-60" font-family="'Bebas Neue','Impact',sans-serif" font-size="30" fill="#A6A6AE" letter-spacing="4" text-anchor="end">ANIMEBULK · OUR PICK</text>
</svg>'''

for k, icon in ICONS.items():
    svg = FRAME.format(W=W, H=H, icon=icon, label=LABEL[k], ly=H-50)
    open(f'/home/claude/animeblog/gearart/out/gear-{k}.svg','w').write(svg)
print('ok')
