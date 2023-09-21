import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './productDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import { useNavigate } from "react-router-dom";
import { getProductCamService } from '../../../service/product.service';
import { IProduct } from '../../../interface/product/productOpenFood.interface';
import Loader from '../../../component/loader/loader';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';

import a from '../../../assets/nutriscore/a.svg';
import b from '../../../assets/nutriscore/a.svg';
import c from '../../../assets/nutriscore/c.svg';
import d from '../../../assets/nutriscore/d.svg';
import e from '../../../assets/nutriscore/e.svg';
import DateFormater from '../../../pipe/dateFormater';
import IProducts from '../../../interface/product/products.interface';


function ProductDetails() {
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProduct>();
    const [noData, setNoData] = useState(false);

    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();


    const location = useLocation();
    // Vérifiez si l'objet state contient l'ID
    const productReceive = location.state?.product;
    const containerId = location.state?.containerId;

    useEffect(() => {
        const fetchData = async () => {
            console.log({ productReceive });
            console.log({ containerId });
            if (productReceive.barCode) {
                setLoading(true);
                await getProduct(productReceive.barCode);
                setLoading(false);
            } else {
                console.log("Je n'ai pas d'id");
            }
        };

        fetchData();
    }, []);


    async function getProduct(codeBarre: string) {
        console.log(`getProduct(${codeBarre})`);
        let product = await getProductCamService(codeBarre);
        console.log({ product });
        setProduct(product.product);
    }

    const modifyProduct = async (product: IProducts, containerId: number) => {

        navigate('/modifyProduct', { state: { product, containerId } });
    }



    return (
        <div className="App">

            {!loading &&
                <div>

                    <Header barCodeScannerIsTrue={true} />
                    <div>
                        <GoBack name={t('Product description')} />
                    </div>

                    <div className='productDetailsCard'>
                        <div>
                            <img className='photoProduct' src={product?.image_front_url} />
                        </div>
                        <div className='principalInformation'>
                            <div>{product?.abbreviated_product_name || product?.generic_name}</div>
                            <div>Quantité: {productReceive?.quantity}</div>
                            <div className='nutriscore'>Nutri-score:
                                {(product?.nutriscore_grade) === 'a' &&
                                    <img className='photoNutriscore' src={a} />
                                }
                                {(product?.nutriscore_grade) === 'b' &&
                                    <img className='photoNutriscore' src={b} />
                                }
                                {(product?.nutriscore_grade) === 'c' &&
                                    <img className='photoNutriscore' src={c} />
                                }
                                {(product?.nutriscore_grade) === 'd' &&
                                    <img className='photoNutriscore' src={d} />
                                }
                                {(product?.nutriscore_grade) === 'e' &&
                                    <img className='photoNutriscore' src={e} />
                                }
                            </div>
                            <div >
                                {t('Ingredients')} :
                                <div className='descriptionProduct'>{product?.ingredients_text}</div>
                            </div>
                            <div >
                                {t('Expiration date')} :
                                <DateFormater date={productReceive?.expirationDate} />
                            </div>
                        </div>

                        <div>
                            <button className='modifyGroup' onClick={() => modifyProduct(productReceive, containerId)}>{t('Modify Product')}</button>
                        </div>
                    </div>


                    <Menu />
                </div>
            }

            {loading &&
                <Loader />
            }
        </div>


    );
}

export default ProductDetails;
