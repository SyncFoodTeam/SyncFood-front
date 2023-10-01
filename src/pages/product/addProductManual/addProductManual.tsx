import { useTranslation } from 'react-i18next';
import Header from '../../../component/header/header';
import Menu from '../../../component/menu/menu';
import './addProductManual.css';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addProductToContainerServiceWithCam, getProductCamService } from '../../../service/product.service';
import moment from 'moment';
import IProductAdd from '../../../interface/product/productAdd.interface';
import { IProduct } from '../../../interface/product/productOpenFood.interface';
import Loader from '../../../component/loader/loader';
import GoBack from '../../../component/goBack/goBack';


function AddProductManual() {
    const [codeBarre, setCodeBarre] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusVerbose, setStatusVerbose] = useState('');
    const [productCode, setProductCode] = useState('');
    const [status, setStatus] = useState(2);
    const [addProduct, setAddProduct] = useState(false);
    const [product, setProduct] = useState<IProduct>();
    const { t } = useTranslation();
    const location = useLocation();
    const containerId = location.state?.id;
    const [datePeremption, setDatePeremption] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [wrongDate, setWrongDate] = useState("");
    const [productDoesntExist, setProductDoesntExist] = useState(false);

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
            console.log("La date est correct");
            let product = await getProductCamService(codeBarre);
            if (product.status === 1) {
                console.log("Le produit existe");
                let body: IProductAdd = {
                    barcode: codeBarre,
                    price: parseFloat(price),
                    expirationdate: moment(datePeremption).format().split('+')[0],
                    quantity: parseInt(quantity),
                    foodcontainerid: containerId
                };

                console.log(body);
                setLoading(true);
                await addProductToContainerServiceWithCam(body);
                setLoading(false);
                setProductDoesntExist(false);
                navigate(-1);
            } else {
                console.log("Le produit n'existe pas");
                setLoading(false);
                setProductDoesntExist(true);
            }
        }
    }

    return (
        <div className="App">

            {!loading &&
                <Header />
            }

            {!loading &&
                <GoBack />
            }

            {!loading &&
                <div className='formAddProduct'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="label">{t('Insert Bar Code')}: </label>
                            <input type="number" name="codeBarre" required onChange={(e) => setCodeBarre(e.target.value)} className='inputBarCode'></input>
                        </div>
                        <br />
                        <div>
                            <label className="label">{t('Price')} :</label>
                            <input type="number" name="price" min="0.01" step="0.01" required onChange={(e) => setPrice(e.target.value)} className='inputAddProduct'></input>
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
                        {productDoesntExist && <p style={{ color: "red" }}>Le produit n'existe pas</p>}
                        <br />
                        <div className="centerDiv">
                            <button type="submit" className='addProduct'>{t('Add')}</button>
                        </div>
                    </form>
                </div>
            }
            {!loading &&
                <Menu />
            }
            {loading &&
                <Loader />
            }
        </div>





    );
}

export default AddProductManual;
