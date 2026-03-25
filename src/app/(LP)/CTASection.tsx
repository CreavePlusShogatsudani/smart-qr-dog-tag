'use client';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden" style={{backgroundColor:'#2d1a14'}}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://readdy.ai/api/search-image?query=adorable%20fluffy%20dog%20and%20cat%20sitting%20together%20peacefully%20in%20a%20beautiful%20Japanese%20garden%20with%20cherry%20blossoms%20and%20soft%20pink%20petals%20falling%2C%20warm%20golden%20hour%20light%2C%20dreamy%20cinematic%20photography%2C%20ultra%20realistic%2C%20high%20resolution%2C%20the%20right%20side%20of%20the%20image%20blends%20into%20a%20very%20dark%20warm%20brown%20gradient%20smoothly&width=1920&height=1080&seq=cta02&orientation=landscape)' }}></div>
      <div className="absolute inset-0" style={{background:'linear-gradient(to left, rgba(45,26,20,0.95) 0%, rgba(45,26,20,0.65) 45%, transparent 100%)'}}></div>
      <div className="relative w-full px-10 md:px-16 lg:px-24">
        <motion.div 
          className="max-w-lg ml-auto"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{backgroundColor:'rgba(249,213,200,0.2)', border:'1px solid rgba(249,213,200,0.4)'}}>
            <i className="ri-heart-fill text-xs" style={{color:'#f9d5c8'}}></i>
            <p className="text-xs tracking-[0.2em] font-medium" style={{color:'#f9d5c8'}}>無料で始める</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            愛犬・愛猫の安全を、<br />
            <span style={{color:'#f9d5c8'}}>今すぐ守る</span>
          </h2>
          <div className="w-16 h-1 rounded-full mb-8" style={{backgroundColor:'#f9d5c8'}}></div>
          <p className="text-sm leading-[2.2] mb-12" style={{color:'rgba(255,255,255,0.85)'}}>
            無料でQRコードを作成し、<br />
            大切な家族を守りましょう。<br />
            クレジットカード不要・登録30秒。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a className="inline-flex items-center justify-center gap-2.5 text-white text-sm font-bold tracking-wide px-8 py-4 rounded-full whitespace-nowrap transition-all cursor-pointer shadow-lg hover:shadow-xl hover:opacity-90" style={{backgroundColor:'#e8836a'}} href="/login">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-qr-code-line"></i>
              </div>
              無料でQRコードを作成
            </a>
            <a href="#products" className="inline-flex items-center justify-center gap-2.5 text-sm font-medium tracking-wide px-8 py-4 rounded-full whitespace-nowrap transition-all cursor-pointer" style={{border:'1.5px solid rgba(255,255,255,0.35)', color:'rgba(255,255,255,0.75)'}}>
              商品を見る
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
