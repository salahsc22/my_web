document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize animation effects
  initAnimations();
  
  // Add field section hover effects
  addFieldHoverEffects();
  
  // Field click handlers
  document.querySelectorAll('.field').forEach(field => {
    field.addEventListener('click', () => {
      const detailsSection = document.getElementById('details');
      const fieldData = field.getAttribute('data-field');

      // Animate section transitions
      fadeOutSections(function() {
        // Update content
        updateContentBasedOnField(fieldData, detailsSection);
        
        // Show details with animation
        detailsSection.style.display = 'block';
        detailsSection.classList.add('animated');
        
        // Scroll to details section
        smoothScrollTo(detailsSection);
      });
    });
  });

  // Navigation buttons handlers with smooth transitions
  document.getElementById('fields-btn').addEventListener('click', () => {
    fadeOutSections(function() {
      document.getElementById('fields-section').style.display = 'flex';
      document.getElementById('fields-section').classList.add('animated');
      document.getElementById('details').style.display = 'none';
      document.getElementById('faq-section').style.display = 'none';
      document.getElementById('resources-section').style.display = 'none';
    });
  });

  document.getElementById('faq-btn').addEventListener('click', () => {
    fadeOutSections(function() {
      document.getElementById('fields-section').style.display = 'none';
      document.getElementById('details').style.display = 'none';
      document.getElementById('faq-section').style.display = 'block';
      document.getElementById('faq-section').classList.add('animated');
      document.getElementById('resources-section').style.display = 'none';
    });
  });

  document.getElementById('resources-btn').addEventListener('click', () => {
    fadeOutSections(function() {
      document.getElementById('fields-section').style.display = 'none';
      document.getElementById('details').style.display = 'none';
      document.getElementById('faq-section').style.display = 'none';
      document.getElementById('resources-section').style.display = 'block';
      document.getElementById('resources-section').classList.add('animated');
    });
  });

  // Initialize cursor effect for dynamic background
  initCursorEffect();
  
  // Initialize the page when it's fully loaded
  window.addEventListener('load', function() {
    // Set up loading bar
    initLoadingBar();
    
    // Initialize FAQ interactions
    initFaqItems();
    
    // Initialize resource filtering
    initResourceFiltering();
    
    // Initialize back-to-top button
    initBackToTop();
    
    // Initialize theme switcher
    initThemeSwitch();
    
    // Initialize Roadmap interactions
    initRoadmapInteractions();
    
    // Add animation class to body for loaded state
    document.body.classList.add('page-loaded');
  });
});

// Animation initialization
function initAnimations() {
  // Add fade-in animation to elements
  document.querySelectorAll('.field, header, nav, footer').forEach(elem => {
    elem.classList.add('animated');
  });
  
  // Add staggered animation to fields
  const fields = document.querySelectorAll('.field');
  fields.forEach((field, index) => {
    field.style.animationDelay = `${index * 0.1}s`;
  });
}

// Add hover effects to field sections
function addFieldHoverEffects() {
  const fields = document.querySelectorAll('.field');
  
  fields.forEach(field => {
    field.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) translateZ(20px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    });
    
    field.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

// Fade out sections with callback
function fadeOutSections(callback) {
  const sections = document.querySelectorAll('.fields, .details, .faq, .resources');
  let animCount = 0;
  let totalAnims = 0;
  
  sections.forEach(section => {
    if (section.style.display !== 'none') {
      totalAnims++;
      section.style.opacity = '0';
      section.style.transform = 'translateY(-20px)';
      section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        animCount++;
        if (animCount >= totalAnims && callback) {
          sections.forEach(s => {
            s.style.opacity = '1';
            s.style.transform = 'translateY(0)';
          });
          callback();
        }
      }, 300);
    }
  });
  
  if (totalAnims === 0 && callback) {
    callback();
  }
}

// Smooth scroll to element
function smoothScrollTo(element) {
  const yOffset = -80; 
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

// Initialize cursor effect for dynamic background
function initCursorEffect() {
  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.setProperty('--mouse-x', `${x * 100}%`);
    document.body.style.setProperty('--mouse-y', `${y * 100}%`);
    
    // Subtle tilt effect on fields
    const fields = document.querySelectorAll('.field');
    fields.forEach(field => {
      const fieldRect = field.getBoundingClientRect();
      const fieldX = fieldRect.left + fieldRect.width / 2;
      const fieldY = fieldRect.top + fieldRect.height / 2;
      
      const deltaX = (e.clientX - fieldX) / (window.innerWidth / 2) * 5;
      const deltaY = (e.clientY - fieldY) / (window.innerHeight / 2) * 5;
      
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        field.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.05, 1.05, 1.05)`;
      }
    });
  });
}

// Update content based on field selection with enhanced details
function updateContentBasedOnField(fieldData, detailsSection) {
  let content = '';
  
  switch (fieldData) {
    case 'embedded':
      content = `
          <h2>الأنظمة المضمّنة (Embedded Systems)</h2>
          
          <div class="field-description">
            هي أنظمة كمبيوتر مصممة لأداء وظائف محددة داخل نظام أكبر. الهندسة المضمنة تجمع بين علوم الكمبيوتر والهندسة الإلكترونية لتصميم وبرمجة أجهزة تتفاعل مع البيئة المحيطة.
          </div>
          
          <h3>المبتدئ:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>Microcontroller:</strong> مثل Arduino و ESP32 و Raspberry Pi Pico، وهي وحدات معالجة مدمجة تتحكم في عمليات الأجهزة.</li>
            <li><strong>Microprocessor:</strong> مثل Raspberry Pi، وهي وحدات معالجة قوية تدعم أنظمة تشغيل كاملة.</li>
            <li><strong>ADC/DAC:</strong> تحويل الإشارات التناظرية إلى رقمية والعكس، ضروري للتفاعل مع المستشعرات.</li>
            <li><strong>PWM:</strong> لتغيير الجهد أو السرعة، يستخدم للتحكم في المحركات والإضاءة وغيرها.</li>
            <li><strong>GPIO:</strong> منافذ دخل/خرج للاتصال مع الأجهزة الخارجية.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع مبتدئ: نظام إضاءة ذكي يتفاعل مع حركة المستخدم باستخدام Arduino.</li>
            <li>مشروع مبتدئ: محطة طقس بسيطة تعرض درجة الحرارة والرطوبة على شاشة LCD.</li>
            <li>مشروع مبتدئ: نظام ري أوتوماتيكي للنباتات يعتمد على قراءات رطوبة التربة.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>Arduino IDE: بيئة تطوير متكاملة لبرمجة أجهزة Arduino.</li>
            <li>PlatformIO: إطار عمل متقدم لتطوير أنظمة مضمنة يدعم العديد من الأجهزة.</li>
            <li>Fritzing: برنامج لتصميم الدوائر الإلكترونية.</li>
          </ul>
          
          <h3>المتوسط:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>UART/I2C/SPI:</strong> بروتوكولات اتصال لتوصيل الأجهزة ببعضها البعض، لكل منها استخدامات محددة.</li>
            <li><strong>Interrupts:</strong> آلية لتوقف الكود مؤقتًا عند حدوث حدث مهم، مهمة للاستجابة السريعة للأحداث.</li>
            <li><strong>Real-Time Systems:</strong> أنظمة تستجيب للأحداث في وقت محدد مسبقًا.</li>
            <li><strong>Embedded Linux:</strong> إصدارات مصغرة من لينكس للأنظمة المضمنة.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متوسط: نظام تحكم في منزل ذكي يدعم التحكم في الإضاءة والتكييف والأمان.</li>
            <li>مشروع متوسط: روبوت متحرك يتفادى العقبات ويتتبع المسارات.</li>
            <li>مشروع متوسط: محطة مراقبة بيئية متصلة بالإنترنت لجمع وتحليل البيانات.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>FreeRTOS: نظام تشغيل في الوقت الحقيقي للأنظمة المضمنة.</li>
            <li>Wireshark: لتحليل بروتوكولات الشبكة.</li>
            <li>JTAG/SWD: أدوات تصحيح الأخطاء للأنظمة المضمنة.</li>
          </ul>
          
          <h3>المتقدم:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>Bootloader:</strong> البرنامج الأول الذي يشغل الجهاز ويمهد لتشغيل البرامج الرئيسية.</li>
            <li><strong>Firmware:</strong> البرنامج الذي يعمل داخل الميكروكنترولر ويتحكم في وظائفه الأساسية.</li>
            <li><strong>RTOS:</strong> نظام تشغيل خفيف للميكروكنترولر يسمح بتنفيذ مهام متعددة.</li>
            <li><strong>Hardware Security:</strong> تقنيات حماية الأجهزة من الهجمات الإلكترونية.</li>
            <li><strong>Low-power Design:</strong> تقنيات تصميم أنظمة ذات استهلاك منخفض للطاقة.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متقدم: نظام إدارة طاقة ذكي للمباني مع تحليلات متقدمة للبيانات.</li>
            <li>مشروع متقدم: تطوير جهاز طبي محمول للمراقبة المستمرة للمؤشرات الحيوية.</li>
            <li>مشروع متقدم: نظام تنبؤ بالفيضانات باستخدام شبكة من المستشعرات.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>STM32CubeIDE: بيئة تطوير لميكروكنترولرات STM32.</li>
            <li>Keil uVision: بيئة تطوير احترافية لأنظمة ARM.</li>
            <li>Embedded Rust: لغة برمجة آمنة للأنظمة المضمنة.</li>
          </ul>
          
          <div class="career-paths">
            <h4>مسارات العمل:</h4>
            <ul>
              <li>مهندس تطوير أنظمة مضمنة</li>
              <li>مصمم دوائر إلكترونية</li>
              <li>مطور برمجيات أنظمة مضمنة</li>
              <li>مهندس روبوتات</li>
            </ul>
          </div>
        `;
      break;

    case 'networking':
      content = `
          <h2>الشبكات والاتصالات (Networking & Communication)</h2>
          
          <div class="field-description">
            مجال الشبكات يختص بتصميم وإدارة أنظمة الاتصال التي تربط الأجهزة مع بعضها. يشمل هذا المجال كل شيء من شبكات المنزل البسيطة إلى بنية الإنترنت العالمية.
          </div>
          
          <h3>المبتدئ:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>IP Address:</strong> عنوان الجهاز على الشبكة، يشبه العنوان البريدي للجهاز.</li>
            <li><strong>MAC Address:</strong> عنوان فريد ثابت لكل كارت شبكة، لا يمكن تغييره عادةً.</li>
            <li><strong>DHCP:</strong> بروتوكول يوزع عناوين IP أوتوماتيكيًا على الأجهزة المتصلة.</li>
            <li><strong>Subnetting:</strong> تقسيم الشبكة إلى شبكات فرعية لتحسين الأداء والأمان.</li>
            <li><strong>LAN/WAN:</strong> شبكات محلية وواسعة النطاق، من منازل وشركات إلى مدن وقارات.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع مبتدئ: إعداد شبكة منزلية آمنة مع إعدادات متقدمة.</li>
            <li>مشروع مبتدئ: تصميم شبكة صغيرة للشركات باستخدام Packet Tracer.</li>
            <li>مشروع مبتدئ: إعداد VPN لربط فروع افتراضية لشركة.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>Cisco Packet Tracer: محاكي شبكات للتدريب وتصميم الشبكات.</li>
            <li>Wireshark: أداة تحليل حركة بيانات الشبكة.</li>
            <li>GNS3: محاكي شبكات متقدم يدعم أجهزة متعددة.</li>
          </ul>
          
          <h3>المتوسط:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>DNS:</strong> نظام يحوّل أسماء النطاقات (مثل google.com) إلى عناوين IP.</li>
            <li><strong>HTTP/HTTPS:</strong> بروتوكولات لنقل البيانات عبر الويب، الأخير يوفر تشفيرًا للبيانات.</li>
            <li><strong>TCP/UDP:</strong> بروتوكولات نقل البيانات، الأول موثوق والثاني سريع.</li>
            <li><strong>Routing Protocols:</strong> مثل OSPF و BGP، تحدد كيفية تحديد المسارات بين الشبكات.</li>
            <li><strong>Firewall:</strong> جدار حماية لمنع الوصول غير المصرح به للشبكة.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متوسط: بناء نظام مراقبة شبكات باستخدام أدوات مفتوحة المصدر.</li>
            <li>مشروع متوسط: إعداد خادم ويب آمن مع HTTPS وإعدادات الأمان المتقدمة.</li>
            <li>مشروع متوسط: تصميم وتنفيذ بنية شبكة موزعة عالية التوافر.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>pfSense: نظام جدار حماية مفتوح المصدر.</li>
            <li>Nagios/Zabbix: أدوات مراقبة الشبكات.</li>
            <li>Docker: لتشغيل خدمات الشبكة في حاويات منعزلة.</li>
          </ul>
          
          <h3>المتقدم:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>Software-Defined Networking (SDN):</strong> فصل تحكم الشبكة عن أجهزة توجيه البيانات.</li>
            <li><strong>Network Function Virtualization (NFV):</strong> تشغيل وظائف الشبكة كبرمجيات بدلاً من الأجهزة.</li>
            <li><strong>Zero Trust Security:</strong> نموذج أمان لا يثق في أي عنصر داخل أو خارج الشبكة.</li>
            <li><strong>5G Networks:</strong> الجيل الخامس من شبكات الاتصالات اللاسلكية.</li>
            <li><strong>Network Automation:</strong> أتمتة إدارة الشبكات باستخدام أدوات مثل Ansible و Terraform.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متقدم: بناء نظام كشف وحماية من التهديدات (IDS/IPS) مخصص.</li>
            <li>مشروع متقدم: تصميم وتنفيذ حل SD-WAN لربط فروع شركة.</li>
            <li>مشروع متقدم: تطوير نظام أتمتة شبكات يعتمد على الذكاء الاصطناعي للتنبؤ بالمشاكل.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>OpenStack: منصة سحابية مفتوحة المصدر.</li>
            <li>Ansible/Terraform: أدوات لأتمتة إدارة البنية التحتية.</li>
            <li>Elasticsearch Stack: تحليلات متقدمة لبيانات الشبكة.</li>
          </ul>
          
          <div class="career-paths">
            <h4>مسارات العمل:</h4>
            <ul>
              <li>مهندس شبكات</li>
              <li>مهندس أمن شبكات</li>
              <li>مهندس بنية تحتية سحابية</li>
              <li>مصمم حلول SD-WAN</li>
            </ul>
          </div>
        `;
      break;

      case 'iot':
        content = `
          <h2>إنترنت الأشياء (IoT)</h2>
          
          <div class="field-description">
            مجال إنترنت الأشياء يركز على ربط الأجهزة المادية بالإنترنت وببعضها البعض، مما يسمح لها بجمع البيانات وتبادلها وتنفيذ إجراءات ذكية.
          </div>
          
          <h3>المبتدئ:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>IoT:</strong> ربط الأجهزة المادية بالإنترنت لتبادل البيانات والتحكم عن بعد.</li>
            <li><strong>MQTT Protocol:</strong> بروتوكول خفيف الوزن للاتصال بين الأجهزة مثالي للاتصال بين أجهزة IoT.</li>
            <li><strong>Firebase:</strong> قاعدة بيانات سحابية سهلة الاستخدام للتخزين ومزامنة البيانات في الوقت الفعلي.</li>
            <li><strong>ESP8266/ESP32:</strong> رقاقات Wi-Fi منخفضة التكلفة شائعة في مشاريع IoT.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع مبتدئ: نظام ري نباتات ذكي يعتمد على قراءات رطوبة التربة الفعلية.</li>
            <li>مشروع مبتدئ: محطة طقس منزلية تعرض البيانات على تطبيق موبايل بسيط.</li>
            <li>مشروع مبتدئ: جهاز مراقبة جودة الهواء الداخلي مع تنبيهات.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>Node-RED: أداة تصميم مرئية لربط أجهزة IoT وواجهات المستخدم.</li>
            <li>Firebase: قاعدة بيانات سحابية ونظام مصادقة.</li>
            <li>Blynk: منصة لإنشاء تطبيقات IoT بسرعة.</li>
          </ul>
          
          <h3>المتوسط:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>MQTT Broker:</strong> سيرفر وسيط يستقبل ويرسل رسائل MQTT بين الأجهزة المختلفة.</li>
            <li><strong>Cloud Computing:</strong> استخدام موارد الحوسبة السحابية لتخزين ومعالجة بيانات IoT.</li>
            <li><strong>Edge Computing:</strong> معالجة البيانات على الجهاز أو بالقرب منه بدلًا من إرسالها إلى السحابة.</li>
            <li><strong>LoRaWAN:</strong> تقنية اتصال منخفضة الطاقة ومدى طويل للأجهزة البعيدة.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متوسط: نظام مراقبة استهلاك الطاقة المنزلية مع تحليلات متقدمة.</li>
            <li>مشروع متوسط: منصة إدارة متكاملة لأجهزة المنزل الذكي.</li>
            <li>مشروع متوسط: شبكة مستشعرات زراعية لمراقبة المحاصيل وظروف النمو.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>AWS IoT: منصة سحابية متكاملة لتطبيقات إنترنت الأشياء.</li>
            <li>Google Cloud IoT: حلول سحابية لإدارة الأجهزة وتحليل البيانات.</li>
            <li>Mosquitto: وسيط MQTT مفتوح المصدر.</li>
            <li>InfluxDB/Grafana: لتخزين وعرض بيانات المستشعرات.</li>
          </ul>
          
          <h3>المتقدم:</h3>
          <h4>المفاهيم الأساسية:</h4>
          <ul>
            <li><strong>OTA Updates:</strong> تحديث برامج الأجهزة عن بُعد بدون توصيل مادي.</li>
            <li><strong>تحليل البيانات الضخمة:</strong> معالجة كميات كبيرة من بيانات المستشعرات لاستخراج رؤى قيمة.</li>
            <li><strong>Digital Twin:</strong> نموذج رقمي للأنظمة المادية يسمح بالمحاكاة والتنبؤ.</li>
            <li><strong>IoT Security:</strong> حلول أمان متقدمة لحماية أجهزة وبيانات إنترنت الأشياء.</li>
          </ul>
          <h4>المشاريع المقترحة:</h4>
          <ul>
            <li>مشروع متقدم: نظام مدينة ذكية مصغر مع مراقبة حركة المرور والطاقة والأمان.</li>
            <li>مشروع متقدم: منصة صناعية للصيانة التنبؤية باستخدام تحليل البيانات والذكاء الاصطناعي.</li>
            <li>مشروع متقدم: نظام تتبع الأصول والمخزون في الوقت الفعلي للمستودعات.</li>
          </ul>
          <h4>الأدوات المستخدمة:</h4>
          <ul>
            <li>Kubernetes: لإدارة وتوسيع خدمات IoT.</li>
            <li>TensorFlow Lite: للذكاء الاصطناعي على أجهزة الحافة.</li>
            <li>Apache Kafka: لمعالجة تدفقات البيانات الضخمة.</li>
            <li>Blockchain: لتأمين المعاملات بين أجهزة IoT.</li>
          </ul>
          
          <div class="career-paths">
            <h4>مسارات العمل:</h4>
            <ul>
              <li>مهندس أنظمة IoT</li>
              <li>مطور تطبيقات الأجهزة المتصلة</li>
              <li>محلل بيانات إنترنت الأشياء</li>
              <li>مصمم حلول المدن الذكية</li>
            </ul>
          </div>
        `;
        break;
        
      case 'programming':
        content = `<!-- Content for programming section -->`;
        break;
        
      case 'cloud':
        content = `<!-- Content for cloud section -->`;
        break;
        
      case 'ai':
        content = `<!-- Content for AI section -->`;
        break;
  }
    
  // Add animation class
  detailsSection.innerHTML = content;
  
  // Add scroll behavior to links inside sections
  const links = detailsSection.querySelectorAll('a');
  links.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      });
    }
  });
  
  // Add interactive elements to the details section
  addInteractiveElements(detailsSection);
}

// Add interactive elements to sections
function addInteractiveElements(section) {
  // Add animation to list items
  const listItems = section.querySelectorAll('li');
  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.transitionDelay = `${index * 0.05}s`;
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100);
  });
  
  // Add animation to headings
  const headings = section.querySelectorAll('h2, h3, h4');
  headings.forEach((heading, index) => {
    heading.style.opacity = '0';
    heading.style.transform = 'translateY(-10px)';
    heading.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    heading.style.transitionDelay = `${index * 0.1}s`;
    
    setTimeout(() => {
      heading.style.opacity = '1';
      heading.style.transform = 'translateY(0)';
    }, 100);
  });
}

// Loading bar functionality
function initLoadingBar() {
  const loadingBar = document.getElementById('loading-bar');
  
  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingBar.style.opacity = '0';
      }, 300);
    } else {
      width += 5;
      loadingBar.style.width = width + '%';
    }
  }, 50);
}

// FAQ items functionality
function initFaqItems() {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearch = document.getElementById('faq-search-input');
  
  // Toggle FAQ items on click
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // FAQ search functionality
  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const searchTerm = faqSearch.value.toLowerCase();
      
      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question strong').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// Resource filtering functionality
function initResourceFiltering() {
  const categoryButtons = document.querySelectorAll('.resource-category');
  const resourceCards = document.querySelectorAll('.resource-card');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      // Filter resource cards
      resourceCards.forEach(card => {
        if (category === 'all') {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          const categories = card.getAttribute('data-categories').split(' ');
          
          if (categories.includes(category)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
}

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Theme switcher functionality
function initThemeSwitch() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      themeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const theme = button.getAttribute('data-theme');
      
      // Apply theme
      document.body.className = ''; // Reset classes
      document.body.classList.add('page-loaded');
      document.body.classList.add(`theme-${theme}`);
      
      // Apply different gradients based on theme
      if (theme === 'dark') {
        document.documentElement.style.setProperty('--primary-color', '#1a1a2e');
        document.documentElement.style.setProperty('--secondary-color', '#16213e');
        document.documentElement.style.setProperty('--accent-color', '#ff5722');
        document.documentElement.style.setProperty('--accent-color-2', '#e91e63');
      } else if (theme === 'contrast') {
        document.documentElement.style.setProperty('--primary-color', '#000000');
        document.documentElement.style.setProperty('--secondary-color', '#333333');
        document.documentElement.style.setProperty('--accent-color', '#ffeb3b');
        document.documentElement.style.setProperty('--accent-color-2', '#ffffff');
      } else {
        // Default theme - reset to original values
        document.documentElement.style.setProperty('--primary-color', '#007bff');
        document.documentElement.style.setProperty('--secondary-color', '#6a11cb');
        document.documentElement.style.setProperty('--accent-color', '#00ff99');
        document.documentElement.style.setProperty('--accent-color-2', '#00ccff');
      }
    });
  });
}

// Roadmap interactions
function initRoadmapInteractions() {
  const pathOptions = document.querySelectorAll('.path-option[data-field]');
  
  pathOptions.forEach(option => {
    option.addEventListener('click', () => {
      const fieldData = option.getAttribute('data-field');
      const field = document.querySelector(`.field[data-field="${fieldData}"]`);
      
      if (field) {
        // Simulate click on the field
        field.click();
        
        // Scroll to details section
        setTimeout(() => {
          const detailsSection = document.getElementById('details');
          if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    });
  });
}

// Main nav button clicks
document.getElementById('roadmap-btn').addEventListener('click', () => {
  fadeOutSections(function() {
    document.getElementById('fields-section').style.display = 'none';
    document.getElementById('details').style.display = 'none';
    document.getElementById('faq-section').style.display = 'none';
    document.getElementById('resources-section').style.display = 'none';
    document.getElementById('roadmap-section').style.display = 'block';
    document.getElementById('roadmap-section').classList.add('animated');
    document.getElementById('intro-section').style.display = 'none';
    
    // Update active button
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-btn'));
    document.getElementById('roadmap-btn').classList.add('active-btn');
  });
});

// Add intro-section handling to existing buttons
document.getElementById('fields-btn').addEventListener('click', () => {
  // Update active button
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-btn'));
  document.getElementById('fields-btn').classList.add('active-btn');
  
  // Show intro section
  document.getElementById('intro-section').style.display = 'block';
});

document.getElementById('faq-btn').addEventListener('click', () => {
  // Update active button
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-btn'));
  document.getElementById('faq-btn').classList.add('active-btn');
  
  // Hide intro section
  document.getElementById('intro-section').style.display = 'none';
});

document.getElementById('resources-btn').addEventListener('click', () => {
  // Update active button
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-btn'));
  document.getElementById('resources-btn').classList.add('active-btn');
  
  // Hide intro section
  document.getElementById('intro-section').style.display = 'none';
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});

function performSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase();
  
  if (searchTerm.trim() === '') return;
  
  // First check fields
  const fields = document.querySelectorAll('.field');
  let foundField = false;
  
  fields.forEach(field => {
    const fieldTitle = field.querySelector('h3').textContent.toLowerCase();
    const fieldBrief = field.querySelector('.field-brief').textContent.toLowerCase();
    
    if (fieldTitle.includes(searchTerm) || fieldBrief.includes(searchTerm)) {
      // Simulate click on the field
      field.click();
      foundField = true;
      return;
    }
  });
  
  if (foundField) return;
  
  // Check FAQs next
  const faqItems = document.querySelectorAll('.faq-item');
  let foundFaq = false;
  
  faqItems.forEach(item => {
    const questionText = item.querySelector('.faq-question strong').textContent.toLowerCase();
    const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
    
    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
      // Show FAQ section and scroll to the item
      document.getElementById('faq-btn').click();
      
      setTimeout(() => {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the search term
        item.classList.add('highlight');
        setTimeout(() => {
          item.classList.remove('highlight');
        }, 2000);
      }, 500);
      
      foundFaq = true;
      return;
    }
  });
  
  if (foundFaq) return;
  
  // Finally check resources
  const resourceCards = document.querySelectorAll('.resource-card');
  let foundResource = false;
  
  resourceCards.forEach(card => {
    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
    const cardDesc = card.querySelector('p').textContent.toLowerCase();
    
    if (cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm)) {
      // Show resources section and scroll to the card
      document.getElementById('resources-btn').click();
      
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the card
        card.classList.add('highlight');
        setTimeout(() => {
          card.classList.remove('highlight');
        }, 2000);
      }, 500);
      
      foundResource = true;
      return;
    }
  });
  
  if (!foundField && !foundFaq && !foundResource) {
    // Show no results message
    alert(`لم يتم العثور على نتائج لـ "${searchTerm}"`);
  }
}