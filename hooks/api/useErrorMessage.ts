import {AxiosError} from "axios";
import {ClientDetailErrorResponse, ClientErrorResponse} from "@/api/types";

export const useErrorMessage = (error: AxiosError<ClientErrorResponse|ClientDetailErrorResponse>|Error|null) => {
    if (error instanceof AxiosError && error.response) {
        const response = error.response.data;

        if ('message' in response) {
            return error.message
        } else if ('detail' in response) {
            return response.detail
        }
    } else {
        console.log(error);
        return "Désolé, une erreur est survenue."
    }
}
