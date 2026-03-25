'use client';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden" style={{backgroundColor:'#2d1a14'}}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=adorable%20golden%20retriever%20puppy%20and%20fluffy%20cat%20sitting%20together%20in%20a%20sunny%20meadow%20with%20soft%20pink%20flowers%2C%20warm%20golden%20hour%20light%2C%20dreamy%20bokeh%20background%2C%20heartwarming%20pet%20photography%2C%20ultra%20realistic%2C%20high%20resolution%2C%20the%20left%20side%20of%20the%20image%20has%20a%20very%20dark%20warm%20brown%20gradient%20blending%20smoothly%20into%20the%20scene&width=1920&height=1080&seq=hero02&orientation=landscape)' }}></div>
      <div className="absolute inset-0" style={{background:'linear-gradient(to right, rgba(45,26,20,0.95) 0%, rgba(45,26,20,0.65) 45%, transparent 100%)'}}></div>
      <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(45,26,20,0.7) 0%, transparent 50%)'}}></div>
      <div className="relative w-full px-10 md:px-16 lg:px-24 pb-24 pt-40">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{backgroundColor:'rgba(249,213,200,0.2)', border:'1px solid rgba(249,213,200,0.4)'}}>
            <i className="ri-heart-fill text-xs" style={{color:'#f9d5c8'}}></i>
            <p className="text-xs tracking-[0.2em] font-medium" style={{color:'#f9d5c8'}}>次世代の迷子札</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.3] md:leading-[1.2] mb-6 md:mb-8" style={{letterSpacing:'-0.01em'}}>
            もし迷子になっても、<br />
            <span style={{color:'#f9d5c8'}}>30秒で</span>飼い主に届く。
          </h1>
          <div className="w-16 h-1 rounded-full mb-6 md:mb-8" style={{backgroundColor:'#f9d5c8'}}></div>
          <p className="text-sm md:text-base leading-[2.0] md:leading-[2.2] mb-10 md:mb-12 max-w-sm md:max-w-md break-keep" style={{color:'rgba(255,255,255,0.75)'}}>
            首輪に印字されたQRコードをスキャンするだけ。<br />
            愛犬・愛猫のプロフィールと緊急連絡先がすぐにわかります。<br />
            QRコードの作成・管理は<span style={{color:'rgba(255,255,255,0.95)'}}>完全無料</span>。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a className="inline-flex items-center justify-center gap-2.5 text-white text-sm font-semibold tracking-wide px-8 py-4 rounded-full whitespace-nowrap transition-all cursor-pointer shadow-lg hover:shadow-xl hover:opacity-90" style={{backgroundColor:'#e8836a'}} href="/login">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-qr-code-line"></i>
              </div>
              無料でQRコード作成
            </a>
            <a className="inline-flex items-center justify-center gap-2.5 text-sm font-medium tracking-wide px-8 py-4 rounded-full whitespace-nowrap transition-all cursor-pointer" style={{border:'1.5px solid rgba(255,255,255,0.35)', color:'rgba(255,255,255,0.75)'}} href="#products">
              商品を見る
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
