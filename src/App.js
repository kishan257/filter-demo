import React, { useEffect, useState } from 'react';
import { Data } from './data';
import DataTable from './component/DataTable';

function App() {
  const [filteredData, setFilteredData] = useState(Data);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchName, setSearchName] = useState('');

  const [availableCities] = useState(["dallas", "san francisco", "denver"]);
  const [availableCategories] = useState(["one", "two"]);
  const [availableTypes] = useState(["A", "B", "C"]);
  const [availableStatuses] = useState(["TRUE", "FALSE"]);

  const handleCityChange = (e, city) => {
    const isChecked = e.target.checked;
    setSelectedCities(prevCities =>
      isChecked ? [...prevCities, city] : prevCities.filter(item => item !== city)
    );
  };

  const handleCategoryChange = (e, category) => {
    const isChecked = e.target.checked;
    setSelectedCategories(prevCategories =>
      isChecked ? [...prevCategories, category] : prevCategories.filter(item => item !== category)
    );
  };

  const handleTypeChange = (e, type) => {
    const isChecked = e.target.checked;
    setSelectedTypes(prevTypes =>
      isChecked ? [...prevTypes, type] : prevTypes.filter(item => item !== type)
    );
  };

  const handleStatusChange = (e, status) => {
    const isChecked = e.target.checked;
    setSelectedStatuses(prevStatuses =>
      isChecked ? [...prevStatuses, status] : prevStatuses.filter(item => item !== status)
    );
  };

  useEffect(() => {
    let updatedData = Data;

    if (selectedCities.length) {
      updatedData = updatedData.filter(row => selectedCities.includes(row.city) || selectedCities.includes(row.address));
    }

    if (selectedCategories.length) {
      updatedData = updatedData.filter(row => selectedCategories.includes(row.category));
    }

    if (selectedTypes.length) {
      updatedData = updatedData.filter(row => selectedTypes.includes(row.type) || selectedTypes.includes(row.rating));
    }

    if (selectedStatuses.length) {
      updatedData = updatedData.filter(row => selectedStatuses.includes(row.status || ''));
    }

    if (selectedStatuses.length) {
      updatedData = updatedData.filter(row => selectedStatuses.includes(row.active));
    }
    if (searchName) {
      updatedData = updatedData.filter(row => 
        (row.name && row.name.toLowerCase().includes(searchName.toLowerCase())) || 
        (row.mall && row.mall.toLowerCase().includes(searchName.toLowerCase()))
        
      );
    }

    setFilteredData(updatedData);

  }, [selectedCities, selectedCategories, selectedTypes, selectedStatuses, searchName]);



  return (
    <>
      <div className='filter_main'>
        <div className='filterGroup'>
          <h2>City</h2>
          <div className='filterOptions'>
            {availableCities.map(city => (
              <div key={city}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => handleCityChange(e, city)} />
                  <span className="slider round"></span>
                </label>
                <label>{city}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='filterGroup'>
          <h2>Category</h2>
          <div className='filterOptions'>
            {availableCategories.map(category => (
              <div key={category}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => handleCategoryChange(e, category)} />
                  <span className="slider round"></span>
                </label>
                <label>{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='filterGroup'>
          <h2>Type</h2>
          <div className='filterOptions'>
            {availableTypes.map(type => (
              <div key={type}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => handleTypeChange(e, type)} />
                  <span className="slider round"></span>
                </label>
                <label>{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='filterGroup'>
          <h2>Active</h2>
          <div className='filterOptions'>
            {availableStatuses.map(status => (
              <div key={status}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => handleStatusChange(e, status)} />
                  <span className="slider round"></span>
                </label>
                <label>{status}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='filterSearch'>
          <input type='text' placeholder='Search by name' onChange={(e) => setSearchName(e.target.value)} />
        </div>
      </div>
      <DataTable data={filteredData} />
    </>
  );
}

export default App;
