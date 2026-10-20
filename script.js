const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const R=document.documentElement;
/* data */
const makes="Aston Martin,Audi,Bentley,BMW,Buick,Cadillac,Chevrolet,Chrysler,Dodge,Ferrari,Ford,GMC,Honda,Hummer,Hyundai,Infiniti,Jaguar,Jeep,Kia,Lamborghini,Land Rover,Lexus,Maserati,Maybach,Mazda,Mercedes,Mini cooper,Mitsubishi,Nissan,Pontiac Bonneville,Porsche,Rolls-Royce,Saab,Smart,Subaru,Suzuki,Toyota,Volkswagen,Volvo".split(",");
makes.forEach(m=>$("#make").add(new Option(m,m)));
for(let y=2026;y>=1990;y--)$("#year").add(new Option(y,y));
const brands="ToyoTires,Primewell,Deestone,Altenzo,Seha Tires,Boliden,Runway,HPA,Chicago Pneumatic,Yacco,Xtra Rev,Ken-Tool,Exide,Bendix,JP,DHC,HK,PDW,Trane,Globe-x".split(",");
const slug=b=>b.toLowerCase().replace(/ /g,"-").replace("toyotires","toyotires").replace("ken-tool","kentool");
$("#tr").innerHTML=brands.map(b=>`<a class="brand" target="_blank" rel="noopener" href="https://www.hateco.com.lb/category/brands/${slug(b)}">${b}</a>`).join("");
const prods=[["","Tires","tires","Toyo Tires,GITI,Primewell,Deestone,Runway,Seha,Altenzo,Minerva,Double Happiness"],["","Wheels","wheels","Globex,PDW,Maxxion,Owrun"],["","Batteries","batteries","Boliden,Exide,Trane,Globex,JP,Freedom,Craft,DF,Hagen"],["","Lubricants","lubricants","Yacco,Globex,Bendix,XREV,Magnum"],["","Garage Equipment","garage-equipment","HPA,DHC,Ken-tools,COMEC,Chicago Pneumatic"],["","Accessories","accessories",""]];
$("#pg").innerHTML=prods.map(p=>`<a class="card rv" href="https://www.hateco.com.lb/category/products/${p[2]}"><h3 data-i18n="${p[1]}">${p[1]}</h3><div class="chips">${p[3].split(",").filter(Boolean).map(x=>`<i>${x}</i>`).join("")}</div><p style="margin:14px 0 0"><span class="more" data-i18n="Read more">Read more →</span></p></a>`).join("");
$("#yr").textContent=new Date().getFullYear();
/* i18n (Arabic) */
const AR={"Social Links":"تابعنا","Home":"الرئيسية","About Us":"من نحن","Who We Are":"نبذة عنا","Vision & Mission":"الرؤية والرسالة","Services":"الخدمات","Wheel Alignment":"ضبط زوايا العجلات","Wheel Balancing":"موازنة العجلات","Free BTW Health Check":"فحص BTW المجاني (البطارية والإطار والعجلة)","Products":"المنتجات","Tires":"الإطارات","Wheels":"الجنوط","Batteries":"البطاريات","Lubricants":"زيوت التشحيم","Garage Equipment":"معدات الكراجات","Accessories":"الإكسسوارات","Dealers":"الوكلاء","Dealers Wanted":"مطلوب وكلاء","International Dealers Map":"خريطة الوكلاء الدوليين","Tips & Advice":"نصائح وإرشادات","Careers":"الوظائف","Contact Us":"اتصل بنا",
"Since 1970 • Tripoli, Lebanon":"منذ 1970 • طرابلس، لبنان","Lebanon’s key importer of tires, batteries, wheels, lubes":"من أبرز مستوردي الإطارات والبطاريات والجنوط والزيوت في لبنان","and your one stop for all your auto needs and services":"ووجهتك الواحدة لكل احتياجات سيارتك وخدماتها","Choose Your Tire":"اختر إطارك","Make":"الشركة المصنعة","Year":"السنة","Model":"الطراز","Car Type":"نوع السيارة","Schedule Appointment":"احجز موعداً","Schedule an Appointment":"حجز موعد","appt":"احجز موعداً وسنتواصل معك لتأكيد التفاصيل.","Name":"الاسم","Phone Number":"رقم الهاتف","Message":"الرسالة","Send Request":"إرسال الطلب","Our Brands":"علاماتنا التجارية",
"p1":"تأسست مؤسسة حمد عجاج التجارية عام 1970 على يد حمد عجاج باسم «حمد عجاج للتجارة وأولاده» للترويج للإطارات والبطاريات في طرابلس، لبنان.","p2":"تطورت الشركة على مر السنين لتحمل في عام 2001 اسمها الجديد: HATECO S.A.R.L. وتدير اليوم ثلاثة فروع ومقراً رئيسياً واحداً لخدمة عملائها بكفاءة، وأصبحت من أبرز المستوردين والموزعين الحصريين لأفضل العلامات العالمية في مجال الإطارات والبطاريات والجنوط وزيوت التشحيم وسائر منتجات السيارات.","p3":"كما توسعت هاتيكو وافتتحت في عام 2013 ورشة جديدة مجهزة بأحدث التقنيات والمعدات لتقديم خدمات سيارات جديدة لقطاع التجزئة. وقد خدمت هاتيكو السائقين في لبنان والدول المجاورة لأكثر من 40 عاماً بمستوى خدمة متميز، ومنتجات عالية الجودة، وتسليم في الوقت المناسب، وأسعار منافسة.","p4":"<b>العلامات العالمية:</b> Primewell, Deestone, Runway, GT Radial, Accelera, Boliden, Victorite, Globex wheels, Globex Lubricants<br><b>ISO-9001:2008</b> — «وكلاء وموزعون وتجار الإطارات والبطاريات والجنوط وزيوت التشحيم»، صادرة عن Bureau Veritas وUKAS Management Systems.",
"Founded in Tripoli":"التأسيس في طرابلس","HATECO S.A.R.L is born":"ولادة HATECO S.A.R.L","New Workshop opens":"افتتاح ورشة جديدة","Years serving motorists":"سنة في خدمة السائقين","Read more":"اقرأ المزيد ←","Vision":"الرؤية","Mission":"الرسالة","vis":"رؤيتنا أن نكون المزوّد الأول لجميع منتجات السيارات في لبنان ومنطقة الشرق الأوسط وشمال أفريقيا.","mis":"رسالتنا أن نجلب أفضل منتجات السيارات من حول العالم ونوزعها على الناس في لبنان ومنطقة الشرق الأوسط وشمال أفريقيا.","deal":"لدينا وكلاء في جميع أنحاء لبنان، لمزيد من المعلومات اتصل بنا على:","Newsletter":"النشرة الإخبارية","Email":"البريد الإلكتروني","Subscribe":"اشترك","Headquarter":"المقر الرئيسي","a1":"الميناء، مرفأ طرابلس، ص.ب 1033","Tripoli, Maarad":"طرابلس، المعرض","a2":"المعرض، شارع فاضل مقدم، بناية عطرش وكبارة","Tripoli, Tebbeneh":"طرابلس، التبانة","a3":"شارع سوريا، قبل بنك FLB بـ 10 أمتار","Minieh, Akkar":"المنية، عكار","a4":"أوتوستراد المنية، مقابل مخبز البيادر","All rights are reserved":"جميع الحقوق محفوظة"};
const MSG={en:{pick:"Please choose a make first.",ok:"Thanks! Complete the form below and we will contact you to confirm your appointment.",ap:"Thank you! Your appointment request has been sent. We will contact you shortly.",apx:"Please complete all fields with a valid phone number and email.",em:"Please enter a valid email.",sub:"Subscribed — thank you!"},ar:{pick:"يرجى اختيار الشركة المصنعة أولاً.",ok:"شكراً لك! أكمل النموذج أدناه وسنتواصل معك لتأكيد موعدك.",ap:"شكراً لك! تم إرسال طلب الموعد وسنتواصل معك قريباً.",apx:"يرجى تعبئة جميع الحقول برقم هاتف وبريد إلكتروني صحيحين.",em:"يرجى إدخال بريد إلكتروني صحيح.",sub:"تم الاشتراك — شكراً لك!"}};
let lang="en";
function setLang(l){lang=l;R.lang=l;R.dir=l=="ar"?"rtl":"ltr";$("#lang").textContent=l=="ar"?"English":"العربية";
$$("[data-i18n]").forEach(e=>{const k=e.dataset.i18n;if(e.dataset.en==null)e.dataset.en=e.innerHTML;e.innerHTML=l=="ar"&&AR[k]?AR[k]:e.dataset.en});
$$("[data-i18n-ph]").forEach(e=>{if(!e.dataset.en)e.dataset.en=e.placeholder;e.placeholder=l=="ar"?AR[e.dataset.i18nPh]:e.dataset.en});
$("#msg").textContent="";$("#nm").textContent="";$("#apm").textContent="";try{localStorage.setItem("hl",l)}catch(e){}}
$("#lang").onclick=()=>setLang(lang=="en"?"ar":"en");
/* theme */
const mq=matchMedia("(prefers-color-scheme:dark)");
function setTheme(t){R.dataset.theme=t;t=="light"?R.setAttribute("data-lt",""):R.removeAttribute("data-lt");try{localStorage.setItem("ht",t)}catch(e){}}
$("#theme").onclick=()=>setTheme(R.dataset.theme=="dark"?"light":"dark");
let st=null,sl=null;try{st=localStorage.getItem("ht");sl=localStorage.getItem("hl")}catch(e){}
setTheme(st||(mq.matches?"dark":"light"));if(sl=="ar")setLang("ar");
/* nav */
$("#bg").onclick=()=>$("#nv").classList.toggle("o");
$$("nav .has>a").forEach(a=>a.addEventListener("click",e=>{if(innerWidth<=980){const li=a.parentElement;if(!li.classList.contains("open")){e.preventDefault();$$("nav li.open").forEach(x=>x.classList.remove("open"));li.classList.add("open")}}}));
$$("nav a[href^='#']").forEach(a=>a.addEventListener("click",()=>$("#nv").classList.remove("o")));
addEventListener("scroll",()=>{$("#hd").classList.toggle("s",scrollY>20);$("#up").classList.toggle("v",scrollY>600)});
$("#up").onclick=()=>scrollTo({top:0});
/* carousel */
const tr=$("#tr");$("#nx").onclick=()=>tr.scrollBy({left:360*(lang=="ar"?-1:1)});$("#pv").onclick=()=>tr.scrollBy({left:-360*(lang=="ar"?-1:1)});
/* finder + steps */
$("#finder").onsubmit=e=>{e.preventDefault();const mk=$("#make").value;$("#msg").textContent=mk?MSG[lang].ok:MSG[lang].pick;if(!mk)return;const d=[mk,$("#model").value,$("#year").value,$("#type").value].filter(Boolean).join(" ");if(!$("#am").value)$("#am").value=(lang=="ar"?"أرغب في حجز موعد لإطارات سيارة: ":"I would like an appointment for tires for: ")+d;$("#appointment").scrollIntoView({behavior:"smooth"})};
/* NOTE: connect this form to a real endpoint (e.g. Formspree) to receive requests */
$("#ap").onsubmit=e=>{e.preventDefault();const ok=$("#an").value.trim()&&/^[+\d][\d\s()-]{6,}$/.test($("#aph").value.trim())&&/^\S+@\S+\.\S+$/.test($("#ae").value)&&$("#am").value.trim();$("#apm").textContent=ok?MSG[lang].ap:MSG[lang].apx;if(ok)e.target.reset()};
$("#nl").onsubmit=e=>{e.preventDefault();$("#nm").textContent=/^\S+@\S+\.\S+$/.test($("#em").value)?MSG[lang].sub:MSG[lang].em};
/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
$$(".rv").forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;const e=x.target,n=+e.dataset.c,s=e.dataset.s||"",f=n>100?n-60:0,t0=performance.now();
(function f1(t){const p=Math.min((t-t0)/1400,1);e.textContent=Math.round(f+(n-f)*p)+(p==1?s:"");if(p<1)requestAnimationFrame(f1)})(t0);co.unobserve(e)}),{threshold:.6});
$$("[data-c]").forEach(e=>co.observe(e));
