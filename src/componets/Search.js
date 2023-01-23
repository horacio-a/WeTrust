import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const Search = ({ SearchState, setSearchState }) => {
    const conteinerCategory = useRef('')
    const SearchInput = useRef('')

    const [SearchCategoty, setSearchCategoty] = useState('Todo')
    const [search, setSearch] = useState('')
    const Category = [
        'Todo',
        'Anteojos',
        'Bolsos',
        'Ceniceros',
        'Encendedores',
        'Gorros / Gorras',
        'Juguetes',
        'Camperas',
        'Hoodies',
        'Pantalones',
        'Remeras',
        'Shorts',
        'Underwear',
        'Sneakers',
        'Slides',
    ]
    useEffect(() => {

        conteinerCategory.current.children[0].className = 'unitCategory Active'

    }, [])
    const CategoryChangeState = (event) => {
        setSearchCategoty(event.target.textContent)

        const hijos = conteinerCategory.current.children
        for (let i = 0; i < hijos.length; i++) {
            const element = hijos[i];
            element.className = 'unitCategory Deactivated'
        }
        event.target.className = 'unitCategory Active'
    }

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }



    return (

        <>
            <div className="MainSearch">

                <div className="tituloTop">
                    <div className="tituloSearch">
                        Buscador
                    </div>

                    <i className="fa-solid fa-xmark" onClick={() => {
                        setSearchState(false)
                    }}></i>
                </div>
                <main className="ContentSearch">
                    <div className="CategorySearch">
                        <div className="TituloCategorySearch">Categorías</div>
                        <div className="conteinerCategory" ref={conteinerCategory} >
                            {
                                Category.map(item => {
                                    return <div className="unitCategory Deactivated" onClick={CategoryChangeState}>{item}</div>
                                })
                            }
                        </div>
                    </div>
                    <div className="SearchEngine">
                        <div className="uno">
                            <Link to={`/search/category/${SearchCategoty}/product/${search}`}>
                                <i className="fa-solid fa-magnifying-glass" ></i>
                            </Link>

                        </div>
                        <input type={'text'} placeholder={'Buscador'} className='SearchInput' ref={SearchInput} onChange={handleInputChange} />
                        <div className="uno">
                            <i className="fa-solid fa-xmark" onClick={() => {
                                SearchInput.current.value = ''
                            }}></i>
                        </div>

                    </div>
                </main>


            </div>


        </>


    )

}

export default Search;