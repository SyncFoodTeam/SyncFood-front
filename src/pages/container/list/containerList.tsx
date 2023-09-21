import { useTranslation } from 'react-i18next';
import Header from '../../../component/header/header';
import './containerList.css';
import React, { useState, useEffect } from 'react'
import IGroup from '../../../interface/groups/group.interface';
import { useNavigate } from 'react-router-dom';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { GetContainerService } from '../../../service/container.service';
import { getProductCamService } from '../../../service/product.service';
import { IProductOpenFood } from '../../../interface/product/productOpenFood.interface';
import frigo from '../../../assets/frigo.svg';
import placard from '../../../assets/placard.svg';
import congelateur from '../../../assets/congelateur.svg';

import IUser from '../../../interface/auth.interface';
import Loader from '../../../component/loader/loader';
interface goBackProps {
    group?: IGroup;
    user?: IUser;
}

interface containerWithProduct {
    containerId?: number
    products?: IProductOpenFood[]
}

const ContainerList: React.FC<goBackProps> = ({
    group = {},
    user = {}
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [container, setContainer] = useState<IFoodContainers>({});
    const [noData, setNoData] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    let containerWithProduct: containerWithProduct[] = [{}]
    let [containers, setContainers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log({ group });
            if (group?.foodContainers?.length) {
                console.log("j'ai des containers dans mon groupe")
                setLoading(true);
                let containers = [];
                for (let i = 0; i < group.foodContainers.length; i++) {
                    let container = await getContainer(group.foodContainers[i].id);

                    containers.push(container);

                    console.log('TATA')
                    setContainers(containers);
                    console.log({ containers });
                    if (container.products.length) {
                        console.log("mon container n'est pas vide j'ai des produits")
                        await getAllProduct(container);
                        console.log("products");
                        console.log(products);
                        let myObject = {
                            containerId: container.id,
                            products: products
                        };
                        setNoData(false);
                    } else {
                        console.log("mon container est vide")

                        setNoData(true);
                    }
                }
                setLoading(false);
            } else {
                console.log("Je n'ai pas d'id");
            }
        };

        fetchData();
    }, []);

    const goToContainer = async (id: number) => {
        console.log("goToContainer(id)");
        console.log(id)
        navigate('/containerDetails', { state: { id } });
    }

    async function getContainer(containerId: number) {
        console.log("getContainer(containerId)");
        console.log(containerId);
        let myContainers = await GetContainerService(containerId);
        console.log("mon container")
        console.log(myContainers);

        return myContainers;
    }

    async function getAllProduct(container: IFoodContainers) {
        console.log(`getAllProduct(container)`);
        console.log(container);

        if (container?.products?.length) {
            console.log("J'ai des produits dans mon container")
            const productPromises = container.products.map(async (product) => {
                const element = product.barCode;
                console.log(element);
                const productsOpenFood = await getProductCamService(element);
                return productsOpenFood;
            });

            const products = await Promise.all(productPromises);
            setProducts(products);
            console.log("Liste de mes produits");
        } else {
            console.log("Je n'ai pas de produit dans mon container")
        }
    }

    const goToProduct = async (id: string) => {
        console.log("goToProduct()");
        console.log(id);

        navigate('/productDetails', { state: { id } })
    }

    const createFoodContainer = async (id: number) => {
        navigate('/createContainer', { state: { id } });
    }

    return (
        <div className="App">

            {!loading &&
                <div>
                    <div></div>
                    {/* Permet de boucler sur tout les foods containers */}
                    {group?.foodContainers?.map((container: IFoodContainers, index: number) => (
                        <div key={index}>

                            <div>
                                <div>

                                    {products?.length > 0 &&
                                        <div>
                                            <div className=''>
                                                {products.slice(0, 2).map((product, index) => (
                                                    <div key={index}>
                                                        <div className='containerLogoDiv'>
                                                            {(container.name) === 'frigo' &&
                                                                <img className='containerLogoImg' src={frigo} />
                                                            }
                                                            {(container.name) === 'placard' &&
                                                                <img className='containerLogoImg' src={placard} />
                                                            }
                                                            {/* {(container.name) === 'congelateur' &&
                                                                <img className='containerLogoImg' src={congelateur} />
                                                            } */}
                                                        </div>
                                                        <div className='productList-container'>
                                                            <div className='productCard' onClick={() => goToProduct(product.product.code)}>
                                                                <img className='imageProductInContainerView' src={product.product.image_front_thumb_url} alt={product.product.abbreviated_product_name} />
                                                                <h3 className='title'>{product.product.abbreviated_product_name || product.product.generic_name} </h3>
                                                            </div>
                                                            <div className='seeMoreProductDiv'>
                                                                <div className="seeMoreProduct" onClick={() => goToContainer(container.id)}>
                                                                    {t('View More')}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>

                        </div>
                    ))}
                    {(group?.owner?.id === user?.id) &&
                        <div>
                            <button className='addContainer' onClick={() => createFoodContainer(group.id)
                            }>{t('Add the container')}</button>
                        </div>
                    }
                </div>
            }
            {loading &&
                <Loader />
            }
        </div>


    );
}

export default ContainerList;
