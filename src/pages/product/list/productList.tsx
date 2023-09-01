import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './groupsList.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ajout from '../../../assets/add.svg'
import NoDataComponent from '../../../component/noData/noData';
import IProducts from '../../../interface/product/products.interface';

function ProductList() {

    const navigate = useNavigate();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        
    }, []);

    const addProduct = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/addProduct');
    }


    const goToProduct = async (id: number) => {
        console.log(id);
        navigate('/productDetails/', { state: { id } });
    }


    return (
        <div className="App">

            <Header />

            <h1>{groups.name}</h1>

            {!noData &&
                <div>
                    {products.map((product: IProducts, index: number) => (
                        <div key={index}>

                            <div className='groupe'>
                                <div className='image'> IMAGE</div>
                                <div className='descriptif'>
                                    <h3>{product.name} </h3>
                                </div>
                            </div>

                            <div onClick={() => goToProduct(product.id)}>
                                Voir plus
                            </div>
                        </div>
                    ))}
                </div>
            }
            {noData &&
                <NoDataComponent />
            }
            <button onClick={addProduct} className="ajout"><img src={ajout} alt='Ajout de groupe' /></button>



            <Menu />
        </div>


    );
}

export default ProductList;
