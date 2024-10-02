import { Radio, Checkbox, Slider, Button, ConfigProvider } from 'antd'
import { useState } from 'react'

const utilitiesOptions = ['WiFi', 'Water', 'Air Conditioning', 'Heating', 'Parking']

interface FilterComponentProps {
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange, onClearFilters }) => {
  const [priceSort, setPriceSort] = useState<'highest' | 'lowest' | 'all'>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>(utilitiesOptions) // Set default to all utilities

  const handleApplyFilters = () => {
    const filters = {
      priceSort: priceSort === 'all' ? 'all' : priceSort,
      priceRange,
      selectedUtilities: selectedUtilities.length === 0 ? utilitiesOptions : selectedUtilities, // Ensure it defaults to all
    }
    console.log("fl",filters)
    onFilterChange(filters)
  }

  const handleClearFilters = () => {
    setPriceSort('all')
    setPriceRange([0, 1000])
    setSelectedUtilities(utilitiesOptions) // Reset to all utilities on clear

    onClearFilters()
  }

  return (
    <div className='w-full h-full flex justify-center items-start'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#647C6C',
          },
          components: {
            Button: {
              colorTextLightSolid: '#647C6C',
            },
          },
        }}
      >
        <div className="filter-container w-4/5 flex flex-col gap-5 text-lg">
          {/* Price Sorting */}
          <div className="filter-section">
            <p>Sort by Price:</p>
            <Radio.Group value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
              <Radio value="all">All</Radio>
              <Radio value="highest">Highest Price</Radio>
              <Radio value="lowest">Lowest Price</Radio>
            </Radio.Group>
          </div>

          {/* Price Range */}
          <div className="filter-section">
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
          <div className="filter-section">
            <p>Utilities:</p>
            <Checkbox.Group
              options={utilitiesOptions}
              value={selectedUtilities}
              onChange={(checkedValues) => setSelectedUtilities(checkedValues as string[])}
            />
            {selectedUtilities.length === 0 && (
              <p className='text-base mt-2 text-gray-500'>*All utilities selected by default.</p>
            )}
          </div>

          {/* Apply Filters Button */}
          <div className="filter-section">
            <Button type="primary" className="text-white" onClick={handleApplyFilters}>
              Apply Filters
            </Button>

            {/* Clear Filters Button */}
            <Button className="ml-2" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FilterComponent
