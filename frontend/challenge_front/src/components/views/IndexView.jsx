import ButtonPrincipal from "../util/ButtonPrincipal";
import { useState, useContext, useEffect } from "react";
import { createNote, getAllNotes, deleteNote } from "../../controllers/notesController";
import { urlBack } from "../../config/const";
import Swal from "sweetalert2";
import { getAllCategories } from "../../controllers/categoriesController";
import { userContext } from "../../context/propContext";
import CardNotePreview from "../util/CardNotePreview";
import { createCategory } from "../../controllers/categoriesController";

const IndexView = () => {
    const { userData } = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);
    const [allNotes, setAllNotes] = useState(true);
    const [activeNotes, setActiveNotes] = useState(false);
    const [archivedNotes, setArchivedNotes] = useState(false);

    const [noteDTO, setNoteDTO] = useState({
        title: '',
        description: '',
        archived: false,
        active: true,
        categoriesIds: []
    });

    const [categoryDTO, setCategoryDTO] = useState({
        title: ''
    });

    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        setNoteDTO({
            ...noteDTO,
            [e.target.id]: e.target.value
        });
        console.log(noteDTO);
    }

    const handleChangeCategory = (e) => {
        setCategoryDTO({
            ...categoryDTO,
            [e.target.id]: e.target.value
        });
        console.log(categoryDTO);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNote(urlBack, noteDTO, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Note created successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllNotes(urlBack, userData.id, userData.token, setIsLoading)
                    .then((res) => {
                        console.log(res);
                        setNotes(res.reverse());
                    })
            })
    }
    const handleSubmitCategory = (e) => {
        e.preventDefault();
        createCategory(urlBack, categoryDTO, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category created successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getAllCategories(urlBack, userData.id, userData.token, setIsLoading)
                    .then((res) => {
                        console.log(res);
                        setCategories(res.reverse());
                    })
            })
    }
    const handleDelete = (noteId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote(urlBack, noteId, userData.token, setIsLoading)
                    .then((res) => {
                        getAllNotes(urlBack, userData.id, userData.token, setIsLoading)
                            .then((res) => {
                                console.log(res);
                                setNotes(res.reverse());
                            })
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

            }
        });

    }

    const handleAllNotes = () => {
        setAllNotes(true);
        setActiveNotes(false);
        setArchivedNotes(false);

    }

    const handleActiveNotes = () => {
        setAllNotes(false);
        setActiveNotes(true);
        setArchivedNotes(false);

    }

    const handleArchivedNotes = () => {
        setAllNotes(false);
        setActiveNotes(false);
        setArchivedNotes(true);


    }

    useEffect(() => {
        getAllNotes(urlBack, userData.id, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                setNotes(res.reverse());
            })
        getAllCategories(urlBack, userData.id, userData.token, setIsLoading)
            .then((res) => {
                console.log(res);
                setCategories(res.reverse());
            })
    }, []);
    return (
        <>
            <div className="bg-white w-full h-full  flex justify-center px-20" >

                <div className="h-full w-full ">
                    <div className="bg-white w-full border rounded-lg mt-5 shadow-xl p-3 flex">
                        <form className="w-80 mr-3" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input onChange={handleChange} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Meeting group" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea onChange={handleChange} type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example: Meet about things" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
                                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex flex-wrap w-full p-2.5 " >
                                    {
                                        isLoading ? <p>Loading...</p> :
                                            categories.map((category) => (
                                                <div key={category.id} className="bg-blue-950 mr-1 rounded-lg px-3 flex justify-center items-center p-1 mb-1">
                                                    <input type="checkbox" id="categoriesIds" value={category.id} />
                                                    <p className="text-xs font-medium text-white">{category.title}</p>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                            {
                                isLoading ? <p>Loading...</p> :
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Note</button>
                            }

                        </form>

                        <div className=" flex-1 w-full">
                            <div className="bg-blue-600 w-full h-10 pl-3 flex items-center rounded-lg">
                                <p className="mr-5 font-bold text-white">Notes</p>
                                <button onClick={handleAllNotes} className="bg-blue-400  text-white px-2 rounded-lg mr-3">All</button>
                                <button onClick={handleActiveNotes} className="bg-blue-400  text-white px-2 rounded-lg mr-3">Actives</button>
                                <button onClick={handleArchivedNotes} className="bg-blue-400  text-white px-2 rounded-lg mr-3">Archived</button>
                            </div>
                            {
                                isLoading ? <p>Loading...</p> :
                                    (allNotes ?
                                        notes.map((nota) => (
                                            <div key={nota.id} className="my-1">
                                                <CardNotePreview note={nota} handleDelete={handleDelete} />
                                            </div>
                                        ))
                                        :
                                        (activeNotes ?
                                            notes.filter((nota) => nota.active).map((nota) => (
                                                <div key={nota.id} className="my-1">
                                                    <CardNotePreview note={nota} handleDelete={handleDelete} />
                                                </div>
                                            ))
                                            :
                                            notes.filter((nota) => nota.archived).map((nota) => (
                                                <div key={nota.id} className="my-1">
                                                    <CardNotePreview note={nota} handleDelete={handleDelete} />
                                                </div>
                                            ))
                                        )
                                    )
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-white  w-full border rounded-lg mt-5 shadow-xl p-3 flex">
                            <form onSubmit={handleSubmitCategory} className="w-80 mr-3 " >
                                <div className="mb-5">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category - Work in progress</label>
                                    <input onChange={handleChangeCategory} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example: Work" required />
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create category</button>
                            </form>
                            <div className=" w-full flex-1">
                                <div className="bg-blue-600 w-full h-10 pl-3 rounded-lg flex items-center">
                                    <p className="mr-5 font-bold text-white">Categories</p>

                                </div>
                                <div className="bg-red-200 mt-1 w-full h-10 flex flex-wrap">
                                    {
                                        isLoading ? <p>Loading...</p> :
                                            categories.map((category) => (
                                                <div key={category.id} className=" bg-blue-950 mr-1 rounded-lg px-3 flex justify-center items-center">
                                                    <p className="text-xs font-medium text-white">{category.title}</p>
                                                </div>
                                            ))

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default IndexView;