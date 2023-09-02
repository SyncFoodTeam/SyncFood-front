import Header from '../../../component/header/header';
import './addProductCam.css';
import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import goBackArrow from '../../../assets/goBackArrow.svg'
import { useNavigate } from 'react-router-dom';


function AddProductCam() {
    const [codeBarre, setCodeBarre] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#camera-preview'), // L'élément HTML où la caméra doit être affichée
                constraints: {
                    width: '100%',
                    height: '100%',
                    facingMode: 'user', // Utilisation de la caméra arrière (peut être 'user' pour la caméra avant)
                },
                area: { // defines rectangle of the detection/localization area
                    top: "0%",    // top offset
                    right: "0%",  // right offset
                    left: "0%",   // left offset
                    bottom: "0%"  // bottom offset
                },
            },
            locator: {
                patchSize: 'medium',
                halfSample: true,
            },
            numOfWorkers: 2,
            decoder: {
                readers: ['ean_reader'], // Le type de code-barres à scanner (par exemple, 'ean_reader' pour les codes EAN)
            },
            locate: true, // Activer la localisation du code-barres
        }, (err) => {
            if (err) {
                console.error("Erreur lors de l'initialisation de Quagga: ", err);
                return;
            }
            Quagga.start();

            // Gestionnaire d'événement pour la détection du code-barres
            Quagga.onDetected((data) => {
                const codeBarreDetecte = data.codeResult.code;
                setCodeBarre(codeBarreDetecte);

                // Afficher une le code barre dans la console
                console.warn('Code-barres détecté :', codeBarreDetecte);

                // Arrêtez la lecture du code-barres après avoir trouvé un code
                Quagga.stop();
            });
        });

        // Nettoyez Quagga lorsque le composant est démonté
        return () => {
            Quagga.stop();
        };
    }, []);

    const goBack = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        console.log(event);

        navigate(-1);
    }

    return (
        <div>
            <h1>Scanner de code-barres</h1>
            <button onClick={goBack} className="returnToLastPage"><img src={goBackArrow} alt='Retour en arrière' /></button>
            <div
                id="camera-preview"
            ></div>
            {codeBarre && <p>Code-barres détecté : {codeBarre}</p>}
        </div>
    );
}

export default AddProductCam;
