import React from 'react'

const filterData = [
    {
        filterType: "location",
        array: [
            "Lahore",
            "Islamabad",
            "Faisalabad",
            "Karachi",
            "Multan"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend",
            "Backend",
            "FullStack",
            "MERN"
        ]
    },
    {
        filterType: "Salary",
        array: [
            "0-4lpa",
            "4lpa-1lakh",
            "1lakh-2lakh",
            "3lakh-4lakh",
            "5lakh"
        ]
    }
]

const FilterCard = ({ selectedFilters, setSelectedFilters }) => {

    const handlerChange = (filterType, value) => {

        setSelectedFilters({
            ...selectedFilters,
            [filterType]: value
        })
    }

    return (
        <div className='w-full bg-white p-5 rounded-md shadow-md'>

            <h1 className='font-bold text-lg'>
                Filter Jobs
            </h1>

            <hr className='mt-3' />


            {
                filterData.map((data, index) => (

                    <div
                        key={index}
                        className='my-4'
                    >

                        <h1 className='font-semibold mb-2'>
                            {data.filterType}
                        </h1>


                        {
                            data.array.map((item, idx) => {

                                const id = `r-${index}-${idx}`

                                return (

                                    <div
                                        key={idx}
                                        className="flex items-center space-x-2 my-2 cursor-pointer"
                                    >

                                        <input
                                            type="radio"
                                            name={data.filterType}
                                            id={id}
                                            value={item}
                                            checked={
                                                selectedFilters[data.filterType] === item
                                            }
                                            onChange={() =>
                                                handlerChange(
                                                    data.filterType,
                                                    item
                                                )
                                            }
                                            className="w-4 h-4 cursor-pointer accent-[#6A38C2]"
                                        />

                                        <label
                                            htmlFor={id}
                                            className='cursor-pointer text-sm text-gray-700 select-none'
                                        >
                                            {item}
                                        </label>

                                    </div>

                                )
                            })
                        }

                    </div>

                ))
            }

        </div>
    )
}

export default FilterCard