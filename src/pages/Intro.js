import { ReactComponent as Ilustrasi } from "../analytics.svg";
import { Link } from "react-router-dom";

export default function Intro({ slide, setSlide }) {
  if (slide !== 0) return null;

  return (
    <div className="bg-image p-8 text">
      <div className="h-4/5 flex mt-2">
        <div className="w-1/2 h-4/6 flex justify-center self-center mr-12">
          <Ilustrasi />
        </div>
        <div className="w-1/2 text-5xl self-center">
          <p>PENGAMBILAN KEPUTUSAN</p>
          <p className="font-bold">DALAM KONDISI</p>
          <p>BERISIKO</p>
          <div className="flex mt-4">
            <Link to="/calculate">
              <div className="btn-start w-32 text-center text-base rounded-md cursor-pointer py-2">Mulai</div>
            </Link>
            <div className="flex ml-6 self-center text-base font-semibold hover:underline cursor-pointer" onClick={() => setSlide(1)}>
              <p>lihat tutorial</p>
              <svg className="w-5 h-5 self-center ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="mt-16 text-base font-semibold">
              <p>EVITA DWI OCTAVIANI PUTRI</p>
              <p>2110191057</p>
              <p>3 D4 IT B</p>
            </div>
        </div>
      </div>
    </div>
  );
}
