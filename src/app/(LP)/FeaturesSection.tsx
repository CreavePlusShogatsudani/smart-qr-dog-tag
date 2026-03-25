'use client';
import { motion } from 'framer-motion';

const features = [
  {
    id: 0,
    number: '01',
    icon: 'ri-flashlight-line',
    title: 'スキャン即・飼い主に連絡',
    description: '発見者はアプリも登録も不要。QRをスキャンするだけで飼い主の連絡先が表示され、30秒以内に連絡が届きます。',
    detail: '従来の迷子札では電話番号が読めないケースも。LIENなら常に最新情報にアクセスでき、発見者の負担もゼロです。',
    image: 'https://readdy.ai/api/search-image?query=person%20scanning%20QR%20code%20on%20a%20pet%20collar%20with%20smartphone%2C%20dog%20and%20cat%20friendly%2C%20modern%20lifestyle%20photography%2C%20high%20quality&width=800&height=500&seq=feat01&orientation=landscape'
  },
  {
    id: 1,
    number: '02',
    icon: 'ri-alarm-warning-line',
    title: '緊急モードで最優先表示',
    description: '迷子になった際、緊急モードをONにすると発見者の画面に大きくSOSが表示され、スムーズな保護に繋がります。',
    detail: '緊急モード利用時は飼い主の連絡先が公開され、平均30秒で通知が届く仕組みになっています。',
    image: 'https://readdy.ai/api/search-image?query=smartphone%20screen%20showing%20emergency%20SOS%20alert%20for%20lost%20pet%2C%20bright%20red%20urgent%20display%2C%20clean%20minimal%20UI%20design&width=800&height=500&seq=feat02&orientation=landscape'
  },
  {
    id: 2,
    number: '03',
    icon: 'ri-user-star-line',
    title: '無制限のマルチペット管理',
    description: '1つのアカウントで犬・猫・その他ペットを何匹でも管理可能。複数頭飼いでも瞬時に情報を切り替えられます。',
    detail: 'ダッシュボードのスイッチ一つで、各ペット専用のQRコードや医療データにアクセスできます。',
    image: 'https://readdy.ai/api/search-image?query=two%20happy%20dogs%20and%20a%20cat%20sitting%20together%2C%20pet%20family%2C%20soft%20warm%20lighting%2C%20lifestyle%20photography&width=800&height=500&seq=feat03&orientation=landscape'
  },
  {
    id: 3,
    number: '04',
    icon: 'ri-shield-keyhole-line',
    title: '3段階の情報公開レベル',
    description: '状況に応じて公開情報を3段階（通常・医療・緊急）で制御。普段は個人情報をしっかり守ります。',
    detail: '基本情報のほか、命に関わる医療情報は常時公開、飼い主の連絡先は緊急時のみ公開する安全設計です。',
    image: 'https://readdy.ai/api/search-image?query=digital%20security%20shield%20icon%20protecting%20pet%20data%20privacy%2C%20abstract%20technology%20visualization%2C%20clean%20minimal%20design&width=800&height=500&seq=feat04&orientation=landscape'
  },
  {
    id: 4,
    number: '05',
    icon: 'ri-heart-pulse-line',
    title: '命を守る医療情報・ワクチン管理',
    description: 'アレルギーや持病、ワクチン接種記録をデジタルで保管。発見者に適切な処置を促し、二次被害を防ぎます。',
    detail: 'かかりつけ医の情報も登録可能。保護された後の「もしも」の医療処置もスムーズに行えます。',
    image: 'https://readdy.ai/api/search-image?query=pet%20medical%20record%20on%20smartphone%20app%2C%20vaccination%20certificate%20digital%2C%20clean%20UI%2C%20lifestyle%20photography&width=800&height=500&seq=feat05&orientation=landscape'
  },
  {
    id: 5,
    number: '06',
    icon: 'ri-smartphone-line',
    title: 'スマホの「ホーム画面」に常備',
    description: 'PWA対応で、アプリのようにホーム画面へ追加可能。ブラウザを開かずに3秒で愛犬・愛猫の情報にアクセスできます。',
    detail: '通信環境が不安定な時でもキャッシュを利用して高速表示。震災などの緊急時にも強いデジタル迷子札です。',
    image: 'https://readdy.ai/api/search-image?query=smartphone%20home%20screen%20with%20LIEN%20app%20icon%2C%20hand%20holding%20phone%2C%20clean%20sunny%20park%20background%2C%20lifestyle%20photography&width=800&height=500&seq=feat06&orientation=landscape'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32" style={{backgroundColor:'#fffaf7'}}>
      <div className="w-full px-10 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{backgroundColor:'#fde8e0'}}>
            <i className="ri-star-smile-line text-xs" style={{color:'#e8836a'}}></i>
            <p className="text-xs tracking-[0.2em] font-medium" style={{color:'#e8836a'}}>選ばれる理由</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{color:'#3d2218'}}>
            他のドッグタグと<br />
            <span style={{color:'#e8836a'}}>ここが違う</span>
          </h2>
          <p className="text-sm leading-[2]" style={{color:'#8c5a4c'}}>
            金属タグに名前を刻印するだけでは、もう時代遅れ。<br />
            LIENは迷子対策を次のレベルへ。
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch rounded-3xl overflow-hidden shadow-sm`}
                style={{backgroundColor:'#fff', border:'1.5px solid #f5e6df'}}
              >
                <div className="lg:w-1/2 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 lg:h-80 object-cover object-top"
                  />
                </div>
                <div className={`lg:w-1/2 flex flex-col justify-center py-12 lg:py-16 ${isEven ? 'lg:pr-16 lg:pl-12' : 'lg:pl-16 lg:pr-12'} px-8`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:'#fde8e0'}}>
                      <i className={`${feature.icon} text-lg`} style={{color:'#e8836a'}}></i>
                    </div>
                    <span className="text-xs font-bold tracking-widest" style={{color:'#e8836a'}}>{feature.number}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{color:'#3d2218'}}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-[2] mb-3" style={{color:'#6b4337'}}>
                    {feature.description}
                  </p>
                  <p className="text-sm leading-[2]" style={{color:'#9c7769'}}>
                    {feature.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
