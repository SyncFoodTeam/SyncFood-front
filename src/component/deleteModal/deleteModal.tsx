import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteGroupService } from '../../service/groupe.service';
import { useNavigate } from 'react-router-dom';
import IError from '../../interface/error.interface';
import ErrorComponent from '../error/errorComponent';

interface deleteModalProps {
    index: number;
    whatIs: string
}

const DeleteModal: React.FC<deleteModalProps> = ({
    index = 0,
    whatIs = ''
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

    const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setOpen(false);
        console.warn(index);
        console.warn(whatIs);

        if (whatIs === 'groups') {
            let groupDeleted = await DeleteGroupService(index);

            if (groupDeleted.code === 200) {
                setError(false);
                navigate('/home');
            } else {
                setError(true);
                setErrorMessage(groupDeleted.dataGroup);
            }
        }

    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Supprimer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Etes-vous sure de vouloir supprimer ce dernier ?"}
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
                    <Button onClick={handleDelete} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteModal;