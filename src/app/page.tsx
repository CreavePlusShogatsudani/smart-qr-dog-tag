'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-['Pacifico'] text-teal-600 text-2xl animate-pulse">
        PawTag
      </div>
    );
  }

  const faqs = [
    {
      question: '月額料金はかかりますか？',
      answer: 'アカウント登録・QRコード作成・情報管理はすべて無料です。QRタグ（物理商品）のみ別途ご購入いただきます。',
    },
    {
      question: '複数の犬を登録できますか？',
      answer: 'はい、1つのアカウントで複数の愛犬を登録できます。それぞれに専用のQRコードが発行されます。',
    },
    {
      question: '個人情報は安全ですか？',
      answer: '飼い主の個人情報は暗号化して保護しています。発見者には必要最小限の連絡手段のみ表示されます。',
    },
    {
      question: 'QRコードが読み取れなくなることはありますか？',
      answer: '耐水性・耐久性のある素材を使用しています。万が一ご不便な場合はお問い合わせください。',
    },
    {
      question: 'スマホを持っていない人でも使えますか？',
      answer: '発見者がスマートフォンでQRコードをスキャンする必要があります。現代ではほとんどの方がスマートフォンをお持ちのため、多くの場合問題なくご利用いただけます。',
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <div className="font-['Pacifico'] text-xl md:text-2xl text-teal-600">PawTag</div>
          <nav className="hidden md:flex items-center gap-8">
            {[['使い方', '#steps'], ['機能', '#features'], ['料金', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-gray-500 hover:text-teal-600 transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden md:block">
              ログイン
            </Link>
            <Link
              href="/register"
              className="bg-teal-600 text-white text-xs md:text-sm font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              無料で始める
            </Link>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {[['使い方', '#steps'], ['機能', '#features'], ['料金', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-gray-700 font-medium py-1 hover:text-teal-600 transition-colors"
              >
                {label}
              </a>
            ))}
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-base text-gray-700 font-medium py-1">
              ログイン
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-14 md:pt-16">
        <div className="relative min-h-[90svh] flex items-center overflow-hidden bg-gradient-to-br from-white via-teal-50/40 to-teal-100/60">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-teal-100 rounded-full opacity-50 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-teal-200 rounded-full opacity-30 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-8 w-full py-20 md:py-28">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-teal-100 border border-teal-200 text-teal-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wider">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse inline-block" />
                完全無料 · 登録3分 · クレカ不要
              </div>

              <h1 className="text-gray-900 tracking-tight mb-6">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-[1.35]">
                  「もしも」の時の、
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-[1.35] text-teal-600">
                  お守り。
                </span>
                <span className="block text-xl md:text-2xl font-light text-gray-500 mt-5 leading-[1.8]">
                  愛犬のためのスマートQRドッグタグ
                </span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg font-light leading-[1.9] mb-10 max-w-lg">
                首輪のタグにQRコードを印刷するだけ。発見者がスキャンすれば、愛犬の情報と飼い主の連絡先が即座に表示されます。
                従来の迷子札では伝えられなかった情報を、クラウドで管理できます。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-teal-700 transition-all shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <i className="ri-heart-line" />
                  今すぐ無料で始める
                </Link>
                <a
                  href="#steps"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-50 transition-all border border-gray-200 shadow-sm active:scale-[0.98]"
                >
                  使い方を見る
                  <i className="ri-arrow-down-line text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              従来の迷子札には<br className="md:hidden" />限界があります
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
              金属タグに名前と電話番号だけ。それだけでは、もしもの時に十分ではありません。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
            {/* 従来の迷子札 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <i className="ri-price-tag-3-line text-gray-400 text-xl"></i>
                </div>
                <h3 className="text-lg font-black text-gray-500">従来の迷子札</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '名前と電話番号しか刻めない',
                  '情報を変更するには作り直し',
                  '連絡先が1つしか登録できない',
                  '医療情報・アレルギーを伝えられない',
                  '発見者との連絡が取れたか確認できない',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                    <i className="ri-close-line text-red-400 text-base mt-0.5 flex-shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* PawTag */}
            <div className="bg-white rounded-3xl p-8 border-2 border-teal-400 relative">
              <div className="absolute -top-3 left-8">
                <span className="bg-teal-600 text-white text-xs font-black px-4 py-1 rounded-full">PawTag</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <i className="ri-qr-code-line text-teal-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-black text-teal-700">PawTag（このサービス）</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '写真・犬種・特徴・医療情報を登録',
                  'スマホからいつでも情報を更新',
                  '複数の連絡先を登録できる',
                  '緊急時はモード切替で連絡先を強調表示',
                  'QRスキャン時に通知が届く（開発中）',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <i className="ri-check-line text-teal-500 text-base mt-0.5 flex-shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="steps" className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              3ステップで始められる
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base mt-4 max-w-md mx-auto leading-relaxed">
              アカウント登録から愛犬の情報設定まで、スマートフォンで簡単に完了します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-4xl mx-auto">
            {[
              {
                num: '01',
                icon: 'ri-user-add-line',
                color: 'bg-teal-100',
                iconColor: 'text-teal-600',
                title: 'アカウントを作る',
                desc: 'メールアドレスだけで登録完了。クレジットカードは不要です。',
              },
              {
                num: '02',
                icon: 'ri-edit-box-line',
                color: 'bg-amber-100',
                iconColor: 'text-amber-600',
                title: '愛犬の情報を登録',
                desc: '名前・犬種・特徴・緊急連絡先を入力。写真・医療情報も登録できます。',
              },
              {
                num: '03',
                icon: 'ri-qr-code-line',
                color: 'bg-blue-100',
                iconColor: 'text-blue-600',
                title: 'QRタグを首輪につける',
                desc: 'QRコードをタグに印刷して首輪に装着。発見者がスキャンすれば情報が表示されます。',
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`relative w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center mb-6 flex-shrink-0`}>
                  <i className={`${step.icon} ${step.iconColor} text-3xl`} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-black rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-teal-700 transition-all shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <i className="ri-rocket-line" />
              今すぐ無料で始める
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              必要な機能が、すべて揃っている
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: 'ri-qr-code-line',
                color: 'bg-teal-100',
                iconColor: 'text-teal-600',
                title: 'スキャンですぐわかる',
                desc: '発見者がカメラでQRコードを読み取るだけ。アプリのインストール不要で、愛犬のプロフィールと連絡先が即座に表示されます。',
              },
              {
                icon: 'ri-alarm-warning-line',
                color: 'bg-red-100',
                iconColor: 'text-red-600',
                title: '緊急モード',
                desc: '迷子になったらアプリで緊急モードをON。発見者の画面が切り替わり、飼い主への連絡先が大きく強調表示されます。',
              },
              {
                icon: 'ri-file-list-3-line',
                color: 'bg-amber-100',
                iconColor: 'text-amber-600',
                title: '豊富なプロフィール情報',
                desc: '名前・犬種・年齢・特徴・写真に加えて、持病・服薬中の薬・アレルギー・かかりつけ医の情報も登録できます。',
              },
              {
                icon: 'ri-smartphone-line',
                color: 'bg-purple-100',
                iconColor: 'text-purple-600',
                title: 'いつでも情報を更新',
                desc: 'スマホから登録・編集・QRコードのダウンロードまで完結。引越しや電話番号変更があっても、タグを作り直す必要がありません。',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 md:p-8 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <i className={`${feature.icon} ${feature.iconColor} text-2xl`} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 leading-tight">{feature.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              シンプルな料金体系
            </h2>
            <p className="text-gray-500 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
              アプリは完全無料。必要なのはQRを印刷するための物理タグだけです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* アプリ無料 */}
            <div className="bg-teal-600 rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <i className="ri-smartphone-line text-white text-2xl"></i>
              </div>
              <p className="text-teal-200 text-xs font-bold tracking-widest uppercase mb-2">アプリ利用料</p>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-5xl font-black">¥0</span>
                <span className="text-teal-200 text-sm font-light mb-2">完全無料</span>
              </div>
              <ul className="space-y-2 text-sm">
                {['アカウント登録', 'QRコード作成・管理', 'プロフィール登録・編集', '緊急モード切替', '複数ペットの登録'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-teal-100">
                    <i className="ri-check-line text-teal-300 flex-shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* QRタグ */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center mb-5">
                <i className="ri-qr-code-line text-gray-600 text-2xl"></i>
              </div>
              <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">QRタグ（物理商品）</p>
              <div className="flex items-end gap-1 mb-3">
                <span className="text-5xl font-black text-gray-900">¥1,280〜</span>
              </div>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-5">
                ステンレス製・シリコン製など複数の素材・カラーから選べます。印刷済みのQRタグを首輪に取り付けるだけ。
              </p>
              <Link
                href="/admin/shop"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98]"
              >
                <i className="ri-shopping-bag-line"></i>
                タグをショップで見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-bold tracking-[0.2em] text-teal-600 uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              よくあるご質問
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  expandedFaq === i
                    ? 'border-teal-200 bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`font-semibold text-sm md:text-base pr-4 ${expandedFaq === i ? 'text-teal-700' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      expandedFaq === i ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <i className={`ri-arrow-down-s-line text-lg transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-light leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-36 px-4 md:px-8 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-teal-400 uppercase mb-5">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-[1.2] tracking-tight">
            大切な家族を守る<br />
            <span className="text-teal-400">準備を始めましょう。</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light mb-10 leading-relaxed">
            登録は無料。3分で始められます。クレジットカード不要。
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-teal-500 text-white px-10 py-4 rounded-full font-bold text-base md:text-lg shadow-2xl hover:bg-teal-400 transition-all hover:-translate-y-1 active:scale-[0.98]"
          >
            <i className="ri-rocket-line" />
            今すぐ無料で始める
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-gray-800 text-gray-500 py-10 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-['Pacifico'] text-xl text-teal-400 mb-1">PawTag</div>
            <p className="text-xs font-light text-gray-600">愛犬を守る、スマートQRドッグタグ</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#steps" className="hover:text-teal-400 transition-colors">使い方</a>
            <a href="#features" className="hover:text-teal-400 transition-colors">機能</a>
            <a href="#pricing" className="hover:text-teal-400 transition-colors">料金</a>
            <a href="#faq" className="hover:text-teal-400 transition-colors">FAQ</a>
            <Link href="/admin/shop" className="hover:text-teal-400 transition-colors">ショップ</Link>
            <Link href="/login" className="hover:text-teal-400 transition-colors">ログイン</Link>
          </div>
          <p className="text-xs text-gray-700">&copy; 2025 PawTag. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
