import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../../controllers/notesController";
import { userContext } from "../../context/propContext";
import { urlBack } from "../../config/const";
import Swal from "sweetalert2";
import { formatearFecha } from "../../helpers/functions";
import ButtonPrincipal from "../util/ButtonPrincipal";
import { updateNote } from "../../controllers/notesController";


const NoteDetailView = () => {
    const navigate = useNavigate();
    const { userData } = useContext(userContext);
    const [note, setNote] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    const [noteDTO, setNoteDTO] = useState({
        title: '',
        description: '',
        archived: false,
        active: true
    });

    const { id } = useParams();

    const handleArchived = () => {
        setNoteDTO({
            ...noteDTO,
            archived: !noteDTO.archived
        });

    }
    const handleActive = () => {
        setNoteDTO({
            ...noteDTO,
            active: !noteDTO.active
        });
    };

    const handleChange = (e) => {
        setNoteDTO({
            ...noteDTO,
            [e.target.id]: e.target.value
        });
        console.log(noteDTO);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateNote(urlBack, id, noteDTO, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "Note updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setNoteDTO({
                    title: res.title,
                    description: res.description,
                    archived: res.archived,
                    active: res.active
                });
                getNote(urlBack, id, userData.token, setIsLoading)
                    .then((res) => {
                        console.log(res);
                        if (res === null) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: '<a href="#">Why do I have this issue?</a>'
                            });
                        }

                        setNote(res);
                        setNoteDTO({
                            title: res.title,
                            description: res.description,
                            archived: res.archived,
                            active: res.active
                        });
                    })
                setIsEditting(false);
                navigate('/index');
            })

    }

    useEffect(() => {
        getNote(urlBack, id, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                if (res === null) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }

                setNote(res);
                setNoteDTO({
                    title: res.title,
                    description: res.description,
                    archived: res.archived,
                    active: res.active
                });
            })
    }, []);
    return (
        <>
            <div className="bg-white w-full h-full  flex justify-center flex-col items-center" >

                {
                    isLoading ? <p>Loading...</p> :
                        <>
                            {
                                isEditting ?
                                    <>
                                        <form className="w-80 mr-3 rounded-lg bg-blue-100 border-blue-700 border-2 p-3" onSubmit={handleSubmit}>
                                            <div className="mb-5">
                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input onChange={handleChange} value={noteDTO.title} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meeting group" required />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <textarea onChange={handleChange} value={noteDTO.description} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example: Meet about things" required />
                                            </div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Archived?</label>
                                            <div className="flex cursor-pointer mb-4 border rounded-xl p-1 border-gray-300" onClick={handleArchived}>
                                                <div className={noteDTO.archived && 'bg-blue-400 font-bold p-1 rounded-lg  '}>
                                                    <p>Yes</p>
                                                   
                                                </div>
                                                <div className={!noteDTO.archived && 'bg-blue-400 font-bold p-1 rounded-lg'}>
                                                    <p>No</p>
                                                </div>
                                                <p className="text-xs ml-2 text-gray-400">Cick to set</p>
                                            </div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Active?</label>
                                            <div className="flex cursor-pointer border rounded-xl p-1 border-gray-300 mb-5" onClick={handleActive}>
                                                <div className={noteDTO.active && 'bg-blue-400 font-bold p-1 rounded-lg'}>
                                                    <p>Yes</p>
                                                </div>
                                                <div className={!noteDTO.active && 'bg-blue-400 font-bold p-1 rounded-lg'}>
                                                    <p>No</p>
                                                </div>
                                                <p className="text-xs ml-2 text-gray-400">Cick to set</p>
                                            </div>
                                            {
                                                isLoading ? <p>Loading...</p> :
                                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Note</button>
                                            }

                                        </form>
                                    </>
                                    :
                                    <>
                                        <div className="p-5 max-w-70 rounded-lg bg-blue-100 border-blue-700 border-2">
                                            <p className="">Title</p>
                                            <div className=" font-bold rounded-lg p-2 bg-white">
                                                <p>{note.title}</p>
                                            </div>
                                            <p className="">Description</p>
                                            <div className="font-bold rounded-lg p-2 bg-white">
                                                <p>{note.description}</p>
                                            </div>
                                            <p className="">Is archived?</p>
                                            <p className="text-sm font-bold text-blue-700 rounded-lg bg-white mt-1 p-2">{note.archived ? 'Yes' : 'No'}</p>
                                            <p className="">Is arctive?</p>
                                            <p className="text-sm font-bold text-blue-700 rounded-lg bg-white mt-1 p-2">{note.active ? 'Yes' : 'No'}</p>

                                            <p>{formatearFecha(note.createdAt)}</p>
                                        </div>

                                    </>
                            }


                            <div className="mt-5" onClick={() => setIsEditting(!isEditting)}>
                                <ButtonPrincipal text={isEditting ? 'Cancel' : 'Edit'} />
                            </div>

                        </>
                }

            </div>
        </>
    );
}

export default NoteDetailView;