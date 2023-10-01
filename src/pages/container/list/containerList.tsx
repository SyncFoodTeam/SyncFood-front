import { useTranslation } from 'react-i18next';
import Header from '../../../component/header/header';
import './containerList.css';
import React, { useState, useEffect } from 'react'
import IGroup from '../../../interface/groups/group.interface';
import { useNavigate } from 'react-router-dom';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { GetContainerService } from '../../../service/container.service';
import { getProductCamService } from '../../../service/product.service';
import { IProduct, IProductOpenFood } from '../../../interface/product/productOpenFood.interface';
import frigo from '../../../assets/frigo.svg';
import placard from '../../../assets/placard.svg';
import congelateur from '../../../assets/congelateur.svg';

import IUser from '../../../interface/auth.interface';
import Loader from '../../../component/loader/loader';
import IProducts from '../../../interface/product/products.interface';
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

                    if (container.products.length) {
                        console.log(container.id)
                        console.log("mon container n'est pas vide j'ai des produits")
                        await getAllProduct(container);
                        console.log("products");
                        console.log(products);
                        setNoData(false);
                    } else {
                        console.log("mon container est vide")

                        setNoData(true);
                    }
                }
                setContainers(containers);
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


    return (
        <div>

            {!loading &&
                <div>
                    {/* Permet de boucler sur tout les foods containers */}
                    {group?.foodContainers?.map((container: IFoodContainers, index: number) => (
                        <div key={index}>
                            <div className='containerLogoDiv'>
                                {(container.name) === 'Fridge' &&
                                    <img className='containerLogoImg' src={frigo} />
                                }
                                {(container.name) === 'Closet' &&
                                    <img className='containerLogoImg' src={placard} />
                                }
                                {(container.name) === 'Freezer' &&
                                    <img className='containerLogoImg' src={congelateur} />
                                }
                            </div>

                            <div className='containerProduct'>
                                {/* Permet de boucler sur les produits présent dans les containers */}
                                {containers.find((e) => e.id === container.id)?.products?.slice(0, 1).map((productInArray: any, index) => (
                                    <div key={index} className='productList-container'>
                                        {/* Permet d'afficher les produits */}
                                        {products.filter((e) => e.barCode === productInArray.code).slice(0, 2).map((product, index2) => (
                                            <div key={index2}>
                                                <div className='productCard'>
                                                    <div className='productImage'>
                                                        <img className='imageProductInContainerList' src={product.product.image_front_thumb_url} alt={product.product.abbreviated_product_name} />
                                                    </div>
                                                    <h3 className='title productTitle'>{product?.product?.abbreviated_product_name || product?.product?.generic_name || product?.product?.product_name} </h3>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </div>
                            <div className='seeMoreProductDiv'>
                                <div className="seeMoreProduct" onClick={() => goToContainer(container.id)}>
                                    {t('View More')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {loading &&
                <Loader />
            }
        </div>


    );
}

export default ContainerList;
