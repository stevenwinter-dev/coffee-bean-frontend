import React, {useState, useEffect} from 'react'
import { Card, Button } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import axios from 'axios'
import './DashboardContent.css'

const DashboardContent = () => {
    const { currentUser } = useAuth()
    const [coffees, setCoffees] = useState(null)
    const [selected, setSelected] = useState(false)
    const [editCoffee, setEditCoffee] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const fetchData = async () => {
        let response = await axios(`/api/index`)
        console.log(response.data)
        setCoffees(response.data)
      }
      useEffect(() => {
        fetchData()
      }, [])
      const handleEdit = (coffee) => {
          setSelected(true)
          setEditCoffee(coffee)
      }
      const handleDelete = (coffee) => {
        console.log(coffee._id)
        axios.delete(`/api/delete/${coffee._id}`)
        setDeleted(true)
        setTimeout(() => {
            setDeleted(false)
        }, 3000);
        fetchData()
      }
      const handleUpdate = (e) => {
            e.preventDefault()
            console.log(e.target)
            // axios.post('/api/edit', {
            //     name: e.target.name.value,
            //     flavor: e.target.flavor.value,
            //     roast: e.target.roast.value,
            //     region: e.target.region.value,
            //     price: e.target.price.value,
            //     weight: e.target.weight.value,
            //     img: e.target.imgURL.value
            // })
      }
      const handleBack = () => {
          setSelected(false)
      }
    return (
        <Card className='dashboard-content-container'>
           {deleted && <div className='deleted'>Successfully deleted</div> }
        { !selected ?
            <div>
                <h2 className="text-center mb-4">Stock:</h2>
                {coffees && coffees.map(coffee => (
                        <div className='dashboard-content-content'>
                            <p>{coffee.name}</p>
                            <div className="icon-container">
                                <i className="far fa-edit" onClick={() => handleEdit(coffee)}></i> 
                                <i className="far fa-trash-alt" onClick={() => handleDelete(coffee)}></i> 
                            </div>
                        </div>  
                ))}
                </div> :
                <div className='add-coffee-form-container'>
                    <form action="" onSubmit={handleUpdate}  className='add-coffee-form' encType="multipart/form-data">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name='name' defaultValue={editCoffee.name}/>
                        <label htmlFor="flavor">Flavor</label>
                        <input id="flavor" type="text" name='flavor' defaultValue={editCoffee.flavor}/>
                        <label htmlFor="roast">Roast</label>
                        <input id="roast" type="text" name='roast' defaultValue={editCoffee.roast}/>
                        <label htmlFor="region">Region</label>
                        <input id="region" type="text" name='region' defaultValue={editCoffee.region}/>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="price" name='price' defaultValue={editCoffee.price}/>
                        <label htmlFor="weight">Weight</label>
                        <input id="weight" type="weight" name='weight' defaultValue={editCoffee.weight}/>
                        <label name="imgURL">Image URL</label>
                        <input id="imgURL" type="text" name='imgURL' defaultValue={editCoffee.img} />
                        <div className="create-btn-container">
                            <input className='create-btn' type="submit" value='Edit' />
                        </div>
                        <p onClick={handleBack}>Show Stock</p>
                    </form>
                </div>
        }
        </Card>
    )
}

export default DashboardContent
