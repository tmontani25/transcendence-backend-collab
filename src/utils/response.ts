//this file define the response format of my api
//format for success response

export function success<T>(payload: T) { //payload can be anything
    return {
        data : payload //javascript key value
    }

}

export function errorResponse(code : string, message : string){
    return {
        error : {
            code : code,
            message : message,
        }
    }
}