import './AddLanguage.css'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { addLanguage } from '../../services/languageApi'
import { useMutation } from '@tanstack/react-query'

const validationSchema = yup.object({
    name: yup.string().required("Name is Required")
})
const AddLanguage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    })
    const mutation = useMutation({
        mutationFn: addLanguage,
        onSuccess: (response) => {
            if (response?.success) {
                toast.success(response?.message)
                reset()
            }
        },
        onError: (error) => {
            toast.error(error)
        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)
    }
    return (
        <section className='addlanguage-wrapper'>
            <div className='outer-wrapper d-flex justify-content-center align-items-center'>
                <div className='inner-wrapper'>
                    <h3 className='text-center mb-4'>
                        Add Language
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className='d-block form-label'>Name</label>
                            <input type="text"  {...register("name")} className={`form-control ${errors.name && 'is-invalid'}`} />
                            {
                                errors.name && (
                                    <small className='text-danger'>{errors.name.message}</small>
                                )
                            }
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary w-100 my-4'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddLanguage