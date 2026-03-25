'use client';

import { useState } from 'react';

export default function LPFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      const response = await fetch('https://readdy.ai/api/form/d6rnftc4k19g20dvro8g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setSubmitMessage('登録ありがとうございます！');
        setEmail('');
      } else {
        setSubmitMessage('エラーが発生しました。もう一度お試しください。');
      }
    } catch {
      setSubmitMessage('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer style={{backgroundColor:'#2d1a14', color:'white'}}>
      <div className="w-full px-10 md:px-16 lg:px-24 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 mb-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor:'rgba(249,213,200,0.2)'}}>
                <i className="ri-heart-line text-sm" style={{color:'#f9d5c8'}}></i>
              </div>
              <span className="text-base font-bold tracking-widest">LIEN</span>
            </div>
            <p className="text-sm leading-[2.2] mb-8" style={{color:'rgba(255,255,255,0.6)'}}>
              愛犬・愛猫の安全を守るスマートQRペットタグサービス。QRコード作成は完全無料。首輪・ハーネスへの印字商品もご用意しています。
            </p>
            <div className="flex items-center gap-3">
              {['ri-instagram-line','ri-twitter-x-line','ri-facebook-circle-line','ri-tiktok-line'].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer hover:opacity-80" style={{backgroundColor:'rgba(255,255,255,0.08)'}}>
                  <i className={`${icon} text-sm`} style={{color:'rgba(255,255,255,0.5)'}}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-16">
            <div>
              <p className="text-xs tracking-[0.3em] mb-6" style={{color:'rgba(255,255,255,0.5)'}}>NAVIGATION</p>
              <ul className="space-y-4">
                {[
                  ['#features','特徴'],
                  ['#howitworks','使い方'],
                  ['#products','商品一覧'],
                  ['/login', 'アプリを使う(無料)']
                ].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="text-sm transition-colors cursor-pointer hover:opacity-80" style={{color:'rgba(255,255,255,0.45)'}}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-xs">
              <p className="text-xs tracking-[0.3em] mb-6" style={{color:'rgba(255,255,255,0.5)'}}>NEWSLETTER</p>
              <p className="text-sm leading-[2] mb-6" style={{color:'rgba(255,255,255,0.6)'}}>
                新商品やお得な情報をいち早くお知らせします。
              </p>
              <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white placeholder-white/30 text-sm py-3 px-4 rounded-xl outline-none transition-all focus:ring-2"
                  style={{backgroundColor:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)'}}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-sm font-bold py-3 rounded-full text-white whitespace-nowrap transition-all cursor-pointer disabled:opacity-50 hover:opacity-90"
                  style={{backgroundColor:'#e8836a'}}
                >
                  {isSubmitting ? '送信中...' : '登録する'}
                </button>
                {submitMessage && (
                  <p className="text-xs text-center" style={{color: submitMessage.includes('ありがとう') ? '#f9d5c8' : '#ff8080'}}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <p className="text-xs" style={{color:'rgba(255,255,255,0.4)'}}>© 2025 LIEN. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {[
              ['#','プライバシーポリシー'],
              ['#','利用規約']
            ].map(([href, label]) => (
              <a key={label} href={href} className="text-xs transition-colors cursor-pointer hover:opacity-70" style={{color:'rgba(255,255,255,0.4)'}}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
