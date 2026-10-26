import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchedQuery } from '@/redux/jobslice'

const category = [
    "Frontend developer",
    "Backend developer",
    "Data science",
    "Graphic designer",
    "Full stack developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setsearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className='w-full overflow-x-hidden my-10'>
            <Carousel className="w-full max-w-[75%] sm:max-w-xl mx-auto">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-full sm:basis-1/2 md:basis-1/3 pl-2"
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full w-full py-2 text-xs sm:text-sm hover:border-[#6A38C2] hover:text-[#6A38C2]"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel