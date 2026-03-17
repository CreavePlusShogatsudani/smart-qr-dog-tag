'use client';

export default function HowItWorksSection() {
  return (
    <section id="howitworks" className="py-32" style={{background:'linear-gradient(135deg, #fff5f0 0%, #fef0e8 50%, #fdf5ff 100%)'}}>
      <div className="w-full px-10 md:px-16 lg:px-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{backgroundColor:'#fde8e0'}}>
            <i className="ri-map-pin-line text-xs" style={{color:'#e8836a'}}></i>
            <p className="text-xs tracking-[0.2em] font-medium" style={{color:'#e8836a'}}>How It Works</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight" style={{color:'#3d2218'}}>
            3ステップで<br />
            <span style={{color:'#e8836a'}}>簡単スタート</span>
          </h2>
          <p className="text-sm" style={{color:'#a07060'}}>登録から装着まで最短1週間</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              label: 'STEP 01',
              title: '無料で情報登録',
              desc: 'アプリで愛犬・愛猫の名前・写真・連絡先などを登録。QRコードが自動生成されます。完全無料、登録は30秒で完了します。',
              img: 'https://readdy.ai/api/search-image?query=person%20using%20smartphone%20app%20to%20register%20pet%20profile%2C%20entering%20dog%20name%20and%20photo%2C%20modern%20mobile%20interface%2C%20clean%20bright%20desk%20environment%2C%20soft%20natural%20window%20light%2C%20lifestyle%20photography%2C%20high%20quality%20realistic&width=800&height=600&seq=step01&orientation=landscape',
            },
            {
              step: '02',
              label: 'STEP 02',
              title: 'お好みの商品を選ぶ',
              desc: '首輪・ハーネス・光る首輪・キーホルダーなど、お好みの商品にQRコードを印字してお届けします。',
              img: 'https://readdy.ai/api/search-image?query=variety%20of%20stylish%20dog%20collars%20and%20harnesses%20with%20QR%20code%20tags%20displayed%20on%20clean%20white%20surface%2C%20product%20photography%2C%20soft%20studio%20lighting%2C%20pink%20accent%20colors%2C%20minimal%20background%2C%20high%20quality%20realistic&width=800&height=600&seq=step02&orientation=landscape',
            },
            {
              step: '03',
              label: 'STEP 03',
              title: '装着して安心の毎日',
              desc: '届いた商品を愛犬・愛猫に装着するだけ。万が一迷子になっても、発見者がQRをスキャンしてすぐ連絡できます。',
              img: 'https://readdy.ai/api/search-image?query=happy%20dog%20wearing%20a%20stylish%20collar%20with%20QR%20code%20tag%20walking%20with%20owner%20in%20a%20sunny%20park%2C%20peaceful%20morning%20walk%2C%20warm%20golden%20light%2C%20lifestyle%20photography%2C%20clean%20green%20background%2C%20high%20quality%20realistic&width=800&height=600&seq=step03&orientation=landscape',
            }
          ].map((item, i) => (
            <div key={i} className="rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{backgroundColor:'#fff', border:'1.5px solid #f5e6df'}}>
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md" style={{backgroundColor:'#e8836a'}}>
                    {item.step}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-xs font-bold tracking-widest mb-3" style={{color:'#e8836a'}}>{item.label}</p>
                <h3 className="text-xl font-bold mb-3 leading-snug" style={{color:'#3d2218'}}>{item.title}</h3>
                <p className="text-sm leading-[2]" style={{color:'#7a5a50'}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center gap-3 rounded-3xl px-8 py-5" style={{backgroundColor:'#fde8e0'}}>
            <div className="flex items-center gap-3">
              {['01','02','03'].map((n, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{backgroundColor:'#e8836a'}}>{n}</div>
                  {i < 2 && <i className="ri-arrow-right-line text-sm" style={{color:'#e8836a'}}></i>}
                </div>
              ))}
            </div>
            <p className="text-xs font-medium" style={{color:'#e8836a'}}>登録から装着まで最短1週間</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-3xl px-10 py-8 text-center max-w-2xl w-full" style={{backgroundColor:'#fff', border:'1.5px solid #f5e6df'}}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{backgroundColor:'#fde8e0'}}>
                <i className="ri-gift-2-line text-sm" style={{color:'#e8836a'}}></i>
              </div>
              <span className="text-xs font-bold tracking-widest" style={{color:'#e8836a'}}>完全無料</span>
            </div>
            <p className="text-base font-bold mb-2 leading-relaxed" style={{color:'#3d2218'}}>
              QRコード作成及びQRコードのダウンロードは無料です。
            </p>
            <p className="text-sm leading-[2]" style={{color:'#7a5a50'}}>
              管理画面を作成してお使いください。
            </p>
            <a href="/login" className="inline-flex items-center gap-2 mt-6 text-sm font-bold px-8 py-3 rounded-full text-white whitespace-nowrap transition-all hover:opacity-90 cursor-pointer shadow-sm" style={{backgroundColor:'#e8836a'}}>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-qr-code-line"></i>
              </div>
              無料で管理画面を作成する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
