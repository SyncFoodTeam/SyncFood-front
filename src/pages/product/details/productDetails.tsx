import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './productDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import { DeleteGroupService, GetGroupService } from '../../../service/groupe.service';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import { getProductCamService } from '../../../service/product.service';
import { IProduct } from '../../../interface/product/productOpenFood.interface';
import Loader from '../../../component/loader/loader';


function ProductDetails() {
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProduct>();
    const [noData, setNoData] = useState(false);

    const [loading, setLoading] = useState(false);


    const location = useLocation();
    // Vérifiez si l'objet state contient l'ID
    const id = location.state?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                await getProduct(id);
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
        setProduct(product.product);
    }



    return (
        <div className="App">

            {!loading &&
                <div>

                    <Header barCodeScannerIsTrue={true} />


                    <h1>Description produit</h1>

                    <div>{product.abbreviated_product_name || product.generic_name}</div>
                    <img src={product?.image_front_url} />

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
