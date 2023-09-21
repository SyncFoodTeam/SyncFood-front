import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './modifyProduct.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import IFoodContainers from '../../../interface/container/foodContainer.interface';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import { GetContainerService, UpdateContainerService } from '../../../service/container.service';
import IUserPublic from '../../../interface/auth.interface';
import { InformationMe } from '../../../service/auth.service';
import { useTranslation } from 'react-i18next';
import Loader from '../../../component/loader/loader';
import DateFormater from '../../../pipe/dateFormater';
import GoBack from '../../../component/goBack/goBack';
import { IProduct } from '../../../interface/product/productOpenFood.interface';
import { UpdateProductService, getProductCamService } from '../../../service/product.service';


function ModifyProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<IProduct>();
    const [datePeremption, setDatePeremption] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [wrongDate, setWrongDate] = useState("");


    const productReceive = location.state?.product;
    const containerId = location.state?.containerId;

    useEffect(() => {
        const fetchData = async () => {
            console.log(productReceive);
            if (productReceive.barCode) {
                console.log({ productReceive });
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

    const modifyProduct = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        let body = {
            id: productReceive?.id,
            quantity: parseInt(quantity) || productReceive?.quantity,
        };

        console.log("J'envoie mes données à la route adéquat");
        let updateSuccess = await UpdateProductService(body);
        console.log(updateSuccess);
        if (updateSuccess) {
            navigate(-1);
        } else {
            console.log("Erreur lors de la connexion");
        }
    }

    return (
        <div className="App">

            {!loading &&
                <Header />
            }
            {!loading &&
                <div>
                    <GoBack />
                </div>

            }

            {!loading &&

                <div className='modifyCard'>
                    <div>
                        <label>{t('Food Name')}: </label>
                        {product?.abbreviated_product_name || product?.generic_name}
                    </div>
                    <br />
                    <div>
                        <label>{t('Price')} :</label>
                        <input type="number" name="price" min="1" required defaultValue={productReceive.price} onChange={(e) => setPrice(e.target.value)} className='inputAddProduct'></input>
                    </div>
                    <br />
                    <div>
                        <label>{t('Quantity')} :</label>
                        <input type="number" name="quantity" min="1" required defaultValue={productReceive.quantity} onChange={(e) => setQuantity(e.target.value)} className='inputAddProduct'></input>
                    </div>
                    <br />
                    <div>
                        <label>{t('Expiration date')}:</label>
                        <input type="date" name="datePeremption" className='datePeremption' defaultValue={productReceive.expirationDate} required onChange={(e) => setDatePeremption(e.target.value)}></input>
                        {wrongDate && <p style={{ color: "red" }}>{wrongDate}</p>}
                    </div>

                    <div className='creationDate'>
                        {t('Creation date')}: <DateFormater date={productReceive?.creationDate} />
                    </div>
                    <div className='divButton'>
                        <div className='divButtonModifyGroups'>
                            <button onClick={modifyProduct} className='modifyButton'>{t('Modify')}</button>
                        </div>

                        <div className='divButtonDelete'>
                            <DeleteModal productId={productReceive.id} whatIs={'product'}></DeleteModal>
                        </div>

                    </div>
                </div>
            }
            {loading &&
                <Loader />
            }




            <Menu />
        </div>


    );
}

export default ModifyProduct;
