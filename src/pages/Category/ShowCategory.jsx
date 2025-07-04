import { useQuery } from "@tanstack/react-query"
import { showAllCategory } from "../../services/categoryApi"

const ShowCategory = () => {

    const { data: data, isError, isSuccess, isLoading } = useQuery({
        queryKey: ["showCategory"],
        queryFn: showAllCategory,
        select: (data) => data.categories 
    });
    return (
        <section className='showCategory-wrapper'>
            <div>
                <h3>
                    All Categories
                </h3>
                {isLoading && (<div>Loading...</div>)}
                {isError && (<div>Error in Loading Data</div>)}
                {
                    isSuccess && (
                        data.map((val)=>{
                            return(
                                <div>
                                    {val.name}
                                </div>
                            )
                        })
                    )
                }
            </div>
        </section>
    )
}

export default ShowCategory