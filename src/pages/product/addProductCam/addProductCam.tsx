import Header from '../../../component/header/header';
import './addProductCam.css';
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import goBackArrow from '../../../assets/goBackArrow.svg'
import { useNavigate } from 'react-router-dom';
import { getProductCamService } from '../../../service/product.service';
import Loader from '../../../component/loader/loader';
import Scanner from '../../../component/scanner/scanner';


function AddProductCam() {
    const [codeBarre, setCodeBarre] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [statusVerbose, setStatusVerbose] = useState('');
    const [product, setProduct] = useState({});

    const onDetected = result => {
        setCodeBarre(result);

        getProduct(result);
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
        setLoading(true);
        let product = await getProductCamService(code);
        console.log({ product });
        setStatusVerbose(product.status_verbose);
        setProduct(product.product);
        setLoading(false);
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

            {statusVerbose !== '' &&
                <div>

                    <h2>{statusVerbose}</h2>
                    <pre>{JSON.stringify(product)}</pre>
                    <button onClick={retryAddProductCam}>Retry</button>
                </div>
            }
        </div>
    );
}

export default AddProductCam;


