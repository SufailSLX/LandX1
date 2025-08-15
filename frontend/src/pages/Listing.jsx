import React, { useState, useEffect } from 'react'
import Searchbar from '../components/Searchbar'
import { propertyService } from '../services/propertyService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Item from "../components/Item";

const Listing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await propertyService.getAllProperties(filters);
      setProperties(response.properties || response);
    } catch (err) {
      setError(err.message);
      // Fallback to static data if API fails
      const { PROPERTIES } = await import('../constant/data');
      setProperties(PROPERTIES);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchProperties();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await propertyService.searchProperties(searchTerm);
      setProperties(response.properties || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='max-padd-container my-[99px]'>
      <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
        <div>
          <Searchbar onSearch={handleSearch} />
          
          {loading && <LoadingSpinner size="large" className="py-20" />}
          
          {error && !loading && (
            <ErrorMessage 
              message={error} 
              onRetry={fetchProperties}
              className="py-20"
            />
          )}
          
          {/* container  */}
          {!loading && properties.length > 0 && (
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 
          xl:grid-cols-3 mt-10'>
              {properties.map((property, index) => (
                <Item key={property.id || property.title || index} property={property} />
              ))}
            </div>
          )}
          
          {!loading && properties.length === 0 && !error && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Listing
