import { Radio, Checkbox, Slider, Button, ConfigProvider, Spin, Alert } from 'antd'
import { useEffect, useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'

const utilitiesOptions = ['WiFi', 'Water', 'Air Conditioning', 'Heating', 'Parking']

interface FilterComponentProps {
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
  currentFilters: any
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange, onClearFilters, currentFilters }) => {
  const [priceSort, setPriceSort] = useState<'highest' | 'lowest' | 'All'>('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  // const [selectedUtilities, setSelectedUtilities] = useState<string[]>(utilitiesOptions) // Set default to all utilities
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>(['All']) // Updated to initialize as empty
  const [utilitiesOptions, setUtilitiesOptions] = useState<string[]>([]) // State to hold fetched utilities
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state
  useEffect(() => {
    setPriceSort(currentFilters.priceSort || 'All')
    setPriceRange(currentFilters.priceRange || [0, 1000])
    setSelectedUtilities(currentFilters.selectedUtilities || ['All'])
  }, [currentFilters])
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        setLoading(true)
        const response = await studySpaceAPI.get('/Amity/name')
        setUtilitiesOptions(response.data.data)
        // setSelectedUtilities(response.data.data);
        setSelectedUtilities(['All'])
      } catch (err) {
        setError('Failed to fetch utilities.') // Handle error
      } finally {
        setLoading(false)
      }
    }

    fetchUtilities()
  }, [])
  const handleApplyFilters = () => {
    const filters = {
      priceSort: priceSort === 'All' ? 'All' : priceSort,
      priceRange,
      selectedUtilities: selectedUtilities.includes('All') 
        ? ['All'] // When 'All' is selected, return ['All']
        : selectedUtilities // Otherwise return the selected utilities
    }
    console.log('fl', filters)
    onFilterChange(filters)
  }

  const handleClearFilters = () => {
    setPriceSort('All')
    setPriceRange([0, 1000])
    setSelectedUtilities(['All']) // Reset to all utilities on clear

    onClearFilters()
  }

  return (
    <div className='w-full h-full flex justify-center items-start'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#647C6C'
          },
          components: {
            Button: {}
          }
        }}
      >
        <div className='filter-container w-4/5 flex flex-col gap-5 text-lg'>
          {loading && <Spin tip='Loading utilities...' />}
          {error && <Alert message={error} type='error' showIcon closable />}
          {/* Price Sorting */}
          <div className='filter-section'>
            <p>Sort by Price:</p>
            <Radio.Group value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
              <Radio value='All'>All</Radio>
              <Radio value='highest'>Highest Price</Radio>
              <Radio value='lowest'>Lowest Price</Radio>
            </Radio.Group>
          </div>

          {/* Price Range */}
          <div className='filter-section'>
            <p>Price Range:</p>
            <Slider
              range
              min={0}
              max={1000}
              value={priceRange}
              onChange={(value: number[]) => setPriceRange([value[0], value[1]])}
            />
            <p>
              ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>

          {/* Utilities */}
          {/* <div className="filter-section">
            <p>Utilities:</p>
            <Checkbox.Group
              options={utilitiesOptions}
              value={selectedUtilities}
              onChange={(checkedValues) => setSelectedUtilities(checkedValues as string[])}
            />
            {selectedUtilities.length === 0 && (
              <p className='text-base mt-2 text-gray-500'>*All utilities selected by default.</p>
            )}
          </div> */}
          {/* Utilities */}
          <div className='filter-section'>
            <p>Utilities:</p>
            <Checkbox.Group
              options={utilitiesOptions}
              value={selectedUtilities}
              onChange={(checkedValues) => {
                const newValues = checkedValues as string[]
                // If 'All' is selected, reset to include all utilities
                if (newValues.includes('All')) {
                  setSelectedUtilities(['All'])
                } else {
                  setSelectedUtilities(newValues)
                }
              }}
            />
              <p className='text-base mt-2 text-gray-500'>*All utilities selected by default.</p>
          </div>
          {/* Apply Filters Button */}
          <div className='filter-section'>
            <Button type='primary' className='text-white' onClick={handleApplyFilters}>
              Apply Filters
            </Button>

            {/* Clear Filters Button */}
            <Button className='ml-2' onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FilterComponent
