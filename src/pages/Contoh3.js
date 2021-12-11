import image from "../images/contoh3.png";

export default function Tutorial3({ slide, setSlide }) {
  if (slide !== 3) return null;

  return (
    <div className="bg-image min-h-screen p-8 text">
      <div className="flex text-base font-semibold hover:underline cursor-pointer" onClick={() => setSlide(0)}>
        <svg className="w-5 h-5 self-center mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <p>kembali ke beranda</p>
      </div>
      <div className="w-full h-90 flex-wrap">
        <div className="w-2/3 flex shadow-2xl mt-4 mx-64">
          <img src={image} alt="tutorial image" />
        </div>
        <div className="text-4xl self-center mt-4 mx-64">
          <p>
            Masukkan <b>Permintaan </b>
            dan <b>Probabilitas</b>
          </p>
          <div className="text-base mt-2">
            <p>- Isi input field lalu klik tombol plus untuk menambahkan</p>
            <p>- Data dapat diubah atau dihapus dengan mengetuk kolom terkait</p>
          </div>
          <div className="flex mt-4 justify-center">
            <div className="w-4 h-4 mr-2 cursor-pointer rounded-full border border-biru" onClick={() => setSlide(1)} />
            <div className="w-4 h-4 mr-2 cursor-pointer rounded-full border border-biru" onClick={() => setSlide(2)} />
            <div className="w-4 h-4 mr-2 cursor-pointer rounded-full bg-biru" />
            <div className="w-4 h-4 mr-2 cursor-pointer rounded-full border border-biru" onClick={() => setSlide(4)} />
          </div>
        </div>
        
      </div>
      <div className="text-xs font-semibold mt-4">
        <p>EVITA DWI OCTAVIANI PUTRI</p>
        <p>2110191057</p>
        <p>3 D4 IT B</p>
      </div>
    </div>
  );
}
