import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, showAllCategory, updateCategory } from "../../services/categoryApi";
import './ShowCategory.css';
import { formattedDate, upperCaseLetter } from "../../utils/utils";
import toast from "react-hot-toast";
import { useState } from "react";

const ShowCategory = () => {
    const [editingId, setEditingId] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const { data, isError, isSuccess, isLoading } = useQuery({
        queryKey: ["showCategory"],
        queryFn: showAllCategory,
        select: (data) => data.categories,
    });
    const client = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (response) => {
            if (response?.success) {
                toast.success(response?.message)
                client.invalidateQueries(["showCategory"])
            }
        },
        onError: (error) => {
            toast.error(error)
        },
    })
    const updateMutation = useMutation({
        mutationFn: updateCategory,
        onSuccess: (response) => {
            if (response?.success) {
                toast.success(response?.message)
                setEditingId(null)
                setUpdatedName("")
                client.invalidateQueries(["showCategory"])
            }
        },
        onError: (error) => {
            toast.error(error)
        },
    })
    const handleUpdate = (id) => {
        if (!updatedName.trim()) {
            toast.error("Name cannot be empty")
            return
        }
        updateMutation.mutate({ id, name: updatedName })
    }
    const handleEditClick = (val) => {
        setEditingId(val._id)
        setUpdatedName(val.name)
    }

    return (
        <section className="showCategory-wrapper">
            <div className="container">
                <h3 className="text-center mb-4">All Categories</h3>
                {isLoading && <div className="text-center">Loading...</div>}
                {isError && <div className="text-center text-danger">Error loading data</div>}
                {data?.length === 0 && <div className="text-center">No Data Found</div>}
                {isSuccess && (
                    <div className="category-grid">
                        {data.map((val) => (
                            <div className="category-card" key={val._id}>
                                {
                                    editingId === val._id ? (
                                        <>
                                            <input type="text" value={updatedName} 
                                            onChange={(e) => setUpdatedName(e.target.value)} 
                                            className="form-control mb-2" placeholder="Updated name"/>
                                        </>
                                    ) : (
                                        <h5 className="category-name">{upperCaseLetter(val.name)}</h5>
                                    )
                                }


                                <p className="created-at">
                                    Created Time: {formattedDate(val.createdAt)}
                                </p>
                                <div className="button-group">
                                    {
                                        editingId === val._id ? (
                                            <>
                                                <button className="btn btn-primary"
                                                    onClick={() => handleUpdate(val._id)}>
                                                    Update
                                                </button>
                                                <button className="btn btn-secondary"
                                                    onClick={() => setEditingId(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-edit"
                                                    onClick={() => handleEditClick(val)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-delete"
                                                    onClick={() => deleteMutation.mutate(val._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowCategory;
