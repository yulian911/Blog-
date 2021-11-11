import React,{useState ,useRef,useEffect} from 'react'
import { submitComment } from '../service'

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false)
    const [localStorage ,setLocalStorage]=useState(null)
    const [showSuccesMessage, setshowSuccesMessage] = useState(false)
    const commentEl =useRef()
    const nameEl =useRef()
    const emailEl =useRef()
    const storeDataEl =useRef()

    useEffect(() =>{
        nameEl.current.value =window.localStorage.getItem('name')
        emailEl.current.value =window.localStorage.getItem('email')
    },[])

    const handleCommentSubmision = ()=>{
        setError(false)
        const {value:comment} =commentEl.current
        const {value:name} =nameEl.current
        const {value:email} =emailEl.current
        const {checked:storeData} =storeDataEl.current

      if(!comment || !email ||!name){
        setError(true)
        return ;

      }
      const commentObj ={
          name,email ,comment ,slug
      }
      if (storeData) {
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('email', email);
      } else {
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('email');
      }
      submitComment(commentObj)
      .then((res)=>{
          setshowSuccesMessage(true)
          setTimeout(()=>{
            setshowSuccesMessage(false)
          },3000)
      })


    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700"
                placeholder='Comment'
                name="comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text" ref={nameEl}
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700 "
                placeholder='Name'
                name="name"
                />
                  <input type="text" ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-grey-700 "
                    placeholder='Email'
                    name="email"
                    />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="">
                    <input ref={storeDataEl} type='checkbox' id='storeData' name='storeData' />
                    <label className="text-grey-500 cursor-pointer ml-2" htmlFor='storeData'>Save my email and name for next time I comment. </label>
                </div>
            </div>
            {error && <p className="tetx-xs text-red-500 ">All fields are required</p>}
            <div className="mt-8">
                    <button 
                        type='button'
                        onClick={handleCommentSubmision}
                        className='transition duration-500 easy hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full  text-white px-8 py-3 cursor-pointer'
                    >
                            Post Comment
                    </button>
                    {showSuccesMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500 "></span>}
            </div>
        </div>
    )
}

export default CommentsForm
