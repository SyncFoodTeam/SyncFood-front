import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteGroupService, RemoveSomeoneService } from '../../service/groupe.service';
import { useNavigate } from 'react-router-dom';
import IError from '../../interface/error.interface';
import ErrorComponent from '../error/errorComponent';

interface addModalProps {
    containerId?: number;
}

const AddProductModal: React.FC<addModalProps> = ({
    containerId = 0,
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<IError>({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddWithCam = async (id: number) => {
        navigate('/addProductCam', { state: { id } });
    }

    const handleAddManual = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        navigate('/addProductManual');
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Ajouter
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Comment voulez vous ajouter votre produit ?"}
                    {error &&
                        <ErrorComponent name={errorMessage.name} value={errorMessage.value} resourceNotFound={errorMessage.resourceNotFound} searchedLocation={errorMessage.searchedLocation} />
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => handleAddWithCam(containerId)} autoFocus>
                        Ajouter en scannant le code barre
                    </Button>
                    <Button onClick={handleAddManual} autoFocus>
                        Ajouter à la main
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddProductModal;