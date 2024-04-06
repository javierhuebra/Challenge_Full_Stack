import { formatearFecha } from "../../helpers/functions";
import { useNavigate } from "react-router-dom";

const CardNotePreview = ({ note, handleDelete }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="bg-blue-100 w-full  rounded-lg p-1">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        {
                            note.active ? <p className="mr-1 text-xs text-green-600">Active</p> : <p className="mr-1 text-xs text-red-600">Inactive</p>
                        }
                        {
                            note.archived ? <p className="mr-1 text-xs text-red-600">Archived</p> : <p className="mr-1 text-xs text-gray-400">Unarchived</p>
                        }

                        <p className="mr-1 text-xs text-blue-800">{formatearFecha(note.createdAt)}</p>
                        <div className="bg-blue-600 p-[3px] rounded-md cursor-pointer" onClick={() => navigate('/notes/' + note.id)}>
                            <p className="text-xs text-white">See Details</p>
                        </div>
                    </div>
                    <div className="bg-red-600 p-[3px] rounded-md cursor-pointer" onClick={() => handleDelete(note.id)}>
                        <p className="text-xs text-white">Delete</p>
                    </div>


                </div>
                <div className="bg-white mt-1 rounded-lg p-1">

                    <p className="font-bold ">{note.title}</p>
                </div>

            </div>
        </>
    );
}

export default CardNotePreview;