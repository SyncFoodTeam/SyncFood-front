import RedirectService from "./redirect.service";

export async function routeService(code: number) {
    console.log("routeService(" + code + ")");

    console.log("Ce service sert à déterminer si la route utilisé à rencontré une erreur afin de renvoyer un message approprié");

    if (code === 404) {
        RedirectService("notFound");
    }
    if (code >= 500 && code <= 504) {
        RedirectService("serveruError");
    }else{
        console.log("Le code erreur n'est pas traité");
    }

}