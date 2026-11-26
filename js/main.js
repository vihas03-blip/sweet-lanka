const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const LS=(()=>{try{localStorage.setItem('_t','1');return localStorage}catch(e){return{getItem(){return null},setItem(){}}}})();

/* ===== PRODUCTS: edit names, prices (Rs). Images: images/Kavum.jpg, images/Kokis.jpg ... (same name as below) ===== */
const P=[
{n:'Kavum',p:60,s:'Oil cake of rice flour and treacle, the heart of every Avurudu table.'},
{n:'Kokis',p:30,s:'Crisp coconut-milk rosettes fried in a hot iron mould, a New Year classic.'},
{n:'Athirasa',p:50,s:'Rice and jaggery discs fried golden, once served at weddings and festivals.'},
{n:'Mung Kavum',p:50,s:'Diamonds of mung bean paste, crisp outside and soft inside.'},
{n:'Aluwa',p:70,s:'Rice flour and cashew fudge cut into diamonds, sweet and sticky.'},
{n:'Weli Thalapa',p:90,s:'Rice flour, coconut milk and jaggery, steamed and sliced.'},
{n:'Pani Walalu',p:70,s:'Fried urad dough rings soaked in kithul treacle.'},
{n:'Asmi',p:130,s:'A delicate Sri Lankan sweet made from rice flour and coconut milk, lightly fried to a crisp golden finish.'}];
P.forEach(x=>x.i='images/'+x.n+'.jpg');
const img=(x,alt)=>`<div class="ph"><img src="${x.i}" alt="${esc(alt||x.n)}" onerror="this.remove()"></div>`;

/* ===== SWEET STORIES + NAMES in 3 languages (same order as P) ===== */
const ST=[
{en:"Rice flour and kithul treacle, deep-fried into golden oil cakes. Old Sinhala texts mention kavum, and the popular konda kavum is named for its shape, like hair tied in a bun. The first batch is traditionally fried at an auspicious time.",
 si:["කැවුම්","සහල් පිටි සහ කිතුල් පැණි වලින් සාදා තෙලේ බදින රන්වන් රසකැවිල්ලකි. පැරණි සිංහල ග්‍රන්ථවල කැවුම් ගැන සඳහන් වේ. කොණ්ඩයක් ගැටගසා ඇති ආකාරයට හැඩය නිසා කොණ්ඩ කැවුම් යැයි කියයි. පළමු කැවුම් බැදුම සාම්ප්‍රදායිකව නැකතකට කරනු ලැබේ."],
 ta:["கவும்","அரிசி மாவும் கித்துள் பாகும் சேர்த்து எண்ணெயில் பொரித்த பொன்னிற இனிப்பு. பழைய சிங்கள நூல்களிலும் கவும் குறிப்பிடப்படுகிறது. கொண்டை போல் முடிச்சிட்ட வடிவத்தால் ‘கொண்டா கவும்’ என்ற பெயர். முதல் தொகுதி பாரம்பரியமாக நல்ல நேரத்தில் பொரிக்கப்படும்."]},
{en:"A crisp, lacy snack of rice flour and coconut milk, fried in a decorative mould. It is thought to date from the Dutch period, and its name may come from the Dutch word for cookies, koekjes.",
 si:["කොකිස්","සහල් පිටි සහ පොල්කිරි වලින් සාදා අලංකාර අච්චුවක බදින කරකර ගතියෙන් යුත් කෑමකි. ලන්දේසි යුගයෙන් පැවත එන්නක් යැයි සැලකේ; නම ලන්දේසි koekjes (බිස්කට්) යන වචනයෙන් ආවා විය හැක."],
 ta:["கொக்கிஸ்","அரிசி மாவும் தேங்காய்ப் பாலும் சேர்த்து அழகிய அச்சில் பொரித்த மொறுமொறுப்பான சிற்றுண்டி. இது டச்சுக் காலத்தில் வந்ததாகக் கருதப்படுகிறது; பெயர் ‘குக்கீஸ்’ எனப் பொருள்படும் டச்சுச் சொல் koekjes-இலிருந்து வந்திருக்கலாம்."]},
{en:"Rice flour and jaggery are made into a soft dough, flattened into rounds and fried golden. The name is said to mean ‘extremely tasty’. Its South Indian cousin is the Tamil adhirasam.",
 si:["අතිරස","හකුරු සහ සහල් පිටි පැස්ටුවක් ලෙස අනා, වටකුරු කොට රන්වන් පැහැයට බදිනවා. ‘අතිරස’ යන නමෙහි අරුත ‘අතිශය රසවත්’ යැයි කියනු ලැබේ. එහි දකුණු ඉන්දියානු ඥාතියා දමිළ අධිරසම් ය."],
 ta:["அதிரசம்","அரிசி மாவும் வெல்லமும் சேர்த்துப் பிசைந்து, வட்டமாகத் தட்டி, பொன்னிறமாகப் பொரித்தெடுக்கப்படும். ‘அதிரசம்’ என்றால் ‘மிகவும் சுவையானது’ என்று கூறப்படுகிறது. இதன் தென்னிந்திய உறவு தமிழ் அதிரசம்."]},
{en:"Rice flour and mung flour are mixed with warm treacle, cut into diamonds, dipped in a rice flour and coconut milk batter and deep-fried. Golden outside, dark and dense inside.",
 si:["මුං කැවුම්","සහල් පිටි සහ මුං පිටි රත් කළ පැණි සමඟ මිශ්‍ර කර, දියමන්ති හැඩයට කපා, සහල් පිටි සහ පොල්කිරි මිශ්‍රණයේ ගල්වා තෙලේ බදිනවා. පිටත රන්වන්, ඇතුළත තද පැහැති සන මැදක්."],
 ta:["மூங் கவும்","அரிசி மாவும் பாசிப்பயறு மாவும் சூடான பாகுடன் கலந்து, வைரம் போல் வெட்டி, அரிசி மாவு–தேங்காய்ப் பால் கலவையில் தோய்த்துப் பொரிக்கப்படும். வெளியே பொன்னிறம், உள்ளே அடர்ந்த மென்மை."]},
{en:"Roasted rice flour, boiled treacle and cashews, pressed in a wooden mould into diamonds or squares. At its simplest it needs only rice flour and treacle, and it is never fried.",
 si:["අලුවා","බැදගත් සහල් පිටි, උණු කළ පැණි සහ කජු වලින් සාදා, ලී අච්චුවකින් දියමන්ති හෝ සමචතුරස්‍ර හැඩයට සකසයි. ඉතා සරලව නම් සහල් පිටි සහ පැණි පමණක් ප්‍රමාණවත්. තෙලේ බදින්නේ නැත."],
 ta:["அலுவா","வறுத்த அரிசி மாவு, காய்ச்சிய பாகு, முந்திரி சேர்த்து, மரச்சட்டத்தில் அழுத்தி வைரம் அல்லது சதுர வடிவில் செய்யப்படும். எளிமையாக அரிசி மாவும் பாகும் போதும்; எண்ணெயில் பொரிப்பதில்லை."]},
{en:"A tea-time sweet from village kitchens, made in two steps: rice flour is steamed into soft pittu, then mixed with kithul or coconut treacle. Chewy, comforting and filling.",
 si:["වැලි තලප","ගම්බද මුළුතැන්ගෙවල තේ වේලාවට සාදන රසකැවිල්ලකි. පියවර දෙකකින්: මුලින් සහල් පිටි වලින් පිට්ටු සාදා, පසුව කිතුල් හෝ පොල් පැණි සමඟ මිශ්‍ර කරයි. ඇදෙන ගතියෙන් යුතු, සැනසිල්ල දෙන රසකැවිල්ලකි."],
 ta:["வெலி தலப்பா","கிராமத்துச் சமையலறைகளில் தேநீர் நேரத்துக்குச் செய்யும் இனிப்பு. இரு படிகள்: முதலில் அரிசி மாவில் புட்டு செய்து, பின்னர் கித்துள் அல்லது தென்னை பாகுடன் கலப்பார்கள். இழுவைத் தன்மையுடன் மனம் நிறைக்கும் சுவை."]},
{en:"Urad flour and kithul treacle make these crisp coils, soaked in sweet syrup. Pani means syrup and walalu means rings, which is why they are also called honey rings.",
 si:["පැණි වළලු","උඳු පිටි සහ කිතුල් පැණි වලින් සාදන, පැණි පිරුණු කරකර ගතියෙන් යුත් රසකැවිල්ලකි. ‘පැණි’ යනු පැණි වතුර, ‘වළලු’ යනු දඟරයක් වැනි හැඩය; ඒ නිසා ‘honey rings’ යැයිද කියයි."],
 ta:["பணி வளலு","உளுத்தம் மாவும் கித்துள் பாகும் சேர்த்து செய்த மொறுமொறுப்பான வளையங்கள், இனிய பாகில் ஊறியவை. ‘பணி’ என்றால் பாகு, ‘வளலு’ என்றால் வளையங்கள்; அதனால் ‘தேன் வளையங்கள்’ என்றும் அழைப்பர்."]},
{en:"Batter is poured through a coconut shell with tiny holes to make a lacy web pattern. It is left for a day or two, fried again and finished with thick sugar syrup in bright colours.",
 si:["ආස්මි","පිටි මිශ්‍රණය කුඩා සිදුරු තැබූ පොල් කටුවක් හරහා වත් කර දැලක් වැනි රටාවක් සාදයි. දින එකක් දෙකක් තබා නැවත බැද, ඝන සීනි පාවෙලින් අලංකාර කරයි; සීනි පාවෙල ආහාර වර්ණකවලින් පාට කරයි."],
 ta:["ஆஸ்மி","மாவுக் கலவையை சிறு துளைகள் இட்ட தேங்காய்ச் சிரட்டை வழியே ஊற்றி வலை போன்ற வடிவம் உருவாக்குவர். ஒரு நாள் இரண்டு நாள் வைத்து மீண்டும் பொரித்து, அடர்த்தியான சர்க்கரைப் பாகால் அலங்கரிக்கப்படும்; பாகில் உணவு நிறமிகள் சேர்ப்பார்கள்."]}
];

/* ===== TRANSLATIONS: every visible word on the site (English / Sinhala / Tamil) ===== */
const T={
en:{stIntro:'Visit us at any of our stores. Tap "Get directions" to open the place in Google Maps.',getDir:'Get directions',mainStore:'Main Store',brand:'Dilena Rasa Gamana',about:'About Us',contact:'Contact Us',stores:'Store Locations',search:'Search sweets…',n1:'Our Sweets',n3:'Gift Box',n4:'Reviews',order:'Order Online',
 h1:'The taste of tradition',shop:'Shop now',fresh:'Fresh daily',deliv:'Island-wide delivery',pay:'Safe payment',
 ribbon:'Avurudu · Weddings · Poya · Gifts',gift:'Build your gift box',total:'Total',boxFee:'(+ Rs 200 box)',add:'Add to cart',view:'Quick view',tapFill:'Tap sweets above to fill your box',giftName:'Gift box',
 stories:'Sweet stories',tap:'Tap to read the story',sintro:'Every April, Sri Lankan kitchens fill with the smell of coconut oil and kithul treacle. These eight sweets are the heart of the Avurudu table.',
 rev:'Customer reviews',write:'Write a review',nameph:'Name',commentph:'Your comment',submitRev:'Submit review',revThanks:'Thank you! Your review has been saved.',revPending:'Thank you! Your review will appear once approved.',revErr:'Could not send your review. Please try again.',revLoadErr:'Reviews could not be loaded right now.',revNone:'No reviews yet. Be the first!',
 newsH:'Stay sweetly updated',emailph:'Email',sub:'Subscribe',thanks:'Thank you!',
 foot:'Traditional Sri Lankan sweets made fresh from family recipes and delivered to your door. Perfect for Avurudu, weddings, poya days and every celebration.',
 shopH:'Shop',companyH:'Company',visit:'Visit & Call Us',cartL:'Cart',boxes:'Gift Boxes',hours:'Daily 8.00 am – 8.00 pm',
 copyr:'© 2026 Dilena Rasa Gamana. All rights reserved.',privacy:'Privacy Policy',terms:'Terms & Conditions',refund:'Refund Policy',top:'Back to top ↑',
 yourCart:'Your cart',subtotal:'Subtotal',delivNote:'Delivery charges are confirmed on WhatsApp.',howPay:'How to pay',nameph2:'Your name',phoneph:'Phone number',addrph:'Delivery address',placeOrder:'Place order on WhatsApp',emptyCart:'Your cart is empty. Add some sweets!',
 oTitle:'How to Order Online',oIntro:'Order your favourite Sri Lankan sweets in four easy steps. You pay by bank transfer and send us the slip on WhatsApp.',
 s1t:'Choose your sweets and add them to the cart',s1d:'Pick your sweets, or build your own gift box, then open the cart (🛒) to check everything you chose.',startShop:'Start shopping',
 s2t:'Send your order on WhatsApp',s2d:'In the cart, type your name, phone number and delivery address, then press "Place order on WhatsApp". We will reply with your final total, including delivery.',
 s3t:'Pay the amount to our bank account',s3d:'Transfer the total we confirmed to the account below. Please write your name or phone number as the payment reference.',
 s4t:'Send us the payment slip on WhatsApp',s4d:'Take a photo or screenshot of your bank slip and send it to us on WhatsApp. We will confirm your order and prepare it fresh.',sendSlip:'Send payment slip',
 bankH:'Bank details',bBank:'Bank',bName:'Account name',bNum:'Account number',bBranch:'Branch',copyB:'Copy',copied:'Copied ✓',selCopy:'Select & copy',
 cWa:'WhatsApp',cPhone:'Phone',cEmail:'Email',cHours:'Hours',cAddr:'Address',
 oNote:'Your order is confirmed once we receive your payment slip. If you need help at any step, message us on WhatsApp.',
  osBadge:'⚡ 4 Simple Steps',
  os1:'Choose your sweets',os1sub:'Select your favorites or build a gift box',
  os2:'Add to cart',os2sub:'Tap add to cart & check your items',
  os3:'Send order on WhatsApp',os3sub:'Send your name, address & phone',
  os4:'Pay and send your slip',os4sub:'Bank transfer & slip verification'},
si:{stIntro:'අපගේ ඕනෑම අලෙවිසැලකට පැමිණෙන්න. ස්ථානය Google Maps හි විවෘත කිරීමට "මාර්ගය බලන්න" ඔබන්න.',getDir:'මාර්ගය බලන්න',mainStore:'ප්‍රධාන අලෙවිසැල',brand:'දිලෙන රස ගමන',about:'අපි ගැන',contact:'අප අමතන්න',stores:'අලෙවිසැල් ස්ථාන',search:'රසකැවිලි සොයන්න…',n1:'අපේ රසකැවිලි',n3:'තෑගි පෙට්ටිය',n4:'සමාලෝචන',order:'මාර්ගගතව ඇණවුම් කරන්න',
 h1:'සම්ප්‍රදායේ රසය',shop:'දැන් මිලදී ගන්න',fresh:'දිනපතා නැවුම්',deliv:'දිවයින පුරා බෙදාහැරීම',pay:'ආරක්ෂිත ගෙවීම්',
 ribbon:'අවුරුදු · මංගල · පෝය · තෑගි',gift:'ඔබේම තෑගි පෙට්ටිය සාදන්න',total:'මුළු මුදල',boxFee:'(+ පෙට්ටිය රු. 200)',add:'කරත්තයට එක් කරන්න',view:'ඉක්මන් බැලීම',tapFill:'ඔබේ පෙට්ටිය පිරවීමට ඉහත රසකැවිලි ඔබන්න',giftName:'තෑගි පෙට්ටිය',
 stories:'රසකැවිලි කතා',tap:'කතාව කියවන්න ඔබන්න',sintro:'සෑම අප්‍රේල් මාසයකම ශ්‍රී ලංකාවේ මුළුතැන්ගෙවල් පොල්තෙල් සහ කිතුල් පැණි සුවඳින් පිරී යයි. මෙම රසකැවිලි අට අවුරුදු මේසයේ හදවතයි.',
 rev:'පාරිභෝගික අදහස්',write:'සමාලෝචනයක් ලියන්න',nameph:'නම',commentph:'ඔබේ අදහස',submitRev:'සමාලෝචනය යවන්න',revThanks:'ස්තූතියි! ඔබේ සමාලෝචනය සුරැකිණි.',revPending:'ස්තූතියි! අනුමත වූ පසු ඔබේ සමාලෝචනය පෙන්වනු ඇත.',revErr:'ඔබේ සමාලෝචනය යැවීමට නොහැකි විය. නැවත උත්සාහ කරන්න.',revLoadErr:'සමාලෝචන දැන් පූරණය කළ නොහැක.',revNone:'තවම සමාලෝචන නැත. පළමුවැන්නා වන්න!',
 newsH:'රසවත් යාවත්කාලීන තොරතුරු ලබාගන්න',emailph:'විද්‍යුත් තැපෑල',sub:'දායක වන්න',thanks:'ස්තූතියි!',
 foot:'පවුල් වට්ටෝරු අනුව නැවුම්ව සාදා ඔබේ දොරකඩටම ගෙන එන සාම්ප්‍රදායික ශ්‍රී ලාංකික රසකැවිලි. අවුරුද්ද, මංගල උත්සව, පෝය දින සහ සෑම සැමරුමකටම ගැලපේ.',
 shopH:'සාප්පුව',companyH:'සමාගම',visit:'අප බලන්න සහ අමතන්න',cartL:'කරත්තය',boxes:'තෑගි පෙට්ටි',hours:'දිනපතා පෙ.ව. 8.00 – ප.ව. 8.00',
 copyr:'© 2026 දිලෙන රස ගමන. සියලු හිමිකම් ඇවිරිණි.',privacy:'රහස්‍යතා ප්‍රතිපත්තිය',terms:'නියම සහ කොන්දේසි',refund:'ආපසු ගෙවීමේ ප්‍රතිපත්තිය',top:'ඉහළට ↑',
 yourCart:'ඔබේ කරත්තය',subtotal:'අනු මුළුව',delivNote:'බෙදාහැරීමේ ගාස්තු WhatsApp හරහා තහවුරු කෙරේ.',howPay:'ගෙවන ආකාරය',nameph2:'ඔබේ නම',phoneph:'දුරකථන අංකය',addrph:'බෙදාහැරීමේ ලිපිනය',placeOrder:'WhatsApp හරහා ඇණවුම් කරන්න',emptyCart:'ඔබේ කරත්තය හිස්ය. රසකැවිලි එක් කරන්න!',
 oTitle:'මාර්ගගතව ඇණවුම් කරන ආකාරය',oIntro:'ඔබේ ප්‍රියතම ශ්‍රී ලාංකික රසකැවිලි පහසු පියවර හතරකින් ඇණවුම් කරන්න. ඔබ බැංකු හුවමාරුවෙන් ගෙවා, රිසිට්පත WhatsApp හරහා අපට එවන්න.',
 s1t:'ඔබේ රසකැවිලි තෝරා කරත්තයට එක් කරන්න',s1d:'රසකැවිලි තෝරන්න, නැතහොත් ඔබේම තෑගි පෙට්ටියක් සාදන්න, ඉන්පසු කරත්තය (🛒) විවෘත කර ඔබ තෝරාගත් සියල්ල පරීක්ෂා කරන්න.',startShop:'සාප්පු යාම ආරම්භ කරන්න',
 s2t:'ඔබේ ඇණවුම WhatsApp හරහා එවන්න',s2d:'කරත්තයේ ඔබේ නම, දුරකථන අංකය සහ බෙදාහැරීමේ ලිපිනය ටයිප් කර "WhatsApp හරහා ඇණවුම් කරන්න" ඔබන්න. බෙදාහැරීම ඇතුළුව ඔබේ අවසාන මුළු මුදල අපි පිළිතුරු දෙන්නෙමු.',
 s3t:'මුදල අපේ බැංකු ගිණුමට ගෙවන්න',s3d:'අප තහවුරු කළ මුළු මුදල පහත ගිණුමට මාරු කරන්න. ගෙවීම් යොමුව ලෙස ඔබේ නම හෝ දුරකථන අංකය ලියන්න.',
 s4t:'ගෙවීම් රිසිට්පත WhatsApp හරහා අපට එවන්න',s4d:'ඔබේ බැංකු රිසිට්පතේ ඡායාරූපයක් හෝ තිර රුවක් ගෙන WhatsApp හරහා අපට එවන්න. අපි ඔබේ ඇණවුම තහවුරු කර නැවුම්ව සකස් කරන්නෙමු.',sendSlip:'ගෙවීම් රිසිට්පත යවන්න',
 bankH:'බැංකු විස්තර',bBank:'බැංකුව',bName:'ගිණුම් නම',bNum:'ගිණුම් අංකය',bBranch:'ශාඛාව',copyB:'පිටපත් කරන්න',copied:'පිටපත් විය ✓',selCopy:'තෝරා පිටපත් කරන්න',
 cWa:'WhatsApp',cPhone:'දුරකථන',cEmail:'විද්‍යුත් තැපෑල',cHours:'වේලාවන්',cAddr:'ලිපිනය',
 oNote:'ඔබේ ගෙවීම් රිසිට්පත ලැබුණු පසු ඔබේ ඇණවුම තහවුරු වේ. ඕනෑම පියවරකදී උදව් අවශ්‍ය නම් WhatsApp හරහා අපට පණිවිඩ කරන්න.',
  osBadge:'⚡ පහසු පියවර 4',
  os1:'ඔබේ රසකැවිලි තෝරන්න',os1sub:'කැමති රසකැවිලි තෝරන්න හෝ තෑගි පෙට්ටියක් සාදන්න',
  os2:'කරත්තයට එක් කරන්න',os2sub:'කරත්තයට එක්කර තෝරාගත් දෑ බලන්න',
  os3:'WhatsApp හරහා ඇණවුම එවන්න',os3sub:'නම, ලිපිනය සහ දුරකථන අංකය එවන්න',
  os4:'ගෙවා රිසිට්පත එවන්න',os4sub:'බැංකු හුවමාරුව සහ රිසිට්පත තහවුරු කිරීම'},
ta:{stIntro:'எங்கள் எந்தக் கடைக்கும் வாருங்கள். இடத்தை Google Maps-இல் திறக்க "வழிகாட்டுதல் பெறுக" என்பதைத் தொடவும்.',getDir:'வழிகாட்டுதல் பெறுக',mainStore:'முதன்மைக் கடை',brand:'திலேன ரச கமன',about:'எங்களைப் பற்றி',contact:'தொடர்புகொள்ள',stores:'கடை இருப்பிடங்கள்',search:'இனிப்புகளைத் தேடுங்கள்…',n1:'எங்கள் இனிப்புகள்',n3:'பரிசுப் பெட்டி',n4:'மதிப்புரைகள்',order:'ஆன்லைனில் ஆர்டர் செய்யுங்கள்',
 h1:'பாரம்பரியத்தின் சுவை',shop:'இப்போது வாங்குங்கள்',fresh:'தினமும் புதியது',deliv:'நாடு முழுவதும் விநியோகம்',pay:'பாதுகாப்பான கட்டணம்',
 ribbon:'புத்தாண்டு · திருமணம் · பூரணை · பரிசுகள்',gift:'உங்கள் பரிசுப் பெட்டியை உருவாக்குங்கள்',total:'மொத்தம்',boxFee:'(+ பெட்டி ரூ. 200)',add:'கூடையில் சேர்',view:'விரைவுப் பார்வை',tapFill:'உங்கள் பெட்டியை நிரப்ப மேலே உள்ள இனிப்புகளைத் தொடவும்',giftName:'பரிசுப் பெட்டி',
 stories:'இனிப்புக் கதைகள்',tap:'கதையைப் படிக்கத் தொடவும்',sintro:'ஒவ்வோர் ஏப்ரல் மாதமும் இலங்கையின் சமையலறைகள் தேங்காய் எண்ணெய் மற்றும் கித்துள் பாகின் மணத்தால் நிறைகின்றன. இந்த எட்டு இனிப்புகளே புத்தாண்டு மேசையின் இதயம்.',
 rev:'வாடிக்கையாளர் மதிப்புரைகள்',write:'மதிப்புரை எழுதுங்கள்',nameph:'பெயர்',commentph:'உங்கள் கருத்து',submitRev:'மதிப்புரையை அனுப்பு',revThanks:'நன்றி! உங்கள் மதிப்புரை சேமிக்கப்பட்டது.',revPending:'நன்றி! அனுமதிக்கப்பட்ட பிறகு உங்கள் மதிப்புரை தோன்றும்.',revErr:'உங்கள் மதிப்புரையை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',revLoadErr:'மதிப்புரைகளை இப்போது ஏற்ற முடியவில்லை.',revNone:'இன்னும் மதிப்புரைகள் இல்லை. முதலில் எழுதுங்கள்!',
 newsH:'இனிய செய்திகளைப் பெறுங்கள்',emailph:'மின்னஞ்சல்',sub:'சந்தா செய்',thanks:'நன்றி!',
 foot:'குடும்பச் செய்முறைகளின்படி புதிதாகச் செய்து உங்கள் வீட்டுக்கே கொண்டுவரும் பாரம்பரிய இலங்கை இனிப்புகள். புத்தாண்டு, திருமணம், பூரணை நாட்கள் மற்றும் எல்லா கொண்டாட்டங்களுக்கும் ஏற்றது.',
 shopH:'கடை',companyH:'நிறுவனம்',visit:'வருகை & அழைப்பு',cartL:'கூடை',boxes:'பரிசுப் பெட்டிகள்',hours:'தினமும் காலை 8.00 – மாலை 8.00',
 copyr:'© 2026 திலேன ரச கமன. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',privacy:'தனியுரிமைக் கொள்கை',terms:'விதிமுறைகள் & நிபந்தனைகள்',refund:'பணத்திரும்பப் பெறும் கொள்கை',top:'மேலே ↑',
 yourCart:'உங்கள் கூடை',subtotal:'உப மொத்தம்',delivNote:'விநியோகக் கட்டணம் WhatsApp-இல் உறுதிசெய்யப்படும்.',howPay:'பணம் செலுத்துவது எப்படி',nameph2:'உங்கள் பெயர்',phoneph:'தொலைபேசி எண்',addrph:'விநியோக முகவரி',placeOrder:'WhatsApp-இல் ஆர்டர் செய்யுங்கள்',emptyCart:'உங்கள் கூடை காலியாக உள்ளது. இனிப்புகளைச் சேர்க்கவும்!',
 oTitle:'ஆன்லைனில் ஆர்டர் செய்வது எப்படி',oIntro:'உங்களுக்குப் பிடித்த இலங்கை இனிப்புகளை நான்கு எளிய படிகளில் ஆர்டர் செய்யுங்கள். வங்கிப் பரிமாற்றம் மூலம் பணம் செலுத்தி, ரசீதை WhatsApp-இல் அனுப்புங்கள்.',
 s1t:'உங்கள் இனிப்புகளைத் தேர்ந்தெடுத்து கூடையில் சேர்க்கவும்',s1d:'இனிப்புகளைத் தேர்ந்தெடுங்கள் அல்லது உங்கள் சொந்த பரிசுப் பெட்டியை உருவாக்குங்கள்; பின்னர் கூடையைத் (🛒) திறந்து தேர்ந்தவற்றைச் சரிபாருங்கள்.',startShop:'வாங்கத் தொடங்குங்கள்',
 s2t:'உங்கள் ஆர்டரை WhatsApp-இல் அனுப்புங்கள்',s2d:'கூடையில் உங்கள் பெயர், தொலைபேசி எண், விநியோக முகவரியை உள்ளிட்டு "WhatsApp-இல் ஆர்டர் செய்யுங்கள்" அழுத்துங்கள். விநியோகம் உட்பட இறுதித் தொகையை நாங்கள் பதிலளிப்போம்.',
 s3t:'தொகையை எங்கள் வங்கிக் கணக்கில் செலுத்துங்கள்',s3d:'நாங்கள் உறுதிசெய்த மொத்தத் தொகையை கீழே உள்ள கணக்கிற்கு மாற்றுங்கள். கட்டணக் குறிப்பாக உங்கள் பெயர் அல்லது தொலைபேசி எண்ணை எழுதுங்கள்.',
 s4t:'பணம் செலுத்திய ரசீதை WhatsApp-இல் அனுப்புங்கள்',s4d:'உங்கள் வங்கி ரசீதை புகைப்படம் அல்லது ஸ்கிரீன்ஷாட் எடுத்து WhatsApp-இல் அனுப்புங்கள். உங்கள் ஆர்டரை உறுதிசெய்து புதிதாகத் தயாரிப்போம்.',sendSlip:'ரசீதை அனுப்பு',
 bankH:'வங்கி விவரங்கள்',bBank:'வங்கி',bName:'கணக்குப் பெயர்',bNum:'கணக்கு எண்',bBranch:'கிளை',copyB:'நகலெடு',copied:'நகலெடுக்கப்பட்டது ✓',selCopy:'தேர்ந்தெடுத்து நகலெடுக்கவும்',
 cWa:'WhatsApp',cPhone:'தொலைபேசி',cEmail:'மின்னஞ்சல்',cHours:'நேரம்',cAddr:'முகவரி',
 oNote:'உங்கள் ரசீது கிடைத்ததும் ஆர்டர் உறுதிசெய்யப்படும். எந்தப் படியிலும் உதவி தேவைப்பட்டால் WhatsApp-இல் எங்களுக்குச் செய்தி அனுப்புங்கள்.',
  osBadge:'⚡ 4 எளிய படிகள்',
  os1:'இனிப்புகளைத் தேர்ந்தெடுக்கவும்',os1sub:'விருப்பமானதைத் தேர்வுசெய்யவும் அல்லது பரிசுப் பெட்டியை உருவாக்கவும்',
  os2:'கூடையில் சேர்க்கவும்',os2sub:'கூடையில் சேர்த்து சரிபாருங்கள்',
  os3:'WhatsApp-இல் ஆர்டரை அனுப்பவும்',os3sub:'பெயர், முகவரி மற்றும் தொலைபேசியை அனுப்புங்கள்',
  os4:'பணம் செலுத்தி ரசீதை அனுப்பவும்',os4sub:'வங்கிப் பரிமாற்றம் மற்றும் ரசீது சரிபார்ப்பு'}};


let cur='en';
const t=k=>(T[cur]&&T[cur][k])||T.en[k]||k;
const hooks=[];   // functions that redraw dynamic parts when the language changes
function setLang(l){
 if(!T[l])l='en';cur=l;LS.setItem('lang',l);document.documentElement.lang=l;
 $$('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
 $$('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));
 const s=$('#lang');if(s)s.value=l;
 hooks.forEach(f=>f())}
const nameOf=i=>cur==='en'?P[i].n:ST[i][cur][0];
const clamp=v=>{v=Math.floor(+v);return v>=1?Math.min(v,9999):1};

/* ===== ORDER PAGE: copy account number ===== */
if($('#cp'))$('#cp').onclick=e=>{const b=e.currentTarget,num=$('#acc').textContent.trim();
 (navigator.clipboard?navigator.clipboard.writeText(num):Promise.reject())
  .then(()=>{b.textContent=t('copied');setTimeout(()=>b.textContent=t('copyB'),2000)})
  .catch(()=>{b.textContent=t('selCopy')})};

/* ===== HOME PAGE ===== */
if($('#grid')){

const WA='94773636717'; // YOUR WhatsApp number: country code, no "+" (orders are sent here)
// Where the reviews server runs. On the live site (same server) this is ''. While testing with Live Server (port 5500) it points to the Node server on port 3000.
const API=((location.hostname==='127.0.0.1'||location.hostname==='localhost')&&location.port!=='3000')?'http://localhost:3000':'';
const rs=n=>'Rs '+n.toLocaleString('en-US');
const partsTxt=(parts,tr)=>parts.map(([i,q])=>`${tr?nameOf(i):P[i].n} ×${q}`).join(', ');

/* ===== CART (side drawer) + FLY ANIMATION ===== */
let cart=[];
const total=()=>cart.reduce((s,x)=>s+x.q*x.p,0);
function fly(el,done){const a=el.getBoundingClientRect(),b=$('#cartBtn').getBoundingClientRect(),d=document.createElement('i');
 d.className='fly';d.textContent='🍬';d.style.cssText=`left:${a.left}px;top:${a.top}px`;document.body.append(d);
 requestAnimationFrame(()=>{d.style.transform=`translate(${b.left-a.left}px,${b.top-a.top}px) scale(.3)`;d.style.opacity=.4});
 setTimeout(()=>{d.remove();done&&done()},700)}
// id = product number (or -1 for a gift box); parts = [[productNumber, count], ...] for gift boxes
function addLine(key,n,p,q,id,parts){const l=cart.find(x=>x.k===key);l?l.q=Math.min(9999,l.q+q):cart.push({k:key,n,p,q,id,parts});drawCart();
 $('#cnt').classList.add('bump');setTimeout(()=>$('#cnt').classList.remove('bump'),300)}
function drawCart(){
 $('#cnt').textContent=cart.reduce((s,x)=>s+x.q,0);$('#cs').textContent=rs(total());$('#ob').disabled=!cart.length;
 $('#cl').innerHTML=cart.length?cart.map((x,i)=>{
  const nm=x.id>=0?nameOf(x.id):t('giftName'),note=x.parts?partsTxt(x.parts,true):'';
  return `<div class="ci"><div><b>${esc(nm)}</b>${note?`<small>${esc(note)}</small>`:''}<span>${rs(x.p)}</span></div><div class="qty"><button data-c="${i}" data-d="-1">−</button><input class="qi" type="number" min="1" max="9999" value="${x.q}" data-ci="${i}"><button data-c="${i}" data-d="1">+</button></div><button class="rm" data-c="${i}" data-d="0" aria-label="Remove">🗑</button></div>`}).join(''):`<p class="em">${t('emptyCart')}</p>`}
$('#cl').onclick=e=>{const b=e.target.closest('button[data-c]');if(!b)return;const i=+b.dataset.c,d=+b.dataset.d;
 if(d===0||cart[i].q+d<1)cart.splice(i,1);else cart[i].q=Math.min(9999,cart[i].q+d);drawCart()};
$('#cl').onchange=e=>{const el=e.target.closest('[data-ci]');if(!el)return;cart[+el.dataset.ci].q=clamp(el.value);drawCart()};
const openC=o=>document.body.classList.toggle('co',o);
$('#cartBtn').onclick=()=>openC(true);$('#cx').onclick=$('#ov').onclick=()=>openC(false);
addEventListener('keydown',e=>e.key==='Escape'&&openC(false));
$('#of').onsubmit=e=>{e.preventDefault();
 // The order message to you (the shop owner) is always in English
 const lines=cart.map(x=>`• ${x.n}${x.parts?' ('+partsTxt(x.parts,false)+')':''} × ${x.q} = ${rs(x.q*x.p)}`).join('\n');
 const m=`New order: Dilena Rasa Gamana\n${lines}\nTotal: ${rs(total())}\nName: ${$('#on').value}\nPhone: ${$('#op').value}\nAddress: ${$('#oa').value}`;
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(m),'_blank');
 cart=[];drawCart();e.target.reset();openC(false)};

/* ===== PRODUCT CARDS (each with its own quantity box) + QUICK VIEW ===== */
function drawGrid(){
 $('#grid').innerHTML=P.map((x,i)=>{const nm=nameOf(i);
  return `<div class="card" data-n="${esc((x.n+' '+ST[i].si[0]+' '+ST[i].ta[0]).toLowerCase())}">${img(x,nm)}<div class="info"><h3>${esc(nm)}</h3><div class="pr">${rs(x.p)}</div>
  <div class="cq"><button data-s="-1" data-i="${i}" aria-label="−">−</button><input class="qi" type="number" min="1" max="9999" value="1" data-qi="${i}" aria-label="Quantity"><button data-s="1" data-i="${i}" aria-label="+">+</button></div>
  <div class="acts"><button class="view" data-v="${i}">${t('view')}</button><button class="add" data-a="${i}">${t('add')}</button></div></div></div>`}).join('');
 filterGrid()}
function filterGrid(){const q=$('#search').value.trim().toLowerCase();$$('.card').forEach(c=>c.hidden=!c.dataset.n.includes(q))}
function openQV(vi){const x=P[vi],nm=nameOf(vi);
 $('#qvc').innerHTML=`${img(x,nm)}<div><h3>${esc(nm)}</h3><p>${esc(cur==='en'?x.s:ST[vi][cur][1])}</p><b>${rs(x.p)}</b><div class="qty"><button data-q="-1">−</button><input class="qi" id="q" type="number" min="1" max="9999" value="1"><button data-q="1">+</button></div><button class="btn" id="qa">${t('add')}</button></div>`;
 $('#qvc').onclick=ev=>{const c=ev.target;
  if(c.dataset.q){const inp=$('#q');inp.value=clamp(+inp.value+ +c.dataset.q)}
  if(c.id==='qa'){const n=clamp($('#q').value);fly(c,()=>addLine('p'+vi,x.n,x.p,n,vi));$('#qvd').close()}};
 $('#qvd').showModal()}
$('#grid').onclick=e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.s){const inp=$(`#grid [data-qi="${b.dataset.i}"]`);inp.value=clamp(+inp.value+ +b.dataset.s);return}
 if(b.dataset.a){const i=+b.dataset.a,inp=$(`#grid [data-qi="${i}"]`),n=clamp(inp.value);fly(b,()=>addLine('p'+i,P[i].n,P[i].p,n,i));inp.value=1}
 if(b.dataset.v)openQV(+b.dataset.v)};
$('#grid').onchange=e=>{const el=e.target.closest('[data-qi]');if(el)el.value=clamp(el.value)};
$('#search').oninput=filterGrid;

/* ===== GIFT BOX BUILDER: any quantity of any sweet; box fee below ===== */
const FEE=200;let box={};
function drawBox(){const ids=Object.keys(box),sub=ids.reduce((s,i)=>s+P[i].p*box[i],0);
 $('#pick').innerHTML=P.map((x,i)=>`<button data-i="${i}">${esc(nameOf(i))}<small>${rs(x.p)}</small>${box[i]?`<em>${box[i]}</em>`:''}</button>`).join('');
 $('#slots').innerHTML=ids.length?ids.map(i=>`<div class="br"><span>${esc(nameOf(i))}</span><div class="qty"><button data-b="${i}" data-d="-1">−</button><input class="qi" type="number" min="1" max="9999" value="${box[i]}" data-n="${i}"><button data-b="${i}" data-d="1">+</button></div><b>${rs(P[i].p*box[i])}</b></div>`).join(''):`<p class="em">${t('tapFill')}</p>`;
 $('#tot').textContent=rs(sub+(ids.length?FEE:0));$('#addBox').disabled=!ids.length}
$('#pick').onclick=e=>{const b=e.target.closest('button');if(b){box[b.dataset.i]=Math.min(9999,(box[b.dataset.i]||0)+1);drawBox()}};
$('#slots').onclick=e=>{const b=e.target.closest('[data-b]');if(!b)return;const i=b.dataset.b;box[i]=Math.min(9999,box[i]+ +b.dataset.d);if(box[i]<1)delete box[i];drawBox()};
$('#slots').onchange=e=>{const el=e.target.closest('[data-n]');if(!el)return;
 const v=Math.floor(+el.value);
 if(v>=1)box[el.dataset.n]=Math.min(v,9999);else delete box[el.dataset.n];
 drawBox()};
$('#addBox').onclick=e=>{const ids=Object.keys(box),sub=ids.reduce((s,i)=>s+P[i].p*box[i],0),parts=ids.map(i=>[+i,box[i]]);
 fly(e.currentTarget,()=>addLine('g'+Date.now(),'Gift box',sub+FEE,1,-1,parts));box={};drawBox()};

/* ===== SWEET STORIES (flip cards with food photos) ===== */
function drawStories(){
 $('#flips').innerHTML=P.map((x,i)=>{
  const s=ST[i],en=cur==='en',nm=en?x.n:s[cur][0],tx=en?s.en:s[cur][1];
  return `<div class="flip" tabindex="0"><div class="in"><div class="f"><img src="${x.i}" alt="" onerror="this.remove()"><span>${esc(nm)}</span>${en?'':`<small>${esc(x.n)}</small>`}<em>${t('tap')}</em></div><div class="b"><h4>${esc(nm)}</h4><p>${esc(tx)}</p></div></div></div>`}).join('')}
$('#flips').onclick=e=>{const f=e.target.closest('.flip');f&&f.classList.toggle('on')};
$('#flips').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();const f=e.target.closest('.flip');f&&f.classList.toggle('on')}};

/* ===== REVIEWS (saved in MongoDB through the Node server: see server.js) ===== */
let R=[],loadFailed=false;
function drawR(){
 $('#rl').innerHTML=R.length?R.map(x=>`<article class="rc"><div class="st">${'★'.repeat(x.rating)}${'☆'.repeat(5-x.rating)}</div><p>${esc(x.comment)}</p><b>${esc(x.name)}</b></article>`).join(''):`<p class="em">${t(loadFailed?'revLoadErr':'revNone')}</p>`;
 $('#avg').textContent=R.length?(R.reduce((s,x)=>s+x.rating,0)/R.length).toFixed(1)+' ★ · '+R.length:''}
async function loadR(){
 try{const r=await fetch(API+'/api/reviews');if(!r.ok)throw 0;R=await r.json();loadFailed=false}
 catch(e){R=[];loadFailed=true}
 drawR()}
$('#rf').onsubmit=async e=>{e.preventDefault();
 const btn=$('#rf button'),msg=$('#rmsg');btn.disabled=true;msg.textContent='';
 try{
  const r=await fetch(API+'/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({name:$('#rn').value,rating:+$('#rr').value,comment:$('#rt').value,website:$('#rh').value})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw 0;
  msg.textContent=t(d.approved?'revThanks':'revPending');
  if(d.approved){R.unshift(d);loadFailed=false;drawR()}
  e.target.reset()
 }catch(err){msg.textContent=t('revErr')}
 btn.disabled=false};

/* ===== BANNER SLIDER (3 images + 1 animated "How to Order" 6s slide) =====
   Order: Slide 0 = image, Slide 1 = image, Slide 2 = How to Order (6s animation), Slide 3 = image
   - Image slides auto-advance after 3 seconds
   - "How to Order" slide runs the 4-step animation over 6 seconds, then auto-advances
   - Clicking the banner (not buttons/links) slides to the next one
   - Hovering pauses; leaving resumes
===== */
const sl=$$('.slide'),N=sl.length;
const ORDER_SLIDE_IDX=2;   // 0-based index of the animated order slide (3rd slide)
const SLIDE_MS=3000;       // milliseconds each IMAGE slide stays visible
const ORDER_MS=6000;       // 6 seconds for the order sequence
let k=0,tm=null,osTimer=null,osStart=0,osElapsed=0,osPaused=false;

$('#dots').innerHTML=sl.map((_,i)=>`<button data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('');
function clearTimer(){clearInterval(tm);tm=null}
function startImageTimer(){clearTimer();tm=setInterval(()=>go(k+1),SLIDE_MS)}

/* --- 6-Second Interactive Order Animation Controller --- */
function setOrderStep(s){
 $$('.os-step').forEach(el=>el.classList.toggle('is-active',+el.dataset.step===s));
 for(let i=1;i<=4;i++){
  const sc=$('#osScene'+i);
  if(sc)sc.classList.toggle('is-active',i===s);
 }
 const cursor=$('#osCursor'),fly=$('#osFlySweet'),badge=$('#osBadgeCnt');
 if(s===1){
  if(badge)badge.textContent='0';
  if(fly){fly.style.opacity='0';fly.style.transform='translate(0, 0)';}
  if(cursor){
   cursor.style.opacity='1';cursor.style.top='190px';cursor.style.left='190px';
   cursor.classList.remove('clicking');
   setTimeout(()=>{if(cursor)cursor.classList.add('clicking');},400);
   setTimeout(()=>{if(cursor)cursor.classList.remove('clicking');},750);
  }
 }else if(s===2){
  if(cursor){
   cursor.style.opacity='1';cursor.style.top='225px';cursor.style.left='160px';
   cursor.classList.add('clicking');
   setTimeout(()=>{if(cursor)cursor.classList.remove('clicking');},350);
  }
  if(fly){
   fly.style.opacity='1';fly.style.left='140px';fly.style.top='180px';
   requestAnimationFrame(()=>{
    fly.style.transform='translate(130px, -145px) scale(0.4)';
    fly.style.opacity='0.2';
   });
  }
  setTimeout(()=>{
   if(badge){badge.textContent='5';badge.classList.add('bump');setTimeout(()=>{if(badge)badge.classList.remove('bump');},300);}
  },500);
 }else if(s===3){
  if(cursor){
   cursor.style.opacity='1';cursor.style.top='240px';cursor.style.left='180px';
   cursor.classList.add('clicking');
   setTimeout(()=>{if(cursor)cursor.classList.remove('clicking');},400);
  }
 }else if(s===4){
  if(cursor)cursor.style.opacity='0';
 }
}

function stopOrderSlide(){
 if(osTimer){cancelAnimationFrame(osTimer);osTimer=null;}
 const bar=$('#osBar');if(bar)bar.style.width='0%';
 const cursor=$('#osCursor');if(cursor)cursor.style.opacity='0';
 const fly=$('#osFlySweet');if(fly){fly.style.opacity='0';fly.style.transform='translate(0, 0)';}
}

function runOrderSlide(){
 stopOrderSlide();
 osStart=performance.now();
 osElapsed=0;
 osPaused=false;
 setOrderStep(1);

 function tick(now){
  if(!osPaused){
   osElapsed=now-osStart;
   const progress=Math.min(100,(osElapsed/ORDER_MS)*100);
   const bar=$('#osBar');if(bar)bar.style.width=progress+'%';

   if(osElapsed<1500){
    // step 1
   }else if(osElapsed<3000){
    const sc2=$('#osScene2');if(sc2&&!sc2.classList.contains('is-active'))setOrderStep(2);
   }else if(osElapsed<4500){
    const sc3=$('#osScene3');if(sc3&&!sc3.classList.contains('is-active'))setOrderStep(3);
   }else if(osElapsed<ORDER_MS){
    const sc4=$('#osScene4');if(sc4&&!sc4.classList.contains('is-active'))setOrderStep(4);
   }else{
    go(k+1);
    return;
   }
  }
  osTimer=requestAnimationFrame(tick);
 }
 osTimer=requestAnimationFrame(tick);
}

function pauseOrderSlide(){osPaused=true;}
function resumeOrderSlide(){if(osPaused){osStart=performance.now()-osElapsed;osPaused=false;}}

// Allow user to click any step on the left to immediately inspect that step
const stepper=$('#osStepper');
if(stepper){
 stepper.onclick=e=>{
  const stp=e.target.closest('.os-step');
  if(!stp)return;
  stopOrderSlide();
  const s=+stp.dataset.step;
  setOrderStep(s);
  const bar=$('#osBar');if(bar)bar.style.width=(s*25)+'%';
 };
}

function go(i){
 k=(i+N)%N;
 $('#track').style.transform=`translateX(-${k*100}%)`;
 $$('#dots button').forEach((d,j)=>d.classList.toggle('on',j===k));
 if(k===ORDER_SLIDE_IDX){
  clearTimer();
  runOrderSlide();
 }else{
  stopOrderSlide();
  startImageTimer();
 }
}

$('.hero').addEventListener('click',e=>{if(!e.target.closest('.arr, #dots, .btn, .os-step'))go(k+1)});
$('.hero').onmouseenter=()=>{
 clearTimer();
 if(k===ORDER_SLIDE_IDX)pauseOrderSlide();
};
$('.hero').onmouseleave=()=>{
 if(k===ORDER_SLIDE_IDX)resumeOrderSlide();
 else startImageTimer();
};
$('#prev').onclick=()=>go(k-1);
$('#next').onclick=()=>go(k+1);
$('#dots').onclick=e=>e.target.dataset.i&&go(+e.target.dataset.i);
go(0);

/* ===== MENU + LOADER ===== */
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
$('#nav').onclick=()=>$('#nav').classList.remove('open');
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('off'),1400));

hooks.push(drawGrid,drawCart,drawBox,drawStories,drawR);
loadR();
}

/* ===== STORE LOCATIONS PAGE (stores.html) =====
   Add one line per store. "q" = the address Google Maps should find.
   For a pin that is exactly right: open your shop in Google Maps > Share > Embed a map > copy the src="..." link
   and paste it as  embed:'...'  ; and paste the normal Share link as  link:'...'  (both optional). */
const STORES=[
 {nameKey:'mainStore',q:'859/B/1, Thumpaliya,waligampitiya, Ja-Ela, Sri Lanka',phone:'+94 77 3636 717', embed:'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.46773521285834!2d79.89899173996967!3d7.06977258539532!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f0b524956dc5%3A0x311fe8ea9d036c0a!2s3V9X%2BWJ4%2C%20St%20Rita%20Ave%2C%20Ja-Ela!5e0!3m2!1sen!2slk!4v1795704742766!5m2!1sen!2slk', link:'https://www.google.com/maps/place/3V9X%2BWJ4%2C+St+Rita+Ave,+Ja-Ela/@7.0697726,79.8989917,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae2f0b524956dc5:0x311fe8ea9d036c0a!8m2!3d7.0697726!4d79.9011804!16s%2Fg%2F11c5qj_9k9'}
 // ,{name:'Second Store',q:'Address of second store',phone:'+94 ...',embed:'',link:''}
];
if($('#stlist')){
 const drawStores=()=>{$('#stlist').innerHTML=STORES.map(s=>{
  const nm=s.nameKey?t(s.nameKey):s.name,
   embed=s.embed||'https://www.google.com/maps?q='+encodeURIComponent(s.q)+'&output=embed&hl='+cur,
   link=s.link||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.q);
  return `<article class="store"><div><h3>${esc(nm)}</h3><p>📍 ${esc(s.q)}</p><p>📞 <a href="tel:${esc(s.phone.replace(/\s/g,''))}">${esc(s.phone)}</a></p><p>🕒 ${esc(t('hours'))}</p><a class="btn" href="${esc(link)}" target="_blank" rel="noopener">${esc(t('getDir'))}</a></div><iframe src="${esc(embed)}" title="${esc(nm)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></article>`}).join('')};
 hooks.push(drawStores);
}

/* ===== LANGUAGE SWITCH (both pages) + HEADER HEIGHT ===== */
$('#lang').onchange=e=>setLang(e.target.value);
setLang(LS.getItem('lang')||'en');

const setH=()=>document.documentElement.style.setProperty('--hh',$('#hdr').offsetHeight+'px');
setH();addEventListener('resize',setH);addEventListener('load',setH);