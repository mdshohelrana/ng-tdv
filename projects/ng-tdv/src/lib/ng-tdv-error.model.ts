export interface NgTdvError {
    fieldName: string,
    valid: boolean,
    message: string
}

export interface NgTdvResult {
    valid: boolean,
    errors: Array<NgTdvError>
}