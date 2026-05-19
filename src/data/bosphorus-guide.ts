// Bosphorus landmark guide — data for the interactive /bosphorus-guide route.
// Ordered south (Marmara Sea) → north (Black Sea).
// lat / lng are real WGS84 coordinates for the interactive Leaflet map.
// Each landmark carries text (name + summary + "look for") in 12 languages,
// so the on-page audio guide (Web Speech API) can narrate in each one.

export type BosphorusSide = "Europe" | "Asia" | "Strait";

export type GuideLangCode =
  | "en" | "tr" | "de" | "fr" | "es" | "ru"
  | "it" | "nl" | "ar" | "ja" | "zh" | "pt";

export type GuideLanguage = {
  code: GuideLangCode;
  label: string;
  flag: string;
  /** BCP-47 tag passed to SpeechSynthesisUtterance.lang */
  bcp47: string;
  /** Right-to-left script */
  rtl?: boolean;
};

export const GUIDE_LANGUAGES: GuideLanguage[] = [
  { code: "en", label: "English", flag: "🇬🇧", bcp47: "en-US" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", bcp47: "tr-TR" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", bcp47: "de-DE" },
  { code: "fr", label: "Français", flag: "🇫🇷", bcp47: "fr-FR" },
  { code: "es", label: "Español", flag: "🇪🇸", bcp47: "es-ES" },
  { code: "ru", label: "Русский", flag: "🇷🇺", bcp47: "ru-RU" },
  { code: "it", label: "Italiano", flag: "🇮🇹", bcp47: "it-IT" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", bcp47: "nl-NL" },
  { code: "ar", label: "العربية", flag: "🇸🇦", bcp47: "ar-SA", rtl: true },
  { code: "ja", label: "日本語", flag: "🇯🇵", bcp47: "ja-JP" },
  { code: "zh", label: "中文", flag: "🇨🇳", bcp47: "zh-CN" },
  { code: "pt", label: "Português", flag: "🇵🇹", bcp47: "pt-PT" },
];

export type LandmarkText = {
  name: string;
  summary: string;
  lookFor: string;
};

export type Landmark = {
  id: string;
  side: BosphorusSide;
  category: string;
  era: string;
  lat: number;
  lng: number;
  // English is always present; other languages are filled in incrementally.
  text: { en: LandmarkText } & Partial<Record<GuideLangCode, LandmarkText>>;
};

export const BOSPHORUS_LANDMARKS: Landmark[] = [
  {
    id: "galata-tower",
    side: "Europe",
    category: "Medieval tower",
    era: "1348 · Genoese",
    lat: 41.0256,
    lng: 28.9741,
    text: {
      en: {
        name: "Galata Tower",
        summary:
          "Built by the Genoese in 1348 as the high point of their fortified colony, the Galata Tower has watched over the harbour entrance for almost seven centuries. It survived fires and earthquakes, later serving the Ottomans as a fire-watch station, and its conical cap is the first landmark most travellers recognise on the European skyline.",
        lookFor:
          "A round stone tower with a pointed roof rising above the rooftops just behind the Karaköy waterfront.",
      },
      tr: {
        name: "Galata Kulesi",
        summary:
          "Cenevizliler tarafından 1348'de surlu kolonilerinin en yüksek noktası olarak inşa edilen Galata Kulesi, neredeyse yedi yüzyıldır liman girişini izliyor. Yangınlardan ve depremlerden sağ çıktı, Osmanlı döneminde yangın gözetleme kulesi olarak kullanıldı. Konik külahı, Avrupa siluetinde gezginlerin tanıdığı ilk simgedir.",
        lookFor:
          "Karaköy kıyısının hemen arkasında, çatıların üzerinde yükselen sivri çatılı yuvarlak taş kule.",
      },
      de: {
        name: "Galataturm",
        summary:
          "Der 1348 von den Genuesen als höchster Punkt ihrer befestigten Kolonie errichtete Galataturm wacht seit fast sieben Jahrhunderten über die Hafeneinfahrt. Er überstand Brände und Erdbeben und diente den Osmanen später als Feuerwachturm. Seine kegelförmige Spitze ist das erste Wahrzeichen, das Reisende an der europäischen Skyline erkennen.",
        lookFor:
          "Ein runder Steinturm mit spitzem Dach, der direkt hinter der Uferpromenade von Karaköy über die Dächer ragt.",
      },
      fr: {
        name: "Tour de Galata",
        summary:
          "Édifiée par les Génois en 1348 comme point culminant de leur colonie fortifiée, la tour de Galata veille sur l'entrée du port depuis près de sept siècles. Elle a survécu aux incendies et aux séismes, servant ensuite de tour de guet aux Ottomans. Son toit conique est le premier repère que reconnaissent les voyageurs.",
        lookFor:
          "Une tour de pierre ronde au toit pointu qui s'élève au-dessus des toits, juste derrière le quai de Karaköy.",
      },
      es: {
        name: "Torre de Gálata",
        summary:
          "Construida por los genoveses en 1348 como punto más alto de su colonia fortificada, la Torre de Gálata vigila la entrada del puerto desde hace casi siete siglos. Sobrevivió a incendios y terremotos y sirvió a los otomanos como torre de vigilancia de incendios. Su remate cónico es el primer hito del horizonte europeo.",
        lookFor:
          "Una torre de piedra redonda con tejado puntiagudo que se alza sobre los tejados, justo detrás del muelle de Karaköy.",
      },
      ru: {
        name: "Галатская башня",
        summary:
          "Построенная генуэзцами в 1348 году как высшая точка их укреплённой колонии, Галатская башня уже почти семь веков следит за входом в гавань. Она пережила пожары и землетрясения, при османах служила пожарной вышкой. Её коническая вершина — первый ориентир, который путешественники узнают на европейском берегу.",
        lookFor:
          "Круглая каменная башня с остроконечной крышей, поднимающаяся над крышами сразу за набережной Каракёя.",
      },
      it: {
        name: "Torre di Galata",
        summary:
          "Costruita dai genovesi nel 1348 come punto più alto della loro colonia fortificata, la Torre di Galata sorveglia l'ingresso del porto da quasi sette secoli. Sopravvisse a incendi e terremoti e servì agli ottomani come torre di vedetta antincendio.",
        lookFor:
          "Una torre di pietra rotonda con tetto a punta che svetta sui tetti dietro la riva di Karaköy.",
      },
      nl: {
        name: "Galatatoren",
        summary:
          "In 1348 door de Genuezen gebouwd als hoogste punt van hun versterkte kolonie, bewaakt de Galatatoren al bijna zeven eeuwen de haveningang. Hij overleefde branden en aardbevingen en diende de Ottomanen later als brandwachttoren.",
        lookFor:
          "Een ronde stenen toren met een puntig dak die boven de daken uitsteekt, vlak achter de kade van Karaköy.",
      },
      ar: {
        name: "برج غلطة",
        summary:
          "بناه الجنويون عام 1348 كأعلى نقطة في مستعمرتهم المحصّنة، ويراقب برج غلطة مدخل الميناء منذ نحو سبعة قرون. نجا من الحرائق والزلازل، واستخدمه العثمانيون لاحقاً كبرج لمراقبة الحرائق.",
        lookFor:
          "برج حجري مستدير بسقف مدبّب يرتفع فوق الأسطح خلف واجهة كاراكوي البحرية مباشرة.",
      },
      ja: {
        name: "ガラタ塔",
        summary:
          "1348年にジェノヴァ人が要塞都市の最高地点として築いたガラタ塔は、約7世紀にわたり港の入口を見守ってきました。火災や地震を乗り越え、オスマン時代には火の見櫓として使われました。",
        lookFor:
          "カラキョイの海沿いのすぐ後ろ、屋根の上にそびえる、とがった屋根の円い石造りの塔。",
      },
      zh: {
        name: "加拉塔",
        summary:
          "加拉塔由热那亚人于1348年建造，是其要塞殖民地的制高点，近七个世纪以来一直守望着港口入口。它历经火灾与地震，后来被奥斯曼人用作火警瞭望塔。",
        lookFor:
          "卡拉柯伊海滨后方、屋顶之上耸立的一座圆形尖顶石塔。",
      },
      pt: {
        name: "Torre de Gálata",
        summary:
          "Construída pelos genoveses em 1348 como ponto mais alto da sua colónia fortificada, a Torre de Gálata vigia a entrada do porto há quase sete séculos. Sobreviveu a incêndios e sismos e serviu aos otomanos como torre de vigia de incêndios.",
        lookFor:
          "Uma torre de pedra redonda com telhado pontiagudo que se ergue acima dos telhados, logo atrás do cais de Karaköy.",
      },
    },
  },
  {
    id: "dolmabahce-palace",
    side: "Europe",
    category: "Imperial palace",
    era: "1856 · Ottoman",
    lat: 41.0391,
    lng: 29.0001,
    text: {
      en: {
        name: "Dolmabahçe Palace",
        summary:
          "Dolmabahçe replaced Topkapı as the main imperial residence in 1856, when the sultans wanted a European-style court on the water. Its 600-metre marble façade, ceremonial sea gate and the world's heaviest crystal chandelier signalled a new era. The last Ottoman sultans lived here, and Atatürk spent his final days in one of its rooms.",
        lookFor:
          "A long, brilliant-white marble palace running right along the European shoreline, with ornate sea-facing gates.",
      },
      tr: {
        name: "Dolmabahçe Sarayı",
        summary:
          "Dolmabahçe, padişahların su kenarında Avrupa tarzı bir saray istemesiyle 1856'da Topkapı'nın yerini aldı. 600 metrelik mermer cephesi, törensel deniz kapısı ve dünyanın en ağır kristal avizesi yeni bir dönemin habercisiydi. Son Osmanlı padişahları burada yaşadı; Atatürk son günlerini bu sarayın bir odasında geçirdi.",
        lookFor:
          "Avrupa kıyısı boyunca uzanan, denize bakan süslü kapıları olan upuzun, parlak beyaz mermer saray.",
      },
      de: {
        name: "Dolmabahçe-Palast",
        summary:
          "Dolmabahçe löste 1856 den Topkapı als imperiale Hauptresidenz ab, als die Sultane einen Hof im europäischen Stil am Wasser wünschten. Die 600 Meter lange Marmorfassade, das zeremonielle Seetor und der schwerste Kristallleuchter der Welt kündeten von einer neuen Ära. Hier lebten die letzten Sultane, und Atatürk verbrachte hier seine letzten Tage.",
        lookFor:
          "Ein langer, strahlend weißer Marmorpalast direkt am europäischen Ufer mit prunkvollen, zum Meer gewandten Toren.",
      },
      fr: {
        name: "Palais de Dolmabahçe",
        summary:
          "Dolmabahçe a remplacé Topkapı comme résidence impériale principale en 1856, lorsque les sultans voulurent une cour de style européen au bord de l'eau. Sa façade de marbre de 600 mètres, sa porte de mer cérémonielle et le plus lourd lustre en cristal du monde annonçaient une ère nouvelle. Atatürk y passa ses derniers jours.",
        lookFor:
          "Un long palais de marbre d'un blanc éclatant longeant la rive européenne, aux portes ouvragées tournées vers la mer.",
      },
      es: {
        name: "Palacio de Dolmabahçe",
        summary:
          "Dolmabahçe sustituyó a Topkapı como residencia imperial principal en 1856, cuando los sultanes quisieron una corte de estilo europeo junto al agua. Su fachada de mármol de 600 metros, su puerta ceremonial al mar y la araña de cristal más pesada del mundo anunciaban una nueva era. Atatürk pasó aquí sus últimos días.",
        lookFor:
          "Un largo palacio de mármol de un blanco brillante a lo largo de la orilla europea, con puertas labradas hacia el mar.",
      },
      ru: {
        name: "Дворец Долмабахче",
        summary:
          "Долмабахче сменил Топкапы как главную императорскую резиденцию в 1856 году, когда султаны захотели двор в европейском стиле у воды. Мраморный фасад длиной 600 метров, церемониальные морские ворота и самая тяжёлая в мире хрустальная люстра возвещали новую эпоху. Здесь провёл последние дни Ататюрк.",
        lookFor:
          "Длинный ослепительно-белый мраморный дворец вдоль европейского берега с резными воротами, обращёнными к морю.",
      },
      it: {
        name: "Palazzo di Dolmabahçe",
        summary:
          "Dolmabahçe sostituì Topkapı come residenza imperiale principale nel 1856, quando i sultani vollero una corte in stile europeo sull'acqua. La facciata di marmo di 600 metri e il più pesante lampadario di cristallo al mondo annunciavano una nuova era. Atatürk vi trascorse i suoi ultimi giorni.",
        lookFor:
          "Un lungo palazzo di marmo bianco brillante lungo la riva europea, con portali decorati rivolti al mare.",
      },
      nl: {
        name: "Dolmabahçe-paleis",
        summary:
          "Dolmabahçe verving Topkapı als belangrijkste keizerlijke residentie in 1856, toen de sultans een hof in Europese stijl aan het water wilden. De 600 meter lange marmeren gevel en 's werelds zwaarste kristallen luchter luidden een nieuw tijdperk in. Atatürk bracht hier zijn laatste dagen door.",
        lookFor:
          "Een lang, helderwit marmeren paleis langs de Europese oever, met sierlijke poorten naar zee.",
      },
      ar: {
        name: "قصر دولمة بهجة",
        summary:
          "حلّ قصر دولمة بهجة محل توبكابي كمقر إمبراطوري رئيسي عام 1856، حين أراد السلاطين بلاطاً على الطراز الأوروبي عند الماء. واجهته الرخامية الممتدة 600 متر وأثقل ثريا كريستالية في العالم بشّرت بعهد جديد. قضى أتاتورك أيامه الأخيرة هنا.",
        lookFor:
          "قصر رخامي طويل ناصع البياض يمتد على الساحل الأوروبي ببوابات مزخرفة تطل على البحر.",
      },
      ja: {
        name: "ドルマバフチェ宮殿",
        summary:
          "1856年、スルタンが水辺にヨーロッパ風の宮廷を求め、ドルマバフチェ宮殿がトプカプに代わり主たる宮殿となりました。600メートルの大理石ファサードと世界一重いシャンデリアが新時代を告げました。アタテュルクは晩年をここで過ごしました。",
        lookFor:
          "ヨーロッパ岸沿いに延びる、海に面した装飾的な門を持つ真っ白な大理石の長い宮殿。",
      },
      zh: {
        name: "多尔玛巴赫切宫",
        summary:
          "1856年，苏丹希望在水边建一座欧式宫廷，多尔玛巴赫切宫取代托普卡帕成为主要皇宫。其600米长的大理石立面和世界最重的水晶吊灯昭示着新时代。阿塔图尔克在此度过生命最后时光。",
        lookFor:
          "沿欧洲岸延伸的洁白大理石长宫，面海一侧设有华丽门廊。",
      },
      pt: {
        name: "Palácio de Dolmabahçe",
        summary:
          "Dolmabahçe substituiu Topkapı como residência imperial principal em 1856, quando os sultões quiseram uma corte de estilo europeu junto à água. A fachada de mármore de 600 metros e o mais pesado lustre de cristal do mundo anunciavam uma nova era. Atatürk passou aqui os seus últimos dias.",
        lookFor:
          "Um longo palácio de mármore branco brilhante ao longo da margem europeia, com portões ornamentados virados ao mar.",
      },
    },
  },
  {
    id: "maidens-tower",
    side: "Strait",
    category: "Islet tower",
    era: "12th century · Byzantine",
    lat: 41.0211,
    lng: 29.0041,
    text: {
      en: {
        name: "Maiden's Tower",
        summary:
          "The Maiden's Tower sits on a tiny islet about 200 metres off the Asian shore, where the Bosphorus meets the Marmara. A watchtower has stood here since Byzantine times, later serving as a lighthouse, quarantine station and customs point. Layers of legend — most famously a prophecy-defying princess — give it its name.",
        lookFor:
          "A small white tower rising straight out of the water on its own islet, mid-channel near Üsküdar.",
      },
      tr: {
        name: "Kız Kulesi",
        summary:
          "Kız Kulesi, Boğaz'ın Marmara ile buluştuğu yerde, Anadolu kıyısından yaklaşık 200 metre açıkta küçük bir adacığın üzerinde durur. Bizans döneminden beri burada bir gözetleme kulesi var; sonradan deniz feneri, karantina istasyonu ve gümrük noktası oldu. Adını, kaderini yenmeye çalışan bir prenses efsanesinden alır.",
        lookFor:
          "Üsküdar yakınında, kanalın ortasında kendi adacığının üzerinde sudan yükselen küçük beyaz kule.",
      },
      de: {
        name: "Mädchenturm (Kız Kulesi)",
        summary:
          "Der Mädchenturm steht auf einer winzigen Insel rund 200 Meter vor dem asiatischen Ufer, wo der Bosporus auf das Marmarameer trifft. Seit byzantinischer Zeit steht hier ein Wachturm, später Leuchtturm, Quarantänestation und Zollpunkt. Zahlreiche Legenden — vor allem die einer Prinzessin, die ihrem Schicksal trotzte — gaben ihm seinen Namen.",
        lookFor:
          "Ein kleiner weißer Turm, der nahe Üsküdar mitten im Kanal auf seiner eigenen Insel direkt aus dem Wasser ragt.",
      },
      fr: {
        name: "Tour de Léandre",
        summary:
          "La tour de Léandre se dresse sur un îlot minuscule à environ 200 mètres de la rive asiatique, là où le Bosphore rejoint la Marmara. Une tour de guet existe ici depuis l'époque byzantine, devenue ensuite phare, station de quarantaine et poste de douane. Les légendes — surtout celle d'une princesse — lui donnent son nom.",
        lookFor:
          "Une petite tour blanche surgissant de l'eau sur son propre îlot, au milieu du chenal près d'Üsküdar.",
      },
      es: {
        name: "Torre de la Doncella",
        summary:
          "La Torre de la Doncella se alza sobre un islote diminuto a unos 200 metros de la orilla asiática, donde el Bósforo se encuentra con el Mármara. Aquí hay una torre de vigilancia desde época bizantina; después fue faro, estación de cuarentena y aduana. Las leyendas de una princesa le dan su nombre.",
        lookFor:
          "Una pequeña torre blanca que surge del agua sobre su propio islote, en mitad del canal cerca de Üsküdar.",
      },
      ru: {
        name: "Девичья башня",
        summary:
          "Девичья башня стоит на крошечном островке примерно в 200 метрах от азиатского берега, там где Босфор встречается с Мраморным морем. Сторожевая башня здесь со времён Византии; позже она была маяком, карантином и таможней. Множество легенд — прежде всего о принцессе — дали ей имя.",
        lookFor:
          "Небольшая белая башня, поднимающаяся прямо из воды на своём островке посреди пролива у Ускюдара.",
      },
      it: {
        name: "Torre della Fanciulla",
        summary:
          "La Torre della Fanciulla sorge su un minuscolo isolotto a circa 200 metri dalla riva asiatica, dove il Bosforo incontra il Mar di Marmara. Una torre di guardia esiste qui dall'epoca bizantina; fu poi faro, stazione di quarantena e dogana. Le leggende di una principessa le danno il nome.",
        lookFor:
          "Una piccola torre bianca che emerge dall'acqua sul proprio isolotto, in mezzo al canale presso Üsküdar.",
      },
      nl: {
        name: "Meisjestoren",
        summary:
          "De Meisjestoren staat op een minuscuul eilandje zo'n 200 meter voor de Aziatische oever, waar de Bosporus de Marmarazee ontmoet. Sinds de Byzantijnse tijd staat hier een wachttoren, later vuurtoren, quarantainepost en douane. Legendes over een prinses gaven hem zijn naam.",
        lookFor:
          "Een kleine witte toren die op een eigen eilandje midden in het kanaal bij Üsküdar uit het water rijst.",
      },
      ar: {
        name: "برج الفتاة",
        summary:
          "يقوم برج الفتاة على جزيرة صغيرة على بُعد نحو 200 متر من الساحل الآسيوي، حيث يلتقي البوسفور ببحر مرمرة. وُجد هنا برج مراقبة منذ العهد البيزنطي، ثم صار منارة ومحجراً صحياً ونقطة جمارك. وأساطير عن أميرة منحته اسمه.",
        lookFor:
          "برج أبيض صغير يرتفع من الماء على جزيرته الخاصة، في وسط المضيق قرب أسكدار.",
      },
      ja: {
        name: "乙女の塔",
        summary:
          "乙女の塔は、ボスポラスがマルマラ海と出会う地点で、アジア岸から約200メートル沖の小島に立っています。ビザンツ時代から見張り塔があり、後に灯台、検疫所、税関として使われました。運命に抗う王女の伝説がその名の由来です。",
        lookFor:
          "ウスキュダル付近、海峡の中ほどの小島から水面に直接そびえる小さな白い塔。",
      },
      zh: {
        name: "少女塔",
        summary:
          "少女塔坐落于博斯普鲁斯与马尔马拉海交汇处、距亚洲岸约200米的小岛上。自拜占庭时代起此地便有瞭望塔，后来用作灯塔、检疫站和海关。关于一位公主的传说赋予了它名字。",
        lookFor:
          "于宇斯屈达尔附近、海峡中央的小岛上直接拔水而起的白色小塔。",
      },
      pt: {
        name: "Torre da Donzela",
        summary:
          "A Torre da Donzela ergue-se sobre um ilhéu minúsculo a cerca de 200 metros da margem asiática, onde o Bósforo encontra o Mármara. Existe aqui uma torre de vigia desde a época bizantina; foi depois farol, posto de quarentena e alfândega. Lendas de uma princesa dão-lhe o nome.",
        lookFor:
          "Uma pequena torre branca que emerge da água no seu próprio ilhéu, a meio do canal junto a Üsküdar.",
      },
    },
  },
  {
    id: "ortakoy-mosque",
    side: "Europe",
    category: "Baroque mosque",
    era: "1853 · Ottoman",
    lat: 41.0473,
    lng: 29.027,
    text: {
      en: {
        name: "Ortaköy Mosque",
        summary:
          "The Ortaköy Mosque, finished in 1853, is one of the most photographed buildings on the Bosphorus. Its neo-Baroque design places tall windows around the prayer hall so light pours in off the water. Framed against the first Bosphorus bridge, it has become the postcard image of the strait's European shore.",
        lookFor:
          "A small, ornate mosque with two slender minarets right at the water's edge, the bridge towering behind it.",
      },
      tr: {
        name: "Ortaköy Camii",
        summary:
          "1853'te tamamlanan Ortaköy Camii, Boğaz'ın en çok fotoğraflanan yapılarından biridir. Neo-Barok tasarımı, ibadet salonunun çevresine yüksek pencereler yerleştirir; böylece ışık sudan içeri dolar. Birinci Boğaz Köprüsü'nün önünde, boğazın Avrupa kıyısının kartpostal görüntüsü olmuştur.",
        lookFor:
          "Tam su kenarında, arkasında köprü yükselen, iki ince minareli küçük ve süslü cami.",
      },
      de: {
        name: "Ortaköy-Moschee",
        summary:
          "Die 1853 fertiggestellte Ortaköy-Moschee ist eines der meistfotografierten Bauwerke am Bosporus. Ihr neobarocker Entwurf setzt hohe Fenster rund um den Gebetssaal, sodass das Licht vom Wasser hereinflutet. Vor der ersten Bosporus-Brücke ist sie zum Postkartenmotiv des europäischen Ufers geworden.",
        lookFor:
          "Eine kleine, reich verzierte Moschee mit zwei schlanken Minaretten direkt am Wasser, dahinter die aufragende Brücke.",
      },
      fr: {
        name: "Mosquée d'Ortaköy",
        summary:
          "La mosquée d'Ortaköy, achevée en 1853, est l'un des bâtiments les plus photographiés du Bosphore. Son style néo-baroque dispose de hautes fenêtres autour de la salle de prière, laissant entrer la lumière venue de l'eau. Devant le premier pont, elle est devenue l'image de carte postale de la rive européenne.",
        lookFor:
          "Une petite mosquée ornée à deux minarets élancés, juste au bord de l'eau, le pont s'élevant derrière elle.",
      },
      es: {
        name: "Mezquita de Ortaköy",
        summary:
          "La Mezquita de Ortaköy, terminada en 1853, es uno de los edificios más fotografiados del Bósforo. Su diseño neobarroco coloca altas ventanas alrededor de la sala de oración, de modo que la luz entra desde el agua. Ante el primer puente del Bósforo, es la imagen de postal de la orilla europea.",
        lookFor:
          "Una pequeña mezquita ornamentada con dos esbeltos minaretes al borde del agua, con el puente alzándose detrás.",
      },
      ru: {
        name: "Мечеть Ортакёй",
        summary:
          "Мечеть Ортакёй, завершённая в 1853 году, — одно из самых фотографируемых зданий Босфора. Её необарочный облик с высокими окнами вокруг молитвенного зала впускает свет, отражённый от воды. На фоне первого моста через Босфор она стала открыточным образом европейского берега.",
        lookFor:
          "Небольшая нарядная мечеть с двумя стройными минаретами у самой воды, за ней возвышается мост.",
      },
      it: {
        name: "Moschea di Ortaköy",
        summary:
          "La Moschea di Ortaköy, completata nel 1853, è uno degli edifici più fotografati del Bosforo. Il suo stile neobarocco dispone alte finestre attorno alla sala di preghiera, così la luce entra riflessa dall'acqua. Davanti al primo ponte è diventata l'immagine da cartolina della riva europea.",
        lookFor:
          "Una piccola moschea ornata con due minareti slanciati proprio sull'acqua, con il ponte che svetta dietro.",
      },
      nl: {
        name: "Ortaköy-moskee",
        summary:
          "De Ortaköy-moskee, voltooid in 1853, is een van de meest gefotografeerde gebouwen aan de Bosporus. Het neobarokke ontwerp plaatst hoge ramen rond de gebedszaal, zodat het licht vanaf het water naar binnen valt. Voor de eerste brug is ze het ansichtkaartbeeld van de Europese oever.",
        lookFor:
          "Een kleine, sierlijke moskee met twee slanke minaretten vlak aan het water, met de brug erachter.",
      },
      ar: {
        name: "جامع أورتاكوي",
        summary:
          "جامع أورتاكوي، الذي اكتمل عام 1853، من أكثر المباني تصويراً على البوسفور. يضع تصميمه النيوباروكي نوافذ عالية حول قاعة الصلاة فيتدفق الضوء المنعكس عن الماء. أمام جسر البوسفور الأول صار صورة بطاقة بريدية للساحل الأوروبي.",
        lookFor:
          "جامع صغير مزخرف بمئذنتين نحيلتين عند حافة الماء تماماً، والجسر يعلو خلفه.",
      },
      ja: {
        name: "オルタキョイ・モスク",
        summary:
          "1853年に完成したオルタキョイ・モスクは、ボスポラスで最も撮影される建物のひとつです。ネオバロック様式で礼拝堂の周りに高い窓を配し、水面からの光が差し込みます。最初のボスポラス橋を背に、ヨーロッパ岸の絵葉書の風景となりました。",
        lookFor:
          "水際に立つ二本の細い尖塔を持つ小さく華麗なモスク。その後ろに橋がそびえます。",
      },
      zh: {
        name: "奥尔塔科伊清真寺",
        summary:
          "建成于1853年的奥尔塔科伊清真寺，是博斯普鲁斯最常被拍摄的建筑之一。其新巴洛克式设计在礼拜厅四周设高窗，让水面反射的光线倾泻而入。在第一座博斯普鲁斯大桥映衬下，它成为欧洲岸的明信片画面。",
        lookFor:
          "紧贴水边、有两座纤细宣礼塔的精巧小清真寺，身后高桥耸立。",
      },
      pt: {
        name: "Mesquita de Ortaköy",
        summary:
          "A Mesquita de Ortaköy, concluída em 1853, é um dos edifícios mais fotografados do Bósforo. O seu estilo neobarroco coloca janelas altas em redor da sala de oração, deixando entrar a luz vinda da água. Diante da primeira ponte, tornou-se a imagem de postal da margem europeia.",
        lookFor:
          "Uma pequena mesquita ornamentada com dois minaretes esguios à beira da água, com a ponte a erguer-se atrás.",
      },
    },
  },
  {
    id: "ciragan-palace",
    side: "Europe",
    category: "Imperial palace",
    era: "1871 · Ottoman",
    lat: 41.0436,
    lng: 29.0146,
    text: {
      en: {
        name: "Çırağan Palace",
        summary:
          "Çırağan was the last palace the Ottoman dynasty built, completed in 1871. A 1910 fire gutted the interior, and for decades only its marble shell survived. A careful restoration in the 1990s turned it into a waterfront hotel, so the façade once more glows along the European bank exactly as the sultans intended.",
        lookFor:
          "An elegant pale palace façade between Beşiktaş and Ortaköy, low and long against the shore.",
      },
      tr: {
        name: "Çırağan Sarayı",
        summary:
          "Çırağan, Osmanlı hanedanının inşa ettiği son saraydır; 1871'de tamamlandı. 1910'daki bir yangın iç mekânı tahrip etti ve onlarca yıl yalnızca mermer kabuğu ayakta kaldı. 1990'lardaki özenli bir restorasyon onu bir kıyı oteline dönüştürdü; cephe yeniden padişahların istediği gibi Avrupa yakasında parlıyor.",
        lookFor:
          "Beşiktaş ile Ortaköy arasında, kıyı boyunca alçak ve uzun uzanan zarif, açık renkli saray cephesi.",
      },
      de: {
        name: "Çırağan-Palast",
        summary:
          "Çırağan war der letzte Palast, den die osmanische Dynastie errichtete, fertiggestellt 1871. Ein Brand von 1910 zerstörte das Innere, und über Jahrzehnte blieb nur die Marmorhülle. Eine sorgfältige Restaurierung in den 1990ern machte ihn zum Uferhotel — die Fassade leuchtet wieder am europäischen Ufer wie einst gedacht.",
        lookFor:
          "Eine elegante, helle Palastfassade zwischen Beşiktaş und Ortaköy, niedrig und lang am Ufer.",
      },
      fr: {
        name: "Palais de Çırağan",
        summary:
          "Çırağan fut le dernier palais bâti par la dynastie ottomane, achevé en 1871. Un incendie en 1910 ravagea l'intérieur et, pendant des décennies, seule sa coque de marbre subsista. Une restauration soignée dans les années 1990 en a fait un hôtel de bord d'eau ; la façade rayonne de nouveau sur la rive européenne.",
        lookFor:
          "Une élégante façade de palais claire entre Beşiktaş et Ortaköy, basse et allongée le long de la rive.",
      },
      es: {
        name: "Palacio de Çırağan",
        summary:
          "Çırağan fue el último palacio que construyó la dinastía otomana, terminado en 1871. Un incendio en 1910 destruyó el interior y, durante décadas, solo sobrevivió su estructura de mármol. Una cuidadosa restauración en los años 1990 lo convirtió en hotel junto al agua; la fachada vuelve a brillar en la orilla europea.",
        lookFor:
          "Una elegante fachada palaciega de tono claro entre Beşiktaş y Ortaköy, baja y alargada junto a la orilla.",
      },
      ru: {
        name: "Дворец Чираган",
        summary:
          "Чираган — последний дворец, построенный османской династией, завершён в 1871 году. Пожар 1910 года уничтожил интерьеры, и десятилетиями сохранялась лишь мраморная оболочка. Тщательная реставрация 1990-х превратила его в отель на берегу — фасад вновь сияет на европейском берегу, как и задумывали султаны.",
        lookFor:
          "Изящный светлый дворцовый фасад между Бешикташем и Ортакёем, низкий и протяжённый вдоль берега.",
      },
      it: {
        name: "Palazzo di Çırağan",
        summary:
          "Çırağan fu l'ultimo palazzo costruito dalla dinastia ottomana, completato nel 1871. Un incendio nel 1910 ne distrusse gli interni e per decenni sopravvisse solo il guscio di marmo. Un attento restauro negli anni '90 lo trasformò in un hotel sull'acqua, e la facciata torna a brillare sulla riva europea.",
        lookFor:
          "Un'elegante facciata di palazzo dai toni chiari tra Beşiktaş e Ortaköy, bassa e allungata lungo la riva.",
      },
      nl: {
        name: "Çırağan-paleis",
        summary:
          "Çırağan was het laatste paleis dat de Ottomaanse dynastie bouwde, voltooid in 1871. Een brand in 1910 verwoestte het interieur en decennialang bleef alleen de marmeren schil over. Een zorgvuldige restauratie in de jaren 1990 maakte er een hotel aan het water van.",
        lookFor:
          "Een elegante, lichte paleisgevel tussen Beşiktaş en Ortaköy, laag en langgerekt langs de oever.",
      },
      ar: {
        name: "قصر تشيراغان",
        summary:
          "كان تشيراغان آخر قصر بنته السلالة العثمانية، واكتمل عام 1871. التهم حريق عام 1910 داخله، ولعقود لم يبقَ سوى هيكله الرخامي. حوّله ترميم دقيق في التسعينيات إلى فندق على الواجهة المائية، فعادت الواجهة تتلألأ على الضفة الأوروبية.",
        lookFor:
          "واجهة قصر أنيقة فاتحة اللون بين بشكطاش وأورتاكوي، منخفضة وممتدة بمحاذاة الساحل.",
      },
      ja: {
        name: "チュラーン宮殿",
        summary:
          "チュラーンはオスマン朝が建てた最後の宮殿で、1871年に完成しました。1910年の火災で内部が焼け、数十年は大理石の外殻だけが残りました。1990年代の丁寧な修復で水辺のホテルとなり、ファサードは再び欧州岸に輝いています。",
        lookFor:
          "ベシクタシュとオルタキョイの間、岸沿いに低く長く延びる優美で淡い色の宮殿のファサード。",
      },
      zh: {
        name: "奇拉昂宫",
        summary:
          "奇拉昂宫是奥斯曼王朝建造的最后一座宫殿，于1871年落成。1910年的大火烧毁了内部，数十年间只剩大理石外壳。1990年代的精心修复将其改造为水滨酒店，立面再度在欧洲岸闪耀。",
        lookFor:
          "贝希克塔什与奥尔塔科伊之间，沿岸低长延展的淡色优雅宫殿立面。",
      },
      pt: {
        name: "Palácio de Çırağan",
        summary:
          "Çırağan foi o último palácio construído pela dinastia otomana, concluído em 1871. Um incêndio em 1910 destruiu o interior e, durante décadas, só sobreviveu a casca de mármore. Um restauro cuidadoso nos anos 1990 transformou-o num hotel à beira-água.",
        lookFor:
          "Uma elegante fachada palaciana de tom claro entre Beşiktaş e Ortaköy, baixa e alongada junto à margem.",
      },
    },
  },
  {
    id: "beylerbeyi-palace",
    side: "Asia",
    category: "Summer palace",
    era: "1865 · Ottoman",
    lat: 41.0428,
    lng: 29.0419,
    text: {
      en: {
        name: "Beylerbeyi Palace",
        summary:
          "Beylerbeyi served as the sultans' summer residence and their guest house for visiting royalty — Empress Eugénie of France among them. Completed in 1865 on the Asian shore, it pairs restrained marble architecture with shaded gardens and seaside pavilions, a cooler retreat from the formal life of Dolmabahçe across the water.",
        lookFor:
          "A symmetrical white summer palace on the Asian side, tucked just north of the first bridge.",
      },
      tr: {
        name: "Beylerbeyi Sarayı",
        summary:
          "Beylerbeyi, padişahların yazlık konutu ve gelen hanedan misafirlerinin ağırlandığı yer olarak hizmet verdi — Fransa İmparatoriçesi Eugénie de bunlardan biriydi. 1865'te Anadolu kıyısında tamamlandı; sade mermer mimarisini gölgeli bahçeler ve deniz köşkleriyle birleştirir; karşıdaki Dolmabahçe'ye göre serin bir sığınaktı.",
        lookFor:
          "Anadolu yakasında, birinci köprünün hemen kuzeyine yerleşmiş simetrik beyaz yazlık saray.",
      },
      de: {
        name: "Beylerbeyi-Palast",
        summary:
          "Beylerbeyi diente den Sultanen als Sommerresidenz und Gästehaus für besuchende Königshäuser — darunter Kaiserin Eugénie von Frankreich. 1865 am asiatischen Ufer fertiggestellt, verbindet er zurückhaltende Marmorarchitektur mit schattigen Gärten und Pavillons am Wasser — ein kühlerer Rückzugsort gegenüber dem förmlichen Dolmabahçe.",
        lookFor:
          "Ein symmetrischer weißer Sommerpalast auf der asiatischen Seite, gleich nördlich der ersten Brücke.",
      },
      fr: {
        name: "Palais de Beylerbeyi",
        summary:
          "Beylerbeyi servit de résidence d'été aux sultans et de maison d'hôtes pour les souverains en visite — dont l'impératrice Eugénie de France. Achevé en 1865 sur la rive asiatique, il marie une architecture de marbre sobre à des jardins ombragés et des pavillons au bord de l'eau, refuge plus frais que Dolmabahçe.",
        lookFor:
          "Un palais d'été blanc et symétrique sur la rive asiatique, juste au nord du premier pont.",
      },
      es: {
        name: "Palacio de Beylerbeyi",
        summary:
          "Beylerbeyi fue la residencia de verano de los sultanes y su casa de huéspedes para la realeza visitante, entre ella la emperatriz Eugenia de Francia. Terminado en 1865 en la orilla asiática, combina una arquitectura de mármol sobria con jardines sombreados y pabellones junto al mar, un refugio más fresco que Dolmabahçe.",
        lookFor:
          "Un palacio de verano blanco y simétrico en el lado asiático, justo al norte del primer puente.",
      },
      ru: {
        name: "Дворец Бейлербейи",
        summary:
          "Бейлербейи служил летней резиденцией султанов и гостевым домом для приезжих монархов — среди них была французская императрица Евгения. Завершённый в 1865 году на азиатском берегу, он сочетает сдержанную мраморную архитектуру с тенистыми садами и павильонами у воды — более прохладное убежище, чем Долмабахче.",
        lookFor:
          "Симметричный белый летний дворец на азиатской стороне, чуть севернее первого моста.",
      },
      it: {
        name: "Palazzo di Beylerbeyi",
        summary:
          "Beylerbeyi fu la residenza estiva dei sultani e la foresteria per i reali in visita — tra cui l'imperatrice Eugenia di Francia. Completato nel 1865 sulla riva asiatica, unisce una sobria architettura di marmo a giardini ombrosi e padiglioni sul mare, rifugio più fresco del formale Dolmabahçe.",
        lookFor:
          "Un palazzo estivo bianco e simmetrico sul lato asiatico, appena a nord del primo ponte.",
      },
      nl: {
        name: "Beylerbeyi-paleis",
        summary:
          "Beylerbeyi diende als zomerresidentie van de sultans en als gastenverblijf voor bezoekende vorsten — onder wie keizerin Eugénie van Frankrijk. Voltooid in 1865 aan de Aziatische oever, combineert het sobere marmerarchitectuur met schaduwrijke tuinen en paviljoens aan zee.",
        lookFor:
          "Een symmetrisch wit zomerpaleis aan de Aziatische zijde, net ten noorden van de eerste brug.",
      },
      ar: {
        name: "قصر بيلربيي",
        summary:
          "كان قصر بيلربيي مقر الصيف للسلاطين ودار ضيافتهم للملوك الزائرين — ومنهم الإمبراطورة أوجيني ملكة فرنسا. اكتمل عام 1865 على الساحل الآسيوي، ويجمع بين عمارة رخامية متزنة وحدائق ظليلة وأجنحة بحرية، ملاذٌ أبرد من دولمة بهجة.",
        lookFor:
          "قصر صيفي أبيض متناظر على الجانب الآسيوي، إلى الشمال من الجسر الأول مباشرة.",
      },
      ja: {
        name: "ベイレルベイ宮殿",
        summary:
          "ベイレルベイはスルタンの夏の離宮であり、来訪する王族の迎賓館でもありました——フランス皇后ウジェニーもその一人です。1865年にアジア岸に完成し、簡素な大理石建築と木陰の庭、海辺の東屋を組み合わせた、対岸ドルマバフチェより涼やかな隠れ家でした。",
        lookFor:
          "アジア側、最初の橋のすぐ北に佇む左右対称の白い夏の宮殿。",
      },
      zh: {
        name: "贝伊莱尔贝伊宫",
        summary:
          "贝伊莱尔贝伊曾是苏丹的夏宫，也是接待来访王室的宾馆——法国皇后欧仁妮便是宾客之一。该宫1865年于亚洲岸建成，将简练的大理石建筑与绿荫花园、海滨亭阁相结合，是比对岸多尔玛巴赫切更清凉的去处。",
        lookFor:
          "亚洲岸、第一座大桥以北不远处一座对称的白色夏宫。",
      },
      pt: {
        name: "Palácio de Beylerbeyi",
        summary:
          "Beylerbeyi serviu de residência de verão dos sultões e de casa de hóspedes para a realeza em visita — incluindo a imperatriz Eugénie de França. Concluído em 1865 na margem asiática, alia uma arquitetura de mármore sóbria a jardins sombreados e pavilhões à beira-mar.",
        lookFor:
          "Um palácio de verão branco e simétrico no lado asiático, logo a norte da primeira ponte.",
      },
    },
  },
  {
    id: "kucuksu-pavilion",
    side: "Asia",
    category: "Hunting lodge",
    era: "1857 · Ottoman",
    lat: 41.0827,
    lng: 29.064,
    text: {
      en: {
        name: "Küçüksu Pavilion",
        summary:
          "Küçüksu is a jewel-box hunting lodge built in 1857, where sultans paused between the two streams the Ottomans nicknamed the Sweet Waters of Asia. Small but lavishly decorated, its curved Baroque façade and ornamental fountain were designed to be admired from the water as much as from the meadow behind it.",
        lookFor:
          "A small, highly decorated pavilion on the Asian shore between the two bridges, set just back from the quay.",
      },
      tr: {
        name: "Küçüksu Kasrı",
        summary:
          "Küçüksu, 1857'de inşa edilen bir mücevher kutusu gibi av köşküdür; padişahlar Osmanlıların Asya'nın Tatlı Suları dediği iki dere arasında burada mola verirdi. Küçük ama görkemli süslemeli yapının kavisli Barok cephesi ve süs çeşmesi, hem arkadaki çayırdan hem de sudan hayranlıkla izlenmek üzere tasarlandı.",
        lookFor:
          "İki köprü arasında, Anadolu kıyısında, rıhtımdan biraz geride duran küçük ve çok süslü kasır.",
      },
      de: {
        name: "Küçüksu-Pavillon",
        summary:
          "Küçüksu ist ein juwelengleiches Jagdschlösschen von 1857, wo die Sultane zwischen den beiden Bächen rasteten, die die Osmanen die Süßen Wasser Asiens nannten. Klein, aber prächtig verziert, wurden seine geschwungene Barockfassade und der Zierbrunnen entworfen, um vom Wasser wie von der Wiese bewundert zu werden.",
        lookFor:
          "Ein kleiner, reich verzierter Pavillon am asiatischen Ufer zwischen den beiden Brücken, etwas vom Kai zurückgesetzt.",
      },
      fr: {
        name: "Pavillon de Küçüksu",
        summary:
          "Küçüksu est un pavillon de chasse précieux bâti en 1857, où les sultans faisaient halte entre les deux ruisseaux que les Ottomans surnommaient les Eaux Douces d'Asie. Petit mais somptueusement décoré, sa façade baroque incurvée et sa fontaine ornementale furent conçues pour être admirées depuis l'eau.",
        lookFor:
          "Un petit pavillon très orné sur la rive asiatique, entre les deux ponts, légèrement en retrait du quai.",
      },
      es: {
        name: "Pabellón de Küçüksu",
        summary:
          "Küçüksu es un pabellón de caza de joyería construido en 1857, donde los sultanes descansaban entre los dos arroyos que los otomanos llamaban las Aguas Dulces de Asia. Pequeño pero lujosamente decorado, su fachada barroca curva y su fuente ornamental se diseñaron para admirarse desde el agua.",
        lookFor:
          "Un pequeño pabellón muy decorado en la orilla asiática, entre los dos puentes, algo retirado del muelle.",
      },
      ru: {
        name: "Павильон Кючюксу",
        summary:
          "Кючюксу — изящный охотничий павильон 1857 года, где султаны отдыхали между двумя ручьями, которые османы прозвали Сладкими водами Азии. Небольшой, но богато украшенный, его изогнутый барочный фасад и декоративный фонтан были задуманы, чтобы любоваться ими прямо с воды.",
        lookFor:
          "Небольшой богато украшенный павильон на азиатском берегу между двумя мостами, чуть в глубине от набережной.",
      },
      it: {
        name: "Padiglione di Küçüksu",
        summary:
          "Küçüksu è un prezioso padiglione di caccia del 1857, dove i sultani sostavano tra i due ruscelli che gli ottomani chiamavano le Dolci Acque d'Asia. Piccolo ma riccamente decorato, la sua facciata barocca curva e la fontana ornamentale furono pensate per essere ammirate dall'acqua.",
        lookFor:
          "Un piccolo padiglione molto decorato sulla riva asiatica, tra i due ponti, leggermente arretrato dalla banchina.",
      },
      nl: {
        name: "Küçüksu-paviljoen",
        summary:
          "Küçüksu is een juweelachtig jachtpaviljoen uit 1857, waar sultans rustten tussen de twee beken die de Ottomanen de Zoete Wateren van Azië noemden. Klein maar rijk versierd, met een gebogen barokgevel en sierfontein, ontworpen om vanaf het water bewonderd te worden.",
        lookFor:
          "Een klein, rijk versierd paviljoen aan de Aziatische oever tussen de twee bruggen, iets terug van de kade.",
      },
      ar: {
        name: "قصر كوتشوكسو",
        summary:
          "كوتشوكسو جناح صيد صغير كعلبة جواهر بُني عام 1857، حيث كان السلاطين يستريحون بين الجدولين اللذين سمّاهما العثمانيون مياه آسيا العذبة. صغير لكنه فاخر الزخرفة، صُممت واجهته الباروكية المنحنية ونافورته ليُتأمّلا من الماء.",
        lookFor:
          "جناح صغير شديد الزخرفة على الساحل الآسيوي بين الجسرين، متراجع قليلاً عن الرصيف.",
      },
      ja: {
        name: "キュチュクス離宮",
        summary:
          "キュチュクスは1857年に建てられた宝石箱のような狩猟離宮で、オスマン人が「アジアの甘き水」と呼んだ二つの小川の間でスルタンが憩いました。小さくも華麗で、湾曲したバロックのファサードと装飾噴水は水上から眺められるよう設計されました。",
        lookFor:
          "二つの橋の間、アジア岸の岸壁からやや奥まって立つ、小さく装飾豊かな離宮。",
      },
      zh: {
        name: "小水阁",
        summary:
          "小水阁是1857年建造的珠宝盒般的狩猎别墅，苏丹曾在奥斯曼人称为「亚洲甜水」的两条溪流之间在此小憩。它虽小却装饰华丽，弧形巴洛克立面与装饰喷泉皆为从水上观赏而设计。",
        lookFor:
          "两座大桥之间、亚洲岸稍离码头的一座装饰繁复的小阁。",
      },
      pt: {
        name: "Pavilhão de Küçüksu",
        summary:
          "Küçüksu é um precioso pavilhão de caça construído em 1857, onde os sultões paravam entre os dois ribeiros que os otomanos apelidavam de Águas Doces da Ásia. Pequeno mas ricamente decorado, a sua fachada barroca curva e a fonte ornamental foram pensadas para serem admiradas da água.",
        lookFor:
          "Um pequeno pavilhão muito decorado na margem asiática, entre as duas pontes, ligeiramente recuado do cais.",
      },
    },
  },
  {
    id: "rumeli-fortress",
    side: "Europe",
    category: "Ottoman fortress",
    era: "1452 · Ottoman",
    lat: 41.0843,
    lng: 29.0566,
    text: {
      en: {
        name: "Rumeli Fortress",
        summary:
          "Mehmed II raised Rumeli Fortress in just four months in 1452 to choke off the Bosphorus before his conquest of Constantinople. Its three great towers and connecting walls climb steeply up the European hillside at the strait's narrowest point, directly opposite an older Ottoman fortress on the Asian side.",
        lookFor:
          "Massive stone towers and ramparts climbing the European hill at the narrowest neck of the strait.",
      },
      tr: {
        name: "Rumeli Hisarı",
        summary:
          "Fatih Sultan Mehmed, İstanbul'un fethinden önce Boğaz'ı kapatmak için Rumeli Hisarı'nı 1452'de yalnızca dört ayda inşa ettirdi. Üç büyük kulesi ve bağlantı surları, boğazın en dar noktasında Avrupa yamacını dik biçimde tırmanır; tam karşısında Anadolu yakasındaki daha eski Osmanlı hisarı bulunur.",
        lookFor:
          "Boğazın en dar boğumunda Avrupa tepesini tırmanan devasa taş kuleler ve surlar.",
      },
      de: {
        name: "Festung Rumeli Hisarı",
        summary:
          "Mehmed II. ließ die Festung Rumeli Hisarı 1452 in nur vier Monaten errichten, um den Bosporus vor der Eroberung Konstantinopels abzuriegeln. Ihre drei großen Türme und Verbindungsmauern steigen an der engsten Stelle der Meerenge steil den europäischen Hang hinauf — direkt gegenüber einer älteren Festung am asiatischen Ufer.",
        lookFor:
          "Gewaltige Steintürme und Wälle, die an der engsten Stelle der Meerenge den europäischen Hang hinaufklettern.",
      },
      fr: {
        name: "Forteresse de Rumeli",
        summary:
          "Mehmed II fit élever la forteresse de Rumeli en seulement quatre mois en 1452 pour verrouiller le Bosphore avant la conquête de Constantinople. Ses trois grandes tours et ses courtines escaladent le versant européen au point le plus étroit du détroit, face à une forteresse ottomane plus ancienne sur la rive asiatique.",
        lookFor:
          "D'énormes tours de pierre et des remparts gravissant la colline européenne au passage le plus étroit du détroit.",
      },
      es: {
        name: "Fortaleza de Rumeli",
        summary:
          "Mehmed II levantó la fortaleza de Rumeli en solo cuatro meses en 1452 para cerrar el Bósforo antes de la conquista de Constantinopla. Sus tres grandes torres y murallas trepan la ladera europea en el punto más estrecho del estrecho, justo frente a una fortaleza otomana más antigua en la orilla asiática.",
        lookFor:
          "Enormes torres de piedra y murallas que trepan la colina europea en el punto más angosto del estrecho.",
      },
      ru: {
        name: "Крепость Румелихисары",
        summary:
          "Мехмед II возвёл крепость Румелихисары всего за четыре месяца в 1452 году, чтобы перекрыть Босфор перед завоеванием Константинополя. Три могучие башни и соединяющие их стены круто взбираются по европейскому склону в самом узком месте пролива — прямо напротив более старой османской крепости на азиатском берегу.",
        lookFor:
          "Громадные каменные башни и стены, взбирающиеся по европейскому склону в самом узком месте пролива.",
      },
      it: {
        name: "Fortezza di Rumeli",
        summary:
          "Mehmed II eresse la fortezza di Rumeli in soli quattro mesi nel 1452 per sbarrare il Bosforo prima della conquista di Costantinopoli. Le sue tre grandi torri e le mura di collegamento salgono ripide il pendio europeo nel punto più stretto dello stretto, di fronte a una fortezza più antica sulla riva asiatica.",
        lookFor:
          "Imponenti torri di pietra e bastioni che salgono la collina europea nel punto più stretto dello stretto.",
      },
      nl: {
        name: "Rumeli-fort",
        summary:
          "Mehmed II liet het Rumeli-fort in slechts vier maanden bouwen in 1452 om de Bosporus af te sluiten vóór de verovering van Constantinopel. De drie grote torens en verbindingsmuren beklimmen steil de Europese helling op het smalste punt, tegenover een ouder Ottomaans fort.",
        lookFor:
          "Massieve stenen torens en wallen die de Europese heuvel beklimmen op de smalste plek van de zeestraat.",
      },
      ar: {
        name: "قلعة روملي",
        summary:
          "بنى محمد الثاني قلعة روملي في أربعة أشهر فقط عام 1452 لإغلاق البوسفور قبل فتح القسطنطينية. تتسلق أبراجها الثلاثة الكبرى وأسوارها المنحدر الأوروبي عند أضيق نقطة في المضيق، مقابل قلعة عثمانية أقدم على الساحل الآسيوي.",
        lookFor:
          "أبراج وأسوار حجرية ضخمة تتسلق التل الأوروبي عند أضيق عنق في المضيق.",
      },
      ja: {
        name: "ルメリ城塞",
        summary:
          "メフメト2世は1452年、コンスタンティノープル征服に先立ってボスポラスを封鎖するため、わずか4か月でルメリ城塞を築きました。三つの大塔と連結壁は海峡最狭部の欧州側斜面を急峻に登り、対岸のより古い城塞と向かい合います。",
        lookFor:
          "海峡の最も狭い部分で、ヨーロッパ側の丘を登る巨大な石造の塔と城壁。",
      },
      zh: {
        name: "鲁梅利城堡",
        summary:
          "1452年，穆罕默德二世仅用四个月便筑起鲁梅利城堡，以在征服君士坦丁堡前封锁博斯普鲁斯。三座巨塔与连墙在海峡最窄处沿欧洲山坡陡然攀升，正对亚洲岸一座更古老的奥斯曼城堡。",
        lookFor:
          "在海峡最狭窄处、沿欧洲山坡攀升的巨大石塔与城墙。",
      },
      pt: {
        name: "Fortaleza de Rumeli",
        summary:
          "Mehmed II ergueu a fortaleza de Rumeli em apenas quatro meses em 1452 para fechar o Bósforo antes da conquista de Constantinopla. As suas três grandes torres e muralhas sobem a íngreme encosta europeia no ponto mais estreito do estreito, frente a uma fortaleza otomana mais antiga.",
        lookFor:
          "Enormes torres de pedra e muralhas que sobem a colina europeia no ponto mais estreito do estreito.",
      },
    },
  },
  {
    id: "anadolu-fortress",
    side: "Asia",
    category: "Ottoman fortress",
    era: "1394 · Ottoman",
    lat: 41.0851,
    lng: 29.0668,
    text: {
      en: {
        name: "Anadolu Fortress",
        summary:
          "Anadolu Fortress is the older and smaller of the strait's two Ottoman castles, built around 1394 by Bayezid I. Paired with Rumeli Fortress on the opposite bank, it let the Ottomans control every ship passing the narrowest channel — the strategy that sealed the fate of Byzantine Constantinople half a century later.",
        lookFor:
          "A compact stone keep on the Asian shore, directly across the narrows from the much larger Rumeli Fortress.",
      },
      tr: {
        name: "Anadolu Hisarı",
        summary:
          "Anadolu Hisarı, boğazın iki Osmanlı kalesinin daha eski ve küçük olanıdır; 1394 dolaylarında Yıldırım Bayezid tarafından inşa edildi. Karşı kıyıdaki Rumeli Hisarı ile birlikte, Osmanlıların en dar kanaldan geçen her gemiyi denetlemesini sağladı — yarım yüzyıl sonra Bizans'ın kaderini belirleyen strateji.",
        lookFor:
          "Anadolu kıyısında, çok daha büyük Rumeli Hisarı'nın tam karşısında, dar boğazda duran sağlam taş kale.",
      },
      de: {
        name: "Festung Anadolu Hisarı",
        summary:
          "Anadolu Hisarı ist die ältere und kleinere der beiden osmanischen Burgen der Meerenge, um 1394 von Bayezid I. errichtet. Zusammen mit Rumeli Hisarı am gegenüberliegenden Ufer konnten die Osmanen jedes Schiff im engsten Kanal kontrollieren — die Strategie, die ein halbes Jahrhundert später Konstantinopels Schicksal besiegelte.",
        lookFor:
          "Eine kompakte Steinburg am asiatischen Ufer, direkt gegenüber der weit größeren Festung Rumeli Hisarı.",
      },
      fr: {
        name: "Forteresse d'Anadolu",
        summary:
          "La forteresse d'Anadolu est la plus ancienne et la plus petite des deux châteaux ottomans du détroit, bâtie vers 1394 par Bayezid Ier. Associée à la forteresse de Rumeli en face, elle permit aux Ottomans de contrôler chaque navire du chenal le plus étroit — stratégie décisive un demi-siècle plus tard.",
        lookFor:
          "Un donjon de pierre compact sur la rive asiatique, juste en face de la forteresse de Rumeli bien plus grande.",
      },
      es: {
        name: "Fortaleza de Anadolu",
        summary:
          "La fortaleza de Anadolu es el más antiguo y pequeño de los dos castillos otomanos del estrecho, construido hacia 1394 por Bayezid I. Junto con la fortaleza de Rumeli en la orilla opuesta, permitió a los otomanos controlar cada barco del canal más estrecho — la estrategia que decidiría el destino de Constantinopla.",
        lookFor:
          "Un compacto torreón de piedra en la orilla asiática, justo frente a la mucho mayor fortaleza de Rumeli.",
      },
      ru: {
        name: "Крепость Анадолухисары",
        summary:
          "Анадолухисары — более старая и малая из двух османских крепостей пролива, построена около 1394 года Баязидом I. Вместе с крепостью Румелихисары на противоположном берегу она позволяла османам контролировать каждый корабль в самом узком месте — стратегия, решившая судьбу Константинополя полвека спустя.",
        lookFor:
          "Компактная каменная крепость на азиатском берегу, прямо напротив куда более крупной Румелихисары.",
      },
      it: {
        name: "Fortezza di Anadolu",
        summary:
          "La fortezza di Anadolu è il più antico e piccolo dei due castelli ottomani dello stretto, costruito intorno al 1394 da Bayezid I. Insieme alla fortezza di Rumeli sulla riva opposta, permise agli ottomani di controllare ogni nave del canale più stretto.",
        lookFor:
          "Un compatto mastio di pietra sulla riva asiatica, proprio di fronte alla ben più grande fortezza di Rumeli.",
      },
      nl: {
        name: "Anadolu-fort",
        summary:
          "Het Anadolu-fort is het oudste en kleinste van de twee Ottomaanse kastelen van de zeestraat, rond 1394 gebouwd door Bayezid I. Samen met het Rumeli-fort aan de overkant kon de Ottomaan elk schip in het smalste kanaal controleren.",
        lookFor:
          "Een compacte stenen burcht aan de Aziatische oever, recht tegenover het veel grotere Rumeli-fort.",
      },
      ar: {
        name: "قلعة الأناضول",
        summary:
          "قلعة الأناضول هي الأقدم والأصغر بين قلعتي المضيق العثمانيتين، بناها بايزيد الأول نحو عام 1394. ومع قلعة روملي على الضفة المقابلة، مكّنت العثمانيين من مراقبة كل سفينة تعبر أضيق قناة.",
        lookFor:
          "حصن حجري صغير متماسك على الساحل الآسيوي، مقابل قلعة روملي الأكبر بكثير تماماً.",
      },
      ja: {
        name: "アナドル城塞",
        summary:
          "アナドル城塞は海峡の二つのオスマン城塞のうち古く小さい方で、1394年頃にバヤズィト1世が築きました。対岸のルメリ城塞と対をなし、オスマン人は最狭水路を通る全ての船を支配できました。",
        lookFor:
          "アジア岸にある小ぶりで堅固な石造の城。対岸の遥かに大きいルメリ城塞の真向かい。",
      },
      zh: {
        name: "安纳托利亚城堡",
        summary:
          "安纳托利亚城堡是海峡两座奥斯曼城堡中较古老、较小的一座，约1394年由巴耶济德一世建造。它与对岸的鲁梅利城堡相配，使奥斯曼人得以掌控通过最窄水道的每一艘船。",
        lookFor:
          "亚洲岸一座结构紧凑的石堡，正对岸边那座大得多的鲁梅利城堡。",
      },
      pt: {
        name: "Fortaleza de Anadolu",
        summary:
          "A fortaleza de Anadolu é o mais antigo e pequeno dos dois castelos otomanos do estreito, construído por volta de 1394 por Bayezid I. Em conjunto com a fortaleza de Rumeli na margem oposta, permitiu aos otomanos controlar cada navio do canal mais estreito.",
        lookFor:
          "Um compacto torreão de pedra na margem asiática, mesmo em frente à muito maior fortaleza de Rumeli.",
      },
    },
  },
  {
    id: "bosphorus-bridge",
    side: "Strait",
    category: "Suspension bridge",
    era: "1973",
    lat: 41.0451,
    lng: 29.0344,
    text: {
      en: {
        name: "15 July Martyrs Bridge",
        summary:
          "Opened in 1973 as the first fixed link between Europe and Asia, this suspension bridge spans just over a kilometre between Ortaköy and Beylerbeyi. It carries the symbolic weight of joining two continents, and after dark its cables run through a slow colour-changing light show best seen from the deck of a boat.",
        lookFor:
          "The southern of the two great suspension bridges, springing from Ortaköy on the European side.",
      },
      tr: {
        name: "15 Temmuz Şehitler Köprüsü",
        summary:
          "1973'te Avrupa ile Asya arasındaki ilk sabit bağlantı olarak açılan bu asma köprü, Ortaköy ile Beylerbeyi arasında bir kilometreden biraz uzun bir açıklığa sahiptir. İki kıtayı birleştirmenin simgesel ağırlığını taşır; karanlık çökünce halatları, tekneden en iyi izlenen yavaş bir renk gösterisine bürünür.",
        lookFor:
          "İki büyük asma köprünün güneydekisi; Avrupa yakasında Ortaköy'den yükselir.",
      },
      de: {
        name: "Märtyrerbrücke des 15. Juli",
        summary:
          "1973 als erste feste Verbindung zwischen Europa und Asien eröffnet, überspannt diese Hängebrücke etwas mehr als einen Kilometer zwischen Ortaköy und Beylerbeyi. Sie trägt die symbolische Last, zwei Kontinente zu verbinden; nach Einbruch der Dunkelheit zeigen ihre Kabel ein langsames Farbspiel, am besten vom Boot aus zu sehen.",
        lookFor:
          "Die südlichere der beiden großen Hängebrücken, die auf der europäischen Seite von Ortaköy aufsteigt.",
      },
      fr: {
        name: "Pont des Martyrs du 15-Juillet",
        summary:
          "Inauguré en 1973 comme premier lien fixe entre l'Europe et l'Asie, ce pont suspendu franchit un peu plus d'un kilomètre entre Ortaköy et Beylerbeyi. Il porte le poids symbolique d'unir deux continents ; la nuit, ses câbles s'illuminent d'un lent jeu de couleurs, mieux vu depuis le pont d'un bateau.",
        lookFor:
          "Le plus au sud des deux grands ponts suspendus, s'élançant d'Ortaköy sur la rive européenne.",
      },
      es: {
        name: "Puente de los Mártires del 15 de Julio",
        summary:
          "Inaugurado en 1973 como el primer enlace fijo entre Europa y Asia, este puente colgante salva algo más de un kilómetro entre Ortaköy y Beylerbeyi. Lleva el peso simbólico de unir dos continentes; al anochecer, sus cables ofrecen un lento juego de luces de color, mejor visto desde la cubierta de un barco.",
        lookFor:
          "El más meridional de los dos grandes puentes colgantes, que arranca de Ortaköy en el lado europeo.",
      },
      ru: {
        name: "Мост мучеников 15 июля",
        summary:
          "Открытый в 1973 году как первая постоянная связь между Европой и Азией, этот висячий мост перекрывает чуть более километра между Ортакёем и Бейлербейи. Он несёт символический вес соединения двух континентов; с наступлением темноты его тросы переливаются медленной цветовой подсветкой, лучше всего видной с борта судна.",
        lookFor:
          "Южный из двух больших висячих мостов, начинающийся от Ортакёя на европейской стороне.",
      },
      it: {
        name: "Ponte dei Martiri del 15 Luglio",
        summary:
          "Inaugurato nel 1973 come primo collegamento fisso tra Europa e Asia, questo ponte sospeso supera poco più di un chilometro tra Ortaköy e Beylerbeyi. Porta il peso simbolico di unire due continenti; di notte i cavi offrono un lento gioco di luci colorate, meglio visto da una barca.",
        lookFor:
          "Il più meridionale dei due grandi ponti sospesi, che si slancia da Ortaköy sul lato europeo.",
      },
      nl: {
        name: "Brug van de Martelaren van 15 Juli",
        summary:
          "In 1973 geopend als eerste vaste verbinding tussen Europa en Azië, overspant deze hangbrug ruim een kilometer tussen Ortaköy en Beylerbeyi. Ze draagt het symbolische gewicht van het verbinden van twee continenten; na donker tonen de kabels een traag kleurenspel.",
        lookFor:
          "De zuidelijkste van de twee grote hangbruggen, opstijgend vanaf Ortaköy aan de Europese zijde.",
      },
      ar: {
        name: "جسر شهداء 15 يوليو",
        summary:
          "افتُتح هذا الجسر المعلّق عام 1973 كأول وصلة ثابتة بين أوروبا وآسيا، ويمتد لأكثر من كيلومتر قليلاً بين أورتاكوي وبيلربيي. يحمل الثقل الرمزي لوصل قارتين، وبعد حلول الظلام تتوهج كوابله بعرض ضوئي بطيء متغيّر الألوان.",
        lookFor:
          "الأجنوبي من الجسرين المعلّقين الكبيرين، ينطلق من أورتاكوي على الجانب الأوروبي.",
      },
      ja: {
        name: "7月15日殉教者の橋",
        summary:
          "1973年に欧州とアジアを結ぶ初の常設橋として開通したこの吊り橋は、オルタキョイとベイレルベイの間を1キロ余り渡します。二大陸を結ぶ象徴的な重みを担い、日没後はケーブルがゆっくり色を変える光の演出を見せます。",
        lookFor:
          "二つの大吊り橋のうち南側。ヨーロッパ側のオルタキョイから立ち上がります。",
      },
      zh: {
        name: "七一五烈士大桥",
        summary:
          "这座吊桥于1973年作为欧亚之间首座固定通道开通，在奥尔塔科伊与贝伊莱尔贝伊之间跨越一公里有余。它承载着连接两大洲的象征意义，入夜后缆索会呈现缓慢变色的灯光秀。",
        lookFor:
          "两座大吊桥中偏南的一座，自欧洲岸的奥尔塔科伊起跨。",
      },
      pt: {
        name: "Ponte dos Mártires de 15 de Julho",
        summary:
          "Inaugurada em 1973 como a primeira ligação fixa entre a Europa e a Ásia, esta ponte suspensa atravessa pouco mais de um quilómetro entre Ortaköy e Beylerbeyi. Carrega o peso simbólico de unir dois continentes; ao anoitecer, os cabos exibem um lento jogo de luzes coloridas.",
        lookFor:
          "A mais a sul das duas grandes pontes suspensas, partindo de Ortaköy no lado europeu.",
      },
    },
  },
  {
    id: "fatih-bridge",
    side: "Strait",
    category: "Suspension bridge",
    era: "1988",
    lat: 41.0911,
    lng: 29.0608,
    text: {
      en: {
        name: "Fatih Sultan Mehmet Bridge",
        summary:
          "The second Bosphorus crossing, opened in 1988, leaps the strait exactly between the two historic fortresses — a deliberate echo of the 1453 conquest it is named for. Sunset cruises usually turn back near this point, so the bridge marks the natural northern edge of the classic Bosphorus sightseeing route.",
        lookFor:
          "The northern suspension bridge, framed between Rumeli and Anadolu fortresses on either bank.",
      },
      tr: {
        name: "Fatih Sultan Mehmet Köprüsü",
        summary:
          "1988'de açılan ikinci Boğaz geçişi, boğazı tam olarak iki tarihi hisarın arasından aşar — adını aldığı 1453 fethine kasıtlı bir göndermedir. Gün batımı turları genellikle bu noktada geri döner; bu yüzden köprü, klasik Boğaz gezi rotasının doğal kuzey sınırını işaret eder.",
        lookFor:
          "Kuzeydeki asma köprü; her iki kıyıda Rumeli ve Anadolu hisarları arasında çerçevelenir.",
      },
      de: {
        name: "Fatih-Sultan-Mehmet-Brücke",
        summary:
          "Die 1988 eröffnete zweite Bosporus-Querung springt genau zwischen den beiden historischen Festungen über die Meerenge — ein bewusster Verweis auf die Eroberung von 1453, nach der sie benannt ist. Sonnenuntergangsfahrten kehren meist hier um, sodass die Brücke die natürliche Nordgrenze der klassischen Route markiert.",
        lookFor:
          "Die nördliche Hängebrücke, eingerahmt von den Festungen Rumeli und Anadolu an beiden Ufern.",
      },
      fr: {
        name: "Pont Fatih Sultan Mehmet",
        summary:
          "La deuxième traversée du Bosphore, ouverte en 1988, franchit le détroit exactement entre les deux forteresses historiques — un écho voulu de la conquête de 1453 dont il porte le nom. Les croisières au coucher du soleil font généralement demi-tour ici, le pont marquant la limite nord de la route classique.",
        lookFor:
          "Le pont suspendu nord, encadré par les forteresses de Rumeli et d'Anadolu sur chaque rive.",
      },
      es: {
        name: "Puente Fatih Sultan Mehmet",
        summary:
          "El segundo cruce del Bósforo, inaugurado en 1988, salva el estrecho justo entre las dos fortalezas históricas — un eco deliberado de la conquista de 1453 que le da nombre. Los cruceros del atardecer suelen dar la vuelta aquí, así que el puente marca el límite norte de la ruta clásica.",
        lookFor:
          "El puente colgante norte, enmarcado entre las fortalezas de Rumeli y Anadolu en cada orilla.",
      },
      ru: {
        name: "Мост Султана Мехмеда Фатиха",
        summary:
          "Второй переход через Босфор, открытый в 1988 году, перешагивает пролив ровно между двумя историческими крепостями — намеренная отсылка к завоеванию 1453 года, в честь которого он назван. Закатные круизы обычно поворачивают назад здесь, и мост отмечает северную границу классического маршрута.",
        lookFor:
          "Северный висячий мост, обрамлённый крепостями Румелихисары и Анадолухисары на обоих берегах.",
      },
      it: {
        name: "Ponte Fatih Sultan Mehmet",
        summary:
          "La seconda traversata del Bosforo, aperta nel 1988, scavalca lo stretto esattamente tra le due fortezze storiche — un richiamo voluto alla conquista del 1453 da cui prende il nome. Le crociere al tramonto di solito invertono la rotta qui, e il ponte segna il limite nord del percorso classico.",
        lookFor:
          "Il ponte sospeso nord, incorniciato tra le fortezze di Rumeli e Anadolu sulle due rive.",
      },
      nl: {
        name: "Fatih Sultan Mehmet-brug",
        summary:
          "De tweede Bosporusoversteek, geopend in 1988, springt over de zeestraat precies tussen de twee historische forten — een bewuste verwijzing naar de verovering van 1453 waarnaar ze is genoemd. Zonsondergangcruises keren hier meestal om, zodat de brug de noordgrens van de klassieke route markeert.",
        lookFor:
          "De noordelijke hangbrug, omlijst door de forten Rumeli en Anadolu aan beide oevers.",
      },
      ar: {
        name: "جسر السلطان محمد الفاتح",
        summary:
          "العبور الثاني للبوسفور، الذي افتُتح عام 1988، يثب فوق المضيق تماماً بين القلعتين التاريخيتين — صدى مقصود لفتح 1453 الذي سُمّي تيمّناً به. عادةً ما تعود رحلات الغروب أدراجها هنا، فيشكّل الجسر الحد الشمالي للمسار الكلاسيكي.",
        lookFor:
          "الجسر المعلّق الشمالي، مؤطّراً بين قلعتي روملي والأناضول على الضفتين.",
      },
      ja: {
        name: "ファーティフ・スルタン・メフメト橋",
        summary:
          "1988年に開通した二番目のボスポラス架橋は、二つの歴史的城塞のちょうど間で海峡を跨ぎます——名の由来である1453年の征服への意図的な呼応です。夕陽クルーズは通常この付近で折り返し、橋は古典的観光航路の北端を示します。",
        lookFor:
          "北側の吊り橋。両岸のルメリ城塞とアナドル城塞に挟まれて見えます。",
      },
      zh: {
        name: "征服者苏丹穆罕默德大桥",
        summary:
          "1988年通车的第二座博斯普鲁斯大桥，恰好在两座历史城堡之间跨越海峡——这是对其得名的1453年征服的有意呼应。日落游船通常在此折返，因此该桥标志着经典观光航线的北端。",
        lookFor:
          "北侧的吊桥，被两岸的鲁梅利城堡与安纳托利亚城堡所环抱。",
      },
      pt: {
        name: "Ponte Fatih Sultan Mehmet",
        summary:
          "A segunda travessia do Bósforo, aberta em 1988, salta o estreito exatamente entre as duas fortalezas históricas — um eco deliberado da conquista de 1453 que lhe dá o nome. Os cruzeiros ao pôr do sol costumam inverter a rota aqui, marcando a ponte o limite norte do percurso clássico.",
        lookFor:
          "A ponte suspensa norte, emoldurada entre as fortalezas de Rumeli e Anadolu em cada margem.",
      },
    },
  },
  {
    id: "suleymaniye",
    side: "Europe",
    category: "Imperial mosque",
    era: "1557 · Ottoman",
    lat: 41.0165,
    lng: 28.9639,
    text: {
      en: {
        name: "Süleymaniye Mosque",
        summary:
          "The Süleymaniye Mosque, the masterpiece of the architect Sinan, was completed in 1557 for Sultan Süleyman the Magnificent. Set on one of the old city's seven hills, its balanced domes and four minarets command the Golden Horn skyline.",
        lookFor:
          "A grey-domed mosque with four minarets crowning the highest ridge of the old city, above the Golden Horn.",
      },
      tr: {
        name: "Süleymaniye Camii",
        summary:
          "Mimar Sinan'ın başyapıtı Süleymaniye Camii, 1557'de Kanuni Sultan Süleyman için tamamlandı. Eski şehrin yedi tepesinden birine kurulan caminin dengeli kubbeleri ve dört minaresi Haliç siluetine hakimdir.",
        lookFor:
          "Eski şehrin en yüksek sırtını taçlandıran, gri kubbeli ve dört minareli cami; Haliç'in üzerinde.",
      },
      de: {
        name: "Süleymaniye-Moschee",
        summary:
          "Die Süleymaniye-Moschee, das Meisterwerk des Architekten Sinan, wurde 1557 für Sultan Süleyman den Prächtigen vollendet. Auf einem der sieben Hügel der Altstadt beherrschen ihre Kuppeln und vier Minarette das Goldene Horn.",
        lookFor:
          "Eine graue Kuppelmoschee mit vier Minaretten, die den höchsten Kamm der Altstadt über dem Goldenen Horn krönt.",
      },
      fr: {
        name: "Mosquée Süleymaniye",
        summary:
          "La mosquée Süleymaniye, chef-d'œuvre de l'architecte Sinan, fut achevée en 1557 pour Soliman le Magnifique. Sur l'une des sept collines de la vieille ville, ses coupoles et quatre minarets dominent la Corne d'Or.",
        lookFor:
          "Une mosquée à coupole grise et quatre minarets couronnant la plus haute crête de la vieille ville.",
      },
      es: {
        name: "Mezquita de Süleymaniye",
        summary:
          "La mezquita de Süleymaniye, obra maestra del arquitecto Sinan, se terminó en 1557 para Solimán el Magnífico. Sobre una de las siete colinas de la ciudad vieja, sus cúpulas y cuatro minaretes dominan el Cuerno de Oro.",
        lookFor:
          "Una mezquita de cúpula gris y cuatro minaretes que corona la cresta más alta de la ciudad vieja.",
      },
      ru: {
        name: "Мечеть Сулеймание",
        summary:
          "Мечеть Сулеймание, шедевр зодчего Синана, была завершена в 1557 году для султана Сулеймана Великолепного. Стоящая на одном из семи холмов старого города, она с куполами и четырьмя минаретами господствует над Золотым Рогом.",
        lookFor:
          "Мечеть с серым куполом и четырьмя минаретами, венчающая высший гребень старого города.",
      },
      it: {
        name: "Moschea di Solimano",
        summary:
          "La moschea di Solimano, capolavoro dell'architetto Sinan, fu completata nel 1557 per Solimano il Magnifico. Su uno dei sette colli della città vecchia, le sue cupole e quattro minareti dominano il Corno d'Oro.",
        lookFor:
          "Una moschea dalla cupola grigia e quattro minareti che corona la cresta più alta della città vecchia.",
      },
      nl: {
        name: "Süleymaniye-moskee",
        summary:
          "De Süleymaniye-moskee, het meesterwerk van architect Sinan, werd in 1557 voltooid voor sultan Süleyman de Grote. Op een van de zeven heuvels van de oude stad beheersen haar koepels en vier minaretten de Gouden Hoorn.",
        lookFor:
          "Een moskee met grijze koepel en vier minaretten die de hoogste kam van de oude stad bekroont.",
      },
      ar: {
        name: "جامع السليمانية",
        summary:
          "جامع السليمانية، تحفة المعماري سنان، اكتمل عام 1557 للسلطان سليمان القانوني. يقوم على إحدى تلال المدينة القديمة السبع، وتهيمن قبابه ومآذنه الأربع على القرن الذهبي.",
        lookFor:
          "جامع بقبة رمادية وأربع مآذن يتوّج أعلى تلال المدينة القديمة فوق القرن الذهبي.",
      },
      ja: {
        name: "スレイマニエ・モスク",
        summary:
          "建築家スィナンの傑作スレイマニエ・モスクは、1557年にスレイマン大帝のために完成しました。旧市街の七つの丘の一つに建ち、ドームと四本のミナレットが金角湾を見渡します。",
        lookFor:
          "金角湾を見下ろす旧市街の最も高い尾根に建つ、灰色のドームと四本のミナレットのモスク。",
      },
      zh: {
        name: "苏莱曼尼耶清真寺",
        summary:
          "苏莱曼尼耶清真寺是建筑大师锡南的杰作，1557年为苏莱曼大帝建成。它坐落于旧城七丘之一，匀称的穹顶与四座宣礼塔俯瞰金角湾。",
        lookFor:
          "一座灰色穹顶、四座宣礼塔的清真寺，矗立于旧城最高山脊，俯瞰金角湾。",
      },
      pt: {
        name: "Mesquita de Solimão",
        summary:
          "A Mesquita de Solimão (Süleymaniye), obra-prima do arquiteto Sinan, foi concluída em 1557 para Solimão, o Magnífico. Sobre uma das sete colinas da cidade velha, as suas cúpulas e quatro minaretes dominam o Corno de Ouro.",
        lookFor:
          "Uma mesquita de cúpula cinzenta e quatro minaretes a coroar a crista mais alta da cidade velha.",
      },
    },
  },
  {
    id: "topkapi",
    side: "Europe",
    category: "Imperial palace",
    era: "1478 · Ottoman",
    lat: 41.0115,
    lng: 28.9834,
    text: {
      en: {
        name: "Topkapı Palace",
        summary:
          "Topkapı Palace was the seat of the Ottoman sultans for nearly four centuries. Spread across the gardens of Sarayburnu, its low pavilions, courtyards and pointed-roof towers look out over the meeting of three waters.",
        lookFor:
          "Low Ottoman pavilions and pointed-roof towers among trees on the headland above Sarayburnu.",
      },
      tr: {
        name: "Topkapı Sarayı",
        summary:
          "Topkapı Sarayı, yaklaşık dört yüzyıl boyunca Osmanlı padişahlarının merkeziydi. Sarayburnu'nun bahçelerine yayılan alçak köşkleri, avluları ve sivri çatılı kuleleri üç denizin buluştuğu noktaya bakar.",
        lookFor:
          "Sarayburnu'nun üzerindeki burunda, ağaçlar arasında alçak Osmanlı köşkleri ve sivri çatılı kuleler.",
      },
      de: {
        name: "Topkapı-Palast",
        summary:
          "Der Topkapı-Palast war fast vier Jahrhunderte lang der Sitz der osmanischen Sultane. Über die Gärten von Sarayburnu verteilt, blicken seine niedrigen Pavillons, Höfe und Spitzdachtürme auf das Zusammentreffen dreier Gewässer.",
        lookFor:
          "Niedrige osmanische Pavillons und Spitzdachtürme zwischen Bäumen auf der Landzunge über Sarayburnu.",
      },
      fr: {
        name: "Palais de Topkapı",
        summary:
          "Le palais de Topkapı fut le siège des sultans ottomans pendant près de quatre siècles. Étalé sur les jardins de Sarayburnu, ses pavillons bas, ses cours et ses tours pointues dominent la rencontre de trois eaux.",
        lookFor:
          "Des pavillons ottomans bas et des tours à toit pointu parmi les arbres, sur le promontoire au-dessus de Sarayburnu.",
      },
      es: {
        name: "Palacio de Topkapı",
        summary:
          "El palacio de Topkapı fue la sede de los sultanes otomanos durante casi cuatro siglos. Repartido por los jardines de Sarayburnu, sus pabellones bajos, patios y torres puntiagudas miran al encuentro de tres aguas.",
        lookFor:
          "Pabellones otomanos bajos y torres de tejado puntiagudo entre árboles, en el promontorio sobre Sarayburnu.",
      },
      ru: {
        name: "Дворец Топкапы",
        summary:
          "Дворец Топкапы почти четыре века был резиденцией османских султанов. Раскинувшийся в садах Сарайбурну, его невысокие павильоны, дворы и башни с островерхими крышами смотрят на слияние трёх вод.",
        lookFor:
          "Невысокие османские павильоны и башни с островерхими крышами среди деревьев на мысу над Сарайбурну.",
      },
      it: {
        name: "Palazzo di Topkapı",
        summary:
          "Il palazzo di Topkapı fu la sede dei sultani ottomani per quasi quattro secoli. Disteso sui giardini di Sarayburnu, i suoi padiglioni bassi, cortili e torri appuntite si affacciano sull'incontro di tre acque.",
        lookFor:
          "Bassi padiglioni ottomani e torri dal tetto a punta tra gli alberi, sul promontorio sopra Sarayburnu.",
      },
      nl: {
        name: "Topkapı-paleis",
        summary:
          "Het Topkapı-paleis was bijna vier eeuwen de zetel van de Ottomaanse sultans. Verspreid over de tuinen van Sarayburnu kijken de lage paviljoens, binnenplaatsen en spitse torens uit op de samenkomst van drie wateren.",
        lookFor:
          "Lage Ottomaanse paviljoens en spitse torens tussen bomen op de landtong boven Sarayburnu.",
      },
      ar: {
        name: "قصر توبكابي",
        summary:
          "كان قصر توبكابي مقر السلاطين العثمانيين قرابة أربعة قرون. ينتشر على حدائق سراي بورنو، وتطل أجنحته المنخفضة وساحاته وأبراجه المدببة على ملتقى المياه الثلاث.",
        lookFor:
          "أجنحة عثمانية منخفضة وأبراج مدببة بين الأشجار على الرأس فوق سراي بورنو.",
      },
      ja: {
        name: "トプカプ宮殿",
        summary:
          "トプカプ宮殿は約四世紀にわたりオスマン帝国スルタンの居城でした。サライブルヌの庭園に広がり、低い東屋や中庭、とがった屋根の塔が三つの水域の交わりを見渡します。",
        lookFor:
          "サライブルヌの岬の木々の間に建つ、低いオスマンの東屋ととがった屋根の塔。",
      },
      zh: {
        name: "托普卡帕宫",
        summary:
          "托普卡帕宫近四个世纪是奥斯曼苏丹的居所。它铺展在萨拉布努的花园中，低矮的亭阁、庭院与尖顶塔楼俯瞰三处水域的交汇。",
        lookFor:
          "萨拉布努岬角树林间，低矮的奥斯曼亭阁与尖顶塔楼。",
      },
      pt: {
        name: "Palácio de Topkapı",
        summary:
          "O palácio de Topkapı foi a sede dos sultões otomanos durante quase quatro séculos. Espalhado pelos jardins de Sarayburnu, os seus pavilhões baixos, pátios e torres pontiagudas dão para o encontro de três águas.",
        lookFor:
          "Pavilhões otomanos baixos e torres de telhado pontiagudo entre árvores, no promontório sobre Sarayburnu.",
      },
    },
  },
  {
    id: "hagia-sophia",
    side: "Europe",
    category: "Byzantine monument",
    era: "537 · Byzantine",
    lat: 41.0086,
    lng: 28.9802,
    text: {
      en: {
        name: "Hagia Sophia",
        summary:
          "Hagia Sophia has stood for almost 1,500 years — first a Byzantine cathedral, then an Ottoman mosque, a museum, and a mosque once more. Its vast shallow dome was the largest in the world for a thousand years.",
        lookFor:
          "A massive ochre-red domed building flanked by minarets, dominating the Historic Peninsula skyline.",
      },
      tr: {
        name: "Ayasofya",
        summary:
          "Ayasofya neredeyse 1.500 yıldır ayakta — önce Bizans katedrali, sonra Osmanlı camisi, müze ve yeniden cami. Geniş ve basık kubbesi bin yıl boyunca dünyanın en büyüğüydü.",
        lookFor:
          "Minarelerle çevrili, kocaman kızıl-kerpiç renkli kubbeli yapı; tarihi yarımada siluetine hakim.",
      },
      de: {
        name: "Hagia Sophia",
        summary:
          "Die Hagia Sophia steht seit fast 1.500 Jahren — erst byzantinische Kathedrale, dann osmanische Moschee, Museum und wieder Moschee. Ihre weite flache Kuppel war tausend Jahre lang die größte der Welt.",
        lookFor:
          "Ein gewaltiger ockerroter Kuppelbau mit Minaretten, der die Skyline der historischen Halbinsel beherrscht.",
      },
      fr: {
        name: "Sainte-Sophie",
        summary:
          "Sainte-Sophie est debout depuis près de 1 500 ans — d'abord cathédrale byzantine, puis mosquée ottomane, musée, et de nouveau mosquée. Sa vaste coupole surbaissée fut la plus grande du monde pendant mille ans.",
        lookFor:
          "Un immense édifice à coupole ocre-rouge flanqué de minarets, dominant l'horizon de la péninsule historique.",
      },
      es: {
        name: "Santa Sofía",
        summary:
          "Santa Sofía lleva en pie casi 1.500 años — primero catedral bizantina, luego mezquita otomana, museo y de nuevo mezquita. Su amplia cúpula rebajada fue la mayor del mundo durante mil años.",
        lookFor:
          "Un enorme edificio de cúpula ocre-roja flanqueado por minaretes, que domina el horizonte de la península histórica.",
      },
      ru: {
        name: "Собор Святой Софии",
        summary:
          "Святая София стоит почти 1500 лет — сначала византийский собор, затем османская мечеть, музей и снова мечеть. Её широкий пологий купол тысячу лет оставался крупнейшим в мире.",
        lookFor:
          "Громадное здание с охристо-красным куполом и минаретами, господствующее над историческим полуостровом.",
      },
      it: {
        name: "Santa Sofia",
        summary:
          "Santa Sofia è in piedi da quasi 1.500 anni — prima cattedrale bizantina, poi moschea ottomana, museo e di nuovo moschea. La sua ampia cupola ribassata fu la più grande del mondo per mille anni.",
        lookFor:
          "Un enorme edificio dalla cupola ocra-rossa affiancato da minareti, che domina la penisola storica.",
      },
      nl: {
        name: "Hagia Sophia",
        summary:
          "De Hagia Sophia staat er al bijna 1.500 jaar — eerst Byzantijnse kathedraal, dan Ottomaanse moskee, museum en weer moskee. Haar brede vlakke koepel was duizend jaar lang de grootste ter wereld.",
        lookFor:
          "Een enorm okerrood koepelgebouw met minaretten, dat de skyline van het historische schiereiland beheerst.",
      },
      ar: {
        name: "آيا صوفيا",
        summary:
          "تقف آيا صوفيا منذ نحو 1500 عام — كاتدرائية بيزنطية أولاً، ثم جامعاً عثمانياً، فمتحفاً، ثم جامعاً من جديد. كانت قبتها الواسعة المنخفضة الأكبر في العالم لألف عام.",
        lookFor:
          "مبنى ضخم بقبة بلون أحمر مغرة تحفّه المآذن، يهيمن على أفق شبه الجزيرة التاريخية.",
      },
      ja: {
        name: "アヤソフィア",
        summary:
          "アヤソフィアは約1500年立ち続けています——初めはビザンツの聖堂、のちオスマンのモスク、博物館、そして再びモスクに。その広く浅いドームは千年間世界最大でした。",
        lookFor:
          "ミナレットを従えた巨大な黄土赤色のドーム建築。歴史半島のスカイラインを圧します。",
      },
      zh: {
        name: "圣索菲亚",
        summary:
          "圣索菲亚屹立近1500年——先是拜占庭主教座堂，后为奥斯曼清真寺、博物馆，又复为清真寺。其宽阔扁平的穹顶曾千年居世界之最。",
        lookFor:
          "一座赭红色巨大穹顶建筑，两侧立有宣礼塔，主宰历史半岛的天际线。",
      },
      pt: {
        name: "Hagia Sophia",
        summary:
          "A Hagia Sophia ergue-se há quase 1.500 anos — primeiro catedral bizantina, depois mesquita otomana, museu e de novo mesquita. A sua ampla cúpula rebaixada foi a maior do mundo durante mil anos.",
        lookFor:
          "Um enorme edifício de cúpula ocre-avermelhada ladeado por minaretes, dominando a península histórica.",
      },
    },
  },
  {
    id: "blue-mosque",
    side: "Europe",
    category: "Imperial mosque",
    era: "1616 · Ottoman",
    lat: 41.0054,
    lng: 28.9768,
    text: {
      en: {
        name: "Blue Mosque",
        summary:
          "The Sultan Ahmed Mosque, known worldwide as the Blue Mosque for the İznik tiles lining its interior, was completed in 1616. Its cascade of domes and six slender minarets crown the Historic Peninsula skyline.",
        lookFor:
          "A great mosque with six slender minarets and a pyramid of domes on the peninsula skyline.",
      },
      tr: {
        name: "Sultanahmet Camii",
        summary:
          "İç duvarlarını kaplayan İznik çinileri yüzünden dünyaca Mavi Cami olarak bilinen Sultanahmet Camii, 1616'da tamamlandı. Kademeli kubbeleri ve altı ince minaresi tarihi yarımada siluetini taçlandırır.",
        lookFor:
          "Tarihi yarımada siluetinde altı ince minareli ve piramit gibi yükselen kubbeli büyük cami.",
      },
      de: {
        name: "Blaue Moschee",
        summary:
          "Die Sultan-Ahmed-Moschee, weltweit als Blaue Moschee für die İznik-Fliesen ihres Inneren bekannt, wurde 1616 vollendet. Ihre gestaffelten Kuppeln und sechs schlanken Minarette krönen die Skyline der historischen Halbinsel.",
        lookFor:
          "Eine große Moschee mit sechs schlanken Minaretten und einer Pyramide aus Kuppeln an der Halbinsel-Skyline.",
      },
      fr: {
        name: "Mosquée Bleue",
        summary:
          "La mosquée du Sultan Ahmed, connue dans le monde entier comme la Mosquée Bleue pour les carreaux d'İznik de son intérieur, fut achevée en 1616. Ses coupoles étagées et six minarets élancés couronnent la péninsule historique.",
        lookFor:
          "Une grande mosquée à six minarets élancés et une pyramide de coupoles sur l'horizon de la péninsule.",
      },
      es: {
        name: "Mezquita Azul",
        summary:
          "La mezquita del Sultán Ahmed, conocida mundialmente como Mezquita Azul por los azulejos de İznik de su interior, se terminó en 1616. Sus cúpulas escalonadas y seis esbeltos minaretes coronan la península histórica.",
        lookFor:
          "Una gran mezquita con seis esbeltos minaretes y una pirámide de cúpulas en el horizonte de la península.",
      },
      ru: {
        name: "Голубая мечеть",
        summary:
          "Мечеть Султанахмет, во всём мире известная как Голубая мечеть из-за изникских изразцов внутри, была завершена в 1616 году. Каскад её куполов и шесть стройных минаретов венчают исторический полуостров.",
        lookFor:
          "Большая мечеть с шестью стройными минаретами и пирамидой куполов на горизонте полуострова.",
      },
      it: {
        name: "Moschea Blu",
        summary:
          "La moschea del Sultano Ahmed, nota in tutto il mondo come Moschea Blu per le piastrelle di İznik dell'interno, fu completata nel 1616. La sua cascata di cupole e sei minareti slanciati coronano la penisola storica.",
        lookFor:
          "Una grande moschea con sei minareti slanciati e una piramide di cupole sull'orizzonte della penisola.",
      },
      nl: {
        name: "Blauwe Moskee",
        summary:
          "De Sultan Ahmed-moskee, wereldwijd bekend als de Blauwe Moskee om de İznik-tegels binnenin, werd in 1616 voltooid. Haar getrapte koepels en zes slanke minaretten bekronen het historische schiereiland.",
        lookFor:
          "Een grote moskee met zes slanke minaretten en een piramide van koepels aan de skyline van het schiereiland.",
      },
      ar: {
        name: "الجامع الأزرق",
        summary:
          "جامع السلطان أحمد، المعروف عالمياً بالجامع الأزرق بفضل بلاط إزنيق المبطّن لداخله، اكتمل عام 1616. تتوّج قبابه المتدرجة ومآذنه الست النحيلة أفق شبه الجزيرة التاريخية.",
        lookFor:
          "جامع كبير بست مآذن نحيلة وهرم من القباب على أفق شبه الجزيرة.",
      },
      ja: {
        name: "ブルーモスク",
        summary:
          "内部を彩るイズニックタイルから世界でブルーモスクと呼ばれるスルタンアフメト・モスクは、1616年に完成しました。連なるドームと六本の細いミナレットが歴史半島の空を飾ります。",
        lookFor:
          "半島のスカイラインに、六本の細いミナレットとピラミッド状のドームを持つ大モスク。",
      },
      zh: {
        name: "蓝色清真寺",
        summary:
          "苏丹艾哈迈德清真寺因内部铺满伊兹尼克瓷砖而以蓝色清真寺闻名于世，1616年建成。层叠的穹顶与六座纤细宣礼塔为历史半岛天际线加冕。",
        lookFor:
          "半岛天际线上，一座有六座纤细宣礼塔与金字塔状穹顶的大清真寺。",
      },
      pt: {
        name: "Mesquita Azul",
        summary:
          "A Mesquita do Sultão Ahmed, conhecida mundialmente como Mesquita Azul pelos azulejos de İznik do seu interior, foi concluída em 1616. As cúpulas escalonadas e seis minaretes esguios coroam a península histórica.",
        lookFor:
          "Uma grande mesquita com seis minaretes esguios e uma pirâmide de cúpulas no horizonte da península.",
      },
    },
  },
  {
    id: "sarayburnu",
    side: "Europe",
    category: "Historic cape",
    era: "Seraglio Point",
    lat: 41.0134,
    lng: 28.9839,
    text: {
      en: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, or Seraglio Point, is the sharp green cape where the Golden Horn, the Bosphorus and the Sea of Marmara all meet. Topkapı Palace sits in the gardens above it, and the point marks the very start of the cruise route.",
        lookFor:
          "A green wooded headland at the tip of the old city, with palace walls and gardens rising behind it.",
      },
      tr: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, Haliç'in, Boğaz'ın ve Marmara Denizi'nin buluştuğu keskin yeşil burundur. Üzerindeki bahçelerde Topkapı Sarayı yer alır ve burun, tur rotasının tam başlangıcını işaretler.",
        lookFor:
          "Eski şehrin ucunda, arkasında saray surları ve bahçeler yükselen yeşil ağaçlık burun.",
      },
      de: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, die Seraglio-Spitze, ist die scharfe grüne Landzunge, wo Goldenes Horn, Bosporus und Marmarameer zusammentreffen. Darüber liegt der Topkapı-Palast, und die Spitze markiert den Beginn der Route.",
        lookFor:
          "Eine grüne bewaldete Landzunge an der Spitze der Altstadt, dahinter Palastmauern und Gärten.",
      },
      fr: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, la Pointe du Sérail, est le cap vert acéré où la Corne d'Or, le Bosphore et la mer de Marmara se rejoignent. Le palais de Topkapı le surplombe, et la pointe marque le début de la croisière.",
        lookFor:
          "Un promontoire vert et boisé à la pointe de la vieille ville, avec murs de palais et jardins derrière.",
      },
      es: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, la Punta del Serrallo, es el agudo cabo verde donde el Cuerno de Oro, el Bósforo y el mar de Mármara se encuentran. El palacio de Topkapı lo corona y la punta marca el inicio del crucero.",
        lookFor:
          "Un promontorio verde y arbolado en la punta de la ciudad vieja, con murallas de palacio y jardines detrás.",
      },
      ru: {
        name: "Сарайбурну",
        summary:
          "Сарайбурну, или мыс Сераль, — острый зелёный мыс, где сходятся Золотой Рог, Босфор и Мраморное море. Над ним в садах стоит дворец Топкапы, и мыс отмечает самое начало маршрута круиза.",
        lookFor:
          "Зелёный лесистый мыс на оконечности старого города, за ним поднимаются дворцовые стены и сады.",
      },
      it: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, la Punta del Serraglio, è l'aguzzo capo verde dove il Corno d'Oro, il Bosforo e il Mar di Marmara si incontrano. Il palazzo di Topkapı lo sovrasta e la punta segna l'inizio della crociera.",
        lookFor:
          "Un promontorio verde e boscoso sulla punta della città vecchia, con mura del palazzo e giardini dietro.",
      },
      nl: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, de Seraglio-punt, is de scherpe groene kaap waar de Gouden Hoorn, de Bosporus en de Zee van Marmara samenkomen. Het Topkapı-paleis ligt erboven en de punt markeert het begin van de route.",
        lookFor:
          "Een groene beboste landtong op de punt van de oude stad, met paleismuren en tuinen erachter.",
      },
      ar: {
        name: "سراي بورنو",
        summary:
          "سراي بورنو، أو رأس السراي، هو الرأس الأخضر الحاد حيث يلتقي القرن الذهبي والبوسفور وبحر مرمرة. يعلوه قصر توبكابي، ويمثّل الرأس بداية مسار الرحلة.",
        lookFor:
          "رأس أخضر مشجّر عند طرف المدينة القديمة، تعلوه أسوار القصر والحدائق.",
      },
      ja: {
        name: "サライブルヌ",
        summary:
          "サライブルヌ（宮廷の岬）は、金角湾とボスポラスとマルマラ海が出会う鋭い緑の岬です。その上の庭園にトプカプ宮殿が建ち、岬は航路の出発点を示します。",
        lookFor:
          "旧市街の先端の緑深い岬。背後に宮殿の城壁と庭園がそびえます。",
      },
      zh: {
        name: "萨拉布努",
        summary:
          "萨拉布努（宫角）是金角湾、博斯普鲁斯与马尔马拉海交汇的尖锐绿色海岬。托普卡帕宫坐落其上的花园，海岬标示着航线的起点。",
        lookFor:
          "旧城尖端一处绿树成荫的岬角，背后耸立宫墙与花园。",
      },
      pt: {
        name: "Sarayburnu",
        summary:
          "Sarayburnu, a Ponta do Serralho, é o agudo cabo verde onde o Corno de Ouro, o Bósforo e o Mar de Mármara se encontram. O palácio de Topkapı ergue-se acima e a ponta marca o início do cruzeiro.",
        lookFor:
          "Um promontório verde e arborizado na ponta da cidade velha, com muralhas de palácio e jardins atrás.",
      },
    },
  },
  {
    id: "galata-bridge",
    side: "Strait",
    category: "Bascule bridge",
    era: "1994",
    lat: 41.0202,
    lng: 28.9737,
    text: {
      en: {
        name: "Galata Bridge",
        summary:
          "The Galata Bridge spans the mouth of the Golden Horn, linking the old city to Karaköy. Anglers line its rails day and night while ferries pass beneath, and its lower deck of fish restaurants makes it a sociable crossing.",
        lookFor:
          "A low, wide bridge crowded with fishing rods across the mouth of the Golden Horn.",
      },
      tr: {
        name: "Galata Köprüsü",
        summary:
          "Galata Köprüsü, Haliç'in ağzını aşarak eski şehri Karaköy'e bağlar. Altından vapurlar geçerken korkuluklarında gece gündüz balıkçılar dizilir; alt katındaki balık lokantaları onu canlı bir geçit yapar.",
        lookFor:
          "Haliç'in ağzı boyunca uzanan, oltalarla dolu alçak ve geniş köprü.",
      },
      de: {
        name: "Galata-Brücke",
        summary:
          "Die Galata-Brücke überspannt die Mündung des Goldenen Horns und verbindet die Altstadt mit Karaköy. Tag und Nacht reihen sich Angler an ihrem Geländer, und ihr unteres Deck voller Fischrestaurants macht sie gesellig.",
        lookFor:
          "Eine niedrige, breite Brücke voller Angelruten über der Mündung des Goldenen Horns.",
      },
      fr: {
        name: "Pont de Galata",
        summary:
          "Le pont de Galata franchit l'embouchure de la Corne d'Or, reliant la vieille ville à Karaköy. Des pêcheurs bordent ses rambardes jour et nuit et son niveau inférieur de restaurants de poisson en fait une traversée animée.",
        lookFor:
          "Un pont bas et large hérissé de cannes à pêche, sur l'embouchure de la Corne d'Or.",
      },
      es: {
        name: "Puente de Gálata",
        summary:
          "El puente de Gálata cruza la desembocadura del Cuerno de Oro y une la ciudad vieja con Karaköy. Pescadores se alinean en sus barandillas día y noche y su nivel inferior de restaurantes de pescado lo hace animado.",
        lookFor:
          "Un puente bajo y ancho repleto de cañas de pescar sobre la desembocadura del Cuerno de Oro.",
      },
      ru: {
        name: "Галатский мост",
        summary:
          "Галатский мост перекрывает устье Золотого Рога, соединяя старый город с Каракёем. У его перил днём и ночью стоят рыбаки, а нижний ярус с рыбными ресторанами делает переход оживлённым.",
        lookFor:
          "Низкий широкий мост, усеянный удочками, над устьем Золотого Рога.",
      },
      it: {
        name: "Ponte di Galata",
        summary:
          "Il ponte di Galata scavalca la foce del Corno d'Oro, collegando la città vecchia a Karaköy. Pescatori ne affollano le ringhiere giorno e notte e il livello inferiore di ristoranti di pesce lo rende vivace.",
        lookFor:
          "Un ponte basso e largo gremito di canne da pesca sulla foce del Corno d'Oro.",
      },
      nl: {
        name: "Galatabrug",
        summary:
          "De Galatabrug overspant de monding van de Gouden Hoorn en verbindt de oude stad met Karaköy. Dag en nacht staan er hengelaars langs de reling, en het onderdek vol visrestaurants maakt het een levendige oversteek.",
        lookFor:
          "Een lage, brede brug vol hengels over de monding van de Gouden Hoorn.",
      },
      ar: {
        name: "جسر غلطة",
        summary:
          "يعبر جسر غلطة مصبّ القرن الذهبي، واصلاً المدينة القديمة بكاراكوي. يصطفّ الصيادون على حواجزه ليلاً ونهاراً، ويجعله طابقه السفلي من مطاعم السمك معبراً نابضاً.",
        lookFor:
          "جسر منخفض عريض مكتظ بصنّارات الصيد فوق مصبّ القرن الذهبي.",
      },
      ja: {
        name: "ガラタ橋",
        summary:
          "ガラタ橋は金角湾の河口をまたぎ、旧市街とカラキョイを結びます。手すりには昼夜釣り人が並び、下層の魚料理店が橋を賑やかな渡り場にしています。",
        lookFor:
          "金角湾の河口にかかる、釣り竿でひしめく低く幅広い橋。",
      },
      zh: {
        name: "加拉塔大桥",
        summary:
          "加拉塔大桥横跨金角湾入海口，连接旧城与卡拉柯伊。栏杆边昼夜垂钓者成排，下层的鱼餐馆使它成为热闹的通道。",
        lookFor:
          "横跨金角湾口、布满钓竿的一座低矮宽阔大桥。",
      },
      pt: {
        name: "Ponte de Gálata",
        summary:
          "A Ponte de Gálata atravessa a foz do Corno de Ouro, ligando a cidade velha a Karaköy. Pescadores alinham-se nas grades dia e noite e o piso inferior de restaurantes de peixe torna-a uma travessia animada.",
        lookFor:
          "Uma ponte baixa e larga cheia de canas de pesca sobre a foz do Corno de Ouro.",
      },
    },
  },
  {
    id: "halic-bridge",
    side: "Strait",
    category: "Metro bridge",
    era: "2014",
    lat: 41.027,
    lng: 28.962,
    text: {
      en: {
        name: "Golden Horn Metro Bridge",
        summary:
          "The Golden Horn Metro Bridge carries the M2 line across the Golden Horn on slender cable-stayed pylons. Opened in 2014, its sail-like design was kept deliberately light so it would not crowd the historic skyline behind it.",
        lookFor:
          "A modern cable-stayed bridge with tall white pylons crossing the Golden Horn.",
      },
      tr: {
        name: "Haliç Metro Köprüsü",
        summary:
          "Haliç Metro Köprüsü, M2 hattını ince eğik askılı kuleler üzerinde Haliç'in karşısına taşır. 2014'te açılan yelken benzeri tasarımı, arkasındaki tarihi silueti gölgelememek için bilinçli olarak hafif tutuldu.",
        lookFor:
          "Haliç'i aşan, uzun beyaz kuleli modern eğik askılı köprü.",
      },
      de: {
        name: "Goldenes-Horn-Metrobrücke",
        summary:
          "Die Goldenes-Horn-Metrobrücke führt die M2-Linie auf schlanken Schrägseilpylonen über das Goldene Horn. 2014 eröffnet, wurde ihr segelartiges Design bewusst leicht gehalten, um die historische Skyline nicht zu überladen.",
        lookFor:
          "Eine moderne Schrägseilbrücke mit hohen weißen Pylonen über dem Goldenen Horn.",
      },
      fr: {
        name: "Pont de métro de la Corne d'Or",
        summary:
          "Le pont de métro de la Corne d'Or porte la ligne M2 au-dessus de la Corne d'Or sur de fins pylônes haubanés. Ouvert en 2014, son dessin en voile fut volontairement allégé pour ne pas surcharger l'horizon historique.",
        lookFor:
          "Un pont haubané moderne aux hauts pylônes blancs franchissant la Corne d'Or.",
      },
      es: {
        name: "Puente del metro del Cuerno de Oro",
        summary:
          "El puente del metro del Cuerno de Oro lleva la línea M2 sobre el Cuerno de Oro en finos pilonos atirantados. Inaugurado en 2014, su diseño de vela se mantuvo ligero para no recargar el horizonte histórico.",
        lookFor:
          "Un moderno puente atirantado con altos pilonos blancos que cruza el Cuerno de Oro.",
      },
      ru: {
        name: "Метромост Золотой Рог",
        summary:
          "Метромост Золотой Рог несёт линию M2 над Золотым Рогом на тонких вантовых пилонах. Открытый в 2014 году, его парусный силуэт намеренно сделали лёгким, чтобы не загромождать исторический горизонт.",
        lookFor:
          "Современный вантовый мост с высокими белыми пилонами через Золотой Рог.",
      },
      it: {
        name: "Ponte metropolitana del Corno d'Oro",
        summary:
          "Il ponte della metropolitana del Corno d'Oro porta la linea M2 oltre il Corno d'Oro su sottili piloni strallati. Aperto nel 2014, il suo profilo a vela fu tenuto leggero per non gravare sull'orizzonte storico.",
        lookFor:
          "Un moderno ponte strallato con alti piloni bianchi che attraversa il Corno d'Oro.",
      },
      nl: {
        name: "Gouden Hoorn-metrobrug",
        summary:
          "De Gouden Hoorn-metrobrug draagt de M2-lijn over de Gouden Hoorn op slanke tuipylonen. Geopend in 2014, werd het zeilachtige ontwerp bewust licht gehouden om de historische skyline niet te overladen.",
        lookFor:
          "Een moderne tuibrug met hoge witte pylonen over de Gouden Hoorn.",
      },
      ar: {
        name: "جسر مترو القرن الذهبي",
        summary:
          "يحمل جسر مترو القرن الذهبي خط M2 فوق القرن الذهبي على دعامات نحيلة مشدودة بالكوابل. افتُتح عام 2014، وأبقي تصميمه الشراعي خفيفاً كي لا يزحم الأفق التاريخي خلفه.",
        lookFor:
          "جسر حديث مشدود بالكوابل بدعامات بيضاء عالية يعبر القرن الذهبي.",
      },
      ja: {
        name: "金角湾メトロ橋",
        summary:
          "金角湾メトロ橋は、細い斜張ケーブルの主塔でM2線を金角湾の対岸へ渡します。2014年開通、帆を思わせる意匠は背後の歴史的景観を圧迫しないよう軽やかに保たれました。",
        lookFor:
          "白く高い主塔を持つ、金角湾を渡る現代的な斜張橋。",
      },
      zh: {
        name: "金角湾地铁桥",
        summary:
          "金角湾地铁桥以纤细的斜拉索桥塔承载M2线跨越金角湾。2014年通车，其风帆般的造型刻意保持轻盈，以免压过背后的历史天际线。",
        lookFor:
          "一座白色高塔的现代斜拉桥，横跨金角湾。",
      },
      pt: {
        name: "Ponte de metro do Corno de Ouro",
        summary:
          "A Ponte de metro do Corno de Ouro leva a linha M2 sobre o Corno de Ouro em esguios pilones atirantados. Inaugurada em 2014, o seu desenho de vela foi mantido leve para não sobrecarregar o horizonte histórico.",
        lookFor:
          "Uma moderna ponte atirantada com altos pilones brancos a cruzar o Corno de Ouro.",
      },
    },
  },
  {
    id: "galataport",
    side: "Europe",
    category: "Cruise port",
    era: "2021",
    lat: 41.0247,
    lng: 28.981,
    text: {
      en: {
        name: "Galataport",
        summary:
          "Galataport is Istanbul's modern cruise terminal — a kilometre of restored Karaköy waterfront opened in 2021. Built as the world's first underground cruise terminal, it keeps the quay open as a public promenade of galleries and shops.",
        lookFor:
          "A long contemporary stone-and-glass promenade along the Karaköy shore.",
      },
      tr: {
        name: "Galataport",
        summary:
          "Galataport, İstanbul'un modern kruvaziyer terminali — 2021'de açılan, restore edilmiş bir kilometrelik Karaköy kıyısı. Dünyanın ilk yer altı kruvaziyer terminali olarak kurulmuş; rıhtımı galeri ve dükkânlarla dolu halka açık bir gezinti alanı tutar.",
        lookFor:
          "Karaköy kıyısı boyunca uzanan, uzun ve çağdaş taş-cam gezinti alanı.",
      },
      de: {
        name: "Galataport",
        summary:
          "Galataport ist Istanbuls modernes Kreuzfahrtterminal — ein Kilometer restauriertes Karaköy-Ufer, 2021 eröffnet. Als weltweit erstes unterirdisches Kreuzfahrtterminal gebaut, bleibt der Kai eine öffentliche Promenade mit Galerien und Läden.",
        lookFor:
          "Eine lange, moderne Stein-und-Glas-Promenade entlang des Ufers von Karaköy.",
      },
      fr: {
        name: "Galataport",
        summary:
          "Galataport est le terminal de croisière moderne d'Istanbul — un kilomètre de quais de Karaköy restaurés, ouvert en 2021. Premier terminal de croisière souterrain au monde, il garde le quai en promenade publique de galeries et boutiques.",
        lookFor:
          "Une longue promenade contemporaine de pierre et de verre le long du rivage de Karaköy.",
      },
      es: {
        name: "Galataport",
        summary:
          "Galataport es la moderna terminal de cruceros de Estambul — un kilómetro de costa de Karaköy restaurada, inaugurada en 2021. Como primera terminal de cruceros subterránea del mundo, mantiene el muelle como paseo público de galerías y tiendas.",
        lookFor:
          "Un largo paseo contemporáneo de piedra y cristal a lo largo de la orilla de Karaköy.",
      },
      ru: {
        name: "Галатапорт",
        summary:
          "Галатапорт — современный круизный терминал Стамбула, километр восстановленной набережной Каракёя, открытый в 2021 году. Построенный как первый в мире подземный круизный терминал, он оставляет причал открытым променадом с галереями и магазинами.",
        lookFor:
          "Длинный современный променад из камня и стекла вдоль берега Каракёя.",
      },
      it: {
        name: "Galataport",
        summary:
          "Galataport è il moderno terminal crociere di Istanbul — un chilometro di lungomare di Karaköy restaurato, aperto nel 2021. Primo terminal crociere sotterraneo al mondo, mantiene la banchina come passeggiata pubblica di gallerie e negozi.",
        lookFor:
          "Una lunga passeggiata contemporanea di pietra e vetro lungo la riva di Karaköy.",
      },
      nl: {
        name: "Galataport",
        summary:
          "Galataport is Istanboels moderne cruiseterminal — een kilometer gerestaureerde Karaköy-kade, geopend in 2021. Gebouwd als 's werelds eerste ondergrondse cruiseterminal, blijft de kade een openbare promenade met galerieën en winkels.",
        lookFor:
          "Een lange eigentijdse promenade van steen en glas langs de oever van Karaköy.",
      },
      ar: {
        name: "غالاتابورت",
        summary:
          "غالاتابورت محطة الرحلات البحرية الحديثة في إسطنبول — كيلومتر من واجهة كاراكوي البحرية المرمَّمة، افتُتح عام 2021. بُني كأول محطة رحلات بحرية تحت الأرض في العالم، فيبقى الرصيف ممشى عاماً للمعارض والمتاجر.",
        lookFor:
          "ممشى حديث طويل من الحجر والزجاج على امتداد ساحل كاراكوي.",
      },
      ja: {
        name: "ガラタポート",
        summary:
          "ガラタポートはイスタンブールの近代的なクルーズターミナル——2021年開業、修復されたカラキョイの1キロの水辺です。世界初の地下クルーズターミナルとして造られ、岸壁は画廊や店の並ぶ公共の遊歩道のままです。",
        lookFor:
          "カラキョイの岸に沿う、石とガラスの長い現代的な遊歩道。",
      },
      zh: {
        name: "加拉塔港",
        summary:
          "加拉塔港是伊斯坦布尔现代化的邮轮码头——一公里修复后的卡拉柯伊海滨，2021年开放。它是世界首座地下邮轮码头，使码头保持为画廊与商铺林立的公共步道。",
        lookFor:
          "沿卡拉柯伊岸边延展的一条石材与玻璃的现代长廊。",
      },
      pt: {
        name: "Galataport",
        summary:
          "Galataport é o moderno terminal de cruzeiros de Istambul — um quilómetro de orla de Karaköy restaurada, inaugurado em 2021. Construído como o primeiro terminal de cruzeiros subterrâneo do mundo, mantém o cais como passeio público de galerias e lojas.",
        lookFor:
          "Um longo passeio contemporâneo de pedra e vidro ao longo da margem de Karaköy.",
      },
    },
  },
  {
    id: "besiktas",
    side: "Europe",
    category: "Ferry district",
    era: "Historic quarter",
    lat: 41.042,
    lng: 29.0061,
    text: {
      en: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş is one of the liveliest districts on the European shore — a transport hub where ferries, the Dolmabahçe Palace and a famous football stadium all meet the water. Its busy quay has been a Bosphorus landing point since Ottoman times.",
        lookFor:
          "A busy waterfront with ferry piers and a dense skyline, just north of Dolmabahçe Palace.",
      },
      tr: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş, Avrupa yakasının en hareketli semtlerinden biri — vapurların, Dolmabahçe Sarayı'nın ve ünlü bir futbol stadının suyla buluştuğu bir ulaşım merkezi. İşlek iskelesi Osmanlı'dan beri bir Boğaz durağıdır.",
        lookFor:
          "Dolmabahçe Sarayı'nın hemen kuzeyinde, vapur iskeleleri ve yoğun siluetiyle hareketli kıyı.",
      },
      de: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş ist eines der lebhaftesten Viertel am europäischen Ufer — ein Verkehrsknoten, wo Fähren, der Dolmabahçe-Palast und ein berühmtes Fußballstadion ans Wasser treffen. Sein Kai ist seit osmanischer Zeit ein Bosporus-Anleger.",
        lookFor:
          "Eine belebte Uferzone mit Fähranlegern und dichter Skyline, gleich nördlich des Dolmabahçe-Palasts.",
      },
      fr: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş est l'un des quartiers les plus animés de la rive européenne — un nœud de transport où ferries, palais de Dolmabahçe et un célèbre stade de football rejoignent l'eau. Son quai est un débarcadère du Bosphore depuis l'époque ottomane.",
        lookFor:
          "Un front de mer animé avec embarcadères de ferry et skyline dense, juste au nord du palais de Dolmabahçe.",
      },
      es: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş es uno de los barrios más animados de la orilla europea — un nudo de transporte donde ferris, el palacio de Dolmabahçe y un famoso estadio de fútbol llegan al agua. Su muelle es un embarcadero del Bósforo desde época otomana.",
        lookFor:
          "Un paseo marítimo animado con embarcaderos de ferri y un perfil denso, justo al norte del palacio de Dolmabahçe.",
      },
      ru: {
        name: "Бешикташ",
        summary:
          "Бешикташ — один из самых оживлённых районов европейского берега, транспортный узел, где паромы, дворец Долмабахче и знаменитый футбольный стадион выходят к воде. Его причал служит босфорской пристанью со времён османов.",
        lookFor:
          "Оживлённая набережная с паромными причалами и плотным силуэтом, к северу от дворца Долмабахче.",
      },
      it: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş è uno dei quartieri più vivaci della riva europea — un nodo dei trasporti dove traghetti, il palazzo di Dolmabahçe e un celebre stadio di calcio incontrano l'acqua. La sua banchina è un approdo del Bosforo dall'epoca ottomana.",
        lookFor:
          "Un lungomare animato con pontili dei traghetti e uno skyline denso, appena a nord del palazzo di Dolmabahçe.",
      },
      nl: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş is een van de levendigste wijken aan de Europese oever — een vervoersknooppunt waar veerboten, het Dolmabahçe-paleis en een beroemd voetbalstadion het water raken. De kade is sinds de Ottomaanse tijd een Bosporus-aanlegplaats.",
        lookFor:
          "Een drukke waterkant met veersteigers en een dichte skyline, net ten noorden van het Dolmabahçe-paleis.",
      },
      ar: {
        name: "بشكطاش",
        summary:
          "بشكطاش من أكثر أحياء الضفة الأوروبية حيوية — عقدة نقل تلتقي فيها العبّارات وقصر دولمة بهجة وملعب كرة قدم شهير عند الماء. ورصيفه مرفأ على البوسفور منذ العهد العثماني.",
        lookFor:
          "واجهة بحرية مزدحمة بأرصفة العبّارات وأفق كثيف، إلى الشمال من قصر دولمة بهجة مباشرة.",
      },
      ja: {
        name: "ベシクタシュ",
        summary:
          "ベシクタシュは欧州岸で最も活気ある地区の一つ——フェリー、ドルマバフチェ宮殿、有名なサッカースタジアムが水辺で出会う交通の要所です。賑わう桟橋はオスマン時代からのボスポラスの船着き場です。",
        lookFor:
          "フェリー桟橋と密集した街並みの賑やかな水辺。ドルマバフチェ宮殿のすぐ北。",
      },
      zh: {
        name: "贝希克塔什",
        summary:
          "贝希克塔什是欧洲岸最热闹的城区之一——渡轮、多尔玛巴赫切宫与一座著名足球场都在此临水交汇的交通枢纽。其繁忙码头自奥斯曼时代起便是博斯普鲁斯的登船点。",
        lookFor:
          "渡轮码头与密集天际线的繁忙水岸，就在多尔玛巴赫切宫以北。",
      },
      pt: {
        name: "Beşiktaş",
        summary:
          "Beşiktaş é um dos bairros mais animados da margem europeia — um nó de transportes onde ferries, o palácio de Dolmabahçe e um famoso estádio de futebol chegam à água. O seu cais é um ancoradouro do Bósforo desde a época otomana.",
        lookFor:
          "Uma orla movimentada com cais de ferry e um horizonte denso, mesmo a norte do palácio de Dolmabahçe.",
      },
    },
  },
  {
    id: "galatasaray-island",
    side: "Strait",
    category: "Bosphorus islet",
    era: "Ottoman islet",
    lat: 41.047,
    lng: 29.0322,
    text: {
      en: {
        name: "Galatasaray Island",
        summary:
          "Galatasaray Island is a tiny private islet off the Kuruçeşme shore, just large enough for a cluster of low buildings and a terrace. Once an Ottoman coal depot, it later became a celebrated summer club.",
        lookFor:
          "A very small islet close to the European shore near Kuruçeşme, covered by a single low building.",
      },
      tr: {
        name: "Galatasaray Adası",
        summary:
          "Galatasaray Adası, Kuruçeşme kıyısı açıklarında küçük, özel bir adacık — ancak birkaç alçak yapı ve bir terasa yetecek büyüklükte. Bir zamanlar Osmanlı kömür deposu olan ada sonradan ünlü bir yazlık kulüp oldu.",
        lookFor:
          "Kuruçeşme yakınında, Avrupa kıyısına yakın, tek alçak yapıyla kaplı çok küçük adacık.",
      },
      de: {
        name: "Galatasaray-Insel",
        summary:
          "Die Galatasaray-Insel ist ein winziges privates Eiland vor der Küste von Kuruçeşme, gerade groß genug für ein paar niedrige Gebäude und eine Terrasse. Einst osmanisches Kohlelager, wurde sie später ein gefeierter Sommerclub.",
        lookFor:
          "Ein sehr kleines Eiland nahe dem europäischen Ufer bei Kuruçeşme, von einem einzigen niedrigen Gebäude bedeckt.",
      },
      fr: {
        name: "Île de Galatasaray",
        summary:
          "L'île de Galatasaray est un minuscule îlot privé au large de Kuruçeşme, à peine assez grand pour quelques bâtiments bas et une terrasse. Ancien dépôt de charbon ottoman, elle devint plus tard un club d'été célèbre.",
        lookFor:
          "Un très petit îlot près de la rive européenne à Kuruçeşme, couvert d'un seul bâtiment bas.",
      },
      es: {
        name: "Isla de Galatasaray",
        summary:
          "La isla de Galatasaray es un diminuto islote privado frente a Kuruçeşme, apenas lo bastante grande para unos edificios bajos y una terraza. Antiguo depósito de carbón otomano, después se hizo un célebre club de verano.",
        lookFor:
          "Un islote muy pequeño cerca de la orilla europea en Kuruçeşme, cubierto por un solo edificio bajo.",
      },
      ru: {
        name: "Остров Галатасарай",
        summary:
          "Остров Галатасарай — крошечный частный островок у берега Куручешме, едва вмещающий несколько низких построек и террасу. Бывший османский угольный склад, позже он стал знаменитым летним клубом.",
        lookFor:
          "Совсем маленький островок у европейского берега близ Куручешме, занятый единственной низкой постройкой.",
      },
      it: {
        name: "Isola di Galatasaray",
        summary:
          "L'isola di Galatasaray è un minuscolo isolotto privato al largo di Kuruçeşme, appena grande per qualche edificio basso e una terrazza. Un tempo deposito di carbone ottomano, divenne poi un celebre club estivo.",
        lookFor:
          "Un isolotto piccolissimo presso la riva europea a Kuruçeşme, coperto da un solo edificio basso.",
      },
      nl: {
        name: "Galatasaray-eiland",
        summary:
          "Het Galatasaray-eiland is een piepklein privé-eilandje voor de kust van Kuruçeşme, net groot genoeg voor wat lage gebouwen en een terras. Ooit een Ottomaans kolendepot, werd het later een gevierde zomerclub.",
        lookFor:
          "Een heel klein eilandje dicht bij de Europese oever bij Kuruçeşme, bedekt door één laag gebouw.",
      },
      ar: {
        name: "جزيرة غلطة سراي",
        summary:
          "جزيرة غلطة سراي جزيرة خاصة صغيرة جداً قبالة ساحل كوروتشيشمه، بالكاد تتسع لبضعة مبانٍ منخفضة وشرفة. كانت مستودع فحم عثمانياً ثم صارت نادياً صيفياً شهيراً.",
        lookFor:
          "جزيرة صغيرة جداً قرب الضفة الأوروبية عند كوروتشيشمه، يغطيها مبنى منخفض واحد.",
      },
      ja: {
        name: "ガラタサライ島",
        summary:
          "ガラタサライ島はクルチェシメ沖の小さな私有の島で、低い建物がいくつかとテラスが収まる程度の広さです。かつてオスマンの石炭置き場で、のちに名高い夏のクラブとなりました。",
        lookFor:
          "クルチェシメの欧州岸近くの、ごく小さな島。低い建物ひとつに覆われています。",
      },
      zh: {
        name: "加拉塔萨雷岛",
        summary:
          "加拉塔萨雷岛是库鲁切什梅岸外一座极小的私人岛屿，仅够容下数座低矮建筑与一处露台。它曾是奥斯曼煤库，后来成为著名的夏季会所。",
        lookFor:
          "库鲁切什梅附近、紧邻欧洲岸的极小岛屿，被一座低矮建筑覆盖。",
      },
      pt: {
        name: "Ilha de Galatasaray",
        summary:
          "A Ilha de Galatasaray é um ilhéu privado minúsculo ao largo de Kuruçeşme, apenas grande o suficiente para alguns edifícios baixos e um terraço. Outrora depósito de carvão otomano, tornou-se depois um célebre clube de verão.",
        lookFor:
          "Um ilhéu muito pequeno junto à margem europeia em Kuruçeşme, coberto por um único edifício baixo.",
      },
    },
  },
  {
    id: "arnavutkoy",
    side: "Europe",
    category: "Waterfront village",
    era: "Ottoman yalı",
    lat: 41.068,
    lng: 29.0428,
    text: {
      en: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy is one of the best-preserved old Bosphorus villages, its European shore lined with pastel wooden mansions — the yalı — that once belonged to Ottoman bankers and pashas, their bay windows leaning over the water.",
        lookFor:
          "A tight row of ornate wooden mansions in faded pastel colours, leaning over the water.",
      },
      tr: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy, en iyi korunmuş eski Boğaz köylerinden biri; Avrupa kıyısı, bir zamanlar Osmanlı bankerlerine ve paşalarına ait pastel renkli ahşap yalılarla dizili, cumbaları suyun üzerine sarkıyor.",
        lookFor:
          "Solmuş pastel renklerde, suyun üzerine eğilen sık sıralı süslü ahşap yalılar.",
      },
      de: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy ist eines der am besten erhaltenen alten Bosporus-Dörfer; sein europäisches Ufer ist von pastellfarbenen Holzvillen — den yalı — gesäumt, die einst osmanischen Bankiers und Paschas gehörten, ihre Erker über dem Wasser.",
        lookFor:
          "Eine dichte Reihe verzierter Holzvillen in verblassten Pastelltönen, über das Wasser geneigt.",
      },
      fr: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy est l'un des villages anciens du Bosphore les mieux conservés ; sa rive européenne est bordée de demeures de bois pastel — les yalı — ayant appartenu à des banquiers et pachas ottomans, leurs bow-windows penchés sur l'eau.",
        lookFor:
          "Une rangée serrée de demeures de bois ornées aux teintes pastel passées, penchées sur l'eau.",
      },
      es: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy es uno de los antiguos pueblos del Bósforo mejor conservados; su orilla europea está bordeada de mansiones de madera pastel — las yalı — que pertenecieron a banqueros y bajás otomanos, sus miradores sobre el agua.",
        lookFor:
          "Una hilera apretada de mansiones de madera ornadas en tonos pastel desvaídos, inclinadas sobre el agua.",
      },
      ru: {
        name: "Арнавуткёй",
        summary:
          "Арнавуткёй — одна из лучше всего сохранившихся старых босфорских деревень; европейский берег здесь застроен пастельными деревянными особняками — ялы, — что принадлежали османским банкирам и пашам, их эркеры нависают над водой.",
        lookFor:
          "Плотный ряд резных деревянных особняков выцветших пастельных тонов, склонённых над водой.",
      },
      it: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy è uno dei villaggi antichi del Bosforo meglio conservati; la sua riva europea è orlata di ville di legno pastello — le yalı — un tempo di banchieri e pascià ottomani, con bovindi sporti sull'acqua.",
        lookFor:
          "Una fila serrata di ville di legno ornate dai toni pastello sbiaditi, inclinate sull'acqua.",
      },
      nl: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy is een van de best bewaarde oude Bosporusdorpen; de Europese oever is omzoomd met pastelkleurige houten villa's — de yalı — die ooit van Ottomaanse bankiers en pasja's waren, met erkers boven het water.",
        lookFor:
          "Een dichte rij sierlijke houten villa's in verbleekte pasteltinten, overhellend boven het water.",
      },
      ar: {
        name: "أرناووتكوي",
        summary:
          "أرناووتكوي من أفضل قرى البوسفور القديمة حفظاً؛ يصطفّ على ضفّتها الأوروبية قصور خشبية بألوان باستيل — الـ«يالي» — كانت لمصرفيين وباشاوات عثمانيين، نوافذها البارزة تميل فوق الماء.",
        lookFor:
          "صفّ متراصّ من القصور الخشبية المزخرفة بألوان باستيل باهتة، مائلة فوق الماء.",
      },
      ja: {
        name: "アルナヴトキョイ",
        summary:
          "アルナヴトキョイは最もよく保存されたボスポラスの古い村の一つ。欧州岸には、かつてオスマンの銀行家やパシャが所有したパステル色の木造邸宅「ヤル」が並び、出窓が水上に張り出します。",
        lookFor:
          "色あせたパステル色の装飾的な木造邸宅が、水上に張り出して密に並ぶ一画。",
      },
      zh: {
        name: "阿尔纳武特柯伊",
        summary:
          "阿尔纳武特柯伊是保存最完好的博斯普鲁斯古村之一；其欧洲岸排列着粉彩木造宅邸——「亚勒」，曾属奥斯曼银行家与帕夏，凸窗探向水面。",
        lookFor:
          "成排紧密、色调淡雅渐褪的精致木造宅邸，向水面倾探。",
      },
      pt: {
        name: "Arnavutköy",
        summary:
          "Arnavutköy é uma das aldeias antigas do Bósforo mais bem preservadas; a sua margem europeia é ladeada de mansões de madeira em tons pastel — as yalı — outrora de banqueiros e paxás otomanos, com janelas salientes sobre a água.",
        lookFor:
          "Uma fila cerrada de mansões de madeira ornamentadas em tons pastel desbotados, inclinadas sobre a água.",
      },
    },
  },
  {
    id: "kuleli",
    side: "Asia",
    category: "Military school",
    era: "1845 · Ottoman",
    lat: 41.0762,
    lng: 29.054,
    text: {
      en: {
        name: "Kuleli Military School",
        summary:
          "The Kuleli Military High School stretches along the Asian shore at Çengelköy, its long facade bookended by two distinctive towers — kule — that give it its name. Founded in 1845, it is one of Turkey's oldest military schools.",
        lookFor:
          "A long pale building on the Asian shore with a tall pointed tower at each end.",
      },
      tr: {
        name: "Kuleli Askerî Lisesi",
        summary:
          "Kuleli Askerî Lisesi, Çengelköy'de Anadolu kıyısı boyunca uzanır; uzun cephesinin iki ucunda ona adını veren iki belirgin kule yükselir. 1845'te kurulan okul, Türkiye'nin en eski askerî okullarından biridir.",
        lookFor:
          "Anadolu kıyısında, iki ucunda birer uzun sivri kule bulunan upuzun açık renkli yapı.",
      },
      de: {
        name: "Militärschule Kuleli",
        summary:
          "Die Militäroberschule Kuleli erstreckt sich am asiatischen Ufer bei Çengelköy; ihre lange Fassade wird an beiden Enden von zwei markanten Türmen — kule — abgeschlossen, die ihr den Namen geben. 1845 gegründet, ist sie eine der ältesten Militärschulen der Türkei.",
        lookFor:
          "Ein langes helles Gebäude am asiatischen Ufer mit je einem hohen Spitzturm an beiden Enden.",
      },
      fr: {
        name: "École militaire de Kuleli",
        summary:
          "Le lycée militaire de Kuleli s'étire le long de la rive asiatique à Çengelköy ; sa longue façade est encadrée par deux tours distinctives — kule — qui lui donnent son nom. Fondé en 1845, c'est l'une des plus anciennes écoles militaires de Turquie.",
        lookFor:
          "Un long bâtiment clair sur la rive asiatique, avec une haute tour pointue à chaque extrémité.",
      },
      es: {
        name: "Escuela Militar de Kuleli",
        summary:
          "El liceo militar de Kuleli se extiende por la orilla asiática en Çengelköy; su larga fachada está rematada por dos torres distintivas — kule — que le dan nombre. Fundado en 1845, es una de las escuelas militares más antiguas de Turquía.",
        lookFor:
          "Un largo edificio claro en la orilla asiática, con una alta torre puntiaguda en cada extremo.",
      },
      ru: {
        name: "Военная школа Кулели",
        summary:
          "Военный лицей Кулели тянется вдоль азиатского берега у Ченгелькёя; его длинный фасад с обоих концов завершают две приметные башни — куле, — давшие ему имя. Основанный в 1845 году, это одна из старейших военных школ Турции.",
        lookFor:
          "Длинное светлое здание на азиатском берегу с высокой островерхой башней на каждом конце.",
      },
      it: {
        name: "Scuola Militare di Kuleli",
        summary:
          "Il liceo militare di Kuleli si distende lungo la riva asiatica a Çengelköy; la sua lunga facciata è chiusa da due torri caratteristiche — kule — che le danno il nome. Fondata nel 1845, è una delle più antiche scuole militari della Turchia.",
        lookFor:
          "Un lungo edificio chiaro sulla riva asiatica, con un'alta torre appuntita a ciascuna estremità.",
      },
      nl: {
        name: "Militaire School Kuleli",
        summary:
          "De militaire middelbare school Kuleli strekt zich uit langs de Aziatische oever bij Çengelköy; haar lange gevel wordt aan beide einden afgesloten door twee kenmerkende torens — kule — die haar de naam geven. Gesticht in 1845, is het een van Turkijes oudste militaire scholen.",
        lookFor:
          "Een lang lichtkleurig gebouw aan de Aziatische oever, met aan elk uiteinde een hoge spitse toren.",
      },
      ar: {
        name: "مدرسة كولالي العسكرية",
        summary:
          "تمتد ثانوية كولالي العسكرية على الساحل الآسيوي عند تشنغلكوي؛ تحدّ واجهتها الطويلة من طرفيها برجان مميّزان — kule — منهما اسمها. تأسست عام 1845، وهي من أقدم المدارس العسكرية في تركيا.",
        lookFor:
          "مبنى طويل فاتح اللون على الساحل الآسيوي، بطرفيه برج مدبّب عالٍ.",
      },
      ja: {
        name: "クレリ陸軍学校",
        summary:
          "クレリ陸軍高等学校はチェンゲルキョイのアジア岸に長く延び、長大なファサードの両端に学校名の由来となる二つの特徴的な塔——クレ——が立ちます。1845年創設、トルコ最古級の軍学校です。",
        lookFor:
          "アジア岸に建つ長い淡色の建物。両端にそれぞれ高くとがった塔があります。",
      },
      zh: {
        name: "库莱利军事学校",
        summary:
          "库莱利军事高中沿亚洲岸延伸于琴盖尔柯伊；其修长立面两端各立一座醒目塔楼——「kule」，校名由此而来。学校创立于1845年，是土耳其最古老的军校之一。",
        lookFor:
          "亚洲岸一座修长的浅色建筑，两端各有一座高耸尖塔。",
      },
      pt: {
        name: "Escola Militar de Kuleli",
        summary:
          "O liceu militar de Kuleli estende-se ao longo da margem asiática em Çengelköy; a sua longa fachada é rematada por duas torres distintivas — kule — que lhe dão o nome. Fundada em 1845, é uma das mais antigas escolas militares da Turquia.",
        lookFor:
          "Um longo edifício claro na margem asiática, com uma alta torre pontiaguda em cada extremidade.",
      },
    },
  },
];

export function getLandmark(id: string): Landmark | undefined {
  return BOSPHORUS_LANDMARKS.find((l) => l.id === id);
}
