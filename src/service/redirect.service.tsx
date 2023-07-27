import { useNavigate } from 'react-router-dom';

export function RedirectService(redirect: string): void {
    const navigate = useNavigate();

    navigate(redirect); // Redirection vers la page souhaité

};

export default RedirectService;