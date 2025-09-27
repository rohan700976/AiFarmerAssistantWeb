import React from 'react'

function Yojana() {

    const schemes = [
{
id: 1,
name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
desc: "Direct income support to small and marginal farmers to supplement their financial needs.",
image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80&auto=format&fit=crop",
beneficiaries: 12000000,
tag: "Highly Beneficial",
},
{
id: 2,
name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
desc: "Crop insurance scheme to protect farmers from crop losses due to natural calamities.",
image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&q=80&auto=format&fit=crop",
beneficiaries: 8500000,
tag: "Highly Beneficial",
},
{
id: 3,
name: "Kisan Credit Card (KCC)",
desc: "Provides farmers with timely access to credit for cultivation and allied activities.",
image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80&auto=format&fit=crop",
beneficiaries: 9500000,
tag: "Highly Beneficial",
},
{
id: 4,
name: "Soil Health Card Scheme",
desc: "Periodic soil testing and customised nutrient recommendations to improve productivity.",
image: "https://iasnext.com/wp-content/uploads/2024/02/Soil-Health-Cards.webp",
beneficiaries: 4300000,
tag: "Highly Beneficial",
},
{
id: 5,
name: "e-NAM (National Agriculture Market)",
desc: "Digital marketplace connecting farmers to buyers across mandis for better price discovery.",
image: "https://cdn1.byjus.com/wp-content/uploads/2016/05/e-nam-logo1.png",
beneficiaries: 3000000,
tag: "Highly Beneficial",
},
{
id: 6,
name: "PM-AASHA (Price Support Scheme & MSP operations)",
desc: "Measures to ensure remunerative prices for farmers through procurement and market support.",
image: "https://www.financialexpress.com/wp-content/uploads/2019/02/crop.jpg?w=1024",
beneficiaries: 2750000,
tag: "Highly Beneficial",
},
];


const fmt = (n) => new Intl.NumberFormat('en-IN').format(n);
  return (
   <section className="py-8 px-4 bg-gray-50">
<div className="max-w-7xl mx-auto">
<div className="mb-6 text-center">
<h2 className="text-2xl sm:text-4xl font-semibold text-green-800 font-serif">Top Government Schemes Helping Indian Farmers</h2>
<p className="text-sm sm:text-lg text-gray-800 mt-4">Shown: only schemes that proved highly beneficial — beneficiaries shown for scale</p>
</div>


<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
{schemes.map((s) => (
<article key={s.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
<div className="relative h-44 sm:h-48 lg:h-40 w-full overflow-hidden">
<img
src={s.image}
alt={s.name}
className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
/>
<span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">{s.tag}</span>
</div>


<div className="p-4 sm:p-5">
<h3 className="text-lg font-semibold leading-tight">{s.name}</h3>
<p className="text-sm text-gray-600 mt-2 mb-4">{s.desc}</p>


<div className="flex items-center justify-between">
<div>
<p className="text-xs text-gray-500">Beneficiaries</p>
<p className="text-sm font-medium">{fmt(s.beneficiaries)} farmers</p>
</div>


<button
className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
aria-label={`More about ${s.name}`}
>
Details
</button>
</div>
</div>
</article>
))}
</div>

</div>
</section>
  )
}

export default Yojana