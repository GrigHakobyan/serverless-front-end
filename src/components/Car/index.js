import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCarById} from "../../actions/carsAction";

const Car = () => {
    const {carId} = useParams()

    const [findCar, setFindCar] = useState('')

    const dispatch = useDispatch()
    const {car, cars, error} = useSelector(state => state.carsReducer)


    useEffect(() => {
        const foundedCar = cars?.find(car => car.id === carId)

        if(foundedCar) {
            setFindCar(foundedCar)
        } else {
            dispatch(getCarById(carId))
        }

    }, [])

    return (
        <div>
            {
                error ?
                        <p>{error}</p>
                    :
                    findCar ?
                        <>
                            <p>{findCar.carName}</p>
                            <p>{findCar.carModel}</p>
                        </>
                        :
                        <>
                            <p>{car.carName}</p>
                            <p>{car.carModel}</p>
                        </>

            }
        </div>
    );
};

export default Car;
