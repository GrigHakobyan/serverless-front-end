import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getCars} from "../../actions/carsAction";

const Cars = () => {
    const dispatch = useDispatch()
    const {cars, error} = useSelector((state => state.carsReducer))

    useEffect(()=> {
            dispatch(getCars())
    }, [])

    return (
        <div className='list'>
            <h2 style={{margin: 'auto'}}>Cars</h2>
            <h2 className='error'>{error}</h2>
            {
                cars && cars.map(car => <div
                    className='list-item'
                    key={car.id}
                >
                    <Link to={`/car/${car.id}`}>{car.carName} - {car.carModel}</Link>
                </div>)
            }
        </div>
    );
};

export default Cars;
