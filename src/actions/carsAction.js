import {setCar, setCars, setError, setMyCars} from "../reducers/carsReducer";
import request from "../helpers/axios";


export const getCars = () => {
    return async dispatch => {
        try {
            const {data} = await request.get('/cars')

            dispatch(setCars(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

export const getCarById = (carId) => {
    return async dispatch => {
        try {
            const {data} = await request.get(`/car/${carId}`)

            dispatch(setCar(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const getMyCars = () => {
    return async dispatch => {
        try {
            const {data} = await request.get('/cars/user')

            dispatch(setMyCars(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const createCar = (carName, carModel, myCars) => {
    return async dispatch => {
        try {
            const {data} = await request.post('/car',{
                carName,
                carModel
            })

            myCars.push(data)

            dispatch(setMyCars(myCars))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }

}


export const deleteCar = (carId, myCars) => {
    return async dispatch => {
        try {
            await request.delete('/car',{
                data: {
                    carId
                }
            })

            const updatedCars = myCars.filter(car => car.id !== carId)

            dispatch(setMyCars(updatedCars))
            dispatch(setError(''))
        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

export const updateCar = (carId, carName, carModel, myCars) => {
    return async dispatch => {
        try {
            const {data} = await request.put('/car', {
                    carId,
                    carName,
                    carModel
            })


            const updatedCars = myCars.filter(car => car.id !== carId)
            updatedCars.push({
                id: data.id,
                carName: data.carName,
                carModel: data.carModel})

            dispatch(setMyCars(updatedCars))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}
