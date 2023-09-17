import Header from '../../../component/header/header';
import './addProductCam.css';
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import goBackArrow from '../../../assets/goBackArrow.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { addProductToContainerServiceWithCam, getProductCamService } from '../../../service/product.service';
import Loader from '../../../component/loader/loader';
import Scanner from '../../../component/scanner/scanner';
import { IProductOpenFood } from '../../../interface/product/productOpenFood.interface';


function AddProductCam() {
    const [codeBarre, setCodeBarre] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusVerbose, setStatusVerbose] = useState('');
    const [status, setStatus] = useState(2);

    const [product, setProduct] = useState<IProductOpenFood>();
    const location = useLocation();
    const containerId = location.state?.id;

    const onDetected = async result => {
        setCodeBarre(result);
        setLoading(true);
        await getProduct(result);
        setLoading(false);
    };

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }

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
        setProduct(product.product);
    }

    const addProductToContainer = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true);
        console.warn(product);
        await addProductToContainerServiceWithCam(product, containerId)
        setLoading(false);
        // navigate(-1);
    }

    return (
        <div className="App">

            {!loading && <div>
                <h1>Scanner de code-barres</h1>
                <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>
                <div className="container">
                    {codeBarre === '' &&
                        <Scanner onDetected={onDetected} />
                    }
                </div>
            </div>
            }
            {loading &&
                <Loader />
            }

            {codeBarre && <p>Code-barres détecté : {codeBarre}</p>}

            {status === 0 &&
                <div>
                    <h2>{statusVerbose}</h2>
                    <button onClick={retryAddProductCam}>Retry</button>
                </div>
            }

            {status === 1 &&
                <div>
                    <div>
                        <h2>{statusVerbose}</h2>
                    </div>
                    <div>
                        <button onClick={addProductToContainer}>Oui</button>
                    </div>
                    <div>
                        <button onClick={retryAddProductCam}>Non</button>
                    </div>

                </div>
            }
        </div>
    );
}

export default AddProductCam;


