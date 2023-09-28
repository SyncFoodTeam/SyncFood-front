import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './productList.css';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Loader from '../../../component/loader/loader';
import AddProductModal from '../../../component/addProductModal/addProductModal';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { getProductCamService } from '../../../service/product.service';
import { GetContainerService } from '../../../service/container.service';
import { IProductOpenFood } from '../../../interface/product/productOpenFood.interface';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';

function ProductList() {

    const navigate = useNavigate();
    const [products, setProducts] = useState<IProductOpenFood[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const id = location.state?.id;
    const [container, setContainer] = useState<IFoodContainers>({});
    const { t } = useTranslation();

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

    const addProduct = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/addProduct');
    }

    const goToProduct = async (id: string) => {
        navigate('/productDetails', { state: { id } })
    }





    return (
        <div className="App">
            {!loading &&
                <div>
                    <Header />
                    <div>
                        <GoBack />
                    </div>
                    {products?.length > 0 &&
                        <div className='product-container'>
                            {products.map((product, index) => (
                                <div key={index} onClick={() => goToProduct(product.product.code)}>
                                    <div>
                                        <img className='imageProductInContainerView' src={product.product.image_front_thumb_url} alt={product.product.abbreviated_product_name} />
                                        <h3 className='title'>{product?.product?.abbreviated_product_name || product?.product?.generic_name || product?.product?.product_name} </h3>
                                    </div>

                                </div>
                            ))}
                        </div>

                    }

                    <AddProductModal containerId={container.id} />

                    <Menu />
                </div>
            }
            {loading &&
                <Loader />
            }

        </div>


    );
}

export default ProductList;
