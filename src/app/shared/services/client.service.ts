import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ClientService {

    getDataClient() {
        const client = { id: "asxasdaewdq", name: "Cesar David", description: "Descripcion" }
        return client
    }


}