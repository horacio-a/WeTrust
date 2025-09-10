import React, { useEffect, useRef, useState, useId } from "react";
import { Link } from "react-router-dom";

const Search = ({ SearchState, setSearchState }) => {
    const conteinerCategory = useRef("");
    const SearchInput = useRef("");

    const [SearchCategoty, setSearchCategoty] = useState("Todo");
    const [search, setSearch] = useState('');
    const [msgError, setmsgError] = useState('')

    const Category = [
        "Todo",
        "Anteojos",
        "Bolsos",
        "Ceniceros",
        "Encendedores",
        "Gorros / Gorras",
        "Juguetes",
        "Camperas",
        "Hoodies",
        "Pantalones",
        "Remeras",
        "Shorts",
        "Underwear",
        "Sneakers",
        "Slides",
    ];


    useEffect(() => {
        document.addEventListener('keydown', sendSearchbyEnter, true)
    }, [SearchCategoty]);

    const sendSearchbyEnter = (e) => {
        if (e.key !== 'Enter') {
            return
        }
        if (SearchInput.current.value === '') {
            setmsgError('Por favor ingrese una busqueda')
            setTimeout(() => {
                setmsgError('')
            }, 5000);
        } else {
            window.location.replace(`/search/category/${SearchCategoty}/product/${SearchInput.current.value}`)
        }
    }

    const SendSerch = () => {
        if (search === '') {
            setmsgError('Por favor ingrese una busqueda')
            setTimeout(() => {
                setmsgError('')
            }, 5000);
        } else {
            console.log(search)

            window.location.replace(`/search/category/${SearchCategoty}/product/${search}`)
        }
    }

    useEffect(() => {
        conteinerCategory.current.children[0].className = "unitCategory Active";
    }, []);

    const CategoryChangeState = (event) => {
        setSearchCategoty(event.target.textContent);

        const hijos = conteinerCategory.current.children;
        for (let i = 0; i < hijos.length; i++) {
            const element = hijos[i];
            element.className = "unitCategory Deactivated";
        }
        event.target.className = "unitCategory Active";
    };

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div className="MainSearch">
                <div className="tituloTop">
                    <div className="tituloSearch">Buscador</div>

                    <i
                        className="fa-solid fa-xmark"
                        onClick={() => {
                            setSearchState(false);
                        }}
                    ></i>
                </div>
                <main className="ContentSearch">
                    <div className="CategorySearch">
                        <div className="TituloCategorySearch">Categorías</div>
                        <div className="conteinerCategory" ref={conteinerCategory}>
                            {Category.map((item, index) => {
                                return (
                                    <div key={index} className="unitCategory Deactivated"
                                        onClick={CategoryChangeState}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="SearchEngine">
                        <div className="uno">
                            <div onClick={() => { SendSerch(); }} >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <input
                            type={"text"}
                            placeholder={"Buscador"}
                            className="SearchInput"
                            ref={SearchInput}
                            onChange={handleInputChange}
                        />
                        <div className="uno">
                            <i
                                className="fa-solid fa-xmark"
                                onClick={() => {
                                    SearchInput.current.value = "";
                                }}
                            ></i>
                        </div>
                    </div>
                    <div className="conteinerErrorSearch">{msgError}</div>
                </main>
            </div>
        </>
    );
};

export default Search;
