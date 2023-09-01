import { useLocation } from 'react-router-dom';
import Header from '../../../component/header/header';
import './groupDetails.css';
import React, { useEffect, useState } from 'react'
import Menu from '../../../component/menu/menu';
import { DeleteGroupService, GetGroupService } from '../../../service/groupe.service';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../component/deleteModal/deleteModal';
import IProducts from '../../../interface/product/products.interface';


function ProductDetails() {
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProducts>({});
    const [noData, setNoData] = useState(false);



    const location = useLocation();
    // Vérifiez si l'objet state contient l'ID
    const id = location.state?.id;

    useEffect(() => {
        if (id) {
            getProduct(id);
        } else {
            console.log("je n'ai pas d'id")
        }
    }, []);

    async function getProduct(groupId: number) {
        console.log("getGroup(groupId)");
        let myGroups = await GetGroupService(groupId);

        if (myGroups) {
            console.log("j'ai des data:")
            setProduct(myGroups);
            console.log({ product });
            setNoData(false);
        } else {
            setNoData(true);
        }
    }

    
    return (
        <div className="App">

            <Header />


            <h1>Description produit</h1>

            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.nutriScore}</div>
            <div>{product.nutritionalValue}</div>
            <div>{product.expirationDate}</div>
            <div>{product.creationDate}</div>

            <DeleteModal index={product.id} whatIs={'product'}></DeleteModal>

            <Menu />
        </div>


    );
}

export default ProductDetails;
