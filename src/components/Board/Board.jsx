import React from 'react';
import './Board.scss'
import axios from 'axios';
import Modal from '../Modal/Modal';

const Board = () => {

  const [images, setImages] = React.useState([])
  const [imageId, setImageId] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  
  React.useEffect(() => {
    axios.get(`http://test-backend.itdelta.agency/api/images`)
      .then(d => {
        setImages(d.data)
      })
  }, [])

  const modalImageUrl = (id) => {
    document.body.style.overflow = 'hidden'
    setImageId(id)
    setOpenModal(true)
  }
  
  return (
    <div className='board'>
      <div className="board-body">
        <div className="board-body_images">
          {
            images.map(obj => {
              return <div key={obj.id} className="board-body_image">
                <img onClick={() => modalImageUrl(obj.id)} className='img' src={obj.image} alt={`image-${obj.id}`} />
              </div>
            })
          }
          
          {
            openModal && <Modal id={imageId} setOpenModal={setOpenModal} />
          }
          {/* <div className="board-body_image">
            <img onClick={() => openModal()} className='img' src="https://i.pinimg.com/736x/bb/58/bd/bb58bdbfd72620db733518937bb58fb7.jpg" alt="" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Board;