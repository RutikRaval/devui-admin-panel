import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './ShowComponent.css';
import { deleteComponent, showAllComponent, updateComponent } from '../../services/componentApi';
import { formattedDate } from '../../utils/utils';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import { useState } from 'react';
import CodeEditor from '../../components/codeEditer/CodeEditer';
import toast from 'react-hot-toast';

const ShowComponent = () => {
    const [selectedLanguages, setSelectedLanguages] = useState({});
    const [editingComponentId, setEditingComponentId] = useState(null);
    const [editedSnippets, setEditedSnippets] = useState({});
    const queryClient = useQueryClient()
    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ["showAllComponent"],
        queryFn: showAllComponent,
        select: (data) => data.component
    });

    const handleLanguageChange = (componentId, language) => {
        setSelectedLanguages((prev) => ({
            ...prev,
            [componentId]: language
        }));
    };

    const handleEditClick = (componentId, item) => {
        if (editingComponentId === componentId) {
            setEditingComponentId(null); // Cancel editing
            setEditedSnippets({});
        } else {
            setEditingComponentId(componentId); // Start editing

            // Pre-fill all code snippets for that component
            const snippets = {};
            item.code.forEach(c => {
                snippets[c.language] = c.code;
            });
            setEditedSnippets(snippets);
        }
    };

    const handleCodeChange = (language, value) => {
        setEditedSnippets(prev => ({
            ...prev,
            [language]: value
        }));
    };
    const updateMutation = useMutation({
        mutationFn: updateComponent,
        onSuccess: (res) => {
            if (res?.success) {
                toast.success(res?.message)
                queryClient.invalidateQueries(["showAllComponent"])
            }
        },
        onError: (error) => {
            toast.error(error)
        }

    })

    const handleUpdate = (id, data) => {
        const value = Object.entries(editedSnippets).map(([key, value]) => ({ language: key, code: value }))
        const newData = {
            name: data?.name,
            description: data?.description,
            category: data?.category,
            code: value
        }
        updateMutation.mutate({ id, body: newData })
    }
    const deleteMutation = useMutation({
        mutationFn: deleteComponent,
        onSuccess: (res) => {
            if (res?.success) {
                toast.success(res?.message)
                queryClient.invalidateQueries(["showAllComponent"])
            }
        },
        onError: (error) => {
            toast.error(error)
        }
    })
    return (
        <section className='showcomponent-wrapper'>
            <div className="container">
                <h3 className='text-center mb-4'>All Components</h3>

                {isLoading && <div className="text-center">Loading...</div>}
                {isError && <div className="text-center text-danger">Error loading data</div>}
                {data?.length === 0 && <div className="text-center">No Data Found</div>}

                {isSuccess && (
                    <div className="component-grid">
                        {data.map((item) => {
                            const selectedLanguage = selectedLanguages[item._id] || item.code[0]?.language;
                            const selectedCode = item.code.find(c => c.language === selectedLanguage);

                            return (
                                <div className="component-card" key={item._id}>
                                    <div className="component-header d-flex justify-content-between align-items-center">
                                        <h5>{item.name}</h5>
                                        <span className="badge bg-secondary">{item.category}</span>
                                    </div>

                                    <p className="description">{item.description}</p>

                                    <div className="language-selector mb-2">
                                        <label className="form-label">Select Language:</label>
                                        <select
                                            className="form-select"
                                            value={selectedLanguage}
                                            onChange={(e) => handleLanguageChange(item._id, e.target.value)}
                                        >
                                            {item.code.map((c) => (
                                                <option key={c._id} value={c.language}>
                                                    {c.language.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedCode && (
                                        <div className="code-section">
                                            {editingComponentId === item._id ? (
                                                <CodeEditor
                                                    language={selectedLanguage}
                                                    value={editedSnippets[selectedLanguage] || ''}
                                                    onChange={(val) => handleCodeChange(selectedLanguage, val)}
                                                />
                                            ) : (
                                                <CodeBlock
                                                    language={selectedCode.language}
                                                    code={selectedCode.code}
                                                />
                                            )}
                                        </div>
                                    )}

                                    <div className="meta-info d-flex justify-content-between mt-2">
                                        <small>Created: {formattedDate(item.createdAt)}</small>
                                        <small>Updated: {formattedDate(item.updatedAt)}</small>
                                    </div>

                                    <div className="card-actions mt-3 d-flex gap-2">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleEditClick(item._id, item)}
                                        >
                                            {editingComponentId === item._id ? 'Cancel' : 'Edit'}
                                        </button>

                                        {editingComponentId === item._id ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => {
                                                    handleUpdate(item._id, item)
                                                    setEditingComponentId(null);
                                                }}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button className="btn btn-outline-danger" onClick={()=>deleteMutation.mutate(item._id)}>Delete</button>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowComponent;
