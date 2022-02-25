import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createCar, deleteCar, getMyCars, updateCar} from "../../actions/carsAction";
import Modal from "../Modal";

const MyCars = () => {
    const dispatch = useDispatch()

    const {myCars, error} = useSelector(state => state.carsReducer)

    const [carName, setCarName] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carId, setCarId] = useState('')

    const [createModal, setCreateModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    useEffect(() => {
            dispatch(getMyCars())
    }, [])


    const toggleCreateModal = () => {
        setCreateModal(prev => !prev)
    }

    const toggleUpdateModal = () => {
        setUpdateModal(prev => !prev)
    }


    const onAddHandler = () => {
        dispatch(createCar(carName, carModel, myCars))

        if(!error) {
            setCarName('')
            setCarModel('')

            toggleCreateModal()
        }
    }

    const onDeleteHandler = (e) => {
        if(e.target.name === 'delete') {
            const carId = e.target.parentNode.dataset.id
            dispatch(deleteCar(carId, myCars))
        }
    }

    const onUpdateHandler = () => {
        dispatch(updateCar(carId,carName, carModel, myCars))


        if(!error) {
            setCarId('')
            setCarName('')
            setCarModel('')

            toggleUpdateModal()
        }
    }

    const showUpdateModal = (e) => {
        e.stopPropagation()
        const id = e.target.parentNode.dataset.id

        const car = myCars.find(car => car.id === id)

        setCarId(id)
        setCarName(car.carName)
        setCarModel(car.carModel)

        toggleUpdateModal()
    }

    return (
        <div>
            <div className='list' onClick={onDeleteHandler}>
                <h2 style={{margin: '8px auto' }}>My Cars</h2>

                {
                    myCars && myCars.map(car => <div
                        className='list-item'
                        data-id={car.id}
                        key={car.id}
                    >
                        <Link className='item' to={`/car/${car.id}`}>{car.carName} - {car.carModel}</Link>
                        <button className='btn btn-alert item' name='delete'>Delete</button>
                        <button className='btn btn-success item' onClick={showUpdateModal}>Update</button>
                    </div>)
                }

                <button className='btn btn-success' onClick={toggleCreateModal}>Add new car</button>
            </div>


            <Modal error={error} show={createModal} close={toggleCreateModal} header='ADD NEW CAR'>
                <input value={carName} onChange={(e) => setCarName(e.target.value)} type="text"/><br/>
                <input value={carModel} onChange={(e) => setCarModel(e.target.value)} type="text"/><br/>
                <button onClick={onAddHandler}>Add Car</button>
            </Modal>

            <Modal error={error} show={updateModal} close={toggleUpdateModal} header='UPDATE CAR'>
                <input value={carName} onChange={(e) => setCarName(e.target.value)} type="text"/><br/>
                <input value={carModel} onChange={(e) => setCarModel(e.target.value)} type="text"/><br/>
                <button onClick={onUpdateHandler}>Update Car</button>
            </Modal>
        </div>
    );
};

export default MyCars;
