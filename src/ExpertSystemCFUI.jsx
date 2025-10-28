import React, { useMemo, useState } from "react";
const knowledgeBase = {
  symptoms: [
    { code: "G001", desc: "Memakan batang tumbuhan muda", MB: 1.0, MD: 0.2 },
    { code: "G002", desc: "Membuat lubang-lubang pada pematang sawah dan sering berlindung di semak-semak", MB: 0.8, MD: 0.2 },
    { code: "G003", desc: "Menyebabkan daun dan batang tumbuhan berlubang-lubang", MB: 1.0, MD: 0 },
    { code: "G004", desc: "Daun dan batang kemudian kering, dan mati", MB: 0.6, MD: 0.2 },
    { code: "G005", desc: "Menghisap butir-butir padi yang masih cair", MB: 0.8, MD: 0.2 },
    { code: "G006", desc: "Kulit biji berwarna kehitam-hitaman", MB: 0.6, MD: 0.2 },
    { code: "G007", desc: "Memakan biji-bijian yang sudah mengeras", MB: 1.0, MD: 0 },
    { code: "G008", desc: "Memakan dedaunan bahkan pangkal batang", MB: 1.0, MD: 0 },
    { code: "G009", desc: "Daun hanya tersisa rangka atau tulang daunnya saja", MB: 0.6, MD: 0.2 },
    { code: "G010", desc: "Daun timbul bercak-bercak kecil lalu menguning hingga orange", MB: 0.8, MD: 0.2 },
    { code: "G011", desc: "Memakan humus dan akar tanaman", MB: 1.0, MD: 0 },
    { code: "G012", desc: "Pertumbuhan daun padi tidak normal", MB: 0.8, MD: 0 },
    { code: "G013", desc: "Pucuk tanaman menjadi kering dan mudah dicabut", MB: 1.0, MD: 0.4 },
    { code: "G014", desc: "Daun padi menjadi putih, tinggal kerangka daunnya saja", MB: 0.8, MD: 0.2 },
    { code: "G015", desc: "Terdapat gulungan / kantung di daun", MB: 0.6, MD: 0.2 },
    { code: "G016", desc: "Terdapat bintik kehitaman pada daun", MB: 1.0, MD: 0 },
    { code: "G017", desc: "Daun berbentuk belah ketupat dengan ujung meruncing", MB: 0.8, MD: 0.2 },
    { code: "G018", desc: "Tanaman kerdil", MB: 0.6, MD: 0.2 },
    { code: "G019", desc: "Bercak garis agak basah dan bercak akan membesar menjadi keabu-abuan", MB: 0.6, MD: 0.2 },
    { code: "G020", desc: "Daun menjadi keriput dan mengulung", MB: 0.8, MD: 0 },
    { code: "G021", desc: "Pelepah dan helaian daun memendek", MB: 0.6, MD: 0.4 },
    { code: "G022", desc: "Batang seperti terbakar", MB: 1.0, MD: 0 },
    { code: "G023", desc: "Menyebabkan biji padi menjadi hampa", MB: 0.8, MD: 0.4 },
    { code: "G024", desc: "Tanaman padi dewasa busuk dan kering", MB: 0.6, MD: 0.2 },
    { code: "G025", desc: "Biji bercak-bercak coklat tetapi tetap ada isinya", MB: 1.0, MD: 0.2 },
  ],
  diseases: [
    { id: "H001", name: "Tikus", symptoms: ["G001", "G002"], solution: "Jaga kebersihan lahan dan pasang perangkap tikus." },
    { id: "H002", name: "Wereng", symptoms: ["G003", "G004"], solution: "Gunakan varietas tahan wereng dan insektisida selektif." },
    { id: "H003", name: "Walang Sangit", symptoms: ["G005", "G006", "G007"], solution: "Jaga kebersihan lahan dan lakukan penyemprotan insektisida." },
    { id: "H004", name: "Ulat", symptoms: ["G008", "G009"], solution: "Gunakan musuh alami atau pestisida nabati." },
    { id: "H005", name: "Tungau", symptoms: ["G010"], solution: "Semprotkan akarisida bila serangan parah." },
    { id: "H006", name: "Anjing Tanah (Orong-orong)", symptoms: ["G011"], solution: "Lakukan pengolahan tanah yang baik agar tanah tidak rusak." },
    { id: "H007", name: "Ganjur", symptoms: ["G012", "G013"], solution: "Lakukan sanitasi lahan dan pengaturan irigasi yang baik." },
    { id: "H008", name: "Penggorok Daun (Hama Putih)", symptoms: ["G014", "G020"], solution: "Gunakan pestisida selektif dan musuh alami." },
    { id: "H009", name: "Blas", symptoms: ["G016", "G017", "G018"], solution: "Gunakan varietas tahan dan fungisida sistemik." },
    { id: "H010", name: "Hawar Daun Bakteri", symptoms: ["G019", "G020"], solution: "Perbaiki drainase dan gunakan varietas tahan." },
    { id: "H011", name: "Tungro", symptoms: ["G018", "G021", "G010"], solution: "Gunakan varietas tahan dan kendalikan wereng." },
    { id: "H012", name: "Busuk Batang", symptoms: ["G016", "G022", "G023"], solution: "Gunakan fungisida sesuai dosis dan sanitasi lahan." },
    { id: "H013", name: "Penyakit Bercak Daun", symptoms: ["G024", "G025"], solution: "Gunakan fungisida dan lakukan rotasi tanaman." },
  ],
};

// Fungsi Certainty Factor
function combineMB(oldMB, newMB) {
  return oldMB + newMB * (1 - oldMB);
}
function combineMD(oldMD, newMD) {
  return oldMD + newMD * (1 - oldMD);
}
function calculateCFForDisease(disease, selectedSymptomCodes) {
  const matched = disease.symptoms.filter((s) => selectedSymptomCodes.includes(s));
  if (matched.length === 0) return { CF: 0 };
  let MB = 0, MD = 0;
  matched.forEach((code) => {
    const s = knowledgeBase.symptoms.find((x) => x.code === code);
    if (MB === 0 && MD === 0) { MB = s.MB; MD = s.MD; }
    else { MB = combineMB(MB, s.MB); MD = combineMD(MD, s.MD); }
  });
  const CF = parseFloat((MB - MD).toFixed(4));
  return { CF };
}

export default function ExpertSystemCFUI() {
  const [selected, setSelected] = useState(new Set());
  const [showResult, setShowResult] = useState(false);
  const toggleSymptom = (code) => {
    const next = new Set(selected);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setSelected(next);
  };

  const selectedArray = useMemo(() => Array.from(selected), [selected]);
  const results = useMemo(() => {
    const res = knowledgeBase.diseases.map((d) => {
      const out = calculateCFForDisease(d, selectedArray);
      return { id: d.id, name: d.name, solution: d.solution, ...out };
    });
    return res.sort((a, b) => b.CF - a.CF);
  }, [selectedArray]);
  const top = results[0] || { CF: 0, name: "-", solution: "-" };

  const canDiagnose = selected.size > 0;

  return (
    <div className="min-h-screen bg-green-50 text-slate-800 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-green-200">
        {/* Pilih Gejala */}
        {!showResult && (
          <div className="bg-white p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-green-700">Pilih Gejala</h2>
              <p className="text-sm text-slate-600">
                Centang gejala yang terlihat pada tanaman padi.
              </p>
            </div>

            <div className="overflow-auto max-h-[60vh] border rounded">
              <table className="w-full table-fixed border-collapse text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border px-2 py-2 w-[50px] text-center">No</th>
                    <th className="border px-2 py-2 w-[80px] text-center">Pilih</th>
                    <th className="border px-2 py-2 w-[100px] text-center">Kode</th>
                    <th className="border px-2 py-2">Gejala</th>
                  </tr>
                </thead>
                <tbody>
                  {knowledgeBase.symptoms.map((s, i) => (
                    <tr key={s.code} className="hover:bg-green-50">
                      <td className="border px-2 py-2 text-center">{i + 1}</td>
                      <td className="border px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          className="scale-125 accent-green-600"
                          checked={selected.has(s.code)}
                          onChange={() => toggleSymptom(s.code)}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center font-semibold">{s.code}</td>
                      <td className="border px-2 py-2">{s.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tombol */}
            <div className="mt-6 flex gap-6 justify-center">
              <button
                onClick={() => canDiagnose && setShowResult(true)}
                disabled={!canDiagnose}
                className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition ${
                  canDiagnose
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proses Diagnosis
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Hasil Diagnosis */}
        {showResult && (
          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
              Hasil Diagnosis
            </h2>

            {/* Gejala Terpilih */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Gejala Terpilih</h3>
              <div className="overflow-auto border rounded">
                <table className="w-full table-fixed text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="border px-2 py-2 w-[50px] text-center">No</th>
                      <th className="border px-2 py-2 w-[100px] text-center">Kode</th>
                      <th className="border px-2 py-2">Nama Gejala</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedArray.map((code, i) => {
                      const s = knowledgeBase.symptoms.find((x) => x.code === code);
                      return (
                        <tr key={code}>
                          <td className="border px-2 py-2 text-center">{i + 1}</td>
                          <td className="border px-2 py-2 text-center font-semibold">{s?.code}</td>
                          <td className="border px-2 py-2">{s?.desc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hasil Analisa */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Hasil Analisa</h3>
              <div className="overflow-auto border rounded">
                <table className="w-full text-sm">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="border px-2 py-2 text-center w-[50px]">No</th>
                      <th className="border px-2 py-2">Hama / Penyakit</th>
                      <th className="border px-2 py-2 text-center w-[120px]">Nilai CF</th>
                      <th className="border px-2 py-2 text-center w-[100px]">Persentase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.id}>
                        <td className="border px-2 py-2 text-center">{i + 1}</td>
                        <td className="border px-2 py-2">{r.name}</td>
                        <td className="border px-2 py-2 text-center">{r.CF.toFixed(4)}</td>
                        <td className="border px-2 py-2 text-center">{Math.round(r.CF * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kesimpulan */}
            <p className="text-sm mb-3 text-center">
              Berdasarkan gejala yang dipilih, hama/penyakit paling mungkin adalah{" "}
              <b className="text-green-700">{top.name}</b> dengan tingkat kepercayaan{" "}
              <b className="text-green-700">{Math.round(top.CF * 100)}%</b>.
            </p>

            <div className="overflow-auto border rounded mb-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="border px-2 py-2 font-semibold w-[100px]">Hama</td>
                    <td className="border px-2 py-2">{top.name}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2 font-semibold">Solusi</td>
                    <td className="border px-2 py-2">{top.solution}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tombol */}
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowResult(false)}
                className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transition"
              >
                Ulang
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
              >
                Cetak
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
