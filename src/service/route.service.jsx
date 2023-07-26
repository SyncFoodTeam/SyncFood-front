export async function routeService(code) {
    console.log("routeService(" + code + ")");

    console.log("Ce service sert à déterminer si la route utilisé à rencontré une erreur afin de renvoyer un message approprié");

    switch (code) {
        case 200:
            console.log('Requete réussi avec succès');
            return code;
        case 400:
            console.log('critères de la requete non respectés');
            return code;
        case 401:
            console.log('non autorisé (Token pas renseigné ou invalide)');
            return code;
        case 403:
            console.log('non autorisé (Même si connecté)');
            return code;
        case 409:
            console.log("Conflit dans la BDD");
            return code;
        case 404:
            console.log("Page non trouvée");
            return code;
        case 500 || 502 || 503 || 504:
            console.log("Erreur serveur");
            return code;
        default:
            console.warn("Je ne passe dans aucun des cas traité");
            console.warn(code.status);
            break;
    }
}