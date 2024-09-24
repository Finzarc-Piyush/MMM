import { useRouter } from 'next/router';
import { useFilter } from '../context/FilterContext';

const SelectOptions = () => {
  const router = useRouter();
  const { selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange } = useFilter();

  const brands = ['All', 'Saffola', 'NSA', 'Livon'];
  const geographies = ['All', 'NSA Stronghold', 'DA Stronghold', 'Uncontested'];
  const packRanges = ['All', '0-40 ml', '41-89 ml', '90-299 ml', 'Large Packs'];

  const handleSubmit = () => {
    sessionStorage.setItem('selectedBrand', selectedBrand);
    sessionStorage.setItem('selectedGeography', selectedGeography);
    sessionStorage.setItem('selectedPackRange', selectedPackRange);
    router.push('/overview'); // Redirect to the appropriate page
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Select Options</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Geography</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={selectedGeography}
            onChange={(e) => setSelectedGeography(e.target.value)}
          >
            {geographies.map((geo) => (
              <option key={geo} value={geo}>{geo}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pack Range</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={selectedPackRange}
            onChange={(e) => setSelectedPackRange(e.target.value)}
          >
            {packRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        <button
          className="w-full bg-indigo-600 text-white p-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelectOptions;