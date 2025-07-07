import React, { useEffect, useState } from 'react';
import { getAllLanguageAPi } from '../../services/componentApi';
import CodeEditor from '../codeEditer/CodeEditer';
import { useForm } from 'react-hook-form';

const AddComponent = () => {
    const [languages, setLanguages] = useState([]);
    const [codeSnippets, setCodeSnippets] = useState({});

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = data => console.log(data);

    useEffect(() => {
        getAllLanguage();
    }, []);

    const getAllLanguage = async () => {
        const response = await getAllLanguageAPi();
        if (response?.success) {
            const formatted = response.languages.map(language => ({
                label: language.name.charAt(0).toUpperCase() + language.name.slice(1),
                value: language.name,
            }));
            setLanguages(formatted);
        }
    };

    console.log(watch("name"), watch("description"), watch("language"));

    const handleCodeChange = (value) => {
        setCodeSnippets({ ...codeSnippets, [watch("language")]: value });
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '700px' }} className='mx-auto  border shadow-lg '>
            <h5>Add new UI Component</h5>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-4'>
                    <label>Component Name:</label>
                    <input
                        {...register("name",
                            {
                                required: "Component name is required",
                                minLength: { value: 2, message: "Minimum 2 character is required" },
                                maxLength: { value: 20, message: "Maximum 20 character is allowed" }
                            }
                        )}
                        placeholder='Compnent Name'
                        className='form-control'
                    />
                    {errors.name && <small className='text-danger'>{errors?.name?.message}</small>}
                </div>

                <div className='mt-4'>
                    <label>Component Description:</label>
                    <input
                        {...register("description",
                            {
                                required: "Component description is required",
                                minLength: { value: 2, message: "Minimum 2 character is required" },
                                maxLength: { value: 50, message: "Maximum 50 character is allowed" }
                            }
                        )}
                        placeholder='Enter Description'
                        className='form-control'
                    />
                    {errors?.description && <small className='text-danger'>{errors?.description?.message}</small>}
                </div>
                {/* <div className="mt-4">
                    <label>Select Category</label>
                    <select
                        {
                        ...register("category", {
                            required: "Category is required"
                        })}
                        className='form-select'
                    >
                        <option value="">-- Select Category --</option>
                        {languages.map((category) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div> */}
                <div className='mt-4'>
                    <label>Select Language:</label>

                    <select
                        {...register("language", {
                            required: "Language is required",
                        })}
                        className='form-select'
                    >
                        <option value="">-- Select Language --</option>
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>

                    {errors?.language && (
                        <small className='text-danger'>{errors.language.message}</small>
                    )}

                </div>
                {watch("language") && (
                    <div className='mt-4'>
                        <h5>Add {watch("language")} Code</h5>
                        <CodeEditor
                            language={watch("language")}
                            value={codeSnippets[watch("language")] || ''}
                            onChange={handleCodeChange}
                        />
                    </div>
                )}
                <div className='d-flex mt-4'>
                    <button type="submit" className="btn btn-primary">Save Component</button>
                </div>

            </form>

            {/* <div className='mt-4'>
                <h6>Current Snippet Data:</h6>
                <pre style={{ background: '#f6f6f6', padding: '10px' }}>
                    {JSON.stringify(codeSnippets, null, 2)}
                </pre>
            </div> */}
        </div>
    );
};

export default AddComponent;
