export async function routeService(code) {
    console.log("routeService(" + code + ")");

    console.log("Ce service sert à déterminer si la route utilisé à rencontré une erreur afin de renvoyer un message approprié");


    console.log(typeof (code));

    switch (code) {
        case 200:
            console.log('Requete réussi avec succès');
            break
        case 403:
            console.log('Erreur lors de la saisie des infos');
            break
        case 404:
            console.log('Page introuvable');
            break
        case 500 || 502 || 503:
            console.log("Erreur serveur");
            break
        case 504:
            console.log("Le serveur n'a pas répondu");
            break
        default:
            console.warn("Je ne passe dans aucun des cas traité");
            console.warn(code.status);
            break;
    }
}