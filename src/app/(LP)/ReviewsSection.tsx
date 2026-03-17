
'use client';

export default function ReviewsSection() {
  const reviews = [
    {
      name: '田中 美咲',
      pet: '柴犬 ハナちゃんの飼い主',
      text: '散歩中に迷子になってしまった時、すぐに連絡をもらえて本当に助かりました。QRコードのおかげで無事に再会できました。首輪のデザインもおしゃれで大満足です。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20woman%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2030s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev1-v3&orientation=squarish',
    },
    {
      name: '佐藤 健太',
      pet: 'トイプードル モコちゃんの飼い主',
      text: 'LED光る首輪を購入しました。夜の散歩も安心ですし、QRコードも目立たず自然に馴染んでいます。充電も長持ちで使いやすいです。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20man%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2040s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev2-v3&orientation=squarish',
    },
    {
      name: '鈴木 由美',
      pet: 'ゴールデンレトリバー レオくんの飼い主',
      text: '3Dアクセサリーは想像以上のクオリティでした。写真そっくりに作ってもらえて、友人にも自慢しています。QRコード機能も完璧で安心感が違います。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20woman%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2035s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev3-v3&orientation=squarish',
    },
    {
      name: '山田 拓也',
      pet: 'ビーグル ラッキーくんの飼い主',
      text: 'ハーネスのフィット感が抜群で、愛犬も嫌がらずに着けてくれます。QRコードの情報更新がスマホから簡単にできるのも便利です。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20man%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2045s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev4-v3&orientation=squarish',
    },
    {
      name: '伊藤 さくら',
      pet: 'チワワ ピーちゃんの飼い主',
      text: 'デザインがおしゃれで機能性も抜群。キーホルダータイプを既存の首輪に付けるだけで使えるのが手軽で良かったです。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20woman%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2028s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev5-v3&orientation=squarish',
    },
    {
      name: '中村 誠',
      pet: 'ラブラドール クロちゃんの飼い主',
      text: '無料でQRコードを作成できるのが嬉しい。商品の質も高く、縫製もしっかりしています。緊急モードの機能は本当に安心感があります。',
      rating: 5,
      img: 'https://readdy.ai/api/search-image?query=japanese%20man%20smiling%20portrait%2C%20casual%20style%2C%20friendly%20warm%20face%2C%20soft%20neutral%20background%2C%20natural%20light%2C%2050s%2C%20film%20photography%20aesthetic&width=120&height=120&seq=rev6-v3&orientation=squarish',
    },
  ];

  return (
    <section id="reviews" className="py-36 bg-gray-50">
      <div className="w-full px-10 md:px-16 lg:px-24">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-24 gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-5">Reviews</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              ご利用者様の<br />
              <span className="font-semibold">声</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-4xl font-light text-gray-900">4.9</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-xs"></i>
                ))}
              </div>
              <p className="text-gray-400 text-xs tracking-widest mt-1">2,400件以上</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className={`py-10 px-2 border-t border-gray-200 flex gap-8 group hover:bg-white transition-colors ${
                i % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:border-l'
              }`}
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-14 h-14 object-cover object-top flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <i key={j} className="ri-star-fill text-yellow-400 text-xs"></i>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-[2] mb-4">{r.text}</p>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">{r.name}</p>
                  <p className="text-gray-400 text-xs tracking-wide mt-0.5">{r.pet}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 lg:col-span-2" />
        </div>

      </div>
    </section>
  );
}
