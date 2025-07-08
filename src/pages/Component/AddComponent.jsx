import { useState } from "react";
import { useForm } from "react-hook-form";
import { showAllLanguage } from "../../services/languageApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import CodeEditor from "../../components/codeEditer/CodeEditer";
import { showAllCategory } from "../../services/categoryApi";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import { addComponent } from "../../services/componentApi";
import './AddComponent.css'


const AddComponent = () => {
  const [codeSnippets, setCodeSnippets] = useState({ angular: '', react: '', html: '', css: '' });
  const { register,reset, handleSubmit, watch, formState: { errors, isValid } } = useForm()
  const [codeError, setCodeError] = useState('');

  const onSubmit = (data) => {
    const emptyLanguages = Object.entries(codeSnippets)
      .filter(([_, value]) => !value.trim())
      .map(([lang]) => lang);

    if (emptyLanguages.length > 0) {
      setCodeError(`Missing code for: ${emptyLanguages.join(', ')}`);
      return;
    }

    setCodeError(''); 

    const body = {
      ...data,
      code:[
        {language:'react',code:codeSnippets?.react},
        {language:'angular',code:codeSnippets?.angular},
        {language:'html',code:codeSnippets?.html},
        {language:'css',code:codeSnippets?.css}
      ],
    };
    mutation.mutate(body)
    reset();
    setCodeSnippets({ angular: '', react: '', html: '', css: '' })
  };

  const mutation=useMutation({
    mutationFn:addComponent 
  })

  const { data: languages = [] } = useQuery({
    queryKey: ["languages"],
    queryFn: showAllLanguage,
    select: (data) => (
      data.languages.map(language => ({
        label: language.name.charAt(0).toUpperCase() + language.name.slice(1),
        value: language.name,
      }))
    )
  })

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: showAllCategory,
    select: (data) => (
      data?.categories.map(category => ({
        label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
        value: category.name,
      }))
    )

  })



  const handleCodeChange = (value) => {
    setCodeSnippets({ ...codeSnippets, [watch("language")]: value });
  };


  return (
    <div style={{ padding: '2rem', maxWidth: '700px' }} className='mx-auto  border shadow-lg '>
      <h5>Add new UI Component</h5>
    <hr />
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
        <div className="mt-4">
          <label>Select Category</label>
          <select
            {
            ...register("category", {
              required: "Category is required"
            })}
            className='form-select'
          >
            <option value="">-- Select Category --</option>
            {categories?.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors?.category && (
            <small className='text-danger'>{errors.category.message}</small>
          )}

        </div>
        <div className='mt-4'>
          <label>Select Language:</label>

          <select
            {...register("language", {
              required: "Language is required",
            })}
            className='form-select'
          >
            <option value="">-- Select Language --</option>
            {languages?.map((lang) => (
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
        {codeError && <small className="text-danger">{codeError}</small>}

        <div className='d-flex mt-4'>
          <button type="submit" className="btn btn-primary" disabled={!isValid}>Save Component</button>
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
