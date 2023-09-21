import Header from '../../../component/header/header';
import './addProductCam.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProductToContainerServiceWithCam, getProductCamService } from '../../../service/product.service';
import Loader from '../../../component/loader/loader';
import Scanner from '../../../component/scanner/scanner';
import { IProduct } from '../../../interface/product/productOpenFood.interface';
import IProductAdd from '../../../interface/product/productAdd.interface';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import GoBack from '../../../component/goBack/goBack';


function AddProductCam() {
    const [codeBarre, setCodeBarre] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusVerbose, setStatusVerbose] = useState('');
    const [productCode, setProductCode] = useState('');
    const [status, setStatus] = useState(2);
    const [addProduct, setAddProduct] = useState(false);
    const [product, setProduct] = useState<IProduct>();
    const location = useLocation();
    const containerId = location.state?.id;
    const [datePeremption, setDatePeremption] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [wrongDate, setWrongDate] = useState("");
    const { t } = useTranslation();


    const onDetected = async result => {
        setCodeBarre(result);
        setLoading(true);
        await getProduct(result);
        setLoading(false);
    };

    const retryAddProductCam = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        window.location.reload();

    }

    async function getProduct(code: string) {
        console.log(`getProduct(${code})`);
        let product = await getProductCamService(code);
        console.log({ product });
        setStatusVerbose(product.status_verbose);
        setStatus(product.status);
        setProductCode(product.code);
        setProduct(product.product);
    }

    const addProductToContainer = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log(product);
        setAddProduct(true);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        console.log(event);
        const currentDate = new Date();
        if (moment(datePeremption).format() <= moment(currentDate).format()) {
            setWrongDate("La date de péremption doit être postérieure à la date actuelle.")
        } else {

            let body: IProductAdd = {
                barcode: productCode,
                price: parseInt(price),
                expirationdate: moment(datePeremption).format().split('+')[0],
                quantity: parseInt(quantity),
                foodcontainerid: containerId
            };

            console.log(body);
            setLoading(true);
            await addProductToContainerServiceWithCam(body);
            setLoading(false);
            // navigate('/containerDetails', { state: { containerId } });
            navigate(-1);
        }

    };

    return (
        <div className="App">

            {(!loading && statusVerbose === '') && <div>
                <div>
                    <GoBack />
                </div>
                <div className="container">
                    {codeBarre === '' &&
                        <Scanner onDetected={onDetected} />
                    }
                </div>
            </div>
            }
            {(loading && statusVerbose === '') &&
                <Loader />
            }
            {status === 0 &&
                <div>
                    <h2>{t(`${statusVerbose}`)}</h2>
                    <button onClick={retryAddProductCam}>{t('Retry')}</button>
                </div>
            }

            {(status === 1 && !addProduct) &&
                <div className='productAdd'>
                    <div className='productFound'>
                        {t(`${statusVerbose}`)}
                        <br />
                        {t('Add Product')} ?
                    </div>

                    <div className='productButton'>
                        <button className='buttonAddProduct' onClick={addProductToContainer}>{t('Yes')}</button>
                        <button className='buttonRetryProduct' onClick={retryAddProductCam}>{t('No')}</button>
                    </div>

                </div>
            }

            {addProduct &&
                <div className='formAddProduct'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label">{t('Food Name')}: </label>
                            {product?.abbreviated_product_name || product?.generic_name}
                        </div>
                        <br />
                        <div>
                            <label className="label">{t('Price')} :</label>
                            <input type="number" name="price" min="1" required onChange={(e) => setPrice(e.target.value)} className='inputAddProduct'></input>
                        </div>
                        <br />
                        <div>
                            <label className="label">{t('Quantity')} :</label>
                            <input type="number" name="quantity" min="1" required onChange={(e) => setQuantity(e.target.value)} className='inputAddProduct'></input>
                        </div>
                        <br />
                        <div>
                            <label className="label">{t('Expiration date')}:</label>
                            <input type="date" name="datePeremption" className='datePeremption' required onChange={(e) => setDatePeremption(e.target.value)}></input>
                            {wrongDate && <p style={{ color: "red" }}>{wrongDate}</p>}
                        </div>

                        <br />
                        <div className="centerDiv">
                            <button type="submit" className='addProduct'>{t('Add')}</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

export default AddProductCam;


