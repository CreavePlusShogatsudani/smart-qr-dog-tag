'use client';

export default function LocationButton() {
  const handleClick = () => {
    if (confirm("現在地（GPS情報）を飼い主に送信しますか？\n位置情報は匿名でのみ共有されます。")) {
      alert("現在地を送信しました。ご協力ありがとうございます。");
    }
  };

  return (
    <div className="mb-6 animate-fade-in-up">
      <button 
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-[20px] text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-[0_8px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-1"
      >
        <i className="ri-map-pin-2-fill text-xl animate-bounce"></i>
        現在地を飼い主に送信する（匿名）
      </button>
      <p className="text-center text-[10px] text-gray-400 font-bold mt-2 tracking-wide">
        ※位置情報は匿名で飼い主のシステムにのみ送信されます
      </p>
    </div>
  );
}
