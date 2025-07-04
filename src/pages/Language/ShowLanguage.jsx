import React, { useState } from 'react';
import { deleteLanguage, showAllLanguage, updateLanguage } from '../../services/languageApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formattedDate, upperCaseLetter } from '../../utils/utils';
import './ShowLanguage.css';
import toast from 'react-hot-toast';

const ShowLanguage = () => {
    const [editingId, setEditingId] = useState(null); 
    const [updatedName, setUpdatedName] = useState(""); 

    const client = useQueryClient();

    const { data, isError, isSuccess, isLoading } = useQuery({
        queryKey: ['showLanguage'],
        queryFn: showAllLanguage,
        select: (data) => data.languages,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteLanguage,
        onSuccess: (response) => {
            if (response?.success) {
                toast.success(response?.message);
                client.invalidateQueries(['showLanguage']);
            }
        },
        onError: (error) => {
            toast.error(error || "Delete failed");
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateLanguage,
        onSuccess: (response) => {
            if (response?.success) {
                toast.success(response?.message);
                setEditingId(null);
                setUpdatedName("");
                client.invalidateQueries(['showLanguage']);
            }
        },
        onError: (error) => {
            toast.error(error || "Update failed");
        },
    });

    const handleEditClick = (val) => {
        setEditingId(val._id);
        setUpdatedName(val.name);
    };

    const handleUpdate = (id) => {
        if (!updatedName.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        updateMutation.mutate({id:id,name:updatedName});
    };

    return (
        <section className="showLanguage-wrapper">
            <div className="container">
                <h3 className="text-center mb-4">All Languages</h3>
                {isLoading && <div className="text-center">Loading...</div>}
                {isError && <div className="text-center text-danger">Error loading data</div>}
                {data?.length === 0 && <div className="text-center">No Data Found</div>}
                {isSuccess && (
                    <div className="Language-grid">
                        {data.map((val) => (
                            <div className="Language-card" key={val._id}>
                                {editingId === val._id ? (
                                    <>
                                        <input
                                            className="form-control mb-2"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                            placeholder="Updated Name"
                                        />
                                    </>
                                ) : (
                                    <h5 className="Language-name">{upperCaseLetter(val.name)}</h5>
                                )}

                                <p className="created-at">Created Time: {formattedDate(val.createdAt)}</p>

                                <div className="button-group">
                                    {editingId === val._id ? (
                                        <>
                                            <button className="btn btn-primary" onClick={() => handleUpdate(val._id)}>
                                                Update
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => setEditingId(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-edit" onClick={() => handleEditClick(val)}>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => deleteMutation.mutate(val._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowLanguage;
