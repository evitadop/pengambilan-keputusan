import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Decision() {
  const [data, setData] = useState([]);
  const [payoff, setPayoff] = useState([[]]);
  const [exReturn, setExReturn] = useState([[]]);
  const [beli, setBeli] = useState("");
  const [jual, setJual] = useState("");
  const [id, setId] = useState(0);
  const [permintaan, setPermintaan] = useState("");
  const [probabilitas, setProbabilitas] = useState("");
  const [hasil, setHasil] = useState(null);
  const [toggle, setToggle] = useState(false);

  const addData = () => {
    if (permintaan !== "" && probabilitas !== "") {
      setData([...data, { id, permintaan: parseInt(permintaan), probabilitas: parseFloat(probabilitas) }]);
      setId(id + 1);
    }
    setPermintaan("");
    setProbabilitas("");
  };

  const handleDeleteData = (i) => {
    const itemRemoved = data.splice(i, 1);
    setData(data.filter((data) => data !== itemRemoved));
  };

  const handleKeyPress = (code) => {
    if (code === "Enter") {
      addData();
    }
  };

  const transpose = (a) => {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  };

  const calculatePayoff = () => {
    var temp = new Array(data.length);
    for (var i = 0; i < temp.length; i++) {
      temp[i] = new Array(data.length);
    }
    if (toggle) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].permintaan < data[i].permintaan) {
            const diagonal = data[i].permintaan * jual - data[i].permintaan * beli;
            temp[i][j] = diagonal - (data[i].permintaan - data[j].permintaan) * jual;
          } else if (data[j].permintaan === data[i].permintaan) {
            temp[i][j] = data[i].permintaan * jual - data[i].permintaan * beli;
          } else {
            const diagonal = data[i].permintaan * jual - data[i].permintaan * beli;
            temp[i][j] = diagonal - (data[i].permintaan - data[j].permintaan) * (beli - jual);
          }
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].permintaan < data[i].permintaan) {
            temp[i][j] = data[j].permintaan * jual - data[i].permintaan * beli;
          } else {
            temp[i][j] = data[i].permintaan * jual - data[i].permintaan * beli;
          }
        }
      }
    }

    setPayoff(transpose(temp));
    return temp;
  };

  const calculateReturn = async () => {
    const payoffRef = await calculatePayoff();
    var max = 0;
    var temp = new Array(data.length);
    for (var i = 0; i < temp.length; i++) {
      temp[i] = new Array(data.length);
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        temp[i][j] = data[j].probabilitas * payoffRef[i][j];
      }
    }
    for (let i = 0; i < temp.length; i++) {
      var sum = 0;
      for (let j = 0; j < temp.length; j++) {
        sum += temp[i][j];
      }
      temp[i][temp.length] = sum;
      if (sum > max) {
        setHasil(i);
        max = sum;
      }
    }
    setExReturn(transpose(temp));
  };

  useEffect(() => {
    if (data.length > 0) calculateReturn();
  }, [data, beli, jual, toggle]);

  return (
    <div className="bg-image h-screen p-8 pb-16 text">
      <Link to="/">
        <div className="flex text-base font-semibold hover:underline cursor-pointer">
          <svg className="w-5 h-5 self-center mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <p>Kembali ke Beranda</p>
        </div>
      </Link>
      <div className="flex-wrap font-bold mt-6">
        <div className="flex">
          <p>Biaya Produksi :</p>
          <p className="font-normal ml-2 mr-1">Rp</p>
          <input
            className="border border-black border-opacity-20 rounded-md mr-8 px-2"
            type="number"
            value={beli}
            placeholder="Masukkan Nominal"
            onChange={(e) => setBeli(e.target.value)}
          />
        </div>
        <div className="flex mt-4">
          <p>Biaya Penjualan :</p>
          <p className="font-normal ml-2 mr-1">Rp</p>
          <input
            className="border border-black border-opacity-20 rounded-md px-2"
            type="number"
            value={jual}
            placeholder="Masukkan Nominal"
            onChange={(e) => setJual(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 text-left">
        <div className="flex">
          <p className="font-bold">Hitung Rugi Kesempatan</p>
          <div
            className={
              `ml-3 w-11 h-6 px-1 self-center rounded-full flex cursor-pointer ` + (toggle ? "justify-end bg-yellow-900" : "justify-start bg-gray-300")
            }
            onClick={() => setToggle(!toggle)}
          >
            <div className="bg-white w-4 h-4 self-center rounded-full" />
          </div>
        </div>
        <p>
          NB: Aktifkan untuk menghitung rugi kesempatan yaitu berupa keuntungan yang menjadi hilang karena pembeli datang tetapi tidak bisa terlayani
        </p>
        <p className="font-bold mt-6">Data Permintaan dan Probabilitas</p>
        <table className="divide-y divide-yellow-900 w-2/4 bg-white">
          <thead className="bg-yellow-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Permintaan (Unit/Hari)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Probabilitas</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-yellow-700">
            {(data?.length &&
              data.map((list, i) => (
                <tr key={i}>
                  <td className="px-6 whitespace-nowrap">{i + 1}.</td>
                  <td className="px-6 whitespace-nowrap">{list.permintaan}</td>
                  <td className="px-6 whitespace-nowrap">{list.probabilitas}</td>
                  <td className="flex">
                    <svg
                      className="w-4 h-4 text-red-600 cursor-pointer mx-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleDeleteData(i)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                </tr>
              ))) ||
              null}
            <tr>
              <td className="px-6 whitespace-nowrap">{(data?.length && data.length + 1) || 1}.</td>
              <td>
                <input
                  className="w-full px-2"
                  type="number"
                  value={permintaan}
                  placeholder="Input Permintaan"
                  onChange={(e) => setPermintaan(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="w-full px-2"
                  type="number"
                  value={probabilitas}
                  placeholder="Input Probabilitas"
                  onChange={(e) => setProbabilitas(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e.key)}
                />
              </td>
              <td className="flex justify-end">
                <svg
                  className="w-5 h-5 text-green-600 cursor-pointer mx-1"
                  onClick={addData}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="font-bold mt-6">Tabel Pay Off</p>
        <table className="divide-y divide-yellow-900 w-full bg-white">
          <thead className="bg-yellow-900">
            <tr>
              <td
                colSpan="1"
                rowSpan="2"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white"
              >
                probabilitas
              </td>
              <td
                colSpan={data.length}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white text-center"
              >
                jumlah permintaan dan probabilitas
              </td>
            </tr>
            <tr>
              {(data?.length &&
                data.map((list, i) => (
                  <td key={i} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white">
                    {list.permintaan} = {list.probabilitas}
                  </td>
                ))) || <td>-</td>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-yellow-900">
            {(data?.length &&
              data.map((list, i) => (
                <tr>
                  <td key={i} className="px-6 whitespace-nowrap">
                    {list.permintaan}
                  </td>
                  {payoff?.length &&
                    payoff.map((list, j) => (
                      <td key={j} className="px-6 whitespace-nowrap">
                        {list[i]}
                      </td>
                    ))}
                </tr>
              ))) || <td>-</td>}
          </tbody>
        </table>
        <p className="font-bold mt-6">Tabel Pay Off Net Cash Flows</p>
        <table className="divide-y divide-yellow-900 w-full bg-white">
          <thead className="bg-yellow-900">
            <tr>
              <td
                colSpan="1"
                rowSpan="2"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white"
              >
                expected result
              </td>
              <td
                colSpan={data.length}
                rowSpan="1"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white text-center"
              >
                probabilitas
              </td>
              <td
                colSpan="1"
                rowSpan="2"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white"
              >
                ER
              </td>
            </tr>
            <tr>
              {(data?.length &&
                data.map((list, i) => (
                  <td key={i} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-white">
                    {list.probabilitas}
                  </td>
                ))) || <td>-</td>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(data?.length &&
              data.map((list, i) => (
                <tr>
                  <td key={i} className={`px-6 whitespace-nowrap ` + (i == hasil ? "font-bold" : "")}>
                    ER = {list.permintaan}
                  </td>
                  {exReturn?.length &&
                    exReturn.map((list, j) => (
                      <td key={j} className={`px-6 whitespace-nowrap ` + (i == hasil ? "font-bold" : "")}>
                        {list[i]}
                      </td>
                    ))}
                </tr>
              ))) || <td>-</td>}
          </tbody>
        </table>
        <p className="font-bold mt-6">Kesimpulan</p>
        {hasil ? (
          <p>
            Total produksi yang harus disediakan adalah sejumlah <b>{data[hasil].permintaan}</b>
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}
