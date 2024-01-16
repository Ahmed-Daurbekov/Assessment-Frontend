import React from 'react';
import './Modal.scss'
import axios from 'axios';

const Modal = ({id, setOpenModal}) => {
  const [imageObj, setImageObj] = React.useState('')
  const [comments, setComments] = React.useState([])
  const [commentObj, setCommentObj] = React.useState({
    comment: ''
  })

  React.useEffect(() => {
    axios.get(`http://test-backend.itdelta.agency/api/image/${id}`)
      .then(d => {
        setImageObj(d.data.largeImage)
        setComments(d.data.comments)
      })
  }, [])
  
  const closeModal = (e) => {
    if (e.target.className == 'modal') {
      document.body.style.overflow = 'visible'
      setOpenModal(false)
    }
  }

  async function addNewComment(e) {
    e.preventDefault()
    if (commentObj.comment.trim() != '') {
      try {
        let data = await axios.post(`http://test-backend.itdelta.agency/api/image/${id}/comments`, commentObj)
        if (data.status == 204) {
          alert('Комментарий успешно добавлен')
        }
      } catch (error) {
        alert('Ошибка. Комментарий не был добавлен')
      }
    } else {
      alert('Заполните поле для комментарии')
    }
  }
  
  return (
    <div onClick={e => closeModal(e)} className='modal'>
      <div className="modal-body">
        <div className="modal-body_image">
          <img src={imageObj} alt={imageObj} />
        </div>

        <form>
          <label className='label comment-label' htmlFor="comment-textarea">
            <span className='title'>Comment</span>
            <textarea onChange={e => setCommentObj({...commentObj, comment: e.target.value.trim()})} id="comment-textarea"></textarea>
          </label>
          <span className='clue'>Write a few sentences about the photo.</span>
          <button onClick={e => addNewComment(e)} className='submit'>Save</button>
        </form>

        <div className="comments-list">
          <span className='title'>Comments</span>
          {
            comments.length ? comments.map(obj => {
              return <div key={obj.id} className="comment">
                <span className="author">Автор: {obj.author}</span>
                <p className="text">{obj.text}</p>
              </div>
            }) : <>
              <p className='empty-comments'>Комментарии отсутствуют</p>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;