'use client';

const features = [
  {
    id: 0,
    number: '01',
    icon: 'ri-flashlight-line',
    title: 'スキャン即・飼い主に連絡',
    description: '発見者はアプリも登録も不要。QRをスキャンするだけで飼い主の連絡先が表示され、30秒以内に連絡が届きます。',
    detail: '従来の迷子札では電話番号が読めない・消えているケースが多発。LIENなら常に最新情報にアクセスでき、発見者の負担もゼロです。',
    image: 'https://readdy.ai/api/search-image?query=person%20scanning%20QR%20code%20on%20a%20dog%20collar%20with%20smartphone%2C%20close%20up%20shot%2C%20soft%20natural%20light%2C%20clean%20white%20background%2C%20modern%20lifestyle%20photography%2C%20high%20quality%2C%20detailed%2C%20realistic&width=800&height=500&seq=feat01&orientation=landscape'
  },
  {
    id: 1,
    number: '02',
    icon: 'ri-alarm-warning-line',
    title: '緊急モードで最優先表示',
    description: '迷子になった際、緊急モードをONにすると発見者の画面に大きく表示され、すぐに連絡してもらえます。',
    detail: '緊急モード利用時の再会成功率は98%。迷子になってから平均30秒で飼い主に通知が届きます。',
    image: 'https://readdy.ai/api/search-image?query=smartphone%20screen%20showing%20emergency%20alert%20notification%20for%20lost%20dog%2C%20bright%20red%20urgent%20display%2C%20clean%20minimal%20UI%20design%2C%20soft%20studio%20lighting%2C%20white%20background%2C%20realistic%20product%20photography&width=800&height=500&seq=feat02&orientation=landscape'
  },
  {
    id: 2,
    number: '03',
    icon: 'ri-refresh-line',
    title: '引越し・番号変更も即対応',
    description: '引越しや電話番号変更があっても、アプリから情報を更新するだけ。首輪を買い替える必要はありません。',
    detail: 'QRコードは変わらず、登録情報だけを更新できるので、一度購入すれば長く使い続けられます。',
    image: 'https://readdy.ai/api/search-image?query=person%20updating%20pet%20profile%20information%20on%20smartphone%20app%2C%20modern%20mobile%20UI%2C%20clean%20desk%20background%2C%20soft%20warm%20lighting%2C%20lifestyle%20photography%2C%20high%20quality%20realistic&width=800&height=500&seq=feat03&orientation=landscape'
  },
  {
    id: 3,
    number: '04',
    icon: 'ri-shield-keyhole-line',
    title: '個人情報は完全非公開',
    description: 'QRコードをスキャンしても、個人情報は表示されません。発見者が連絡ボタンを押して初めて通知が届きます。',
    detail: 'プライバシーを守りながら、確実に連絡が取れる仕組みです。',
    image: 'https://readdy.ai/api/search-image?query=digital%20privacy%20shield%20icon%20glowing%20on%20dark%20background%2C%20data%20protection%20concept%2C%20rose%20pink%20light%2C%20abstract%20technology%20visualization%2C%20clean%20minimal%20design%2C%20high%20quality%20render&width=800&height=500&seq=feat04&orientation=landscape'
  },
  {
    id: 4,
    number: '05',
    icon: 'ri-global-line',
    title: '外国人が拾っても大丈夫',
    description: '多言語対応で、外国人観光客が発見しても安心。自動で言語を切り替えて表示します。',
    detail: '日本語、英語、中国語、韓国語など主要言語に対応しています。',
    image: 'https://readdy.ai/api/search-image?query=multilingual%20app%20interface%20showing%20Japanese%20English%20Chinese%20Korean%20language%20options%20on%20smartphone%2C%20globe%20icon%2C%20clean%20white%20background%2C%20modern%20flat%20design%2C%20soft%20studio%20lighting%2C%20realistic&width=800&height=500&seq=feat05&orientation=landscape'
  },
  {
    id: 5,
    number: '06',
    icon: 'ri-gift-2-line',
    title: 'QRコード作成は永久無料',
    description: 'QRコードの作成・管理・情報更新はすべて無料。商品購入時のみ費用がかかります。',
    detail: '月額料金や更新料は一切不要。安心してご利用いただけます。',
    image: 'https://readdy.ai/api/search-image?query=free%20QR%20code%20generation%20concept%2C%20gift%20box%20with%20QR%20code%20pattern%2C%20soft%20pink%20ribbon%2C%20clean%20white%20background%2C%20soft%20natural%20lighting%2C%20product%20photography%20style%2C%20high%20quality%20realistic&width=800&height=500&seq=feat06&orientation=landscape'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32" style={{backgroundColor:'#fffaf7'}}>
      <div className="w-full px-10 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{backgroundColor:'#fde8e0'}}>
            <i className="ri-star-smile-line text-xs" style={{color:'#e8836a'}}></i>
            <p className="text-xs tracking-[0.2em] font-medium" style={{color:'#e8836a'}}>Features</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{color:'#3d2218'}}>
            他のドッグタグと<br />
            <span style={{color:'#e8836a'}}>ここが違う</span>
          </h2>
          <p className="text-sm leading-[2]" style={{color:'#a07060'}}>
            金属タグに名前を刻印するだけでは、もう時代遅れ。<br />
            LIENは迷子対策を次のレベルへ。
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={feature.id}
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
                  <p className="text-sm leading-[2] mb-3" style={{color:'#7a5a50'}}>
                    {feature.description}
                  </p>
                  <p className="text-sm leading-[2]" style={{color:'#b09080'}}>
                    {feature.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
