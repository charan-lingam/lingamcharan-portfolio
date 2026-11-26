import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import photo from './assets/me.webp'
import collegeImg from '../aboutme/collegelogo.png'
import instaImg from '../aboutme/insta.png'
import aiImg from '../aboutme/ai.jpeg'
import tapeoutxImg from '../aboutme/tapeoutx.jpeg'
import videoEditorImg from '../aboutme/videoeditor.jpeg'

// Cursive "hello" handwriting path (smoothed), running from the left edge (x=0) to the right edge (x=1600)
const HELLO_PATH = "M 0.00 360.51 C 2.96 360.01, 11.83 358.50, 17.75 357.52 C 23.67 356.54, 29.59 355.56, 35.52 354.64 C 41.44 353.71, 47.38 352.82, 53.32 351.98 C 59.26 351.14, 65.21 350.35, 71.16 349.60 C 77.11 348.86, 83.07 348.15, 89.03 347.49 C 95.00 346.83, 100.97 346.21, 106.94 345.64 C 112.91 345.06, 118.89 344.53, 124.87 344.05 C 130.85 343.57, 136.83 343.13, 142.82 342.74 C 148.80 342.35, 154.79 342.01, 160.79 341.71 C 166.78 341.41, 172.77 341.16, 178.77 340.96 C 184.77 340.77, 190.77 340.62, 196.76 340.52 C 202.76 340.42, 208.76 340.36, 214.76 340.37 C 220.76 340.37, 226.76 340.42, 232.76 340.52 C 238.76 340.63, 244.76 340.78, 250.75 341.00 C 256.75 341.21, 262.74 341.47, 268.73 341.79 C 274.72 342.11, 280.71 342.48, 286.70 342.91 C 292.68 343.34, 298.66 343.83, 304.63 344.38 C 310.61 344.92, 316.58 345.52, 322.54 346.17 C 328.51 346.83, 334.46 347.55, 340.41 348.32 C 346.36 349.09, 352.31 349.92, 358.24 350.79 C 364.18 351.66, 370.12 352.52, 376.03 353.54 C 381.93 354.55, 387.81 355.85, 393.69 356.89 C 399.57 357.94, 405.51 359.56, 411.31 359.81 C 417.12 360.05, 423.14 359.98, 428.53 358.36 C 433.92 356.73, 439.07 353.56, 443.65 350.06 C 448.24 346.55, 452.26 341.88, 456.04 337.31 C 459.81 332.74, 463.15 327.71, 466.30 322.64 C 469.45 317.56, 472.11 312.17, 474.94 306.89 C 477.77 301.61, 480.40 296.20, 483.30 290.96 C 486.21 285.72, 489.31 280.59, 492.39 275.44 C 495.47 270.29, 498.71 265.24, 501.76 260.08 C 504.81 254.91, 507.82 249.72, 510.67 244.45 C 513.53 239.18, 516.41 233.89, 518.88 228.45 C 521.35 223.01, 523.71 217.49, 525.48 211.81 C 527.26 206.13, 528.64 200.22, 529.52 194.38 C 530.40 188.53, 531.36 182.10, 530.75 176.74 C 530.15 171.39, 528.97 165.34, 525.91 162.26 C 522.84 159.17, 517.23 157.88, 512.37 158.23 C 507.51 158.58, 501.33 161.26, 496.75 164.36 C 492.17 167.46, 488.11 172.07, 484.88 176.82 C 481.66 181.57, 479.52 187.33, 477.40 192.87 C 475.28 198.41, 473.68 204.26, 472.18 210.05 C 470.68 215.84, 469.47 221.72, 468.40 227.61 C 467.34 233.51, 466.66 239.48, 465.78 245.41 C 464.89 251.34, 464.06 257.28, 463.09 263.20 C 462.12 269.12, 461.01 275.02, 459.96 280.92 C 458.91 286.83, 457.82 292.73, 456.78 298.64 C 455.74 304.55, 454.72 310.46, 453.71 316.38 C 452.70 322.29, 451.70 328.21, 450.72 334.13 C 449.74 340.04, 448.77 345.97, 447.83 351.89 C 446.90 357.82, 445.98 363.75, 445.10 369.68 C 444.22 375.62, 443.32 381.65, 442.53 387.50 C 441.75 393.35, 440.69 400.26, 440.40 404.78 C 440.10 409.30, 439.89 414.26, 440.75 414.61 C 441.61 414.96, 443.65 410.82, 445.57 406.87 C 447.50 402.92, 449.99 396.34, 452.29 390.92 C 454.59 385.51, 456.93 379.86, 459.39 374.39 C 461.85 368.92, 464.39 363.48, 467.06 358.12 C 469.73 352.75, 472.32 347.28, 475.41 342.21 C 478.51 337.14, 481.66 331.96, 485.63 327.69 C 489.60 323.42, 494.27 319.61, 499.24 316.57 C 504.20 313.53, 509.91 310.97, 515.44 309.46 C 520.98 307.96, 527.19 306.72, 532.44 307.55 C 537.70 308.38, 543.12 310.88, 546.99 314.44 C 550.86 317.99, 553.94 323.63, 555.65 328.88 C 557.37 334.13, 557.77 340.27, 557.27 345.94 C 556.77 351.61, 554.37 357.28, 552.66 362.91 C 550.95 368.55, 548.08 374.07, 547.01 379.75 C 545.94 385.43, 545.34 391.49, 546.26 396.98 C 547.19 402.47, 549.38 408.63, 552.56 412.70 C 555.74 416.78, 560.53 420.34, 565.34 421.42 C 570.15 422.49, 576.20 421.00, 581.40 419.14 C 586.61 417.27, 591.97 413.78, 596.59 410.21 C 601.20 406.64, 605.42 402.31, 609.10 397.73 C 612.78 393.15, 615.55 387.40, 618.66 382.72 C 621.76 378.04, 624.72 371.75, 627.72 369.64 C 630.73 367.53, 634.05 367.75, 636.69 370.06 C 639.32 372.36, 640.66 379.71, 643.55 383.45 C 646.45 387.19, 649.83 391.62, 654.06 392.52 C 658.30 393.42, 664.16 391.25, 668.95 388.85 C 673.75 386.45, 678.75 382.26, 682.82 378.11 C 686.90 373.96, 690.56 369.06, 693.42 363.97 C 696.29 358.89, 698.82 353.14, 699.99 347.60 C 701.16 342.07, 701.80 335.88, 700.45 330.75 C 699.11 325.63, 695.81 320.31, 691.92 316.85 C 688.04 313.40, 682.21 310.55, 677.15 310.02 C 672.08 309.49, 666.28 311.15, 661.52 313.68 C 656.75 316.22, 652.29 320.80, 648.56 325.22 C 644.82 329.63, 641.52 334.85, 639.10 340.16 C 636.67 345.46, 634.95 351.29, 634.01 357.06 C 633.06 362.82, 632.81 368.97, 633.45 374.74 C 634.08 380.52, 635.44 386.47, 637.80 391.70 C 640.16 396.93, 643.65 401.94, 647.61 406.14 C 651.56 410.34, 656.46 414.10, 661.52 416.89 C 666.58 419.68, 672.31 421.77, 677.99 422.88 C 683.66 423.99, 689.79 424.14, 695.58 423.55 C 701.37 422.96, 707.33 421.55, 712.72 419.37 C 718.10 417.19, 723.23 414.01, 727.91 410.47 C 732.59 406.93, 736.75 402.50, 740.80 398.13 C 744.84 393.76, 748.59 389.02, 752.19 384.24 C 755.78 379.46, 759.12 374.47, 762.39 369.45 C 765.67 364.43, 768.70 359.25, 771.83 354.13 C 774.97 349.02, 778.08 343.89, 781.21 338.77 C 784.34 333.65, 787.48 328.54, 790.61 323.42 C 793.74 318.30, 796.85 313.17, 799.98 308.05 C 803.10 302.93, 806.23 297.81, 809.35 292.68 C 812.47 287.56, 815.59 282.43, 818.70 277.30 C 821.81 272.17, 824.92 267.04, 828.02 261.90 C 831.12 256.77, 834.37 251.71, 837.32 246.50 C 840.28 241.29, 843.23 236.07, 845.76 230.65 C 848.28 225.24, 850.55 219.66, 852.48 214.01 C 854.40 208.37, 856.36 202.54, 857.31 196.78 C 858.26 191.03, 859.17 184.85, 858.17 179.48 C 857.16 174.11, 854.68 168.23, 851.28 164.58 C 847.89 160.93, 842.34 157.76, 837.81 157.58 C 833.27 157.40, 828.08 160.18, 824.07 163.49 C 820.06 166.81, 816.71 172.61, 813.72 177.47 C 810.73 182.32, 808.39 187.26, 806.14 192.60 C 803.89 197.94, 801.86 203.76, 800.20 209.50 C 798.55 215.23, 797.39 221.14, 796.21 227.01 C 795.04 232.88, 794.07 238.81, 793.15 244.74 C 792.23 250.67, 791.47 256.62, 790.68 262.56 C 789.90 268.51, 789.23 274.48, 788.44 280.42 C 787.65 286.37, 786.80 292.31, 785.92 298.24 C 785.03 304.18, 784.12 310.11, 783.13 316.02 C 782.14 321.94, 781.16 327.86, 779.99 333.74 C 778.83 339.62, 777.37 345.45, 776.13 351.31 C 774.88 357.16, 773.17 363.00, 772.51 368.86 C 771.84 374.72, 771.34 380.76, 772.15 386.46 C 772.96 392.17, 774.72 398.13, 777.39 403.09 C 780.05 408.06, 783.78 413.22, 788.13 416.25 C 792.47 419.27, 798.13 421.09, 803.46 421.26 C 808.79 421.43, 814.81 419.47, 820.10 417.28 C 825.39 415.08, 830.60 411.71, 835.22 408.09 C 839.84 404.47, 843.94 400.05, 847.83 395.56 C 851.71 391.07, 855.06 386.03, 858.54 381.15 C 862.02 376.28, 865.36 371.28, 868.71 366.31 C 872.06 361.33, 875.40 356.34, 878.65 351.31 C 881.91 346.27, 885.10 341.19, 888.26 336.09 C 891.41 330.98, 894.52 325.85, 897.59 320.70 C 900.67 315.55, 903.67 310.35, 906.71 305.18 C 909.74 300.00, 912.75 294.81, 915.81 289.65 C 918.87 284.49, 921.99 279.36, 925.06 274.21 C 928.13 269.06, 931.22 263.91, 934.25 258.73 C 937.27 253.55, 940.29 248.36, 943.23 243.13 C 946.16 237.91, 949.28 232.75, 951.87 227.37 C 954.46 222.00, 956.98 216.54, 958.76 210.89 C 960.55 205.24, 961.86 199.30, 962.57 193.46 C 963.28 187.62, 963.94 181.15, 963.05 175.85 C 962.15 170.54, 960.51 164.66, 957.18 161.65 C 953.86 158.64, 948.06 157.43, 943.11 157.81 C 938.16 158.19, 932.00 160.77, 927.50 163.91 C 923.01 167.05, 919.16 171.80, 916.16 176.66 C 913.16 181.51, 911.39 187.43, 909.51 193.05 C 907.62 198.68, 906.26 204.59, 904.84 210.41 C 903.43 216.23, 902.14 222.10, 901.01 227.98 C 899.88 233.87, 898.96 239.80, 898.04 245.73 C 897.12 251.66, 896.31 257.60, 895.49 263.55 C 894.67 269.49, 893.94 275.44, 893.13 281.39 C 892.31 287.33, 891.55 293.28, 890.60 299.21 C 889.65 305.13, 888.55 311.02, 887.43 316.91 C 886.31 322.81, 884.97 328.66, 883.88 334.56 C 882.78 340.45, 881.73 346.36, 880.86 352.29 C 880.00 358.22, 879.13 364.20, 878.68 370.14 C 878.23 376.08, 877.48 382.22, 878.15 387.93 C 878.82 393.64, 880.01 399.60, 882.68 404.41 C 885.36 409.22, 889.66 413.80, 894.21 416.80 C 898.76 419.79, 904.68 422.09, 909.98 422.37 C 915.28 422.65, 921.02 420.94, 926.00 418.49 C 930.98 416.05, 935.50 411.69, 939.85 407.70 C 944.19 403.72, 948.23 399.15, 952.09 394.59 C 955.94 390.02, 959.41 385.13, 962.97 380.33 C 966.53 375.53, 969.63 370.34, 973.44 365.78 C 977.25 361.22, 981.34 356.87, 985.82 352.98 C 990.30 349.09, 995.33 345.77, 1000.29 342.44 C 1005.26 339.11, 1010.53 336.17, 1015.61 333.01 C 1020.70 329.86, 1026.30 326.71, 1030.81 323.51 C 1035.32 320.31, 1041.04 316.30, 1042.68 313.80 C 1044.32 311.30, 1043.50 309.06, 1040.67 308.52 C 1037.84 307.98, 1030.95 309.18, 1025.70 310.55 C 1020.44 311.92, 1014.24 313.95, 1009.15 316.74 C 1004.06 319.52, 999.18 323.09, 995.17 327.25 C 991.15 331.40, 987.73 336.49, 985.06 341.67 C 982.39 346.85, 980.37 352.61, 979.15 358.33 C 977.93 364.05, 977.45 370.15, 977.74 375.97 C 978.04 381.80, 978.93 387.94, 980.92 393.28 C 982.92 398.62, 985.88 403.92, 989.71 408.03 C 993.53 412.15, 998.69 415.49, 1003.87 417.95 C 1009.05 420.41, 1015.03 421.98, 1020.80 422.79 C 1026.56 423.60, 1032.67 423.53, 1038.47 422.80 C 1044.28 422.08, 1050.22 420.59, 1055.64 418.42 C 1061.06 416.24, 1066.37 413.30, 1070.99 409.75 C 1075.61 406.21, 1079.86 401.81, 1083.34 397.13 C 1086.81 392.46, 1089.88 387.14, 1091.84 381.70 C 1093.79 376.27, 1094.89 370.32, 1095.05 364.54 C 1095.20 358.76, 1094.28 352.66, 1092.78 347.04 C 1091.29 341.42, 1089.17 335.52, 1086.08 330.81 C 1082.98 326.11, 1078.76 321.43, 1074.21 318.83 C 1069.65 316.23, 1063.29 314.47, 1058.75 315.23 C 1054.21 315.99, 1049.55 319.34, 1046.95 323.39 C 1044.35 327.44, 1043.32 334.01, 1043.18 339.53 C 1043.03 345.06, 1043.97 351.35, 1046.08 356.52 C 1048.19 361.70, 1051.78 366.57, 1055.82 370.58 C 1059.86 374.58, 1065.12 377.93, 1070.32 380.55 C 1075.51 383.17, 1081.27 385.24, 1086.98 386.29 C 1092.69 387.34, 1098.72 387.38, 1104.55 386.85 C 1110.39 386.33, 1116.30 384.83, 1121.98 383.12 C 1127.66 381.42, 1133.24 379.14, 1138.64 376.62 C 1144.03 374.11, 1149.06 370.74, 1154.35 368.02 C 1159.65 365.30, 1164.84 362.26, 1170.40 360.30 C 1175.95 358.34, 1181.82 357.17, 1187.68 356.25 C 1193.54 355.32, 1199.60 355.25, 1205.57 354.75 C 1211.53 354.26, 1217.53 353.91, 1223.49 353.28 C 1229.45 352.66, 1235.39 351.79, 1241.34 350.99 C 1247.28 350.20, 1253.21 349.28, 1259.16 348.48 C 1265.11 347.69, 1271.06 346.92, 1277.01 346.21 C 1282.97 345.50, 1288.93 344.83, 1294.90 344.22 C 1300.87 343.62, 1306.84 343.06, 1312.82 342.58 C 1318.80 342.10, 1324.79 341.69, 1330.78 341.34 C 1336.77 341.00, 1342.76 340.72, 1348.76 340.50 C 1354.75 340.28, 1360.75 340.12, 1366.75 340.02 C 1372.75 339.91, 1378.75 339.87, 1384.75 339.88 C 1390.75 339.89, 1396.75 339.96, 1402.74 340.08 C 1408.74 340.20, 1414.74 340.37, 1420.74 340.59 C 1426.73 340.81, 1432.73 341.09, 1438.72 341.41 C 1444.71 341.73, 1450.70 342.10, 1456.68 342.52 C 1462.67 342.94, 1468.65 343.40, 1474.63 343.90 C 1480.60 344.41, 1486.58 344.96, 1492.55 345.55 C 1498.52 346.15, 1504.49 346.78, 1510.45 347.45 C 1516.41 348.12, 1522.37 348.84, 1528.32 349.59 C 1534.27 350.34, 1540.22 351.12, 1546.16 351.95 C 1552.11 352.78, 1558.04 353.65, 1563.98 354.54 C 1569.91 355.44, 1575.83 356.38, 1581.76 357.32 C 1587.68 358.27, 1596.57 359.72, 1599.53 360.20"

const DRAW_TIME = 1300   // pen writes "hello"
const HOLD_TIME = 250    // pause when fully written
const VANISH_TIME = 800  // erase with beige trail
const HERO_AT = 0.9      // vanish progress at which the hero starts, while the last of the trail fades (no gap)
const TRAIL_LENGTH = 400

// "About me" cards: centre positions as % of the hero (layout from the owner's sketch)
// `contain` shows the whole image (used for the wide Instagram screenshot)
// `href` makes a card a link (opens in a new tab)
const CARDS = [
  { x: 7.5, y: 53, title: 'VLSI Engineering Student', img: collegeImg },
  { x: 27, y: 62, title: 'Content Creator', img: instaImg, contain: true, href: 'https://www.instagram.com/the_charan_way/' },
  { x: 68.5, y: 89, title: 'AI Enthusiast', img: aiImg, href: 'https://github.com/lingamcharan09-design?tab=repositories' }, // between the right arm and the waist
  { x: 88.5, y: 50, title: 'Founder: TapeoutX', img: tapeoutxImg, href: 'https://tapeoutx.vercel.app/' },
  { x: 77, y: 17, title: 'Video Editor', img: videoEditorImg, href: 'https://instagram.com/tapeoutx' },
]

// "Let's connect" CTA at the top left; the thread underlines it on its way out. Centre as % of the hero.
// In the thread route it is pinned like a card, with index CTA.
const CTA_POS = { x: 11, y: 12 }
const CTA = CARDS.length
const CONTACTS = [
  { label: 'WhatsApp', href: 'https://wa.me/917842281810', icon: 'whatsapp' },
  { label: 'Instagram', href: 'https://www.instagram.com/the_charan_way/', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lingam-charan-617187284', icon: 'linkedin' },
]

// Cursive "meet" (one pen stroke, plus the t's cross), written like "hello" but not edge to edge
const MEET_PATH = `M 4 150 C 14 140, 24 112, 30 92 C 32 86, 36 88, 35 96 C 34 115, 32 135, 30 150
C 36 120, 48 92, 62 90 C 74 88, 78 100, 76 115 C 75 128, 73 140, 72 150
C 78 120, 90 92, 104 90 C 116 88, 120 100, 118 115 C 117 128, 116 140, 118 146
C 122 154, 134 152, 146 146
C 156 140, 166 128, 172 116 C 178 104, 172 92, 162 92 C 150 92, 144 108, 146 124 C 148 142, 160 152, 176 150 C 186 149, 194 142, 200 136
C 210 128, 222 124, 228 116 C 234 104, 228 92, 218 92 C 206 92, 200 108, 202 124 C 204 142, 216 152, 232 150 C 242 149, 250 142, 256 136
C 264 120, 272 80, 278 42 C 276 70, 270 110, 270 132 C 270 148, 280 154, 292 150 C 302 146, 310 138, 316 130
M 256 78 C 272 76, 290 74, 306 74`

// Hero sequence (ms after the hero appears): "meet" writes itself first -> the avatar pops in ->
// LINGAM and CHARAN appear before the avatar animation finishes -> then the thread and cards
const MEET_START = 0
const MEET_TIME = 1050
const AVATAR_START = MEET_START + MEET_TIME
const AVATAR_TIME = 720 // avatar rise-pop animation
const NAME_START = AVATAR_START + 240 // while the avatar is still rising
const NAME_TIME = 720 // name-in animation
const THREAD_START = Math.max(AVATAR_START + AVATAR_TIME, NAME_START + NAME_TIME)
const THREAD_TIME = 2700 // the whole thread draws in this time (eased)
const THREAD_SMOOTHING = 30 // px: how strongly the route is smoothed
const THREAD_STEP = 3 // px between points of the final curve

// Key bends of the thread's route (from the owner's sketch). Each point is pinned to a
// card (card: index, fx/fy: fraction of that card's box) or to the photo (photo: true),
// so the route keeps its shape at any screen size.
// `split` marks where the thread comes out from behind the left arm: before it the
// thread is drawn behind the photo, after it in front.
const THREAD = [
  { card: 0, left: 0, fy: 0.7 }, // enters at the screen's left edge
  { card: 0, fx: 0.5, fy: 0.68 }, // runs behind card 1 and out its right side
  { card: 1, fx: 0.3, fy: 0.85 }, // into card 2
  { photo: true, fx: 0.2, fy: 0.545 },
  { photo: true, fx: 0.3, fy: 0.565 },
  { photo: true, fx: 0.335, fy: 0.63 }, // behind the left arm
  { photo: true, fx: 0.359, fy: 0.712, split: true }, // out in front of the waist
  { photo: true, fx: 0.46, fy: 0.78 },
  { photo: true, fx: 0.57, fy: 0.76 },
  { photo: true, fx: 0.68, fy: 0.69 }, // over the right arm
  { card: 2, fx: 0.5, fy: 0.85 }, // through card 3
  { card: 2, fx: 0.95, fy: 0.35 },
  { card: 3, fx: 0.22, fy: 0.85 }, // up through card 4
  { card: 3, fx: 0.12, fy: 0.15 },
  { card: 4, fx: 0.9, fy: 1.42 }, // across to card 5
  { card: 4, fx: 0.4, fy: 1.2 },
  { card: 4, fx: 0.2, fy: 0.5 }, // up through card 5
  { card: 4, fx: -0.2, fy: 0.2 }, // out of card 5's left side
  // waves across the top, over the head, towards "Let's connect"
  { photo: true, fx: 0.62, fy: -0.2 },
  { photo: true, fx: 0.5, fy: -0.08 },
  { photo: true, fx: 0.38, fy: -0.2 },
  { photo: true, fx: 0.26, fy: -0.08 },
  { card: CTA, fx: 1.35, fy: 1.08 },
  { card: CTA, fx: 0.5, fy: 1.1 }, // runs under "Let's connect", like an underline
  { card: CTA, fx: -0.12, fy: 0.95 },
  { card: CTA, fx: -0.2, top: -20 }, // curls up and leaves through the screen's top edge
]

// Element box relative to the hero, ignoring animation transforms
function boxOf(el, centered) {
  const w = el.offsetWidth
  const h = el.offsetHeight
  return {
    left: el.offsetLeft - (centered ? w / 2 : 0),
    top: el.offsetTop - (centered ? h / 2 : 0),
    width: w,
    height: h,
  }
}

function resolvePoint(p, cardBoxes, photoBox) {
  const box = p.photo ? photoBox : cardBoxes[p.card]
  return {
    x: p.left ?? box.left + p.fx * box.width,
    y: p.top ?? box.top + p.fy * box.height,
  }
}

// Turn the key bends into one smooth curve:
// 1. a Catmull-Rom curve through the bends, sampled densely
// 2. resampled evenly along its length
// 3. Gaussian-smoothed (ends stay pinned) so no wobbles or sharp corners remain
// Returns the part behind the photo, the part in front, and lengths for timing.
function buildThread(points, splitWaypoint) {
  const dense = []
  const waypointAt = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    waypointAt[i] = dense.length
    for (let s = 0; s < 24; s++) {
      const t = s / 24
      const t2 = t * t
      const t3 = t2 * t
      dense.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      })
    }
  }
  waypointAt[points.length - 1] = dense.length
  dense.push(points.at(-1))

  // even resampling
  const cum = [0]
  for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i].x - dense[i - 1].x, dense[i].y - dense[i - 1].y))
  const even = []
  for (let s = 0, j = 0; s <= cum.at(-1); s += THREAD_STEP) {
    while (cum[j + 1] < s) j++
    const f = (s - cum[j]) / (cum[j + 1] - cum[j] || 1)
    even.push({ x: dense[j].x + f * (dense[j + 1].x - dense[j].x), y: dense[j].y + f * (dense[j + 1].y - dense[j].y) })
  }
  even.push(points.at(-1))
  const evenIndexOf = (waypoint) => Math.min(even.length - 1, Math.round(cum[waypointAt[waypoint]] / THREAD_STEP))

  // Gaussian smoothing; the window shrinks near the ends so they stay pinned
  const sigma = THREAD_SMOOTHING / THREAD_STEP
  const radius = Math.ceil(sigma * 3)
  const smooth = even.map((_, i) => {
    const r = Math.min(radius, i, even.length - 1 - i)
    let w = 0
    let x = 0
    let y = 0
    for (let k = -r; k <= r; k++) {
      const g = Math.exp(-(k * k) / (2 * sigma * sigma))
      w += g
      x += g * even[i + k].x
      y += g * even[i + k].y
    }
    return { x: x / w, y: y / w }
  })

  const lengths = [0]
  for (let i = 1; i < smooth.length; i++) lengths.push(lengths[i - 1] + Math.hypot(smooth[i].x - smooth[i - 1].x, smooth[i].y - smooth[i - 1].y))
  const toPath = (from, to) =>
    smooth.slice(from, to + 1).map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  const split = evenIndexOf(splitWaypoint)
  return {
    back: toPath(0, split),
    front: toPath(split, smooth.length - 1),
    splitLength: lengths[split],
    total: lengths.at(-1),
    lengthAtWaypoint: (waypoint) => lengths[evenIndexOf(waypoint)],
  }
}

const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2
const inverseEaseInOutSine = (p) => Math.acos(1 - 2 * p) / Math.PI

function Hero() {
  const heroRef = useRef(null)
  const photoRef = useRef(null)
  const cardRefs = useRef([])
  const backRef = useRef(null)
  const frontRef = useRef(null)
  const layoutRef = useRef(null)
  const cardTimesRef = useRef(null)
  const [layout, setLayout] = useState(null)

  // Measure cards and photo so the thread follows the same route at any screen size
  useLayoutEffect(() => {
    const measure = () => {
      const photoBox = boxOf(photoRef.current, false)
      if (!photoBox.height) return // photo not laid out yet
      const cardBoxes = cardRefs.current.map((el) => boxOf(el, true))
      const points = THREAD.map((p) => resolvePoint(p, cardBoxes, photoBox))
      const thread = buildThread(points, THREAD.findIndex((p) => p.split))

      // Card timings are fixed from the first measurement so resizing never replays them:
      // each card pops as the thread first reaches it
      if (!cardTimesRef.current) {
        // cards and the CTA (index CTA) each pop as the thread reaches them
        cardTimesRef.current = [...CARDS, CTA_POS].map((_, i) => {
          const first = THREAD.findIndex((p) => p.card === i && p.left === undefined)
          const progress = thread.lengthAtWaypoint(first) / thread.total
          return THREAD_START + THREAD_TIME * inverseEaseInOutSine(progress) - 80
        })
      }

      const hero = heroRef.current
      const next = { width: hero.offsetWidth, height: hero.offsetHeight, thread }
      layoutRef.current = next
      setLayout(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(heroRef.current)
    observer.observe(photoRef.current)
    return () => observer.disconnect()
  }, [])

  // Draw the thread with one eased motion across both layers (behind and in front of the photo)
  useEffect(() => {
    const start = performance.now()
    let frameId
    const frame = (now) => {
      const t = Math.min(1, Math.max(0, (now - start - THREAD_START) / THREAD_TIME))
      const back = backRef.current
      const front = frontRef.current
      const current = layoutRef.current
      if (back && front && current) {
        const { splitLength, total } = current.thread
        const frontLength = total - splitLength
        const drawn = total * easeInOutSine(t)
        back.style.strokeDashoffset = `${splitLength - Math.min(drawn, splitLength)}`
        front.style.strokeDashoffset = `${frontLength - Math.min(Math.max(drawn - splitLength, 0), frontLength)}`
      }
      if (t < 1) frameId = requestAnimationFrame(frame)
    }
    frameId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const cardTimes = cardTimesRef.current
  const threadSvg = (className, ref, d, length) => (
    <svg className={`thread ${className}`} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true">
      <path ref={ref} d={d} pathLength={length} strokeDasharray={length} strokeDashoffset={length} />
    </svg>
  )

  return (
    <section
      className="hero"
      ref={heroRef}
      style={{
        '--meet-start': `${MEET_START}ms`,
        '--avatar-start': `${AVATAR_START}ms`,
        '--avatar-time': `${AVATAR_TIME}ms`,
        '--meet-time': `${MEET_TIME}ms`,
        '--name-start': `${NAME_START}ms`,
        '--name-time': `${NAME_TIME}ms`,
      }}
    >
      {layout && threadSvg('thread-back', backRef, layout.thread.back, layout.thread.splitLength)}

      <h1 className="hero-name">
        <span className="hero-meet">
          <svg viewBox="-10 20 340 150" role="img" aria-label="meet">
            <path d={MEET_PATH} pathLength="1" />
          </svg>
        </span>{' '}
        {/* LINGAM sits behind the avatar on the left, CHARAN in front of it a little to the right */}
        <span className="hero-first">LINGAM</span>{' '}
        <span className="hero-last">CHARAN</span>
      </h1>

      <img ref={photoRef} src={photo} alt="Portrait" className="hero-photo" />

      {layout && threadSvg('thread-front', frontRef, layout.thread.front, layout.thread.total - layout.thread.splitLength)}

      {CARDS.map((card, i) => {
        const Tag = card.href ? 'a' : 'div'
        const link = card.href ? { href: card.href, target: '_blank', rel: 'noopener noreferrer' } : {}
        return (
        <Tag
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className={`card${card.href ? ' card-link' : ''}${cardTimes ? ' card-in' : ''}`}
          style={{ left: `${card.x}%`, top: `${card.y}%`, animationDelay: cardTimes ? `${cardTimes[i]}ms` : undefined }}
          {...link}
        >
          <img
            src={card.img}
            alt=""
            className={`card-img${card.contain ? ' card-img-contain' : ''}`}
          />
          <p className="card-text">{card.title}</p>
        </Tag>
        )
      })}

      <ConnectCta
        ref={(el) => (cardRefs.current[CTA] = el)}
        className={cardTimes ? 'card-in' : ''}
        style={{ left: `${CTA_POS.x}%`, top: `${CTA_POS.y}%`, animationDelay: cardTimes ? `${cardTimes[CTA]}ms` : undefined }}
      />
    </section>
  )
}

function ContactIcon({ name }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'whatsapp') {
    return (
      <svg {...common}>
        <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
        <path d="M9 8.6c.2 3.2 3 6 6.3 6.3l1.1-1.5-2.1-1-1 .9c-1.2-.5-2.2-1.6-2.7-2.8l.9-1-1-2.1L9 8.6z" />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16.5" />
      <circle cx="8" cy="7.5" r="0.6" fill="currentColor" />
      <path d="M12 16.5v-6M12 13c0-1.5 1.1-2.6 2.5-2.6S17 11.5 17 13v3.5" />
    </svg>
  )
}

// One button; hovering (mouse) or clicking/tapping it opens the three contact options
function ConnectCta({ ref, className, style }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const pointerRef = useRef('')

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={(el) => {
        wrapRef.current = el
        ref(el)
      }}
      className={`cta${open ? ' cta-open' : ''} ${className}`}
      style={style}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        className="cta-button"
        aria-haspopup="true"
        aria-expanded={open}
        onPointerDown={(e) => (pointerRef.current = e.pointerType)}
        onClick={() => {
          // a mouse already opened it on hover; touch and keyboard toggle it
          if (pointerRef.current === 'mouse') setOpen(true)
          else setOpen((o) => !o)
          pointerRef.current = ''
        }}
      >
        <span>Let's</span>
        <span>connect</span>
      </button>
      <div className="cta-menu">
        <ul>
          {CONTACTS.map((c) => (
            <li key={c.label}>
              <a href={c.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
                <ContactIcon name={c.icon} />
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function App() {
  const inkRef = useRef(null)
  const trailRef = useRef(null)
  const [heroOn, setHeroOn] = useState(false) // hero starts as the hello trail fades
  const [done, setDone] = useState(false) // hello fully gone

  useEffect(() => {
    // Preload the hero photo so it's ready to pop in when the intro ends
    new Image().src = photo

    const ink = inkRef.current
    const trail = trailRef.current
    const length = ink.getTotalLength()
    ink.style.strokeDasharray = `${length} ${length}`

    let frameId
    let start = null
    let heroStarted = false

    const animate = (now) => {
      if (start === null) start = now
      const elapsed = now - start

      if (elapsed < DRAW_TIME) {
        // Draw in
        const drawn = length * easeInOutCubic(elapsed / DRAW_TIME)
        ink.style.strokeDashoffset = `${length - drawn}`
      } else if (elapsed < DRAW_TIME + HOLD_TIME) {
        // Hold
        ink.style.strokeDashoffset = '0'
      } else if (elapsed < DRAW_TIME + HOLD_TIME + VANISH_TIME) {
        // Erase from the start, with a beige trail following the erased edge
        const progress = easeInOutCubic((elapsed - DRAW_TIME - HOLD_TIME) / VANISH_TIME)
        const erased = length * progress
        ink.style.strokeDashoffset = `${-erased}`

        const trailStart = Math.max(0, erased - TRAIL_LENGTH)
        trail.style.strokeDasharray = `0 ${trailStart} ${erased - trailStart} ${length}`
        trail.style.opacity = progress > 0.9 ? `${(1 - progress) / 0.1}` : '1'

        if (!heroStarted && progress >= HERO_AT) {
          heroStarted = true
          setHeroOn(true)
        }
      } else {
        setHeroOn(true)
        setDone(true)
        return
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <main>
      {heroOn && <Hero />}
      {!done && (
        <section className="stage">
          <svg
            className="hello"
            viewBox="0 135 1600 310"
            role="img"
            aria-label="hello"
          >
            <path ref={inkRef} d={HELLO_PATH} className="hello-ink" />
            <path ref={trailRef} d={HELLO_PATH} className="hello-trail" />
          </svg>
        </section>
      )}
    </main>
  )
}

export default App
