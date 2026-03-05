'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // 読み込み中は何も表示しない、またはスケルトンを表示（リダイレクトを待つ）
  if (status === 'loading' || status === 'authenticated') {
    return <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center font-['Pacifico'] text-teal-600 text-2xl animate-pulse">PawTag</div>;
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactForm.message.length > 500) return;
    setContactStatus('sending');
    try {
      const body = new URLSearchParams({
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
      });
      const res = await fetch('https://readdy.ai/api/form/d6kncliqoe30lj0v7je0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

  const faqs = [
    { question: 'QRコードが読み取れなくなることはありますか？', answer: '耐水性・耐久性に優れた素材を使用しているため、通常の使用では問題ありません。万が一読み取れなくなった場合は、無料で交換いたします。' },
    { question: '個人情報は安全ですか？', answer: 'はい、飼い主様の個人情報は暗号化されて保護されています。発見者には必要最小限の連絡手段のみが表示されます。' },
    { question: '月額料金はかかりますか？', answer: 'いいえ、アカウント登録・QRコード作成・情報管理はすべて完全無料です。QRタグ本体（物理商品）のみ別途ご購入いただきます。' },
    { question: '複数の犬を登録できますか？', answer: 'はい、1つのアカウントで複数の愛犬を登録できます。それぞれに専用のQRコードが発行されます。' },
    { question: 'スマホを持っていない人でも使えますか？', answer: 'QRコードのスキャンにはスマートフォンが必要ですが、発見者がスマホを持っていれば問題ありません。現代ではほとんどの方がスマホをお持ちです。' }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <div className="font-['Pacifico'] text-xl md:text-2xl text-teal-600">PawTag</div>
          <nav className="hidden md:flex items-center gap-8">
            {[['機能', '#features'], ['使い方', '#steps'], ['お客様の声', '#testimonials'], ['FAQ', '#faq'], ['お問い合わせ', '#contact']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/register" className="bg-teal-600 text-white text-xs md:text-sm font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-teal-700 transition-colors whitespace-nowrap">
              無料で始める
            </Link>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {[['機能', '#features'], ['使い方', '#steps'], ['お客様の声', '#testimonials'], ['FAQ', '#faq'], ['お問い合わせ', '#contact']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 font-medium py-1 cursor-pointer hover:text-teal-600 transition-colors">{label}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-14 md:pt-16">
        <div className="relative min-h-[100svh] md:min-h-[92vh] flex items-center overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Beautiful%20golden%20retriever%20dog%20sitting%20outdoors%20in%20a%20lush%20green%20Japanese%20park%20looking%20at%20camera%20with%20warm%20expressive%20eyes%20wearing%20a%20leather%20collar%20soft%20bokeh%20background%20warm%20golden%20afternoon%20sunlight%20cinematic%20portrait%20photography%20highly%20emotional%20heartwarming%20professional%20quality&width=1920&height=1080&seq=hero-main-2026-v2&orientation=landscape"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/50 md:to-transparent"></div>

          <div className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-8 w-full py-16 md:py-0">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 text-teal-300 px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold mb-6 md:mb-8 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse inline-block"></span>
                完全無料 · 登録3分 · カード不要
              </div>

              <h1 className="text-white tracking-tight mb-6 md:mb-8">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-[1.4]">「もしも」の時の、</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-[1.4] text-teal-400">お守り。</span>
                <span className="block text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mt-4 md:mt-5 leading-[1.8]">愛犬のためのスマートQRドッグタグ</span>
              </h1>

              <p className="text-gray-300 text-base md:text-lg font-light leading-[2.0] mb-8 md:mb-10 max-w-md">
                QRコードを読み取るだけで、愛犬のプロフィールと緊急連絡先がすぐにわかります。もう迷子にさせない、新しい安心のカタチ。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-12">
                <Link href="/register" className="bg-teal-500 text-white text-sm md:text-base font-semibold px-6 md:px-8 py-4 rounded-full hover:bg-teal-400 transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap text-center">
                  無料でプロフィールを作成する →
                </Link>
                <a href="#steps" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 md:px-7 py-4 rounded-full font-medium text-sm md:text-base hover:bg-white/20 transition-all whitespace-nowrap text-center">
                  使い方を見る
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 md:gap-6">
                {[
                  { icon: 'ri-user-heart-line', text: '10,000人以上が利用中' },
                  { icon: 'ri-shield-check-line', text: '個人情報は暗号化保護' },
                  { icon: 'ri-price-tag-3-line', text: '登録・QR作成すべて無料' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm font-light">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${item.icon} text-teal-400`}></i>
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-teal-600 py-8 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 text-center">
          {[
            { value: '10,000+', label: '登録飼い主数' },
            { value: '¥0', label: 'アカウント登録' },
            { value: '3分', label: '登録所要時間' },
            { value: '24h', label: 'サポート対応' }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
              <div className="text-teal-100 text-xs md:text-sm font-light mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#f8f8f6]">
        <div className="max-w-screen-xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Problem vs Solution</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.6] tracking-tight mb-5">
              従来の迷子札には、<br />
              <span className="text-rose-500">4つの大きな問題</span>があります
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              愛犬の安全を守るために選んだ迷子札が、実は機能していないかもしれません。PawTagがどう解決するかをご覧ください。
            </p>
          </div>

          {/* 3 Problem+Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
            {[
              {
                num: '01',
                problem: '文字が擦り減って読めない',
                solution: 'クラウドで常に最新情報',
                problemDetail: '金属タグの刻印は日常の使用で徐々に摩耗。数年後には文字が読めなくなり、いざという時に役立ちません。',
                solutionDetail: 'QRコードはクラウドと連携。タグが古くなっても、スキャンすれば常に最新の情報が表示されます。情報の鮮度は永久に保たれます。',
                solutionIcon: 'ri-cloud-line',
                image: 'https://readdy.ai/api/search-image?query=Extremely%20worn%20scratched%20old%20metal%20dog%20ID%20tag%20with%20completely%20faded%20unreadable%20engraved%20text%20surface%20macro%20close%20up%20photography%20on%20dark%20slate%20background%20dramatic%20side%20lighting%20showing%20severe%20wear%20damage%20rust%20patina%20aged%20metal%20texture&width=700&height=500&seq=prob-worn-tag-2025x&orientation=landscape'
              },
              {
                num: '02',
                problem: '電話番号しか書けない',
                solution: '医療情報・写真も登録可能',
                problemDetail: '小さな金属タグには限られた情報しか刻めません。持病・アレルギー・かかりつけ医など、緊急時に必要な情報が伝えられません。',
                solutionDetail: '写真・犬種・年齢・持病・アレルギー・かかりつけ医・緊急連絡先など、必要な情報をすべてデジタルで管理。発見者に的確な情報を届けます。',
                solutionIcon: 'ri-file-list-3-line',
                image: 'https://readdy.ai/api/search-image?query=Tiny%20small%20metal%20dog%20tag%20with%20only%20single%20phone%20number%20scratched%20on%20surface%20next%20to%20modern%20smartphone%20displaying%20rich%20colorful%20digital%20pet%20profile%20page%20with%20dog%20photo%20medical%20records%20allergy%20list%20vet%20info%20clean%20UI%20contrast%20comparison%20flat%20lay%20white%20background&width=700&height=500&seq=prob-info-limit-2025x&orientation=landscape'
              },
              {
                num: '03',
                problem: '情報変更のたびに作り直し',
                solution: 'スマホからいつでも更新',
                problemDetail: '引越しや電話番号変更のたびに新しいタグを注文・交換する必要があります。費用も手間もかかり、空白期間が生まれます。',
                solutionDetail: 'スマホから数秒で情報を更新。タグを交換する必要は一切ありません。引越し・電話番号変更・新しい持病の追加も即座に反映されます。',
                solutionIcon: 'ri-smartphone-line',
                image: 'https://readdy.ai/api/search-image?query=Pile%20of%20multiple%20old%20discarded%20worn%20dog%20tags%20accumulated%20over%20years%20showing%20waste%20and%20repeated%20replacements%20on%20wooden%20table%20versus%20single%20hand%20holding%20smartphone%20easily%20editing%20updating%20pet%20profile%20app%20in%20seconds%20minimal%20clean%20Japanese%20lifestyle%20photography&width=700&height=500&seq=prob-replace-cost-2025x&orientation=landscape'
              },
              {
                num: '04',
                problem: '個人情報がダダ漏れ',
                solution: '必要最小限の情報だけ公開',
                problemDetail: '従来の迷子札には住所・電話番号が丸見え。拾った人が誰でも個人情報を見られる状態で、悪意ある第三者に悪用されるリスクがあります。',
                solutionDetail: '発見者には連絡手段のみを表示。住所・詳細な個人情報は非公開のまま保護されます。暗号化通信で飼い主と発見者をつなぐため、情報漏洩の心配がありません。',
                solutionIcon: 'ri-shield-keyhole-line',
                image: 'https://readdy.ai/api/search-image?query=Close%20up%20of%20old%20metal%20dog%20tag%20showing%20full%20home%20address%20phone%20number%20personal%20details%20engraved%20clearly%20visible%20exposed%20privacy%20risk%20concept%20dark%20moody%20background%20red%20warning%20light%20dramatic%20lighting%20security%20concern%20personal%20data%20leak&width=700&height=500&seq=prob-privacy-leak-2025x&orientation=landscape'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Image */}
                <div className="h-48 md:h-56 overflow-hidden relative">
                  <img src={item.image} alt={item.problem} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xs font-black text-gray-400">{item.num}</span>
                  </div>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  {/* Problem Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-error-warning-fill text-slate-400 text-base"></i>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Before / 従来の問題</span>
                    </div>
                    <p className="font-black text-gray-800 text-base md:text-lg leading-snug mb-2">{item.problem}</p>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">{item.problemDetail}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 bg-gray-200"></div>
                      <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100">
                        <i className="ri-arrow-down-line text-teal-500 text-base"></i>
                      </div>
                      <div className="h-px w-8 bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Solution Box */}
                  <div className="bg-teal-600 rounded-2xl p-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className={`${item.solutionIcon} text-teal-200 text-base`}></i>
                      </div>
                      <span className="text-xs font-bold text-teal-200 uppercase tracking-wider">After / PawTagの解決策</span>
                    </div>
                    <p className="font-black text-white text-base md:text-lg leading-snug mb-2">{item.solution}</p>
                    <p className="text-teal-100 text-xs font-light leading-relaxed">{item.solutionDetail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-16 md:mb-20">
            <div className="grid grid-cols-3 text-center">
              <div className="bg-gray-50 px-4 py-4 md:py-5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">比較項目</p>
              </div>
              <div className="bg-slate-100 px-4 py-4 md:py-5 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">従来の迷子札</p>
              </div>
              <div className="bg-teal-600 px-4 py-4 md:py-5 border-b border-teal-700">
                <p className="text-xs font-bold text-white uppercase tracking-wider">PawTag</p>
              </div>
            </div>
            {[
              { label: '情報の耐久性', old: '摩耗で消える', newVal: 'クラウドで永久保存' },
              { label: '登録できる情報', old: '電話番号のみ', newVal: '写真・医療情報・連絡先など' },
              { label: '情報の更新', old: 'タグを作り直し', newVal: 'スマホから即時更新' },
              { label: '費用', old: '変更のたびに費用発生', newVal: '登録・更新すべて無料' },
              { label: '個人情報の保護', old: '住所・電話番号が丸見え', newVal: '暗号化で必要最小限のみ公開' },
              { label: '緊急時の対応', old: '電話のみ', newVal: 'ワンタップ連絡＋位置情報' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-700">{row.label}</span>
                </div>
                <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-center">
                  <span className="text-xs md:text-sm text-slate-400 font-light flex items-center gap-1.5">
                    <i className="ri-subtract-line text-slate-300 flex-shrink-0"></i>{row.old}
                  </span>
                </div>
                <div className="px-4 py-4 border-b border-teal-50 flex items-center justify-center bg-teal-50/40">
                  <span className="text-xs md:text-sm text-teal-700 font-semibold flex items-center gap-1.5">
                    <i className="ri-check-line text-teal-500 flex-shrink-0"></i>{row.newVal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Banner */}
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Happy%20confident%20Japanese%20dog%20owner%20smiling%20warmly%20with%20healthy%20golden%20retriever%20dog%20in%20beautiful%20park%20cherry%20blossom%20trees%20warm%20golden%20afternoon%20sunlight%20peaceful%20safe%20secure%20feeling%20wide%20cinematic%20professional%20photography%20emotional%20bond&width=1920&height=600&seq=prob-banner-final-2025x&orientation=landscape"
              alt="Solution"
              className="w-full h-64 md:h-80 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/20"></div>
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-2xl">
                <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-3">PawTagなら、すべて解決できます</p>
                <h3 className="text-white text-2xl md:text-4xl font-black leading-[1.4] mb-5 tracking-tight">
                  4つの問題をすべて解決する、<br />
                  <span className="text-teal-400">新しい安心のカタチ。</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['クラウドで常に最新情報', '医療情報・写真も登録可能', 'スマホからいつでも更新', '個人情報を暗号化保護'].map((tag, i) => (
                    <span key={i} className="bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              愛犬を守るために必要な<br />
              すべてが揃っています
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                icon: 'ri-smartphone-line',
                color: 'bg-teal-50',
                iconColor: 'text-teal-600',
                title: '簡単登録',
                desc: '愛犬の写真・名前・特徴・持病などを3分で登録できます。',
                image: 'https://readdy.ai/api/search-image?query=Person%20using%20smartphone%20to%20register%20pet%20profile%20app%20clean%20minimal%20UI%20warm%20indoor%20home%20setting%20Japanese%20lifestyle%20soft%20natural%20light%20minimal%20aesthetic&width=500&height=320&seq=feat-1-v4&orientation=landscape'
              },
              {
                icon: 'ri-qr-scan-line',
                color: 'bg-amber-50',
                iconColor: 'text-amber-600',
                title: 'スキャンで即連絡',
                desc: '発見者がQRをスキャンするだけで、ワンタップで飼い主に連絡できます。',
                image: 'https://readdy.ai/api/search-image?query=Person%20scanning%20QR%20code%20on%20dog%20collar%20with%20smartphone%20outdoor%20park%20setting%20warm%20natural%20lighting%20close%20up%20shot%20modern%20clean%20aesthetic%20Japanese%20photography%20style%20golden%20hour&width=500&height=320&seq=feat-2-v4&orientation=landscape'
              },
              {
                icon: 'ri-heart-pulse-line',
                color: 'bg-rose-50',
                iconColor: 'text-rose-500',
                title: '医療情報の共有',
                desc: 'アレルギーや持病・かかりつけ医の情報を安全に共有できます。',
                image: 'https://readdy.ai/api/search-image?query=Veterinarian%20examining%20cute%20dog%20with%20owner%20present%20warm%20clinic%20setting%20soft%20lighting%20professional%20caring%20atmosphere%20Japanese%20style%20photography%20clean%20white%20background%20gentle&width=500&height=320&seq=feat-3-v4&orientation=landscape'
              },
              {
                icon: 'ri-shield-check-line',
                color: 'bg-blue-50',
                iconColor: 'text-blue-500',
                title: 'プライバシー保護',
                desc: '住所などの詳細情報は非公開。発見者には最小限の連絡手段のみ表示。',
                image: 'https://readdy.ai/api/search-image?query=Digital%20security%20privacy%20protection%20concept%20smartphone%20with%20shield%20lock%20icon%20soft%20teal%20gradient%20background%20minimal%20clean%20modern%20Japanese%20design%20aesthetic%20professional&width=500&height=320&seq=feat-4-v4&orientation=landscape'
              }
            ].map((f, i) => (
              <div key={i} className="bg-[#f8f8f6] rounded-3xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="h-40 md:h-44 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 md:p-6">
                  <div className={`w-10 h-10 ${f.color} rounded-xl flex items-center justify-center mb-3 md:mb-4`}>
                    <i className={`${f.icon} ${f.iconColor} text-lg`}></i>
                  </div>
                  <h3 className="font-black text-gray-900 text-base md:text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="steps" className="py-16 md:py-28 px-4 md:px-8 bg-[#f8f8f6]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              たった3ステップで<br />
              すぐに始められます
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-7 md:left-8 top-8 bottom-8 w-0.5 bg-gray-200"></div>

              <div className="space-y-5 md:space-y-6">
                {[
                  {
                    num: '01',
                    title: 'プロフィールを登録',
                    desc: '愛犬の写真・名前・犬種・年齢・医療情報・飼い主の連絡先を入力。スマホから3分で完了します。',
                    checks: ['愛犬の写真をアップロード', '名前・犬種・年齢を入力', '医療情報・持病を登録', '飼い主の連絡先を設定'],
                    color: 'bg-teal-600',
                    image: 'https://readdy.ai/api/search-image?query=Person%20holding%20smartphone%20showing%20pet%20registration%20app%20form%20clean%20UI%20warm%20indoor%20home%20setting%20Japanese%20lifestyle%20soft%20natural%20light%20minimal%20aesthetic&width=800&height=400&seq=step1-v4&orientation=landscape'
                  },
                  {
                    num: '02',
                    title: 'QRコードを印刷・装着',
                    desc: '生成されたQRコードをPDFで印刷するか、専用タグを注文して首輪に取り付けるだけ。',
                    checks: ['QRコードを自動生成', 'PDFで印刷またはタグを注文', '首輪やハーネスに装着', '防水・耐久素材で安心'],
                    color: 'bg-amber-500',
                    image: 'https://readdy.ai/api/search-image?query=Close%20up%20of%20dog%20collar%20with%20QR%20code%20tag%20attached%20cute%20dog%20wearing%20collar%20outdoor%20natural%20light%20warm%20bokeh%20background%20professional%20photography%20Japanese%20style&width=800&height=400&seq=step2-v4&orientation=landscape'
                  },
                  {
                    num: '03',
                    title: 'もしもの時も安心',
                    desc: '発見者がQRをスキャンすれば、すぐにあなたに連絡が届きます。位置情報も自動送信。',
                    checks: ['発見者がQRをスキャン', 'ワンタップで飼い主に連絡', '位置情報を自動送信', '迷子解決まで全力サポート'],
                    color: 'bg-teal-600',
                    image: 'https://readdy.ai/api/search-image?query=Happy%20dog%20owner%20reuniting%20with%20lost%20dog%20emotional%20heartwarming%20moment%20outdoor%20park%20warm%20golden%20light%20Japanese%20photography%20style%20cinematic%20quality&width=800&height=400&seq=step3-v4&orientation=landscape'
                  }
                ].map((step, i) => (
                  <div key={i} className="relative flex gap-4 md:gap-8 items-start">
                    <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 ${step.color} rounded-full flex flex-col items-center justify-center flex-shrink-0 shadow-lg`}>
                      <span className="text-white text-xs font-light leading-none">STEP</span>
                      <span className="text-white text-lg md:text-xl font-black leading-none">{step.num}</span>
                    </div>

                    <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="h-40 md:h-52 overflow-hidden">
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="p-5 md:p-8">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 md:mb-3">{step.title}</h3>
                        <p className="text-gray-500 font-light leading-relaxed mb-4 md:mb-5 text-sm md:text-base">{step.desc}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.checks.map((c, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-light">
                              <i className="ri-check-line text-teal-500 flex-shrink-0"></i>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10 md:mt-12">
              <Link href="/register" className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 md:px-12 py-4 rounded-full hover:bg-teal-700 transition-all font-bold text-base md:text-lg shadow-2xl hover:-translate-y-1 whitespace-nowrap">
                <i className="ri-rocket-line"></i>今すぐ無料で始める
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE PRICING ── */}
      <section className="py-14 md:py-20 px-4 md:px-8 bg-teal-600">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-teal-200 uppercase mb-4">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 md:mb-5 leading-[1.05] tracking-tight">
                すべて<span className="text-teal-200">無料</span>
              </h2>
              <p className="text-teal-100 font-light leading-relaxed text-sm md:text-base">
                アカウント登録・QRコード作成・管理はすべて無料。追加費用は一切かかりません。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { price: '¥3,000以上のご注文で送料無料', label: '全国一律送料¥350', icon: 'ri-truck-line' }
              ].map((item, i) => (
                <div key={i} className="bg-white/15 border border-white/20 rounded-2xl p-4 md:p-5 hover:bg-white/25 transition-all">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                    <i className={`${item.icon} text-white text-sm`}></i>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{item.price}</div>
                  <div className="text-teal-100 text-xs md:text-sm font-light">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-16 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              10,000人以上の<br />
              飼い主様からの声
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                name: '田中 美咲',
                location: '東京都',
                dog: '柴犬 ハチ（3歳）',
                comment: '夜の散歩中にリードが外れてしまった時、このQRタグのおかげで30分で見つかりました。発見者の方がすぐに連絡してくれて、本当に感謝しています。',
                image: 'https://readdy.ai/api/search-image?query=Happy%20Japanese%20woman%20in%20her%2030s%20smiling%20warmly%20holding%20cute%20shiba%20inu%20dog%20outdoors%20in%20park%20soft%20natural%20lighting%20emotional%20moment%20clean%20background%20professional%20portrait%20photography&width=200&height=200&seq=testi-1-v4&orientation=squarish'
              },
              {
                name: '佐藤 健太',
                location: '大阪府',
                dog: 'トイプードル モカ（2歳）',
                comment: '従来の迷子札には限られた情報しか刻めませんでした。PawTagなら写真・犬種・年齢・持病・アレルギー・かかりつけ医・連絡先をすべて登録できます。とても便利です。',
                image: 'https://readdy.ai/api/search-image?query=Smiling%20Japanese%20man%20in%20his%2040s%20holding%20small%20toy%20poodle%20dog%20in%20arms%20outdoor%20setting%20warm%20natural%20lighting%20emotional%20connection%20clean%20background%20professional%20portrait%20photography&width=200&height=200&seq=testi-2-v4&orientation=squarish'
              },
              {
                name: '鈴木 由美',
                location: '神奈川県',
                dog: 'ゴールデンレトリバー レオ（5歳）',
                comment: 'QRタグをスキャンするだけで、すぐに私に連絡が来るシステムが本当に便利です。PawTagなら写真・犬種・年齢・持病・アレルギー・かかりつけ医・連絡先をすべて登録できます。とても便利です。',
                image: 'https://readdy.ai/api/search-image?query=Kind%20Japanese%20woman%20in%20her%2050s%20with%20golden%20retriever%20dog%20sitting%20together%20outdoors%20warm%20sunset%20lighting%20emotional%20bond%20clean%20background%20professional%20portrait%20photography&width=200&height=200&seq=testi-3-v4&orientation=squarish'
              }
            ].map((t, i) => (
              <div key={i} className="bg-[#f8f8f6] rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex gap-0.5 mb-4 md:mb-5">
                  {[...Array(5)].map((_, j) => <i key={j} className="ri-star-fill text-amber-400 text-sm"></i>)}
                </div>
                <p className="text-gray-700 font-light leading-relaxed mb-5 md:mb-6 text-sm">「{t.comment}」</p>
                <div className="flex items-center gap-3 pt-4 md:pt-5 border-t border-gray-200">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-teal-100 flex-shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400 font-light">{t.location} · {t.dog}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ── */}
      <section id="pricing" className="py-16 md:py-28 px-4 md:px-8 bg-[#f8f8f6]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              シンプルで<br />
              <span className="text-teal-600">わかりやすい料金</span>
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base mt-4 md:mt-6 max-w-xl mx-auto leading-relaxed">
              アカウント登録・QRコード作成・情報管理はすべて永久無料。QRタグ本体のみ別途ご購入いただきます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-14 md:mb-20">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border border-gray-200 p-7 md:p-9 flex flex-col hover:shadow-lg transition-all">
              <div className="mb-6">
                <div className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <i className="ri-user-line text-gray-500 text-xl"></i>
                </div>
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Free</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-gray-900">¥0</span>
                  <span className="text-gray-400 text-sm font-light mb-2">/月</span>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed">まずは無料で始めたい方に。基本機能をすべて無料でご利用いただけます。</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'アカウント登録',
                  'QRコード作成（1頭）',
                  '基本プロフィール登録',
                  '緊急連絡先の設定',
                  'スキャン通知',
                  'クラウド情報管理',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700 font-light">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-teal-500"></i>
                    </div>
                    {item}
                  </li>
                ))}
                {[
                  '複数頭の登録',
                  '医療情報の詳細登録',
                  '位置情報の自動送信',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-400 font-light">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-subtract-line text-gray-300"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-sm hover:border-teal-400 hover:text-teal-600 transition-colors whitespace-nowrap cursor-pointer">
                無料で始める
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-teal-600 rounded-3xl p-7 md:p-9 flex flex-col relative shadow-2xl shadow-teal-200 scale-[1.02] md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-amber-900 text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap shadow-md">
                  🏆 最も人気
                </span>
              </div>
              <div className="mb-6">
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <i className="ri-star-line text-white text-xl"></i>
                </div>
                <p className="text-xs font-semibold tracking-widest text-teal-200 uppercase mb-2">Standard</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-white">¥480</span>
                  <span className="text-teal-200 text-sm font-light mb-2">/月</span>
                </div>
                <p className="text-teal-100 text-sm font-light leading-relaxed">複数の愛犬を持つ方や、より充実した機能をお求めの方に。</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'アカウント登録',
                  'QRコード作成（最大5頭）',
                  '詳細プロフィール登録',
                  '医療情報・アレルギー登録',
                  '緊急連絡先の複数設定',
                  'スキャン通知（リアルタイム）',
                  '位置情報の自動送信',
                  'かかりつけ医情報の登録',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white font-light">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-teal-200"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-teal-700 py-3.5 rounded-xl font-black text-sm hover:bg-teal-50 transition-colors whitespace-nowrap cursor-pointer">
                14日間無料で試す →
              </button>
              <p className="text-teal-200 text-xs font-light text-center mt-3">クレジットカード不要</p>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl border border-gray-200 p-7 md:p-9 flex flex-col hover:shadow-lg transition-all">
              <div className="mb-6">
                <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                  <i className="ri-vip-crown-line text-amber-500 text-xl"></i>
                </div>
                <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-2">Premium</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-black text-gray-900">¥980</span>
                  <span className="text-gray-400 text-sm font-light mb-2">/月</span>
                </div>
                <p className="text-gray-500 text-sm font-light leading-relaxed">ブリーダーや多頭飼いの方、最高の安心を求める方に。</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Standardの全機能',
                  'QRコード作成（無制限）',
                  '迷子時の専任サポート',
                  '優先カスタマーサポート',
                  'タグ無料交換保証（年1回）',
                  'スキャン履歴・分析レポート',
                  'カスタムプロフィールデザイン',
                  'ファミリーアカウント共有',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700 font-light">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-check-line text-amber-500"></i>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-amber-400 text-amber-900 py-3.5 rounded-xl font-black text-sm hover:bg-amber-300 transition-colors whitespace-nowrap cursor-pointer">
                14日間無料で試す →
              </button>
              <p className="text-gray-400 text-xs font-light text-center mt-3">クレジットカード不要</p>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 text-center border-b border-gray-100">
              <div className="bg-gray-50 px-4 py-4 md:py-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">機能</p>
              </div>
              <div className="px-4 py-4 md:py-5 border-l border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Free</p>
              </div>
              <div className="bg-teal-600 px-4 py-4 md:py-5 border-l border-teal-700">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Standard</p>
              </div>
              <div className="px-4 py-4 md:py-5 border-l border-gray-100">
                <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Premium</p>
              </div>
            </div>
            {[
              { label: '登録頭数', free: '1頭', std: '最大5頭', pre: '無制限' },
              { label: '医療情報登録', free: false, std: true, pre: true },
              { label: '位置情報送信', free: false, std: true, pre: true },
              { label: 'リアルタイム通知', free: false, std: true, pre: true },
              { label: '専任サポート', free: false, std: false, pre: true },
              { label: 'タグ無料交換保証', free: false, std: false, pre: true },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 text-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-center">
                  <span className="text-xs md:text-sm font-semibold text-gray-700">{row.label}</span>
                </div>
                <div className="px-4 py-3.5 border-b border-gray-100 border-l flex items-center justify-center">
                  {typeof row.free === 'boolean' ? (
                    row.free
                      ? <i className="ri-check-line text-teal-500 text-base"></i>
                      : <i className="ri-subtract-line text-gray-300 text-base"></i>
                  ) : (
                    <span className="text-xs md:text-sm text-gray-600 font-light">{row.free}</span>
                  )}
                </div>
                <div className="px-4 py-3.5 border-b border-teal-100 border-l bg-teal-50/40 flex items-center justify-center">
                  {typeof row.std === 'boolean' ? (
                    row.std
                      ? <i className="ri-check-line text-teal-500 text-base"></i>
                      : <i className="ri-subtract-line text-gray-300 text-base"></i>
                  ) : (
                    <span className="text-xs md:text-sm text-teal-700 font-semibold">{row.std}</span>
                  )}
                </div>
                <div className="px-4 py-3.5 border-b border-gray-100 border-l flex items-center justify-center">
                  {typeof row.pre === 'boolean' ? (
                    row.pre
                      ? <i className="ri-check-line text-amber-500 text-base"></i>
                      : <i className="ri-subtract-line text-gray-300 text-base"></i>
                  ) : (
                    <span className="text-xs md:text-sm text-amber-600 font-semibold">{row.pre}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Annual discount note */}
          <div className="mt-8 md:mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-5 py-3 rounded-full text-sm font-medium">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-gift-line text-teal-500"></i>
              </div>
              年払いにすると<span className="font-black">2ヶ月分無料</span>！さらにお得にご利用いただけます。
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-16 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Products</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              愛犬にぴったりの<br />
              アイテムを選ぼう
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base mt-4 md:mt-6 max-w-xl mx-auto leading-relaxed">
              QRタグから首輪・ハーネス・ウェアまで、愛犬の安全とおしゃれを両立するアイテムが揃っています。
            </p>
          </div>

          {/* カテゴリ：QRタグ */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center">
                <i className="ri-qr-code-line text-teal-600 text-base"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900">QRタグ</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" data-product-shop>
              {[
                {
                  name: 'スタンダードタグ',
                  price: '¥1,980',
                  badge: '人気No.1',
                  badgeColor: 'bg-teal-600',
                  desc: 'シンプルで丈夫なステンレス製QRタグ。どんな首輪にも合うベーシックデザイン。',
                  features: ['ステンレス製', '防水・耐傷', '直径30mm', '全5色展開'],
                  image: 'https://readdy.ai/api/search-image?query=Single%20round%20stainless%20steel%20pet%20ID%20tag%20lying%20flat%20on%20white%20surface%20with%20large%20black%20QR%20code%20matrix%20barcode%20clearly%20printed%20in%20center%20of%20tag%20shiny%20metallic%20finish%20small%20ring%20attachment%20at%20top%20isolated%20white%20background%20macro%20product%20shot%20sharp%20focus%20studio%20lighting&width=600&height=500&seq=qrtag-std-2025a&orientation=portrait'
                },
                {
                  name: 'プレミアムタグ',
                  price: '¥3,480',
                  badge: 'おすすめ',
                  badgeColor: 'bg-amber-500',
                  desc: '本革ストラップ付きのプレミアムモデル。高級感あるデザインで愛犬をおしゃれに。',
                  features: ['本革ストラップ付き', '真鍮製ゴールド仕上げ', '直径35mm', '名前刻印無料'],
                  image: 'https://readdy.ai/api/search-image?query=Luxury%20gold%20brass%20oval%20pet%20tag%20with%20prominent%20QR%20code%20engraved%20on%20polished%20surface%20brown%20genuine%20leather%20cord%20attached%20elegant%20jewelry%20style%20product%20photography%20pure%20white%20background%20warm%20studio%20lighting%20premium%20accessory%20close%20up&width=600&height=500&seq=qrtag-prm-2025b&orientation=portrait'
                },
                {
                  name: 'シリコンタグ',
                  price: '¥1,280',
                  badge: '軽量',
                  badgeColor: 'bg-blue-500',
                  desc: '軽くて柔らかいシリコン素材。小型犬や子犬にも安心して使えるやさしい素材。',
                  features: ['シリコン製', '超軽量8g', '全8色展開', '子犬・小型犬向け'],
                  image: 'https://readdy.ai/api/search-image?query=Soft%20flexible%20silicone%20rubber%20pet%20tag%20in%20pastel%20pink%20color%20with%20black%20QR%20code%20square%20printed%20clearly%20on%20smooth%20flat%20surface%20lightweight%20small%20tag%20with%20hole%20for%20attachment%20white%20background%20product%20photography%20bright%20studio%20lighting%20cute%20minimal%20design&width=600&height=500&seq=qrtag-sil-2025c&orientation=portrait'
                }
              ].map((product, i) => (
                <div key={i} className="bg-[#f8f8f6] rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
                  <div className="relative h-52 md:h-60 overflow-hidden bg-white">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{product.badge}</div>
                  </div>
                  <div className="p-5 md:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className="font-black text-gray-900 text-lg md:text-xl">{product.name}</h3>
                      <span className="text-teal-600 font-black text-xl md:text-2xl whitespace-nowrap ml-2">{product.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-4 md:mb-5">{product.desc}</p>
                    <ul className="grid grid-cols-2 gap-1.5 mb-5 md:mb-6">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-1.5 text-xs text-gray-600 font-light">
                          <i className="ri-check-line text-teal-500 flex-shrink-0"></i>{f}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto w-full bg-teal-600 text-white py-3 md:py-3.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                      <i className="ri-shopping-cart-line"></i>カートに追加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* カテゴリ：首輪 */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                <i className="ri-links-line text-amber-600 text-base"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900">首輪</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" data-product-shop>
              {[
                {
                  name: 'レザーカラー',
                  price: '¥4,980',
                  badge: '人気',
                  badgeColor: 'bg-amber-500',
                  desc: '上質な本革を使用したクラシックな首輪。QRタグホルダー付きで安全管理も万全。',
                  features: ['本革製', 'QRタグホルダー付き', 'サイズ調整可能', '全4色展開'],
                  image: 'https://readdy.ai/api/search-image?query=Brown%20genuine%20leather%20dog%20collar%20laid%20flat%20on%20white%20background%20with%20silver%20metal%20buckle%20and%20D-ring%20small%20round%20metal%20tag%20with%20visible%20QR%20code%20barcode%20hanging%20from%20ring%20product%20photography%20overhead%20shot%20clean%20minimal%20studio%20lighting&width=600&height=500&seq=collar-lth-2025a&orientation=portrait'
                },
                {
                  name: 'ナイロンカラー',
                  price: '¥2,480',
                  badge: '丈夫',
                  badgeColor: 'bg-teal-600',
                  desc: '耐久性に優れたナイロン素材。水洗いOKで清潔に保てる実用的な首輪。',
                  features: ['ナイロン製', '水洗い可能', '反射テープ付き', '全6色展開'],
                  image: 'https://readdy.ai/api/search-image?query=Teal%20blue%20nylon%20webbing%20dog%20collar%20flat%20lay%20on%20white%20background%20with%20plastic%20quick%20release%20buckle%20reflective%20strip%20and%20small%20square%20QR%20code%20tag%20sewn%20onto%20collar%20label%20product%20photography%20overhead%20clean%20white%20background%20studio%20lighting&width=600&height=500&seq=collar-nyl-2025b&orientation=portrait'
                },
                {
                  name: 'フラワーカラー',
                  price: '¥3,280',
                  badge: 'かわいい',
                  badgeColor: 'bg-rose-500',
                  desc: '花柄刺繍が可愛いフェミニンな首輪。女の子の愛犬にぴったりのデザイン。',
                  features: ['刺繍デザイン', '柔らかコットン素材', 'QRタグ対応', '全3柄展開'],
                  image: 'https://readdy.ai/api/search-image?query=Pink%20cotton%20dog%20collar%20with%20colorful%20floral%20embroidery%20pattern%20laid%20flat%20on%20white%20background%20cable%20knit%20texture%20turtleneck%20style%20small%20QR%20code%20tag%20sewn%20onto%20collar%20label%20product%20photography%20overhead%20flat%20lay%20clean%20white%20studio%20lighting%20cozy%20winter%20pet%20clothing&width=600&height=500&seq=collar-flw-2025c&orientation=portrait'
                }
              ].map((product, i) => (
                <div key={i} className="bg-[#f8f8f6] rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
                  <div className="relative h-52 md:h-60 overflow-hidden bg-white">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{product.badge}</div>
                  </div>
                  <div className="p-5 md:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className="font-black text-gray-900 text-lg md:text-xl">{product.name}</h3>
                      <span className="text-teal-600 font-black text-xl md:text-2xl whitespace-nowrap ml-2">{product.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-4 md:mb-5">{product.desc}</p>
                    <ul className="grid grid-cols-2 gap-1.5 mb-5 md:mb-6">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-1.5 text-xs text-gray-600 font-light">
                          <i className="ri-check-line text-teal-500 flex-shrink-0"></i>{f}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto w-full bg-teal-600 text-white py-3 md:py-3.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                      <i className="ri-shopping-cart-line"></i>カートに追加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* カテゴリ：ハーネス */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                <i className="ri-shield-line text-blue-600 text-base"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900">ハーネス</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" data-product-shop>
              {[
                {
                  name: 'メッシュハーネス',
                  price: '¥5,480',
                  badge: '通気性抜群',
                  badgeColor: 'bg-blue-500',
                  desc: '通気性に優れたメッシュ素材のハーネス。夏場の散歩も快適に過ごせます。',
                  features: ['メッシュ素材', '通気性抜群', 'QRタグポケット付き', 'S/M/L/XL対応'],
                  image: 'https://readdy.ai/api/search-image?query=Light%20blue%20breathable%20mesh%20dog%20harness%20laid%20flat%20on%20white%20background%20showing%20chest%20plate%20back%20panel%20adjustable%20straps%20plastic%20buckles%20small%20QR%20code%20tag%20attached%20to%20front%20metal%20ring%20product%20photography%20flat%20lay%20overhead%20clean%20white%20studio%20lighting%20cute%20pet%20clothing%20minimal&width=600&height=500&seq=harness-msh-2025a&orientation=portrait'
                },
                {
                  name: 'ステップインハーネス',
                  price: '¥6,280',
                  badge: 'おすすめ',
                  badgeColor: 'bg-teal-600',
                  desc: '足を通すだけで簡単装着。引っ張り防止設計で散歩トレーニングにも最適。',
                  features: ['ステップイン式', '引っ張り防止設計', '反射テープ付き', 'QRタグ対応'],
                  image: 'https://readdy.ai/api/search-image?query=Teal%20green%20step-in%20dog%20harness%20flat%20lay%20on%20white%20background%20two%20leg%20holes%20visible%20padded%20chest%20piece%20reflective%20strips%20metal%20D-ring%20with%20small%20QR%20code%20tag%20clipped%20on%20product%20photography%20overhead%20shot%20clean%20white%20background%20studio%20lighting&width=600&height=500&seq=harness-stp-2025b&orientation=portrait'
                },
                {
                  name: 'タクティカルハーネス',
                  price: '¥8,980',
                  badge: 'プロ仕様',
                  badgeColor: 'bg-gray-700',
                  desc: '大型犬にも対応するタフなタクティカルハーネス。ハンドルグリップ付きで安全管理も万全。',
                  features: ['ミリタリーゲレード', 'ハンドルグリップ付き', 'モジュラーポーチ対応', 'L/XL/XXL対応'],
                  image: 'https://readdy.ai/api/search-image?query=Dark%20olive%20green%20tactical%20military%20dog%20harness%20flat%20lay%20on%20white%20background%20molle%20webbing%20handle%20grip%20heavy%20duty%20metal%20buckles%20QR%20code%20tag%20attached%20to%20front%20D-ring%20product%20photography%20overhead%20clean%20white%20studio%20lighting%20rugged%20outdoor%20gear&width=600&height=500&seq=harness-tac-2025c&orientation=portrait'
                }
              ].map((product, i) => (
                <div key={i} className="bg-[#f8f8f6] rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
                  <div className="relative h-52 md:h-60 overflow-hidden bg-white">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{product.badge}</div>
                  </div>
                  <div className="p-5 md:p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <h3 className="font-black text-gray-900 text-lg md:text-xl">{product.name}</h3>
                      <span className="text-teal-600 font-black text-xl md:text-2xl whitespace-nowrap ml-2">{product.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-4 md:mb-5">{product.desc}</p>
                    <ul className="grid grid-cols-2 gap-1.5 mb-5 md:mb-6">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-1.5 text-xs text-gray-600 font-light">
                          <i className="ri-check-line text-teal-500 flex-shrink-0"></i>{f}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto w-full bg-teal-600 text-white py-3 md:py-3.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                      <i className="ri-shopping-cart-line"></i>カートに追加
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* カテゴリ：ウェア・衣類 */}
          <div className="mt-4 md:mt-6 bg-teal-50 border border-teal-100 rounded-2xl px-5 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="ri-truck-line text-teal-600 text-lg"></i>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">¥3,000以上のご注文で送料無料</div>
              <div className="text-gray-500 text-xs font-light mt-0.5">全国一律送料¥350。注文から3〜5営業日でお届けします。</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-28 px-4 md:px-8 bg-[#f8f8f6]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              よくあるご質問
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${expandedFaq === i ? 'border-teal-200 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-5 md:px-7 py-4 md:py-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className={`font-semibold text-sm md:text-base pr-3 md:pr-4 ${expandedFaq === i ? 'text-teal-700' : 'text-gray-800'}`}>{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${expandedFaq === i ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <i className={`ri-arrow-down-s-line text-lg transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}></i>
                  </div>
                </button>
                {expandedFaq === i && (
                  <div className="px-5 md:px-7 pb-5 md:pb-6">
                    <p className="text-gray-600 font-light leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] text-teal-600 uppercase mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.7] tracking-tight">
              お問い合わせ
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
              ご質問・ご要望・ご不明な点がございましたら、お気軽にお問い合わせください。通常1〜2営業日以内にご返信いたします。
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="md:col-span-2 flex flex-col gap-5">
              {[
                { icon: 'ri-mail-line', color: 'bg-teal-50', iconColor: 'text-teal-600', title: 'メール', desc: 'support@pawtag.jp', sub: '1〜2営業日以内にご返信' },
                { icon: 'ri-phone-line', color: 'bg-amber-50', iconColor: 'text-amber-600', title: '電話', desc: '0120-XXX-XXX', sub: '平日 10:00〜18:00' },
                { icon: 'ri-map-pin-line', color: 'bg-rose-50', iconColor: 'text-rose-500', title: '所在地', desc: '東京都渋谷区〇〇1-2-3', sub: 'PawTag株式会社' }
              ].map((info, i) => (
                <div key={i} className="flex flex-col gap-5 bg-[#f8f8f6] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`${info.icon} ${info.iconColor} text-lg`}></i>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-0.5">{info.title}</div>
                      <div className="text-gray-800 text-sm font-medium">{info.desc}</div>
                      <div className="text-gray-400 text-xs font-light mt-0.5">{info.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-3">
              <form
                id="contact-form"
                data-readdy-form
                onSubmit={handleContactSubmit}
                className="bg-[#f8f8f6] rounded-3xl p-6 md:p-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">お名前 <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="山田 太郎"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">メールアドレス <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    お問い合わせ内容 <span className="text-rose-500">*</span>
                    <span className={`ml-2 font-normal ${contactForm.message.length > 500 ? 'text-rose-500' : 'text-gray-400'}`}>
                      {contactForm.message.length}/500
                    </span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="お問い合わせ内容をご記入ください（500文字以内）"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none"
                  />
                  {contactForm.message.length > 500 && (
                    <p className="text-rose-500 text-xs mt-1">500文字以内でご入力ください</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === 'sending' || contactForm.message.length > 500}
                  className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactStatus === 'sending' ? (
                    <><i className="ri-loader-4-line animate-spin"></i>送信中...</>
                  ) : (
                    <><i className="ri-send-plane-line"></i>送信する</>
                  )}
                </button>

                {contactStatus === 'success' && (
                  <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl px-4 py-3 text-sm font-medium">
                    <i className="ri-checkbox-circle-line text-teal-500 text-base"></i>
                    お問い合わせを受け付けました。1〜2営業日以内にご返信いたします。
                  </div>
                )}
                {contactStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm font-medium">
                    <i className="ri-error-warning-line text-rose-500 text-base"></i>
                    送信に失敗しました。時間をおいて再度お試しください。
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-36 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Happy%20dog%20owner%20hugging%20golden%20retriever%20in%20beautiful%20Japanese%20park%20cherry%20blossoms%20warm%20golden%20sunset%20light%20emotional%20heartwarming%20scene%20professional%20photography%20cinematic%20quality%20wide%20shot&width=1920&height=900&seq=cta-bg-v4&orientation=landscape"
            alt="CTA"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gray-950/70"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-400 uppercase mb-4 md:mb-5">Get Started</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-5 leading-[1.2] md:leading-[1.05] tracking-tight">
            大切な家族を守る<br />
            <span className="text-teal-400">準備を始めましょう。</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base font-light mb-8 md:mb-10 leading-relaxed">
            登録は無料。3分で始められます。クレジットカード不要。
          </p>
          <Link href="/register" className="inline-flex items-center gap-3 bg-teal-500 text-white px-8 md:px-12 py-4 rounded-full hover:bg-teal-400 transition-all font-bold text-base md:text-lg shadow-2xl hover:-translate-y-1 whitespace-nowrap">
            <i className="ri-rocket-line"></i>今すぐ無料で始める
          </Link>
          <p className="text-gray-500 text-xs md:text-sm font-light mt-5 md:mt-6">すでに10,000人以上の飼い主様にご利用いただいています</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-10">
            <div className="col-span-2 md:col-span-2">
              <div className="font-['Pacifico'] text-2xl text-teal-400 mb-3">PawTag</div>
              <p className="text-sm font-light leading-relaxed text-gray-600 mb-5">
                愛犬を守る、新しい安心のカタチのスマートQRドッグタグ。大切な家族のために。
              </p>
              <div className="flex gap-3">
                {['ri-twitter-x-line', 'ri-instagram-line', 'ri-facebook-fill'].map((icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">
                    <i className={`${icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">サービス</h4>
              <ul className="space-y-2.5 text-sm font-light">
                {[['機能紹介', '#features'], ['使い方', '#steps'], ['お客様の声', '#testimonials'], ['よくある質問', '#faq']].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-teal-400 transition-colors cursor-pointer">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">サポート</h4>
              <ul className="space-y-2.5 text-sm font-light">
                {[['ヘルプ', '#'], ['よくある質問', '#faq'], ['お問い合わせ', '#contact'], ['利用規約', '#']].map(([item, href]) => (
                  <li key={item}><a href={href} className="hover:text-teal-400 transition-colors cursor-pointer">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">会社情報</h4>
              <ul className="space-y-2.5 text-sm font-light">
                {['会社概要', 'プライバシーポリシー', '特定商取引法'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-teal-400 transition-colors cursor-pointer">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-sm font-light text-gray-700">&copy; 2025 PawTag. All rights reserved.</p>
            <p className="text-xs font-light text-gray-800">Made with ❤️ for dog lovers in Japan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
