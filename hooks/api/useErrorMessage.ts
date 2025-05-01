import {AxiosError} from "axios";
import {ClientDetailErrorResponse, ClientErrorResponse} from "@/api/types";

export const useErrorMessage = (error: AxiosError<ClientErrorResponse|ClientDetailErrorResponse>|Error): string => {
    if (error instanceof AxiosError && error.response) {
        const response = error.response.data;
        console.log(JSON.stringify(response));

        if ('message' in response) {
            return response.message
        } else if ('detail' in response) {
            return response.detail
        }
    }

    console.log(JSON.stringify(error));
    return "Une erreur est survenue"
}
