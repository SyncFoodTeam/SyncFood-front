import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../component/header/header';
import './containerDetails.css';
import React, { useState, useEffect } from 'react'
import Menu from '../../../component/menu/menu';
import IUserPublic from '../../../interface/auth.interface';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { GetContainerService } from '../../../service/container.service';
import AddProductModal from '../../../component/addProductModal/addProductModal';
import { getProductCamService } from '../../../service/product.service';
import { IProductOpenFood } from '../../../interface/product/productOpenFood.interface';
import Loader from '../../../component/loader/loader';
import goBackArrow from '../../../assets/goBackArrow.svg'


function ContainerDetails() {
    const [user, setUser] = useState<IUserPublic>({});
    const [container, setContainer] = useState<IFoodContainers>({});
    const [noData, setNoData] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<IProductOpenFood[]>();
    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                await getContainer(id);
                setLoading(false);
            } else {
                console.log("Je n'ai pas d'id");
            }
        };

        fetchData();
    }, []);

    async function getContainer(containerId: number) {
        console.log("getContainer(containerId)");
        let myContainers = await GetContainerService(containerId);

        if (myContainers) {
            console.log("j'ai des container:")
            setContainer(myContainers);
            await getAllProduct(myContainers);
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    async function getAllProduct(container: IFoodContainers) {
        console.log("getAllProduct()");
        console.log(container.products);

        if (container?.products?.length) {
            const productPromises = container.products.map(async (product) => {
                const element = product.barCode;
                console.log(element);
                const productsOpenFood = await getProductCamService(element);
                return productsOpenFood;
            });

            const products = await Promise.all(productPromises);
            setProducts(products);

            console.log(products);
        }
    }

    const modifyContainers = async (id: number) => {
        navigate('/modifyContainers', { state: { id } });
    }

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }

    const goToProduct = async (id: string) => {
        console.warn(id);

        navigate('/productDetails', { state: { id } })
    }

    const goToProductList = async (id: number) => {
        console.warn(id);

        navigate('/productList', { state: { id } })
    }





    return (
        <div className="App">
            {!loading &&
                <div>
                    <Header />
                    <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>
                    <h3>{container.name}</h3>

                    {products?.length > 0 &&
                        <div className='product-container'>
                            {products.slice(0, 6).map((product, index) => (
                                <div key={index} className='product' onClick={() => goToProduct(product.product.code)}>

                                    <div className='productCard'>
                                        <img className='imageProductInContainerView' src={product.product.image_front_thumb_url} alt={product.product.abbreviated_product_name} />
                                        <h3 className='title'>{product.product.abbreviated_product_name || product.product.generic_name} </h3>
                                    </div>

                                </div>
                            ))}
                        </div>

                    }

                    <button onClick={() => goToProductList(container.id)}>Voir plus</button>

                    <AddProductModal containerId={container.id} />


                    <button onClick={() => modifyContainers(container.id)}>Modifier</button>

                    <Menu />
                </div>
            }
            {loading &&
                <Loader />
            }

        </div>


    );
}

export default ContainerDetails;
