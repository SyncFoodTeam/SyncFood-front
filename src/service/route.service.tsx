import RedirectService from "./redirect.service";

export async function routeService(code: number) {
    console.log("routeService(" + code + ")");

    if (code === 404) {
        RedirectService("notFound");
    }
    if (code >= 500 && code <= 504) {
        RedirectService("serveurError");
    }else{
        console.log("Le code erreur n'est pas traité");
    }

}